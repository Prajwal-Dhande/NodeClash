import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Trophy, Bot, CheckCircle2 } from 'lucide-react'

const TESTIMONIALS = [
  { name: 'Arjun K.', role: 'System Engineer @ TCS', stars: 5, color: '#ff6b35', text: 'The free tier gave me a solid foundation, but the PRO The Elite Archive is what actually got me my TCS Digital offer. The curated problems are scarily accurate.' },
  { name: 'Priya S.', role: 'Project Engineer @ Wipro', stars: 5, color: '#60a5fa', text: 'I practiced on the free tier for months. Once I upgraded to PRO, Clara AI literally changed how I think about interviews. Absolute game-changer.' },
  { name: 'Rahul M.', role: 'Specialist Programmer @ Infosys', stars: 5, color: '#a855f7', text: 'Free tier is honestly better than most paid platforms. But the PRO analytics showed me my weak spots I never knew existed. Cracked Power Programmer role.' },
  { name: 'Sneha D.', role: 'Intern @ Cognizant', stars: 5, color: '#22c55e', text: 'Started with free random matches — loved it. PRO Vault problems were literally the same patterns asked in my GenC Next interview. Worth every rupee.' },
  { name: 'Karthik R.', role: 'Software Eng @ Tech Mahindra', stars: 5, color: '#f59e0b', text: 'The free practice bot is unreal for daily warmups. But PRO tier with Clara AI mock interviews? That’s the closest thing to a real technical round I’ve seen.' },
  { name: 'Ananya P.', role: 'Analyst @ Capgemini', stars: 5, color: '#ec4899', text: 'I used the free tier all semester for competitive coding. Upgrading to PRO during placement season was the best decision — the The Elite Archive is top-notch.' },
  { name: 'Vikram T.', role: 'ASE @ Accenture', stars: 5, color: '#14b8a6', text: 'Free tier random matches kept me sharp daily. The PRO code review feature caught edge cases I always missed. Cracked Accenture Advanced role too.' },
  { name: 'Meera J.', role: 'CS Student, NIT', stars: 5, color: '#8b5cf6', text: 'Honestly the free leaderboard competition alone is addictive. But PRO unlocked a whole new level — Clara’s AI hints taught me patterns I never learned in class.' },
  { name: 'Aditya N.', role: 'Software Analyst @ HCLTech', stars: 5, color: '#ef4444', text: 'The free tier is genuinely generous. I only went PRO because friends said the The Elite Archive problems are exact matches from real interviews. They were right.' },
  { name: 'Ishita G.', role: 'Incoming ASE @ TCS', stars: 5, color: '#06b6d4', text: 'Practiced 200+ free problems before placements. The PRO tier analytics dashboard showed me exactly what to focus on. Got TCS Prime on my first attempt.' },
  { name: 'Rohan B.', role: 'Backend Dev @ LTIMindtree', stars: 5, color: '#f97316', text: 'Free tier private rooms are perfect for practicing with friends. PRO took it further — the AI code review after every match is like having a personal mentor.' },
  { name: 'Divya L.', role: 'CS Senior, VIT', stars: 5, color: '#84cc16', text: 'I was skeptical about PRO, but the 7-day free trial convinced me instantly. The The Elite Archive problems are exactly what you’d face in a real placement drive.' },
  { name: 'Saurabh W.', role: 'SDE @ Persistent Systems', stars: 5, color: '#eab308', text: 'Used free tier for 6 months before going PRO. The ranked tournaments alone are worth it — but Clara AI interviews are what truly prepared me for my technical round.' },
  { name: 'Nisha K.', role: 'Engineer @ Mindtree', stars: 5, color: '#d946ef', text: 'The free tier practice bot is surprisingly good for daily grinding. PRO is for when you’re serious about placements — the analytics are incredibly detailed.' },
]

const codeLines = [
  { text: '// AI Constraint: O(n) time only', color: 'var(--text-muted)' },
  { text: 'function twoSum(nums, target) {', color: 'var(--text-main)' },
  { text: '  const map = new Map();', color: 'var(--text-dim)' },
  { text: '  for (let i = 0; i < nums.length; i++) {', color: 'var(--text-dim)' },
  { text: '    const diff = target - nums[i];', color: 'var(--text-main)' },
  { text: '    if (map.has(diff))', color: 'var(--text-main)' },
  { text: '      return [map.get(diff), i];', color: '#ff6b35' },
  { text: '    map.set(nums[i], i);', color: 'var(--text-dim)' },
  { text: '  }', color: 'var(--text-dim)' },
  { text: '}', color: 'var(--text-main)' },
]

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }) // 3D Tilt State
  const navigate = useNavigate()

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const currentLine = codeLines[visibleLines].text
      if (charIdx < currentLine.length) {
        const t = setTimeout(() => setCharIdx(c => c + 1), 30)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setVisibleLines(v => v + 1)
          setCharIdx(0)
        }, 80)
        return () => clearTimeout(t)
      }
    }
  }, [visibleLines, charIdx])

  // 3D Mouse Tracking Logic
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    // Calculate rotation between -10 and 10 degrees
    const xPos = ((clientX / innerWidth) - 0.5) * 20 
    const yPos = ((clientY / innerHeight) - 0.5) * -20
    setMousePos({ x: xPos, y: yPos })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 }) // Reset on leave
  }

  return (
    <section 
      className="hero-section" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-pattern" />
      <div className="glow-circle-left" />
      <div className="glow-circle-right" />

      <div className="hero-container">
        {/* LEFT */}
        <div className="hero-text-content">
          <div className="badge">
            <div className="pulse-dot" /> LIVE BATTLE PLATFORM
          </div>

          <h1 className="hero-title">
            Real-Time 1v1<br />
            <span className="gradient-text">Coding Platform</span>
          </h1>

          <p className="hero-desc">
            1v1 real-time DSA battles. An AI Interviewer watches your every move and injects new constraints mid-battle.
            <strong> No prep mode. Pure instinct.</strong>
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate('/lobby')} className="btn-start" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} /> Start Battle</button>
            <button onClick={() => navigate('/leaderboard')} className="btn-leaderboard" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Trophy size={18} /> Leaderboard</button>
          </div>

          <div className="trust-badges">
            <span className="trust-item"><span className="text-glow">2.4K+</span> Battles Today</span>
            <span className="dot">•</span>
            <span className="trust-item"><span style={{ color: '#22c55e' }}>98ms</span> Avg Latency</span>
            <span className="dot">•</span>
            <span className="trust-item"><span>500+</span> Problems</span>
          </div>
        </div>

        {/* RIGHT — 3D Terminal */}
        <div 
          className="terminal-wrapper"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
            transition: 'transform 0.1s ease-out' // Smooth tracking
          }}
        >
          {/* Floating AI Alert */}
          <div 
            className="ai-alert"
            style={{ transform: 'translateZ(50px)' }} // Pops out in 3D
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bot size={14} /> AI CONSTRAINT INJECTED</span>
          </div>

          <div className="terminal-window">
            <div className="terminal-header">
              {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
              <span className="terminal-path">~/battle-room/problem_42.js</span>
              <span className="terminal-live">● LIVE</span>
            </div>

            <div className="terminal-tabs">
              <div className="tab active">YOU</div>
              <div className="tab inactive">OPPONENT</div>
              <div className="timer" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={14} /> 01:42</div>
            </div>

            <div className="terminal-body">
              {codeLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{ color: line.color }}>{line.text}</div>
              ))}
              {visibleLines < codeLines.length && (
                <div style={{ color: codeLines[visibleLines].color }}>
                  {codeLines[visibleLines].text.slice(0, charIdx)}
                  <span className="cursor-blink">█</span>
                </div>
              )}
            </div>

            <div className="terminal-footer">
              <div style={{ marginBottom: 8 }}>
                <div className="progress-header">
                  <span style={{ color: '#22c55e' }}>YOU — 5/5 tests</span>
                  <span style={{ color: '#22c55e' }}>100%</span>
                </div>
                <div className="progress-bg"><div style={{ width: '100%', background: '#22c55e' }} className="progress-bar" /></div>
              </div>
              <div>
                <div className="progress-header">
                  <span style={{ color: '#ef4444' }}>OPPONENT — 3/5 tests</span>
                  <span style={{ color: '#ef4444' }}>60%</span>
                </div>
                <div className="progress-bg"><div style={{ width: '60%', background: '#ef4444' }} className="progress-bar" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS MARQUEE */}
      <div className="testimonials-section">
        <div className="testimonials-header">
          <span className="testimonials-badge">💬 REAL STORIES</span>
          <h2 className="testimonials-title">What coders are saying</h2>
        </div>
        <div className="marquee-wrapper">
          <div className="marquee-track track-left">
            {[...TESTIMONIALS.slice(0, 7), ...TESTIMONIALS.slice(0, 7)].map((t, i) => (
              <div key={`r1-${i}`} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.color }}>{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {t.name}
                      <CheckCircle2 size={13} color="#3b82f6" fill="rgba(59, 130, 246, 0.2)" />
                    </div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="marquee-track track-right">
            {[...TESTIMONIALS.slice(7), ...TESTIMONIALS.slice(7)].map((t, i) => (
              <div key={`r2-${i}`} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.color }}>{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {t.name}
                      <CheckCircle2 size={13} color="#3b82f6" fill="rgba(59, 130, 246, 0.2)" />
                    </div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-section { min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 8rem 2.5rem 2rem; background: var(--bg); position: relative; overflow: hidden; font-family: Inter, sans-serif; perspective: 1200px; }
        
        /* NEW 3D GRID BACKGROUND */
        .bg-pattern { 
          position: absolute; 
          bottom: 0; 
          left: -50%; 
          width: 200vw; 
          height: 150vh; 
          pointer-events: none; 
          background-image: 
            linear-gradient(rgba(255, 107, 53, 0.25) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.25) 2px, transparent 2px); 
          background-size: 80px 80px; 
          transform-origin: bottom center; 
          transform: perspective(800px) rotateX(75deg); 
          animation: cyberGridMove 4s linear infinite; 
          z-index: 0; 
          mask-image: linear-gradient(to bottom, transparent 20%, black 80%); 
          -webkit-mask-image: linear-gradient(to bottom, transparent 20%, black 80%); 
        }

        @keyframes cyberGridMove { 
          0% { background-position: center 0; } 
          100% { background-position: center 80px; } 
        }

        .glow-circle-left { position: absolute; top: 30%; left: 5%; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 65%); pointer-events: none; }
        .glow-circle-right { position: absolute; bottom: 10%; right: 10%; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(247,69,29,0.05) 0%, transparent 65%); pointer-events: none; }
        .hero-container { max-width: 1250px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 4rem; align-items: center; position: relative; z-index: 1; transform-style: preserve-3d; }
        
        .badge { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; color: var(--text-main); border: 1px solid var(--glass-border); background: var(--glass-overlay); padding: 6px 14px; border-radius: 30px; margin-bottom: 24px; letter-spacing: 0.5px; backdrop-filter: blur(8px); }
        .pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); animation: pulse 1.5s infinite; box-shadow: 0 0 10px var(--orange); }
        .hero-title { font-family: Outfit, sans-serif; font-weight: 900; font-size: clamp(3rem, 5vw, 4.5rem); line-height: 1.05; margin-bottom: 20px; color: var(--text-main); letter-spacing: -2px; }
        .gradient-text { background: linear-gradient(135deg, var(--orange), #fcd34d); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-desc { color: var(--text-dim); font-size: 1.05rem; line-height: 1.8; margin-bottom: 36px; max-width: 440px; }
        .hero-desc strong { color: var(--text-main); font-weight: 600; }
        
        .hero-buttons { display: flex; gap: 14px; margin-bottom: 24px; }
        .btn-start { font-family: Inter; font-weight: 700; font-size: 14px; color: #111; background: linear-gradient(135deg, var(--orange), #fcd34d); border: none; padding: 12px 28px; border-radius: 30px; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 14px 0 rgba(255, 107, 53, 0.39), inset 0 -2px 0 rgba(0,0,0,0.1); }
        .btn-start:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,107,53,0.5), inset 0 -2px 0 rgba(0,0,0,0.1); filter: brightness(1.1); }
        .btn-leaderboard { font-family: Inter; font-weight: 600; font-size: 14px; color: var(--text-main); background: transparent; border: 1px solid var(--border); padding: 12px 24px; border-radius: 30px; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-leaderboard:hover { background: var(--bg3); border-color: var(--text-dim); }
        
        .trust-badges { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--text-dim); font-weight: 500; font-family: Inter, sans-serif; }
        .trust-badges .dot { opacity: 0.3; }
        .trust-badges strong { color: var(--text-main); font-weight: 700; }
        .trust-item { display: flex; gap: 4px; align-items: center; }
        
        .terminal-wrapper { position: relative; width: 100%; transform-style: preserve-3d; will-change: transform; filter: drop-shadow(0 25px 50px rgba(0,0,0,0.5)); }
        .ai-alert { position: absolute; top: -14px; right: 16px; z-index: 2; background: rgba(239, 68, 68, 0.9); backdrop-filter: blur(8px); color: #fff; font-family: Inter; font-weight: 700; font-size: 11px; padding: 6px 12px; border-radius: 20px; letter-spacing: 0.5px; box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3); border: 1px solid rgba(255,255,255,0.2); }
        .terminal-window { background: var(--nav-bg); backdrop-filter: blur(24px); border: 1px solid var(--glass-border); border-radius: 12px; overflow: hidden; box-shadow: inset 0 1px 0 var(--glass-border); }
        .terminal-header { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border-bottom: 1px solid var(--border); background: var(--bg3); }
        .terminal-path { font-family: JetBrains Mono, monospace; font-size: 11px; color: var(--text-hint); margin-left: 8px; flex: 1; }
        .terminal-live { font-family: Inter; font-size: 11px; color: var(--green); font-weight: 600; }
        .terminal-tabs { display: flex; border-bottom: 1px solid var(--border); }
        .tab { font-family: Inter; font-size: 12px; font-weight: 600; padding: 8px 16px; }
        .tab.active { color: var(--orange); border-bottom: 2px solid var(--orange); background: var(--orange-dim); }
        .tab.inactive { color: var(--text-hint); }
        .timer { margin-left: auto; padding: 8px 16px; font-family: Outfit, sans-serif; font-weight: 700; font-size: 14px; color: #fb923c; }
        .terminal-body { padding: 16px 20px; min-height: 220px; font-family: JetBrains Mono, monospace; font-size: 13px; line-height: 1.8; background: var(--bg); overflow-x: auto; }
        .cursor-blink { animation: blink 0.8s infinite; color: var(--orange); }
        .terminal-footer { padding: 12px 16px; border-top: 1px solid var(--border); background: var(--bg3); }
        .progress-header { display: flex; justify-content: space-between; margin-bottom: 4px; font-family: Inter; font-size: 11px; font-weight: 600; }
        .progress-bg { background: var(--border2); height: 4px; border-radius: 2px; }
        .progress-bar { height: 100%; border-radius: 2px; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* ── TESTIMONIALS MARQUEE ── */
        .testimonials-section {
          position: relative; z-index: 1; width: 100%; margin-top: 80px; padding-bottom: 20px;
        }
        .testimonials-header { text-align: center; margin-bottom: 32px; }
        .testimonials-badge {
          display: inline-block; font-size: 11px; font-weight: 700; color: #fbbf24;
          background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.25);
          padding: 5px 14px; border-radius: 20px; letter-spacing: 1.5px; margin-bottom: 12px;
        }
        .testimonials-title {
          font-family: Outfit, sans-serif; font-size: 28px; font-weight: 800; color: var(--text-main);
          letter-spacing: -1px;
        }
        .marquee-wrapper {
          overflow: hidden; width: 100%; position: relative; padding: 20px 0;
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          display: flex; flex-direction: column; gap: 32px;
          perspective: 1000px;
        }
        .marquee-track {
          display: flex; gap: 32px; width: max-content;
          will-change: transform;
        }
        .track-left {
          animation: scroll-left 50s linear infinite;
        }
        .track-right {
          animation: scroll-right 50s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(calc(-50% - 16px), 0, 0); }
        }
        @keyframes scroll-right {
          0% { transform: translate3d(calc(-50% - 16px), 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .testimonial-card {
          flex-shrink: 0; width: 340px;
          background: var(--card-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border); border-radius: 16px;
          padding: 28px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        .testimonial-card:hover { border-color: rgba(255,107,53,0.4); transform: translateY(-4px); box-shadow: 0 15px 40px rgba(255,107,53,0.15); }
        .testimonial-stars { color: #fbbf24; font-size: 15px; margin-bottom: 14px; letter-spacing: 2px; }
        .testimonial-text { font-size: 14px; color: var(--text-dim); line-height: 1.7; margin: 0 0 20px 0; }
        .testimonial-author { display: flex; align-items: center; gap: 10px; }
        .testimonial-avatar {
          width: 32px; height: 32px; border-radius: 50%; display: flex;
          align-items: center; justify-content: center; font-size: 13px;
          font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .testimonial-name { font-size: 13px; font-weight: 700; color: var(--text-main); }
        .testimonial-role { font-size: 11px; color: var(--text-dim); }

        @media (max-width: 900px) {
          .hero-container { grid-template-columns: 1fr; gap: 3rem; }
          .hero-section { padding: 6rem 1.5rem 3rem; }
          .hero-buttons { flex-direction: column; }
          .stats-box { flex-direction: column; }
          .border-right { border-right: none; border-bottom: 1px solid var(--border); }
          .terminal-wrapper { transform: none !important; }
          .testimonial-card { width: 280px; }
        }
      `}</style>
    </section>
  )
}