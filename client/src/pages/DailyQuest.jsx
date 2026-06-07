import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Target, Flame, Zap, Users, Folder, 
  Trophy, Swords, Calendar, Award, Medal, 
  Lightbulb, CheckCircle2, Clock
} from 'lucide-react'
import API_URL from '../config/api'
import { ThemeToggle } from '../context/ThemeContext'

const DIFF_COLOR = {
  Easy:   { color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.2)' },
  Medium: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)' },
  Hard:   { color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.2)' }
}

function CountdownTimer({ msLeft }) {
  const [left, setLeft] = useState(msLeft)
  useEffect(() => {
    setLeft(msLeft)
    const id = setInterval(() => setLeft(p => Math.max(0, p - 1000)), 1000)
    return () => clearInterval(id)
  }, [msLeft])

  const h = Math.floor(left / 3600000)
  const m = Math.floor((left % 3600000) / 60000)
  const s = Math.floor((left % 60000) / 1000)

  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
      {[
        { val: h, label: 'HRS' },
        { val: m, label: 'MIN' },
        { val: s, label: 'SEC' }
      ].map((t, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{
            width: 50, height: 50, borderRadius: 12,
            background: 'var(--btn-bg)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--text-main)',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
          }}>
            {String(t.val).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginTop: 6, letterSpacing: 1 }}>{t.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function DailyQuest() {
  const navigate = useNavigate()
  const [quest, setQuest] = useState(null)
  const [userInfo, setUserInfo] = useState({ streak: 0, bestStreak: 0, alreadySolved: false })
  const [nextQuestIn, setNextQuestIn] = useState(0)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || '{}') } catch { return {} } })()

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const res = await fetch(`${API_URL}/api/daily-quest/today`, { headers })
        const data = await res.json()
        if (data.success) {
          setQuest(data.quest)
          setUserInfo(data.user)
          setNextQuestIn(data.nextQuestIn)
        }
      } catch (err) {
        console.error('Failed to load daily quest', err)
      }

      try {
        const hRes = await fetch(`${API_URL}/api/daily-quest/history`)
        const hData = await hRes.json()
        if (hData.success) setHistory(hData.history)
      } catch {}

      setLoading(false)
    }
    fetchQuest()
  }, [])

  const handleStartQuest = () => {
    if (!quest) return
    const token = localStorage.getItem('token')
    if (!token) { navigate('/auth'); return }
    navigate(`/battle?problem=${quest.problemSlug}&room=daily_quest_${quest.date}&practice=true`)
  }

  const dc = quest ? (DIFF_COLOR[quest.difficulty] || DIFF_COLOR.Medium) : DIFF_COLOR.Medium

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: '#ff6b35', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <div style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500 }}>Loading today's quest...</div>
      </div>
    </div>
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', fontFamily: 'Inter, sans-serif', color: 'var(--text-main)' }}>
      
      {/* Sleek Gradient Header */}
      <div style={{ position: 'relative', zIndex: 2, background: 'var(--nav-bg)', borderBottom: '1px solid var(--border)', padding: '20px 32px', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => navigate('/lobby')} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 8, padding: '8px 12px', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.background = 'var(--btn-bg)'}} onMouseLeave={e => {e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'}}>
              <ArrowLeft size={16} /> Back
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b35' }}>
                <Target size={20} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>Daily Quest</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>A new challenge every day</div>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants} initial="hidden" animate="show"
        style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}
      >
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
          
          <motion.div variants={itemVariants} style={{
            background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16,
            padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.2s, background 0.2s'
          }} onMouseEnter={e => {e.currentTarget.style.background='var(--btn-bg)'; e.currentTarget.style.transform='translateY(-2px)'}} onMouseLeave={e => {e.currentTarget.style.background='var(--card-bg)'; e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
              <Flame size={24} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main)' }}>{userInfo.streak}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>Day Streak</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{
            background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16,
            padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.2s, background 0.2s'
          }} onMouseEnter={e => {e.currentTarget.style.background='var(--btn-bg)'; e.currentTarget.style.transform='translateY(-2px)'}} onMouseLeave={e => {e.currentTarget.style.background='var(--card-bg)'; e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
              <Zap size={24} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main)' }}>{userInfo.bestStreak}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>Best Streak</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{
            background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16,
            padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.2s, background 0.2s'
          }} onMouseEnter={e => {e.currentTarget.style.background='var(--btn-bg)'; e.currentTarget.style.transform='translateY(-2px)'}} onMouseLeave={e => {e.currentTarget.style.background='var(--card-bg)'; e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(52, 211, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main)' }}>{quest?.totalSolvers || 0}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>Solved Today</div>
            </div>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>

          {/* Quest Card */}
          <motion.div variants={itemVariants} style={{
            background: 'var(--card-bg)', border: '1px solid var(--border)',
            borderRadius: 20, padding: '40px', position: 'relative', overflow: 'hidden'
          }}>
            {/* Minimal top border accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: dc.color, opacity: 0.8 }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--btn-bg)', color: 'var(--text-main)', fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 8, letterSpacing: 0.5 }}>
                  <Target size={14} color={dc.color} /> TODAY'S QUEST
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={14} /> {quest?.date}
                </span>
              </div>
              <span style={{
                background: dc.bg, border: `1px solid ${dc.border}`, color: dc.color,
                fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 8
              }}>
                {quest?.difficulty}
              </span>
            </div>

            <h2 style={{ fontSize: 36, fontWeight: 700, color: 'var(--text-main)', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              {quest?.problemTitle || 'Loading...'}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 13, color: 'var(--text-muted)', marginBottom: 36 }}>
              {quest?.category && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Folder size={14} /> {quest.category}</span>}
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Trophy size={14} color="#fbbf24" /> +{quest?.difficulty === 'Easy' ? 15 : quest?.difficulty === 'Medium' ? 30 : 50} ELO</span>
              {userInfo.streak >= 7 && <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a855f7' }}><Zap size={14} /> 1.5x Streak Bonus</span>}
            </div>

            {userInfo.alreadySolved ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px',
                background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.15)',
                borderRadius: 16, marginBottom: 36
              }}>
                <CheckCircle2 size={28} color="#34d399" />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#34d399' }}>Quest Completed!</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Come back tomorrow for a new challenge</div>
                </div>
              </div>
            ) : (
              <button onClick={handleStartQuest} style={{
                width: '100%', padding: '16px', borderRadius: 12, border: 'none',
                background: 'var(--text-main)', color: 'var(--bg)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'all 0.2s', marginBottom: 36
              }}
                onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.9'}}
                onMouseLeave={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1'}}
              >
                <Swords size={18} /> Start Challenge
              </button>
            )}

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 1, marginBottom: 16 }}>
                <Clock size={14} /> NEXT QUEST IN
              </div>
              <CountdownTimer msLeft={nextQuestIn} />
            </div>
          </motion.div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Leaderboard */}
            <motion.div variants={itemVariants} style={{
              background: 'var(--card-bg)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden'
            }}>
              <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Award size={16} color="#fbbf24" /> Today's Leaderboard
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{quest?.totalSolvers || 0} solvers</span>
              </div>

              {(!quest?.leaderboard || quest.leaderboard.length === 0) ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Medal size={32} style={{ opacity: 0.2, margin: '0 auto 12px' }} />
                  <div style={{ fontSize: 13, fontWeight: 500 }}>No solvers yet. Be the first!</div>
                </div>
              ) : (
                <div>
                  {quest.leaderboard.map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
                      borderBottom: '1px solid var(--border)',
                      background: s.username === user?.username ? 'var(--btn-bg)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                      onMouseLeave={e => e.currentTarget.style.background = s.username === user?.username ? 'var(--btn-bg)' : 'transparent'}
                    >
                      <div style={{
                        width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700,
                        background: i === 0 ? 'rgba(251, 191, 36, 0.1)' : i === 1 ? 'rgba(156, 163, 175, 0.1)' : i === 2 ? 'rgba(217, 119, 6, 0.1)' : 'var(--btn-bg)',
                        color: i === 0 ? '#fbbf24' : i === 1 ? '#9ca3af' : i === 2 ? '#d97706' : 'var(--text-muted)'
                      }}>
                        {i < 3 ? <Medal size={14} /> : i + 1}
                      </div>
                      <span style={{
                        flex: 1, fontSize: 13, fontWeight: s.username === user?.username ? 600 : 500,
                        color: s.username === user?.username ? 'var(--text-main)' : 'var(--text-main)'
                      }}>
                        {s.username} {s.username === user?.username && <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>(you)</span>}
                      </span>
                      <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {Math.floor(s.timeTaken / 60)}:{String(s.timeTaken % 60).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Past Quests */}
            <motion.div variants={itemVariants} style={{
              background: 'var(--card-bg)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden'
            }}>
              <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={16} color="var(--text-muted)" />
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>Past Quests</div>
              </div>
              {history.length === 0 ? (
                <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                  No past quests yet
                </div>
              ) : (
                <div>
                  {history.filter(h => h.date !== quest?.date).slice(0, 5).map((h, i) => {
                    const hdc = DIFF_COLOR[h.difficulty] || DIFF_COLOR.Medium
                    return (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
                        borderBottom: '1px solid var(--border)', transition: 'background 0.2s'
                      }} onMouseEnter={e => e.currentTarget.style.background = 'var(--btn-bg)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: hdc.color, flexShrink: 0, opacity: 0.8 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.problemTitle}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{h.date} · {h.totalSolvers} solvers</div>
                        </div>
                        <span style={{
                          fontSize: 10, fontWeight: 600, padding: '4px 8px', borderRadius: 6,
                          background: hdc.bg, color: hdc.color, border: `1px solid ${hdc.border}`
                        }}>{h.difficulty}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {/* Tips */}
        <motion.div variants={itemVariants} style={{
          marginTop: 24, background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start'
        }}>
          <Lightbulb size={20} color="#a1a1aa" style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>How it works:</span> Solve one problem daily to build your streak. 
            <span style={{ color: '#fbbf24', fontWeight: 500 }}> 7+ day streaks get 1.5x ELO bonus!</span>
            <br />
            ELO rewards: <span style={{ color: '#34d399' }}>Easy +15</span> · <span style={{ color: '#fbbf24' }}>Medium +30</span> · <span style={{ color: '#f87171' }}>Hard +50</span>
          </div>
        </motion.div>

      </motion.div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: toast.type === 'error' ? '#ef4444' : '#22c55e',
          color: '#fff', borderRadius: 12, padding: '14px 20px', fontSize: 13, fontWeight: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)', animation: 'slideIn 0.3s ease'
        }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap');

        @media (max-width: 800px) {
          div[style*="gridTemplateColumns: '1fr 380px'"],
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
