import { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../../config/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [general, setGeneral] = useState(true);
  const [digest, setDigest] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          preferences: { general, digest }
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section style={{ padding: '100px 0', background: 'transparent', textAlign: 'center', borderTop: '1px solid #1A1A1C', fontFamily: 'Inter, sans-serif' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#52525B', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>PRODUCT UPDATES</span>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#FAFAFA', margin: '0 0 16px 0', letterSpacing: '-1px' }}>Stay in the loop</h2>
        <p style={{ color: '#71717A', fontSize: 15, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>Get updates as Assessments, AFK, and Vibecoding Courses move from concept to real product.</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        style={{ maxWidth: 540, margin: '0 auto', background: '#111113', border: '1px solid #27272A', borderRadius: 12, padding: 32, textAlign: 'left' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, background: '#E54D2E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontFamily: 'Outfit', fontSize: 18 }}>{'{N}'}</div>
          <div>
            <h3 style={{ color: '#FAFAFA', fontSize: 15, fontWeight: 700, margin: '0 0 2px 0' }}>NodeClash Newsletter</h3>
            <p style={{ color: '#71717A', fontSize: 12, margin: 0 }}>Live updates on battles & training</p>
          </div>
        </div>
        
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Mail size={16} style={{ position: 'absolute', left: 16, top: 15, color: '#71717A' }} />
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', background: '#0A0A0A', border: '1px solid #27272A', padding: '14px 14px 14px 44px', borderRadius: 8, color: '#FAFAFA', outline: 'none', fontSize: 14 }} 
          />
        </div>

        {status === 'success' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#22c55e', fontSize: 13, marginBottom: 16, background: 'rgba(34,197,94,0.1)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(34,197,94,0.2)' }}>
            <CheckCircle2 size={16} /> {message}
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444', fontSize: 13, marginBottom: 16, background: 'rgba(239,68,68,0.1)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle size={16} /> {message}
          </motion.div>
        )}
        
        <button 
          onClick={handleSubscribe}
          disabled={loading}
          style={{ width: '100%', background: loading ? '#52525B' : '#E54D2E', color: '#fff', border: 'none', padding: 14, borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 24, transition: 'background 0.2s' }} 
          onMouseOver={e => !loading && (e.currentTarget.style.background = '#D43F25')} 
          onMouseOut={e => !loading && (e.currentTarget.style.background = '#E54D2E')}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 13, color: '#FAFAFA', fontWeight: 600, marginBottom: 20, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" checked={general} onChange={(e) => setGeneral(e.target.checked)} style={{ accentColor: '#E54D2E', width: 16, height: 16 }} /> General Newsletter</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" checked={digest} onChange={(e) => setDigest(e.target.checked)} style={{ accentColor: '#E54D2E', width: 16, height: 16 }} /> Biweekly Performance Digest</label>
        </div>
        <p style={{ textAlign: 'center', color: '#52525B', fontSize: 11, margin: 0 }}>We respect your privacy. Unsubscribe at any time.</p>
      </motion.div>
    </section>
  );
}
