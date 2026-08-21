import React from 'react';
import { motion } from 'framer-motion';
import CircuitTree from './CircuitTree';

const glowColors = [
  '#00ffff', // Cyan
  '#b026ff', // Purple
  '#00ffaa', // Green/Teal
  '#ff3366', // Pink
  '#ff9900', // Orange
];

const subtitles = [
  "FORGE THE FUTURE",
  "INNOVATE BEYOND LIMITS",
  "BUILDING THE FOUNDATION",
  "PIONEERING NEW FRONTIERS",
  "THE BEGINNING"
];

export default function YearSection({ yearData, index }) {
  const glowColor = glowColors[index % glowColors.length];
  const subtitle = yearData.isFoundingEra ? "THE BEGINNING" : subtitles[index % subtitles.length];
  
  // Extract just the main year (e.g. 2025 from "2025-26")
  let mainYear = yearData.yearRange.split('–')[0];
  if (yearData.isFoundingEra) mainYear = "FOUNDING";

  return (
    <motion.section 
      className="legacy-year-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ '--section-glow': glowColor }}
    >
      <div className="year-header">
        <motion.h2 
          className="year-title"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {mainYear}
        </motion.h2>
        <motion.p 
          className="year-subtitle"
          initial={{ letterSpacing: "0px", opacity: 0 }}
          whileInView={{ letterSpacing: "8px", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
        <div className="year-divider">
          <div className="divider-line"></div>
          <div className="divider-dots">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="divider-line"></div>
        </div>
      </div>

      <div className="year-circuit-container">
        <CircuitTree hierarchy={yearData.hierarchy} glowColor={glowColor} />
      </div>
    </motion.section>
  );
}
