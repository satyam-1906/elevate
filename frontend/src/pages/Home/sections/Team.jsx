import React from 'react';
import ProfileCard from '../../../components/common/ProfileCard';
import { Users } from 'lucide-react';
import StaggeredText from '../../../components/motion/StaggeredText';
import './Team.css';

const codeIconUrl = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCIgeT0iMTIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjgwIiBmaWxsPSJ3aGl0ZSIgZm9udC13ZWlnaHQ9ImJvbGQiPiZsdDsvJmd0OzwvdGV4dD48L3N2Zz4=`;
const baseGradient = "linear-gradient(145deg, #101625 0%, #202b4d 100%)"; // Dark sleek background 

const teamData = {
  lead: {
    id: 1,
    name: 'Current Lead',
    title: 'Elevate Lead',
    handle: 'elevate_lead',
    status: 'Online',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop'
  },
  colead: {
    id: 2,
    name: 'Co-Lead',
    title: 'Elevate Co-Lead',
    handle: 'elevate_colead',
    status: 'Busy',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop'
  },
  nonTechLeads: [
    { id: 'nt1', name: 'Corporate Lead', title: 'Corporate Lead', handle: 'corporate', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=256&auto=format&fit=crop' },
    { id: 'nt2', name: 'Marketing & PR Lead', title: 'Marketing & PR Lead', handle: 'marketing_pr', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop' },
    { id: 'nt3', name: 'Design Lead', title: 'Design Lead', handle: 'design', status: 'Busy', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop' },
    { id: 'nt4', name: 'Head of Technical Ops', title: 'Head of Technical Operations', handle: 'tech_ops', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop' },
    { id: 'nt5', name: 'Head of Non-Tech Ops', title: 'Head of Non-Technical Operations', handle: 'non_tech_ops', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop' },
  ],
  techLeads: [
    { id: 't1', name: 'AI/ML Joint Head', title: 'AI/ML Joint Head', handle: 'aiml_head1', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=256&auto=format&fit=crop' },
    { id: 't2', name: 'AI/ML Joint Head', title: 'AI/ML Joint Head', handle: 'aiml_head2', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop' },
    { id: 't3', name: 'Web2 Lead', title: 'Web2 Lead', handle: 'web2_lead', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop' },
    { id: 't4', name: 'Web3 Joint Lead', title: 'Web3 Joint Lead', handle: 'web3_head1', status: 'Busy', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop' },
    { id: 't5', name: 'Web3 Joint Lead', title: 'Web3 Joint Lead', handle: 'web3_head2', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop' },
    { id: 't6', name: 'Cybersecurity Lead', title: 'Cybersecurity Lead', handle: 'cyber_lead', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop' },
    { id: 't7', name: 'Open Source Lead', title: 'Open Source Lead', handle: 'oss_lead', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop' },
  ]
};

export default function Team() {
  return (
    <section id="team" className="section team-section">
      <div className="container text-center mb-12">
        <span className="section-tag">
          <Users size={13} />
          <span>Leadership</span>
        </span>
        <h2 className="section-title">
          <StaggeredText text="Meet the ELEVATE Team" />
        </h2>
        <p className="section-subtitle mx-auto">
          The brilliant minds leading our highly specialized domains.
        </p>
      </div>

      <div className="team-tree-container">
        {/* Tier 1: Lead */}
        <div className="tree-tier tier-lead">
          <div className="tree-node">
            <ProfileCard 
              name={teamData.lead.name}
              title={teamData.lead.title}
              handle={teamData.lead.handle}
              status={teamData.lead.status}
              avatarUrl={teamData.lead.avatarUrl}
              className="team-profile-card"
              iconUrl={codeIconUrl}
              innerGradient={baseGradient}
            />
          </div>
        </div>

        <div className="tree-branch vertical-branch"></div>
        
        {/* Tier 2: Co-Lead */}
        <div className="tree-tier tier-colead">
          <div className="tree-node">
            <ProfileCard 
              name={teamData.colead.name}
              title={teamData.colead.title}
              handle={teamData.colead.handle}
              status={teamData.colead.status}
              avatarUrl={teamData.colead.avatarUrl}
              className="team-profile-card"
              iconUrl={codeIconUrl}
              innerGradient={baseGradient}
            />
          </div>
        </div>

        <div className="tree-branch vertical-branch-long"></div>

        {/* Tier 3: Non-Tech Leads */}
        <div className="group-heading">
          <StaggeredText text="Non-Technical Domain" />
        </div>
        <div className="tree-tier flex-tier">
          {teamData.nonTechLeads.map((lead) => (
            <div key={lead.id} className="tree-node-wrapper">
              <ProfileCard 
                name={lead.name}
                title={lead.title}
                handle={lead.handle}
                status={lead.status}
                avatarUrl={lead.avatarUrl}
                className="team-profile-card"
                iconUrl={codeIconUrl}
                innerGradient={baseGradient}
              />
            </div>
          ))}
        </div>

        <div className="tree-branch vertical-branch-long spaced-branch"></div>

        {/* Tier 4: Tech Domain Leads */}
        <div className="group-heading">
          <StaggeredText text="Technical Domain" />
        </div>
        <div className="tree-tier flex-tier">
          {teamData.techLeads.map((lead) => (
            <div key={lead.id} className="tree-node-wrapper">
              <ProfileCard 
                name={lead.name}
                title={lead.title}
                handle={lead.handle}
                status={lead.status}
                avatarUrl={lead.avatarUrl}
                className="team-profile-card"
                iconUrl={codeIconUrl}
                innerGradient={baseGradient}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
