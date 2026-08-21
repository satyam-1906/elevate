import { Vector3 } from 'three';

/**
 * Computes 3D local positions for the 13-person org hierarchy.
 * Layout: "The Spiral Galaxy"
 * Nodes spiral outwards along the Z-axis so they don't overlap from a distance,
 * and as you scroll forward, you fly directly through the center of them!
 */
export function computeTreeLayout(hierarchy) {
  const nodes = [];
  const getChild = (node, index) => node?.children?.[index];

  // 1. Lead (Top Center)
  const lead = hierarchy;
  if (!lead) return nodes;
  nodes.push({ id: lead.id, person: lead, position: new Vector3(0, 25, 0), parentId: null });

  // 2. Co-Lead (Top Right)
  const coLead = getChild(lead, 0);
  if (coLead) {
    nodes.push({ id: coLead.id, person: coLead, position: new Vector3(30, 15, -40), parentId: lead.id });
  }

  // 3. Head of Tech Ops (Right)
  const headTech = getChild(coLead, 0);
  if (headTech) {
    nodes.push({ id: headTech.id, person: headTech, position: new Vector3(45, -10, -80), parentId: coLead.id });
  }

  // 4. Domain Leads & Co-Leads
  const domainLeads = headTech?.children || [];
  
  // They sweep the bottom and left sides of the spiral
  // Angles from -Pi/4 (bottom right) to -Pi (left)
  const startAngle = -Math.PI * 0.1;
  const endAngle = -Math.PI * 1.2;

  const R_LEAD = 60;
  const R_COLEAD = 85;
  const Z_LEAD = -150;
  const Z_COLEAD = -200;

  domainLeads.forEach((dLead, i) => {
    const t = domainLeads.length > 1 ? i / (domainLeads.length - 1) : 0.5;
    const angle = startAngle + t * (endAngle - startAngle);
    
    // Domain Lead
    const lx = Math.cos(angle) * R_LEAD;
    const ly = Math.sin(angle) * R_LEAD;
    
    nodes.push({
      id: dLead.id,
      person: dLead,
      position: new Vector3(lx, ly, Z_LEAD),
      parentId: headTech.id
    });

    // Domain Co-Lead
    const dCoLead = getChild(dLead, 0);
    if (dCoLead) {
      const cx = Math.cos(angle) * R_COLEAD;
      const cy = Math.sin(angle) * R_COLEAD;
      
      nodes.push({
        id: dCoLead.id,
        person: dCoLead,
        position: new Vector3(cx, cy, Z_COLEAD),
        parentId: dLead.id
      });
    }
  });

  return nodes;
}
