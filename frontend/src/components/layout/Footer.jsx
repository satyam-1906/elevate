import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">

        {/* Links Grid */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="nav-logo-mark">
                <Sparkles size={16} />
              </div>
              <span className="nav-logo-text brand-font">Elevate</span>
            </div>
            <p className="footer-desc">
              The official technical platform of student pioneers, researchers, and software engineers.
            </p>
            <div className="social-links">
              {/* GitHub */}
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Discord */}
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Discord">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6h0a14.5 14.5 0 0 0-4-1.5 9.6 9.6 0 0 0-.5 1.2 13.5 13.5 0 0 0-4 0A9.6 9.6 0 0 0 9 4.5 14.5 14.5 0 0 0 5 6c-2.6 4-3.3 8-3 12a14.8 14.8 0 0 0 4.5 2.3c.4-.6.8-1.2 1.1-1.8a9.4 9.4 0 0 1-1.8-.9l.3-.3c3.4 1.6 7.2 1.6 10.6 0l.3.3a9.4 9.4 0 0 1-1.8.9c.4.6.7 1.2 1.1 1.8A14.8 14.8 0 0 0 22 18c.4-4.7-.6-8.7-3-12zM8.5 15.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-title">Technical Tracks</h4>
            <ul className="footer-list">
              <li><a href="/#domains">Web2 & Cloud</a></li>
              <li><a href="/#domains">Web3 & Protocols</a></li>
              <li><a href="/#domains">AI & Machine Learning</a></li>
              <li><a href="/#domains">Cyber Security</a></li>
              <li><a href="/#domains">App Engineering</a></li>
              <li><a href="/#domains">Open Source</a></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-list">
              <li><a href="/#knowledge">Roadmaps</a></li>
              <li><a href="/#knowledge">Technical Whitepapers</a></li>
              <li><a href="/#knowledge">Boilerplates</a></li>
              <li><a href="/#challenges">Leaderboards</a></li>
              <li><Link to="/events">Upcoming Sprints</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-list">
              <li><a href="/#about">About Us</a></li>
              <li><Link to="/legacy">Our Legacy</Link></li>
              <li><a href="/#sponsors">Industry Sponsors</a></li>
              <li><a href="/#contact">Contact Core Team</a></li>
              <li><a href="/#about">Code of Conduct</a></li>
            </ul>
          </div>
        </div>

        {/* Join CTA row (compact, inline with bottom bar) */}
        <div className="footer-join-row">
          <div className="footer-join-text">
            <span className="footer-join-label">Ready to Elevate?</span>
            <span className="footer-join-desc">Connect with mentors and build breakthrough software.</span>
          </div>
          <a href="https://discord.com" target="_blank" rel="noreferrer" className="btn btn-primary" id="footer-join-btn">
            <span>Join Discord</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Elevate Club. Built for Technical Pioneers.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
