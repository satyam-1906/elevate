import { 
  Globe, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Smartphone, 
  GitBranch, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import LogoLoop from '../../../components/motion/LogoLoop';
import StaggeredText from '../../../components/motion/StaggeredText';
import './Domains.css';

const domainsData = [
  {
    id: 'web2',
    name: 'Web2 & Cloud Architecture',
    Icon: Globe,
    desc: 'Engineering resilient, scalable full-stack web platforms, edge computing & distributed systems.',
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    color: '#3B82F6'
  },
  {
    id: 'web3',
    name: 'Web3 & Decentralized Protocols',
    Icon: Layers,
    desc: 'Building smart contracts, decentralized finance (DeFi), zero-knowledge proofs & tokenomics.',
    tech: ['Solidity', 'Ethereum', 'Ethers.js', 'Hardhat', 'IPFS', 'Rust'],
    color: '#8B5CF6'
  },
  {
    id: 'ai-ml',
    name: 'AI & Deep Learning',
    Icon: Cpu,
    desc: 'Training custom foundation models, autonomous agents, computer vision & LLM pipelines.',
    tech: ['PyTorch', 'TensorFlow', 'Python', 'LangChain', 'HuggingFace', 'CUDA'],
    color: '#06B6D4'
  },
  {
    id: 'cyber',
    name: 'Cyber Security & Forensics',
    Icon: ShieldCheck,
    desc: 'Red & Blue teaming, reverse engineering, penetration testing, cryptography & cloud security.',
    tech: ['Kali Linux', 'Wireshark', 'BurpSuite', 'Metasploit', 'Ghidra', 'OWASP'],
    color: '#10B981'
  },
  {
    id: 'app-dev',
    name: 'Mobile Systems Engineering',
    Icon: Smartphone,
    desc: 'Building high-performance native and cross-platform experiences for iOS and Android ecosystems.',
    tech: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Dart'],
    color: '#F59E0B'
  },
  {
    id: 'open-source',
    name: 'Open Source & DevTools',
    Icon: GitBranch,
    desc: 'Contributing to worldwide developer infrastructure, building CLI tools & open ecosystem software.',
    tech: ['Git', 'GitHub Actions', 'Go', 'Rust', 'Linux', 'DevOps'],
    color: '#EC4899'
  },
];

export default function Domains() {
  const renderDomainCard = (domain) => {
    const { Icon } = domain;
    return (
      <div className="domain-loop-card card" key={domain.id}>
        <div className="dl-top">
          <div className="dl-icon-box">
            <Icon size={24} className="dl-icon" />
          </div>
          <span className="dl-track-tag">Track</span>
        </div>

        <h3 className="dl-title">{domain.name}</h3>
        <p className="dl-desc">{domain.desc}</p>

        <div className="dl-tech-pills">
          {domain.tech.map(t => (
            <span key={t} className="dl-pill">{t}</span>
          ))}
        </div>

        <a href={`#${domain.id}`} className="dl-link">
          <span>Explore Track</span>
          <ArrowRight size={14} className="dl-arrow" />
        </a>
      </div>
    );
  };

  return (
    <section id="domains" className="section domains-section">
      <div className="container text-center mb-12">
        <span className="section-tag">
          <Sparkles size={13} />
          <span>Technical Tracks</span>
        </span>
        <h2 className="section-title">
          <StaggeredText text="Explore our specialized engineering tracks." />
        </h2>
        <p className="section-subtitle mx-auto">
          Choose from our specialized technical tracks. Deep dive into cutting-edge technologies 
          with peer learning, hands-on production code, and expert engineering leads.
        </p>
      </div>

      {/* Infinite Wide Loop Marquee (LogoLoop) */}
      <div className="domains-loop-container">
        <LogoLoop
          logos={domainsData}
          speed={36}
          direction="left"
          gap={24}
          hoverSpeed={0}
          fadeOut={true}
          renderItem={renderDomainCard}
          ariaLabel="Technical Domains Infinite Carousel"
        />
      </div>

      {/* Reverse direction second loop for richer immersion */}
      <div className="domains-loop-container mt-6">
        <LogoLoop
          logos={[...domainsData].reverse()}
          speed={32}
          direction="right"
          gap={24}
          hoverSpeed={0}
          fadeOut={true}
          renderItem={renderDomainCard}
          ariaLabel="Technical Domains Secondary Loop"
        />
      </div>
    </section>
  );
}
