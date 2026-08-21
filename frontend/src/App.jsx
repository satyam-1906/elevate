import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/layout/Footer';
import { useLenis } from './hooks/useLenis';

/* Lazy-load the heavy Legacy page (Three.js) — keeps initial bundle lean */
const LegacyPage = lazy(() => import('./pages/Legacy/LegacyPage'));

/* ── Scroll to top on route change ────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  // ── Lenis smooth scroll (spring inertia + GSAP sync) ──────────────────
  const lenisRef = useLenis();

  // ── Smooth anchor scrolling for all hash links ─────────────────────────
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      if (lenisRef.current) {
        // Use Lenis's scrollTo for perfectly smooth anchor navigation
        lenisRef.current.scrollTo(target, {
          offset: -80, // account for fixed navbar height
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback: native smooth scroll
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenisRef]);

  // ── IntersectionObserver card reveal ─────────────────────────────────
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    });

    const elementsToReveal = document.querySelectorAll(
      '.section, .card, .stat-box, .legacy-card, .event-row, .knowledge-card, .sp-card, .reveal-on-scroll'
    );

    elementsToReveal.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Live Ambient Mesh Glow */}
      <div className="ambient-mesh-glow" aria-hidden="true">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </div>

      <ScrollToTop />

      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/legacy"
              element={
                <Suspense fallback={<div className="legacy-scene-loading" style={{ minHeight: '100vh' }} />}>
                  <LegacyPage />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

