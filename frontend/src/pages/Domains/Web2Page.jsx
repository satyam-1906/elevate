import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutTemplate, Server, Database, Activity, Code2, ArrowUpRight } from 'lucide-react';
import './Web2Page.css';

export default function Web2Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="web2-page">
      {/* Abstract Background Grid */}
      <div className="web2-bg-grid" />
      
      {/* ── HERO SECTION ── */}
      <section className="web2-hero">
        <div className="web2-hero-content">
          <div className="web2-hero-left">
            <div className="web2-badge">// ELEVATE / DOMAINS / WEB2</div>
            <h1 className="web2-hero-title">
              <span className="build-text">BUILD.</span><br />
              <span className="ship-text">SHIP.</span><br />
              <span className="scale-text">SCALE.</span>
            </h1>
            <p className="web2-hero-desc">
              The Web2 domain at Elevate is where real production systems are born. We ship apps used by thousands, build APIs that scale, and do it with craft.
            </p>
            <div className="web2-hero-ctas">
              <Link to="/join" className="btn btn-primary btn-join-domain">
                Join Domain <ArrowRight size={16} />
              </Link>
              <a href="#projects" className="btn btn-outline btn-view-projects">
                <span className="live-dot" /> View Projects
              </a>
            </div>
          </div>

          <div className="web2-hero-right">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="mac-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="terminal-title">elevate ~ web2</div>
              </div>
              <div className="terminal-body">
                <div className="term-line">
                  <span className="prompt">$</span> <span className="cmd">npm run dev</span>
                </div>
                <div className="term-line success">
                  <span className="check">✓</span> server running on :3000
                </div>
                <div className="term-line mt-4">
                  <span className="prompt">$</span> <span className="cmd">npx prisma migrate dev</span>
                </div>
              </div>
              <div className="terminal-footer">
                <div className="branch"><span className="live-dot" /> main</div>
                <div className="stack">TypeScript · Node 20 LTS · PostgreSQL 16</div>
                <div className="encoding">UTF-8</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR & TICKER ── */}
      <section className="web2-stats-banner">
        <div className="stats-row">
          <div className="stat-pill"><strong>28+</strong> Members</div>
          <div className="stat-pill"><strong>14</strong> Projects</div>
          <div className="stat-pill"><strong>4</strong> Leads</div>
          <div className="scroll-indicator">SCROLL <div className="scroll-line" /></div>
        </div>
        <div className="tech-marquee-wrapper">
          <div className="tech-marquee">
            <span>◆ TYPESCRIPT</span>
            <span>◆ NEXT.JS</span>
            <span>◆ EXPRESS</span>
            <span>◆ POSTGRESQL</span>
            <span>◆ MONGODB</span>
            <span>◆ REDIS</span>
            <span>◆ GRAPHQL</span>
            <span>◆ TYPESCRIPT</span>
            <span>◆ NEXT.JS</span>
            <span>◆ EXPRESS</span>
            <span>◆ POSTGRESQL</span>
            <span>◆ MONGODB</span>
            <span>◆ REDIS</span>
            <span>◆ GRAPHQL</span>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="web2-section">
        <div className="section-header">
          <div className="web2-badge">// DOMAIN_PILLARS</div>
          <div className="header-split">
            <h2>What We Build</h2>
            <p className="header-desc">Four verticals. One domain. Real systems that run in production and serve real people.</p>
          </div>
        </div>
        
        <div className="pillars-grid">
          <div className="pillar-card glass">
            <div className="pillar-icon" style={{ color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <LayoutTemplate size={24} />
            </div>
            <h3>Frontend</h3>
            <p>React, Next.js, Tailwind — pixel-perfect interfaces that ship fast.</p>
            <div className="active-members" style={{ color: '#3b82f6' }}>6 active members</div>
          </div>
          
          <div className="pillar-card glass">
            <div className="pillar-icon" style={{ color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.2)' }}>
              <Server size={24} />
            </div>
            <h3>Backend</h3>
            <p>Node.js, Express, REST & GraphQL — APIs that power real products.</p>
            <div className="active-members" style={{ color: '#a855f7' }}>5 active members</div>
          </div>
          
          <div className="pillar-card glass">
            <div className="pillar-icon" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <Database size={24} />
            </div>
            <h3>Databases</h3>
            <p>PostgreSQL, MongoDB, Redis — model, query, and cache like a pro.</p>
            <div className="active-members" style={{ color: '#10b981' }}>4 active members</div>
          </div>
          
          <div className="pillar-card glass">
            <div className="pillar-icon" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
              <Activity size={24} />
            </div>
            <h3>Real-time</h3>
            <p>WebSockets, SSE, polling — apps that feel alive and instant.</p>
            <div className="active-members" style={{ color: '#f59e0b' }}>3 active members</div>
          </div>
        </div>
      </section>

      {/* ── OUR TOOLS ── */}
      <section className="web2-section tools-section">
        <div className="section-header tools-header">
          <div>
            <div className="web2-badge">// TECH_STACK</div>
            <h2>Our Tools</h2>
          </div>
          <div className="tools-legend">proficiency ▶ depth</div>
        </div>

        <div className="tools-grid">
          <ToolCard name="React" version="v18.3" category="UI" depth="95%" color="#3b82f6" />
          <ToolCard name="Next.js" version="v14" category="Fullstack" depth="90%" color="#e5e5e5" />
          <ToolCard name="Node.js" version="v20 LTS" category="Runtime" depth="88%" color="#10b981" />
          <ToolCard name="TypeScript" version="v5.4" category="Language" depth="92%" color="#2563eb" />
          <ToolCard name="Express" version="v4.18" category="Backend" depth="85%" color="#a3a3a3" />
          <ToolCard name="PostgreSQL" version="v16" category="Database" depth="82%" color="#0284c7" />
          <ToolCard name="MongoDB" version="v7" category="Database" depth="78%" color="#22c55e" />
          <ToolCard name="Redis" version="v7.2" category="Cache" depth="74%" color="#ef4444" />
        </div>
      </section>

      {/* ── THE MINDS BEHIND IT ── */}
      <section className="web2-section">
        <div className="web2-badge">// DOMAIN_LEADS</div>
        <div className="header-split">
          <h2>The Minds Behind It</h2>
          <p className="header-desc">Every line of production code has a person behind it who cares deeply.</p>
        </div>

        <div className="leads-grid">
          <LeadCard initials="AM" name="Aryan Mehta" role="Domain Lead" tags="Full Stack · API Design" color1="#0ea5e9" color2="#2563eb" isMain />
          <LeadCard initials="PS" name="Priya Sharma" role="Frontend Lead" tags="React · Design Systems" color1="#a855f7" color2="#7c3aed" />
          <LeadCard initials="RD" name="Rohan Das" role="Backend Lead" tags="Node.js · Databases" color1="#10b981" color2="#059669" />
          <LeadCard initials="NK" name="Neha Kulkarni" role="Database Lead" tags="PostgreSQL · MongoDB · Redis" color1="#f43f5e" color2="#be123c" />
        </div>
      </section>
    </div>
  );
}

function ToolCard({ name, version, category, depth, color }) {
  return (
    <div className="tool-card">
      <div className="tool-card-top">
        <h3 className="tool-name">{name}</h3>
        <span className="tool-version" style={{ color }}>{version}</span>
      </div>
      <p className="tool-category" style={{ color }}>{category}</p>
      <div className="tool-depth-wrapper">
        <div className="depth-labels">
          <span>depth</span>
          <span style={{ color }}>{depth}</span>
        </div>
        <div className="depth-bar-bg">
          <div className="depth-bar-fill" style={{ width: depth, backgroundColor: color }} />
        </div>
      </div>
    </div>
  );
}

function LeadCard({ initials, name, role, tags, color1, color2, isMain }) {
  return (
    <div className="lead-card glass">
      {isMain && (
        <div className="lead-star">
          <Code2 size={12} color="#fff" />
        </div>
      )}
      <div className="avatar-wrapper">
        <div className="lead-avatar" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}>
          {initials}
        </div>
      </div>
      <h3 className="lead-name">{name}</h3>
      <p className="lead-role" style={{ color: color1 }}>{role}</p>
      <p className="lead-tags">{tags}</p>
    </div>
  );
}
