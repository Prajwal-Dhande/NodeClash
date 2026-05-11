import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../config/api'
import PremiumRadarChart from './PremiumRadarChart'

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
          timeTaken, passedTests: myTests, totalTests
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
          passedTests: myTests, totalTests, timeTaken, result
        })
      }).then(r => r.json()).then(d => { if (d.success) setReportCard(d.report) })
        .catch(console.error).finally(() => setReportLoading(false))
    }
  }, [])

  const isWin = result === 'win'
  const fmt = (s) => s ? `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}` : '-'

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(30px)',
      zIndex: 100, overflowY: 'auto', overflowX: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Confetti */}
      {isWin && (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 101 }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${Math.random() * 100}%`, top: '-20px',
              width: `${Math.random() * 6 + 3}px`, height: `${Math.random() * 6 + 3}px`,
              background: ['#ff6b35','#fbbf24','#22c55e','#60a5fa','#a855f7'][i % 5],
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              animation: `confettiFall ${Math.random() * 2 + 2}s linear ${Math.random() * 2}s forwards`, opacity: 0
            }} />
          ))}
        </div>
      )}

      {/* Immersive Victory Banner (Top) */}
      <div className="victory-banner" style={{
        width: '100%', position: 'relative', padding: '80px 20px 60px', textAlign: 'center',
        background: isWin ? 'radial-gradient(circle at 50% 100%, rgba(34,197,94,0.15) 0%, transparent 60%)' : 'radial-gradient(circle at 50% 100%, rgba(239,68,68,0.15) 0%, transparent 60%)',
        borderBottom: '1px solid var(--glass-border, rgba(255,255,255,0.05))',
        marginBottom: 40
      }}>
        <div style={{ fontSize: 72, marginBottom: 16, filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.3))' }}>{isWin ? '🏆' : '💀'}</div>
        <h1 className="victory-title" style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 56, letterSpacing: '-1.5px', margin: '0 0 12px 0',
          background: isWin ? 'linear-gradient(135deg, #4ade80, #10b981)' : 'linear-gradient(135deg, #f87171, #dc2626)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          filter: isWin ? 'drop-shadow(0 4px 16px rgba(34,197,94,0.4))' : 'drop-shadow(0 4px 16px rgba(239,68,68,0.4))'
        }}>
          {isWin ? 'Victory!' : 'Defeated!'}
        </h1>
        <p style={{ color: 'var(--text-muted, #a1a1aa)', fontSize: 18, fontWeight: 500, margin: 0, letterSpacing: '0.5px' }}>
          {isWin ? `${problem?.title || 'Problem'} Crushed` : 'Better luck next time'}
        </p>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 140px', position: 'relative', zIndex: 1 }}>

        {/* Rank Up Banner */}
        {rankUp && eloData && (
          <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 16, padding: '16px 20px', marginBottom: 32, textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#fbbf24', boxShadow: '0 8px 32px rgba(251,191,36,0.15)' }}>
            🎉 RANK UP! {eloData.oldRank} → {eloData.newRank}
          </div>
        )}

        {/* Specialized Performance Split */}
        <div className="performance-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
          
          {/* Left Card: Match Analytics */}
          <div style={{ background: 'var(--card-bg, rgba(20,20,20,0.6))', border: '1px solid var(--glass-border, rgba(255,255,255,0.08))', borderRadius: 20, padding: 28, backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted, #a1a1aa)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: 24 }}>PERFORMANCE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28 }}>
              {/* Circular Progress */}
              <div style={{ width: 90, height: 90, borderRadius: '50%', background: `conic-gradient(#22c55e ${(myTests/totalTests)*100}%, rgba(255,255,255,0.05) 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(34,197,94,0.15)' }}>
                <div style={{ width: 78, height: 78, background: 'var(--bg-main, #0a0a0a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>{myTests}/{totalTests}</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 4 }}>{Math.round((myTests/totalTests)*100)}%</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted, #a1a1aa)' }}>Tests Passed</div>
              </div>
            </div>
            <div className="stat-boxes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 'auto' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border, rgba(255,255,255,0.05))', padding: '16px', borderRadius: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted, #a1a1aa)', marginBottom: 6, letterSpacing: '1px', fontWeight: 600 }}>TIME TAKEN</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#60a5fa', fontFamily: 'Outfit, sans-serif' }}>⏱ {fmt(timeTaken)}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border, rgba(255,255,255,0.05))', padding: '16px', borderRadius: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted, #a1a1aa)', marginBottom: 6, letterSpacing: '1px', fontWeight: 600 }}>DIFFICULTY</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fb923c' }}>{problem?.difficulty || 'Medium'}</div>
              </div>
            </div>
          </div>

          {/* Right Card: Player Progression */}
          <div style={{ background: 'var(--card-bg, rgba(20,20,20,0.6))', border: '1px solid var(--glass-border, rgba(255,255,255,0.08))', borderRadius: 20, padding: 28, backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted, #a1a1aa)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: 24 }}>YOUR PROGRESSION</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
              <div style={{ background: eloData?.eloChange >= 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: eloData?.eloChange >= 0 ? '#22c55e' : '#ef4444', width: 64, height: 64, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: `1px solid ${eloData?.eloChange >= 0 ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                {eloData?.eloChange >= 0 ? '↗' : '↘'}
              </div>
              <div>
                <div style={{ fontSize: 40, fontWeight: 900, color: eloData?.eloChange >= 0 ? '#22c55e' : '#ef4444', fontFamily: 'Outfit, sans-serif', textShadow: `0 0 30px ${eloData?.eloChange >= 0 ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, lineHeight: 1 }}>
                  {eloData?.eloChange > 0 ? '+' : ''}{eloData?.eloChange || 0}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted, #a1a1aa)', marginTop: 6, fontWeight: 500 }}>ELO CHANGE</div>
              </div>
            </div>
            <div className="stat-boxes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 'auto' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border, rgba(255,255,255,0.05))', padding: '16px', borderRadius: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted, #a1a1aa)', marginBottom: 6, letterSpacing: '1px', fontWeight: 600 }}>CURRENT RANK</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fbbf24' }}>🏅 {eloData?.newRank || 'Bronze I'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border, rgba(255,255,255,0.05))', padding: '16px', borderRadius: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted, #a1a1aa)', marginBottom: 6, letterSpacing: '1px', fontWeight: 600 }}>ELO RATING</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>{eloData?.newElo || 500}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Unlocked Insights Section (Bottom - Full-width Cards) */}
        {premiumMode && isWin && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <motion.div 
              whileHover={{ boxShadow: '0 0 30px rgba(236,72,153,0.15)', borderColor: 'rgba(236,72,153,0.4)' }}
              style={{ background: 'var(--card-bg, rgba(20,20,20,0.6))', border: '1px solid var(--glass-border, rgba(255,255,255,0.08))', borderRadius: 20, padding: '24px 28px', cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(16px)' }}
              onClick={() => setShowAI(!showAI)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(236,72,153,0.1)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1px solid rgba(236,72,153,0.2)' }}>🤖</div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>Clara AI Review</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted, #a1a1aa)', marginTop: 2 }}>Unlock personalized code insights and feedback</div>
                  </div>
                </div>
                <motion.div animate={{ rotate: showAI ? 180 : 0 }} style={{ color: '#ec4899', width: 32, height: 32, background: 'rgba(236,72,153,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼</motion.div>
              </div>
              
              <AnimatePresence>
                {showAI && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                    <div style={{ paddingTop: 24, marginTop: 24, borderTop: '1px solid var(--glass-border, rgba(255,255,255,0.05))' }}>
                      {aiLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ec4899', justifyContent: 'center', padding: 20 }}>
                          <div style={{ width: 16, height: 16, border: '2px solid rgba(236,72,153,0.3)', borderTopColor: '#ec4899', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                          <span style={{ fontSize: 14, fontWeight: 600 }}>Analyzing your solution...</span>
                        </div>
                      ) : aiFeedback ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                          <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', padding: 20, borderRadius: 14 }}>
                            <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 800, marginBottom: 12, letterSpacing: '1px' }}>✓ STRENGTHS</div>
                            <ul style={{ margin: 0, paddingLeft: 16, color: '#e5e5e5', fontSize: 14, lineHeight: 1.6 }}>{aiFeedback.strengths?.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}</ul>
                          </div>
                          <div style={{ background: 'rgba(255,107,53,0.05)', border: '1px solid rgba(255,107,53,0.15)', padding: 20, borderRadius: 14 }}>
                            <div style={{ fontSize: 12, color: '#ff6b35', fontWeight: 800, marginBottom: 12, letterSpacing: '1px' }}>⚠ IMPROVEMENTS</div>
                            <ul style={{ margin: 0, paddingLeft: 16, color: '#e5e5e5', fontSize: 14, lineHeight: 1.6 }}>{aiFeedback.improvements?.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}</ul>
                          </div>
                        </div>
                      ) : <div style={{ color: 'var(--text-muted, #a1a1aa)', fontSize: 14, textAlign: 'center' }}>Feedback unavailable.</div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              whileHover={{ boxShadow: '0 0 30px rgba(168,85,247,0.15)', borderColor: 'rgba(168,85,247,0.4)' }}
              style={{ background: 'var(--card-bg, rgba(20,20,20,0.6))', border: '1px solid var(--glass-border, rgba(255,255,255,0.08))', borderRadius: 20, padding: '24px 28px', cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(16px)' }}
              onClick={() => setShowReport(!showReport)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(168,85,247,0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1px solid rgba(168,85,247,0.2)' }}>🏢</div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>MAANG Report Card</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted, #a1a1aa)', marginTop: 2 }}>See how you'd perform in a real interview</div>
                  </div>
                </div>
                <motion.div animate={{ rotate: showReport ? 180 : 0 }} style={{ color: '#a855f7', width: 32, height: 32, background: 'rgba(168,85,247,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼</motion.div>
              </div>
              
              <AnimatePresence>
                {showReport && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                    <div style={{ paddingTop: 24, marginTop: 24, borderTop: '1px solid var(--glass-border, rgba(255,255,255,0.05))' }}>
                      {reportLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#a855f7', justifyContent: 'center', padding: 20 }}>
                          <div style={{ width: 16, height: 16, border: '2px solid rgba(168,85,247,0.3)', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                          <span style={{ fontSize: 14, fontWeight: 600 }}>Evaluating interview performance...</span>
                        </div>
                      ) : reportCard ? (
                        <div>
                          {/* Verdict */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: 15, color: '#d1d5db', fontStyle: 'italic', flex: 1, marginRight: 20 }}>"{reportCard.verdictReason}"</div>
                            <div style={{
                              background: reportCard.verdict === 'HIRE' ? 'rgba(34,197,94,0.15)' : reportCard.verdict === 'BORDERLINE' ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.15)',
                              border: `1px solid ${reportCard.verdict === 'HIRE' ? 'rgba(34,197,94,0.4)' : reportCard.verdict === 'BORDERLINE' ? 'rgba(251,191,36,0.4)' : 'rgba(239,68,68,0.4)'}`,
                              padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 800, flexShrink: 0,
                              color: reportCard.verdict === 'HIRE' ? '#22c55e' : reportCard.verdict === 'BORDERLINE' ? '#fbbf24' : '#ef4444'
                            }}>
                              {reportCard.verdict === 'HIRE' ? '✅ HIRE' : reportCard.verdict === 'BORDERLINE' ? '🔶 BORDERLINE' : '❌ NO HIRE'}
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
                            {/* Score Bars */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                              {[
                                { label: 'Code Quality', value: reportCard.codeQuality || 0, color: '#a855f7' },
                                { label: 'Readability', value: reportCard.readability || 0, color: '#60a5fa' },
                                { label: 'Problem Solving', value: reportCard.problemSolving || 0, color: '#22c55e' },
                              ].map(({ label, value, color }) => (
                                <div key={label}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>{label}</span>
                                    <span style={{ fontSize: 13, fontWeight: 800, color }}>{value}/100</span>
                                  </div>
                                  <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 4, boxShadow: `0 0 10px ${color}80` }} />
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Quick stats column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                              <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ fontSize: 36, fontWeight: 900, color: reportCard.verdict === 'HIRE' ? '#22c55e' : '#fbbf24', fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{reportCard.hireScore}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted, #a1a1aa)', fontWeight: 700, letterSpacing: '1px', marginTop: 8 }}>HIRE SCORE</div>
                              </div>
                              {reportCard.topStrength && (
                                <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                  <span style={{ fontSize: 13, color: '#86efac', fontWeight: 600 }}>✓ {reportCard.topStrength}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : <div style={{ color: 'var(--text-muted, #a1a1aa)', fontSize: 14, textAlign: 'center' }}>Report unavailable.</div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>

      {/* Primary Action Buttons */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, var(--bg-main, #0a0a0a) 60%)',
        padding: '40px 20px 24px', zIndex: 102,
        display: 'flex', justifyContent: 'center'
      }}>
        <div className="action-buttons-container" style={{ display: 'flex', gap: 16, maxWidth: 500, width: '100%' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ flex: 1, background: 'var(--card-bg, rgba(255,255,255,0.05))', border: '1px solid var(--glass-border, rgba(255,255,255,0.1))', color: 'var(--text-muted, #a1a1aa)', borderRadius: 100, padding: '16px', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', backdropFilter: 'blur(12px)', transition: 'all 0.2s' }} 
            onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.1)'} 
            onMouseOut={e => e.target.style.background = 'var(--card-bg, rgba(255,255,255,0.05))'}
          >
            Dashboard
          </button>
          <button 
            onClick={() => premiumMode ? navigate('/interview-dsa') : navigate('/lobby?tab=quickplay')} 
            style={{ flex: 1, background: 'linear-gradient(135deg, #ff6b35, #f7451d)', border: 'none', color: '#fff', borderRadius: 100, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(249,115,22,0.4)', transition: 'transform 0.2s' }} 
            onMouseOver={e => e.target.style.transform = 'translateY(-2px)'} 
            onMouseOut={e => e.target.style.transform = 'none'}
          >
            Next Challenge ⚡
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confettiFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Responsive Overrides */
        @media (max-width: 900px) {
          .performance-split { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 480px) {
          .victory-banner { padding: 40px 16px 30px !important; }
          .victory-title { font-size: 40px !important; }
          .action-buttons-container { flex-direction: column !important; }
          .action-buttons-container button { padding: 20px !important; font-size: 18px !important; }
        }
      `}</style>
    </div>
  )
}