import { Compass, BookOpen, Code2, ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Knowledge.css';

const resources = [
  {
    Icon: Compass,
    title: 'Zero-to-Hero Roadmaps',
    desc: 'Structured curricula curated by staff engineers to take you from foundational basics to building production architecture.',
    linkText: 'Explore Curricula',
    bentoClass: 'bento-col-4'
  },
  {
    Icon: BookOpen,
    title: 'Engineering Deep-Dives',
    desc: 'Articles on distributed systems, zero-knowledge circuits, model quantization, and kernel-level network security.',
    linkText: 'Read Publications',
    bentoClass: 'bento-col-4'
  },
  {
    Icon: Code2,
    title: 'Open Source Boilerplates',
    desc: 'Boilerplates, CI/CD templates, and reference repos to kickstart high-performance software projects.',
    linkText: 'Browse Templates',
    bentoClass: 'bento-col-4'
  }
];

export default function Knowledge() {
  return (
    <section id="knowledge" className="section knowledge-section">
      <div className="container">
        
        <div className="text-center mb-12">
          <span className="section-tag">
            <Sparkles size={13} />
            <span>Open Repository</span>
          </span>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={3}
            blurStrength={5}
            containerClassName="knowledge-scroll-reveal"
          >
            Knowledge hub and open resources.
          </ScrollReveal>
          <p className="section-subtitle mx-auto">
            Access our open-source collection of engineering roadmaps, technical whitepapers, 
            and project boilerplates developed by the Elevate core team.
          </p>
        </div>

        <div className="bento-grid knowledge-bento">
          {resources.map(({ Icon, title, desc, linkText, bentoClass }) => (
            <div className={`card knowledge-card ${bentoClass}`} key={title}>
              <div className="k-icon-wrap">
                <Icon size={24} />
              </div>
              <h3 className="k-title">{title}</h3>
              <p className="k-desc">{desc}</p>
              <a href="#knowledge" className="k-link">
                <span>{linkText}</span>
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
