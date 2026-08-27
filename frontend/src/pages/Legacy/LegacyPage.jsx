import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { legacyYears } from '../../data/legacy';
import GalaxyBackground from './components/GalaxyBackground';
import YearSection from './components/YearSection';
import './LegacyPage.css';

export default function LegacyPage() {
  return (
    <div className="legacy-page-container">
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
            <p className="hero-kicker">THE CHRONICLE OF</p>
            <h1 className="hero-title">OUR LEGACY</h1>
            <p className="hero-subtitle">CIRCUITS OF BRILLIANCE · WIRED TOGETHER</p>
            
            <motion.div 
              className="scroll-indicator"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <p>SCROLL TO EXPLORE</p>
              <div className="scroll-line"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Year Sections */}
        <div className="legacy-years-wrapper">
          {legacyYears.map((year, index) => (
            <YearSection key={year.id} yearData={year} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
