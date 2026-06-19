import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ── typing animation lines for Player 1 ── */
const codeLines = [
  '# Pair Sum Exists',
  'import sys',
  '',
  'lines = sys.stdin.read().split("\\n")',
  'n = int(lines[0])',
  'nums = list(map(int, lines[1].split()))',
  'target = int(lines[2])',
  'seen = set()',
  'for x in nums:',
  '    if target - x in seen:',
  '        print("true")',
  '        sys.exit()',
  '    seen.add(x)',
  'print("false")',
];

export default function Hero() {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [battleState, setBattleState] = useState('coding'); // coding, running, passed, submitting, victory

  useEffect(() => {
    if (battleState === 'running') {
      const t = setTimeout(() => setBattleState('passed'), 1200);
      return () => clearTimeout(t);
    }
    if (battleState === 'submitting') {
      const t = setTimeout(() => setBattleState('victory'), 1200);
      return () => clearTimeout(t);
    }
  }, [battleState]);

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const currentLine = codeLines[visibleLines];
      if (charIdx < currentLine.length) {
        const t = setTimeout(() => setCharIdx((c) => c + 1), 22);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => { setVisibleLines((v) => v + 1); setCharIdx(0); }, 90);
        return () => clearTimeout(t);
      }
    }
  }, [visibleLines, charIdx]);

  // 3D Hover Effect setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use spring for smooth returning and following
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [12, -12]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-12, 12]), { damping: 30, stiffness: 200 });

  function handlePointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      background: 'transparent', display: 'flex', alignItems: 'center',
      paddingTop: '80px', paddingBottom: '80px',
      fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: 1400,
        margin: '0 auto', padding: '0 40px',
        display: 'flex', alignItems: 'center', gap: 60,
        flexDirection: 'row',
      }} className="hero-container">

        {/* ─── LEFT COLUMN: HERO TEXT ─── */}
        <div style={{ flex: 1, minWidth: 320, maxWidth: 540 }} className="hero-text">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight: 800,
              color: '#FAFAFA',
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
              marginBottom: 24,
            }}>
            The arena for{' '}
            <span style={{ color: '#E54D2E' }}>coding battles</span>
            {' '}+ real skill.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: '#71717A',
              marginBottom: 40,
              letterSpacing: '0.5px',
            }}>
            [Code, Compete, Conquer]
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <motion.button
              onClick={() => navigate('/lobby')}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(229, 77, 46, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', background: 'linear-gradient(135deg, #FF6B35, #E54D2E)', color: '#fff',
                border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                fontFamily: 'Inter, sans-serif', cursor: 'pointer',
              }}
            >
              View Arena <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={() => navigate('/daily-quest')}
              whileHover={{ scale: 1.05, borderColor: '#FAFAFA', color: '#FAFAFA', backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', background: 'transparent', color: '#A1A1AA',
                border: '1px solid #3F3F46', borderRadius: 12, fontSize: 15,
                fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Daily Quests <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* ─── RIGHT COLUMN: FLOATING IDE MOCKUP ─── */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ flex: 1.4, width: '100%', perspective: '1500px' }} 
          className="hero-mockup"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              width: '100%',
              background: '#111113', border: '1px solid #27272A',
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Browser Chrome */}
            <div style={{
              display: 'flex', alignItems: 'center', padding: '12px 16px',
              background: '#18181B', borderBottom: '1px solid #27272A',
            }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22C55E' }} />
              </div>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#71717A' }}>
                  https://nodeclash.in/battle
                </span>
              </div>
            </div>

            {/* Battle Header Bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 20px', borderBottom: '1px solid #27272A', background: '#0A0A0A',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: '#A1A1AA', fontWeight: 600 }}>← Exit</span>
                {battleState === 'victory' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      style={{
                        fontSize: 11, fontWeight: 700, color: '#22C55E',
                        padding: '3px 10px', borderRadius: 6,
                        background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
                      }}
                    >✓ VICTORY!</motion.span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => { setBattleState('coding'); setVisibleLines(0); setCharIdx(0); }}
                      style={{
                        fontSize: 11, color: '#A1A1AA', background: 'transparent', 
                        border: '1px solid #3F3F46', borderRadius: 6, padding: '3px 8px',
                        cursor: 'pointer'
                      }}
                    >↻ Replay</motion.button>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: '#EF4444' }}>
                    {battleState === 'coding' ? '0/47' : battleState === 'running' ? '12/47' : '24/47'}
                  </span>
                  <div style={{ fontSize: 9, color: '#52525B', fontWeight: 600, marginTop: 2 }}>Opponent Best</div>
                </div>
                <span style={{ fontSize: 11, color: '#3F3F46', fontWeight: 700 }}>vs</span>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: '#22C55E' }}>
                    {(battleState === 'coding' || battleState === 'running') ? '12/47' : '47/47'}
                  </span>
                  <div style={{ fontSize: 9, color: '#52525B', fontWeight: 600, marginTop: 2 }}>Your Best</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: '#FAFAFA' }}>11:25</span>
                  <div style={{ fontSize: 9, color: '#52525B', fontWeight: 600, marginTop: 2 }}>Time left</div>
                </div>
              </div>
            </div>

            {/* Player Info Row */}
            <div style={{
              display: 'flex', borderBottom: '1px solid #27272A', background: '#0A0A0A',
            }}>
              {/* Opponent */}
              <div style={{ flex: 1, padding: '12px 20px', borderRight: '1px solid #27272A' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#A1A1AA' }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#FAFAFA' }}>King21</span>
                    </div>
                    <span style={{ fontSize: 10, color: '#52525B', fontFamily: "'JetBrains Mono', monospace" }}>Silver • 1,386 ranked Elo</span>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: '#E54D2E',
                    padding: '3px 10px', borderRadius: 20,
                    background: 'rgba(229,77,46,0.12)', border: '1px solid rgba(229,77,46,0.3)',
                  }}>● Coding...</span>
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#52525B', marginBottom: 4 }}>
                    <span>Progress</span>
                    <span>{battleState === 'coding' ? '0%' : battleState === 'running' ? '25%' : '50%'}</span>
                  </div>
                  <div style={{ width: '100%', height: 4, background: '#1C1C1E', borderRadius: 2 }}>
                    <motion.div 
                      animate={{ width: battleState === 'coding' ? '0%' : battleState === 'running' ? '25%' : '50%' }}
                      style={{ height: '100%', background: '#E54D2E', borderRadius: 2 }} 
                    />
                  </div>
                </div>
              </div>
              {/* You */}
              <div style={{ flex: 1, padding: '12px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#FAFAFA' }}>Player123 (You)</span>
                    </div>
                    <span style={{ fontSize: 10, color: '#52525B', fontFamily: "'JetBrains Mono', monospace" }}>Silver • 1242 ranked Elo</span>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: '#22C55E',
                    padding: '3px 10px', borderRadius: 20,
                    background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
                  }}>● Active</span>
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#52525B', marginBottom: 4 }}>
                    <span>Progress</span>
                    <span>{(battleState === 'coding' || battleState === 'running') ? '25%' : '100%'}</span>
                  </div>
                  <div style={{ width: '100%', height: 4, background: '#1C1C1E', borderRadius: 2 }}>
                    <motion.div 
                      animate={{ width: (battleState === 'coding' || battleState === 'running') ? '25%' : '100%' }}
                      style={{ height: '100%', background: '#22C55E', borderRadius: 2 }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* IDE Split: Problem Tabs + Code Editor */}
            <div style={{ display: 'flex', height: 260, background: '#0A0A0A' }}>
              {/* Left: Problem Description */}
              <div style={{ width: '38%', borderRight: '1px solid #27272A', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  display: 'flex', gap: 0, borderBottom: '1px solid #27272A', background: '#111113',
                }}>
                  {['Description', 'Submissions'].map((tab, i) => (
                    <span key={tab} style={{
                      padding: '10px 16px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                      color: i === 0 ? '#FAFAFA' : '#52525B',
                      borderBottom: i === 0 ? '2px solid #E54D2E' : '2px solid transparent',
                      background: i === 0 ? 'rgba(229,77,46,0.05)' : 'transparent',
                    }}>{tab}</span>
                  ))}
                </div>
                <div style={{ padding: 16, flex: 1, overflow: 'auto', fontSize: 12, color: '#A1A1AA', lineHeight: 1.7 }}>
                  <p style={{ color: '#52525B', marginBottom: 12 }}>separated by spaces (1 &lt;= n &lt;= 10^5).</p>
                  <p style={{ marginBottom: 16 }}>The second line contains the integer <code style={{ color: '#FAFAFA', fontFamily: "'JetBrains Mono', monospace", background: '#1C1C1E', padding: '2px 6px', borderRadius: 4 }}>target</code>.</p>
                  <h4 style={{ color: '#E54D2E', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>▸ Output</h4>
                  <p>Print <code style={{ color: '#FAFAFA', fontFamily: "'JetBrains Mono', monospace", background: '#1C1C1E', padding: '2px 6px', borderRadius: 4 }}>true</code> if two distinct elements sum to the target.</p>
                </div>
              </div>
              {/* Right: Code Editor */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Editor toolbar */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 16px', borderBottom: '1px solid #27272A', background: '#111113',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#A1A1AA', fontWeight: 600 }}>{'</>'} Code</span>
                    <span style={{
                      fontSize: 10, color: '#52525B', padding: '2px 8px',
                      border: '1px solid #27272A', borderRadius: 4,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>Python3 ▾</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => { if(battleState === 'coding') setBattleState('running') }}
                      style={{
                        fontSize: 11, color: '#A1A1AA', padding: '4px 12px',
                        border: '1px solid #27272A', borderRadius: 6, cursor: 'pointer',
                        background: 'transparent'
                      }}>
                      ▷ Run
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(229,77,46,0.3)' }} 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { if(battleState === 'passed') setBattleState('submitting') }}
                      style={{
                        fontSize: 11, color: '#fff', padding: '4px 12px', border: 'none',
                        background: battleState === 'coding' ? '#3F3F46' : '#E54D2E', 
                        borderRadius: 6, fontWeight: 600, 
                        cursor: battleState === 'coding' ? 'not-allowed' : 'pointer',
                        transition: 'background 0.3s'
                      }}>
                      ✓ Submit
                    </motion.button>
                  </div>
                </div>
                {/* Code content */}
                <div style={{
                  flex: 1, padding: '12px 0', overflow: 'auto',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: '22px',
                }}>
                  {codeLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} style={{ display: 'flex', paddingLeft: 16, paddingRight: 16 }}>
                      <span style={{ width: 28, color: '#3F3F46', userSelect: 'none', textAlign: 'right', marginRight: 16, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ color: line.startsWith('#') ? '#22C55E' : line.startsWith('import') ? '#E54D2E' : '#D4D4D8', whiteSpace: 'pre' }}>{line}</span>
                    </div>
                  ))}
                  {visibleLines < codeLines.length && (
                    <div style={{ display: 'flex', paddingLeft: 16, paddingRight: 16 }}>
                      <span style={{ width: 28, color: '#3F3F46', userSelect: 'none', textAlign: 'right', marginRight: 16, flexShrink: 0 }}>{visibleLines + 1}</span>
                      <span style={{ color: codeLines[visibleLines].startsWith('#') ? '#22C55E' : '#D4D4D8', whiteSpace: 'pre' }}>
                        {codeLines[visibleLines].slice(0, charIdx)}
                        <span style={{ animation: 'blink 1s step-end infinite', color: '#E54D2E' }}>▋</span>
                      </span>
                    </div>
                  )}
                </div>
                {/* Bottom status */}
                <div style={{
                  padding: '8px 16px', borderTop: '1px solid #27272A', background: '#111113',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ 
                      color: battleState === 'coding' ? '#52525B' : (battleState === 'running' || battleState === 'submitting') ? '#F59E0B' : '#22C55E', 
                      fontSize: 11 
                    }}>⊙</span>
                    <span style={{ fontSize: 11, fontWeight: 600 }}>
                      <span style={{ color: '#A1A1AA' }}>Test Result</span>{' '}
                      
                      {battleState === 'coding' ? (
                        <span style={{ color: '#52525B', marginLeft: 4 }}>Awaiting execution...</span>
                      ) : (battleState === 'running' || battleState === 'submitting') ? (
                        <span style={{ color: '#F59E0B', marginLeft: 4 }}>Evaluating...</span>
                      ) : (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
                          color: '#22C55E', padding: '2px 8px', borderRadius: 4,
                          background: 'rgba(34,197,94,0.1)', marginLeft: 4
                        }}>15/15 Passed (100%)</motion.span>
                      )}

                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: '#52525B', fontFamily: "'JetBrains Mono', monospace" }}>Spaces: 4</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (max-width: 992px) {
          .hero-container { flex-direction: column !important; text-align: center; gap: 40px !important; }
          .hero-text { align-items: center; display: flex; flex-direction: column; }
          .hero-text h1 { font-size: 2.8rem !important; }
          .hero-mockup { width: 100%; }
        }
      `}</style>
    </section>
  );
}