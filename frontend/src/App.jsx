import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/layout/Footer';
import { useLenis } from './hooks/useLenis';
// import BubbleCursor from './components/motion/BubbleCursor'; // ← keep for future use

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

      {/* BubbleCursor disabled — uncomment below to re-enable */}
      {/* <BubbleCursor size={26} trail={18} follow={0.55} /> */}

      <div className="app-container">
        <Navbar />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
