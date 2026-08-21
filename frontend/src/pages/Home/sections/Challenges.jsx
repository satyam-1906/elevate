import { Trophy, ArrowRight, Sparkles, Check } from 'lucide-react';
import ScrollReveal from '../../../components/motion/ScrollReveal';
import SpeedingText from '../../../components/motion/SpeedingText';
import './Challenges.css';

const leaderboard = [
  { rank: 1, name: 'Alex Rivera', handle: '@arivera', score: '3,450', badge: 'Grandmaster' },
  { rank: 2, name: 'Priya Sharma', handle: '@psharma', score: '3,210', badge: 'Master' },
  { rank: 3, name: 'Marcus Vance', handle: '@mvance', score: '2,980', badge: 'Diamond' },
  { rank: 4, name: 'Elena Rostova', handle: '@erostova', score: '2,740', badge: 'Platinum' }
];

export default function Challenges() {
  return (
    <section id="challenges" className="section challenges-section">
      <div className="container">
        <div className="bento-grid challenges-bento">
          
          {/* Left Bento Text */}
          <div className="bento-col-12 bento-item-challenges-info card">
            <span className="section-tag">
              <Sparkles size={13} />
              <span>Competitive Arenas</span>
            </span>

            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={5}
              containerClassName="challenges-scroll-reveal"
            >
              Test your skills. Earn recognition and bounties.
            </ScrollReveal>

            <p className="section-subtitle">
              Compete in monthly algorithmic contests, security CTFs, and design sprints. 
              Climb the global leaderboards and earn exclusive grants, swag, and internship referrals.
            </p>

            <div className="challenges-features">
              <div className="c-feature">
                <div className="c-check-wrap">
                  <Check size={14} className="c-check" />
                </div>
                <span>Monthly Algorithmic & Systems Contests</span>
              </div>
              <div className="c-feature">
                <div className="c-check-wrap">
                  <Check size={14} className="c-check" />
                </div>
                <span>Cyber Security Capture-The-Flag (CTF) Sprints</span>
              </div>
              <div className="c-feature">
                <div className="c-check-wrap">
                  <Check size={14} className="c-check" />
                </div>
                <span>Decentralized dApp & AI Model Bounties</span>
              </div>
            </div>

            <a href="#challenges" className="btn btn-primary mt-8">
              <span>Enter Active Arena</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Right Leaderboard Card */}
          <div className="bento-col-12 bento-item-leaderboard">
            <div className="leaderboard-card card">
              
              <div className="lb-header">
                <div className="lb-title-box">
                  <Trophy size={18} className="text-warning" />
                  <span className="lb-title">Global Arena Leaderboard</span>
                </div>
                <span className="lb-season-tag">Season 4</span>
              </div>

              <div className="lb-list">
                {leaderboard.map((user, index) => (
                  <div className={`lb-item rank-${user.rank}`} key={user.rank}>
                    <div className="lb-rank">#{user.rank}</div>
                    <div className="lb-user-info">
                      <div className="lb-avatar-letter">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="lb-name">{user.name}</div>
                        <div className="lb-handle">{user.handle}</div>
                      </div>
                    </div>
                    <div className="lb-meta">
                      <span className="lb-score">
                        <SpeedingText text={user.score} delay={0.2 + index * 0.1} /> <small>pts</small>
                      </span>
                      <span className="lb-badge">{user.badge}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
