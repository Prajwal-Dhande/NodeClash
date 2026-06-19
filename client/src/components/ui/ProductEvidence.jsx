import React from 'react';
import { motion } from 'framer-motion';

const EVIDENCE_DATA = [
  {
    value: "1,000+",
    title: "PROBLEMS",
    desc: "curated CS practice items across the arena"
  },
  {
    value: "5",
    title: "LANGUAGES",
    desc: "from Python and JavaScript to C++, TypeScript, and Java"
  },
  {
    value: "Live",
    title: "PRACTICE LOOPS",
    desc: "ranked battles, self-ghosts, classroom sessions, and replayable work"
  },
  {
    value: "AI-era",
    title: "SKILL SIGNAL",
    desc: "built around planning, verification, and tool fluency"
  }
];

export default function ProductEvidence() {
  return (
    <section style={{
      width: '100%',
      padding: '40px',
      borderTop: '1px solid #1A1A1C',
      borderBottom: '1px solid #1A1A1C',
      display: 'flex',
      justifyContent: 'center',
      background: '#09090B'
    }}>
      <div style={{
        width: '100%', maxWidth: 1400,
        display: 'flex', gap: 24, flexWrap: 'wrap'
      }}>
        
        {/* Left Text Box */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            flex: '1 1 350px',
            background: '#0C0C0E',
            border: '1px solid #1C1C1E',
            borderRadius: 12,
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: '#71717A', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>PRODUCT EVIDENCE</span>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 500, color: '#FAFAFA', lineHeight: 1.3, marginBottom: 24, letterSpacing: '-0.5px' }}>
            Rooted in real practice, classroom, and assessment work.
          </h2>
          <p style={{ color: '#A1A1AA', fontSize: 14, lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
            The strongest proof today is the product itself: a problem bank, live battle surface, classroom flow, assessment workspace, and the team roots behind them.
          </p>
        </motion.div>

        {/* Right Cards Grid */}
        <div style={{ flex: '2 1 600px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {EVIDENCE_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              style={{
                background: '#0C0C0E',
                border: '1px solid #1C1C1E',
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 600, color: '#FAFAFA', fontFamily: "'Inter', sans-serif", marginBottom: 32 }}>{item.value}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 12 }}>{item.title}</div>
              <p style={{ color: '#A1A1AA', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
