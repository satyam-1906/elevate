import { ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
// FloatingLines is now the Hero background (NeuroNoise kept below, just swap import to switch back)
import FloatingLines from '../../../components/motion/FloatingLines';
// import NeuroNoise from '../../../components/motion/NeuroNoise'; // ← keep for fallback
import StaggeredText from '../../../components/motion/StaggeredText';
import RotatingText from '../../../components/motion/RotatingText';
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
        <div className="hero-content-glass">
          <div className="hero-content">
            <div className="hero-top-row">
              <div className="hero-top-left">
                <h1 className="hero-title">
                  <span className="hero-title-small">
                    <StaggeredText text="Welcome to" delay={0.1} />
                  </span>
                  <span className="hero-title-large">
                    <StaggeredText text="Elevate" delay={0.3} />
                  </span>
                </h1>
              </div>
            </div>

            <p className="hero-subtitle">
              Join the premier technical club. Build decentralized networks, train foundation AI models,
              secure critical infrastructure, and engineer breakthrough applications with industry-grade mentorship.
            </p>

            {/* Call to Actions */}
            <div className="hero-ctas">
              <Link to="/login/student" className="btn btn-primary hero-btn-main glow-effect">
                <span>Enter</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/knowledge-hub" className="btn btn-outline hero-btn-secondary">
                <Compass size={18} />
                <span>Explore Domains</span>
              </Link>
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
      </div>
    </section>
  );
}
