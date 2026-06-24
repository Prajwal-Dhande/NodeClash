import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Zap, Menu, X, Bell, Check, CheckCheck, Trash2, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react'
import API_URL from '../../config/api'

const NOTIF_ICONS = {
  info: { icon: Info, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  warning: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  success: { icon: CheckCircle2, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  error: { icon: XCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
}

function timeAgo(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Notification state
  const [showNotif, setShowNotif] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifLoading, setNotifLoading] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close notification dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch notifications on mount & periodically
  const fetchNotifications = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await fetch(`${API_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      }
    } catch (err) { /* silently fail */ }
  }

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 60000) // Refresh every 60s
    return () => clearInterval(interval)
  }, [])

  const markAsRead = async (id) => {
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n))
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) { }
  }

  const markAllRead = async () => {
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_URL}/api/notifications/read-all`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (err) { }
  }

  const clearAll = async () => {
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_URL}/api/notifications/clear`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(prev => prev.filter(n => !n.read))
    } catch (err) { }
  }

  const handleNotifClick = (notif) => {
    if (!notif.read) markAsRead(notif._id)
    if (notif.link) {
      setShowNotif(false)
      navigate(notif.link)
    }
  }

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 300)
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(href)
      window.scrollTo(0, 0)
    }
  }

  const isLoggedIn = !!localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <span onClick={() => navigate('/')} className="logo">
          <span style={{ color: '#ff6b35', marginRight: '6px' }}>{'{N}'}</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>NodeClash</span>
        </span>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          <span className="nav-link" onClick={() => handleNavClick('/#features')}>Features</span>
          <span className="nav-link" onClick={() => handleNavClick('/lobby?tab=puzzles')}>Puzzles</span>
          <span className="nav-link" onClick={() => handleNavClick('/leaderboard')}>Leaderboard</span>
          <span className="nav-link" onClick={() => handleNavClick('/premium')} style={{ color: '#E54D2E' }}>Pro</span>
        </div>

        <div className="nav-actions desktop-only">
          {isLoggedIn ? (
            <>
              {/* 🔔 Notification Bell */}
              <div ref={notifRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => { setShowNotif(!showNotif); if (!showNotif) fetchNotifications() }}
                  className="notif-bell-btn"
                  style={{
                    background: showNotif ? 'var(--orange-dim)' : 'var(--btn-bg)',
                    border: `1.5px solid ${showNotif ? 'var(--orange)' : 'var(--border)'}`,
                    color: showNotif ? 'var(--orange)' : 'var(--text-main)',
                    cursor: 'pointer', borderRadius: 12,
                    width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', transition: 'all 0.25s ease',
                    boxShadow: showNotif ? '0 0 20px var(--orange-dim)' : '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <Bell size={20} strokeWidth={2.2} />
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute', top: -4, right: -4,
                      minWidth: 20, height: 20, borderRadius: 10, padding: '0 5px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: '#fff', fontSize: 10, fontWeight: 900,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 10px rgba(239,68,68,0.6)',
                      border: '2px solid var(--bg)',
                      animation: 'notifPulse 2s ease-in-out infinite'
                    }}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotif && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                    width: 380, maxHeight: 480,
                    background: 'var(--card-bg)', backdropFilter: 'blur(24px)',
                    border: '1px solid var(--border)', borderRadius: 20,
                    boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
                    overflow: 'hidden', zIndex: 200,
                    animation: 'notifSlideIn 0.25s ease-out'
                  }}>
                    {/* Header */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '18px 20px', borderBottom: '1px solid var(--border)',
                      background: 'var(--btn-bg)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-main)', fontFamily: 'Outfit' }}>Notifications</span>
                        {unreadCount > 0 && (
                          <span style={{
                            background: 'linear-gradient(135deg, #ff6b35, #f7451d)',
                            color: '#fff', fontSize: 10, fontWeight: 800,
                            padding: '2px 8px', borderRadius: 10,
                          }}>
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} title="Mark all read" style={{
                            background: 'transparent', border: 'none', color: 'var(--text-muted)',
                            cursor: 'pointer', padding: 6, borderRadius: 8, transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center'
                          }} onMouseOver={e => e.currentTarget.style.color = '#22c55e'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            <CheckCheck size={16} />
                          </button>
                        )}
                        <button onClick={clearAll} title="Clear read" style={{
                          background: 'transparent', border: 'none', color: 'var(--text-muted)',
                          cursor: 'pointer', padding: 6, borderRadius: 8, transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center'
                        }} onMouseOver={e => e.currentTarget.style.color = '#ef4444'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Notification List */}
                    <div style={{ maxHeight: 360, overflowY: 'auto' }}>
                      {notifications.length === 0 ? (
                        <div style={{
                          padding: '48px 20px', textAlign: 'center',
                          color: 'var(--text-muted)', fontSize: 14
                        }}>
                          <Bell size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                          <div style={{ fontWeight: 600 }}>No notifications yet</div>
                          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>We'll notify you about important updates</div>
                        </div>
                      ) : (
                        notifications.map((notif) => {
                          const meta = NOTIF_ICONS[notif.type] || NOTIF_ICONS.info
                          const Icon = meta.icon
                          return (
                            <div
                              key={notif._id}
                              onClick={() => handleNotifClick(notif)}
                              style={{
                                display: 'flex', gap: 14, padding: '16px 20px',
                                borderBottom: '1px solid var(--border)',
                                cursor: notif.link ? 'pointer' : 'default',
                                background: notif.read ? 'transparent' : 'var(--btn-bg)',
                                transition: 'background 0.2s',
                                position: 'relative'
                              }}
                              onMouseOver={e => e.currentTarget.style.background = 'var(--btn-bg)'}
                              onMouseOut={e => e.currentTarget.style.background = notif.read ? 'transparent' : 'var(--btn-bg)'}
                            >
                              {/* Unread indicator */}
                              {!notif.read && (
                                <div style={{
                                  position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                                  width: 6, height: 6, borderRadius: '50%',
                                  background: 'linear-gradient(135deg, #ff6b35, #f7451d)',
                                  boxShadow: '0 0 8px rgba(255,107,53,0.5)'
                                }} />
                              )}
                              <div style={{
                                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                                background: meta.bg, border: `1px solid ${meta.color}30`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: meta.color
                              }}>
                                <Icon size={18} />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: 13, fontWeight: notif.read ? 600 : 700,
                                  color: 'var(--text-main)', marginBottom: 4,
                                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>
                                  {notif.title}
                                </div>
                                <div style={{
                                  fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5,
                                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}>
                                  {notif.message}
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, opacity: 0.7 }}>
                                  {timeAgo(notif.createdAt)}
                                </div>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              <span onClick={() => navigate('/profile')} className="profile-btn" title="View Profile" style={user?.avatar ? { padding: 0, overflow: 'hidden' } : {}}>
                {user?.avatar ? <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (user?.username || 'P').slice(0, 2).toUpperCase()}
              </span>
              <button onClick={() => { navigate('/lobby'); window.scrollTo(0, 0); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={16} /> Enter Arena</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/auth')} className="btn-secondary">Log In</button>
              <button onClick={() => { navigate('/lobby'); window.scrollTo(0, 0); }} className="btn-primary">Enter Arena</button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="mobile-only menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="nav-link" onClick={() => handleNavClick('/#features')}>Features</span>
            <span className="nav-link" onClick={() => handleNavClick('/lobby?tab=puzzles')}>Puzzles</span>
            <span className="nav-link" onClick={() => handleNavClick('/leaderboard')}>Leaderboard</span>
            <span className="nav-link" onClick={() => handleNavClick('/premium')} style={{ color: '#E54D2E' }}>Pro</span>
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {isLoggedIn ? (
              <button onClick={() => { navigate('/lobby'); window.scrollTo(0, 0); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Zap size={16} /> Enter Arena</button>
            ) : (
              <>
                <button onClick={() => navigate('/auth')} className="btn-secondary" style={{ width: '100%' }}>Log In</button>
                <button onClick={() => { navigate('/lobby'); window.scrollTo(0, 0); }} className="btn-primary">Enter Arena</button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed; top: 0; width: 100%; z-index: 100;
          background: rgba(6, 6, 8, 0.3); 
          backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          display: flex; justify-content: space-between; align-items: center;
          padding: 0 32px; height: 60px; transition: all 0.3s;
          font-family: Inter, sans-serif;
        }
        .navbar.scrolled { 
          background: rgba(6, 6, 8, 0.65); 
          border-bottom: 1px solid rgba(255,107,53,0.15);
          box-shadow: 0 4px 30px rgba(0,0,0,0.5);
        }
        .logo { font-family: Outfit, sans-serif; font-weight: 900; font-size: 20px; letter-spacing: -0.5px; cursor: pointer; }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-actions { display: flex; gap: 10px; align-items: center; }
        
        .nav-link { 
          color: var(--text-dim); 
          font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
          padding: 6px 14px; border-radius: 20px;
        }
        .nav-link:hover { 
          color: var(--text-main); 
          background: var(--glass-overlay);
          box-shadow: inset 0 0 0 1px var(--glass-border);
        }
        
        .btn-primary { font-family: Inter; font-size: 13px; font-weight: 700; color: #fff; background: linear-gradient(135deg, var(--orange), var(--orange2)); border: none; padding: 8px 20px; border-radius: 8px; cursor: pointer; transition: all 0.2s; box-shadow: 0 5px 15px rgba(255,107,53,0.2); }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(255,107,53,0.3); }
        
        .btn-secondary { font-family: Inter; font-size: 13px; font-weight: 600; color: var(--text); background: transparent; border: 1px solid var(--border2); padding: 8px 18px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--orange); color: var(--orange); background: var(--orange-dim); }
        
        .profile-btn { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--orange), var(--orange2)); display: flex; align-items: center; justify-content: center; font-family: Outfit, sans-serif; font-weight: 800; font-size: 13px; color: #fff; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; }
        .profile-btn:hover { border-color: var(--orange); }
        
        .notif-bell-btn:hover { 
          border-color: var(--orange) !important; 
          color: var(--orange) !important; 
          background: var(--orange-dim) !important;
          box-shadow: 0 0 20px var(--orange-dim) !important;
          transform: translateY(-1px);
        }

        .mobile-only { display: none; }
        .menu-icon { color: var(--text-main); font-size: 24px; cursor: pointer; }
        .mobile-menu { position: fixed; top: 60px; left: 0; width: 100%; background: var(--bg); padding: 20px; display: flex; flex-direction: column; gap: 15px; border-bottom: 1px solid var(--border); z-index: 99; }
        
        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }

        @keyframes notifPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes notifSlideIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}