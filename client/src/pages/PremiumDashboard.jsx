import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts'
import API_URL from '../config/api'
import { ThemeToggle } from '../context/ThemeContext'
import { motion } from 'framer-motion'

// ELO thresholds (Bronze to Master)
const RANK_THRESHOLDS = [
  { name: 'Bronze',   min: 0,    max: 399,  color: '#cd7f32', bg: 'rgba(205,127,50,0.1)', icon: '🥉' },
  { name: 'Silver',   min: 400,  max: 799,  color: '#aaa9ad', bg: 'rgba(170,169,173,0.1)', icon: '🥈' },
  { name: 'Gold',     min: 800,  max: 1199, color: '#ffd700', bg: 'rgba(255,215,0,0.1)', icon: '🥇' },
  { name: 'Platinum', min: 1200, max: 1799, color: '#00c8ff', bg: 'rgba(0,200,255,0.1)', icon: '💎' },
  { name: 'Diamond',  min: 1800, max: 2399, color: '#a855f7', bg: 'rgba(168,85,247,0.1)', icon: '💠' },
  { name: 'Master',   min: 2400, max: 9999, color: '#f97316', bg: 'rgba(249,115,22,0.1)', icon: '👑' },
]

function getRankData(elo) {
  const current = RANK_THRESHOLDS.find(r => elo >= r.min && elo <= r.max) || RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1]
  const currentIndex = RANK_THRESHOLDS.indexOf(current)
  const next = RANK_THRESHOLDS[currentIndex + 1] || null
  
  let progress = 100
  let toNext = 0
  if (next) {
    const range = current.max - current.min + 1
    const currentProgress = elo - current.min
    progress = Math.max(0, Math.min(100, (currentProgress / range) * 100))
    toNext = next.min - elo
  }
  
  return { current, next, progress, toNext }
}

const StatCard = ({ label, value, sub, color = '#a855f7', icon }) => (
  <motion.div whileHover={{ y: -4, boxShadow: `0 8px 32px ${color}22` }} style={{
    background: 'var(--card-bg)', border: `1px solid var(--glass-border)`,
    borderRadius: 20, padding: '24px',
    display: 'flex', flexDirection: 'column', gap: 8,
    transition: 'all 0.3s ease'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ background: `${color}15`, color, width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `1px solid ${color}33` }}>
        {icon}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 0.5, textTransform: 'uppercase' }}>{label}</div>
    </div>
    <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif', lineHeight: 1, marginTop: 8 }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</div>}
  </motion.div>
)

const SectionTitle = ({ children }) => (
  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 1.5, marginBottom: 20, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
    {children}
  </div>
)

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--card-bg)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 12, padding: '12px 16px', fontSize: 13, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 800 }}>{p.name}: {p.value}</div>
      ))}
    </div>
  )
}

// GitHub Style Heatmap
function GitHubHeatmap({ matchHistory }) {
  const weeks = 16 // 16 weeks visible
  const daysInWeek = 7
  const totalDays = weeks * daysInWeek
  
  const today = new Date()
  today.setHours(0,0,0,0) // Normalize today

  const days = []
  for (let d = totalDays - 1; d >= 0; d--) {
    const date = new Date(today)
    date.setDate(date.getDate() - d)
    days.push({ date: date.toDateString() })
  }

  const actMap = {}
  ;(matchHistory || []).forEach(m => {
    const k = new Date(m.date || Date.now()).toDateString()
    actMap[k] = (actMap[k] || 0) + 1
  })

  // Group into columns
  const columns = []
  for (let i = 0; i < weeks; i++) {
    columns.push(days.slice(i * daysInWeek, (i + 1) * daysInWeek))
  }

  return (
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8 }}>
      {columns.map((week, colIndex) => (
        <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {week.map((day, rowIndex) => {
            const count = actMap[day.date] || 0
            let bg = 'var(--glass-overlay)'
            let border = '1px solid var(--glass-border)'
            if (count === 1) { bg = '#166534'; border = '1px solid #14532d' }
            else if (count === 2) { bg = '#22c55e'; border = '1px solid #16a34a' }
            else if (count >= 3) { bg = '#4ade80'; border = '1px solid #22c55e' }
            
            return (
              <motion.div 
                whileHover={{ scale: 1.2, zIndex: 10 }}
                key={rowIndex} 
                title={`${day.date}: ${count} battle${count !== 1 ? 's' : ''}`} 
                style={{
                  width: 14, height: 14, borderRadius: 4,
                  background: bg, border,
                  cursor: 'pointer'
                }} 
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function PremiumDashboard() {
  const navigate  = useNavigate()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/auth'); return }
    fetch(`${API_URL}/api/users/premium-stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => { if (r.status === 401) { localStorage.clear(); navigate('/auth') } return r.json() })
      .then(d => { if (d.success) setData(d); else setError(d.message) })
      .catch(() => setError('Could not load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 44, height: 44, border: '3px solid rgba(168,85,247,0.2)', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <div style={{ color: 'var(--text-muted)', fontSize: 14, fontFamily: 'Inter' }}>Loading your dashboard...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontFamily: 'Inter' }}>
      {error}
    </div>
  )

  const { stats, weeklyData, difficultyMap, eloHistory, recentMatches } = data
  const { current: rank, next: nextRank, progress, toNext } = getRankData(stats.elo)
  
  const diffData  = [
    { name: 'Easy',   value: difficultyMap.Easy,   color: '#22c55e' },
    { name: 'Medium', value: difficultyMap.Medium, color: '#fbbf24' },
    { name: 'Hard',   value: difficultyMap.Hard,   color: '#ef4444' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Inter, sans-serif', color: 'var(--text-main)', transition: 'background-color 0.3s ease' }}>

      {/* Header */}
      <div style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--glass-border)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, transition: 'background-color 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => navigate('/lobby')} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>← Back to Lobby</button>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, fontFamily: 'Outfit' }}>
              <span style={{ color: '#a855f7' }}>Premium</span> Dashboard
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>@{stats.username} • Advanced Analytics</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <ThemeToggle />
        </div>
      </div>

      {/* Content - Bento Box Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
        
        {/* Row 1: Hero & Insight (Bento Top) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 24 }}>
          
          {/* Hero Progression Card (Spans more naturally with grid layout) */}
          <div style={{ 
            gridColumn: '1 / -1',
            '@media (min-width: 900px)': { gridColumn: '1 / 3' },
            background: 'linear-gradient(135deg, rgba(30,30,30,0.8), rgba(15,15,15,0.9))', 
            border: '1px solid var(--glass-border)', borderRadius: 24, padding: '36px 40px', 
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}>
            <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: `radial-gradient(circle, ${rank.color}33 0%, transparent 70%)`, pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: rank.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                {rank.icon} CURRENT RANK
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <div style={{ fontSize: 64, fontWeight: 900, fontFamily: 'Outfit', color: '#fff', lineHeight: 1 }}>{stats.elo}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-muted)', fontFamily: 'Outfit' }}>{rank.name}</div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, marginTop: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
                <span style={{ color: 'var(--text-muted)' }}>Progress to {nextRank ? nextRank.name : 'Max Rank'}</span>
                {nextRank && <span style={{ color: '#fff' }}>{toNext} ELO remaining</span>}
              </div>
              <div style={{ height: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${rank.color}, #fff)`, borderRadius: 6, boxShadow: `0 0 20px ${rank.color}` }} 
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 24 }}>
          {/* Clara AI Insight Card */}
          <div style={{ 
            background: 'var(--card-bg)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 24, padding: '32px',
            boxShadow: '0 0 30px rgba(168,85,247,0.1) inset', position: 'relative', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(168,85,247,0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1px solid rgba(168,85,247,0.2)' }}>🤖</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', fontFamily: 'Outfit' }}>Clara AI</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Smart Insight</div>
              </div>
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.6, color: '#d1d5db', fontStyle: 'italic', flex: 1, display: 'flex', alignItems: 'center' }}>
              "Your graph algorithm implementation speed has improved by 14% this week. Focus on Dynamic Programming to optimize your chances for Amazon."
            </div>
          </div>
          
          {/* Activity Heatmap */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '32px', transition: 'all 0.3s' }}>
            <SectionTitle>🟩 Contribution Graph</SectionTitle>
            <GitHubHeatmap matchHistory={data.recentMatches} />
          </div>
        </div>

        {/* Row 2: Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginBottom: 24 }}>
          <StatCard icon="⚡" label="Peak ELO"       value={stats.peakElo}      sub={`Current: ${stats.elo}`}         color="#a855f7" />
          <StatCard icon="🏆" label="Total Wins"     value={stats.wins}         sub={`${stats.winRate}% win rate`}    color="#22c55e" />
          <StatCard icon="💀" label="Losses"         value={stats.losses}       sub={`${stats.totalBattles} battles`} color="#ef4444" />
          <StatCard icon="🔥" label="Win Streak"     value={stats.streak}       sub={`Best: ${stats.maxStreak}`}      color="#f97316" />
          <StatCard icon="📚" label="Solved"         value={stats.solvedCount}  sub="DSA problems"                    color="#60a5fa" />
          <StatCard icon="🎯" label="Win Rate"       value={`${stats.winRate}%`} sub={`${stats.totalBattles} played`} color="#fbbf24" />
        </div>

        {/* Row 3: Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginBottom: 24 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* ELO History */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '32px', transition: 'all 0.3s' }}>
              <SectionTitle>📈 ELO History (30 days)</SectionTitle>
              {eloHistory.length < 2 ? (
                <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 14 }}>Play more battles to see your ELO trend!</div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={eloHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="eloGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={rank.color} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={rank.color} stopOpacity={0}   />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" dy={10} />
                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} dx={-10} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="elo" name="ELO" stroke={rank.color} strokeWidth={3} fill="url(#eloGrad)" dot={false} activeDot={{ r: 6, fill: rank.color, stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Weekly Performance */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '32px', transition: 'all 0.3s' }}>
              <SectionTitle>📅 Weekly Performance</SectionTitle>
              {weeklyData.every(d => d.wins === 0 && d.losses === 0) ? (
                <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 14 }}>No battles this week</div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={weeklyData} barGap={4} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--glass-overlay)'}} />
                    <Bar dataKey="wins"   name="Wins"   fill="#22c55e" radius={[6,6,0,0]} />
                    <Bar dataKey="losses" name="Losses" fill="#ef4444" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Global CSS Variables for Day/Night Theme */}
      <style>{`
        :root {
          /* Dark Mode Defaults */
          --bg: #0a0a0c;
          --nav-bg: rgba(10,10,12,0.75);
          --card-bg: rgba(18, 18, 22, 0.65);
          --glass-border: rgba(255,255,255,0.06);
          --glass-overlay: rgba(255,255,255,0.03);
          --text-main: #e5e5e5;
          --text-muted: #888;
        }

        /* 🔥 Light Mode Overrides */
        :root[data-theme='light'], .light, body.light {
          --bg: #f3f4f6;
          --nav-bg: rgba(255, 255, 255, 0.85);
          --card-bg: #ffffff;
          --glass-border: rgba(0, 0, 0, 0.08);
          --glass-overlay: rgba(0, 0, 0, 0.04);
          --text-main: #111827;
          --text-muted: #6b7280;
        }
      `}</style>
    </div>
  )
}