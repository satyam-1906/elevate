import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import ParticleBackground from '../../components/common/ParticleBackground';
import './GalleryPage.css';

const images = [
  { id: 1, src: '/gallery/20250918_162939.jpg', title: 'Session Begins', year: '2025' },
  { id: 2, src: '/gallery/20250918_171011.jpg', title: 'Deep Discussions', year: '2025' },
  { id: 3, src: '/gallery/20250918_171203.jpg', title: 'Networking', year: '2025' },
  { id: 4, src: '/gallery/20250918_180725.jpg', title: 'Closing Keynote', year: '2025' },
];


/* Lightbox */
function Lightbox({ images, current, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-content"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lightbox-close" onClick={onClose}><X size={22} /></button>
        <button className="lightbox-nav lightbox-prev" onClick={onPrev}><ChevronLeft size={28} /></button>
        <button className="lightbox-nav lightbox-next" onClick={onNext}><ChevronRight size={28} /></button>

        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].title}
            className="lightbox-img"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>

        <div className="lightbox-info">
          <span className="lightbox-title">{images[current].title}</span>
          <span className="lightbox-year">{images[current].year}</span>
        </div>
        <div className="lightbox-dots">
          {images.map((_, i) => (
            <span key={i} className={`lightbox-dot ${i === current ? 'active' : ''}`} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Tilt card wrapper */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
  };
  return (
    <div ref={ref} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease' }}>
      {children}
    </div>
  );
}

export default function GalleryPage() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const starScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.04]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${4 + Math.random() * 6}px`,
    height: `${4 + Math.random() * 6}px`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${6 + Math.random() * 8}s`,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx(i => (i - 1 + images.length) % images.length);
  const nextImage = () => setLightboxIdx(i => (i + 1) % images.length);

  return (
    <div className="gallery-page" ref={containerRef}>
      {/* Shared rising-particle background */}
      <ParticleBackground count={28} intensity="medium" />

      {/* ── HEADER ── */}
      <motion.div className="gallery-header-section" style={{ y: headerY }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="gallery-badge"
        >
          <Camera size={15} /> ELEVATE GALLERY
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="gallery-title brand-font"
        >
          Our <span className="highlight-text">Moments</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="gallery-subtitle"
        >
          Relive the energy, impact, and magic of every Elevate event — one frame at a time.
        </motion.p>

        <motion.div
          className="gallery-divider"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* ── STAR PIC ── */}
      <motion.div
        className="star-pic-container"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ scale: starScale }}
      >
        {/* Glow ring */}
        <div className="star-glow-ring" aria-hidden="true" />

        <div className="star-pic-wrapper">
          {/* Shimmer sweep on hover */}
          <div className="star-shimmer" />

          <div className="star-badge">
            <Sparkles size={14} />
            <span>STAR HIGHLIGHT</span>
          </div>

          <img src="/gallery/Main.jpg" alt="Elevate Main Event" className="star-pic" />

          <div className="star-pic-overlay">
            <motion.h2
              className="star-pic-title brand-font"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              The Pinnacle of Elevate
            </motion.h2>
            <motion.p
              className="star-pic-desc"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              Where innovation meets collaboration — and legends are made.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION LABEL ── */}
      <motion.div
        className="gallery-section-label"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-line" />
        <span>Event Snapshots</span>
        <div className="section-line" />
      </motion.div>

      {/* ── PHOTO GRID ── */}
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.75,
              delay: idx * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <TiltCard className="gallery-card">
              <div className="gallery-card-inner" onClick={() => openLightbox(idx)}>
                {/* Number badge */}
                <div className="card-num">0{idx + 1}</div>

                <img src={img.src} alt={img.title} className="gallery-card-img" />

                {/* Zoom icon */}
                <div className="card-zoom-icon"><ZoomIn size={20} /></div>

                <div className="gallery-card-content">
                  <p className="gallery-card-title">{img.title}</p>
                  <span className="gallery-card-year">{img.year}</span>
                </div>

                {/* Corner glow */}
                <div className="card-corner-glow" />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={images}
            current={lightboxIdx}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
