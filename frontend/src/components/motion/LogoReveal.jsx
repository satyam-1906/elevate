import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LogoReveal({ onComplete, logoSrc = "/logo.jpg" }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // The reveal lasts for 2.5 seconds total, then signals completion.
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#02040a',
            zIndex: 9999
          }}
        >
          <motion.img
            src={logoSrc}
            alt="ELEVATE Logo"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut"
            }}
            style={{
              width: '300px',
              maxWidth: '80vw',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
