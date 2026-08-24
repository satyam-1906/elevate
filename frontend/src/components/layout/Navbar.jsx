import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Smartphone, 
  GitBranch, 
  Compass, 
  BookOpen, 
  Trophy,
  ChevronDown,
  ArrowRight,
  LogIn,
  LogOut,
  LayoutDashboard,
  User
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const navItems = [
  {
    label: 'Domains',
    href: '#domains',
    dropdown: [
      { Icon: Globe, title: 'Web2', desc: 'Full-stack web & scalable cloud architecture' },
      { Icon: Layers, title: 'Web3', desc: 'Blockchain protocols & smart contracts' },
      { Icon: Cpu, title: 'AI / ML', desc: 'Neural networks, LLMs & computer vision' },
      { Icon: ShieldCheck, title: 'Cyber Security', desc: 'Penetration testing & cryptography' },
      { Icon: Smartphone, title: 'App Dev', desc: 'Cross-platform iOS & Android engineering' },
      { Icon: GitBranch, title: 'Open Source', desc: 'Collaborative development & tooling' },
    ],
  },
  { label: 'Legacy', href: '/legacy', isRoute: true },
  { label: 'Teams', href: '/teams', isRoute: true },
  { label: 'Events', href: '#events' },
  { label: 'Sponsors', href: '#sponsors' },
  {
    label: 'Knowledge Hub',
    href: '#knowledge',
    dropdown: [
      { Icon: Compass, title: 'Roadmaps', desc: 'Structured zero-to-hero curriculum' },
      { Icon: BookOpen, title: 'Tutorials', desc: 'In-depth engineering write-ups' },
      { Icon: Trophy, title: 'Challenges', desc: 'Compete on leaderboards & win bounties' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const timerRef = useRef(null);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); setUserMenuOpen(false); };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const openDrop = (label) => { 
    clearTimeout(timerRef.current); 
    setActiveDropdown(label); 
  };
  
  const closeDrop = () => { 
    timerRef.current = setTimeout(() => setActiveDropdown(null), 140); 
  };

  return (
    <>
      {/* Top Ambient Glow behind Navbar (Flowbase Image 2) */}
      <div className="nav-bloom" aria-hidden="true" />

      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className={`navbar-pill ${mobileOpen ? 'mobile-open' : ''}`}>

          {/* Logo with Space Grotesk font */}
          <a href="/" className="nav-logo">
            <img src="/logo.jpg" alt="Elevate Logo" className="nav-logo-img" />
            <span className="nav-logo-text brand-font">Elevate</span>
          </a>

          {/* Nav Links */}
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map(item => (
              <div
                key={item.label}
                className="nav-item"
                onMouseEnter={() => item.dropdown && openDrop(item.label)}
                onMouseLeave={closeDrop}
              >
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className={`nav-link ${activeDropdown === item.label ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`nav-link ${activeDropdown === item.label ? 'active' : ''}`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        size={14}
                        className={`nav-caret ${activeDropdown === item.label ? 'open' : ''}`}
                      />
                    )}
                  </a>
                )}

                {/* Dropdown Card */}
                {item.dropdown && (
                  <div
                    className={`nav-dropdown ${activeDropdown === item.label ? 'open' : ''}`}
                    onMouseEnter={() => openDrop(item.label)}
                    onMouseLeave={closeDrop}
                  >
                    <div className="dropdown-card glass">
                      {item.dropdown.map(({ Icon, title, desc }) => (
                        <a key={title} href={`#${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="drop-item">
                          <div className="drop-item-icon-wrapper">
                            <Icon size={17} className="drop-icon" />
                          </div>
                          <div>
                            <div className="drop-item-title">{title}</div>
                            <div className="drop-item-desc">{desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            <ThemeToggle />

            {/* Auth button */}
            {user ? (
              <div className="nav-user-menu">
                <button className="nav-user-btn" onClick={() => setUserMenuOpen(o => !o)}>
                  <img src={user.picture || '/logo.jpg'} alt={user.name} className="nav-user-avatar" />
                  <span className="nav-user-name">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={13} className={userMenuOpen ? 'open' : ''} />
                </button>
                {userMenuOpen && (
                  <div className="nav-user-dropdown glass">
                    {isAdmin && (
                      <Link to="/admin/dashboard" className="user-drop-item" onClick={() => setUserMenuOpen(false)}>
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                    )}
                    <button className="user-drop-item danger" onClick={handleLogout}>
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login/student" className="btn btn-primary nav-cta-btn" id="login-btn">
                <LogIn size={14} />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              className="hamburger-btn"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className={`ham ${mobileOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`mobile-nav glass ${mobileOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <div key={item.label} className="mob-section">
              {item.isRoute ? (
                <Link to={item.href} className="mob-link" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} className="mob-link" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              )}
              {item.dropdown && (
                <div className="mob-sub">
                  {item.dropdown.map(({ Icon, title }) => (
                    <a key={title} href="#" className="mob-sub-link" onClick={() => setMobileOpen(false)}>
                      <Icon size={14} />
                      <span>{title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="#join" className="btn btn-primary mob-cta" onClick={() => setMobileOpen(false)}>
            <span>Join Community</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </header>
    </>
  );
}
