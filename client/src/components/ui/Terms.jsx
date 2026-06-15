import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CheckSquare, UserCircle, Star, ShieldAlert, Copyright, AlertTriangle } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <style>{`
        .page-container { min-height: 100vh; background: #000; position: relative; display: flex; flex-direction: column; align-items: center; padding: 60px 20px; font-family: 'Inter', sans-serif; overflow: hidden; }
        
        /* Modern Grid Background */
        .grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 40px 40px; z-index: 0; mask-image: radial-gradient(circle at center, black, transparent 80%); -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%); pointer-events: none; }
        
        .doc-card { background: rgba(10, 10, 10, 0.7); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 60px; width: 100%; max-width: 800px; z-index: 1; animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .btn-back { background: transparent; color: #a1a1aa; border: none; font-size: 14px; font-weight: 500; cursor: pointer; margin-bottom: 32px; display: flex; align-items: center; gap: 8px; transition: color 0.2s; z-index: 1; align-self: flex-start; width: 100%; max-width: 800px; padding: 0; }
        .btn-back:hover { color: #fff; }
        
        .doc-title { fontFamily: 'Outfit', sans-serif; font-size: 48px; color: #fff; margin-bottom: 8px; letter-spacing: -1px; font-weight: 800; }
        .doc-meta { font-size: 14px; color: #a1a1aa; margin-bottom: 48px; display: block; }
        
        .section-block { margin-bottom: 48px; display: flex; gap: 24px; align-items: flex-start; }
        .icon-container { width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #ef4444; box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); }
        .section-content { flex: 1; }
        .section-title { font-size: 20px; color: #ededed; margin-bottom: 12px; font-weight: 600; letter-spacing: -0.5px; }
        .section-text { color: #a1a1aa; line-height: 1.7; font-size: 15px; font-weight: 400; }
      `}</style>
      
      <div className="grid-bg" />
      
      <div style={{ width: '100%', maxWidth: '800px', zIndex: 1 }}>
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back to Arena
        </button>
      </div>

      <div className="doc-card">
        <h1 className="doc-title">Terms of Service</h1>
        <div className="doc-meta">Last Updated: April 2026</div>
        
        <div className="section-block">
          <div className="icon-container"><CheckSquare size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Acceptance of Terms</h2>
            <p className="section-text">By accessing or using NodeClash, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our platform. We reserve the right to modify or replace these Terms at any time.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><UserCircle size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">User Accounts</h2>
            <p className="section-text">When you create an account, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for any activities or actions under your account. You may not share your account, ELO rating, or subscription with others.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><Star size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Premium Subscriptions</h2>
            <p className="section-text">NodeClash offers Premium subscriptions that grant access to exclusive features such as Clara AI, private tournaments, and advanced analytics. Subscriptions are billed on a recurring basis. You may cancel your subscription at any time, but we do not offer refunds for partial billing periods.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><ShieldAlert size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Fair Play & Code of Conduct</h2>
            <p className="section-text">NodeClash is built on fair competition. Any use of bots, automated scripts, unauthorized third-party assistance, or exploitation of bugs to manipulate ELO ratings during ranked battles will result in an immediate and permanent ban without refund.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><Copyright size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Intellectual Property</h2>
            <p className="section-text">The platform, its original content, features, and functionality are owned by NodeClash and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><AlertTriangle size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Limitation of Liability</h2>
            <p className="section-text">In no event shall NodeClash, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the service.</p>
          </div>
        </div>
      </div>
    </div>
  );
}