/**
 * useLenis — Lenis smooth scroll hook
 *
 * Lenis by Studio Freight is the gold-standard smooth scroll library.
 * It wraps the native scroll with spring physics (inertia + easing),
 * giving that buttery "premium agency site" feel.
 *
 * Key features:
 * - Spring inertia with configurable damping & lerp
 * - Zero layout side-effects (no wrapper transforms, works with position:fixed)
 * - GSAP ScrollTrigger sync via the raf ticker
 * - Respects `prefers-reduced-motion` accessibility setting
 * - Auto-disables on touch/mobile (native scroll feels better there)
 */
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.25,          // scroll animation duration (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger so scroll-triggered animations
    // fire at the correct scroll positions (without this, ScrollTrigger uses
    // native scroll position which lags behind Lenis's virtual position)
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to the GSAP ticker so it updates on every animation frame
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // disable GSAP lag-smoothing (Lenis handles it)

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  return lenisRef;
}

export default useLenis;
