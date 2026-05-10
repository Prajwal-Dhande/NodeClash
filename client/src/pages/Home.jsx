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
        .faq-section {
          position: relative; z-index: 1; width: 100%; max-width: 800px; margin: 0 auto;
        }
        .faq-title {
          font-family: Outfit, sans-serif; font-size: 32px; font-weight: 800; color: #fff; text-align: center; margin-bottom: 40px; letter-spacing: -1px;
        }
        .faq-list { display: flex; flex-direction: column; gap: 16px; }
        .faq-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .faq-item:hover { border-color: rgba(255,255,255,0.15); }
        .faq-question {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 20px 24px; background: transparent; border: none; color: #fff;
          font-family: Inter, sans-serif; font-size: 16px; font-weight: 600; text-align: left;
          cursor: pointer;
        }
        .faq-answer {
          padding: 0 24px 20px; color: #a1a1aa; font-size: 15px; line-height: 1.6;
        }
      `}</style>
    </div>
  )
}