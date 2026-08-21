/**
 * LegacyPage — orchestrator for "The Archive" section.
 *
 * Detects capabilities and renders the appropriate experience:
 *   Desktop + WebGL + no reduced-motion → full 3D constellation
 *   Otherwise → LegacyMobileList (a genuine, polished fallback)
 *
 * The Three.js scene is code-split via React.lazy() and wrapped in an
 * error boundary that falls back to the mobile list on runtime errors.
 */
import { useState, useEffect, useRef, lazy, Suspense, Component } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { legacyYears } from '../../data/legacy';
import LegacyHUD from './components/LegacyHUD';
import LegacyMobileTree from './components/LegacyMobileTree';
import './LegacyPage.css';

gsap.registerPlugin(ScrollTrigger);

/* Lazy-load the heavy Three.js scene so it's in its own chunk */
/* Lazy-load the heavy Three.js scene so it's in its own chunk */
const LegacyGalaxy = lazy(() => import('./components/LegacyGalaxy'));

/* ── WebGL detection ─────────────────────────────────────────────── */
function hasWebGL() {
  try {
    const cv = document.createElement('canvas');
    return !!(cv.getContext('webgl') || cv.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

/* ── Error boundary for Three.js runtime errors ──────────────────── */
class SceneErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* ── Media-query hook ────────────────────────────────────────────── */
function useMQ(query) {
  const [m, setM] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const h = (e) => setM(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, [query]);
  return m;
}

/* ── Archive Intro — terminal-themed header shown before the 3D scroll ── */
function LegacyIntro() {
  return (
    <div className="legacy-intro">
      <div className="legacy-intro-inner">
        <span className="legacy-intro-tag">
          <span className="legacy-intro-tag-dot" aria-hidden="true" />
          THE ARCHIVE
        </span>
        <h1 className="legacy-intro-title">
          Our Legacy
        </h1>
        <p className="legacy-intro-subtitle">
          Scroll to travel through the leadership that built Elevate —
          from the founding era to today.
        </p>
        <div className="legacy-intro-scroll-hint" aria-hidden="true">
          <span className="legacy-intro-scroll-arrow" />
        </div>
      </div>
    </div>
  );
}

/* ── Desktop Experience ──────────────────────────────────────────── */
function LegacyDesktop({ entries }) {
  const archiveRef      = useRef(null);
  const scrollProgress  = useRef(0);
  const scrollVelocity  = useRef(0);
  const activeIdxRef    = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFoundingEra, setIsFoundingEra] = useState(false);

  /* ScrollTrigger: drives progress/velocity refs and active-node state */
  useEffect(() => {
    const el = archiveRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      snap: {
        snapTo: 1 / Math.max(1, entries.length - 1),
        duration: { min: 0.6, max: 1.2 },
        delay: 0.05, // snap quickly after scroll stops
        ease: 'back.out(1.4)'
      },
      onUpdate(self) {
        scrollProgress.current = self.progress;
        scrollVelocity.current = self.getVelocity();

        const idx = Math.min(
          entries.length - 1,
          Math.max(0, Math.floor(self.progress * entries.length)),
        );
        if (idx !== activeIdxRef.current) {
          activeIdxRef.current = idx;
          setActiveIndex(idx);
          setIsFoundingEra(entries[idx]?.isFoundingEra || false);
        }
      },
    });

    return () => st.kill();
  }, [entries]);

  const height = `${(entries.length + 1) * 100}vh`;
  const mobileFallback = (
    <LegacyMobileTree entries={entries} />
  );

  return (
    <section id="legacy">
      <LegacyIntro />

      <div
        className={`legacy-archive ${isFoundingEra ? 'is-founding-era' : ''}`}
        ref={archiveRef}
        style={{ height }}
      >
        <div className="legacy-sticky">
          <SceneErrorBoundary fallback={mobileFallback}>
            <Suspense fallback={<div className="legacy-scene-loading" />}>
              <LegacyGalaxy
                entries={entries}
                scrollProgressRef={scrollProgress}
                scrollVelocityRef={scrollVelocity}
              />
            </Suspense>
          </SceneErrorBoundary>

          <LegacyHUD entries={entries} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}

/* ── Main Export ──────────────────────────────────────────────────── */
export default function LegacyPage() {
  const reduced = useMQ('(prefers-reduced-motion: reduce)');
  const mobile  = useMQ('(max-width: 959px)');
  const webgl   = useRef(hasWebGL());

  const desktop = !reduced && !mobile && webgl.current;

  if (!desktop) {
    return (
      <section id="legacy">
        <LegacyMobileTree entries={legacyYears} />
      </section>
    );
  }

  return <LegacyDesktop entries={legacyYears} />;
}
