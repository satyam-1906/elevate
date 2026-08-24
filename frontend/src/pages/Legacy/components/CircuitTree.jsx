import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

function NodeCard({ node, nodesRef }) {
  // A glowing tech card with double cut borders
  return (
    <div 
      className="circuit-node" 
      ref={(el) => { if (el) nodesRef.current[node.id] = el; }}
    >
      <div className="circuit-node-border">
        <div className="node-content">
          <div className="node-header">
            <span className="node-role">{node.role.toUpperCase()}</span>
            <div className="node-bars">
               <div className="bar"></div>
               <div className="bar"></div>
               <div className="bar"></div>
               <div className="bar"></div>
               <div className="bar"></div>
            </div>
          </div>
          <div className="node-body">
            <div className="node-avatar">
              {node.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div className="node-info">
              <h3 className="node-name">{node.name}</h3>
              {node.githubUrl && (
                <a 
                  href="#" 
                  onClick={(e) => e.preventDefault()} 
                  className="node-link"
                >
                  ↗ {node.githubUrl.split('github.com/')[1] || 'github'}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CircuitTree({ hierarchy, glowColor }) {
  const containerRef = useRef(null);
  const nodesRef = useRef({}); // Store refs in useRef, not useState!
  const [paths, setPaths] = useState([]);

  const setNodeRef = useCallback((id, el) => {
    if (el) {
      nodesRef.current[id] = el;
    }
  }, []);

  const calculatePaths = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPaths = [];

    const traverse = (node) => {
      if (!node.children || node.children.length === 0) return;
      
      const parentEl = nodesRef.current[node.id];
      if (!parentEl) return;
      
      const pRect = parentEl.getBoundingClientRect();
      const pX = pRect.left + pRect.width / 2 - containerRect.left;
      const pY = pRect.bottom - containerRect.top;

      node.children.forEach(child => {
        const childEl = nodesRef.current[child.id];
        if (childEl) {
          const cRect = childEl.getBoundingClientRect();
          const cX = cRect.left + cRect.width / 2 - containerRect.left;
          const cY = cRect.top - containerRect.top;
          
          // Circuit-like path: go down a bit, then horizontal, then down to child
          const midY = pY + (cY - pY) / 2;
          const pathString = `M ${pX} ${pY} L ${pX} ${midY} L ${cX} ${midY} L ${cX} ${cY}`;
          
          newPaths.push({
            id: `${node.id}-${child.id}`,
            d: pathString,
          });
        }
        traverse(child);
      });
    };

    if (Array.isArray(hierarchy)) {
      hierarchy.forEach(traverse);
    } else {
      traverse(hierarchy);
    }
    setPaths(newPaths);
  }, [hierarchy]);

  useEffect(() => {
    // We need to wait for layout and fonts
    const timeout = setTimeout(calculatePaths, 100);
    window.addEventListener('resize', calculatePaths);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', calculatePaths);
    };
  }, [calculatePaths]);

  // Recursively render HTML tree with stagger animation
  const renderTree = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div className="tree-level-container" key={node.id}>
        <motion.div 
          className="tree-node-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: level * 0.25 }}
        >
          <NodeCard node={node} nodesRef={nodesRef} />
        </motion.div>
        {hasChildren && (
          <div className="tree-children-row">
            {node.children.map(child => renderTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="circuit-tree-container" ref={containerRef} style={{ '--glow': glowColor }}>
      {/* SVG Overlay for Paths */}
      <svg className="circuit-svg-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {paths.map(path => (
          <g key={path.id}>
            {/* The main wire */}
            <path 
              d={path.d} 
              fill="none" 
              stroke="var(--glow)" 
              strokeWidth="2" 
              strokeOpacity="0.3"
              strokeLinejoin="round"
            />
            {/* The glowing dot traveling along the wire */}
            <circle r="3" fill="var(--glow)" style={{
              offsetPath: `path('${path.d}')`,
              animation: 'flowAnimation 3s linear infinite'
            }} />
          </g>
        ))}
      </svg>
      
      {/* HTML Nodes */}
      <div className="circuit-html-layer" style={{ position: 'relative', zIndex: 1 }}>
        {Array.isArray(hierarchy) ? (
          <div className="tree-children-row">
            {hierarchy.map(child => renderTree(child, 0))}
          </div>
        ) : (
          renderTree(hierarchy, 0)
        )}
      </div>
    </div>
  );
}
