import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RotatingText({ 
  phrases = ["in real time.", "at scale.", "securely.", "for the future."],
  className = "",
  interval = 3200
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases, interval]);

  return (
    <span className={`rotating-text-wrapper ${className}`} style={{ display: 'inline-flex', position: 'relative', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="gradient-text"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ 
            display: 'inline-block',
            // To ensure the gradient text clips correctly on child when animated
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            paddingRight: '4px' // prevent clipping of trailing italic characters etc
          }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
