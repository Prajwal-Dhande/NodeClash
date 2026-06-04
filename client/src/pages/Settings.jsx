import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '../context/ThemeContext'
import API_URL from '../config/api'

// Referencing Lobby design language (image_efa77b.png context)
// Constants for display data
const THEMES = ['Monokai', 'Dracula', 'One Dark', 'GitHub Dark', 'Solarized Dark']
const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
]

// Plan display names map based on backend context
const PLAN_NAMES = {
  'pro_1m': 'Pro (Monthly)',
  'pro_6m': 'Pro (6 Months)',
  'free': 'Free Tier'
};

// --- STYLED INLINE UTILITIES ---
const SectionTitle = ({ children }) => (
  <div style={{
    fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 800,
    color: 'var(--text-main)', letterSpacing: 2.5, textTransform: 'uppercase',
    marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid var(--glass-border)'
  }}>{children}</div>
)

const Toggle = ({ value, onChange }) => (
  <div onClick={() => onChange(!value)} style={{
    width: 44, height: 24, borderRadius: 12,
    background: value ? '#ff6b35' : 'var(--glass-overlay)',
    border: `1px solid ${value ? 'rgba(255,107,53,0.3)' : 'var(--glass-border)'}`,
    position: 'relative', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
    boxShadow: value ? '0 0 10px rgba(255,107,53,0.2)' : 'none'
  }}>
    <div style={{
      position: 'absolute', top: 3, left: value ? 23 : 3, width: 18, height: 18,
      borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }} />
  </div>
)

const SettingRow = ({ label, desc, children }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 0', borderBottom: '1px solid var(--glass-border)', gap: 16
  }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{label}</div>
      {desc && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>{desc}</div>}
    </div>
    {children}
  </div>
)

// Premium-style Glass Card component
const SettingsCard = ({ children, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    style={{
      background: 'var(--card-bg)', backdropFilter: 'blur(16px)',
      border: '1px solid var(--glass-border)', borderRadius: 20,
      padding: '28px', marginBottom: 24, position: 'relative', overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)', ...style
    }}>
    {children}
  </motion.div>
)


// MODAL STYLING OBJECT (Matching Lobby Modals)
const modalOverlayStyle = {
  position: 'fixed', inset: 0, background: 'var(--modal-overlay)',
  backdropFilter: 'blur(12px)', zIndex: 200,
  display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const modalBgStyle = {
  background: 'var(--modal-bg)', border: '1px solid var(--glass-border)',
  borderRadius: 24, width: '90%', maxWidth: 420, padding: '36px',
  boxShadow: '0 30px 80px rgba(0,0,0,0.5)'
};


export default function Settings() {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))

  // Arena Preferences (persistent in localStorage)
  const [defaultLang, setDefaultLang] = useState(localStorage.getItem('ca_defaultLang') || 'javascript')
  const [editorTheme, setEditorTheme] = useState(localStorage.getItem('ca_editorTheme') || 'Monokai')
  const [matchSounds, setMatchSounds] = useState(localStorage.getItem('ca_matchSounds') !== 'false')
  const [vimMode, setVimMode] = useState(localStorage.getItem('ca_vimMode') === 'true')

  // Privacy
  const [profilePublic, setProfilePublic] = useState(true)
  const [showEloOnLeaderboard, setShowEloOnLeaderboard] = useState(true)

  // Password
  const [showPwModal, setShowPwModal] = useState(false)
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')

  // Delete
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  // Subscription
  const [premiumStatus, setPremiumStatus] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/auth'); return }
    fetch(`${API_URL}/api/payment/status`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        setPremiumStatus(d);
        // Ensure frontend 'user' object is synced with backend if necessary
        if (d.isPremium && !user.isPremium) {
          const updatedUser = { ...user, isPremium: true, premiumPlan: d.plan };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      }).catch(() => { })
  }, [])

  // Save preferences to localStorage whenever they change
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
    setPwMsg('Backend update pending — connection structure ready.');
    // setTimeout(() => setShowPwModal(false), 2000);
  }

  const handleDelete = async () => {
    if (deleteConfirm !== user?.username) return
    // Future: call backend DELETE /api/users/me
    setPwMsg("Backend connection structure ready for account deletion.")
    // handleLogout()
  }

  const isPro = user?.isPremium || premiumStatus?.isPremium;
  const currentPlanName = PLAN_NAMES[premiumStatus?.plan || user?.premiumPlan] || 'Unknown';

  // FIX: Accurate data logic from backend (removed purane hardcoding)
  const daysLeft = premiumStatus?.daysLeft || 0;

  const planColor = isPro
    ? { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.3)', glow: 'rgba(96,165,250,0.08)' }
    : { color: 'var(--text-muted)', bg: 'var(--glass-overlay)', border: 'var(--glass-border)', glow: 'transparent' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Inter, sans-serif', color: 'var(--text-main)', transition: 'background-color 0.3s' }}>

      {/* NAV (Styled like Lobby Nav) */}
      <nav style={{ height: 60, background: 'var(--nav-bg)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: 32 }} onClick={() => navigate('/')}>
          <span style={{ color: '#ff6b35', marginRight: '6px' }}>{'{C}'}</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>CodeArena</span>
        </span>
        <div style={{ flex: 1 }} />
        <ThemeToggle />
        <button onClick={() => navigate('/profile')} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', marginLeft: 16 }}>← Back to Profile</button>
      </nav>

      <div style={{ maxWidth: 840, margin: '0 auto', padding: '60px 20px 80px' }}>

        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, margin: '0 0 10px 0', letterSpacing: '-1px' }}>Platform Preferences</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, maxW: 480, margin: '0 auto' }}>Manage your account security, interface preferences, and active subscription status.</p>
        </div>

        {/* ── SUBSCRIPTION (FIXED: Uses actual backend data, removed hardcoding) ── */}
        <SettingsCard style={{ border: `1px solid ${planColor.border}`, boxShadow: `0 20px 60px ${planColor.glow}` }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 100, height: 100, background: planColor.glow, filter: 'blur(30px)' }} />
          <SectionTitle>Your Subscription</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: planColor.bg, border: `1px solid ${planColor.border}`, padding: '10px 22px', borderRadius: 12 }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: planColor.color, fontFamily: 'Outfit' }}>{isPro ? 'Pro' : 'Free'}</span>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
                  {isPro ? `${currentPlanName} Active ✅` : 'Free Tier (Standard Arena)'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, maxW: 300 }}>
                  {isPro
                    ? (daysLeft > 0 ? `${daysLeft} days remaining (Expires ${premiumStatus?.expireStr})` : 'Active subscription')
                    : 'Upgrade to unlock MAANG exclusive Vault, Clara AI interviewer & advanced analytics.'}
                </div>
              </div>
            </div>
            {!isPro ? (
              <button onClick={() => navigate('/premium')} style={{ background: 'linear-gradient(135deg, #ff6b35, #f7451d)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', boxShadow: '0 6px 15px rgba(255,107,53,0.3)' }}>
                Upgrade Now →
              </button>
            ) : (
              <button style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'default', fontFamily: 'Inter' }}>Manage Bill</button>
            )}
          </div>
        </SettingsCard>

        {/* ── ARENA PREFERENCES ── */}
        <SettingsCard>
          <SectionTitle>Arena preferences</SectionTitle>

          <SettingRow label="Default Arena Language" desc="Pre-selected language when you enter a live battle or practice mode">
            <select value={defaultLang} onChange={e => setDefaultLang(e.target.value)} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '10px 16px', borderRadius: 10, fontSize: 13, outline: 'none', cursor: 'pointer', fontFamily: 'Inter' }}>
              {LANGUAGES.map(l => <option key={l.id} value={l.id} style={{ background: '#1a1a1f' }}>{l.label}</option>)}
            </select>
          </SettingRow>

          <SettingRow label="Code Editor Theme" desc="Visual color scheme for the IDE on Battle Room">
            <select value={editorTheme} onChange={e => setEditorTheme(e.target.value)} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '10px 16px', borderRadius: 10, fontSize: 13, outline: 'none', cursor: 'pointer', fontFamily: 'Inter' }}>
              {THEMES.map(t => <option key={t} value={t} style={{ background: '#1a1a1f' }}>{t}</option>)}
            </select>
          </SettingRow>

          <SettingRow label="Interface Sound Effects" desc="Play sound cues during matches, submissions, and matchmaking">
            <Toggle value={matchSounds} onChange={setMatchSounds} />
          </SettingRow>

          <SettingRow label="Vim Keybindings" desc="Use Vim-style keyboard shortcuts in the Codearena editor">
            <Toggle value={vimMode} onChange={setVimMode} />
          </SettingRow>
        </SettingsCard>

        {/* Account and Privacy in Two Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 24 }}>
          {/* ── PRIVACY ── */}
          <SettingsCard style={{ marginBottom: 0 }}>
            <SectionTitle>Privacy & Display</SectionTitle>

            <SettingRow label="Public Profile Visible" desc="Allow other players to view your profile">
              <Toggle value={profilePublic} onChange={setProfilePublic} />
            </SettingRow>

            <SettingRow label="Show ELO on Leaderboard" desc="Show your current rating publicly">
              <Toggle value={showEloOnLeaderboard} onChange={setShowEloOnLeaderboard} />
            </SettingRow>
          </SettingsCard>

          {/* ── ACCOUNT ── */}
          <SettingsCard style={{ marginBottom: 0 }}>
            <SectionTitle>Account Access</SectionTitle>

            <SettingRow label="Username" desc="Unique ID (Hardcoded, non-changeable)">
              <span style={{ fontSize: 13, color: 'var(--text-main)', fontWeight: 700, padding: '6px 12px', background: 'var(--glass-overlay)', borderRadius: 6 }}>@{user?.username}</span>
            </SettingRow>

            <SettingRow label="Password Security" desc="Change your account password">
              <button onClick={() => setShowPwModal(true)} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>Change Pw →</button>
            </SettingRow>

            <SettingRow label="Change Email Address" desc={user?.email || 'Not set'}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', padding: '4px 10px', background: 'rgba(34,197,94,0.1)', borderRadius: 6 }}>Verified ✓</span>
            </SettingRow>
          </SettingsCard>
        </div>

        {/* ── DANGER ZONE (Updated Aesthetic) ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20, padding: '24px 32px' }}>
          <div>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: '#ef4444', margin: '0 0 6px 0' }}>⚠️ Account Deletion</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', maxW: 460, margin: 0 }}>Permanently delete your account, battle history, stats, and active subscription. This action is **irreversible**.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleLogout} style={{ background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
              Logout
            </button>
            <button onClick={() => setShowDeleteModal(true)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter' }}>Delete Account</button>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL (Updated Aesthetic: Glass + Outfit Typography) */}
      {showPwModal && (
        <div style={modalOverlayStyle}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={modalBgStyle}>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, margin: '0 0 24px 0', color: 'var(--text-main)' }}>Reset Security Credentials</h3>
            {[{ label: 'Current System Password', val: oldPw, set: setOldPw }, { label: 'New Arena Password', val: newPw, set: setNewPw }, { label: 'Confirm New Password', val: confirmPw, set: setConfirmPw }].map(f => (
              <div key={f.label} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: 8, letterSpacing: 1.5, textTransform: 'uppercase' }}>{f.label}</label>
                <input type="password" value={f.val} onChange={e => f.set(e.target.value)} style={{ width: '100%', background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '12px 16px', borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box' }} />
              </div>
            ))}
            {pwMsg && <div style={{ fontSize: 12, color: '#fbbf24', margin: '0 0 16px 0', textAlign: 'center' }}>{pwMsg}</div>}
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button onClick={() => { setShowPwModal(false); setPwMsg('') }} style={{ flex: 1, background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>Cancel</button>
              <button onClick={handleChangePw} style={{ flex: 1, background: '#ff6b35', border: 'none', color: '#fff', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter' }}>Update credentials</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL (Updated Aesthetic: Glass + Red Highlights) */}
      {showDeleteModal && (
        <div style={modalOverlayStyle}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ ...modalBgStyle, border: '1px solid rgba(239,68,68,0.3)' }}>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, margin: '0 0 12px 0', color: '#ef4444' }}>Permanently Remove Account</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 24px 0' }}>This action will erase ALL battles, stats, your ELO, and active Pro membership. **It cannot be undone.** Type <strong style={{ color: '#fff', fontWeight: 800 }}>{user?.username}</strong> below to authorize deletion.</p>
            <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder={user?.username} style={{ width: '100%', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--text-main)', padding: '12px 16px', borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'Inter', marginBottom: 20, boxSizing: 'border-box' }} />
            {pwMsg && <div style={{ fontSize: 12, color: '#fbbf24', margin: '0 0 16px 0', textAlign: 'center' }}>{pwMsg}</div>}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); setPwMsg('') }} style={{ flex: 1, background: 'var(--glass-overlay)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>Cancel Authorization</button>
              <button onClick={handleDelete} disabled={deleteConfirm !== user?.username} style={{ flex: 1, background: deleteConfirm === user?.username ? '#ef4444' : 'rgba(239,68,68,0.15)', border: 'none', color: '#fff', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: deleteConfirm === user?.username ? 'pointer' : 'not-allowed', fontFamily: 'Inter', opacity: deleteConfirm === user?.username ? 1 : 0.6 }}>Delete Permanently</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}