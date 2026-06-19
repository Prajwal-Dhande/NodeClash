import { motion } from 'framer-motion';

const TESTIMONIALS = [
  { text: "The real-time aspect makes learning actually fun. It's like LeetCode but with soul.", author: "Frontend Engineer" },
  { text: "NodeClash is what happens when LeetCode meets high-stakes multiplayer gaming. I'm obsessed.", author: "Software Developer" },
  { text: "The Elo rating system makes grinding DSA actually addictive. Finally a platform that respects competitive programming.", author: "CS Undergrad" },
  { text: "Clara AI's mid-battle constraints are brutal in the best way possible. It actually prepares you for real interviews.", author: "Senior Engineer" },
  { text: "The UI is buttery smooth. No lag, no clunky environments—just pure coding and instant feedback.", author: "Fullstack Dev" },
  { text: "I used to hate practicing graphs, but battling a friend on a hard DP problem is surprisingly fun.", author: "University Student" },
  { text: "Cleanest dark mode I've seen in a coding platform. Plus, the Vim keybindings actually work perfectly.", author: "Backend Engineer" },
  { text: "We use NodeClash for our university coding club tournaments. The custom lobbies are a game changer.", author: "CS Club President" },
  { text: "The matchmaking is insanely fast. I can jump into a quick 1v1 battle during my coffee breaks.", author: "DevOps Engineer" }
];

export default function Testimonials() {
  return (
    <section style={{
      width: '100%', background: 'transparent', padding: '100px 0',
      fontFamily: 'Inter, sans-serif', borderTop: '1px solid #1A1A1C', overflow: 'hidden'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', marginBottom: 60, textAlign: 'center' }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          color: '#52525B', letterSpacing: '3px', textTransform: 'uppercase',
          display: 'block', marginBottom: 16,
        }}>INTRO CS, IN THEIR OWN WORDS (PILOT)</span>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          fontWeight: 800, color: '#FAFAFA', letterSpacing: '-1.5px', margin: '0 0 16px 0'
        }}>
          What students actually say
        </h2>
        <p style={{ color: '#71717A', fontSize: 15, margin: 0 }}>
          Anonymous student feedback from an intro CS classroom pilot on NodeClash.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          display: 'flex', gap: 16, padding: '0 40px', overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          paddingBottom: 20
        }}
      >
        {/* Track 1 */}
        <div className="testimonial-track" style={{ display: 'flex', width: 'max-content', gap: 16, animation: 'scroll-left 60s linear infinite' }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div className="testimonial-card" key={`t1-${i}`} style={{
              flexShrink: 0,
              background: '#0d0d0f', border: '1px solid #1A1A1C', borderRadius: 14,
              display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ color: '#E54D2E', fontFamily: "'Outfit', sans-serif", fontSize: 40, lineHeight: 0.5, marginBottom: 20, opacity: 0.8 }}>
                ""
              </div>
              <p style={{ fontSize: 13, color: '#FAFAFA', lineHeight: 1.6, marginBottom: 32, fontWeight: 500, flex: 1 }}>
                {t.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#E54D2E', opacity: 0.2 }} />
                <div style={{ fontSize: 12, color: '#71717A', fontWeight: 500 }}>{t.author}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        /* Pause scroll on hover */
        .testimonial-track:hover {
          animation-play-state: paused !important;
        }
        .testimonial-card {
          width: 320px;
          padding: 28px;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 8px)); }
        }
        @media (max-width: 768px) {
          .testimonial-card {
            width: 260px;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
