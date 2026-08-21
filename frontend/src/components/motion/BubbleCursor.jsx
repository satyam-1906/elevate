import { useEffect, useRef, useState } from 'react';
import './BubbleCursor.css';

/**
 * BubbleCursor — Optical Magnifying Glass Droplet (Screenshot 2)
 * Creates a real magnifying lens effect that follows the cursor with:
 * 1. True optical magnification of the live page underneath
 * 2. Chromatic aberration rainbow dispersion ring on the curved glass edge
 * 3. Delicate specular reflection highlights
 * 4. Smooth trailing physics and auto-disable on touch/mobile
 */
export default function BubbleCursor() {
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(true);
  const lensRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 
                      window.matchMedia('(hover: none)').matches || 
                      window.innerWidth < 768;
      setIsTouchOrMobile(isTouch);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isTouchOrMobile) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lensX = mouseX;
    let lensY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;
    let trail2X = mouseX;
    let trail2Y = mouseY;

    let isVisible = false;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    window.addEventListener('pointermove', onMouseMove, { passive: true });
    window.addEventListener('pointerleave', onMouseLeave, { passive: true });

    const animate = () => {
      // Smooth spring follow for main magnifying lens
      lensX += (mouseX - lensX) * 0.22;
      lensY += (mouseY - lensY) * 0.22;

      // Trailing metaball droplets
      trailX += (lensX - trailX) * 0.35;
      trailY += (lensY - trailY) * 0.35;

      trail2X += (trailX - trail2X) * 0.25;
      trail2Y += (trailY - trail2Y) * 0.25;

      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${lensX}px, ${lensY}px, 0) translate(-50%, -50%)`;
        lensRef.current.style.opacity = isVisible ? '1' : '0';
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
        trailRef.current.style.opacity = isVisible ? '0.7' : '0';
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('pointerleave', onMouseLeave);
    };
  }, [isTouchOrMobile]);

  if (isTouchOrMobile) return null;

  return (
    <div className="optical-bubble-container" aria-hidden="true">
      {/* Secondary trailing gooey droplet */}
      <div ref={trailRef} className="bubble-trail-droplet" />

      {/* Main Optical Magnifying Glass Droplet */}
      <div ref={lensRef} className="optical-magnifying-lens">
        {/* Specular light reflections */}
        <div className="lens-specular-highlight" />
        <div className="lens-inner-shadow" />
        
        {/* Chromatic Aberration Rainbow Rim (Screenshot 2) */}
        <div className="lens-chromatic-ring" />
      </div>
    </div>
  );
}
