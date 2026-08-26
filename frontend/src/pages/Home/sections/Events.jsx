import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import StaggeredText from '../../../components/motion/StaggeredText';
import SpeedingText from '../../../components/motion/SpeedingText';
import './Events.css';

const upcomingEvents = [
  { 
    id: 1, 
    dateMonth: 'AUG', 
    dateDay: '27', 
    title: 'Club Intro Session', 
    type: 'Orientation', 
    desc: 'Join us for the introductory session to know more about the club, our vision, and upcoming activities.',
    location: 'Seminar Hall',
    time: '5:00 PM'
  },
  { 
    id: 2, 
    dateMonth: 'AUG', 
    dateDay: '24', 
    title: 'Road to Devcon - Web3 Workshop Series', 
    type: 'Technical Workshop', 
    desc: '6-day hands-on workshop covering the journey from basics to smart contracts, tokens & NFTs.',
    location: 'Online',
    time: '10:00 PM (Daily until Aug 29th)'
  }
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
          <Link to="/events" className="btn btn-outline">
            <span>Explore All Sprints</span>
            <ArrowRight size={14} />
          </Link>
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
