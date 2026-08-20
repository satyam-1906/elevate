import { Users, Calendar, Award, Terminal, Play, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import SpeedingText from './SpeedingText';
import ScrollReveal from './ScrollReveal';
import './About.css';

const codeSnippets = {
  'elevate.config.ts': `// Elevate Club — Core Architecture
import { defineCommunity } from '@elevate/core';

export default defineCommunity({
  name: 'Elevate',
  mission: 'Empowering next-gen technical pioneers',
  domains: ['Web2', 'Web3', 'AI/ML', 'CyberSec', 'AppDev', 'OpenSource'],
  initiatives: {
    hackathons: 'Bi-annual global sprints',
    mentorship: '1-on-1 industry engineering leads',
    projects: 'Production-ready open source software'
  },
  joinStatus: 'Applications Open for 2024 cohort'
});`,
  'community.ts': `// Elevate Community Engine
import { Member, Domain } from '@elevate/types';

export async function onboardPioneer(member: Member): Promise<void> {
  const track = await Domain.match(member.interest);
  await track.assignMentor({ tier: 'Senior Engineer' });
  await track.enrollInWorkshop('Zero-To-Production');
  console.log(\`🚀 Welcome \${member.name} to Elevate \${track.name}!\`);
}`,
  'deploy.sh': `#!/bin/bash
# Elevate Pipeline Deployment
echo "⚡ Building Elevate flagship projects..."
pnpm build --filter="./domains/*"
echo "🛡️ Running security audits & test suites..."
pnpm test --coverage
echo "✨ Deploying to decentralized edge network..."
echo "✅ Deployment Successful: elevate.community is LIVE!"`
};

import { useState } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('elevate.config.ts');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Compiling and executing...');
    setTimeout(() => {
      if (activeTab === 'elevate.config.ts') {
        setOutput('✔ elevate.config.ts validated.\n✔ 6 Technical Tracks Loaded.\n✔ Ready to launch!');
      } else if (activeTab === 'community.ts') {
        setOutput('✔ Member: Alex Rivera\n✔ Matched Track: AI / Machine Learning\n🚀 Welcome Alex to Elevate AI / ML track!');
      } else {
        setOutput('⚡ Building Elevate flagship projects...\n🛡️ Security audits: 0 vulnerabilities.\n✨ Deployed to production edge nodes.\n✅ elevate.community is LIVE!');
      }
      setIsRunning(false);
    }, 750);
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          
          {/* Left Column: Info & Stats */}
          <div className="about-info">
            <span className="section-tag">
              <Sparkles size={13} />
              <span>About Elevate</span>
            </span>

            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={5}
              containerClassName="about-scroll-reveal"
            >
              More than a club. A launchpad for tech leaders.
            </ScrollReveal>

            <p className="section-subtitle">
              Elevate is a high-velocity technical community bridging the gap between academic theory 
              and real-world production engineering. We foster a culture of deep technical mastery, 
              peer learning, and open-source contribution.
            </p>

            {/* Stats Cards Row */}
            <div className="stats-container">
              <div className="stat-box card">
                <div className="stat-icon-wrap">
                  <Award size={20} className="stat-icon" />
                </div>
                <div className="stat-value gradient-text">
                  <SpeedingText text="6+" delay={0.1} />
                </div>
                <div className="stat-label">Specialized Tracks</div>
              </div>

              <div className="stat-box card">
                <div className="stat-icon-wrap">
                  <Calendar size={20} className="stat-icon" />
                </div>
                <div className="stat-value gradient-text">
                  <SpeedingText text="50+" delay={0.25} />
                </div>
                <div className="stat-label">Annual Sprints</div>
              </div>

              <div className="stat-box card">
                <div className="stat-icon-wrap">
                  <Users size={20} className="stat-icon" />
                </div>
                <div className="stat-value gradient-text">
                  <SpeedingText text="500+" delay={0.4} />
                </div>
                <div className="stat-label">Active Engineers</div>
              </div>
            </div>

            <div className="about-cta-wrap">
              <a href="#domains" className="btn btn-outline">
                <span>Discover All Tracks</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal */}
          <div className="about-terminal-wrap">
            <div className="code-terminal card">
              
              {/* Terminal Window Header */}
              <div className="terminal-header">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>

                {/* Tabs */}
                <div className="terminal-tabs">
                  {Object.keys(codeSnippets).map(filename => (
                    <button
                      key={filename}
                      className={`tab-btn ${activeTab === filename ? 'active' : ''}`}
                      onClick={() => { setActiveTab(filename); setOutput(null); }}
                    >
                      <Terminal size={12} />
                      <span>{filename}</span>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="terminal-actions">
                  <button 
                    className={`terminal-action-btn run-btn ${isRunning ? 'running' : ''}`}
                    onClick={handleRun}
                    title="Run code snippet"
                  >
                    <Play size={11} />
                    <span>Run</span>
                  </button>
                  <button 
                    className="terminal-action-btn copy-btn"
                    onClick={handleCopy}
                    title="Copy code"
                  >
                    {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              {/* Code Body */}
              <div className="terminal-body">
                <pre className="code-content">
                  <code>{codeSnippets[activeTab]}</code>
                </pre>

                {output && (
                  <div className="terminal-console">
                    <div className="console-header">
                      <span className="console-label">Execution Console</span>
                      <button className="console-clear" onClick={() => setOutput(null)}>clear</button>
                    </div>
                    <pre className="console-text">{output}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
