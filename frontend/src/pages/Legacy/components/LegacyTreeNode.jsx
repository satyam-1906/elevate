import { forwardRef } from 'react';
import './LegacyTreeNode.css';

/**
 * HTML overlay card for a single person in the org tree.
 * Uses a ref to allow direct DOM manipulation for 60fps 3D-to-2D projection.
 */
const LegacyTreeNode = forwardRef(({ person, onHoverStart, onHoverEnd }, ref) => {
  return (
    <a
      ref={ref}
      href={person.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="legacy-tree-node-card"
      onPointerEnter={() => onHoverStart(person.id)}
      onPointerLeave={() => onHoverEnd(person.id)}
      aria-label={`${person.name}, ${person.role}. Opens GitHub in new tab.`}
    >
      <div className="legacy-tree-node-inner">
        <span className="legacy-tree-node-name">{person.name}</span>
        <span className="legacy-tree-node-role">{person.role}</span>
      </div>
      {/* Decorative glow/accents */}
      <div className="legacy-tree-node-glow" aria-hidden="true" />
    </a>
  );
});

LegacyTreeNode.displayName = 'LegacyTreeNode';
export default LegacyTreeNode;
