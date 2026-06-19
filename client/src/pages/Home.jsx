import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/ui/Navbar';
import Hero from '../components/ui/Hero';
import ProductEvidence from '../components/ui/ProductEvidence';
import Testimonials from '../components/ui/Testimonials';
import Features from '../components/ui/Features';
import HowItWorks from '../components/ui/HowItWorks';
import PricingTeaser from '../components/ui/PricingTeaser';
import CompanyLogos from '../components/ui/CompanyLogos';
import Newsletter from '../components/ui/Newsletter';
import Footer from '../components/ui/Footer';

const FAQS = [
  { question: "Is NodeClash free to use?", answer: "Yes! Core features like random match-making, practice rooms, and the public leaderboard are completely free." },
  { question: "What programming languages are supported?", answer: "We currently support JavaScript, Python, C++, and Java for all battles and practice sessions." },
  { question: "How does the ELO ranking system work?", answer: "You gain or lose points based on match outcomes. Beating higher-ranked players yields more points, ensuring a fair reflection of your skill." },
  { question: "What is Clara AI?", answer: "Clara is our AI interviewer that acts as your opponent or mentor. She injects dynamic constraints mid-battle and provides code reviews in the Pro tier." },
  { question: "Can I cancel my Pro subscription anytime?", answer: "Absolutely. You can manage or cancel your subscription at any time from your billing settings without any hidden fees." }
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <div style={{ 
      background: '#09090B', /* Slightly lighter than pitch black (Zinc 950) */
      backgroundImage: `
        radial-gradient(ellipse at 50% 0%, rgba(229, 77, 46, 0.15) 0%, rgba(229, 77, 46, 0.02) 30%, transparent 70%),
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 50px 50px, 50px 50px',
      backgroundPosition: 'center top',
      minHeight: '100vh', 
      color: '#FAFAFA', 
      fontFamily: 'Inter, sans-serif' 
    }}>
      <Helmet>
        <title>NodeClash | Real-time 1v1 Coding Battles</title>
        <meta name="description" content="Compete against other developers in real-time coding challenges. Practice DSA, climb the global leaderboard, and prove your skills on NodeClash." />
        <meta name="keywords" content="coding platform, competitive programming, 1v1 coding, dsa practice, leetcode alternative, multiplayer coding" />
        <meta property="og:title" content="NodeClash | Real-time 1v1 Coding Battles" />
        <meta property="og:description" content="Compete against other developers in real-time coding challenges. Practice DSA and climb the leaderboard!" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      <Hero />
      <ProductEvidence />
      <div id="features"><Features /></div>
      <CompanyLogos />
      <Testimonials />
      <div id="how-it-works"><HowItWorks /></div>
      <PricingTeaser />

      {/* FAQ SECTION */}
      <section style={{
        width: '100%', background: 'transparent', padding: '100px 0',
        borderTop: '1px solid #1A1A1C',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: '#52525B', letterSpacing: '3px', textTransform: 'uppercase',
            display: 'block', marginBottom: 16,
          }}>SUPPORT</span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800,
            color: '#FAFAFA', letterSpacing: '-1.5px', marginBottom: 48,
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ borderTop: '1px solid #1A1A1C' }}>
            {FAQS.map((faq, index) => (
              <div key={index} style={{ borderBottom: '1px solid #1A1A1C' }}>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '24px 0', background: 'transparent',
                    border: 'none', color: '#FAFAFA', fontSize: 15, fontWeight: 500,
                    fontFamily: 'Inter, sans-serif', textAlign: 'left', cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                >
                  <span>{faq.question}</span>
                  <motion.svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#52525B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0, marginLeft: 16 }}
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        paddingBottom: 24, fontSize: 14, color: '#71717A',
                        lineHeight: 1.7, maxWidth: 600,
                      }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}