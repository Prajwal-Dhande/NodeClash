import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Shield, Eye, Lock, Globe, Database, UserCheck } from 'lucide-react';

export default function Privacy() {
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
        .icon-container { width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #ff6b35; box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); }
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
        <h1 className="doc-title">Privacy Policy</h1>
        <div className="doc-meta">Last Updated: April 2026</div>
        
        <div className="section-block">
          <div className="icon-container"><Globe size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Information We Collect</h2>
            <p className="section-text">We collect information you provide directly to us, such as when you create or modify your account, participate in battles, request customer support, or otherwise communicate with us. This information may include your username, email address, password, profile picture, coding statistics, and any other information you choose to provide.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><Eye size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">How We Use Your Information</h2>
            <p className="section-text">We use the information we collect to provide, maintain, and improve our services. This includes matchmaking for battles, calculating and updating your ELO rating, displaying your position on the Global Leaderboard, and providing technical support. We also use your information to send you technical notices, updates, security alerts, and administrative messages.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><Shield size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Cookies & Tracking</h2>
            <p className="section-text">We use cookies and similar tracking technologies to track the activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><Database size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Third-Party Services</h2>
            <p className="section-text">We may employ third-party companies and individuals to facilitate our platform, provide the platform on our behalf, perform platform-related services (like payments via Razorpay), or assist us in analyzing how our platform is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><Lock size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Data Security & Retention</h2>
            <p className="section-text">The security of your data is important to us. Passwords are encrypted using industry-standard hashing algorithms, and we do not sell your personal information. We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations.</p>
          </div>
        </div>

        <div className="section-block">
          <div className="icon-container"><UserCheck size={22} /></div>
          <div className="section-content">
            <h2 className="section-title">Your Rights</h2>
            <p className="section-text">You have the right to access, update or delete the information we have on you. If you wish to be informed what Personal Data we hold about you or if you want it to be removed from our systems, please contact us. In certain circumstances, you have the following data protection rights: the right to access, update or delete the information we have on you; the right of rectification; the right to object; the right of restriction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}