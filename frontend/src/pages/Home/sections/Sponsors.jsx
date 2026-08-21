import { Sparkles, ArrowRight, ShieldCheck, Zap, Server, Globe, Cpu, Layers, Star } from 'lucide-react';
import ScrollReveal from '../../../components/motion/ScrollReveal';
import './Sponsors.css';

// ─── Sponsor testimonials / partner cards ────────────────────────
const col1 = [
  {
    name: 'CloudScale Infra',
    role: 'Compute & Cloud Partner',
    Icon: Server,
    quote: 'Elevate engineers ship production-grade infrastructure at a pace that surprises even our senior architects.',
    person: 'Rohan Mehta',
    title: 'VP Engineering'
  },
  {
    name: 'Synapse AI Lab',
    role: 'Neural Research Grants',
    Icon: Cpu,
    quote: 'The model research coming out of Elevate is comparable to top-4 university programs. Outstanding caliber.',
    person: 'Dr. Priya Nair',
    title: 'Head of Applied Research'
  },
  {
    name: 'Global Tech Nexus',
    role: 'Career & Talent Network',
    Icon: Globe,
    quote: 'We actively recruit from Elevate. The graduates come ready — they already think in systems.',
    person: 'Lena Fischer',
    title: 'Engineering Talent Lead'
  },
  {
    name: 'CloudScale Infra',
    role: 'Compute & Cloud Partner',
    Icon: Server,
    quote: 'Their DevOps team ran our infra migration with zero downtime. Remarkable confidence under pressure.',
    person: 'Ali Hassan',
    title: 'CTO'
  },
];

const col2 = [
  {
    name: 'Veloce Security',
    role: 'Security & Audit Partner',
    Icon: ShieldCheck,
    quote: 'Elevate CTF teams find zero-days our pentest vendors miss. They\'re not students — they\'re adversaries.',
    person: 'Marcus Knight',
    title: 'Director of Red Team'
  },
  {
    name: 'HyperChain Network',
    role: 'Protocol & Grants Partner',
    Icon: Layers,
    quote: 'Three Elevate projects received protocol grants last year. Each shipped a working MVP within 90 days.',
    person: 'Sofia Alvarez',
    title: 'Protocol Grants Lead'
  },
  {
    name: 'DevFlow Systems',
    role: 'Tooling & CI Partner',
    Icon: Zap,
    quote: 'We integrated an Elevate open-source project into our main pipeline. The code quality was exceptional.',
    person: 'James Park',
    title: 'Staff Engineer'
  },
  {
    name: 'Synapse AI Lab',
    role: 'Neural Research Grants',
    Icon: Cpu,
    quote: 'Collaborating with Elevate on LLM fine-tuning was one of our best external partnerships of the year.',
    person: 'Aisha Patel',
    title: 'ML Research Lead'
  },
];

const col3 = [
  {
    name: 'DevFlow Systems',
    role: 'Tooling & CI Partner',
    Icon: Zap,
    quote: 'Elevate students contributed 40+ PRs to our open-source CLI in a single semester. Extraordinary.',
    person: 'Nikolai Voronov',
    title: 'Open Source Lead'
  },
  {
    name: 'HyperChain Network',
    role: 'Protocol & Grants Partner',
    Icon: Layers,
    quote: 'Their blockchain implementations had proper test coverage and audit trails from day one. Rare for student projects.',
    person: 'Carmen Rodriguez',
    title: 'Smart Contract Auditor'
  },
  {
    name: 'Veloce Security',
    role: 'Security & Audit Partner',
    Icon: ShieldCheck,
    quote: 'The security mindset across the entire Elevate community is what sets them apart from any other student org.',
    person: 'Tom Eriksson',
    title: 'Chief Security Officer'
  },
  {
    name: 'Global Tech Nexus',
    role: 'Career & Talent Network',
    Icon: Globe,
    quote: 'A dozen Elevate engineers joined our team this year. Every single one exceeded performance expectations.',
    person: 'Mei Lin',
    title: 'Engineering Manager'
  },
];

// ─── Single Card ────────────────────────────────────────────────
function SponsorCard({ name, role, Icon, quote, person, title }) {
  return (
    <div className="sp-card">
      <div className="sp-card-header">
        <div className="sp-icon-box">
          <Icon size={18} />
        </div>
        <div>
          <div className="sp-card-name">{name}</div>
          <div className="sp-card-role">{role}</div>
        </div>
      </div>

      <div className="sp-stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} fill="currentColor" />
        ))}
      </div>

      <blockquote className="sp-quote">"{quote}"</blockquote>

      <footer className="sp-card-footer">
        <div className="sp-avatar">{person.charAt(0)}</div>
        <div>
          <div className="sp-person-name">{person}</div>
          <div className="sp-person-title">{title}</div>
        </div>
      </footer>
    </div>
  );
}

// ─── Single Column infinite scroll ──────────────────────────────
function ScrollColumn({ cards, direction = 'up', duration = 30 }) {
  const doubled = [...cards, ...cards]; // duplicate for seamless loop
  return (
    <div className="sp-scroll-col-wrap">
      <div
        className={`sp-scroll-col ${direction === 'up' ? 'scroll-up' : 'scroll-down'}`}
        style={{ '--scroll-duration': `${duration}s` }}
      >
        {doubled.map((card, i) => (
          <SponsorCard key={`${card.name}-${i}`} {...card} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Sponsors Section ────────────────────────────────────────
export default function Sponsors() {
  return (
    <section id="sponsors" className="section sponsors-section">
      <div className="container">
        <div className="sponsors-layout">

          {/* Left sticky heading column */}
          <div className="sponsors-heading-col">
            <span className="section-tag">
              <Sparkles size={13} />
              <span>Industry Partners</span>
            </span>

            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={6}
              containerClassName="sponsors-scroll-reveal"
            >
              More trust from the tech industry.
            </ScrollReveal>

            <p className="sponsors-sub">
              Elevate is backed by leading technology organizations who provide cloud credits, 
              research grants, security audits, and career placements for our engineers.
            </p>

            <div className="sponsors-stats">
              <div className="sp-stat">
                <span className="sp-stat-num gradient-text">18+</span>
                <span className="sp-stat-label">Industry Partners</span>
              </div>
              <div className="sp-stat">
                <span className="sp-stat-num gradient-text">$50K+</span>
                <span className="sp-stat-label">Grants Awarded</span>
              </div>
            </div>

            <a href="#contact" className="btn btn-primary" id="partner-btn">
              <span>Become a Sponsor</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Right: 3-column infinite vertical scroll */}
          <div className="sponsors-marquee-cols">
            <ScrollColumn cards={col1} direction="up"   duration={32} />
            <ScrollColumn cards={col2} direction="down" duration={28} />
            <ScrollColumn cards={col3} direction="up"   duration={35} />
          </div>

        </div>
      </div>
    </section>
  );
}
