const User = require('../models/User')

// ✅ Rank system — 500 ELO per rank
const RANKS = [
  { name: 'Bronze',   minElo: 0,    maxElo: 399,  icon: '🥉', color: '#cd7f32' },
  { name: 'Silver',   minElo: 400,  maxElo: 799,  icon: '🥈', color: '#aaa9ad' },
  { name: 'Gold',     minElo: 800,  maxElo: 1199, icon: '🥇', color: '#ffd700' },
  { name: 'Platinum', min: 1200, maxElo: 1799, icon: '💎', color: '#00c8ff' },
  { name: 'Diamond',  min: 1800, max: 2399, icon: '💠', color: '#a855f7' },
  { name: 'Master',   minElo: 2400, maxElo: Infinity, icon: '👑', color: '#f97316' },
]

const getRankFromElo = (elo) => {
  return RANKS.find(r => elo >= r.minElo && elo <= r.maxElo) || RANKS[0]
}

// ✅ GET Own Profile (Logged in user)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password -otp -otpExpiry')
      .populate('followers', 'username') // Added populate
      .populate('following', 'username') // Added populate

    if (!user) return res.status(404).json({ message: 'User not found' })
    // Attach rank info
    const rank = getRankFromElo(user.elo)
    res.json({ user: { ...user.toObject(), rankInfo: rank } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// 🔥 NEW: GET Public Profile & Global Rank (By Username) 🔥
exports.getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select('-password -otp -otpExpiry')
      .populate('followers', 'username')
      .populate('following', 'username');

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.publicProfile === false && req.userId !== user._id.toString()) {
      return res.status(403).json({ message: 'This account is private' });
    }

    // Calculate Global Rank
    const higherEloCount = await User.countDocuments({ elo: { $gt: user.elo } });
    const globalRank = higherEloCount + 1;
    const rankInfo = getRankFromElo(user.elo);

    res.json({ user: { ...user.toObject(), rankInfo }, globalRank });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔥 NEW: Follow User 🔥
exports.followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId; // Coming from authMiddleware

    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: currentUserId } });
    await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetUserId } });

    res.json({ success: true, message: "Successfully followed" });
  } catch (error) {
    res.status(500).json({ message: "Follow failed" });
  }
};

// 🔥 NEW: Unfollow User 🔥
exports.unfollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    await User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } });
    await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } });

    res.json({ success: true, message: "Successfully unfollowed" });
  } catch (error) {
    res.status(500).json({ message: "Unfollow failed" });
  }
};

// 🔥 NEW: Search Users for Frontend Dropdown 🔥
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    // 'i' means case-insensitive search
    const users = await User.find({ 
      username: { $regex: query, $options: 'i' } 
    })
    .limit(5) // Just sending top 5 matches
    .select('username elo rank');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Search failed' });
  }
};


// ✅ GET Battle History
exports.getBattleHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('matchHistory')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ battles: [...(user.matchHistory || [])].reverse() })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// ✅ UPDATE Profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, bio, github, linkedin, website, education, company, languages, customLinks, customLanguages, publicProfile, showEloOnLeaderboard } = req.body
    if (username && username.length < 3)
      return res.status(400).json({ message: 'Username too short' })
    if (username) {
      const existing = await User.findOne({ username })
      if (existing && existing._id.toString() !== req.userId)
        return res.status(400).json({ message: 'Username already taken' })
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, bio, github, linkedin, website, education, company, languages, customLinks, customLanguages, publicProfile, showEloOnLeaderboard },
      { new: true }
    ).select('-password -otp -otpExpiry')
    res.json({ message: 'Profile updated', user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// 🔥 DELETE Account
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Perform cleanup if necessary (e.g. removing them from others' followers lists)
    await User.updateMany({ following: req.userId }, { $pull: { following: req.userId } });
    await User.updateMany({ followers: req.userId }, { $pull: { followers: req.userId } });

    await User.findByIdAndDelete(req.userId);
    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during deletion' });
  }
};

// ✅ UPDATE Match Result + ELO + RANK
exports.updateMatchResult = async (req, res) => {
  try {
    const { opponentName, result, difficulty, timeTaken, problem, language } = req.body

    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    const difficultyEloMap = { 'Easy': 10, 'Medium': 20, 'Hard': 30 }
    const baseElo = difficultyEloMap[difficulty] || 10
    const eloChange = result === 'win' ? baseElo : result === 'loss' ? -Math.floor(baseElo / 2) : 0

    const oldElo = user.elo
    const oldRank = getRankFromElo(oldElo)
    const newElo = Math.max(0, oldElo + eloChange)
    const newRank = getRankFromElo(newElo)
    const newPeakElo = Math.max(user.peakElo || 0, newElo)

    // ✅ Stats calculate
    const newWins = result === 'win' ? (user.stats.wins || 0) + 1 : (user.stats.wins || 0)
    const newLosses = result === 'loss' ? (user.stats.losses || 0) + 1 : (user.stats.losses || 0)
    const newStreak = result === 'win' ? (user.stats.streak || 0) + 1 : result === 'loss' ? 0 : (user.stats.streak || 0)
    const newMaxStreak = Math.max(user.stats.maxStreak || 0, newStreak)
    const newTotalBattles = (user.stats.totalBattles || 0) + 1

    const newHistoryEntry = {
      opponent: opponentName || 'Unknown',
      problem: problem || 'Unknown',
      result,
      eloChange,
      eloAfter: newElo,
      rankAfter: newRank.name,
      difficulty: difficulty || 'Easy',
      language: language || 'javascript',
      timeTaken: timeTaken || 0,
      date: new Date()
    }

    await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          elo: newElo,
          peakElo: newPeakElo,
          rank: newRank.name,
          'stats.wins': newWins,
          'stats.losses': newLosses,
          'stats.streak': newStreak,
          'stats.maxStreak': newMaxStreak,
          'stats.totalBattles': newTotalBattles,
        },
        $push: { matchHistory: newHistoryEntry }
      },
      { new: true }
    )

    const rankChanged = oldRank.name !== newRank.name

    res.json({
      success: true,
      newElo,
      oldElo,
      eloChange,
      newRank: newRank.name,
      oldRank: oldRank.name,
      rankChanged,
      rankInfo: newRank,
      streak: newStreak,
      wins: newWins,
      losses: newLosses,
    })

  } catch (err) {
    console.error('updateMatchResult error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// 🔥 UPDATE Puzzle Result & XP 🔥
exports.updatePuzzleResult = async (req, res) => {
  try {
    const { puzzleId, xpEarned } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user.solvedPuzzles && user.solvedPuzzles.includes(puzzleId)) {
      return res.status(400).json({ success: false, message: 'Puzzle already solved' });
    }

    const newXp = (user.puzzleXp || 0) + xpEarned;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: { puzzleXp: newXp },
        $push: { solvedPuzzles: puzzleId }
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'XP Added successfully!',
      puzzleXp: updatedUser.puzzleXp,
      solvedPuzzles: updatedUser.solvedPuzzles
    });
  } catch (err) {
    console.error('updatePuzzleResult error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ LEADERBOARD with ranks, pagination, & tabs (Global, Weekly, Monthly, Friends)
exports.getLeaderboard = async (req, res) => {
  try {
    const tab = req.query.tab || 'Global'
    const limit = parseInt(req.query.limit) || 10
    
    let players = []

    if (tab === 'Friends') {
      const authHeader = req.headers.authorization
      if (!authHeader) return res.json({ success: false, message: 'Please login to see Friends leaderboard' })
      const token = authHeader.split(' ')[1]
      const jwt = require('jsonwebtoken')
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const currentUser = await User.findById(decoded.userId)
      if (!currentUser) return res.json({ success: false, message: 'User not found' })

      players = await User.find({ 
        _id: { $in: currentUser.following }, 
        isVerified: true, 
        showEloOnLeaderboard: { $ne: false } 
      })
      .sort({ elo: -1, puzzleXp: -1 })
      .limit(limit)
      .select('username elo rank stats country createdAt puzzleXp')
    } 
    else if (tab === 'Weekly' || tab === 'Monthly') {
      const days = tab === 'Weekly' ? 7 : 30
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      players = await User.aggregate([
        { $match: { isVerified: true, showEloOnLeaderboard: { $ne: false }, 'matchHistory.date': { $gte: startDate } } },
        {
          $addFields: {
            periodEloGain: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: { $ifNull: ['$matchHistory', []] },
                      as: 'match',
                      cond: { $gte: ['$$match.date', startDate] }
                    }
                  },
                  as: 'validMatch',
                  in: { $ifNull: ['$$validMatch.eloChange', 0] }
                }
              }
            }
          }
        },
        { $sort: { periodEloGain: -1 } },
        { $limit: limit },
        { $project: { username: 1, elo: 1, rank: 1, stats: 1, country: 1, puzzleXp: 1, periodEloGain: 1 } }
      ])
    } 
    else {
      // Global
      players = await User.find({ isVerified: true, showEloOnLeaderboard: { $ne: false } })
        .sort({ elo: -1, puzzleXp: -1 })
        .limit(limit)
        .select('username elo rank stats country createdAt puzzleXp')
    }

    const leaderboard = players.map((p, i) => {
      const rankInfo = getRankFromElo(p.elo)
      const wins = p.stats?.wins || 0
      const losses = p.stats?.losses || 0
      const total = wins + losses
      return {
        rank: i + 1,
        username: p.username,
        elo: p.elo,
        periodEloGain: p.periodEloGain,
        puzzleXp: p.puzzleXp || 0,
        rankName: rankInfo.name,
        rankIcon: rankInfo.icon,
        rankColor: rankInfo.color,
        wins, losses,
        winRate: total > 0 ? Math.round((wins / total) * 100) : 0,
        streak: p.stats?.streak || 0,
        country: p.country || 'IN',
        badge: i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : null,
      }
    })
    res.json({ success: true, leaderboard })
  } catch (err) {
    console.error("Leaderboard Error:", err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// 🔥 NEW: Mark Problem as Solved & Give Base ELO 🔥
exports.markAsSolved = async (req, res) => {
  try {
    const { problemId } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🛡️ ANTI-CHEAT: Check agar pehle se solved hai
    const alreadySolved = user.solvedProblems && user.solvedProblems.includes(String(problemId));
    if (alreadySolved) {
      return res.status(200).json({ 
        success: true, 
        message: "Problem already solved. No extra ELO awarded.",
        user: { ...user.toObject(), rankInfo: getRankFromElo(user.elo) }
      });
    }

    // Naya problem hai — $addToSet se safely add karo aur base ELO do
    const newElo = Math.max(0, (user.elo || 0) + 20);
    const newRank = getRankFromElo(newElo);
    const newPeakElo = Math.max(user.peakElo || 0, newElo);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $addToSet: { solvedProblems: String(problemId) },
        $set: { elo: newElo, rank: newRank.name, peakElo: newPeakElo }
      },
      { new: true }
    ).select('-password -otp -otpExpiry');

    res.status(200).json({ 
      success: true, 
      message: "Problem solved successfully!", 
      user: { ...updatedUser.toObject(), rankInfo: newRank }
    });

  } catch (error) {
    console.error("Error in markAsSolved:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ✅ Export rank system
exports.getRankFromElo = getRankFromElo
exports.RANKS = RANKS