import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Crown,
  Sparkles,
  CalendarDays,
  ExternalLink,
  Search,
  Loader2,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
  Code2,
  Plus,
  Flame,
  Zap,
  Eye,
  X
} from 'lucide-react';
import StaggeredText from '../../components/motion/StaggeredText';
import ParticleBackground from '../../components/common/ParticleBackground';
import { useAuth } from '../../context/AuthContext';
import './HallOfFamePage.css';

const API = import.meta.env.VITE_API_URL;

// Official Real Hall of Fame Event
const defaultHallOfFame = [
  {
    _id: 'ganesh-chaturthi-2026',
    eventName: 'Ganesh Chaturthi Web Challenge',
    date: '2026-09-17T18:29:00.000Z',
    description: "Code, Create, Celebrate! Elevate's Ganesh Chaturthi Web Challenge tasked student developers with crafting responsive, creative web applications using pure HTML5, CSS3, and vanilla JavaScript — no frameworks allowed — adhering to clean Git commit history and open-source GitHub practices.",
    bannerUrl: 'https://res.cloudinary.com/v9y40hk0/image/upload/v1790799831/elevate_events/u3mnzlfenitvapdnufzu.png',
    category: 'Web Challenge',
    isPublished: true,
    winners: [
      {
        _id: 'w1',
        position: 'Winner',
        name: 'Ashish Ranjit Shinde (bt26cse056)',
        projectTitle: 'Ganesh Chaturthi Web Experience',
        projectUrl: 'https://github.com/Ashucod/project-ganesha',
        prize: 'Winner Certificate & Honors',
        members: ['Ashish Ranjit Shinde (bt26cse056)']
      },
      {
        _id: 'w2',
        position: 'Winner',
        name: 'Shaurya Santosh Chaudhari (bt26cse085)',
        projectTitle: 'Ganesh Chaturthi Web Experience',
        projectUrl: 'https://github.com/shaurya-666/legendary-train',
        prize: 'Winner Certificate & Honors',
        members: ['Shaurya Santosh Chaudhari (bt26cse085)']
      }
    ]
  }
];

export default function HallOfFamePage() {
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState(defaultHallOfFame);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePosterModal, setActivePosterModal] = useState(null);

  useEffect(() => {
    fetch(`${API}/hall-of-fame`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch Hall of Fame from API, using defaults:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Compute categories dynamically
  const categories = useMemo(() => {
    const set = new Set(['All']);
    events.forEach((ev) => {
      if (ev.category) set.add(ev.category);
    });
    return Array.from(set);
  }, [events]);

  // Compute stats
  const stats = useMemo(() => {
    const totalEvents = events.length;
    let totalWinners = 0;
    events.forEach(ev => {
      if (Array.isArray(ev.winners)) totalWinners += ev.winners.length;
    });
    const uniqueTracks = new Set(events.map(ev => ev.category).filter(Boolean)).size;
    return { totalEvents, totalWinners, uniqueTracks };
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = ev.eventName?.toLowerCase().includes(q);
      const inDesc = ev.description?.toLowerCase().includes(q);
      const inWinners = ev.winners?.some(
        (w) =>
          w.name?.toLowerCase().includes(q) ||
          w.projectTitle?.toLowerCase().includes(q) ||
          w.position?.toLowerCase().includes(q) ||
          (Array.isArray(w.members) && w.members.some(m => m.toLowerCase().includes(q)))
      );

      return inTitle || inDesc || inWinners;
    });
  }, [events, selectedCategory, searchQuery]);

  return (
    <div className="hof-page">
      {/* Background ambient blooms */}
      <div className="hof-bg-bloom hof-bg-bloom-1" aria-hidden="true" />
      <div className="hof-bg-bloom hof-bg-bloom-2" aria-hidden="true" />
      <ParticleBackground count={24} intensity="medium" />

      <div className="container hof-container">

        {/* ── Page Hero Header ─────────────────────────────────────────── */}
        <div className="hof-hero-header">
          <span className="section-tag">
            <Trophy size={14} />
            <span>Elevate Victories & Milestones</span>
          </span>

          <h1 className="hof-main-title">
            <StaggeredText text="Hall of Fame: Champions & Sprints" />
          </h1>

          <p className="hof-main-desc">
            Honoring student builders, engineers, and researchers who competed, engineered groundbreaking solutions, and triumphed across Elevate&apos;s campus hackathons and technical sprints.
          </p>

          {/* Admin shortcut banner (visible only to admins) */}
          {isAdmin && (
            <div className="hof-admin-banner glass">
              <div className="hof-admin-banner-left">
                <div className="hof-admin-status-pill">
                  <ShieldCheck size={14} />
                  <span>Admin Clearance</span>
                </div>
                <span className="hof-admin-banner-text">
                  Add events, publish winners, and update podium achievements in real-time.
                </span>
              </div>
              <Link to="/admin/dashboard" className="hof-admin-dashboard-link">
                <LayoutDashboard size={15} />
                <span>Open Admin Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* ── Key Metrics Ribbon ───────────────────────────────────────── */}
        <div className="hof-stats-ribbon">
          <div className="hof-stat-card glass">
            <div className="hof-stat-icon-wrapper hof-stat-gold">
              <Trophy size={24} />
            </div>
            <div>
              <div className="hof-stat-value">{stats.totalEvents}</div>
              <div className="hof-stat-label">Events Conducted</div>
            </div>
          </div>

          <div className="hof-stat-card glass">
            <div className="hof-stat-icon-wrapper hof-stat-blue">
              <Crown size={24} />
            </div>
            <div>
              <div className="hof-stat-value">{stats.totalWinners}</div>
              <div className="hof-stat-label">Champions Honored</div>
            </div>
          </div>

          <div className="hof-stat-card glass">
            <div className="hof-stat-icon-wrapper hof-stat-cyan">
              <Zap size={24} />
            </div>
            <div>
              <div className="hof-stat-value">{stats.uniqueTracks || 1}</div>
              <div className="hof-stat-label">Technical Disciplines</div>
            </div>
          </div>
        </div>

        {/* ── Controls Bar: Category Filters & Search ─────────────────── */}
        <div className="hof-controls-bar glass">
          <div className="hof-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`hof-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' && <Sparkles size={14} />}
                {cat === 'Hackathon' && <Flame size={14} />}
                {cat !== 'All' && cat !== 'Hackathon' && <Code2 size={14} />}
                <span>{cat === 'All' ? 'All Events' : cat}</span>
              </button>
            ))}
          </div>

          <div className="hof-controls-right">
            <div className="hof-search-wrapper">
              <Search size={16} className="hof-search-icon" />
              <input
                type="text"
                placeholder="Search event, winner, or student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hof-search-input"
              />
            </div>

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="hof-admin-quick-btn"
                title="Manage Hall of Fame in Admin Dashboard"
              >
                <Plus size={14} />
                <span>Add Event</span>
              </Link>
            )}
          </div>
        </div>

        {/* ── Events & Winners Feed ────────────────────────────────────── */}
        {loading ? (
          <div className="hof-loading">
            <Loader2 size={36} className="spin" />
            <span>Fetching Hall of Fame records...</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="hof-empty-card glass">
            <Trophy size={48} className="hof-empty-icon" />
            <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: 700 }}>
              No Hall of Fame events found
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              {searchQuery
                ? `No results matched "${searchQuery}". Try a different keyword.`
                : `No events archived under "${selectedCategory}" yet.`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-secondary"
                style={{ padding: '6px 14px', fontSize: '13px' }}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="hof-events-feed">
            {filteredEvents.map((ev, index) => {
              const evDate = new Date(ev.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              const bannerImageSrc = ev.bannerUrl || '/images/ganesh_chaturthi_challenge.png';

              return (
                <article
                  key={ev._id || index}
                  className="hof-event-card reveal-on-scroll is-revealed"
                >
                  {/* Banner Image Header */}
                  <div className="hof-card-header">
                    <img
                      src={bannerImageSrc}
                      alt={ev.eventName}
                      className="hof-card-banner"
                      loading="lazy"
                    />

                    <div className="hof-banner-gradient-overlay" />

                    <div className="hof-banner-badges">
                      <span className="hof-category-chip">
                        {ev.category || 'Web Challenge'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          className="hof-view-poster-btn"
                          onClick={() => setActivePosterModal({ url: bannerImageSrc, title: ev.eventName })}
                          title="View Full Poster"
                        >
                          <Eye size={13} />
                          <span>View Poster</span>
                        </button>
                        <span className="hof-date-chip">
                          <CalendarDays size={13} />
                          <span>{evDate}</span>
                        </span>
                      </div>
                    </div>

                    <div className="hof-banner-content">
                      <h2 className="hof-event-title">{ev.eventName}</h2>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="hof-card-body">
                    {/* Short Description */}
                    {ev.description && (
                      <p className="hof-event-description">
                        {ev.description}
                      </p>
                    )}

                    {/* Winners Section */}
                    {Array.isArray(ev.winners) && ev.winners.length > 0 && (
                      <div className="hof-winners-section">
                        <div className="hof-winners-header">
                          <div className="hof-winners-heading">
                            <Trophy size={16} style={{ color: '#f59e0b' }} />
                            <span>Event Winners & Results</span>
                          </div>
                          <span className="hof-winners-count">
                            {ev.winners.length} {ev.winners.length === 1 ? 'Winner' : 'Winners'}
                          </span>
                        </div>

                        <div className="hof-winners-grid">
                          {ev.winners.map((winner, wIdx) => {
                            const posLower = (winner.position || '').toLowerCase();
                            const is2nd = posLower.includes('2nd') || posLower.includes('runner') || posLower.includes('second');
                            const is3rd = posLower.includes('3rd') || posLower.includes('third');

                            // If position is "Winner" or equal standing, display as gold champion
                            const cardStyleClass = is2nd
                              ? 'hof-winner-silver'
                              : is3rd
                              ? 'hof-winner-bronze'
                              : 'hof-winner-gold';

                            const badgeStyleClass = is2nd
                              ? 'badge-silver'
                              : is3rd
                              ? 'badge-bronze'
                              : 'badge-gold';

                            return (
                              <div key={winner._id || wIdx} className={`hof-winner-card ${cardStyleClass}`}>
                                <div className="hof-winner-top">
                                  <span className={`hof-rank-badge ${badgeStyleClass}`}>
                                    <Crown size={13} />
                                    <span>{winner.position || 'Winner'}</span>
                                  </span>

                                  {winner.prize && (
                                    <span className="hof-winner-prize">
                                      {winner.prize}
                                    </span>
                                  )}
                                </div>

                                <h3 className="hof-winner-name">
                                  {winner.name}
                                </h3>

                                {winner.projectTitle && (
                                  <div className="hof-project-info">
                                    <div className="hof-project-title">
                                      <Code2 size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                      <span>{winner.projectTitle}</span>
                                    </div>

                                    {winner.projectUrl && (
                                      <a
                                        href={winner.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hof-project-link"
                                      >
                                        <span>View Solution Repository</span>
                                        <ExternalLink size={12} />
                                      </a>
                                    )}
                                  </div>
                                )}

                                {Array.isArray(winner.members) && winner.members.length > 0 && (
                                  <div className="hof-members-chips">
                                    {winner.members.map((member, mIdx) => (
                                      <span key={mIdx} className="hof-member-chip">
                                        {member}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* ── Poster Lightbox Modal ────────────────────────────────────── */}
      {activePosterModal && (
        <div
          className="hof-lightbox-backdrop"
          onClick={() => setActivePosterModal(null)}
        >
          <div
            className="hof-lightbox-modal glass"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hof-lightbox-header">
              <h3 className="hof-lightbox-title">{activePosterModal.title}</h3>
              <button
                className="hof-lightbox-close-btn"
                onClick={() => setActivePosterModal(null)}
                title="Close Poster"
              >
                <X size={20} />
              </button>
            </div>
            <div className="hof-lightbox-body">
              <img
                src={activePosterModal.url}
                alt={activePosterModal.title}
                className="hof-lightbox-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
