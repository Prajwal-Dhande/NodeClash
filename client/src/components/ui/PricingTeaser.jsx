import React from 'react';
import { motion } from 'framer-motion';

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const CROSS = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    priceLabel: '₹0',
    period: '/mo',
    desc: 'Jump in and start battling — no commitment needed.',
    color: '#a1a1aa',
    glow: 'rgba(161,161,170,0.05)',
    border: 'rgba(161,161,170,0.15)',
    features: [
      { label: 'Unlimited Random Matches', included: true },
      { label: 'Practice AI Bot', included: true },
      { label: 'Global Leaderboard', included: true },
      { label: 'Exclusive The Elite Archive', included: false },
      { label: 'Live AI Interviews (Clara)', included: false },
      { label: 'AI Code Review & Analytics', included: false },
    ],
  },
  {
    id: 'pro_1m',
    name: 'Pro — 1 Month',
    originalPrice: 399,
    priceLabel: '₹249',
    period: '/mo',
    saveBadge: 'Save 37%',
    desc: 'Full access to every premium feature for 1 month.',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.08)',
    border: 'rgba(96,165,250,0.25)',
    features: [
      { label: 'Exclusive The Elite Archive Problems', included: true },
      { label: '⚡ Live AI Interviews (Clara)', included: true, highlight: true },
      { label: '🧠 AI Code Review & Analytics', included: true, highlight: true },
      { label: 'Daily Quests Access', included: true },
      { label: 'Priority Matchmaking Servers', included: true },
    ],
  },
  {
    id: 'pro_6m',
    name: 'Pro — 6 Months',
    originalPrice: 2394,
    priceLabel: '₹1,199',
    period: '/6mo',
    perMonth: '~₹199/mo',
    saveBadge: 'Save 50%',
    popular: true,
    desc: 'Best value — lock in 6 months of uninterrupted Pro access.',
    color: '#ff6b35',
    glow: 'rgba(255,107,53,0.1)',
    border: 'rgba(255,107,53,0.3)',
    features: [
      { label: 'Exclusive The Elite Archive Problems', included: true },
      { label: '⚡ Live AI Interviews (Clara)', included: true, highlight: true },
      { label: '🧠 AI Code Review & Analytics', included: true, highlight: true },
      { label: 'Daily Quests Access', included: true },
      { label: 'Priority Matchmaking Servers', included: true },
    ],
  },
]

export default function PricingTeaser() {
  return (
    <section className="pricing-teaser-section">
      <motion.div 
        className="pricing-teaser-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="pricing-tag">UPGRADE YOUR ARENA</span>
        <h2 className="pricing-title">Simple pricing. <span style={{ color: 'var(--orange)' }}>No surprises.</span></h2>
        <p className="pricing-desc">Choose the plan that fits your ambition. Upgrade to PRO to unlock Clara AI and The Elite Archive.</p>
      </motion.div>

      <div className="pricing-grid">
        {PLANS.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
            className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            style={{
              '--card-glow': plan.glow,
              '--card-border': plan.border,
            }}
          >
            {plan.popular && (
              <div className="popular-badge">MOST POPULAR</div>
            )}

            {/* Plan Name + Save Badge */}
            <div className="plan-header">
              <div className="plan-name" style={{ color: plan.color }}>{plan.name.toUpperCase()}</div>
              {plan.saveBadge && <span className="save-badge">{plan.saveBadge}</span>}
            </div>

            {/* Price */}
            <div className="plan-price-wrapper">
              {plan.originalPrice && <span className="original-price">₹{plan.originalPrice.toLocaleString('en-IN')}</span>}
              <span className="plan-price">{plan.priceLabel}</span>
              <span className="plan-period">{plan.period}</span>
            </div>

            {plan.perMonth && <div className="per-month">{plan.perMonth}</div>}
            
            <p className="plan-desc">{plan.desc}</p>
            <div className="divider" />

            {/* Features */}
            <ul className="plan-features">
              {plan.features.map((f, i) => (
                <li key={i} style={{ opacity: f.included ? 1 : 0.6 }}>
                  <span className="feature-check">{f.included ? CHECK : CROSS}</span>
                  <span style={{
                    color: f.included ? (f.highlight ? plan.color : 'var(--text-main)') : 'var(--text-dim)',
                    fontWeight: f.highlight ? 700 : 500,
                    textDecoration: f.included ? 'none' : 'line-through'
                  }}>{f.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <style>{`
        .pricing-teaser-section {
          max-width: 1200px;
          margin: 120px auto 80px auto;
          padding: 0 24px;
          font-family: Inter, sans-serif;
          position: relative;
          z-index: 1;
        }
        
        .pricing-teaser-header { text-align: center; margin-bottom: 60px; }
        .pricing-tag { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--text-hint); letter-spacing: 4px; display: block; margin-bottom: 16px; }
        .pricing-title { font-family: Outfit, sans-serif; font-weight: 900; font-size: clamp(2.5rem, 4vw, 3.5rem); color: var(--text-main); margin: 0 0 16px 0; letter-spacing: -1px; }
        .pricing-desc { color: var(--text-dim); font-size: 16px; max-width: 500px; margin: 0 auto; line-height: 1.6; }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        .pricing-card {
          position: relative;
          background: var(--card-bg);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: inset 0 1px 1px var(--glass-border);
        }
        .pricing-card.popular {
          transform: scale(1.02);
          background: linear-gradient(180deg, var(--card-glow) 0%, var(--card-bg) 50%);
          box-shadow: 0 20px 50px var(--card-glow), inset 0 1px 1px var(--glass-border);
        }
        .pricing-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px) scale(var(--hover-scale, 1));
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2), inset 0 1px 1px var(--glass-border);
        }
        .pricing-card.popular:hover {
          --hover-scale: 1.02;
        }

        .popular-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, #ff6b35, #f7451d); color: #fff;
          font-size: 10px; font-weight: 800; padding: 6px 18px; border-radius: 20px;
          letter-spacing: 1.5px; box-shadow: 0 4px 16px rgba(255,107,53,0.5); white-space: nowrap;
        }

        .plan-header { display: flex; alignItems: center; gap: 10px; margin-bottom: 12px; }
        .plan-name { font-size: 13px; font-weight: 700; letter-spacing: 1px; }
        .save-badge { font-size: 10px; font-weight: 800; background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); padding: 3px 8px; border-radius: 20px; letter-spacing: 0.3px; }

        .plan-price-wrapper { display: flex; align-items: baseline; gap: 6px; margin-bottom: 4px; }
        .original-price { font-size: 22px; font-weight: 600; color: var(--text-hint); text-decoration: line-through; opacity: 0.6; font-family: Outfit, sans-serif; }
        .plan-price { font-size: 48px; font-weight: 900; color: var(--text-main); font-family: Outfit, sans-serif; letter-spacing: -2px; }
        .plan-period { font-size: 14px; color: var(--text-dim); font-weight: 600; }

        .per-month { font-size: 13px; color: #22c55e; font-weight: 700; margin-bottom: 8px; }
        .plan-desc { font-size: 14px; color: var(--text-dim); margin-bottom: 28px; line-height: 1.6; }
        .divider { height: 1px; background: var(--glass-border); margin-bottom: 28px; }

        .plan-features { list-style: none; padding: 0; margin: 0; flex: 1; display: flex; flex-direction: column; gap: 14px; }
        .plan-features li { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; line-height: 1.5; }
        .feature-check { flex-shrink: 0; margin-top: 2px; }

        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr; }
          .pricing-card.popular { transform: none; }
          .pricing-card:hover { transform: none; }
          .pricing-teaser-section { margin-top: 80px; }
        }
      `}</style>
    </section>
  )
}
