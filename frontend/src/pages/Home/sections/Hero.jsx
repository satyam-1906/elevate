import { ArrowRight, Compass } from 'lucide-react';
// FloatingLines is now the Hero background (NeuroNoise kept below, just swap import to switch back)
import FloatingLines from '../../../components/motion/FloatingLines';
// import NeuroNoise from '../../../components/motion/NeuroNoise'; // ← keep for fallback
import StaggeredText from '../../../components/motion/StaggeredText';
import './Hero.css';

// Elevate brand colors: indigo-blue → violet-pink → sky-blue gradient
const HERO_GRADIENT = [
  '#1E3A8A', // deep navy-blue
  '#2563EB', // electric blue
  '#7C3AED', // violet
  '#C026D3', // magenta-pink
  '#7C3AED', // violet back
  '#38BDF8', // sky-blue
];

export default function Hero() {
  return (
    <section className="hero-section">
      {/* ─── Background: FloatingLines WebGL (React Bits) ─── */}
      <div className="hero-bg" aria-hidden="true">
        <FloatingLines
          linesGradient={HERO_GRADIENT}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 14, 10]}
          lineDistance={[7, 5, 4]}
          animationSpeed={0.7}
          interactive={true}
          bendRadius={3.5}
          bendStrength={-0.8}
          mouseDamping={0.04}
          parallax={true}
          parallaxStrength={0.18}
          mixBlendMode="screen"
        />
        <div className="hero-vignette" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          
          {/* Staggered Text Title */}
          <h1 className="hero-title">
            <StaggeredText 
              text="Models that think" 
              className="hero-line-1"
              delay={0.1}
            />
            <br />
            <StaggeredText 
              text="in real time." 
              className="hero-line-2 gradient-text"
              delay={0.3}
            />
          </h1>

          <p className="hero-subtitle">
            Join the premier technical club. Build decentralized networks, train foundation AI models, 
            secure critical infrastructure, and engineer breakthrough applications with industry-grade mentorship.
          </p>

          {/* Call to Actions */}
          <div className="hero-ctas">
            <a href="#join" className="btn btn-primary hero-btn-main">
              <span>Join Elevate</span>
              <ArrowRight size={16} />
            </a>
            <a href="#domains" className="btn btn-outline">
              <Compass size={16} />
              <span>Explore Domains</span>
            </a>
          </div>

          {/* Powered by / Tech Domains Row */}
          <div className="hero-logos">
            <p className="logos-label">POWERING INNOVATION ACROSS</p>
            <div className="logos-row">
              {['Web2 & Cloud', 'Web3 & Protocols', 'AI & Deep Learning', 'Cyber Security', 'Mobile Architecture', 'Open Source'].map(t => (
                <span key={t} className="logo-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
