import { Link } from 'react-router-dom';
import { Compass, BookOpen, Code2, ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from '../../../components/motion/ScrollReveal';
import './Knowledge.css';

const resources = [
  {
    Icon: Compass,
    title: 'Curated Developer Roadmaps',
    desc: 'Step-by-step technical roadmaps for Full Stack, Backend, AI Engineering, DevOps, and Cyber Security.',
    linkText: 'Explore Roadmaps',
    href: '/knowledge-hub',
    bentoClass: 'bento-col-4'
  },
  {
    Icon: BookOpen,
    title: 'Domain Deep-Dives & Tutorials',
    desc: 'Handpicked documentation, university courses, and technical guides across Web2, Web3, AI/ML, and Security.',
    linkText: 'Browse Knowledge Hub',
    href: '/knowledge-hub',
    bentoClass: 'bento-col-4'
  },
  {
    Icon: Code2,
    title: 'Open Source Resources',
    desc: 'First contribution guides, open source repositories, and project boilerplates curated for Elevate members.',
    linkText: 'Explore Open Source',
    href: '/knowledge-hub?domain=Open%20Source',
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
          {resources.map(({ Icon, title, desc, linkText, href, bentoClass }) => (
            <div className={`card knowledge-card ${bentoClass}`} key={title}>
              <div className="k-icon-wrap">
                <Icon size={24} />
              </div>
              <h3 className="k-title">{title}</h3>
              <p className="k-desc">{desc}</p>
              <Link to={href} className="k-link">
                <span>{linkText}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
