import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../config/api'
import PremiumRadarChart from './PremiumRadarChart'

// ── Animated Counter Hook ──
function useAnimatedCounter(target, duration = 1200, delay = 400) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (target == null) return
    const timer = setTimeout(() => {
      let start = 0
      const step = Math.max(1, Math.abs(target) / 40)
      const dir = target >= 0 ? 1 : -1
      const interval = setInterval(() => {
        start += step
        if (start >= Math.abs(target)) { setCount(target); clearInterval(interval) }
        else setCount(Math.round(start * dir))
      }, duration / 40)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [target, duration, delay])
  return count
}

// ── SVG Circular Progress ──
function CircularProgress({ value, max, size = 100, strokeWidth = 6, color = '#22c55e', delay = 600 }) {
  const [progress, setProgress] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = max > 0 ? Math.min(value, max) / max : 0

  useEffect(() => {
    const t = setTimeout(() => setProgress(pct), delay)
    return () => clearTimeout(t)
  }, [pct, delay])

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress)}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)', filter: `drop-shadow(0 0 8px ${color}80)` }}
      />
    </svg>
  )
}

// ── Animated Bar ──
function AnimatedBar({ value, color, delay = 0 }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${width}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: 6, boxShadow: `0 0 12px ${color}60`,
        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
      }} />
    </div>
  )
}

// ── Fade-Up animation variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] } })
}

export default function WinnerScreen({ result, problem, myTests, totalTests, timeTaken, onRematch, onLobby, opponentName, difficulty, language, premiumMode, userCode, timeComplexity, complexity }) {
  const navigate = useNavigate()
  const [eloData, setEloData] = useState(null)
  const [rankUp, setRankUp] = useState(false)
  const [aiFeedback, setAiFeedback] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [reportCard, setReportCard] = useState(null)
  const [reportLoading, setReportLoading] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const calledRef = useRef(false)

  // ── FIX: Cap myTests so percentage never exceeds 100% ──
  const cappedTests = Math.min(myTests || 0, totalTests || 1)
  const testPct = totalTests > 0 ? Math.round((cappedTests / totalTests) * 100) : 0

  const eloChange = useAnimatedCounter(eloData?.eloChange || 0, 1000, 800)

  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true
    const token = localStorage.getItem('token')

    // ELO Update
    const updateElo = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/match-result`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({
            opponentName: opponentName || 'Unknown', result,
            difficulty: difficulty || problem?.difficulty || 'Medium',
            timeTaken: timeTaken || 0, problem: problem?.title || 'Unknown',
            language: language || 'javascript'
          })
        })
        const data = await res.json()
        if (data.success) {
          setEloData(data)
          if (data.rankChanged) setRankUp(true)
          const user = JSON.parse(localStorage.getItem('user') || '{}')
          user.elo = data.newElo; user.rank = data.newRank
          user.stats = user.stats || {}
          if (result === 'win') user.stats.wins = (user.stats.wins || 0) + 1
          else user.stats.losses = (user.stats.losses || 0) + 1
          localStorage.setItem('user', JSON.stringify(user))
        }
      } catch (err) { console.error('ELO error:', err) }
    }
    updateElo()

    // Clara AI Feedback (win only)
    if (premiumMode && userCode && result === 'win') {
      setAiLoading(true)
      fetch(`${API_URL}/api/ai/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          problemTitle: problem?.title || 'Unknown', userCode,
          language: language || 'javascript',
          timeComplexity: complexity?.time || timeComplexity || 'O(N)',
          spaceComplexity: complexity?.space || 'O(N)',
          timeTaken, passedTests: cappedTests, totalTests
        })
      }).then(r => r.json()).then(d => { if (d.success) setAiFeedback(d.feedback) })
        .catch(console.error).finally(() => setAiLoading(false))
    }

    // MAANG Report Card (premium only)
    if (premiumMode) {
      setReportLoading(true)
      fetch(`${API_URL}/api/ai/report-card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          problemTitle: problem?.title || 'Unknown',
          userCode: userCode || '// No code submitted',
          language: language || 'javascript',
          passedTests: cappedTests, totalTests, timeTaken, result
        })
      }).then(r => r.json()).then(d => { if (d.success) setReportCard(d.report) })
        .catch(console.error).finally(() => setReportLoading(false))
    }
  }, [])

  const isWin = result === 'win'
  const fmt = (s) => s ? `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}` : '-'

  return (
    <div className="ws-root">
      {/* ═══ Ambient Background ═══ */}
      <div className="ws-bg-glow" style={{ background: isWin
        ? 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,197,94,0.12) 0%, transparent 70%)'
        : 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 70%)'
      }} />

      {/* ═══ Confetti ═══ */}
      {isWin && (
        <div className="ws-confetti-layer">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="ws-confetti-piece" style={{
              '--x': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 2.5}s`,
              '--dur': `${Math.random() * 2 + 2.5}s`,
              '--rot': `${Math.random() * 1080}deg`,
              '--color': ['#ff6b35','#fbbf24','#22c55e','#60a5fa','#a855f7','#ec4899'][i % 6],
              '--size': `${Math.random() * 5 + 4}px`,
            }} />
          ))}
        </div>
      )}

      {/* ═══ Victory / Defeat Banner ═══ */}
      <motion.div className="ws-banner" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <motion.div className="ws-trophy"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        >
          {isWin ? '🏆' : '💀'}
        </motion.div>
        <motion.h1 className={`ws-title ${isWin ? 'win' : 'lose'}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {isWin ? 'Victory!' : 'Defeated!'}
        </motion.h1>
        <motion.p className="ws-subtitle"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          {isWin ? `${problem?.title || 'Problem'} Crushed` : 'Better luck next time'}
        </motion.p>
      </motion.div>

      <div className="ws-content">

        {/* ═══ Rank Up Banner ═══ */}
        <AnimatePresence>
          {rankUp && eloData && (
            <motion.div className="ws-rankup"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <span className="ws-rankup-icon">🎉</span>
              RANK UP! <span className="ws-rankup-old">{eloData.oldRank}</span> → <span className="ws-rankup-new">{eloData.newRank}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ Performance + Progression Cards ═══ */}
        <div className="ws-cards-grid">
          {/* Performance Card */}
          <motion.div className="ws-card" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <div className="ws-card-label">PERFORMANCE</div>
            <div className="ws-perf-row">
              <div className="ws-circle-wrap">
                <CircularProgress value={cappedTests} max={totalTests} size={100} strokeWidth={7}
                  color={testPct >= 80 ? '#22c55e' : testPct >= 50 ? '#fbbf24' : '#ef4444'} />
                <div className="ws-circle-inner">
                  <span className="ws-circle-num">{cappedTests}/{totalTests}</span>
                </div>
              </div>
              <div>
                <div className="ws-big-pct">{testPct}%</div>
                <div className="ws-small-label">Tests Passed</div>
              </div>
            </div>
            <div className="ws-stat-row">
              <div className="ws-stat-box">
                <div className="ws-stat-label">TIME TAKEN</div>
                <div className="ws-stat-value blue">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {fmt(timeTaken)}
                </div>
              </div>
              <div className="ws-stat-box">
                <div className="ws-stat-label">DIFFICULTY</div>
                <div className={`ws-stat-value diff-${(problem?.difficulty || 'Medium').toLowerCase()}`}>{problem?.difficulty || 'Medium'}</div>
              </div>
            </div>
          </motion.div>

          {/* Progression Card */}
          <motion.div className="ws-card" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <div className="ws-card-label">YOUR PROGRESSION</div>
            <div className="ws-perf-row">
              <div className={`ws-elo-icon ${(eloData?.eloChange || 0) >= 0 ? 'up' : 'down'}`}>
                {(eloData?.eloChange || 0) >= 0
                  ? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="7" x2="17" y2="17"/><polyline points="17 7 17 17 7 17"/></svg>
                }
              </div>
              <div>
                <div className={`ws-elo-change ${(eloData?.eloChange || 0) >= 0 ? 'up' : 'down'}`}>
                  {eloChange > 0 ? '+' : ''}{eloChange}
                </div>
                <div className="ws-small-label">ELO CHANGE</div>
              </div>
            </div>
            <div className="ws-stat-row">
              <div className="ws-stat-box">
                <div className="ws-stat-label">CURRENT RANK</div>
                <div className="ws-stat-value gold">🏅 {eloData?.newRank || 'Bronze I'}</div>
              </div>
              <div className="ws-stat-box">
                <div className="ws-stat-label">ELO RATING</div>
                <div className="ws-stat-value white">{eloData?.newElo || 500}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══ Premium Sections ═══ */}
        {premiumMode && isWin && (
          <motion.div className="ws-premium-sections" variants={fadeUp} initial="hidden" animate="visible" custom={3}>

            {/* ── Clara AI Review ── */}
            <div className={`ws-accordion ${showAI ? 'open' : ''}`} onClick={() => setShowAI(!showAI)}>
              <div className="ws-accordion-header">
                <div className="ws-accordion-left">
                  <div className="ws-acc-icon pink">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2V6a4 4 0 0 1 4-4z"/><rect x="9" y="14" width="6" height="6" rx="1"/><line x1="8" y1="22" x2="16" y2="22"/><circle cx="10" cy="8" r="1" fill="currentColor"/><circle cx="14" cy="8" r="1" fill="currentColor"/></svg>
                  </div>
                  <div>
                    <div className="ws-acc-title">Clara AI Review</div>
                    <div className="ws-acc-sub">Personalized code insights & feedback</div>
                  </div>
                </div>
                <motion.div className="ws-chevron pink" animate={{ rotate: showAI ? 180 : 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </motion.div>
              </div>

              <AnimatePresence>
                {showAI && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }} onClick={e => e.stopPropagation()}
                  >
                    <div className="ws-acc-body">
                      {aiLoading ? (
                        <div className="ws-loading pink">
                          <div className="ws-spinner pink" />
                          <span>Analyzing your solution...</span>
                        </div>
                      ) : aiFeedback ? (
                        <div className="ws-feedback-grid">
                          <div className="ws-feedback-card green">
                            <div className="ws-feedback-label green">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              STRENGTHS
                            </div>
                            <ul className="ws-feedback-list">
                              {aiFeedback.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </div>
                          <div className="ws-feedback-card orange">
                            <div className="ws-feedback-label orange">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                              IMPROVEMENTS
                            </div>
                            <ul className="ws-feedback-list">
                              {aiFeedback.improvements?.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </div>
                        </div>
                      ) : <div className="ws-empty">Feedback unavailable</div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── MAANG Report Card ── */}
            <div className={`ws-accordion ${showReport ? 'open' : ''}`} onClick={() => setShowReport(!showReport)}>
              <div className="ws-accordion-header">
                <div className="ws-accordion-left">
                  <div className="ws-acc-icon purple">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/><line x1="12" y1="11" x2="12" y2="15"/><line x1="10" y1="13" x2="14" y2="13"/></svg>
                  </div>
                  <div>
                    <div className="ws-acc-title">MAANG Report Card</div>
                    <div className="ws-acc-sub">See how you'd perform in a real interview</div>
                  </div>
                </div>
                <motion.div className="ws-chevron purple" animate={{ rotate: showReport ? 180 : 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </motion.div>
              </div>

              <AnimatePresence>
                {showReport && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }} onClick={e => e.stopPropagation()}
                  >
                    <div className="ws-acc-body">
                      {reportLoading ? (
                        <div className="ws-loading purple">
                          <div className="ws-spinner purple" />
                          <span>Evaluating interview performance...</span>
                        </div>
                      ) : reportCard ? (
                        <div className="ws-report">
                          {/* Verdict Banner */}
                          <div className="ws-verdict-row">
                            <div className="ws-verdict-text">"{reportCard.verdictReason}"</div>
                            <div className={`ws-verdict-badge ${(reportCard.verdict || '').toLowerCase().replace(' ', '-')}`}>
                              {reportCard.verdict === 'HIRE' ? '✅' : reportCard.verdict === 'BORDERLINE' ? '🔶' : '❌'} {reportCard.verdict}
                            </div>
                          </div>

                          {/* Scores Grid */}
                          <div className="ws-report-grid">
                            {/* Skill Bars */}
                            <div className="ws-skill-bars">
                              {[
                                { label: 'Code Quality', value: reportCard.codeQuality || 0, color: '#a855f7' },
                                { label: 'Readability', value: reportCard.readability || 0, color: '#60a5fa' },
                                { label: 'Problem Solving', value: reportCard.problemSolving || 0, color: '#22c55e' },
                              ].map(({ label, value, color }, idx) => (
                                <div key={label} className="ws-skill-item">
                                  <div className="ws-skill-header">
                                    <span className="ws-skill-name">{label}</span>
                                    <span className="ws-skill-score" style={{ color }}>{value}/100</span>
                                  </div>
                                  <AnimatedBar value={value} color={color} delay={600 + idx * 200} />
                                </div>
                              ))}
                            </div>

                            {/* Hire Score + Stats */}
                            <div className="ws-hire-col">
                              <div className="ws-hire-score-box">
                                <div className={`ws-hire-score ${reportCard.verdict === 'HIRE' ? 'green' : reportCard.verdict === 'BORDERLINE' ? 'gold' : 'red'}`}>
                                  {reportCard.hireScore || 0}
                                </div>
                                <div className="ws-hire-label">HIRE SCORE</div>
                              </div>
                              {reportCard.topStrength && (
                                <div className="ws-top-strength">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                  {reportCard.topStrength}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Extra Data Row */}
                          <div className="ws-extra-row">
                            {reportCard.speedPercentile != null && (
                              <div className="ws-extra-chip">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                Faster than <strong>{reportCard.speedPercentile}%</strong> of candidates
                              </div>
                            )}
                            {reportCard.edgeCasesMissed != null && reportCard.edgeCasesMissed > 0 && (
                              <div className="ws-extra-chip warn">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                {reportCard.edgeCasesMissed} edge case{reportCard.edgeCasesMissed > 1 ? 's' : ''} missed
                              </div>
                            )}
                            {reportCard.criticalFlaw && (
                              <div className="ws-extra-chip danger">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                                {reportCard.criticalFlaw}
                              </div>
                            )}
                          </div>

                          {/* Company Fit */}
                          {reportCard.companyFit && (
                            <div className="ws-company-fit">
                              <div className="ws-company-fit-label">COMPANY FIT</div>
                              <div className="ws-company-fit-grid">
                                {[
                                  { name: 'Google', value: reportCard.companyFit.google, color: '#4285F4', icon: 'G' },
                                  { name: 'Amazon', value: reportCard.companyFit.amazon, color: '#FF9900', icon: 'A' },
                                  { name: 'Microsoft', value: reportCard.companyFit.microsoft, color: '#00BCF2', icon: 'M' },
                                ].map(({ name, value, color, icon }, idx) => (
                                  <div key={name} className="ws-company-item">
                                    <div className="ws-company-logo" style={{ background: `${color}18`, color, borderColor: `${color}30` }}>{icon}</div>
                                    <div className="ws-company-info">
                                      <div className="ws-company-name">{name}</div>
                                      <AnimatedBar value={value || 0} color={color} delay={800 + idx * 200} />
                                    </div>
                                    <div className="ws-company-pct" style={{ color }}>{value || 0}%</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : <div className="ws-empty">Report unavailable</div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* ═══ Bottom Action Buttons ═══ */}
      <div className="ws-bottom-bar">
        <div className="ws-actions">
          <button className="ws-btn secondary" onClick={() => navigate('/', { replace: true })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </button>
          <button className="ws-btn primary" onClick={() => premiumMode ? navigate('/interview-dsa', { replace: true }) : navigate('/lobby?tab=quickplay', { replace: true })}>
            Next Challenge
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </button>
        </div>
      </div>

      {/* ═══ Styles ═══ */}
      <style>{`
        .ws-root {
          position: fixed; inset: 0; background: #07070a;
          z-index: 100; overflow-y: auto; overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }
        .ws-bg-glow {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
        }

        /* Confetti */
        .ws-confetti-layer { position: fixed; inset: 0; pointer-events: none; z-index: 101; overflow: hidden; }
        .ws-confetti-piece {
          position: absolute; left: var(--x); top: -12px;
          width: var(--size); height: var(--size);
          background: var(--color); border-radius: 2px;
          animation: wsFall var(--dur) ease-in var(--delay) forwards;
          opacity: 0;
        }
        @keyframes wsFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(var(--rot)); opacity: 0; }
        }

        /* Banner */
        .ws-banner {
          text-align: center; padding: 70px 20px 50px;
          position: relative; z-index: 1;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .ws-trophy {
          font-size: 68px; margin-bottom: 12px;
          filter: drop-shadow(0 0 40px rgba(255,255,255,0.2));
        }
        .ws-title {
          font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 54px;
          letter-spacing: -1.5px; margin: 0 0 10px;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .ws-title.win { background: linear-gradient(135deg, #4ade80 0%, #10b981 50%, #059669 100%); -webkit-background-clip: text; }
        .ws-title.lose { background: linear-gradient(135deg, #f87171, #dc2626); -webkit-background-clip: text; }
        .ws-subtitle { color: #71717a; font-size: 17px; font-weight: 500; margin: 0; letter-spacing: 0.3px; }

        /* Content */
        .ws-content { max-width: 900px; margin: 0 auto; padding: 32px 20px 160px; position: relative; z-index: 1; }

        /* Rank Up */
        .ws-rankup {
          background: linear-gradient(135deg, rgba(251,191,36,0.08), rgba(245,158,11,0.04));
          border: 1px solid rgba(251,191,36,0.2); border-radius: 14px;
          padding: 14px 20px; margin-bottom: 28px; text-align: center;
          font-size: 15px; font-weight: 800; color: #fbbf24;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 0 30px rgba(251,191,36,0.08);
          animation: wsGlowPulse 2s ease-in-out infinite;
        }
        .ws-rankup-icon { font-size: 20px; }
        .ws-rankup-old { text-decoration: line-through; opacity: 0.5; }
        .ws-rankup-new { color: #fde68a; }
        @keyframes wsGlowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.08); }
          50% { box-shadow: 0 0 40px rgba(251,191,36,0.15); }
        }

        /* Cards Grid */
        .ws-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
        .ws-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; padding: 26px; backdrop-filter: blur(12px);
          display: flex; flex-direction: column;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .ws-card:hover { border-color: rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .ws-card-label { font-size: 11px; color: #71717a; font-weight: 700; letter-spacing: 1.5px; margin-bottom: 22px; }
        .ws-perf-row { display: flex; align-items: center; gap: 22px; margin-bottom: 24px; }

        /* Circle */
        .ws-circle-wrap { position: relative; width: 100px; height: 100px; flex-shrink: 0; }
        .ws-circle-inner {
          position: absolute; inset: 7px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; flex-direction: column;
        }
        .ws-circle-num { font-size: 19px; font-weight: 900; color: #fff; font-family: 'Outfit', sans-serif; }
        .ws-big-pct { font-size: 34px; font-weight: 900; color: #fff; font-family: 'Outfit', sans-serif; line-height: 1; }
        .ws-small-label { font-size: 12px; color: #71717a; margin-top: 4px; font-weight: 500; }

        /* Stat Boxes */
        .ws-stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: auto; }
        .ws-stat-box {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          padding: 14px 16px; border-radius: 14px;
        }
        .ws-stat-label { font-size: 10px; color: #71717a; margin-bottom: 6px; letter-spacing: 1px; font-weight: 700; }
        .ws-stat-value { font-size: 16px; font-weight: 800; font-family: 'Outfit', sans-serif; display: flex; align-items: center; gap: 6px; }
        .ws-stat-value.blue { color: #60a5fa; }
        .ws-stat-value.gold { color: #fbbf24; }
        .ws-stat-value.white { color: #fff; }
        .ws-stat-value.diff-easy { color: #22c55e; }
        .ws-stat-value.diff-medium { color: #fb923c; }
        .ws-stat-value.diff-hard { color: #ef4444; }

        /* ELO */
        .ws-elo-icon {
          width: 60px; height: 60px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ws-elo-icon.up { background: rgba(34,197,94,0.08); color: #22c55e; border: 1px solid rgba(34,197,94,0.15); }
        .ws-elo-icon.down { background: rgba(239,68,68,0.08); color: #ef4444; border: 1px solid rgba(239,68,68,0.15); }
        .ws-elo-change { font-size: 38px; font-weight: 900; font-family: 'Outfit', sans-serif; line-height: 1; }
        .ws-elo-change.up { color: #22c55e; text-shadow: 0 0 30px rgba(34,197,94,0.25); }
        .ws-elo-change.down { color: #ef4444; text-shadow: 0 0 30px rgba(239,68,68,0.25); }

        /* Accordion */
        .ws-premium-sections { display: flex; flex-direction: column; gap: 16px; }
        .ws-accordion {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; cursor: pointer; transition: all 0.3s;
          overflow: hidden;
        }
        .ws-accordion:hover { border-color: rgba(255,255,255,0.1); }
        .ws-accordion.open { border-color: rgba(255,255,255,0.1); }
        .ws-accordion-header { display: flex; align-items: center; justify-content: space-between; padding: 22px 26px; }
        .ws-accordion-left { display: flex; align-items: center; gap: 16px; }
        .ws-acc-icon {
          width: 50px; height: 50px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ws-acc-icon.pink { background: rgba(236,72,153,0.08); color: #ec4899; border: 1px solid rgba(236,72,153,0.15); }
        .ws-acc-icon.purple { background: rgba(168,85,247,0.08); color: #a855f7; border: 1px solid rgba(168,85,247,0.15); }
        .ws-acc-title { font-size: 18px; font-weight: 800; color: #fff; font-family: 'Outfit', sans-serif; }
        .ws-acc-sub { font-size: 13px; color: #71717a; margin-top: 2px; }
        .ws-chevron {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .ws-chevron.pink { background: rgba(236,72,153,0.08); color: #ec4899; }
        .ws-chevron.purple { background: rgba(168,85,247,0.08); color: #a855f7; }
        .ws-acc-body { padding: 0 26px 26px; border-top: 1px solid rgba(255,255,255,0.04); margin-top: 0; padding-top: 24px; }

        /* Loading */
        .ws-loading { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 24px; font-size: 14px; font-weight: 600; }
        .ws-loading.pink { color: #ec4899; }
        .ws-loading.purple { color: #a855f7; }
        .ws-spinner { width: 18px; height: 18px; border: 2.5px solid transparent; border-radius: 50%; animation: wsSpin 0.8s linear infinite; }
        .ws-spinner.pink { border-color: rgba(236,72,153,0.2); border-top-color: #ec4899; }
        .ws-spinner.purple { border-color: rgba(168,85,247,0.2); border-top-color: #a855f7; }
        @keyframes wsSpin { to { transform: rotate(360deg); } }

        /* Feedback */
        .ws-feedback-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ws-feedback-card { padding: 20px; border-radius: 14px; }
        .ws-feedback-card.green { background: rgba(34,197,94,0.04); border: 1px solid rgba(34,197,94,0.12); }
        .ws-feedback-card.orange { background: rgba(255,107,53,0.04); border: 1px solid rgba(255,107,53,0.12); }
        .ws-feedback-label { font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .ws-feedback-label.green { color: #22c55e; }
        .ws-feedback-label.orange { color: #ff6b35; }
        .ws-feedback-list { margin: 0; padding-left: 16px; color: #d4d4d8; font-size: 13px; line-height: 1.7; }
        .ws-feedback-list li { margin-bottom: 6px; }
        .ws-empty { color: #52525b; font-size: 14px; text-align: center; padding: 20px; }

        /* Report Card */
        .ws-report { display: flex; flex-direction: column; gap: 20px; }
        .ws-verdict-row {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          padding: 16px 20px; border-radius: 14px;
        }
        .ws-verdict-text { font-size: 14px; color: #a1a1aa; font-style: italic; flex: 1; line-height: 1.5; }
        .ws-verdict-badge {
          padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 800;
          flex-shrink: 0; letter-spacing: 0.5px;
        }
        .ws-verdict-badge.hire { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; }
        .ws-verdict-badge.borderline { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); color: #fbbf24; }
        .ws-verdict-badge.no-hire { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; }
        .ws-report-grid { display: grid; grid-template-columns: 1fr 200px; gap: 24px; }
        .ws-skill-bars { display: flex; flex-direction: column; gap: 16px; }
        .ws-skill-item {}
        .ws-skill-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .ws-skill-name { font-size: 13px; color: #a1a1aa; font-weight: 600; }
        .ws-skill-score { font-size: 13px; font-weight: 800; }
        .ws-hire-col { display: flex; flex-direction: column; gap: 12px; }
        .ws-hire-score-box {
          flex: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px; padding: 20px; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .ws-hire-score { font-size: 42px; font-weight: 900; font-family: 'Outfit', sans-serif; line-height: 1; }
        .ws-hire-score.green { color: #22c55e; }
        .ws-hire-score.gold { color: #fbbf24; }
        .ws-hire-score.red { color: #ef4444; }
        .ws-hire-label { font-size: 11px; color: #71717a; font-weight: 700; letter-spacing: 1px; margin-top: 8px; }
        .ws-top-strength {
          background: rgba(34,197,94,0.04); border: 1px solid rgba(34,197,94,0.12);
          border-radius: 12px; padding: 12px 14px; font-size: 12px; color: #86efac;
          font-weight: 600; display: flex; align-items: flex-start; gap: 8px; line-height: 1.4;
        }
        .ws-top-strength svg { flex-shrink: 0; margin-top: 1px; }

        /* Extra Data */
        .ws-extra-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .ws-extra-chip {
          display: flex; align-items: center; gap: 8px;
          background: rgba(96,165,250,0.05); border: 1px solid rgba(96,165,250,0.12);
          border-radius: 10px; padding: 10px 14px; font-size: 12px; color: #93c5fd; font-weight: 500;
        }
        .ws-extra-chip strong { font-weight: 800; }
        .ws-extra-chip.warn { background: rgba(251,191,36,0.05); border-color: rgba(251,191,36,0.12); color: #fde68a; }
        .ws-extra-chip.danger { background: rgba(248,113,113,0.05); border-color: rgba(248,113,113,0.12); color: #fca5a5; }

        /* Company Fit */
        .ws-company-fit { padding-top: 8px; }
        .ws-company-fit-label { font-size: 11px; color: #71717a; font-weight: 700; letter-spacing: 1.5px; margin-bottom: 14px; }
        .ws-company-fit-grid { display: flex; flex-direction: column; gap: 12px; }
        .ws-company-item { display: flex; align-items: center; gap: 12px; }
        .ws-company-logo {
          width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 900; font-family: 'Outfit', sans-serif;
          border: 1px solid;
        }
        .ws-company-info { flex: 1; }
        .ws-company-name { font-size: 12px; color: #a1a1aa; font-weight: 600; margin-bottom: 6px; }
        .ws-company-pct { font-size: 14px; font-weight: 800; width: 40px; text-align: right; }

        /* Bottom Bar */
        .ws-bottom-bar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 102;
          background: linear-gradient(transparent, #07070a 50%);
          padding: 40px 20px 24px;
          display: flex; justify-content: center;
        }
        .ws-actions { display: flex; gap: 14px; max-width: 480px; width: 100%; }
        .ws-btn {
          flex: 1; border: none; border-radius: 100px; padding: 15px 20px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          font-family: 'Inter', sans-serif; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ws-btn.secondary {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: #a1a1aa; backdrop-filter: blur(12px);
        }
        .ws-btn.secondary:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .ws-btn.primary {
          background: linear-gradient(135deg, #ff6b35, #f7451d);
          color: #fff; box-shadow: 0 6px 24px rgba(249,115,22,0.3);
        }
        .ws-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(249,115,22,0.4); }

        /* Responsive */
        @media (max-width: 768px) {
          .ws-cards-grid { grid-template-columns: 1fr !important; }
          .ws-feedback-grid { grid-template-columns: 1fr !important; }
          .ws-report-grid { grid-template-columns: 1fr !important; }
          .ws-verdict-row { flex-direction: column; text-align: center; }
          .ws-title { font-size: 40px !important; }
          .ws-banner { padding: 50px 16px 36px !important; }
        }
        @media (max-width: 480px) {
          .ws-actions { flex-direction: column; }
          .ws-btn { padding: 18px !important; font-size: 16px !important; }
          .ws-perf-row { gap: 16px; }
          .ws-big-pct { font-size: 28px; }
          .ws-elo-change { font-size: 30px; }
          .ws-extra-row { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}