import React from 'react';
import ProfileCard from '../../components/common/ProfileCard';
import { Users } from 'lucide-react';
import StaggeredText from '../../components/motion/StaggeredText';
import ParticleBackground from '../../components/common/ParticleBackground';
import './Teams.css';
import leadPic from '../../assets/images/Lead_elevate_2026.jpeg';
import coleadPic from '../../assets/images/Co_lead_elevate_2026.jpg';

const baseGradient = "linear-gradient(145deg, #101625 0%, #202b4d 100%)"; // Dark sleek background 

const teamData = {
  lead: {
    id: 1,
    name: 'Satyam Samal',
    title: 'Elevate Lead',
    handle: 'elevate_lead',
    status: 'Online',
    avatarUrl: leadPic
  },
  colead: {
    id: 2,
    name: 'Krushna Mali',
    title: 'Elevate Co-Lead',
    handle: 'elevate_colead',
    status: 'Busy',
    avatarUrl: coleadPic
  },
  opsLeads: [
    { id: 'nt4', name: 'Aviral Joshi', title: 'Technical Operations Head', handle: 'tech_ops', status: 'Online', avatarUrl: '/domain_leads/head_of_techincal.png' },
    { id: 'nt5', name: 'Madhur Mitkari', title: 'Non-Technical Operations Head', handle: 'non_tech_ops', status: 'Online', avatarUrl: '/domain_leads/head_of_non-technical.jpg' },
  ],
  nonTechLeads: [
    { id: 'nt1', name: '-', title: 'Corporate Lead', handle: 'corporate', status: 'Online', avatarUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=256&auto=format&fit=crop' },
    { id: 'ntm', name: 'Anay Dubey', title: 'Management Lead', handle: 'management', status: 'Online', avatarUrl: '/domain_leads/management_lead.jpg' },
    { id: 'nt2', name: 'Jahanvi Kurakula', title: 'Marketing and PR Lead', handle: 'marketing_pr', status: 'Online', avatarUrl: '/domain_leads/marketing_lead.jpg' },
    { id: 'nt3', name: 'Shashank Jinger', title: 'Design Lead', handle: 'design', status: 'Busy', avatarUrl: '/domain_leads/design_lead.png' },
  ],
  techJointLeads1: [
    { id: 't1', name: 'Bishal Dey', title: 'AI/ML Joint Lead 1', handle: 'aiml_head1', status: 'Online', avatarUrl: '/domain_leads/aiml_lead_1.png' },
    { id: 't2', name: 'Ansh Suryawanshi', title: 'AI/ML Joint Lead 2', handle: 'aiml_head2', status: 'Online', avatarUrl: '/domain_leads/aimml_lead_2.jpg' },
  ],
  techJointLeads2: [
    { id: 't4', name: 'Samyaak Jain', title: 'Web3 Joint Lead 1', handle: 'web3_head1', status: 'Busy', avatarUrl: '/domain_leads/web3_lead1.jpg' },
    { id: 't5', name: 'Arnav Bansal', title: 'Web3 Joint Lead 2', handle: 'web3_head2', status: 'Online', avatarUrl: '/domain_leads/web3_lead2.jpg' },
  ],
  techIndividualLeads: [
    { id: 't3', name: 'Vinay Kumrawat', title: 'Web Dev Lead', handle: 'web2_lead', status: 'Online', avatarUrl: '/domain_leads/web_dev_lead.png' },
    { id: 't6', name: 'Gaurang Bhavsar', title: 'Cybersecurity Lead', handle: 'cyber_lead', status: 'Online', avatarUrl: '/domain_leads/cybersecurity_lead.jpg' },
    { id: 't7', name: 'Tanmay Agarwal', title: 'Open-Source Lead', handle: 'oss_lead', status: 'Online', avatarUrl: '/domain_leads/open_source_lead.jpg' },
  ]
};

export default function Teams() {
  return (
    <section id="teams-page" className="section team-section" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '80px', position: 'relative' }}>
      <ParticleBackground count={24} intensity="medium" />
      <div className="container teams-hero">
        <span className="section-tag">
          <Users size={13} />
          <span>Leadership</span>
        </span>
        <h2 className="section-title">
          <StaggeredText text="Meet the Elevate Team" />
        </h2>
        <p className="section-subtitle teams-subtitle">
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
              innerGradient={baseGradient}
            />
          </div>
        </div>

        <div className="tree-branch vertical-branch-long"></div>

        {/* Tier 3: Operations Leads */}
        <div className="group-heading">
          <StaggeredText text="Operations Leadership" />
        </div>
        <div className="tree-tier flex-tier">
          {teamData.opsLeads.map((lead) => (
            <div key={lead.id} className="tree-node-wrapper">
              <ProfileCard 
                name={lead.name}
                title={lead.title}
                handle={lead.handle}
                status={lead.status}
                avatarUrl={lead.avatarUrl}
                className="team-profile-card"
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
        
        {/* Joint AI/ML Leads */}
        <div className="tree-tier flex-tier" style={{ marginBottom: '20px' }}>
          {teamData.techJointLeads1.map((lead) => (
            <div key={lead.id} className="tree-node-wrapper">
              <ProfileCard 
                name={lead.name}
                title={lead.title}
                handle={lead.handle}
                status={lead.status}
                avatarUrl={lead.avatarUrl}
                className="team-profile-card"
                innerGradient={baseGradient}
              />
            </div>
          ))}
        </div>

        {/* Joint Web3 Leads */}
        <div className="tree-tier flex-tier" style={{ marginBottom: '20px' }}>
          {teamData.techJointLeads2.map((lead) => (
            <div key={lead.id} className="tree-node-wrapper">
              <ProfileCard 
                name={lead.name}
                title={lead.title}
                handle={lead.handle}
                status={lead.status}
                avatarUrl={lead.avatarUrl}
                className="team-profile-card"
                innerGradient={baseGradient}
              />
            </div>
          ))}
        </div>

        {/* Individual Tech Leads */}
        <div className="tree-tier flex-tier">
          {teamData.techIndividualLeads.map((lead) => (
            <div key={lead.id} className="tree-node-wrapper">
              <ProfileCard 
                name={lead.name}
                title={lead.title}
                handle={lead.handle}
                status={lead.status}
                avatarUrl={lead.avatarUrl}
                className="team-profile-card"
                innerGradient={baseGradient}
              />
            </div>
          ))}
        </div>

        <div className="tree-branch vertical-branch-long spaced-branch"></div>

        {/* Tier 5: Non-Tech Leads */}
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
                innerGradient={baseGradient}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
