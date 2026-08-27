import { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/layout/Footer';
import Teams from './pages/Teams/Teams';
import LogoReveal from './components/motion/LogoReveal';
import { useLenis } from './hooks/useLenis';
import LoginPage from './pages/Login/LoginPage';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import EventsPage from './pages/Events/EventsPage';
import KnowledgeHubPage from './pages/KnowledgeHub/KnowledgeHubPage';

/* Lazy-load the heavy Legacy page (Three.js) — keeps initial bundle lean */
const LegacyPage = lazy(() => import('./pages/Legacy/LegacyPage'));
const GalleryPage = lazy(() => import('./pages/Gallery/GalleryPage'));
const DevTeamPage = lazy(() => import('./pages/DevTeam/DevTeamPage'));

/* ── Scroll to hash or top on route change ────────────────────────── */
function ScrollToHashOrTop({ lenisRef }) {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      let checkCount = 0;
      const maxChecks = 20;

      const scrollToTarget = () => {
        const target = document.getElementById(id);
        if (!target) {
          if (checkCount < maxChecks) {
            checkCount++;
            setTimeout(scrollToTarget, 60);
          }
          return;
        }

        // Trigger Lenis resize to ensure scroll bounds & heights are fresh
        if (lenisRef?.current) {
          lenisRef.current.resize();
          lenisRef.current.scrollTo(target, {
            offset: -85,
            duration: 1.0,
            immediate: false,
          });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // As images/fonts/grids above target expand dynamically, verify & re-align
        if (checkCount < maxChecks) {
          checkCount++;
          setTimeout(() => {
            const rect = target.getBoundingClientRect();
            // If target is more than 35px away from desired top offset (80px from top)
            if (Math.abs(rect.top - 85) > 35) {
              scrollToTarget();
            }
          }, 180);
        }
      };

      const timer = setTimeout(scrollToTarget, 80);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, lenisRef]);

  return null;
}

function AppContent() {
  // ── Lenis smooth scroll (spring inertia + GSAP sync) ──────────────────
  const lenisRef = useLenis();

  // ── Smooth anchor scrolling for in-page hash links ─────────────────────
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const hash = href.includes('#') ? href.substring(href.indexOf('#')) : '';
      if (!hash) return;

      const id = hash.slice(1);
      if (!id) return;

      if (window.location.pathname === '/') {
        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();

        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, {
            offset: -80,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          const navOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        window.history.pushState(null, '', `/#${id}`);
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

  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    const introPlayed = sessionStorage.getItem('introPlayed');
    if (!introPlayed && location.pathname === '/') {
      return true;
    }
    return false;
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('introPlayed', 'true');
    setShowIntro(false);
  };

  return (
    <>
      {/* Live Ambient Mesh Glow */}
      <div className="ambient-mesh-glow" aria-hidden="true">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </div>

      <AnimatePresence>
        {showIntro && <LogoReveal onComplete={handleIntroComplete} logoSrc="/logo.jpg" />}
      </AnimatePresence>

      <ScrollToHashOrTop lenisRef={lenisRef} />

      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
            <Route
              path="/legacy"
              element={
                <Suspense fallback={<div className="legacy-scene-loading" style={{ minHeight: '100vh' }} />}>
                  <LegacyPage />
                </Suspense>
              }
            />
            <Route
              path="/dev-team"
              element={
                <Suspense fallback={<div className="legacy-scene-loading" style={{ minHeight: '100vh' }} />}>
                  <DevTeamPage />
                </Suspense>
              }
            />
            <Route path="/gallery"
              element={
                <Suspense fallback={<div className="legacy-scene-loading" style={{ minHeight: '100vh' }} />}>
                  <GalleryPage />
                </Suspense>
              }
            />
            <Route path="/login/student" element={<LoginPage role="student" />} />
            <Route path="/login/admin"   element={<LoginPage role="admin" />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

