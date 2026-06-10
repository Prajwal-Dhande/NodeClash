import { useState } from 'react'
import { Helmet } from 'react-helmet-async' // 🔥 Helmet import kar liya
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/ui/Navbar'
import Hero from '../components/ui/Hero'
import Features from '../components/ui/Features'
import HowItWorks from '../components/ui/HowItWorks'
import Footer from '../components/ui/Footer'

const FAQS = [
  { question: "Is CodeArena free to use?", answer: "Yes! Core features like random match-making, practice rooms, and the public leaderboard are completely free." },
  { question: "What programming languages are supported?", answer: "We currently support JavaScript, Python, C++, and Java for all battles and practice sessions." },
  { question: "How does the ELO ranking system work?", answer: "You gain or lose points based on match outcomes. Beating higher-ranked players yields more points, ensuring a fair reflection of your skill." },
  { question: "What is Clara AI?", answer: "Clara is our AI interviewer that acts as your opponent or mentor. She injects dynamic constraints mid-battle and provides code reviews in the Pro tier." },
  { question: "Can I cancel my Pro subscription anytime?", answer: "Absolutely. You can manage or cancel your subscription at any time from your billing settings without any hidden fees." }
]

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  return (
    <div>
      {/* 👇🔥 MAIN LANDING PAGE SEO 🔥👇 */}
      <Helmet>
        <title>CodeArena | Real-time 1v1 Coding Battles</title>
        <meta name="description" content="Compete against other developers in real-time coding challenges. Practice DSA, climb the global leaderboard, and prove your skills on CodeArena." />
        <meta name="keywords" content="coding platform, competitive programming, 1v1 coding, dsa practice, leetcode alternative, multiplayer coding" />
        
        {/* Social Media Share Preview Tags */}
        <meta property="og:title" content="CodeArena | Real-time 1v1 Coding Battles" />
        <meta property="og:description" content="Compete against other developers in real-time coding challenges. Practice DSA and climb the leaderboard!" />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* 👆🔥 MAIN LANDING PAGE SEO 🔥👆 */}

      <div className="ambient-glow" />

      <Navbar />
      <Hero />
      <div id="features"><Features /></div>
      <div id="how-it-works"><HowItWorks /></div>
      
      {/* FAQ SECTION */}
      <div className="faq-section" style={{ padding: '80px 20px' }}>
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question" 
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <motion.svg 
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="m6 9 6 6 6-6"/>
                </motion.svg>
              </button>
              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style>{`
        /* ── FAQ SECTION ── */
        .ambient-glow { 
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; 
          background: 
            radial-gradient(circle at 50% -20%, rgba(255, 107, 53, 0.25) 0%, rgba(255, 107, 53, 0.08) 40%, transparent 70%),
            radial-gradient(circle at 100% 100%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
          animation: pulseGlow 8s ease-in-out infinite alternate;
        }
        @keyframes pulseGlow {
          0% { opacity: 0.8; }
          100% { opacity: 1.2; }
        }
        .faq-section {
          position: relative; z-index: 1; width: 100%; max-width: 800px; margin: 0 auto;
        }
        .faq-title {
          font-family: Outfit, sans-serif; font-size: 32px; font-weight: 800; color: var(--text-main); text-align: center; margin-bottom: 40px; letter-spacing: -1px;
        }
        .faq-list { display: flex; flex-direction: column; gap: 16px; }
        .faq-item {
          background: rgba(30, 30, 36, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px; overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .faq-item:hover { border-color: rgba(255,107,53,0.3); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
        .faq-question {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 24px; background: transparent; border: none; color: var(--text-main);
          font-family: Inter, sans-serif; font-size: 16px; font-weight: 600; text-align: left;
          cursor: pointer;
        }
        .faq-answer {
          padding: 0 24px 24px; color: var(--text-dim); font-size: 15px; line-height: 1.6;
        }
      `}</style>
    </div>
  )
}