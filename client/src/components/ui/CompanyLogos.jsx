import { useState } from 'react';
import { motion } from 'framer-motion';

// Using inline SVG strings for core logos so they never break.
// Added new companies with Wikipedia SVGs + pure white filter for dark mode.
const LOGOS = [
  {
    name: 'Google',
    svg: (
      <svg viewBox="0 0 48 48" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    )
  },
  {
    name: 'Microsoft',
    svg: (
      <svg viewBox="0 0 23 23" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f35325" d="M1 1h10v10H1z"/>
        <path fill="#81bc06" d="M12 1h10v10H12z"/>
        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
        <path fill="#ffba08" d="M12 12h10v10H12z"/>
      </svg>
    )
  },
  {
    name: 'Apple',
    svg: (
      <svg viewBox="0 0 384 512" width="46" height="56" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FAFAFA" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
      </svg>
    )
  },
  {
    name: 'Spotify',
    svg: (
      <svg viewBox="0 0 49.733 49.733" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1ED760" d="M24.866 0C11.133 0 0 11.132 0 24.866c0 13.733 11.133 24.867 24.866 24.867 13.733 0 24.867-11.134 24.867-24.867C49.733 11.132 38.599 0 24.866 0zm11.398 35.894c-.451.74-1.428.988-2.167.535-5.942-3.633-13.415-4.453-22.253-2.441-.837.19-1.67-.333-1.859-1.169-.19-.838.332-1.67 1.17-1.859 9.684-2.196 17.954-1.282 24.576 2.766.74.451.989 1.428.533 2.168zm3.064-6.84c-.569.923-1.796 1.233-2.72.665-6.822-4.188-17.243-5.412-25.59-2.879-1.05.319-2.17-.275-2.487-1.325-.318-1.05.275-2.168 1.325-2.486 9.467-2.872 21.059-1.503 28.808 3.255.923.568 1.233 1.796.664 2.77zm.25-7.143C31.572 17.155 18.337 16.716 10.686 19.04c-1.258.383-2.6-.328-2.981-1.587-.382-1.26.328-2.6 1.587-2.982 8.924-2.709 23.54-2.195 32.96 3.4.148-.088 1.156.684 1.442 1.16.541.888.261 2.053-.627 2.595-.886.54-2.052.26-2.593-.627z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    svg: (
      <svg viewBox="0 0 98 96" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FAFAFA" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.868 0 48.854 0z"/>
      </svg>
    )
  },
  {
    name: 'Meta',
    svg: (
      <svg viewBox="0 0 24 24" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0668E1" d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"/>
      </svg>
    )
  },
  {
    name: 'Flipkart',
    svg: (
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontStyle: 'italic', color: '#FAFAFA', fontSize: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ color: '#FFE11B', fontSize: 32, lineHeight: 1, textShadow: '0 2px 10px rgba(255,225,27,0.3)' }}>f</span> Flipkart
      </span>
    )
  },
  {
    name: 'TCS',
    svg: (
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, color: '#FAFAFA', fontSize: 40, letterSpacing: '-2px' }}>
        tcs
      </span>
    )
  }
];

export default function CompanyLogos() {
  return (
    <section style={{ 
      padding: '80px 0', background: 'transparent', textAlign: 'center', 
      borderTop: '1px solid #1A1A1C', overflow: 'hidden'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#52525B', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>INTERVIEW-READY BY DESIGN</span>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#FAFAFA', margin: '0 0 16px 0', letterSpacing: '-1px' }}>
          Practice the patterns companies interview with
        </h2>
        <p style={{ color: '#71717A', fontSize: 15, marginBottom: 80, maxWidth: 600, margin: '0 auto 80px' }}>
          Our questions cover the algorithmic patterns commonly asked at top-tier companies.
        </p>
      </motion.div>
      
      {/* Marquee Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          padding: '20px 0 60px 0', overflowX: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        {/* Track scrolling left to right */}
        <div className="marquee-track" style={{ 
          display: 'flex', width: 'max-content', gap: 60, 
          paddingLeft: 60, transformStyle: 'preserve-3d'
        }}>
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={`logo-${i}`} style={{ flexShrink: 0 }}>
              <div className="card-3d" title={logo.name}>
                {logo.svg}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p style={{ color: '#3F3F46', fontSize: 10, marginTop: 24 }}>Company logos are shown for identification only. NodeClash is not affiliated with or endorsed by these companies.</p>
      </motion.div>

      <style>{`
        /* Pause the marquee on hover so the 3D hover effects work perfectly without jumping */
        .marquee-track {
          animation: scroll-left-to-right 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        .card-3d {
          width: 140px;
          height: 140px;
          background: #111113;
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
          /* Flat 3D Shadows & Lighting */
          box-shadow: 
            0 15px 35px rgba(0,0,0,0.8),
            inset 2px 2px 5px rgba(255,255,255,0.06),
            inset -3px -3px 8px rgba(0,0,0,0.6);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .card-3d:hover {
          /* Pop up straight on hover */
          transform: translateY(-15px) scale(1.05);
          box-shadow: 
            0 30px 60px rgba(0,0,0,0.9),
            inset 2px 2px 5px rgba(255,255,255,0.1),
            inset -2px -2px 5px rgba(0,0,0,0.4);
          border-color: rgba(229, 77, 46, 0.3);
          background: #18181A;
          z-index: 100;
        }

        @keyframes scroll-left-to-right {
          0% { transform: translateX(calc(-33.33% - 20px)); }
          100% { transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .card-3d {
            width: 80px;
            height: 80px;
            border-radius: 20px;
          }
          .card-3d svg {
            transform: scale(0.6);
          }
          .card-3d span {
            transform: scale(0.6);
          }
          .marquee-track {
            gap: 20px !important;
            padding-left: 20px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
