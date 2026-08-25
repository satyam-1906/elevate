import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GitMerge, Box, BookOpen, Settings, Code2, GitCommit, GitPullRequest, Terminal } from 'lucide-react';
import './OpenSourcePage.css';

export default function OpenSourcePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="os-page">
      {/* Abstract Background Grid */}
      <div className="os-bg-grid" />
      
      {/* ── HERO SECTION ── */}
      <section className="os-hero">
        <div className="os-hero-content">
          <div className="os-hero-left">
            <div className="os-badge">
              <span className="live-dot green" /> ELEVATE / DOMAINS / OPEN_SOURCE
            </div>
            <h1 className="os-hero-title">
              <span className="fork-text">FORK.</span><br />
              <span className="build-text">BUILD.</span><br />
              <span className="merge-text">MERGE.</span>
            </h1>
            <p className="os-hero-desc">
              The Open Source domain at Elevate is where code lives in the open. We maintain libraries, ship tools to npm, and contribute to projects used by millions.
            </p>
            <div className="os-hero-ctas">
              <Link to="/join" className="btn btn-primary btn-join-os">
                Join Domain <ArrowRight size={16} />
              </Link>
              <a href="https://github.com/elevate-iiitn" target="_blank" rel="noreferrer" className="btn btn-outline btn-view-repos">
                <GitPullRequest size={16} /> View Repos
              </a>
            </div>
          </div>

          <div className="os-hero-right">
            <div className="terminal-window os-terminal">
              <div className="terminal-header">
                <div className="mac-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="terminal-title">elevate ~ open-source</div>
              </div>
              <div className="terminal-body">
                <div className="term-line">
                  <span className="prompt">$</span> <span className="cmd">git clone elevate/devCLI</span>
                </div>
                <div className="term-line success mt-4">
                  <span className="check">✓</span> cloned in 0.4s
                </div>
              </div>
              <div className="terminal-footer">
                <div className="branch"><span className="live-dot green" /> main</div>
                <div className="stack">git v2.44 · gh CLI · npm v10</div>
                <div className="encoding">UTF-8</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR & TICKER ── */}
      <section className="os-stats-banner">
        <div className="stats-row">
          <div className="stat-pill"><strong>32+</strong> Members</div>
          <div className="stat-pill"><strong>6</strong> Packages</div>
          <div className="stat-pill"><strong>1.2k+</strong> Stars</div>
          <div className="scroll-indicator">SCROLL <div className="scroll-line green" /></div>
        </div>
        <div className="tech-marquee-wrapper">
          <div className="tech-marquee os-marquee">
            <span>⑂ OPEN SOURCE</span>
            <span>⑂ PULL REQUESTS</span>
            <span>⑂ NPM PACKAGES</span>
            <span>⑂ GITHUB ACTIONS</span>
            <span>⑂ SEMANTIC VERSIONING</span>
            <span>⑂ OPEN SOURCE</span>
            <span>⑂ PULL REQUESTS</span>
            <span>⑂ NPM PACKAGES</span>
            <span>⑂ GITHUB ACTIONS</span>
            <span>⑂ SEMANTIC VERSIONING</span>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="os-section">
        <div className="section-header">
          <div className="os-badge">// DOMAIN_PILLARS</div>
          <div className="header-split">
            <h2>What We Do</h2>
            <p className="header-desc">Open source is a craft. We treat every PR, README, and release with the same care as production code.</p>
          </div>
        </div>
        
        <div className="pillars-grid">
          <div className="pillar-card glass os-card">
            <div className="pillar-icon">
              <GitMerge size={24} />
            </div>
            <h3>Contributing</h3>
            <p>Send PRs to real open source projects. Learn how the best codebases are built.</p>
          </div>
          
          <div className="pillar-card glass os-card">
            <div className="pillar-icon">
              <Box size={24} />
            </div>
            <h3>Maintaining</h3>
            <p>Own and maintain club-published packages — issues, releases, changelogs.</p>
          </div>
          
          <div className="pillar-card glass os-card">
            <div className="pillar-icon">
              <BookOpen size={24} />
            </div>
            <h3>Documentation</h3>
            <p>Write READMEs, guides, and API docs that actually help people.</p>
          </div>
          
          <div className="pillar-card glass os-card">
            <div className="pillar-icon">
              <Settings size={24} />
            </div>
            <h3>Automation</h3>
            <p>CI pipelines, release bots, and GitHub Actions that keep quality high.</p>
          </div>
        </div>
      </section>

      {/* ── YOUR FIRST PR (TIMELINE) ── */}
      <section className="os-section">
        <div className="os-badge">// HOW_IT_WORKS</div>
        <h2>Your First PR</h2>
        
        <div className="pr-timeline">
          <div className="timeline-line" />
          
          <div className="timeline-step">
            <div className="step-circle active">01</div>
            <h3 className="step-title">Pick an Issue</h3>
            <p className="step-time">Day 1</p>
            <div className="step-pills">
              <span className="pill">good first issue</span>
              <span className="pill">help wanted</span>
              <span className="pill">bug</span>
            </div>
          </div>

          <div className="timeline-step">
            <div className="step-circle">02</div>
            <h3 className="step-title">Fork & Branch</h3>
            <p className="step-time">Day 1–2</p>
            <div className="step-pills">
              <span className="pill">git fork</span>
              <span className="pill">git checkout -b</span>
              <span className="pill">git clone</span>
            </div>
          </div>

          <div className="timeline-step">
            <div className="step-circle">03</div>
            <h3 className="step-title">Code & Commit</h3>
            <p className="step-time">Day 2–5</p>
            <div className="step-pills">
              <span className="pill">conventional commits</span>
              <span className="pill">tests</span>
              <span className="pill">lint</span>
            </div>
          </div>

          <div className="timeline-step">
            <div className="step-circle">04</div>
            <h3 className="step-title">Open a PR</h3>
            <p className="step-time">Day 5–7</p>
            <div className="step-pills">
              <span className="pill">PR template</span>
              <span className="pill">code review</span>
              <span className="pill">merge</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR TOOLS ── */}
      <section className="os-section tools-section">
        <div className="section-header tools-header">
          <div>
            <div className="os-badge">// TOOLS_WE_MASTER</div>
            <h2>Our Tools</h2>
          </div>
          <div className="tools-legend">proficiency ▶ depth</div>
        </div>

        <div className="tools-grid os-tools">
          <ToolCard name="Git" version="v2.44" category="VCS" depth="98%" />
          <ToolCard name="GitHub" version="CLI + API" category="Platform" depth="95%" />
          <ToolCard name="GitHub Actions" version="v4" category="CI/CD" depth="90%" />
          <ToolCard name="Linux" version="Kernel 6.x" category="OS" depth="85%" />
        </div>
      </section>

      {/* ── THE MAINTAINERS ── */}
      <section className="os-section">
        <div className="os-badge">// DOMAIN_LEADS</div>
        <div className="header-split">
          <h2>The Maintainers</h2>
          <p className="header-desc">People who review your PRs, approve releases, and keep the repos green.</p>
        </div>

        <div className="leads-grid">
          <LeadCard initials="KN" name="Kavya Nair" role="Domain Lead" tags="OSS Strategy · Maintainer" color1="#10b981" color2="#059669" isMain />
          <LeadCard initials="SR" name="Sidharth Rao" role="Library Lead" tags="npm · Package Design" color1="#06b6d4" color2="#0891b2" />
          <LeadCard initials="MJ" name="Meera Joshi" role="DevEx Lead" tags="Docs · DX · Contributing guides" color1="#84cc16" color2="#65a30d" />
          <LeadCard initials="AV" name="Aditya Verma" role="CI/CD Lead" tags="GitHub Actions · Automation" color1="#10b981" color2="#047857" />
        </div>
      </section>
    </div>
  );
}

function ToolCard({ name, version, category, depth }) {
  return (
    <div className="tool-card os-tool-card">
      <div className="tool-card-top">
        <h3 className="tool-name">{name}</h3>
        <span className="tool-version">{version}</span>
      </div>
      <p className="tool-category">{category}</p>
      <div className="tool-depth-wrapper">
        <div className="depth-labels">
          <span>depth</span>
          <span>{depth}</span>
        </div>
        <div className="depth-bar-bg">
          <div className="depth-bar-fill" style={{ width: depth }} />
        </div>
      </div>
    </div>
  );
}

function LeadCard({ initials, name, role, tags, color1, color2, isMain }) {
  return (
    <div className="lead-card glass os-lead">
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
