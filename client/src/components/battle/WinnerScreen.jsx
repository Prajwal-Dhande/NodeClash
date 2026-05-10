import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import API_URL from '../../config/api'
import PremiumRadarChart from './PremiumRadarChart'

export default function WinnerScreen({ result, problem, myTests, totalTests, timeTaken, onRematch, onLobby, opponentName, difficulty, language, premiumMode, userCode, timeComplexity, complexity }) {
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
      background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)',
      zIndex: 100, overflowY: 'auto',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Ambient Glow */}
      <div style={{
        position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 800, height: 800,
        background: `radial-gradient(circle, ${isWin ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'} 0%, transparent 60%)`,
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
      }} />

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

      {/* Content */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '28px 20px 100px', position: 'relative', zIndex: 1 }}>

        {/* Result Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12, filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}>{isWin ? '🏆' : '💀'}</div>
          <div style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 48, letterSpacing: '-1px',
            background: isWin ? 'linear-gradient(to right, #4ade80, #22c55e)' : 'linear-gradient(to right, #f87171, #ef4444)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8,
            filter: isWin ? 'drop-shadow(0 4px 12px rgba(34,197,94,0.3))' : 'drop-shadow(0 4px 12px rgba(239,68,68,0.3))'
          }}>{isWin ? 'Victory!' : 'Defeated!'}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 15, fontWeight: 500 }}>
            {isWin ? 'You outpaced your opponent!' : 'Better luck next time.'}
          </div>
        </div>

        {/* Rank Up Banner */}
        {rankUp && eloData && (
          <div style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#fbbf24', boxShadow: '0 4px 20px rgba(255,107,53,0.2)' }}>
            🎉 RANK UP! {eloData.oldRank} → {eloData.newRank}
          </div>
        )}

        {/* Compact Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { val: `${myTests}/${totalTests}`, label: 'Tests', color: '#22c55e' },
            { val: fmt(timeTaken), label: 'Time', color: '#60a5fa' },
            { val: problem?.difficulty || 'Medium', label: 'Difficulty', color: '#fb923c' },
            { val: opponentName || 'Bot', label: 'Opponent', color: '#a855f7' },
            ...(eloData ? [
              { val: `${eloData.eloChange > 0 ? '+' : ''}${eloData.eloChange}`, label: 'ELO', color: isWin ? '#22c55e' : '#ef4444' },
              { val: `${eloData.newElo}`, label: 'Rating', color: '#ff6b35' },
            ] : []),
          ].map(({ val, label, color }) => (
            <div key={label} style={{ 
              background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)', borderTop: `2px solid ${color}60`,
              borderRadius: 12, padding: '14px 10px', textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color, fontFamily: 'Outfit, sans-serif' }}>{val}</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '1.5px', fontWeight: 600 }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Premium Sections — Collapsible */}
        {premiumMode && isWin && (
          <>
            {/* Clara AI Review Toggle */}
            <motion.button 
              whileHover={{ borderColor: 'rgba(236,72,153,0.4)', boxShadow: '0 0 15px rgba(236,72,153,0.1)' }}
              onClick={() => setShowAI(!showAI)} style={{
                width: '100%', background: showAI ? 'rgba(236,72,153,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${showAI ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12, padding: '16px 20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: showAI ? 0 : 12, color: '#ec4899', fontSize: 14, fontWeight: 700,
                borderBottomLeftRadius: showAI ? 0 : 12, borderBottomRightRadius: showAI ? 0 : 12,
                fontFamily: 'Inter, sans-serif', backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>🤖</span>
                <span>Clara AI Review</span>
              </div>
              <motion.span animate={{ rotate: showAI ? 180 : 0 }} style={{ fontSize: 12, color: 'var(--text-muted)' }}>▼</motion.span>
            </motion.button>

            <AnimatePresence>
              {showAI && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', marginBottom: 12 }}
                >
                  <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', border: '1px solid rgba(236,72,153,0.3)', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '20px' }}>
                    {aiLoading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ec4899', justifyContent: 'center', padding: 16 }}>
                        <div style={{ width: 14, height: 14, border: '2px solid rgba(236,72,153,0.3)', borderTopColor: '#ec4899', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontSize: 12 }}>Analyzing code...</span>
                      </div>
                    ) : aiFeedback ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', padding: '14px', borderRadius: 10 }}>
                          <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 800, marginBottom: 8 }}>✓ STRENGTHS</div>
                          <ul style={{ margin: 0, paddingLeft: 16, color: '#e5e5e5', fontSize: 13, lineHeight: 1.6 }}>{aiFeedback.strengths?.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}</ul>
                        </div>
                        <div style={{ background: 'rgba(255,107,53,0.05)', border: '1px solid rgba(255,107,53,0.15)', padding: '14px', borderRadius: 10 }}>
                          <div style={{ fontSize: 12, color: '#ff6b35', fontWeight: 800, marginBottom: 8 }}>⚠ IMPROVEMENTS</div>
                          <ul style={{ margin: 0, paddingLeft: 16, color: '#e5e5e5', fontSize: 13, lineHeight: 1.6 }}>{aiFeedback.improvements?.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}</ul>
                        </div>
                      </div>
                    ) : <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center' }}>Feedback unavailable.</div>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {premiumMode && (
          <>
            {/* Report Card Toggle */}
            <motion.button 
              whileHover={{ borderColor: 'rgba(168,85,247,0.4)', boxShadow: '0 0 15px rgba(168,85,247,0.1)' }}
              onClick={() => setShowReport(!showReport)} style={{
                width: '100%', background: showReport ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${showReport ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12, padding: '16px 20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: showReport ? 0 : 12, color: '#a855f7', fontSize: 14, fontWeight: 700,
                borderBottomLeftRadius: showReport ? 0 : 12, borderBottomRightRadius: showReport ? 0 : 12,
                fontFamily: 'Inter, sans-serif', backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>🏢</span>
                <span>MAANG Report Card</span>
              </div>
              <motion.span animate={{ rotate: showReport ? 180 : 0 }} style={{ fontSize: 12, color: 'var(--text-muted)' }}>▼</motion.span>
            </motion.button>

            <AnimatePresence>
              {showReport && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', marginBottom: 12 }}
                >
                  <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', border: '1px solid rgba(168,85,247,0.3)', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '20px' }}>
                    {reportLoading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a855f7', justifyContent: 'center', padding: 16 }}>
                        <div style={{ width: 14, height: 14, border: '2px solid rgba(168,85,247,0.3)', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontSize: 12 }}>Clara is evaluating...</span>
                      </div>
                    ) : reportCard ? (
                      <div>
                        {/* Verdict */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                          <div style={{ fontSize: 14, color: '#d1d5db', fontStyle: 'italic', flex: 1, marginRight: 16 }}>"{reportCard.verdictReason}"</div>
                          <div style={{
                            background: reportCard.verdict === 'HIRE' ? 'rgba(34,197,94,0.15)' : reportCard.verdict === 'BORDERLINE' ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.15)',
                            border: `1px solid ${reportCard.verdict === 'HIRE' ? 'rgba(34,197,94,0.4)' : reportCard.verdict === 'BORDERLINE' ? 'rgba(251,191,36,0.4)' : 'rgba(239,68,68,0.4)'}`,
                            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 800, flexShrink: 0,
                            color: reportCard.verdict === 'HIRE' ? '#22c55e' : reportCard.verdict === 'BORDERLINE' ? '#fbbf24' : '#ef4444'
                          }}>
                            {reportCard.verdict === 'HIRE' ? '✅ HIRE' : reportCard.verdict === 'BORDERLINE' ? '🔶 BORDERLINE' : '❌ NO HIRE'}
                          </div>
                        </div>

                        {/* Score Bars */}
                        {[
                          { label: 'Code Quality', value: reportCard.codeQuality || 0, color: '#a855f7' },
                          { label: 'Readability', value: reportCard.readability || 0, color: '#60a5fa' },
                          { label: 'Problem Solving', value: reportCard.problemSolving || 0, color: '#22c55e' },
                        ].map(({ label, value, color }) => (
                          <div key={label} style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>{label}</span>
                              <span style={{ fontSize: 12, fontWeight: 800, color }}>{value}/100</span>
                            </div>
                            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 3 }} />
                            </div>
                          </div>
                        ))}

                        {/* Quick stats row */}
                        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                          <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: 24, fontWeight: 900, color: reportCard.verdict === 'HIRE' ? '#22c55e' : '#fbbf24', fontFamily: 'Outfit, sans-serif' }}>{reportCard.hireScore}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '1px', marginTop: 4 }}>HIRE SCORE</div>
                          </div>
                          {reportCard.topStrength && (
                            <div style={{ flex: 2, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '12px', display: 'flex', alignItems: 'center' }}>
                              <span style={{ fontSize: 13, color: '#86efac', fontWeight: 500 }}>✓ {reportCard.topStrength}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center' }}>Report unavailable.</div>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Sticky Action Buttons */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.95) 30%)',
        padding: '24px 20px 20px', zIndex: 102,
        display: 'flex', justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', gap: 16, maxWidth: 440, width: '100%' }}>
          <button onClick={onLobby} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#e5e5e5', borderRadius: 14, padding: '16px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }} onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.08)'} onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.03)'}>🏠 Lobby</button>
          <button onClick={onRematch} style={{ flex: 1, background: 'linear-gradient(135deg, #ff6b35, #f7451d)', border: 'none', color: '#fff', borderRadius: 14, padding: '16px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(255,107,53,0.4)', transition: 'transform 0.2s' }} onMouseOver={e => e.target.style.transform = 'translateY(-2px)'} onMouseOut={e => e.target.style.transform = 'none'}>⚔️ Play Again</button>
        </div>
      </div>

      <style>{`
        @keyframes confettiFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}