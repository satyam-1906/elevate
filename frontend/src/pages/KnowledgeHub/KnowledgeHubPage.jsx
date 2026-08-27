import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  ExternalLink,
  Star,
  Tag,
  Globe,
  Layers,
  Cpu,
  ShieldCheck,
  Smartphone,
  GitBranch,
  FileText,
  User,
  Filter,
  ArrowRight,
  Quote,
  LayoutDashboard
} from 'lucide-react';
import StaggeredText from '../../components/motion/StaggeredText';
import { useAuth } from '../../context/AuthContext';
import ParticleBackground from '../../components/common/ParticleBackground';
import './KnowledgeHubPage.css';

export default function KnowledgeHubPage() {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(true);

  const initialDomain = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('domain') || 'All';
  }, [location.search]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDomain, setActiveDomain] = useState(initialDomain);
  const [activeDifficulty, setActiveDifficulty] = useState('All');

  const [quoteData, setQuoteData] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const domain = params.get('domain');
    if (domain) {
      setActiveDomain(domain);
    }
  }, [location.search]);

  const domains = ['All', 'Web2', 'Web3', 'AI/ML', 'Cyber Security', 'App Development', 'Open Source'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const quickRoles = [
    "Full Stack Developer",
    "Backend Engineer",
    "System Design",
    "AI Engineer",
    "Applied Scientist",
    "Cyber Security Developer",
    "Devops Developer"
  ];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/resources/all`)
      .then(res => res.json())
      .then(data => setResources(Array.isArray(data) ? data : data.resources || []))
      .catch(err => console.error('Failed to fetch resources:', err))
      .finally(() => setLoadingResources(false));
  }, []);

  const fetchQuote = () => {
    setLoadingQuote(true);
    const fallbackQuotes = [
      { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
      { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
      { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
      { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
      { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
      { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
      { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
      { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
      { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
      { text: "Make it work, make it right, make it fast.", author: "Kent Beck" }
    ];
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    setQuoteData(randomQuote);
    setLoadingQuote(false);
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      fetchQuote();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getDomainIcon = (domainName) => {
    switch(domainName) {
      case 'Web2': return <Globe size={14} />;
      case 'Web3': return <Layers size={14} />;
      case 'AI/ML': return <Cpu size={14} />;
      case 'Cyber Security': return <ShieldCheck size={14} />;
      case 'App Development': return <Smartphone size={14} />;
      case 'Open Source': return <GitBranch size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  const displayedResources = useMemo(() => {
    return resources.filter((res) => {
      // Normal users only see published resources. Admins can see all.
      if (!isAdmin && res.isPublished === false) return false;

      const title = res.title || '';
      const desc = res.description || '';
      const tags = res.tags || [];

      const matchesSearch = searchQuery === '' || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDomain = activeDomain === 'All' || res.domain === activeDomain;
      const resDiff = res.difficulty || '';
      const matchesDifficulty = activeDifficulty === 'All' || resDiff.includes(activeDifficulty);

      return matchesSearch && matchesDomain && matchesDifficulty;
    });
  }, [searchQuery, activeDomain, activeDifficulty, resources, isAdmin]);

  if (!user) {
    return (
      <div className="knowledge-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ParticleBackground count={26} intensity="medium" />
        <div className="knowledge-empty-card glass" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <ShieldCheck size={48} className="empty-icon" />
          <h2>Access Restricted</h2>
          <p>Please login to access the Knowledge Hub resources.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="knowledge-page">
      <ParticleBackground count={26} intensity="medium" />

      {/* Standard Knowledge Hub View */}
      <div className="container knowledge-page-container">
        <div className="knowledge-hero-header">
          <span className="section-tag">
            <BookOpen size={14} />
            <span>Curated Resource Library</span>
          </span>
          <h1 className="knowledge-main-title">
            <StaggeredText text="Elevate Knowledge Hub" />
          </h1>
          <p className="knowledge-main-desc">
            Explore highly curated, technical, and top-tier learning resources across multiple domains. Handpicked to accelerate your engineering journey.
          </p>

          {/* Admin Shortcut Banner */}
          {isAdmin && (
            <div className="events-admin-banner glass" style={{ marginTop: '24px' }}>
              <div className="events-admin-banner-left">
                <div className="admin-status-pill">
                  <ShieldCheck size={14} />
                  <span>Admin Clearance</span>
                </div>
                <span className="events-admin-banner-text">
                  Manage Knowledge Hub resources, tutorials, and content
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

        <div className="knowledge-quick-roles">
          <span className="quick-roles-label">Select Engineering Pathway:</span>
          <div className="quick-roles-grid">
            {quickRoles.map(role => {
              const isActive = searchQuery === role;
              return (
                <button 
                  key={role} 
                  className={`quick-role-btn ${isActive ? 'active' : ''}`} 
                  onClick={() => setSearchQuery(isActive ? '' : role)}
                >
                  <span>{role}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="knowledge-controls-bar glass">
          <div className="knowledge-search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="knowledge-search-input"
            />
          </div>

          <div className="knowledge-filters">
            <div className="filter-group">
              <Filter size={14} className="filter-icon" />
              <select 
                className="knowledge-select"
                value={activeDomain}
                onChange={(e) => setActiveDomain(e.target.value)}
              >
                {domains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            
            <div className="filter-group">
              <Filter size={14} className="filter-icon" />
              <select 
                className="knowledge-select"
                value={activeDifficulty}
                onChange={(e) => setActiveDifficulty(e.target.value)}
              >
                {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Developer Quote Banner */}
        <div className="developer-quote-banner glass">
          <div className="quote-badge">
            <Quote size={13} />
            <span>Developer Quote</span>
          </div>
          <div className="quote-text-container">
            {loadingQuote ? (
              <span className="quote-loading-text">Fetching inspirational code quote...</span>
            ) : quoteData ? (
              <p className="quote-body">
                "{quoteData.text}" <span className="quote-author">— {quoteData.author}</span>
              </p>
            ) : null}
          </div>
        </div>

        {loadingResources ? (
          <div className="knowledge-empty-card glass" style={{ padding: '40px' }}>
            <div className="quote-loading-text">Loading resources...</div>
          </div>
        ) : displayedResources.length === 0 ? (
          <div className="knowledge-empty-card glass">
            <FileText size={48} className="empty-icon" />
            <h3>No resources found</h3>
            <p>Try adjusting your search or filters to discover more resources.</p>
          </div>
        ) : (
          <div className="knowledge-grid-feed">
            {displayedResources.map((res) => (
              <article key={res._id || res.id} className="knowledge-feed-card card glass">
                <div className="knowledge-feed-body">
                  <div className="knowledge-feed-meta">
                    <span className="knowledge-domain-chip">
                      {getDomainIcon(res.domain)}
                      <span>{res.domain}</span>
                    </span>
                    {(res.category || res.type) && <span className="knowledge-type-chip">{res.category || res.type}</span>}
                    {res.difficulty && <span className="knowledge-difficulty-chip">{res.difficulty}</span>}
                    {!res.isPublished && isAdmin && <span className="knowledge-type-chip" style={{background: 'rgba(239,68,68,0.2)'}}>Draft</span>}
                  </div>

                  <h3 className="knowledge-feed-title">{res.title}</h3>
                  <p className="knowledge-feed-description">{res.description}</p>
                  
                  <div className="knowledge-details">
                    {(res.author || res.official) && (
                      <div className="detail-item">
                        <User size={13} /> <span>{res.author || 'Unknown'} {res.official && "(Official)"}</span>
                      </div>
                    )}
                    {res.rating && (
                      <div className="detail-item">
                        <Star size={13} /> <span>Elevate Rating: {res.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="knowledge-tags">
                    {(res.tags || []).map((tag, idx) => (
                      <span key={idx} className="knowledge-tag">
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="knowledge-feed-footer">
                    {res.url ? (
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary knowledge-cta-btn"
                      >
                        <span>Start Learning</span>
                        <ExternalLink size={14} />
                      </a>
                    ) : res.links && res.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${idx === 0 ? 'btn-primary' : 'btn-outline'} knowledge-cta-btn`}
                      >
                        <span>{link.label}</span>
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
