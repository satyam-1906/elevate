import { Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import StaggeredText from '../../../components/motion/StaggeredText';
import SpeedingText from '../../../components/motion/SpeedingText';
import './Events.css';

const upcomingEvents = [
  { 
    id: 1, 
    dateMonth: 'OCT', 
    dateDay: '15', 
    title: 'Web3 & Zero-Knowledge Hackathon', 
    type: 'Flagship Hackathon', 
    desc: '48-hour sprint building decentralized applications and cryptographic proofs with $5,000 in bounties.',
    location: 'Main Auditorium & Discord',
    time: '48 Hours'
  },
  { 
    id: 2, 
    dateMonth: 'OCT', 
    dateDay: '22', 
    title: 'Deploying Foundation Models at Edge', 
    type: 'Technical Workshop', 
    desc: 'Hands-on session quantizing LLMs with vLLM and deploying sub-second inference nodes.',
    location: 'Lab 4 & Streamed Live',
    time: '2:00 PM - 5:00 PM'
  },
  { 
    id: 3, 
    dateMonth: 'NOV', 
    dateDay: '05', 
    title: 'Elevate DevFest & Career Keynotes', 
    type: 'Annual Conference', 
    desc: 'Annual summit featuring engineering leads from global tech firms, project demos & networking.',
    location: 'Convention Center',
    time: 'Full Day Event'
  },
];

export default function Events() {
  return (
    <section id="events" className="section events-section">
      <div className="container">
        
        <div className="events-header">
          <div>
            <span className="section-tag">
              <Sparkles size={13} />
              <span>Calendar & Sprints</span>
            </span>
            <h2 className="section-title">
              <StaggeredText text="Upcoming sprints and workshops." />
            </h2>
          </div>
          <a href="#events" className="btn btn-outline">
            <span>Explore All Sprints</span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="events-list">
          {upcomingEvents.map((event, i) => (
            <div key={event.id} className="event-row card">
              
              <div className="event-date">
                <span className="date-month">{event.dateMonth}</span>
                <span className="date-day">
                  <SpeedingText text={event.dateDay} delay={0.15 * i} />
                </span>
              </div>
              
              <div className="event-details">
                <span className="event-type">{event.type}</span>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-desc">{event.desc}</p>
                
                <div className="event-meta">
                  <span className="meta-item">
                    <MapPin size={13} />
                    <span>{event.location}</span>
                  </span>
                  <span className="meta-item">
                    <Clock size={13} />
                    <span>{event.time}</span>
                  </span>
                </div>
              </div>
              
              <div className="event-action">
                <button className="btn btn-primary">
                  <span>Register Free</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
