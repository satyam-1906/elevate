import { useEffect, useRef, memo } from 'react';
import './ParticleBackground.css';

/**
 * Shared rising-particle + ambient-blob background.
 * Drop it as the FIRST child of any page wrapper.
 *
 * Props:
 *   count      – number of particles (default 28)
 *   intensity  – 'low' | 'medium' | 'high'  (default 'medium')
 */
function ParticleBackground({ count = 28, intensity = 'medium' }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Clear old particles on re-render
    wrap.querySelectorAll('.pb-particle').forEach((p) => p.remove());

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'pb-particle';

      const size = 4 + Math.random() * 8;           // 4–12 px
      const left = Math.random() * 100;              // 0–100 %
      const delay = Math.random() * 10;              // 0–10 s
      const dur = 9 + Math.random() * 14;            // 9–23 s
      const xDrift = (Math.random() - 0.5) * 120;   // –60 ↔ +60 px

      p.style.cssText = `
        width:${size}px;
        height:${size}px;
        left:${left}%;
        bottom:-${size + 4}px;
        animation-delay:${delay}s;
        animation-duration:${dur}s;
        --x-drift:${xDrift}px;
      `;
      wrap.appendChild(p);
    }
  }, [count]);

  return (
    <div className={`particle-background pb-intensity-${intensity}`} aria-hidden="true" ref={wrapRef}>
      {/* Ambient blobs */}
      <div className="pb-blob pb-blob-1" />
      <div className="pb-blob pb-blob-2" />
      <div className="pb-blob pb-blob-3" />
    </div>
  );
}

export default memo(ParticleBackground);
