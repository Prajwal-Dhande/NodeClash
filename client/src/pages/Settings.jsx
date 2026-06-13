import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '../context/ThemeContext'
import API_URL from '../config/api'
import { 
  User, Monitor, Shield, CreditCard, LogOut, CheckCircle2, AlertTriangle, 
  ChevronRight, KeyRound, ArrowLeft, Terminal, Layout, Type, LayoutTemplate, Braces, Sidebar, Code, Volume2
} from 'lucide-react'

// Constants
const THEMES = ['Monokai', 'Dracula', 'One Dark', 'GitHub Dark', 'Solarized Dark']
const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
]
const PLAN_NAMES = { 'pro': 'Pro Tier', 'pro_1m': 'Pro (Monthly)', 'pro_6m': 'Pro (6 Months)', 'free': 'Free Tier' }

// Reusable Components
const Toggle = ({ value, onChange }) => (
  <div onClick={() => onChange(!value)} style={{
    width: 48, height: 26, borderRadius: 13,
    background: value ? 'linear-gradient(135deg, var(--orange), var(--orange2))' : 'var(--btn-bg)',
    border: `1px solid ${value ? 'var(--orange)' : 'var(--border)'}`,
    position: 'relative', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', flexShrink: 0,
    boxShadow: value ? '0 0 15px var(--orange-dim)' : 'none'
  }}>
    <div style={{
      position: 'absolute', top: 3, left: value ? 25 : 3, width: 18, height: 18,
      borderRadius: '50%', background: 'var(--bg2)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
    }} />
  </div>
)

const SettingRow = ({ label, desc, icon: Icon, children }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px', borderBottom: '1px solid var(--border)', gap: 20,
    transition: 'background 0.2s',
  }} className="setting-row">
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {Icon && (
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--btn-bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          <Icon size={20} />
        </div>
      )}
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-main)', letterSpacing: '-0.3px' }}>{label}</div>
        {desc && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>{desc}</div>}
      </div>
    </div>
    <div style={{ flexShrink: 0 }}>{children}</div>
  </div>
)

const modalOverlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }
const modalBgStyle = { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 24, width: '90%', maxWidth: 420, padding: '32px', boxShadow: '0 40px 100px rgba(0,0,0,0.4)' }

export default function Settings() {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
  const [activeTab, setActiveTab] = useState('account')

  // Arena Preferences
  const [defaultLang, setDefaultLang] = useState(localStorage.getItem('ca_defaultLang') || 'javascript')
  const [editorTheme, setEditorTheme] = useState(localStorage.getItem('ca_editorTheme') || 'Monokai')
  const [matchSounds, setMatchSounds] = useState(localStorage.getItem('ca_matchSounds') !== 'false')
  const [vimMode, setVimMode] = useState(localStorage.getItem('ca_vimMode') === 'true')
  const [tabSize, setTabSize] = useState(localStorage.getItem('ca_tabSize') || '4')
  const [fontSize, setFontSize] = useState(localStorage.getItem('ca_fontSize') || '14')
  const [autoCloseBrackets, setAutoCloseBrackets] = useState(localStorage.getItem('ca_autoCloseBrackets') !== 'false')
  const [minimap, setMinimap] = useState(localStorage.getItem('ca_minimap') === 'true')

  // Privacy
  const [profilePublic, setProfilePublic] = useState(user?.publicProfile !== false)
  const [showEloOnLeaderboard, setShowEloOnLeaderboard] = useState(user?.showEloOnLeaderboard !== false)

  useEffect(() => {
    if (!user?._id) return;
    if (profilePublic === (user.publicProfile !== false) && showEloOnLeaderboard === (user.showEloOnLeaderboard !== false)) return;
    const updatePrivacy = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${API_URL}/api/users/profile`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ publicProfile: profilePublic, showEloOnLeaderboard: showEloOnLeaderboard }) })
        if (res.ok) {
          const updatedUser = { ...user, publicProfile: profilePublic, showEloOnLeaderboard: showEloOnLeaderboard }
          setUser(updatedUser)
          localStorage.setItem('user', JSON.stringify(updatedUser))
        }
      } catch (err) {}
    };
    updatePrivacy();
  }, [profilePublic, showEloOnLeaderboard]);

  // Modals & Subs
  const [showPwModal, setShowPwModal] = useState(false)
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [pwStep, setPwStep] = useState(1)
  const [otp, setOtp] = useState('')
  const [pwLoading, setPwLoading] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [premiumStatus, setPremiumStatus] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/auth'); return }
    fetch(`${API_URL}/api/payment/status`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        setPremiumStatus(d);
        if (d.isPremium && !user.isPremium) {
          const updatedUser = { ...user, isPremium: true, premiumPlan: d.plan };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      }).catch(() => { })
  }, [])

  useEffect(() => {
    localStorage.setItem('ca_defaultLang', defaultLang)
    localStorage.setItem('ca_editorTheme', editorTheme)
    localStorage.setItem('ca_matchSounds', matchSounds)
    localStorage.setItem('ca_vimMode', vimMode)
    localStorage.setItem('ca_tabSize', tabSize)
    localStorage.setItem('ca_fontSize', fontSize)
    localStorage.setItem('ca_autoCloseBrackets', autoCloseBrackets)
    localStorage.setItem('ca_minimap', minimap)
  }, [defaultLang, editorTheme, matchSounds, vimMode, tabSize, fontSize, autoCloseBrackets, minimap])

  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/auth') }
  
  const handleRequestPw = async () => {
    if (newPw !== confirmPw) return setPwMsg('Passwords do not match')
    if (newPw.length < 8) return setPwMsg('Password must be at least 8 characters')
    if (!oldPw) return setPwMsg('Current password is required')
    setPwLoading(true); setPwMsg('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/api/auth/change-password/request`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ oldPassword: oldPw }) })
      const data = await res.json()
      if (res.ok) { setPwStep(2); setPwMsg(data.message) }
      else setPwMsg(data.message || 'Failed to request OTP')
    } catch (err) { setPwMsg('Server error') }
    setPwLoading(false)
  }

  const handleVerifyPw = async () => {
    if (!otp) return setPwMsg('OTP is required')
    setPwLoading(true); setPwMsg('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/api/auth/change-password/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ oldPassword: oldPw, newPassword: newPw, otp }) })
      const data = await res.json()
      if (res.ok) {
        setPwStep(1); setShowPwModal(false)
        setOldPw(''); setNewPw(''); setConfirmPw(''); setOtp(''); setPwMsg('')
        alert('Password updated successfully!')
      } else setPwMsg(data.message || 'Failed to update password')
    } catch (err) { setPwMsg('Server error') }
    setPwLoading(false)
  }

  const handleDelete = async () => {
    if (deleteConfirm !== user?.username) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/api/users/me`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) handleLogout()
      else { const data = await res.json(); setPwMsg(data.message || 'Failed to delete account'); }
    } catch (err) { setPwMsg('Server error during deletion') }
  }

  const isPro = premiumStatus ? premiumStatus.isPremium : user?.isPremium;
  let planKey = premiumStatus?.premiumPlan || user?.premiumPlan || 'free';
  if (isPro && planKey === 'free') planKey = 'pro';
  const currentPlanName = PLAN_NAMES[planKey] || 'Pro Tier';

  let daysLeft = premiumStatus?.daysLeft || 0;
  let expireStr = '';
  if (premiumStatus?.premiumExpiry || user?.premiumExpiry) {
    const expiryDate = new Date(premiumStatus?.premiumExpiry || user?.premiumExpiry);
    expireStr = expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
  }

  const planColor = isPro 
    ? { color: 'var(--orange)', bg: 'var(--orange-dim)', border: 'var(--orange)', glow: 'var(--orange-dim)' }
    : { color: 'var(--text-muted)', bg: 'var(--btn-bg)', border: 'var(--border)', glow: 'transparent' };

  const selectStyle = { background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '10px 16px', borderRadius: 10, fontSize: 13, outline: 'none', cursor: 'pointer', fontFamily: 'Inter', minWidth: 140 }

  const TABS = [
    { id: 'account', label: 'Account Profile', icon: User },
    { id: 'arena', label: 'Arena Preferences', icon: Terminal },
    { id: 'privacy', label: 'Privacy & Display', icon: Shield },
    { id: 'subscription', label: 'Subscription Plan', icon: CreditCard },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Inter, sans-serif', color: 'var(--text-main)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Dynamic Background Glow */}
      <div style={{ position: 'fixed', top: -200, right: -200, width: 600, height: 600, background: 'radial-gradient(circle, var(--orange-dim) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -200, left: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* NAV */}
      <nav style={{ height: 70, background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 32px', position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
          <span style={{ color: 'var(--orange)', marginRight: 8, fontWeight: 900 }}>{'{C}'}</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 800, letterSpacing: '-0.5px' }}>CodeArena</span>
        </span>
        <div style={{ flex: 1 }} />
        <ThemeToggle />
        <button onClick={() => navigate('/profile')} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginLeft: 24, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          <ArrowLeft size={16} /> Back to Profile
        </button>
      </nav>

      <div className="settings-layout" style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px', width: '100%', display: 'flex', gap: 40, flex: 1 }}>
        
        {/* SIDEBAR */}
        <div className="settings-sidebar" style={{ width: 280, flexShrink: 0 }}>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-1px', margin: '0 0 8px 0' }}>Settings</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5, margin: 0 }}>Manage your preferences, security, and CodeArena setup.</p>
          </div>

          <div className="settings-tabs" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                  background: activeTab === tab.id ? 'var(--btn-bg)' : 'transparent',
                  border: '1px solid',
                  borderColor: activeTab === tab.id ? 'var(--border)' : 'transparent',
                  borderRadius: 14, color: activeTab === tab.id ? 'var(--text-main)' : 'var(--text-muted)',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                  boxShadow: activeTab === tab.id ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <tab.icon size={18} style={{ color: activeTab === tab.id ? 'var(--orange)' : 'var(--text-muted)' }} />
                {tab.label}
                {activeTab === tab.id && <ChevronRight size={16} className="tab-chevron" style={{ marginLeft: 'auto', opacity: 0.5 }} />}
              </button>
            ))}
          </div>

          <div className="settings-logout" style={{ marginTop: 60, borderTop: '1px solid var(--border)', paddingTop: 30 }}>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', color: 'var(--red)', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '10px 18px', borderRadius: 12, transition: 'background 0.2s', width: '100%', textAlign: 'left' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              <LogOut size={18} /> Log out from all devices
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="settings-content" style={{ flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                background: 'var(--card-bg)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--border)', borderRadius: 24,
                overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.1)'
              }}
            >
              
              {/* --- ACCOUNT TAB --- */}
              {activeTab === 'account' && (
                <div>
                  <div className="tab-header" style={{ padding: '30px 40px', borderBottom: '1px solid var(--border)', background: 'var(--btn-bg)' }}>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Account Profile</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>Manage your identity and authentication settings.</p>
                  </div>
                  <div style={{ padding: '10px 20px' }}>
                    <SettingRow label="Username" desc="Your unique CodeArena identity" icon={User}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', padding: '8px 16px', background: 'var(--btn-bg)', borderRadius: 10, border: '1px solid var(--border)' }}>@{user?.username}</div>
                    </SettingRow>
                    <SettingRow label="Email Address" desc={user?.email || 'Not set'} icon={CheckCircle2}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', padding: '6px 12px', background: 'rgba(34,197,94,0.1)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.2)' }}>Verified</span>
                    </SettingRow>
                    <SettingRow label="Password & Security" desc="Update your password and secure your account" icon={KeyRound}>
                      <button onClick={() => setShowPwModal(true)} style={{ background: 'var(--btn-bg)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Change Password</button>
                    </SettingRow>
                  </div>
                  <div style={{ padding: '30px 40px', background: 'rgba(239,68,68,0.05)', borderTop: '1px solid rgba(239,68,68,0.2)' }}>
                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 16, color: 'var(--red)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 8 }}><AlertTriangle size={18} /> Danger Zone</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 20px 0', lineHeight: 1.6, maxWidth: 500 }}>Permanently delete your account and all associated data. This action is irreversible.</p>
                    <button onClick={() => setShowDeleteModal(true)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--red)', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}>Delete Account</button>
                  </div>
                </div>
              )}

              {/* --- ARENA TAB --- */}
              {activeTab === 'arena' && (
                <div>
                  <div className="tab-header" style={{ padding: '30px 40px', borderBottom: '1px solid var(--border)', background: 'var(--btn-bg)' }}>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Arena Preferences</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>Customize your coding environment and editor behavior.</p>
                  </div>
                  <div style={{ padding: '10px 20px' }}>
                    <SettingRow label="Default Language" desc="Pre-selected language in matches" icon={Code}>
                      <select value={defaultLang} onChange={e => setDefaultLang(e.target.value)} style={selectStyle}>
                        {LANGUAGES.map(l => <option key={l.id} value={l.id} style={{ background: 'var(--bg2)', color: 'var(--text-main)' }}>{l.label}</option>)}
                      </select>
                    </SettingRow>
                    <SettingRow label="Editor Theme" desc="Syntax highlighting scheme" icon={Layout}>
                      <select value={editorTheme} onChange={e => setEditorTheme(e.target.value)} style={selectStyle}>
                        {THEMES.map(t => <option key={t} value={t} style={{ background: 'var(--bg2)', color: 'var(--text-main)' }}>{t}</option>)}
                      </select>
                    </SettingRow>
                    <SettingRow label="Tab Size" desc="Spaces per indentation level" icon={LayoutTemplate}>
                      <select value={tabSize} onChange={e => setTabSize(e.target.value)} style={selectStyle}>
                        <option value="2" style={{ background: 'var(--bg2)', color: 'var(--text-main)' }}>2 Spaces</option>
                        <option value="4" style={{ background: 'var(--bg2)', color: 'var(--text-main)' }}>4 Spaces</option>
                        <option value="8" style={{ background: 'var(--bg2)', color: 'var(--text-main)' }}>8 Spaces</option>
                      </select>
                    </SettingRow>
                    <SettingRow label="Font Size" desc="Editor text scale" icon={Type}>
                      <select value={fontSize} onChange={e => setFontSize(e.target.value)} style={selectStyle}>
                        {[12, 13, 14, 15, 16, 18, 20].map(s => <option key={s} value={s} style={{ background: 'var(--bg2)', color: 'var(--text-main)' }}>{s}px</option>)}
                      </select>
                    </SettingRow>
                    <SettingRow label="Auto Close Brackets" desc="Automatically complete quotes and parentheses" icon={Braces}>
                      <Toggle value={autoCloseBrackets} onChange={setAutoCloseBrackets} />
                    </SettingRow>
                    <SettingRow label="Editor Minimap" desc="Show code overview on the right" icon={Sidebar}>
                      <Toggle value={minimap} onChange={setMinimap} />
                    </SettingRow>
                    <SettingRow label="Vim Keybindings" desc="Enable Vim mode in the editor" icon={Terminal}>
                      <Toggle value={vimMode} onChange={setVimMode} />
                    </SettingRow>
                    <SettingRow label="Sound Effects" desc="Play matchmaking and battle cues" icon={Volume2}>
                      <Toggle value={matchSounds} onChange={setMatchSounds} />
                    </SettingRow>
                  </div>
                </div>
              )}

              {/* --- PRIVACY TAB --- */}
              {activeTab === 'privacy' && (
                <div>
                  <div className="tab-header" style={{ padding: '30px 40px', borderBottom: '1px solid var(--border)', background: 'var(--btn-bg)' }}>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Privacy & Display</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>Control who sees your profile and statistics.</p>
                  </div>
                  <div style={{ padding: '10px 20px', paddingBottom: 60 }}>
                    <SettingRow label="Public Profile" desc="Allow other users to view your CodeArena profile" icon={User}>
                      <Toggle value={profilePublic} onChange={setProfilePublic} />
                    </SettingRow>
                    <SettingRow label="Leaderboard Visibility" desc="Display your ELO and rank on the global leaderboard" icon={Shield}>
                      <Toggle value={showEloOnLeaderboard} onChange={setShowEloOnLeaderboard} />
                    </SettingRow>
                  </div>
                </div>
              )}

              {/* --- SUBSCRIPTION TAB --- */}
              {activeTab === 'subscription' && (
                <div>
                  <div className="tab-header" style={{ padding: '30px 40px', borderBottom: '1px solid var(--border)', background: 'var(--btn-bg)' }}>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Subscription Plan</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>Manage your CodeArena membership and billing.</p>
                  </div>
                  <div style={{ padding: '40px' }}>
                    <div style={{ 
                      background: planColor.bg, border: `1px solid ${planColor.border}`, 
                      borderRadius: 24, padding: 36, position: 'relative', overflow: 'hidden',
                      boxShadow: `0 20px 60px ${planColor.glow}`
                    }}>
                      <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: planColor.glow, filter: 'blur(50px)' }} />
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                          <div style={{ background: 'var(--bg2)', border: `1px solid ${planColor.border}`, width: 80, height: 80, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isPro ? '0 0 30px var(--orange-dim)' : 'none' }}>
                            <span style={{ fontSize: 22, fontWeight: 900, color: planColor.color, fontFamily: 'Outfit' }}>{isPro ? 'PRO' : 'FREE'}</span>
                          </div>
                          <div>
                            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6, fontFamily: 'Outfit' }}>
                              {isPro ? `${currentPlanName} Active ✅` : 'Free Tier'}
                            </div>
                            <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 350 }}>
                              {isPro
                                ? (daysLeft > 0 ? `${daysLeft} days remaining (Expires ${expireStr})` : 'Active premium subscription')
                                : 'Upgrade to unlock MAANG exclusive Vault, Clara AI interviewer & advanced analytics.'}
                            </div>
                          </div>
                        </div>
                        <div>
                          {!isPro ? (
                            <button onClick={() => navigate('/premium')} style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange2))', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter', boxShadow: '0 10px 25px -5px var(--orange-dim)', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
                              Upgrade Now →
                            </button>
                          ) : (
                            <button onClick={() => navigate('/premium')} style={{ background: 'var(--btn-bg)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--border)'} onMouseOut={e => e.currentTarget.style.background = 'var(--btn-bg)'}>Manage Bill</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE LOGOUT BUTTON */}
        <div className="mobile-only" style={{ width: '100%', marginTop: 10, marginBottom: 20 }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: 'var(--red)', fontSize: 15, fontWeight: 700, cursor: 'pointer', padding: '16px', borderRadius: 16, width: '100%', fontFamily: 'Inter' }}>
            <LogOut size={20} /> Log out from all devices
          </button>
        </div>

      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showPwModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={modalOverlayStyle}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} style={modalBgStyle}>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 24, margin: '0 0 24px 0', color: 'var(--text-main)' }}>Security Update</h3>
              {pwStep === 1 ? (
                <>
                  {[{ label: 'Current Password', val: oldPw, set: setOldPw }, { label: 'New Password', val: newPw, set: setNewPw }, { label: 'Confirm New Password', val: confirmPw, set: setConfirmPw }].map(f => (
                    <div key={f.label} style={{ marginBottom: 20 }}>
                      <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 8 }}>{f.label}</label>
                      <input type="password" value={f.val} onChange={e => f.set(e.target.value)} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '14px 16px', borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  {pwMsg && <div style={{ fontSize: 13, color: 'var(--orange)', margin: '0 0 20px 0', textAlign: 'center', fontWeight: 600 }}>{pwMsg}</div>}
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <button onClick={() => { setShowPwModal(false); setPwMsg(''); setPwStep(1); setOldPw(''); setNewPw(''); setConfirmPw('') }} style={{ flex: 1, background: 'var(--btn-bg)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleRequestPw} disabled={pwLoading} style={{ flex: 1, background: 'var(--orange)', border: 'none', color: '#fff', borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 700, cursor: pwLoading ? 'not-allowed' : 'pointer', opacity: pwLoading ? 0.7 : 1 }}>{pwLoading ? 'Processing...' : 'Next Step →'}</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 8 }}>Enter 6-Digit OTP</label>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Check your email for the verification code.</div>
                    <input type="text" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '16px', borderRadius: 12, fontSize: 24, outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box', letterSpacing: 8, textAlign: 'center' }} />
                  </div>
                  {pwMsg && <div style={{ fontSize: 13, color: 'var(--orange)', margin: '0 0 20px 0', textAlign: 'center', fontWeight: 600 }}>{pwMsg}</div>}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setPwStep(1)} style={{ flex: 1, background: 'var(--btn-bg)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                    <button onClick={handleVerifyPw} disabled={pwLoading} style={{ flex: 1, background: 'var(--green)', border: 'none', color: '#fff', borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 700, cursor: pwLoading ? 'not-allowed' : 'pointer', opacity: pwLoading ? 0.7 : 1 }}>Verify & Update</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={modalOverlayStyle}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} style={{ ...modalBgStyle, border: '1px solid rgba(239,68,68,0.3)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(239,68,68,0.1)', color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <AlertTriangle size={24} />
              </div>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 24, margin: '0 0 12px 0', color: 'var(--text-main)' }}>Delete Account</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 24px 0' }}>This action is irreversible. All your data, battles, and subscriptions will be permanently erased. Type <strong style={{ color: 'var(--text-main)' }}>{user?.username}</strong> to confirm.</p>
              <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder={user?.username} style={{ width: '100%', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--text-main)', padding: '14px 16px', borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'Inter', marginBottom: 24, boxSizing: 'border-box' }} />
              {pwMsg && <div style={{ fontSize: 13, color: 'var(--red)', margin: '0 0 20px 0', textAlign: 'center' }}>{pwMsg}</div>}
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); setPwMsg('') }} style={{ flex: 1, background: 'var(--btn-bg)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleDelete} disabled={deleteConfirm !== user?.username} style={{ flex: 1, background: deleteConfirm === user?.username ? 'var(--red)' : 'rgba(239,68,68,0.15)', border: 'none', color: '#fff', borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 700, cursor: deleteConfirm === user?.username ? 'pointer' : 'not-allowed', opacity: deleteConfirm === user?.username ? 1 : 0.6 }}>Delete Permanently</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}