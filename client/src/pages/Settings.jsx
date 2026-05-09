import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeToggle } from '../context/ThemeContext'
import API_URL from '../config/api'

// Constants
const THEMES = ['Monokai', 'Dracula', 'One Dark', 'GitHub Dark', 'Solarized Dark']
const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
]

const PLAN_NAMES = {
  'pro_1m': 'Pro (Monthly)',
  'pro_6m': 'Pro (6 Months)',
  'pro': 'Pro',
  'free': 'Free Tier',
}

// ── Styled Utilities ──
const SectionTitle = ({ children }) => (
  <div style={{
    fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 800,
    color: 'var(--text-main)', letterSpacing: 2.5, textTransform: 'uppercase',
    marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid var(--glass-border)',
  }}>{children}</div>
)

const Toggle = ({ value, onChange }) => (
  <div onClick={() => onChange(!value)} style={{
    width: 44, height: 24, borderRadius: 12,
    background: value ? '#ff6b35' : 'var(--glass-overlay)',
    border: `1px solid ${value ? 'rgba(255,107,53,0.3)' : 'var(--glass-border)'}`,
    position: 'relative', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
    boxShadow: value ? '0 0 10px rgba(255,107,53,0.2)' : 'none',
  }}>
    <div style={{
      position: 'absolute', top: 3, left: value ? 23 : 3, width: 18, height: 18,
      borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    }} />
  </div>
)

const SettingRow = ({ label, desc, children }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 0', borderBottom: '1px solid var(--glass-border)', gap: 16,
  }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{label}</div>
      {desc && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>{desc}</div>}
    </div>
    {children}
  </div>
)

const SettingsCard = ({ children, style = {}, delay = 0.1 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    style={{
      background: 'var(--card-bg)', backdropFilter: 'blur(16px)',
      border: '1px solid var(--glass-border)', borderRadius: 20,
      padding: '28px', marginBottom: 24, position: 'relative', overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)', ...style,
    }}>
    {children}
  </motion.div>
)

const modalOverlay = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
  backdropFilter: 'blur(12px)', zIndex: 200,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
const modalBox = {
  background: 'var(--card-bg)', border: '1px solid var(--glass-border)',
  borderRadius: 24, width: '90%', maxWidth: 420, padding: '36px',
  boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
}

const selectStyle = {
  background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)',
  color: 'var(--text-main)', padding: '10px 16px', borderRadius: 10,
  fontSize: 13, outline: 'none', cursor: 'pointer', fontFamily: 'Inter',
}

export default function Settings() {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))

  // Arena Preferences
  const [defaultLang, setDefaultLang] = useState(localStorage.getItem('ca_defaultLang') || 'javascript')
  const [editorTheme, setEditorTheme] = useState(localStorage.getItem('ca_editorTheme') || 'Monokai')
  const [matchSounds, setMatchSounds] = useState(localStorage.getItem('ca_matchSounds') !== 'false')
  const [vimMode, setVimMode] = useState(localStorage.getItem('ca_vimMode') === 'true')

  // Privacy
  const [profilePublic, setProfilePublic] = useState(true)
  const [showEloOnLeaderboard, setShowEloOnLeaderboard] = useState(true)

  // Password modal
  const [showPwModal, setShowPwModal] = useState(false)
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteMsg, setDeleteMsg] = useState('')

  // Subscription
  const [premiumStatus, setPremiumStatus] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/auth'); return }
    fetch(`${API_URL}/api/payment/status`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        setPremiumStatus(d)
        if (d.isPremium && !user.isPremium) {
          const updatedUser = { ...user, isPremium: true, premiumPlan: d.premiumPlan }
          localStorage.setItem('user', JSON.stringify(updatedUser))
          setUser(updatedUser)
        }
      }).catch(() => {})
  }, [])

  useEffect(() => {
    localStorage.setItem('ca_defaultLang', defaultLang)
    localStorage.setItem('ca_editorTheme', editorTheme)
    localStorage.setItem('ca_matchSounds', matchSounds)
    localStorage.setItem('ca_vimMode', vimMode)
  }, [defaultLang, editorTheme, matchSounds, vimMode])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/auth')
  }

  const handleChangePw = async () => {
    if (newPw !== confirmPw) { setPwMsg('Passwords do not match'); return }
    if (newPw.length < 6) { setPwMsg('Password must be at least 6 characters'); return }
    setPwMsg('Backend endpoint pending — connection structure ready.')
  }

  const handleDelete = async () => {
    if (deleteConfirm !== user?.username) return
    setDeleteMsg('Backend endpoint pending — connection structure ready.')
  }

  // ── Derived subscription data ──
  const isPro = user?.isPremium || premiumStatus?.isPremium
  const planKey = premiumStatus?.premiumPlan || user?.premiumPlan || 'free'
  const currentPlanName = PLAN_NAMES[planKey] || 'Pro'
  const daysLeft = premiumStatus?.daysLeft || 0
  const expiryDate = premiumStatus?.premiumExpiry
    ? new Date(premiumStatus.premiumExpiry).toLocaleDateString('en-IN', { dateStyle: 'long' })
    : null

  const planColor = isPro
    ? { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.3)', glow: 'rgba(96,165,250,0.08)' }
    : { color: 'var(--text-muted)', bg: 'var(--glass-overlay)', border: 'var(--glass-border)', glow: 'transparent' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Inter, sans-serif', color: 'var(--text-main)', transition: 'background-color 0.3s' }}>

      {/* NAV */}
      <nav style={{ height: 60, background: 'var(--nav-bg)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', transition: 'background-color 0.3s' }}>
        <span style={{ fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: 32 }} onClick={() => navigate('/')}>
          <span style={{ color: '#ff6b35', marginRight: 6 }}>{'{C}'}</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>CodeArena</span>
        </span>
        <div style={{ flex: 1 }} />
        <ThemeToggle />
        <button onClick={() => navigate('/profile')} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', marginLeft: 16, transition: 'all 0.2s' }}>
          ← Back to Profile
        </button>
      </nav>

      <div style={{ maxWidth: 840, margin: '0 auto', padding: '60px 20px 80px' }}>

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 50 }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, margin: '0 0 10px 0', letterSpacing: '-1px', color: 'var(--text-main)' }}>Platform Preferences</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>Manage your account security, interface preferences, and active subscription status.</p>
        </motion.div>

        {/* ── SUBSCRIPTION ── */}
        <SettingsCard delay={0.1} style={{ border: `1px solid ${planColor.border}`, boxShadow: `0 20px 60px ${planColor.glow}` }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 100, height: 100, background: planColor.glow, filter: 'blur(30px)', pointerEvents: 'none' }} />
          <SectionTitle>Your Subscription</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: planColor.bg, border: `1px solid ${planColor.border}`, padding: '10px 22px', borderRadius: 12 }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: planColor.color, fontFamily: 'Outfit' }}>{isPro ? 'Pro' : 'Free'}</span>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
                  {isPro ? `${currentPlanName} Active ✅` : 'Free Tier (Standard Arena)'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 340 }}>
                  {isPro
                    ? (daysLeft > 0
                        ? `${daysLeft} days remaining${expiryDate ? ` · Expires ${expiryDate}` : ''}`
                        : 'Active subscription')
                    : 'Upgrade to unlock FAANG Vault, Clara AI interviewer & advanced analytics.'}
                </div>
              </div>
            </div>
            {!isPro ? (
              <button onClick={() => navigate('/premium')} style={{ background: 'linear-gradient(135deg, #ff6b35, #f7451d)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', boxShadow: '0 6px 15px rgba(255,107,53,0.3)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                Upgrade Now →
              </button>
            ) : (
              <button onClick={() => navigate('/premium')} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', whiteSpace: 'nowrap' }}>
                Manage Plan
              </button>
            )}
          </div>
        </SettingsCard>

        {/* ── ARENA PREFERENCES ── */}
        <SettingsCard delay={0.15}>
          <SectionTitle>Arena Preferences</SectionTitle>

          <SettingRow label="Default Arena Language" desc="Pre-selected language when you enter a live battle or practice mode">
            <select value={defaultLang} onChange={e => setDefaultLang(e.target.value)} style={selectStyle}>
              {LANGUAGES.map(l => <option key={l.id} value={l.id} style={{ background: 'var(--card-bg)' }}>{l.label}</option>)}
            </select>
          </SettingRow>

          <SettingRow label="Code Editor Theme" desc="Visual color scheme for the IDE in Battle Room">
            <select value={editorTheme} onChange={e => setEditorTheme(e.target.value)} style={selectStyle}>
              {THEMES.map(t => <option key={t} value={t} style={{ background: 'var(--card-bg)' }}>{t}</option>)}
            </select>
          </SettingRow>

          <SettingRow label="Interface Sound Effects" desc="Play sound cues during matches, submissions, and matchmaking">
            <Toggle value={matchSounds} onChange={setMatchSounds} />
          </SettingRow>

          <SettingRow label="Vim Keybindings" desc="Use Vim-style keyboard shortcuts in the CodeArena editor">
            <Toggle value={vimMode} onChange={setVimMode} />
          </SettingRow>
        </SettingsCard>

        {/* Privacy + Account — Two Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 24 }}>

          {/* ── PRIVACY ── */}
          <SettingsCard delay={0.2} style={{ marginBottom: 0 }}>
            <SectionTitle>Privacy & Display</SectionTitle>

            <SettingRow label="Public Profile Visible" desc="Allow other players to view your profile">
              <Toggle value={profilePublic} onChange={setProfilePublic} />
            </SettingRow>

            <SettingRow label="Show ELO on Leaderboard" desc="Show your current rating publicly">
              <Toggle value={showEloOnLeaderboard} onChange={setShowEloOnLeaderboard} />
            </SettingRow>
          </SettingsCard>

          {/* ── ACCOUNT ── */}
          <SettingsCard delay={0.25} style={{ marginBottom: 0 }}>
            <SectionTitle>Account Access</SectionTitle>

            <SettingRow label="Username" desc="Your unique identifier">
              <span style={{ fontSize: 13, color: 'var(--text-main)', fontWeight: 700, padding: '6px 12px', background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', borderRadius: 8 }}>@{user?.username || 'Player'}</span>
            </SettingRow>

            <SettingRow label="Password Security" desc="Change your account password">
              <button onClick={() => setShowPwModal(true)} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.2s' }}>Change →</button>
            </SettingRow>

            <SettingRow label="Email Address" desc={user?.email || 'Not set'}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', padding: '4px 10px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 6 }}>Verified ✓</span>
            </SettingRow>
          </SettingsCard>
        </div>

        {/* ── DANGER ZONE ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20, padding: '24px 32px', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: '#ef4444', margin: '0 0 6px 0' }}>⚠️ Account Deletion</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 460, margin: 0, lineHeight: 1.5 }}>
              Permanently delete your account, battle history, stats, and active subscription. This action is <strong style={{ color: '#ef4444' }}>irreversible</strong>.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <button onClick={handleLogout} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.2s' }}>
              Logout
            </button>
            <button onClick={() => setShowDeleteModal(true)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.2s' }}>
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── CHANGE PASSWORD MODAL ── */}
      {showPwModal && (
        <div style={modalOverlay}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={modalBox}>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, margin: '0 0 24px 0', color: 'var(--text-main)' }}>Reset Security Credentials</h3>
            {[
              { label: 'Current Password', val: oldPw, set: setOldPw },
              { label: 'New Password', val: newPw, set: setNewPw },
              { label: 'Confirm New Password', val: confirmPw, set: setConfirmPw },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: 8, letterSpacing: 1.5, textTransform: 'uppercase' }}>{f.label}</label>
                <input type="password" value={f.val} onChange={e => f.set(e.target.value)} style={{ width: '100%', background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '12px 16px', borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box' }} />
              </div>
            ))}
            {pwMsg && <div style={{ fontSize: 12, color: '#fbbf24', margin: '0 0 16px 0', textAlign: 'center' }}>{pwMsg}</div>}
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button onClick={() => { setShowPwModal(false); setPwMsg(''); setOldPw(''); setNewPw(''); setConfirmPw('') }} style={{ flex: 1, background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>Cancel</button>
              <button onClick={handleChangePw} style={{ flex: 1, background: '#ff6b35', border: 'none', color: '#fff', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter' }}>Update Credentials</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── DELETE ACCOUNT MODAL ── */}
      {showDeleteModal && (
        <div style={modalOverlay}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ ...modalBox, border: '1px solid rgba(239,68,68,0.3)' }}>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, margin: '0 0 12px 0', color: '#ef4444' }}>Permanently Remove Account</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 24px 0' }}>
              This action will erase ALL battles, stats, your ELO, and active Pro membership. It <strong style={{ color: '#ef4444' }}>cannot be undone</strong>. Type <strong style={{ color: 'var(--text-main)', fontWeight: 800 }}>{user?.username}</strong> below to authorize.
            </p>
            <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder={user?.username} style={{ width: '100%', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--text-main)', padding: '12px 16px', borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'Inter', marginBottom: 20, boxSizing: 'border-box' }} />
            {deleteMsg && <div style={{ fontSize: 12, color: '#fbbf24', margin: '0 0 16px 0', textAlign: 'center' }}>{deleteMsg}</div>}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); setDeleteMsg('') }} style={{ flex: 1, background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>Cancel</button>
              <button onClick={handleDelete} disabled={deleteConfirm !== user?.username} style={{ flex: 1, background: deleteConfirm === user?.username ? '#ef4444' : 'rgba(239,68,68,0.15)', border: 'none', color: '#fff', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: deleteConfirm === user?.username ? 'pointer' : 'not-allowed', fontFamily: 'Inter', opacity: deleteConfirm === user?.username ? 1 : 0.6 }}>Delete Permanently</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
