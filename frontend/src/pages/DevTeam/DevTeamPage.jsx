import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import GalaxyBackground from '../Legacy/components/GalaxyBackground';
import '../Legacy/LegacyPage.css';
import './DevTeamPage.css';

const devTeam = [
  [
    { id: 'vinay', name: 'Vinay Kumrawat', role: 'Full Stack Developer', githubUrl: 'https://github.com/vinaykumrawat', imageUrl: '/dev_pic/Vinay_Kumrawat.png' },
    { id: 'bishal', name: 'Bishal Dey', role: 'Full Stack Developer', githubUrl: 'https://github.com/bishaldey', imageUrl: '/dev_pic/Bishal_dey.jpg' }
  ],
  [
    { id: 'tushar', name: 'Tushar Agarwal', role: 'Frontend Developer', githubUrl: 'https://github.com/tusharagarwal', imageUrl: '/dev_pic/Tushar_Agarwal.png' },
    { id: 'aviral', name: 'Aviral Joshi', role: 'Backend Developer', githubUrl: 'https://github.com/aviraljoshi', imageUrl: '/dev_pic/Aviral_Joshi.png' }
  ]
];

function DevCard({ node }) {
  return (
    <div className="circuit-node">
      <div className="circuit-node-border">
        <div className="node-content">
          <div className="node-header">
            <span className="node-role">{node.role.toUpperCase()}</span>
            <div className="node-bars">
               <div className="bar"></div>
               <div className="bar"></div>
               <div className="bar"></div>
               <div className="bar"></div>
               <div className="bar"></div>
            </div>
          </div>
          <div className="node-body" style={node.imageUrl ? { flexDirection: 'column' } : {}}>
            <div className="node-avatar" style={node.imageUrl ? { width: '100%', height: '220px', clipPath: 'none', borderRadius: '4px', background: 'transparent', border: '1px solid var(--glow)' } : {}}>
              {node.imageUrl ? (
                <img src={node.imageUrl} alt={node.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
              ) : (
                node.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="node-info" style={node.imageUrl ? { textAlign: 'center', width: '100%' } : {}}>
              <h3 className="node-name">{node.name}</h3>
              {node.githubUrl && (
                <a href={node.githubUrl} target="_blank" rel="noreferrer" className="node-link">
                  ↗ {node.githubUrl.split('github.com/')[1]}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <p className="hero-kicker">MEET THE CREATORS</p>
            <h1 className="hero-title">DEV TEAM</h1>
            <p className="hero-subtitle">"Code is poetry written by logic."</p>
          </motion.div>
        </section>

        {/* Dev Team Grid */}
        <div className="dev-team-wrapper">
          {devTeam.map((row, rowIndex) => (
            <motion.div 
              className="dev-team-row" 
              key={`row-${rowIndex}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: rowIndex * 0.2 }}
            >
              {row.map(node => (
                <div className="tree-node-wrapper" key={node.id}>
                  <DevCard node={node} />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
