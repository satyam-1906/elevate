import { memo } from 'react';
import './LegacyMobileTree.css';

/**
 * Recursive component to render a person and their children.
 */
const MobileTreeNode = ({ person, isRoot = false }) => {
  return (
    <div className={`mobile-tree-node ${isRoot ? 'is-root' : ''}`}>
      <a 
        href={person.githubUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mobile-tree-card"
        aria-label={`${person.name}, ${person.role}. Opens GitHub in new tab.`}
      >
        <div className="mobile-tree-card-inner">
          <span className="mobile-tree-name">{person.name}</span>
          <span className="mobile-tree-role">{person.role}</span>
        </div>
      </a>

      {person.children && person.children.length > 0 && (
        <div className="mobile-tree-children">
          {person.children.map((child) => (
            <div className="mobile-tree-child-wrapper" key={child.id}>
              {/* CSS pseudo-elements will draw the connector lines here */}
              <MobileTreeNode person={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Renders the full hierarchy for a specific year.
 */
const MobileYearSection = ({ year }) => {
  return (
    <section className="mobile-year-section">
      <div className="mobile-year-header">
        <h2 className="mobile-year-title">{year.yearRange}</h2>
      </div>
      <div className="mobile-year-tree-container">
        <MobileTreeNode person={year.hierarchy} isRoot={true} />
      </div>
    </section>
  );
};

/**
 * Mobile and reduced-motion fallback for the Legacy Archive.
 * Renders a plain HTML/CSS nested tree.
 */
const LegacyMobileTree = ({ entries }) => {
  return (
    <div className="legacy-mobile-tree-wrapper">
      <div className="legacy-mobile-intro">
        <span className="legacy-intro-tag">THE ARCHIVE</span>
        <h1 className="legacy-intro-title">Our Legacy</h1>
        <p className="legacy-intro-subtitle">
          The leadership that built Elevate.
        </p>
      </div>

      <div className="legacy-mobile-trees">
        {entries.map((year) => (
          <MobileYearSection key={year.id} year={year} />
        ))}
      </div>
    </div>
  );
};

export default memo(LegacyMobileTree);
