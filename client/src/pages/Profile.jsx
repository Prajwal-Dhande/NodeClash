import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async' 
import { ThemeToggle } from '../context/ThemeContext'
import API_URL from '../config/api'
import { Crown, Diamond, Medal, Zap, Target, Dumbbell, Brain, ShieldCheck, Moon, Swords, Rocket, MapPin, GraduationCap, Briefcase, Calendar, Award, Edit2, GitBranch, Globe, Search, Flame } from 'lucide-react'

// Load premium fonts
if (typeof document !== 'undefined') {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

const getTier = (elo) => {
  if (elo >= 2400) return { name: 'Master', icon: <Crown size={16} />, color: '#f97316', bg: '#f9731620' }
  if (elo >= 1800) return { name: 'Diamond', icon: <Diamond size={16} />, color: '#a855f7', bg: '#a855f720' }
  if (elo >= 1200) return { name: 'Platinum', icon: <Award size={16} />, color: '#00c8ff', bg: '#00c8ff20' }
  if (elo >= 800) return { name: 'Gold', icon: <Medal size={16} />, color: '#ffd700', bg: '#ffd70020' }
  if (elo >= 400) return { name: 'Silver', icon: <Medal size={16} />, color: '#aaa9ad', bg: '#aaa9ad20' }
  return { name: 'Bronze', icon: <Medal size={16} />, color: '#cd7f32', bg: '#cd7f3220' }
}

const LANGS = [
  { id: 'javascript', label: 'JavaScript', color: '#f7df1e' },
  { id: 'python', label: 'Python', color: '#3776ab' },
  { id: 'cpp', label: 'C++', color: '#00599c' },
  { id: 'java', label: 'Java', color: '#f89820' },
  { id: 'typescript', label: 'TypeScript', color: '#3178c6' },
  { id: 'go', label: 'Go', color: '#00add8' },
  { id: 'rust', label: 'Rust', color: '#ce422b' },
]

const diffColor = {
  Easy: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', stroke: '#22c55e' },
  Medium: { color: '#fb923c', bg: 'rgba(251,146,60,0.1)', stroke: '#fb923c' },
  Hard: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', stroke: '#ef4444' },
}

const CircleChart = ({ wins, losses, total, easyWins, medWins, hardWins }) => {
  const r = 58
  const cx = 70
  const cy = 70
  const circ = 2 * Math.PI * r
  const solvedTotal = Math.max(1, easyWins + medWins + hardWins)
  const easyPct = easyWins / solvedTotal
  const medPct = medWins / solvedTotal
  const hardPct = hardWins / solvedTotal

  const segments = [
    { pct: easyPct, color: '#22c55e', offset: 0 },
    { pct: medPct, color: '#fb923c', offset: easyPct },
    { pct: hardPct, color: '#ef4444', offset: easyPct + medPct },
  ]

  return (
    <svg width={140} height={140} style={{ transform: 'rotate(-90deg)' }}>
      {/* Background Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(128,128,128,0.15)" strokeWidth={4} />
      {total > 0 && segments.map((s, i) => s.pct > 0 && (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none"
          stroke={s.color} strokeWidth={6}
          strokeDasharray={`${circ * s.pct} ${circ * (1 - s.pct)}`}
          strokeDashoffset={-circ * s.offset}
          strokeLinecap="butt"
          style={{ transition: 'all 1s ease-out' }}
        />
      ))}
    </svg>
  )
}

const TopicRadarChart = ({ data }) => {
  const size = 260;
  const center = size / 2;
  const maxRadius = 85;
  const angles = [0, 60, 120, 180, 240, 300].map(d => (d - 90) * (Math.PI / 180));

  const points = data.map((d, i) => {
    const r = (d.val / 100) * maxRadius;
    return `${center + r * Math.cos(angles[i])},${center + r * Math.sin(angles[i])}`;
  }).join(' ');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '10px 0' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
          <polygon
            key={scale}
            points={angles.map(a => `${center + maxRadius * scale * Math.cos(a)},${center + maxRadius * scale * Math.sin(a)}`).join(' ')}
            fill={scale === 1 ? 'var(--glass-overlay)' : 'none'}
            stroke="var(--glass-border)" strokeWidth="1"
          />
        ))}
        {angles.map((a, i) => (
          <line key={i} x1={center} y1={center} x2={center + maxRadius * Math.cos(a)} y2={center + maxRadius * Math.sin(a)} stroke="var(--glass-border)" />
        ))}
        <polygon points={points} fill="rgba(255,107,53,0.25)" stroke="#ff6b35" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.4))' }} />
        {data.map((d, i) => {
          const r = (d.val / 100) * maxRadius;
          return <circle key={i} cx={center + r * Math.cos(angles[i])} cy={center + r * Math.sin(angles[i])} r="4" fill="#ff6b35" />
        })}
        {data.map((d, i) => {
          const r = maxRadius + 25;
          const x = center + r * Math.cos(angles[i]);
          const y = center + r * Math.sin(angles[i]);
          return <text key={i} x={x} y={y} fill="var(--text-muted)" fontSize="11" textAnchor="middle" dominantBaseline="middle" fontWeight="600" fontFamily="JetBrains Mono">{d.label}</text>
        })}
      </svg>
    </div>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const { username: routeUsername } = useParams() 
  
  const [activeTab, setActiveTab] = useState('battles')
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [battles, setBattles] = useState([])
  const [visibleCount, setVisibleCount] = useState(10)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [editingBio, setEditingBio] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [globalRank, setGlobalRank] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
  const isOwnProfile = !routeUsername || routeUsername === storedUser?.username 
  const targetUsername = routeUsername || storedUser?.username

  const [username, setUsername] = useState(targetUsername || 'Player')
  const [bio, setBio] = useState('')
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [website, setWebsite] = useState('')
  const [education, setEducation] = useState('')
  const [company, setCompany] = useState('')
  const [selectedLangs, setSelectedLangs] = useState(['javascript'])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token && isOwnProfile) { navigate('/auth'); return }

    const fetchData = async () => {
      setLoading(true)
      try {
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {}
        
        // Fetch Target Profile
        const pRes = await fetch(`${API_URL}/api/users/profile/${targetUsername}`, { headers })
        const pData = await pRes.json()
        
        if (pData.user) {
          setProfileData(pData.user)
          setUsername(pData.user.username || '')
          setBio(pData.user.bio || '')
          setGithub(pData.user.github || '')
          setLinkedin(pData.user.linkedin || '')
          setWebsite(pData.user.website || '')
          setEducation(pData.user.education || '')
          setCompany(pData.user.company || '')
          setSelectedLangs(pData.user.languages?.length ? pData.user.languages : ['javascript'])
          
          setGlobalRank(pData.globalRank || 0)

          const myId = storedUser._id || storedUser.id
          if (myId && pData.user.followers) {
            const alreadyFollowing = pData.user.followers.some(f => f._id === myId || f === myId)
            setIsFollowing(alreadyFollowing)
          }

          if (isOwnProfile) {
            localStorage.setItem('user', JSON.stringify(pData.user))
          }

          if (pData.user.matchHistory) {
            setBattles([...pData.user.matchHistory].reverse())
          } else {
            setBattles([])
          }
        }
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    fetchData()
  }, [targetUsername])

  const saveProfile = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ username, bio, github, linkedin, website, education, company, languages: selectedLangs })
      })
      const data = await res.json()
      if (data.user) { 
        setProfileData(data.user); 
        localStorage.setItem('user', JSON.stringify(data.user)) 
      }
      setShowEditProfile(false)
    } catch (err) { console.error(err) }
    setSaving(false)
  }

  const handleFollowToggle = async () => {
    try {
      const endpoint = isFollowing ? 'unfollow' : 'follow'
      const token = localStorage.getItem('token')
      if (!token) { navigate('/auth'); return; }

      const res = await fetch(`${API_URL}/api/users/${endpoint}/${profileData._id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (res.ok) {
        setIsFollowing(!isFollowing)
        setProfileData(prev => {
          const myId = storedUser._id || storedUser.id
          const newFollowers = isFollowing 
            ? prev.followers.filter(f => (f._id || f) !== myId) 
            : [...(prev.followers || []), { _id: myId }]
          return { ...prev, followers: newFollowers }
        })
      }
    } catch (err) {
      console.error('Follow action failed', err)
    }
  }

  const handleShare = () => {
    const tier = getTier(elo)
    navigator.clipboard.writeText(`🏆 ${username} on CodeArena | ${tier.icon} ${tier.name} | Rank #${globalRank} | ELO: ${elo} | ${wins}W-${losses}L`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTime = (s) => s ? `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}` : '-'
  const formatDate = (d) => {
    if (!d) return '-'
    const h = Math.floor((Date.now() - new Date(d)) / 3600000)
    if (h < 1) return 'Just now'
    if (h < 24) return `${h}h ago`
    if (h < 48) return 'Yesterday'
    return `${Math.floor(h/24)}d ago`
  }

  const user = profileData || storedUser
  const elo = user?.elo ?? 0
  const peakElo = user?.peakElo ?? elo
  const wins = user?.stats?.wins || 0
  const losses = user?.stats?.losses || 0
  const total = wins + losses
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0
  const tier = getTier(elo)
  const tierProgress = tier.nextElo && tier.prevElo ? Math.round(((elo - tier.prevElo) / (tier.nextElo - tier.prevElo)) * 100) : 100
  
  const followersCount = user?.followers?.length || 0
  const followingCount = user?.following?.length || 0

  const diffWins = battles.reduce((acc, b) => {
    if (b.result === 'win') acc[b.difficulty] = (acc[b.difficulty] || 0) + 1
    return acc
  }, {})
  const easyWins = diffWins['Easy'] || 0
  const medWins = diffWins['Medium'] || 0
  const hardWins = diffWins['Hard'] || 0

  const langWinsMap = battles.reduce((acc, b) => {
    if (b.result === 'win' && b.language) {
      acc[b.language] = (acc[b.language] || 0) + 1
    }
    return acc
  }, {})

  let primaryWeaponKey = selectedLangs[0] || 'javascript';
  let maxWins = -1;
  Object.entries(langWinsMap).forEach(([lang, w]) => {
    if (w > maxWins) { maxWins = w; primaryWeaponKey = lang; }
  })
  const primaryWeapon = LANGS.find(l => l.id === primaryWeaponKey)

  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)

  const heatmapData = Array(365).fill(0)
  
  battles.forEach(b => {
    if (!b.date) return
    const bDate = new Date(b.date)
    bDate.setHours(0, 0, 0, 0)
    const diffTime = todayDate - bDate
    const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (daysAgo >= 0 && daysAgo < 365) {
      const idx = 364 - daysAgo 
      heatmapData[idx] = Math.min(4, heatmapData[idx] + 1)
    }
  })

  const oneYearAgo = new Date(todayDate)
  oneYearAgo.setDate(todayDate.getDate() - 364)
  const startDayOfWeek = oneYearAgo.getDay() 

  const paddedData = Array(startDayOfWeek).fill(-1).concat(heatmapData)
  const weeks = []
  for (let i = 0; i < paddedData.length; i += 7) {
    weeks.push(paddedData.slice(i, i + 7))
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dynamicMonths = []
  for(let i = 11; i >= 0; i--) {
    dynamicMonths.push(monthNames[(todayDate.getMonth() - i + 12) % 12])
  }

  const heatColor = (v) => ['var(--glass-overlay)', 'rgba(34,197,94,0.3)', 'rgba(34,197,94,0.6)', 'rgba(34,197,94,0.85)', '#22c55e'][v]

  const ACHIEVEMENTS = [
    { icon: <Flame size={20} color="#ff6b35" />, title: 'Hot Streak', desc: '5 wins in a row', unlocked: (user?.stats?.streak||0) >= 5 },
    { icon: <Zap size={20} color="#fbbf24" />, title: 'Speed Demon', desc: 'Win in under 3 min', unlocked: battles.some(b => b.result==='win' && b.timeTaken<180) },
    { icon: <Target size={20} color="#ef4444" />, title: 'Sharp Shooter', desc: '90%+ win rate', unlocked: winRate >= 90 && total >= 5 },
    { icon: <Dumbbell size={20} color="#60a5fa" />, title: 'Battle Tested', desc: '10+ battles', unlocked: total >= 10 },
    { icon: <Brain size={20} color="#a855f7" />, title: 'Big Brain', desc: 'Win a Hard problem', unlocked: hardWins > 0 },
    { icon: <ShieldCheck size={20} color="#22c55e" />, title: 'Flawless Victory', desc: 'Win without any failed tests', unlocked: battles.some(b => b.result === 'win' && b.testsFailed === 0) },
    { icon: <Moon size={20} color="#818cf8" />, title: 'Night Owl', desc: 'Win a match between 12 AM and 5 AM', unlocked: battles.some(b => b.result === 'win' && (new Date(b.date).getHours() >= 0 && new Date(b.date).getHours() <= 5)) },
    { icon: <Swords size={20} color="#f43f5e" />, title: 'Code Ninja', desc: 'Reach 10 wins', unlocked: (user?.stats?.wins || 0) >= 10 },
    { icon: <Rocket size={20} color="#10b981" />, title: 'Unstoppable', desc: 'Win 10 matches in a row', unlocked: (user?.stats?.streak || 0) >= 10 },
    { icon: <Medal size={20} color="#aaa9ad" />, title: 'Silver Rank', desc: 'Reach 1200 ELO', unlocked: elo >= 1200 },
    { icon: <Medal size={20} color="#ffd700" />, title: 'Gold Rank', desc: 'Reach 1400 ELO', unlocked: elo >= 1400 },
    { icon: <Diamond size={20} color="#00c8ff" />, title: 'Diamond', desc: 'Reach 1600 ELO', unlocked: elo >= 1600 },
    { icon: <Crown size={20} color="#f97316" />, title: 'Grandmaster', desc: 'Reach 2000 ELO', unlocked: elo >= 2000 },
  ]

  const calculateMasteryData = (userWins, userLosses, userElo) => {
    if (userWins + userLosses === 0) {
      return [
        { label: 'Arrays', val: 10 }, { label: 'Strings', val: 10 }, { label: 'Graphs', val: 10 },
        { label: 'DP', val: 10 }, { label: 'Trees', val: 10 }, { label: 'Math', val: 10 },
      ];
    }
    const seed = (userWins * 13 + userLosses * 7 + userElo);
    const getVal = (base, multiplier) => Math.min(100, Math.max(15, base + (seed % multiplier) * 2));
    
    return [
      { label: 'Arrays', val: getVal(40, 20) },
      { label: 'Strings', val: getVal(45, 15) },
      { label: 'Graphs', val: getVal(30, 25) },
      { label: 'DP', val: getVal(25, 30) },
      { label: 'Trees', val: getVal(35, 20) },
      { label: 'Math', val: getVal(50, 10) },
    ];
  };

  const masteryData = calculateMasteryData(wins, losses, elo);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, fontFamily: 'Inter' }}>
      <div style={{ width: 48, height: 48, border: '3px solid rgba(255,107,53,0.15)', borderTopColor: '#ff6b35', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Loading profile...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <div className="profile-container" style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Inter, sans-serif', color: 'var(--text-main)', position: 'relative' }}>

      <Helmet>
        <title>{username ? `${username} | CodeArena Profile` : 'Player Profile | CodeArena'}</title>
        <meta name="description" content={`Check out ${username || 'this player'}'s CodeArena stats. Current ELO: ${elo} (${tier.name}). Total Battles: ${total}, Win Rate: ${winRate}%.`} />
      </Helmet>

      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="ambient-glow-1" style={{ position: 'absolute', top: '-10%', right: '-10%', width: '50vw', height: '50vw', minWidth: '600px', minHeight: '600px', background: 'radial-gradient(circle, rgba(255,107,53,0.22) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%' }} />
        <div className="ambient-glow-2" style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '60vw', height: '60vw', minWidth: '700px', minHeight: '700px', background: 'radial-gradient(circle, rgba(247,69,29,0.15) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && isOwnProfile && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--modal-overlay)', backdropFilter: 'blur(16px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--modal-bg)', border: '1px solid var(--glass-border)', borderRadius: 20, width: '90%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '22px 28px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: 'var(--text-main)' }}>Edit Profile</span>
              <button onClick={() => setShowEditProfile(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, display: 'block', marginBottom: 8 }}>USERNAME</label>
                <input value={username} onChange={e => setUsername(e.target.value)}
                  style={{ width: '100%', background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: 'var(--text-main)', outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, display: 'block', marginBottom: 8 }}>BIO</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell the arena about yourself..." rows={3}
                  style={{ width: '100%', background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--text-main)', outline: 'none', resize: 'none', fontFamily: 'Inter', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'EDUCATION', val: education, set: setEducation, ph: 'e.g. IIT Bombay' },
                  { label: 'COMPANY', val: company, set: setCompany, ph: 'e.g. Google' },
                ].map(({ label, val, set, ph }) => (
                  <div key={label}>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, display: 'block', marginBottom: 8 }}>{label}</label>
                    <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
                      style={{ width: '100%', background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--text-main)', outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, display: 'block', marginBottom: 10 }}>SOCIAL LINKS</label>
                {[
                  { emoji: '🐙', label: 'GitHub', val: github, set: setGithub, ph: 'github.com/username' },
                  { emoji: '💼', label: 'LinkedIn', val: linkedin, set: setLinkedin, ph: 'linkedin.com/in/username' },
                  { emoji: '🌐', label: 'Website', val: website, set: setWebsite, ph: 'yourportfolio.dev' },
                ].map(({ emoji, label, val, set, ph }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 14, width: 80, color: 'var(--text-muted)', flexShrink: 0 }}>{emoji} {label}</span>
                    <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
                      style={{ flex: 1, background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--text-main)', outline: 'none', fontFamily: 'Inter' }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, display: 'block', marginBottom: 10 }}>LANGUAGES</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {LANGS.map(l => (
                    <button key={l.id} onClick={() => setSelectedLangs(prev => prev.includes(l.id) ? prev.filter(x => x !== l.id) : [...prev, l.id])}
                      style={{
                        padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter',
                        background: selectedLangs.includes(l.id) ? `${l.color}20` : 'var(--glass-overlay)',
                        color: selectedLangs.includes(l.id) ? l.color : 'var(--text-muted)',
                        border: `1px solid ${selectedLangs.includes(l.id) ? l.color + '50' : 'var(--glass-border)'}`,
                        transition: 'all 0.2s'
                      }}>{l.label}</button>
                  ))}
                </div>
              </div>
              <button onClick={saveProfile} disabled={saving} style={{
                background: 'linear-gradient(135deg, #ff6b35, #f7451d)', color: '#fff', border: 'none',
                borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', marginTop: 4
              }}>{saving ? '⟳ Saving...' : '✓ Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ height: 64, background: 'var(--nav-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 16, position: 'sticky', top: 0, zIndex: 50, transition: 'background-color 0.3s' }} className="profile-nav">
        <span onClick={() => navigate('/')} className="logo">
          <span style={{ color: '#ff6b35', marginRight: '6px' }}>{'{C}'}</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>CodeArena</span>
        </span>
        <div style={{ flex: 1 }} />
        <div className="desktop-only"><ThemeToggle /></div>
        <div className="desktop-only" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {[{ label: 'Leaderboard', path: '/leaderboard' }].map(({ label, path }) => (
            <span key={label} onClick={() => navigate(path)} style={{ fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 500 }}>{label}</span>
          ))}
          <button onClick={handleShare} style={{ background: copied ? 'rgba(34,197,94,0.1)' : 'transparent', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'var(--glass-border)'}`, color: copied ? '#22c55e' : 'var(--text-muted)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.2s' }}>
            {copied ? '✓ Copied!' : '↗ Share'}
          </button>
          {isOwnProfile && <button onClick={() => navigate('/settings')} style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 8, padding: '6px 12px', fontSize: 15, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--text-main)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>⚙️</button>}
          <button onClick={() => navigate('/lobby')} style={{ background: '#ff6b35', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={14} fill="currentColor" /> Battle</button>
        </div>
        
        {/* Mobile Hamburger Button */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="mobile-drawer"
          >
            <div className="drawer-header">
              <span className="logo" onClick={() => { setIsMobileMenuOpen(false); navigate('/') }}>
                <span style={{ color: '#ff6b35', marginRight: '6px' }}>{'{C}'}</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>CodeArena</span>
              </span>
              <button className="close-drawer-btn" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
            </div>
            
            <div className="drawer-content">
              <div className="drawer-links">
                <span onClick={() => { setIsMobileMenuOpen(false); navigate('/leaderboard') }}>Leaderboard</span>
                {isOwnProfile && <span onClick={() => { setIsMobileMenuOpen(false); navigate('/settings') }}>⚙️ Settings</span>}
              </div>
              
              <div className="drawer-footer">
                <ThemeToggle />
                <button onClick={handleShare} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 12 }}>
                  {copied ? '✓ Link Copied!' : '↗ Share Profile'}
                </button>
                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/lobby') }} style={{
                  background: 'linear-gradient(135deg, #ff6b35, #fbbf24)', border: 'none', color: '#fff', borderRadius: 8,
                  padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', width: '100%'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Zap size={18} fill="currentColor" /> Battle Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="profile-main-grid" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32, alignItems: 'start', position: 'relative', zIndex: 1 }}>

        {/* ✅ LEFT SIDEBAR */}
        <div className="profile-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '36px 28px', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', width: 88, height: 88, margin: '0 auto 20px' }}>
              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: `rgba(255,107,53,0.1)`,
                border: '1px solid rgba(255,107,53,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter', fontSize: 32, fontWeight: 700, color: '#ff6b35'
              }}>
                {username.slice(0, 2).toUpperCase()}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, color: 'var(--text-main)' }}>{username}</span>
              {(() => {
                const plan = profileData?.premiumPlan || storedUser?.premiumPlan || (profileData?.isPremium ? 'pro' : 'free')
                if (plan === 'pro_plus') return <span style={{ background: 'linear-gradient(135deg, #ff6b35, #f7451d)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 6, letterSpacing: 0.5 }}>PRO+</span>
                if (plan === 'pro') return <span style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.3)', color: '#60a5fa', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 6, letterSpacing: 0.5 }}>PRO</span>
                return null
              })()}
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: tier.bg, border: `1px solid ${tier.color}40`, borderRadius: 20, padding: '4px 12px', marginBottom: 16 }}>
              <span>{tier.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: tier.color }}>{tier.name}</span>
            </div>

            {/* ✅ REAL Social Stats */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--glass-border)' }}>
               <div style={{ cursor: 'pointer' }}>
                 <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)', fontFamily: 'JetBrains Mono' }}>{followersCount}</div>
                 <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Followers</div>
               </div>
               <div style={{ width: 1, background: 'var(--glass-border)' }} />
               <div style={{ cursor: 'pointer' }}>
                 <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)', fontFamily: 'JetBrains Mono' }}>{followingCount}</div>
                 <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Following</div>
               </div>
            </div>

            {!editingBio ? (
              <p onClick={() => isOwnProfile && setEditingBio(true)} style={{ fontSize: 13, color: bio ? 'var(--text-muted)' : 'var(--text-muted)', cursor: isOwnProfile ? 'pointer' : 'default', marginBottom: 16, lineHeight: 1.5 }}>
                {bio || (isOwnProfile ? '+ Add a bio...' : 'No bio yet.')}
              </p>
            ) : (
              <textarea value={bio} onChange={e => setBio(e.target.value)}
                onBlur={() => { setEditingBio(false); saveProfile() }}
                autoFocus rows={2}
                style={{ width: '100%', background: 'var(--glass-overlay)', border: '1px solid rgba(255,107,53,0.4)', borderRadius: 8, padding: '8px', fontSize: 13, color: 'var(--text-main)', outline: 'none', resize: 'none', fontFamily: 'Inter', boxSizing: 'border-box', marginBottom: 12 }} />
            )}

            {/* 🔥 DYNAMIC BUTTON (EDIT VS FOLLOW) */}
            {isOwnProfile ? (
              <button onClick={() => setShowEditProfile(true)} style={{ width: '100%', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.25)', color: '#ff6b35', borderRadius: 10, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.2s' }}>
                <Edit2 size={16} /> Edit Profile
              </button>
            ) : (
              <button onClick={handleFollowToggle} style={{ width: '100%', background: isFollowing ? 'transparent' : 'rgba(255,107,53,0.15)', border: `1px solid ${isFollowing ? 'var(--glass-border)' : 'rgba(255,107,53,0.4)'}`, color: isFollowing ? 'var(--text-muted)' : '#ff6b35', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.2s' }}>
                {isFollowing ? 'Unfollow' : 'Follow +'}
              </button>
            )}
          </div>

          {/* Info Card */}
          <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: <MapPin size={16} />, text: 'India' },
              education && { icon: <GraduationCap size={16} />, text: education },
              company && { icon: <Briefcase size={16} />, text: company },
              { icon: <Calendar size={16} />, text: `Joined ${new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` },
            ].filter(Boolean).map(({ icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}

            {(github || linkedin || website) ? (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {github && <a href={`https://${github}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}><GitBranch size={16} /> <span style={{ color: '#60a5fa' }}>{github}</span></a>}
                {linkedin && <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}><Briefcase size={16} /> <span style={{ color: '#60a5fa' }}>{linkedin}</span></a>}
                {website && <a href={`https://${website}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}><Globe size={16} /> <span style={{ color: '#60a5fa' }}>{website}</span></a>}
              </div>
            ) : isOwnProfile && (
              <button onClick={() => setShowEditProfile(true)} style={{ marginTop: 8, fontSize: 12, color: 'var(--text-muted)', background: 'none', border: '1px dashed var(--glass-border)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'Inter' }}>+ Add social links</button>
            )}
          </div>

          {/* Languages Card */}
          <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '22px 24px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)', marginBottom: 14 }}>Languages</div>
            
            {primaryWeapon && (
               <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', borderRadius: 12, marginBottom: 16 }}>
                 <div style={{ fontSize: 20, color: '#ff6b35' }}><Swords size={24} /></div>
                 <div>
                   <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Primary Weapon</div>
                   <div style={{ fontSize: 14, color: primaryWeapon.color, fontWeight: 700 }}>{primaryWeapon.label}</div>
                 </div>
               </div>
            )}

            {selectedLangs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedLangs.map(id => {
                  const l = LANGS.find(x => x.id === id)
                  if (!l) return null
                  const languageWins = langWinsMap[id] || 0
                  return (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{l.label}</span>
                      </div>
                      {languageWins > 0 && (
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{languageWins} wins</span>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : isOwnProfile && (
              <button onClick={() => setShowEditProfile(true)} style={{ fontSize: 12, color: 'var(--text-muted)', background: 'none', border: '1px dashed var(--glass-border)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'Inter' }}>+ Add languages</button>
            )}
          </div>

        </div>

        {/* ✅ RIGHT MAIN CONTENT */}
        <div className="profile-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '28px', display: 'grid', gridTemplateColumns: 'min-content 1fr', gap: 32, alignItems: 'center' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                <CircleChart wins={wins} losses={losses} total={total} easyWins={easyWins} medWins={medWins} hardWins={hardWins} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: -2 }}>All</div>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 32, color: 'var(--text-main)', lineHeight: 1 }}>{wins}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Solved</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, minWidth: 200 }}>
                {[
                  { label: 'Easy', val: easyWins, color: '#22c55e' },
                  { label: 'Medium', val: medWins, color: '#fb923c' },
                  { label: 'Hard', val: hardWins, color: '#ef4444' },
                ].map(({ label, val, color }) => {
                  const pct = wins > 0 ? Math.round((val / wins) * 100) : 0;
                  return (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                        <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>
                          {val} <span style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 500, marginLeft: 2 }}>wins</span>
                        </span>
                      </div>
                      <div style={{ background: 'rgba(128,128,128,0.15)', height: 6, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 1s ease-out' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* ✅ REAL Global Rank */}
              <div style={{ background: 'var(--glass-overlay)', border: `1px solid ${tier.color}40`, borderRadius: 16, padding: '20px 24px', position: 'relative' }}>
                
                <div style={{ position: 'absolute', top: 20, right: 24, textAlign: 'right' }}>
                   <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Global Rank</div>
                   <div style={{ fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 800, color: 'var(--text-main)' }}>#{globalRank.toLocaleString()}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{tier.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 28, color: tier.color, lineHeight: 1 }}>{elo}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>ELO Rating</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: tier.color, marginBottom: 8 }}>{tier.name}</div>
                {tier.nextElo && (
                  <>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{elo} / {tier.nextElo} to next tier</div>
                    <div style={{ background: 'var(--glass-border)', height: 6, borderRadius: 3, overflow: 'hidden', maxWidth: '60%' }}>
                      <div style={{ height: '100%', background: `linear-gradient(90deg, ${tier.color}, ${tier.color}99)`, width: `${tierProgress}%`, borderRadius: 3, transition: 'width 1s' }} />
                    </div>
                  </>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Win Rate', val: `${winRate}%`, color: '#fb923c' },
                  { label: <><Flame size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} color="#ff6b35" /> Streak</>, val: user?.stats?.streak || 0, color: '#fb923c' },
                  { label: 'Peak ELO', val: Math.max(peakElo, elo), color: 'var(--text-muted)' },
                  { label: 'Battles', val: total, color: 'var(--text-muted)' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="stat-card" style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, fontSize: 18, color, marginBottom: 4 }}>{val}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: 14 }}>Badges</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ACHIEVEMENTS.filter(a => a.unlocked).length} / {ACHIEVEMENTS.length} unlocked</span>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {ACHIEVEMENTS.map(({ icon, title, unlocked }) => (
                <div key={title} title={title} style={{
                  width: 52, height: 52, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, transition: 'all 0.2s', cursor: 'default',
                  background: unlocked ? 'rgba(255,107,53,0.1)' : 'var(--glass-overlay)',
                  border: `1px solid ${unlocked ? 'rgba(255,107,53,0.3)' : 'var(--glass-border)'}`,
                  filter: unlocked ? 'none' : 'grayscale(1) opacity(0.3)',
                  boxShadow: unlocked ? '0 0 12px rgba(255,107,53,0.15)' : 'none'
                }}>
                  {unlocked ? icon : '🔒'}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '28px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>🟩</span>
                <span style={{ fontWeight: 900, color: 'var(--text-main)', fontSize: 16, fontFamily: 'Outfit', letterSpacing: 1 }}>
                  ACTIVITY MATRIX
                </span>
                <span style={{ marginLeft: 8, fontSize: 13, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '2px 8px', borderRadius: 4 }}>
                  {total > 0 ? `${total} Contributions` : '0 Contributions'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-muted)', alignItems: 'center', fontWeight: 600 }}>
                <span>Max streak: <span style={{ color: 'var(--text-main)' }}>{user?.stats?.streak || 0}</span></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 20 }}>
                {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, idx) => (
                  <div key={idx} style={{ height: 14, width: 24, fontSize: 10, color: 'var(--text-muted)', fontFamily: 'Inter', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {day}
                  </div>
                ))}
              </div>

              <div style={{ flex: 1, overflowX: 'auto', paddingBottom: 8 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 6, paddingLeft: 2 }}>
                  {dynamicMonths.map((m, i) => (
                    <div key={i} style={{ width: `${100/12}%`, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{m}</div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 4 }}>
                  {weeks.map((weekData, weekIdx) => (
                    <div key={weekIdx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {weekData.map((val, dayIdx) => (
                        val === -1 ? (
                          <div key={dayIdx} style={{ width: 14, height: 14, background: 'transparent' }} /> 
                        ) : (
                          <div key={dayIdx} title={val > 0 ? `${val} battles` : 'No battles'} style={{
                            width: 14, height: 14, borderRadius: 3,
                            background: heatColor(val), cursor: 'pointer',
                            transition: 'transform 0.1s, box-shadow 0.2s',
                            boxShadow: val > 0 ? `0 0 8px ${heatColor(val)}40` : 'none'
                          }} 
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        )
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
              <span>Less</span>
              {[0,1,2,3,4].map(v => <div key={v} style={{ width: 14, height: 14, borderRadius: 3, background: heatColor(v), boxShadow: v > 0 ? `0 0 8px ${heatColor(v)}40` : 'none' }} />)}
              <span>More</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', gap: 16, background: 'transparent', padding: '0 8px' }}>
            {['battles', 'achievements', 'stats'].map(t => (
              <button key={t} onClick={() => { setActiveTab(t); if (t === 'battles') setVisibleCount(10); }} style={{
                padding: '10px 22px', fontSize: 13, fontWeight: 600, background: 'none', border: 'none',
                borderBottom: `2px solid ${activeTab === t ? '#ff6b35' : 'transparent'}`,
                borderRadius: '10px 10px 0 0',
                color: activeTab === t ? '#ff6b35' : 'var(--text-muted)', cursor: 'pointer', textTransform: 'capitalize',
                transition: 'all 0.2s', fontFamily: 'Inter',
                background: activeTab === t ? 'rgba(255,107,53,0.06)' : 'transparent'
              }}>{t}</button>
            ))}
          </div>

          {/* BATTLES TAB */}
          {activeTab === 'battles' && (
            <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px) saturate(150%)', border: '1px solid var(--glass-border)', borderRadius: '0 0 24px 24px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,0.5)' }}>
              {/* Count bar */}
              {battles.length > 0 && (
                <div style={{ padding: '10px 24px', background: 'rgba(255,107,53,0.04)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Showing <span style={{ color: '#ff6b35', fontWeight: 700 }}>{Math.min(visibleCount, battles.length)}</span> of <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{battles.length}</span> battles
                  </span>
                  {battles.length > 10 && visibleCount >= battles.length && (
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>All loaded ✓</span>
                  )}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 130px 90px 70px 90px', padding: '14px 24px', background: 'var(--glass-overlay-heavy)', fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 2 }}>
                {['RESULT', 'PROBLEM', 'OPPONENT', 'DIFF', 'TIME', 'DATE'].map(h => <div key={h}>{h}</div>)}
              </div>
              {battles.length === 0 ? (
                <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: 48, marginBottom: 16, color: 'var(--text-muted)' }}><Swords size={48} /></div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: 'var(--text-muted)' }}>No battles yet!</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Enter the arena and start your coding combat journey</div>
                  {isOwnProfile && <button onClick={() => navigate('/lobby')} style={{ background: 'linear-gradient(135deg, #ff6b35, #f7451d)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 28px', cursor: 'pointer', fontWeight: 700, fontFamily: 'Inter', fontSize: 14, boxShadow: '0 8px 24px rgba(255,107,53,0.3)', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} fill="currentColor" /> Enter Arena</button>}
                </div>
              ) : battles.slice(0, visibleCount).map((b, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 130px 90px 70px 90px', padding: '16px 24px', alignItems: 'center', borderTop: '1px solid var(--glass-border)' }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20, background: b.result === 'win' ? 'rgba(34,197,94,0.1)' : b.result === 'draw' ? 'rgba(251,191,36,0.1)' : 'rgba(239,68,68,0.1)', color: b.result === 'win' ? '#22c55e' : b.result === 'draw' ? '#fbbf24' : '#ef4444', border: `1px solid ${b.result === 'win' ? 'rgba(34,197,94,0.25)' : b.result === 'draw' ? 'rgba(251,191,36,0.25)' : 'rgba(239,68,68,0.25)'}`, letterSpacing: 0.5 }}>
                      {b.result?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    {(() => {
                      const isPremiumMatch = b.opponent === 'InterviewerBot' || (b.room && b.room.includes('vault'))
                      const isBot = b.opponent === 'PracticeBot' || b.opponent === 'AI_Bot'
                      const isPrivate = b.room && (b.room.includes('room_') || b.room.includes('private'))
                      const mode = isPremiumMatch
                        ? { label: 'The Elite Archive', bg: 'rgba(168,85,247,0.1)', color: '#a855f7', border: 'rgba(168,85,247,0.25)' }
                        : isBot
                        ? { label: 'Practice', bg: 'rgba(96,165,250,0.1)', color: '#60a5fa', border: 'rgba(96,165,250,0.25)' }
                        : isPrivate
                        ? { label: 'Private Room', bg: 'rgba(20,184,166,0.1)', color: '#14b8a6', border: 'rgba(20,184,166,0.25)' }
                        : { label: 'Random Match', bg: 'rgba(255,107,53,0.1)', color: '#ff6b35', border: 'rgba(255,107,53,0.25)' }
                      return (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>
                              {b.problem || 'Unknown'}
                            </span>
                            <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 20, background: mode.bg, color: mode.color, border: `1px solid ${mode.border}`, letterSpacing: 0.5, whiteSpace: 'nowrap', lineHeight: '16px' }}>
                              {mode.label}
                            </span>
                          </div>
                          <div style={{ fontSize: 11, color: b.result === 'win' ? '#22c55e' : b.result === 'draw' ? '#fbbf24' : '#ef4444', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
                            {b.result === 'win' ? '+' : ''}{b.eloChange || 0} ELO
                          </div>
                        </>
                      )
                    })()}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--avatar-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: 'var(--text-main)' }}>
                      {(b.opponent || 'OP').slice(0, 2).toUpperCase()}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.opponent || 'Unknown'}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: diffColor[b.difficulty]?.bg, color: diffColor[b.difficulty]?.color, border: `1px solid ${diffColor[b.difficulty]?.color}30` }}>
                      {b.difficulty || 'Med'}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{formatTime(b.timeTaken)}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{formatDate(b.date)}</div>
                </div>
              ))}

              {/* Load More button */}
              {battles.length > visibleCount && (
                <div style={{ padding: '20px 24px', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Showing {Math.min(visibleCount, battles.length)} of {battles.length} battles</span>
                  <button
                    onClick={() => setVisibleCount(c => c + 10)}
                    style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.25)', color: '#ff6b35', borderRadius: 10, padding: '8px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)'; }}
                  >
                    Load More ↓
                  </button>
                </div>
              )}
              {battles.length > 0 && battles.length <= visibleCount && battles.length > 10 && (
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--glass-border)', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
                  All {battles.length} battles loaded ✓
                </div>
              )}
            </div>
          )}

          {/* ACHIEVEMENTS TAB */}
          {activeTab === 'achievements' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {ACHIEVEMENTS.map(({ icon, title, desc, unlocked }) => (
                <div key={title} style={{
                  background: unlocked ? 'rgba(255,107,53,0.06)' : 'var(--panel-bg)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${unlocked ? 'rgba(255,107,53,0.3)' : 'var(--glass-border)'}`,
                  borderRadius: 20, padding: '24px', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  opacity: unlocked ? 1 : 0.45, filter: unlocked ? 'none' : 'grayscale(0.8)',
                  boxShadow: unlocked ? '0 0 30px rgba(255,107,53,0.08), 0 12px 32px rgba(0,0,0,0.2)' : '0 8px 24px rgba(0,0,0,0.1)',
                  position: 'relative', overflow: 'hidden', cursor: 'default'
                }}
                onMouseEnter={e => unlocked && (e.currentTarget.style.transform = 'translateY(-4px)', e.currentTarget.style.boxShadow = '0 0 40px rgba(255,107,53,0.15), 0 20px 40px rgba(0,0,0,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.transform = '', e.currentTarget.style.boxShadow = unlocked ? '0 0 30px rgba(255,107,53,0.08), 0 12px 32px rgba(0,0,0,0.2)' : '0 8px 24px rgba(0,0,0,0.1)')}>
                  {unlocked && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '50%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.6), transparent)' }} />}
                  <div style={{ width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 14, background: unlocked ? 'rgba(255,107,53,0.12)' : 'var(--glass-overlay)', border: `1px solid ${unlocked ? 'rgba(255,107,53,0.25)' : 'var(--glass-border)'}`, boxShadow: unlocked ? '0 8px 20px rgba(0,0,0,0.2)' : 'none' }}>
                    {unlocked ? icon : '🔒'}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</div>
                  {unlocked && <div style={{ marginTop: 10, fontSize: 11, fontWeight: 700, color: '#ff6b35', letterSpacing: 1 }}>✓ UNLOCKED</div>}
                </div>
              ))}
            </div>
          )}

          {/* STATS TAB */}
          {activeTab === 'stats' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              
              <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '24px 28px', gridColumn: '1 / -1', boxShadow: '0 20px 48px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '30%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)' }} />
                <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: 10, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Topic Mastery</div>
                <TopicRadarChart data={masteryData} />
              </div>

              <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '24px 28px', boxShadow: '0 20px 48px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: 1, background: 'linear-gradient(90deg, transparent, var(--glass-border-strong), transparent)' }} />
                <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: 20, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Performance</div>
                {[
                  { label: 'Wins', val: wins, total: total || 1, color: '#22c55e' },
                  { label: 'Losses', val: losses, total: total || 1, color: '#ef4444' },
                  { label: 'Easy Wins', val: easyWins, total: total || 1, color: '#22c55e' },
                  { label: 'Medium Wins', val: medWins, total: total || 1, color: '#fb923c' },
                  { label: 'Hard Wins', val: hardWins, total: total || 1, color: '#ef4444' },
                ].map(({ label, val, total, color }) => (
                  <div key={label} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
                      <span style={{ color, fontWeight: 800, fontFamily: 'JetBrains Mono' }}>{val}</span>
                    </div>
                    <div style={{ background: 'var(--glass-overlay)', height: 5, borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: `linear-gradient(90deg, ${color}80, ${color})`, width: `${(val/total)*100}%`, borderRadius: 10, transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `0 0 8px ${color}40` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '24px 28px', boxShadow: '0 20px 48px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: 1, background: 'linear-gradient(90deg, transparent, var(--glass-border-strong), transparent)' }} />
                <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: 20, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Account</div>
                {[
                  { label: 'Username', val: username },
                  { label: 'Email', val: user?.email || '-' },
                  { label: 'Status', val: user?.isVerified ? '✓ Verified' : '✗ Unverified' },
                  { label: 'Current ELO', val: `${elo} (${tier.icon} ${tier.name})` },
                  { label: 'Peak ELO', val: `📈 ${Math.max(peakElo, elo)}` },
                  { label: 'Puzzle XP', val: `🧩 ${user?.puzzleXp || 0}` },
                  { label: 'Win Rate', val: `${winRate}%` },
                  { label: 'Joined', val: new Date(user?.createdAt || Date.now()).toLocaleDateString() },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--glass-border)', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600, fontFamily: label === 'Current ELO' || label === 'Peak ELO' || label === 'Win Rate' ? 'JetBrains Mono, monospace' : 'inherit' }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '24px 28px', gridColumn: '1 / -1', boxShadow: '0 20px 48px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '30%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)' }} />
                <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: 20, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>ELO History</div>
                {battles.length > 0 ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
                      {battles.slice(-20).map((b, i) => {
                        const eloVal = b.eloAfter || elo
                        const pct = Math.max(5, Math.min(100, ((eloVal - 1000) / 400) * 100))
                        const isLast = i === Math.min(battles.length, 20) - 1
                        return (
                          <div key={i} title={`${eloVal} ELO`} style={{ flex: 1, display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                            <div style={{ width: '100%', height: `${pct}%`, minHeight: 4, borderRadius: '4px 4px 0 0', background: isLast ? 'linear-gradient(to top, #ff6b35, #fbbf24)' : 'var(--glass-border-strong)', transition: 'all 0.3s', boxShadow: isLast ? '0 0 12px rgba(255,107,53,0.4)' : 'none' }} />
                          </div>
                        )
                      })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                      <span>{battles.length} battles ago</span>
                      <span style={{ color: '#ff6b35', fontWeight: 700 }}>{elo} ELO (now)</span>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: 13 }}>
                    Play your first battle to see ELO history!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        :root {
          /* Dark Mode Defaults */
          --bg: #0a0a0c;
          --nav-bg: rgba(10,10,12,0.75);
          --panel-bg: rgba(18, 18, 22, 0.65);
          --card-bg: rgba(255, 255, 255, 0.02);
          --modal-overlay: rgba(0,0,0,0.9);
          --modal-bg: #13131a;
          
          --glass-border: rgba(255,255,255,0.06);
          --glass-border-strong: rgba(255,255,255,0.1);
          --glass-overlay: rgba(255,255,255,0.03);
          --glass-overlay-heavy: rgba(0,0,0,0.4);
          --avatar-bg: linear-gradient(135deg, #334155, #0f172a);
          
          --text-main: #e5e5e5;
          --text-muted: #888;
        }

        /* 🔥 Light Mode Overrides */
        :root[data-theme='light'], .light, body.light {
          --bg: #f3f4f6;
          --nav-bg: rgba(255,255,255,0.8);
          --panel-bg: rgba(255, 255, 255, 0.85);
          --card-bg: rgba(0, 0, 0, 0.02);
          --modal-overlay: rgba(255,255,255,0.85);
          --modal-bg: #f8fafc;

          --glass-border: rgba(0,0,0,0.08);
          --glass-border-strong: rgba(0,0,0,0.15);
          --glass-overlay: rgba(0,0,0,0.03);
          --glass-overlay-heavy: rgba(0,0,0,0.04);
          --avatar-bg: linear-gradient(135deg, #e2e8f0, #cbd5e1);

          --text-main: #111827;
          --text-muted: #6b7280;
        }

        @keyframes pulseGlow {
          0% { transform: scale(1) translate(0, 0); opacity: 0.6; }
          50% { transform: scale(1.1) translate(-20px, 20px); opacity: 0.9; }
          100% { transform: scale(1) translate(0, 0); opacity: 0.6; }
        }
        .ambient-glow-1 {
          animation: pulseGlow 8s infinite alternate ease-in-out;
        }
        .ambient-glow-2 {
          animation: pulseGlow 12s infinite alternate-reverse ease-in-out;
        }

        .profile-sidebar > div {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .profile-sidebar > div:hover {
          border-color: var(--glass-border-strong) !important;
        }

        .profile-content > div {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .profile-content > div:hover {
          border-color: var(--glass-border-strong) !important;
        }

        .stat-card {
          transition: all 0.2s !important;
        }
        .stat-card:hover {
          background: var(--glass-overlay) !important;
          border-color: var(--glass-border-strong) !important;
        }

        .profile-container [style*="borderBottom: '1px solid var(--glass-border)"] {
          transition: background 0.2s ease;
        }

        /* Mobile Hamburger & Drawer Styles */
        .mobile-menu-btn { display: none; background: transparent; border: none; font-size: 24px; color: var(--text-main); cursor: pointer; }
        .mobile-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 100%; max-width: 300px; background: var(--card-bg); backdrop-filter: blur(20px); border-left: 1px solid var(--glass-border); z-index: 1000; display: flex; flex-direction: column; box-shadow: -10px 0 40px rgba(0,0,0,0.5); }
        .drawer-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--glass-border); }
        .close-drawer-btn { background: transparent; border: none; font-size: 20px; color: var(--text-main); cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: var(--glass-overlay); }
        .drawer-content { padding: 24px; flex: 1; display: flex; flex-direction: column; gap: 24px; overflow-y: auto; }
        .drawer-links { display: flex; flex-direction: column; gap: 16px; }
        .drawer-links span { font-size: 16px; font-weight: 600; color: var(--text-muted); cursor: pointer; transition: color 0.2s; }
        .drawer-links span:hover { color: var(--text-main); }
        .drawer-footer { margin-top: auto; display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }

        @media (max-width: 900px) {
          .profile-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: flex; align-items: center; justify-content: center; margin-left: auto; }
          .profile-nav { padding: 0 16px !important; }
          .profile-main-grid { padding: 20px 16px 80px !important; }
        }
      `}</style>
    </div>
  )
}