import { Trophy, Users, Globe, Flag, Sparkles, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SpeedingText from './SpeedingText';
import './Legacy.css';

const milestones = [
  {
    year: '2021',
    title: 'Genesis & Inception',
    desc: 'Founded by 15 student engineers aiming to build production-grade open source software.',
    Icon: Flag
  },
  {
    year: '2022',
    title: 'National Hackathon Champions',
    desc: 'Secured #1 positions across 8 national hackathons and built flagship open tools.',
    Icon: Trophy
  },
  {
    year: '2023',
    title: 'Scaled to 500+ Pioneers',
    desc: 'Expanded into 6 dedicated engineering tracks with structured alumni mentorship.',
    Icon: Users
  },
  {
    year: '2024',
    title: 'Global Tech Collaborations',
    desc: 'Partnered with international web3 & AI protocols for developer grants and scholarships.',
    Icon: Globe
  }
];

export default function Legacy() {
  return (
    <section id="legacy" className="section legacy-section">
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">
            <Sparkles size={13} />
            <span>Our Journey</span>
          </span>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={3}
            blurStrength={5}
            containerClassName="legacy-scroll-reveal"
          >
            Built on a foundation of technical excellence.
          </ScrollReveal>
          <p className="section-subtitle mx-auto">
            Since our inception, Elevate has served as the launchpad for engineers now working at 
            top tier tech companies, high-growth startups, and leading research institutions.
          </p>
        </div>

        {/* Milestone Grid */}
        <div className="legacy-grid">
          {milestones.map(({ year, title, desc, Icon }, index) => (
            <div className="legacy-card card" key={year}>
              <div className="lc-top">
                <span className="legacy-year gradient-text">
                  <SpeedingText text={year} delay={0.15 * index} />
                </span>
                <div className="lc-icon">
                  <Icon size={20} />
                </div>
              </div>
              <h4 className="lc-title">{title}</h4>
              <p className="lc-desc">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a href="#join" className="btn btn-primary">
            <span>Become Part of History</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
