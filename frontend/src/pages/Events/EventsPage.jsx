import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarDays, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Radio, 
  History, 
  Flame, 
  Search, 
  Image as ImageIcon,
  Loader2,
  LayoutDashboard,
  ShieldCheck,
  Plus
} from 'lucide-react';
import StaggeredText from '../../components/motion/StaggeredText';
import { useAuth } from '../../context/AuthContext';
import ParticleBackground from '../../components/common/ParticleBackground';
import './EventsPage.css';

const API = 'http://localhost:5000/api';

export default function EventsPage() {
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'ongoing' | 'upcoming' | 'past'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API}/events/all`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : data.events || []);
      })
      .catch((err) => {
        console.error('Failed to fetch events:', err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Split events into Ongoing, Upcoming, Past based on event date
  const { ongoing, upcoming, past } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ongoingList = [];
    const upcomingList = [];
    const pastList = [];

    events.forEach((ev) => {
      const evDate = new Date(ev.date);
      const evDateOnly = new Date(evDate);
      evDateOnly.setHours(0, 0, 0, 0);

      if (evDateOnly.getTime() === today.getTime()) {
        ongoingList.push(ev);
      } else if (evDateOnly > today) {
        upcomingList.push(ev);
      } else {
        pastList.push(ev);
      }
    });

    // Sort upcoming ascending (nearest first), past descending (most recent past first)
    upcomingList.sort((a, b) => new Date(a.date) - new Date(b.date));
    pastList.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      ongoing: ongoingList,
      upcoming: upcomingList,
      past: pastList,
    };
  }, [events]);

  // Filter current tab list based on search query
  const displayedEvents = useMemo(() => {
    let list = [];
    if (activeTab === 'ongoing') list = ongoing;
    else if (activeTab === 'upcoming') list = upcoming;
    else if (activeTab === 'past') list = past;

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (ev) =>
        ev.title?.toLowerCase().includes(q) ||
        ev.description?.toLowerCase().includes(q)
    );
  }, [activeTab, ongoing, upcoming, past, searchQuery]);

  return (
    <div className="events-page">
      <ParticleBackground count={26} intensity="medium" />

      <div className="container events-page-container">
        
        {/* Page Hero Header */}
        <div className="events-hero-header">
          <span className="section-tag">
            <Sparkles size={14} />
            <span>Elevate Calendar & Sprints</span>
          </span>
          <h1 className="events-main-title">
            <StaggeredText text="Campus Events, Hackathons & Sprints" />
          </h1>
          <p className="events-main-desc">
            Explore hands-on hackathons, technical workshops, and dev summits engineered to accelerate your tech journey at IIITN.
          </p>

          {/* Admin Shortcut Banner (Only visible to Admin) */}
          {isAdmin && (
            <div className="events-admin-banner glass">
              <div className="events-admin-banner-left">
                <div className="admin-status-pill">
                  <ShieldCheck size={14} />
                  <span>Admin Clearance</span>
                </div>
                <span className="events-admin-banner-text">
                  Manage live hackathons, registrations & campus sprint schedules
                </span>
              </div>
              <Link to="/admin/dashboard" className="events-admin-dashboard-link">
                <LayoutDashboard size={15} />
                <span>Open Admin Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Controls Bar: Tabs, Search & Admin Action */}
        <div className="events-controls-bar glass">
          <div className="events-tabs">
            <button
              className={`event-tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`}
              onClick={() => setActiveTab('ongoing')}
            >
              <Radio size={15} className={ongoing.length ? 'pulse-icon' : ''} />
              <span>Ongoing</span>
              <span className="tab-count count-ongoing">{ongoing.length}</span>
            </button>

            <button
              className={`event-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <Flame size={15} />
              <span>Upcoming</span>
              <span className="tab-count count-upcoming">{upcoming.length}</span>
            </button>

            <button
              className={`event-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              <History size={15} />
              <span>Past Events</span>
              <span className="tab-count count-past">{past.length}</span>
            </button>
          </div>

          <div className="events-controls-right">
            <div className="events-search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search events by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="events-search-input"
              />
            </div>

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="events-admin-quick-btn"
                title="Create or manage events in Admin Dashboard"
              >
                <Plus size={15} />
                <span>Manage in Dashboard</span>
              </Link>
            )}
          </div>
        </div>

        {/* Events Content Feed */}
        {loading ? (
          <div className="events-loading">
            <Loader2 size={32} className="spin" />
            <span>Fetching campus events...</span>
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="events-empty-card glass">
            <CalendarDays size={48} className="empty-icon" />
            <h3>No {activeTab} events found</h3>
            <p>
              {searchQuery
                ? `No events matched "${searchQuery}". Try a different keyword.`
                : activeTab === 'ongoing'
                ? 'There are no active events running today. Check out the Upcoming section for upcoming hackathons!'
                : activeTab === 'upcoming'
                ? 'No upcoming events scheduled right now. Stay tuned for announcements!'
                : 'No past events in archive yet.'}
            </p>
          </div>
        ) : (
          <div className="events-grid-feed">
            {displayedEvents.map((ev, index) => {
              const evDate = new Date(ev.date);
              const formattedDate = evDate.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              return (
                <article
                  key={ev._id || index}
                  className="event-feed-card card glass reveal-on-scroll is-revealed"
                >
                  {/* Card Cover Banner */}
                  <div className="event-cover-wrapper">
                    {ev.imageUrl ? (
                      <img
                        src={ev.imageUrl}
                        alt={ev.title}
                        className="event-feed-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="event-feed-placeholder">
                        <ImageIcon size={36} />
                        <span>Elevate Event</span>
                      </div>
                    )}
                    <div className="event-badge-overlay">
                      <span className={`status-pill pill-${activeTab}`}>
                        {activeTab === 'ongoing' ? '🔴 Happening Today' : activeTab === 'upcoming' ? '⚡ Upcoming' : '✓ Concluded'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="event-feed-body">
                    <div className="event-feed-meta">
                      <span className="event-date-chip">
                        <CalendarDays size={13} />
                        <span>{formattedDate}</span>
                      </span>
                    </div>

                    <h3 className="event-feed-title">{ev.title}</h3>

                    <p className="event-feed-description">
                      {ev.description || 'Join us for this exciting collaborative tech session, hands-on sprints, and networking.'}
                    </p>

                    <div className="event-feed-footer">
                      {activeTab === 'upcoming' || activeTab === 'ongoing' ? (
                        <a
                          href="https://discord.com"
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary event-cta-btn"
                        >
                          <span>Register & Join</span>
                          <ArrowRight size={14} />
                        </a>
                      ) : (
                        <div className="event-concluded-text">
                          <span>Archive Record</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
