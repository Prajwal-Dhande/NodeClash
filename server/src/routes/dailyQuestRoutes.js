const express = require('express')
const router = express.Router()
const auth = require('../middleware/authmiddleware')
const DailyQuest = require('../models/DailyQuest')
const Problem = require('../models/Problem')
const User = require('../models/User')

// ── Helper: Get today's date string in IST ────────────────────────────────────
function getTodayIST() {
  const now = new Date()
  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000
  const istDate = new Date(now.getTime() + istOffset)
  return istDate.toISOString().split('T')[0] // 'YYYY-MM-DD'
}

// ── Helper: Get yesterday's date string in IST ────────────────────────────────
function getYesterdayIST() {
  const now = new Date()
  const istOffset = 5.5 * 60 * 60 * 1000
  const istDate = new Date(now.getTime() + istOffset - 24 * 60 * 60 * 1000)
  return istDate.toISOString().split('T')[0]
}

// ── Helper: Pick or create today's quest ──────────────────────────────────────
async function ensureTodayQuest() {
  const today = getTodayIST()
  let quest = await DailyQuest.findOne({ date: today })
  if (quest) return quest

  // Pick a random problem that hasn't been used recently
  const recentQuests = await DailyQuest.find().sort({ date: -1 }).limit(14).select('problemSlug')
  const recentSlugs = recentQuests.map(q => q.problemSlug)

  // Try to find a problem not used in last 14 days
  let problem = await Problem.aggregate([
    { $match: { isActive: true, 'testCases.0': { $exists: true }, slug: { $nin: recentSlugs } } },
    { $sample: { size: 1 } }
  ])

  // Fallback: if all problems used recently, just pick any
  if (!problem || problem.length === 0) {
    problem = await Problem.aggregate([
      { $match: { isActive: true, 'testCases.0': { $exists: true } } },
      { $sample: { size: 1 } }
    ])
  }

  if (!problem || problem.length === 0) return null

  const p = problem[0]
  quest = await DailyQuest.create({
    date: today,
    problemSlug: p.slug,
    problemTitle: p.title,
    difficulty: p.difficulty,
    category: p.category || ''
  })
  console.log(`🎯 [Daily Quest] Created quest for ${today}: ${p.title} (${p.difficulty})`)
  return quest
}

// ── GET /api/daily-quest/today ────────────────────────────────────────────────
router.get('/today', async (req, res) => {
  try {
    const quest = await ensureTodayQuest()
    if (!quest) return res.status(500).json({ success: false, message: 'No problems available for daily quest' })

    // Get user info if authenticated
    let userStreak = 0, bestStreak = 0, alreadySolved = false
    const authHeader = req.headers.authorization
    if (authHeader) {
      try {
        const jwt = require('jsonwebtoken')
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId || decoded.id).select('dailyStreak bestDailyStreak lastDailyQuestDate username')
        if (user) {
          userStreak = user.dailyStreak || 0
          bestStreak = user.bestDailyStreak || 0
          alreadySolved = quest.solvers.some(s => s.username === user.username)
        }
      } catch (e) { /* token invalid, continue without user info */ }
    }

    // Get countdown to next quest (midnight IST)
    const now = new Date()
    const istOffset = 5.5 * 60 * 60 * 1000
    const istNow = new Date(now.getTime() + istOffset)
    const tomorrow = new Date(istNow)
    tomorrow.setUTCHours(0, 0, 0, 0)
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
    const msToNextQuest = tomorrow.getTime() - istNow.getTime()

    // Top 10 solvers leaderboard
    const leaderboard = [...quest.solvers]
      .sort((a, b) => a.timeTaken - b.timeTaken)
      .slice(0, 10)
      .map((s, i) => ({
        rank: i + 1,
        username: s.username,
        timeTaken: s.timeTaken,
        solvedAt: s.solvedAt
      }))

    res.json({
      success: true,
      quest: {
        date: quest.date,
        problemSlug: quest.problemSlug,
        problemTitle: quest.problemTitle,
        difficulty: quest.difficulty,
        category: quest.category,
        totalSolvers: quest.solvers.length,
        leaderboard
      },
      user: {
        streak: userStreak,
        bestStreak,
        alreadySolved
      },
      nextQuestIn: msToNextQuest
    })
  } catch (err) {
    console.error('Daily Quest error:', err)
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── GET /api/daily-quest/history ──────────────────────────────────────────────
router.get('/history', async (req, res) => {
  try {
    const quests = await DailyQuest.find()
      .sort({ date: -1 })
      .limit(7)
      .select('date problemTitle difficulty category solvers')

    const history = quests.map(q => ({
      date: q.date,
      problemTitle: q.problemTitle,
      difficulty: q.difficulty,
      category: q.category,
      totalSolvers: q.solvers.length,
      topSolver: q.solvers.length > 0
        ? [...q.solvers].sort((a, b) => a.timeTaken - b.timeTaken)[0]?.username
        : null
    }))

    res.json({ success: true, history })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── POST /api/daily-quest/complete ────────────────────────────────────────────
router.post('/complete', auth, async (req, res) => {
  try {
    const { timeTaken } = req.body // time in seconds
    const today = getTodayIST()
    const yesterday = getYesterdayIST()

    const quest = await DailyQuest.findOne({ date: today })
    if (!quest) return res.status(404).json({ success: false, message: 'No daily quest found for today' })

    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    // Check if already solved today
    if (quest.solvers.some(s => s.userId?.toString() === req.userId)) {
      return res.status(400).json({ success: false, message: 'You already completed today\'s quest!' })
    }

    // Add to solvers
    quest.solvers.push({
      userId: req.userId,
      username: user.username,
      timeTaken: timeTaken || 0,
      solvedAt: new Date()
    })
    await quest.save()

    // Update streak
    const lastDate = user.lastDailyQuestDate || ''
    if (lastDate === yesterday) {
      // Continuing streak
      user.dailyStreak = (user.dailyStreak || 0) + 1
    } else if (lastDate !== today) {
      // Streak broken or first time
      user.dailyStreak = 1
    }
    // else: lastDate === today means already counted (shouldn't reach here)

    user.lastDailyQuestDate = today
    if (user.dailyStreak > (user.bestDailyStreak || 0)) {
      user.bestDailyStreak = user.dailyStreak
    }

    // ELO bonus
    const eloBonus = quest.difficulty === 'Easy' ? 15 : quest.difficulty === 'Medium' ? 30 : 50
    const streakMultiplier = user.dailyStreak >= 7 ? 1.5 : 1
    const totalElo = Math.round(eloBonus * streakMultiplier)
    user.elo = (user.elo || 0) + totalElo

    await user.save()

    // Return updated info
    const rank = quest.solvers.length // their position (they were just added)

    res.json({
      success: true,
      message: `Quest completed! +${totalElo} ELO`,
      streak: user.dailyStreak,
      bestStreak: user.bestDailyStreak,
      eloGained: totalElo,
      rank,
      totalSolvers: quest.solvers.length
    })
  } catch (err) {
    console.error('Daily Quest complete error:', err)
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
