import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import GalaxyBackground from '../Legacy/components/GalaxyBackground';
import '../Legacy/LegacyPage.css';
import './DevTeamPage.css';

const devTeam = [
  { id: 'vinay', name: 'Vinay Kumrawat', role: 'Full Stack Developer', githubUrl: 'https://github.com/VinayCodes17', imageUrl: '/dev_pic/Vinay_Kumrawat.png' },
  { id: 'tushar', name: 'Tushar Agarwal', role: 'Full Stack Developer', githubUrl: 'https://github.com/tushar-313', imageUrl: '/dev_pic/Tushar_Agarwal.png' },
  { id: 'bishal', name: 'Bishal Dey', role: 'Full Stack Developer', githubUrl: 'https://github.com/11deybishal-commits', imageUrl: '/dev_pic/Bishal_dey_1.jpg' },
  { id: 'aviral', name: 'Aviral Joshi', role: 'Backend and Database Engineer', githubUrl: 'https://github.com/aviraL27', imageUrl: '/dev_pic/Aviral_Joshi.png' }
];

function DevCard({ node, index }) {
  return (
    <motion.div
      className="cyber-dev-card"
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
    >
      <div className="cyber-card-inner">
        <div className="cyber-card-glare"></div>
        <div className="cyber-card-border"></div>

        <div className="cyber-image-wrapper">
          <div className="cyber-image-glitch-layer"></div>
          {node.imageUrl ? (
            <img src={node.imageUrl} alt={node.name} className="cyber-avatar" loading="lazy" />
          ) : (
            <div className="cyber-avatar-placeholder">
              {node.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="cyber-info">
          <div className="cyber-role">
            <span className="cyber-role-text">{'//'} {node.role.toUpperCase()}</span>
            <span className="cyber-blinker">_</span>
          </div>
          <h3 className="cyber-name" data-text={node.name}>{node.name}</h3>

          {node.githubUrl && (
            <a href={node.githubUrl} target="_blank" rel="noreferrer" className="cyber-github">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Profile
            </a>
          )}
        </div>

        {/* Decorative Sci-Fi elements */}
        <div className="cyber-deco-top-left"></div>
        <div className="cyber-deco-bottom-right"></div>
        <div className="cyber-deco-crosshair-1"></div>
        <div className="cyber-deco-crosshair-2"></div>
      </div>
    </motion.div>
  );
}

export default function DevTeamPage() {
  return (
    <div className="legacy-page-container dev-team-container">
      {/* 3D Starfield Background fixed to viewport */}
      <div className="legacy-background">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <GalaxyBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="legacy-content">
        {/* Hero Section */}
        <section className="legacy-hero">
          <motion.div
            className="hero-inner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="hero-kicker">MEET THE ARCHITECTS</p>
            <h1 className="hero-title">DEV TEAM</h1>
            <p className="hero-subtitle">"Code is poetry written by logic."</p>
          </motion.div>
        </section>

        {/* Single Row Dev Team Grid */}
        <div className="dev-team-wrapper">
          {devTeam.map((node, index) => (
            <DevCard key={node.id} node={node} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
