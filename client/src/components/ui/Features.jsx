import { motion } from 'framer-motion';
import { Zap, Bot, Shield, ArrowRight, Terminal } from 'lucide-react';

/* ── Reusable IDE Mockup Card ── */
function IDEMockup({ title, children, url }) {
  return (
    <div style={{
      background: '#111113', border: '1px solid #27272A', borderRadius: 14,
      overflow: 'hidden', width: '100%',
    }}>
      {/* Browser Chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '10px 14px',
        background: '#18181B', borderBottom: '1px solid #27272A',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#52525B' }}>
            {url || 'https://nodeclash.in/battle'}
          </span>
        </div>
      </div>
      <div style={{ padding: 16, background: '#0A0A0A', minHeight: 200 }}>
        {children}
      </div>
    </div>
  );
}

/* ── Feature Section Layout ── */
function FeatureRow({ tag, title, desc, bullets, linkText, linkHref, badges, mockup, reverse }) {
  return (
    <div className={`feature-row ${reverse ? 'reverse' : ''}`} style={{
      display: 'flex', flexDirection: reverse ? 'row-reverse' : 'row',
      gap: 64, alignItems: 'center', padding: '100px 0',
      borderTop: '1px solid #1A1A1C', overflow: 'hidden'
    }}>
      {/* Text Side */}
      <motion.div 
        className="feature-text"
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ flex: 1, minWidth: 0 }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          color: '#52525B', letterSpacing: '3px', textTransform: 'uppercase',
          display: 'block', marginBottom: 20,
        }}>{tag}</span>

        <h2 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 800, color: '#FAFAFA', lineHeight: 1.1,
          letterSpacing: '-2px', marginBottom: 20,
        }}>{title}</h2>

        <p style={{
          fontSize: 15, color: '#71717A', lineHeight: 1.8,
          maxWidth: 420, marginBottom: 28,
        }}>{desc}</p>

        {/* Badges */}
        {badges && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
            {badges.map((b, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 600, color: b.color || '#22C55E',
                padding: '6px 14px', borderRadius: 8,
                background: b.bg || 'rgba(34,197,94,0.08)',
                border: `1px solid ${b.border || 'rgba(34,197,94,0.25)'}`,
              }}>{b.text}</span>
            ))}
          </div>
        )}

        {/* Bullets */}
        {bullets && (
          <div style={{ display: 'flex', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
            {bullets.map((b, i) => (
              <span key={i} style={{
                fontSize: 13, color: '#71717A', fontWeight: 500,
                borderBottom: '1px solid #27272A', paddingBottom: 4,
              }}>{b}</span>
            ))}
          </div>
        )}

        {/* Link */}
        {linkText && (
          <a
            onClick={(e) => { e.preventDefault(); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 14, fontWeight: 600, color: '#E54D2E',
              cursor: 'pointer', textDecoration: 'none',
            }}
          >
            {linkText} <ArrowRight size={14} />
          </a>
        )}
      </motion.div>

      {/* Mockup Side */}
      <motion.div 
        className="feature-mockup"
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        style={{ flex: 1.2, minWidth: 0, width: '100%' }}
      >
        {mockup}
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section style={{
      width: '100%', background: 'transparent', padding: '100px 0',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style>{`
        @media (max-width: 900px) {
          .feature-row {
            flex-direction: column !important;
            gap: 40px !important;
            padding: 60px 0 !important;
          }
          .feature-text {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .feature-text p {
            margin-left: auto;
            margin-right: auto;
          }
          .feature-text h2 {
            font-size: clamp(1.8rem, 5vw, 2.5rem) !important;
          }
          .feature-mockup {
            width: 100% !important;
            transform: scale(0.9);
          }
        }
        @media (max-width: 480px) {
          .feature-mockup {
            transform: scale(0.85);
            transform-origin: center top;
          }
          .afk-mockup, .vibecoding-mockup {
            flex-direction: column !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

        {/* ═══ FEATURE 1: REAL PVP ═══ */}
        <FeatureRow
          tag="REAL PVP"
          title="Same IDE, two live perspectives."
          desc="The live race is not a separate mini-game: both players solve inside the same battle IDE, with problem, code, progress, tests, and submit in one place."
          badges={[
            { text: '⚡ Live human duel', color: '#E54D2E', bg: 'rgba(229,77,46,0.08)', border: 'rgba(229,77,46,0.25)' },
            { text: '✓ First accepted wins', color: '#22C55E', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)' },
          ]}
          mockup={
            <div style={{ position: 'relative' }}>
              {/* Main view */}
              <IDEMockup url="https://nodeclash.in/battle">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FAFAFA' }}>King21</div>
                    <div style={{ fontSize: 10, color: '#52525B', fontFamily: "'JetBrains Mono', monospace" }}>Silver • 1,386 Elo</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#E54D2E', padding: '3px 10px', borderRadius: 20, background: 'rgba(229,77,46,0.1)' }}>● Coding...</span>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#52525B', marginBottom: 4 }}><span>Opponent Best</span><span>70% (33/47)</span></div>
                  <div style={{ width: '100%', height: 4, background: '#1C1C1E', borderRadius: 2 }}>
                    <div style={{ width: '70%', height: '100%', background: '#E54D2E', borderRadius: 2 }} />
                  </div>
                </div>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #27272A', marginTop: 16 }}>
                  {['Description', 'Submissions', 'Syntax'].map((t, i) => (
                    <span key={t} style={{
                      padding: '8px 14px', fontSize: 10, fontWeight: 600,
                      color: i === 0 ? '#FAFAFA' : '#52525B',
                      borderBottom: i === 0 ? '2px solid #E54D2E' : 'none',
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ padding: '16px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#71717A', lineHeight: '20px' }}>
                  <div><span style={{ color: '#3F3F46' }}>1</span> <span style={{ color: '#22C55E' }}># Pair Sum Exists</span></div>
                  <div><span style={{ color: '#3F3F46' }}>2</span> <span style={{ color: '#E54D2E' }}>import</span> sys</div>
                  <div><span style={{ color: '#3F3F46' }}>3</span></div>
                  <div><span style={{ color: '#3F3F46' }}>4</span> lines = sys.stdin.read().split("\\n")</div>
                </div>
              </IDEMockup>
              {/* Overlapping second view */}
              <div style={{
                position: 'absolute', top: '30%', right: '-10%',
                width: '55%', background: '#111113', border: '1px solid #27272A',
                borderRadius: 14, overflow: 'hidden', zIndex: 2,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #27272A', background: '#18181B', fontSize: 10, color: '#52525B', fontWeight: 600 }}>
                  OPPONENT VIEW
                </div>
                <div style={{ padding: 12, background: '#0A0A0A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: '#FAFAFA', fontWeight: 600 }}>Player123 (You)</span>
                    <span style={{ fontSize: 9, color: '#22C55E', padding: '2px 8px', borderRadius: 12, background: 'rgba(34,197,94,0.1)' }}>● Active</span>
                  </div>
                  <div style={{ fontSize: 10, color: '#52525B', marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>0/47</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 10, color: '#A1A1AA', padding: '3px 8px', border: '1px solid #27272A', borderRadius: 4 }}>▷ Run</span>
                    <span style={{ fontSize: 10, color: '#fff', padding: '3px 8px', background: '#E54D2E', borderRadius: 4, fontWeight: 600 }}>✓ Submit</span>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* ═══ FEATURE 2: AI INTERVIEWER ═══ */}
        <FeatureRow
          reverse
          tag="AI CONSTRAINTS"
          title="Mid-battle, the AI raises the bar."
          desc="Clara, our AI interviewer, watches your code in real-time. She analyzes your approach and injects dynamic constraints — forcing you to adapt under pressure. No preparation, pure instinct."
          badges={[
            { text: '🧠 LLM Powered', color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)' },
            { text: '⚡ Real-time injection', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
          ]}
          mockup={
            <IDEMockup url="https://nodeclash.in/battle">
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#71717A', lineHeight: '20px', marginBottom: 16 }}>
                <div><span style={{ color: '#3F3F46' }}>1</span> <span style={{ color: '#22C55E' }}># Read input from stdin</span></div>
                <div><span style={{ color: '#3F3F46' }}>2</span> <span style={{ color: '#E54D2E' }}>Example</span>: n = int(input())</div>
                <div><span style={{ color: '#3F3F46' }}>3</span> <span style={{ color: '#E54D2E' }}>Example</span>: arr = list(map(int, input().split()))</div>
              </div>
              {/* AI Chat Bubble */}
              <div style={{
                background: '#1C1C1E', border: '1px solid #27272A', borderRadius: 12,
                padding: 16, marginTop: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Bot size={14} style={{ color: '#A78BFA' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#A78BFA' }}>Clara AI</span>
                  <span style={{ fontSize: 9, color: '#52525B', padding: '2px 6px', background: '#27272A', borderRadius: 4 }}>PRACTICE STEP</span>
                </div>
                <div style={{
                  background: '#27272A', borderRadius: 8, padding: 12, fontSize: 12,
                  color: '#A1A1AA', lineHeight: 1.6, borderLeft: '3px solid #A78BFA',
                }}>
                  I keep failing case 1. Can you find the bug without giving me the full solution?
                </div>
                <div style={{
                  background: 'rgba(167,139,250,0.05)', borderRadius: 8, padding: 12,
                  fontSize: 12, color: '#A1A1AA', lineHeight: 1.6, marginTop: 8,
                  borderLeft: '3px solid #3F3F46',
                }}>
                  I'm checking the failing case against your loop. The set idea is right; ask for target − x before you add x. Then add the current member after that check. Try the duplicate case next.
                </div>
              </div>
            </IDEMockup>
          }
        />

        {/* ═══ FEATURE 3: PRACTICE MODE ═══ */}
        <FeatureRow
          tag="GUIDED PRACTICE"
          title="Practice with hints when you do not want a duel."
          desc="Not ready for ranked? Guided practice supports the core compete loop. Solve problems at your own pace with Clara coaching you through patterns, edge cases, and testing discipline."
          bullets={['1,000+ Problems', 'Pattern Recognition', 'Edge Case Training']}
          mockup={
            <IDEMockup url="https://nodeclash.in/practice">
              <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #27272A', marginBottom: 12 }}>
                {['Description', 'Submissions', 'Syntax'].map((t, i) => (
                  <span key={t} style={{
                    padding: '8px 14px', fontSize: 10, fontWeight: 600,
                    color: i === 0 ? '#FAFAFA' : '#52525B',
                    borderBottom: i === 0 ? '2px solid #E54D2E' : 'none',
                  }}>{t}</span>
                ))}
              </div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#FAFAFA', marginBottom: 4 }}>Starport Access Code</h4>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#22C55E', padding: '2px 8px', background: 'rgba(34,197,94,0.1)', borderRadius: 4 }}>Easy</span>
                <span style={{ fontSize: 10, color: '#71717A' }}>Rating: 800</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                {['brute-force', 'greedy', 'strings'].map(t => (
                  <span key={t} style={{
                    fontSize: 10, color: '#52525B', padding: '3px 8px',
                    border: '1px solid #27272A', borderRadius: 4,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{t}</span>
                ))}
              </div>
              <h5 style={{ color: '#E54D2E', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>▸ Problem Statement</h5>
              <p style={{ fontSize: 11, color: '#71717A', lineHeight: 1.7 }}>
                At a space station, a valid access code is a sequence of exactly 11 digits, and its final digit must be 8. In one operation, you may delete any one character from a string. Determine whether some subsequence of deletions can make the string a valid access code.
              </p>
            </IDEMockup>
          }
        />

        {/* ═══ FEATURE 4: AFK CONCEPT ═══ */}
        <FeatureRow
          tag="CONCEPT"
          title="Away From Keyboard building for owned projects."
          desc="Early concept for turning ideas into repos, exports, benchmarks, and real code you can take anywhere."
          badges={[{ text: 'AFK', color: '#71717A', bg: 'transparent', border: 'none' }]}
          mockup={
            <div className="afk-mockup" style={{ display: 'flex', gap: 12, background: '#0A0A0A', border: '1px solid #1A1A1C', borderRadius: 12, padding: 16 }}>
              {/* Chat Column */}
              <div style={{ flex: 1, background: '#111113', border: '1px solid #27272A', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: '#A1A1AA', marginBottom: 12 }}>Clara AFK</div>
                <div style={{ fontSize: 10, color: '#71717A', marginBottom: 6 }}>YOU</div>
                <div style={{ fontSize: 11, color: '#FAFAFA', marginBottom: 16 }}>Build a tiny web app where students track daily algorithm practice and see streaks.</div>
                
                <div style={{ background: '#1C1C1E', border: '1px solid #22C55E30', borderRadius: 6, padding: 10, marginBottom: 16 }}>
                  <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 700, marginBottom: 8 }}>✓ First pass ready</div>
                  <div style={{ color: '#A1A1AA', fontSize: 10, lineHeight: 1.6 }}>✓ Scaffold Next.js dashboard<br/>✓ Add local progress storage<br/>✓ Generate streak card and goal list</div>
                </div>
                
                <div style={{ fontSize: 10, color: '#71717A', marginBottom: 6 }}>Clara</div>
                <div style={{ fontSize: 11, color: '#FAFAFA', lineHeight: 1.5 }}>I built the first pass. The app has editable goals, a streak counter, and exportable project files.</div>
              </div>
              
              {/* Code Column */}
              <div style={{ flex: 1.2, background: '#111113', border: '1px solid #27272A', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#A1A1AA', marginBottom: 16 }}>
                  <span>arena-practice-app</span>
                  <span>4 files</span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#71717A', lineHeight: 1.8, flex: 1 }}>
                  <div><span style={{color: '#FAFAFA'}}>app/page.tsx</span> <span style={{color: '#22C55E'}}>+84</span></div>
                  <div>app/api/progress/route.ts <span style={{color: '#22C55E'}}>+31</span></div>
                  <div>components/GoalCard.tsx <span style={{color: '#22C55E'}}>+42</span></div>
                  <div style={{marginTop: 16}}>npm run check<br/>lint passed<br/>preview ready</div>
                </div>
              </div>

              {/* Preview Column */}
              <div style={{ flex: 1.5, background: '#111113', border: '1px solid #27272A', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#A1A1AA', marginBottom: 16 }}>
                  <span>Browser preview</span>
                  <span style={{ color: '#22C55E', background: '#22C55E20', padding: '2px 6px', borderRadius: 4 }}>▷ live</span>
                </div>
                <div style={{ background: '#1C1C1E', border: '1px solid #27272A', borderRadius: 6, padding: 12 }}>
                  <h4 style={{ fontSize: 12, color: '#FAFAFA', margin: '0 0 4px 0' }}>Practice Tracker</h4>
                  <div style={{ fontSize: 9, color: '#71717A', marginBottom: 16 }}>June sprint</div>
                  
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <div style={{ flex: 1, background: '#27272A', padding: 8, borderRadius: 4, textAlign: 'center' }}><div style={{fontSize:14,color:'#FAFAFA',fontWeight:700}}>8</div><div style={{fontSize:9,color:'#A1A1AA'}}>accepted</div></div>
                    <div style={{ flex: 1, background: '#27272A', padding: 8, borderRadius: 4, textAlign: 'center' }}><div style={{fontSize:14,color:'#FAFAFA',fontWeight:700}}>3</div><div style={{fontSize:9,color:'#A1A1AA'}}>topics</div></div>
                  </div>
                  
                  <div style={{ fontSize: 10, color: '#FAFAFA', marginBottom: 4 }}>Arrays</div>
                  <div style={{ width: '100%', height: 4, background: '#27272A', borderRadius: 2, marginBottom: 12 }}><div style={{width:'80%',height:'100%',background:'#22C55E',borderRadius:2}}/></div>
                  
                  <div style={{ fontSize: 10, color: '#FAFAFA', marginBottom: 4 }}>Graphs</div>
                  <div style={{ width: '100%', height: 4, background: '#27272A', borderRadius: 2 }}><div style={{width:'50%',height:'100%',background:'#22C55E',borderRadius:2}}/></div>
                </div>
              </div>
            </div>
          }
        />

        {/* ═══ FEATURE 5: VIBECODING COURSES ═══ */}
        <FeatureRow
          reverse
          tag="CONCEPT"
          title="Learn to code with words, not syntax."
          desc="A future course where learners prompt Clara in plain English, watch the assistant translate intent into steps, and discover real CS concepts."
          badges={[{ text: 'VIBECODING COURSES', color: '#71717A', bg: 'transparent', border: 'none' }]}
          mockup={
            <div className="vibecoding-mockup" style={{ display: 'flex', gap: 12, background: '#0A0A0A', border: '1px solid #1A1A1C', borderRadius: 12, padding: 16 }}>
              {/* Left Column: Visual Courses */}
              <div style={{ flex: 1, background: '#111113', border: '1px solid #27272A', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#A1A1AA', marginBottom: 16 }}>
                  <span>Vibecoding Courses</span>
                  <span style={{fontFamily:"'JetBrains Mono', monospace"}}>001 to 050</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, border: '1px solid #27272A', borderRadius: 6, padding: 8 }}>
                    <div style={{ fontSize: 9, color: '#71717A', marginBottom: 8 }}>TASK 001</div>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 16 }}>
                      <div style={{width: 20, height: 20, borderRadius: '50%', background: '#22C55E'}}/>
                      <div style={{width: 20, height: 20, borderRadius: '50%', background: '#22C55E'}}/>
                      <div style={{width: 20, height: 20, borderRadius: '50%', background: '#22C55E'}}/>
                    </div>
                    <div style={{ fontSize: 9, color: '#FAFAFA', fontWeight: 600 }}>Sequencing</div>
                  </div>
                  <div style={{ flex: 1, border: '1px solid #27272A', borderRadius: 6, padding: 8 }}>
                    <div style={{ fontSize: 9, color: '#71717A', marginBottom: 8 }}>TASK 002</div>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 16 }}>
                      <div style={{width: 20, height: 20, borderRadius: 4, background: '#EF4444'}}/>
                      <div style={{width: 20, height: 20, borderRadius: 4, background: '#22C55E'}}/>
                    </div>
                    <div style={{ fontSize: 9, color: '#FAFAFA', fontWeight: 600 }}>Precision</div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Chat/Logic */}
              <div style={{ flex: 1.5, background: '#111113', border: '1px solid #27272A', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: '#A1A1AA', marginBottom: 12 }}>Ask Clara</div>
                <div style={{ fontSize: 9, color: '#71717A', marginBottom: 6 }}>LEARNER</div>
                <div style={{ fontSize: 12, color: '#FAFAFA', fontWeight: 600, marginBottom: 16 }}>Move every green thing into the nearest matching box.</div>
                
                <div style={{ fontSize: 9, color: '#71717A', marginBottom: 6 }}>Clara</div>
                <div style={{ fontSize: 11, color: '#FAFAFA', lineHeight: 1.5, marginBottom: 16 }}>Great. That command has a loop, a condition, and a nearest-match rule hiding inside it.</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  <div style={{ border: '1px solid #27272A', padding: 8, borderRadius: 4, fontSize: 10, color: '#A1A1AA' }}>✓ Find green objects</div>
                  <div style={{ border: '1px solid #27272A', padding: 8, borderRadius: 4, fontSize: 10, color: '#A1A1AA' }}>✓ Choose nearest box</div>
                  <div style={{ border: '1px solid #27272A', padding: 8, borderRadius: 4, fontSize: 10, color: '#A1A1AA' }}>✓ Repeat until done</div>
                  <div style={{ border: '1px solid #27272A', padding: 8, borderRadius: 4, fontSize: 10, color: '#A1A1AA' }}>✓ Verify every match</div>
                </div>
                
                <div style={{ border: '1px solid #E54D2E30', padding: 10, borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#FAFAFA' }}>
                  for each object -{'>'} if green -{'>'} nearest box -{'>'} move -{'>'} check
                </div>
              </div>
            </div>
          }
        />

      </div>
    </section>
  );
}