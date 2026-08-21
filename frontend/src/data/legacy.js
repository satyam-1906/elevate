// One person in the hierarchy
// { id, name, role, githubUrl, children: [Person, ...] }

export const orgHierarchy = {
  id: 'lead',
  name: 'Alex Johnson',
  role: 'Lead',
  githubUrl: 'https://github.com/alexjohnson',
  children: [
    {
      id: 'co-lead',
      name: 'Taylor Smith',
      role: 'Co-Lead',
      githubUrl: 'https://github.com/taylorsmith',
      children: [
        {
          id: 'head-tech-ops',
          name: 'Jordan Lee',
          role: 'Head of Technical Operations',
          githubUrl: 'https://github.com/jordanlee',
          children: [
            {
              id: 'webdev-lead',
              name: 'Morgan Davis',
              role: 'Web Dev Lead',
              githubUrl: 'https://github.com/morgandavis',
              children: [
                { id: 'webdev-colead', name: 'Casey White', role: 'Web Dev Co-Lead', githubUrl: 'https://github.com/caseywhite', children: [] },
              ],
            },
            {
              id: 'web3-lead',
              name: 'Riley Brown',
              role: 'Web3 Lead',
              githubUrl: 'https://github.com/rileybrown',
              children: [
                { id: 'web3-colead', name: 'Quinn Taylor', role: 'Web3 Co-Lead', githubUrl: 'https://github.com/quinntaylor', children: [] },
              ],
            },
            {
              id: 'appdev-lead',
              name: 'Avery Wilson',
              role: 'App Dev Lead',
              githubUrl: 'https://github.com/averywilson',
              children: [
                { id: 'appdev-colead', name: 'Skyler Moore', role: 'App Dev Co-Lead', githubUrl: 'https://github.com/skylermoore', children: [] },
              ],
            },
            {
              id: 'opensource-lead',
              name: 'Peyton Clark',
              role: 'Open Source Lead',
              githubUrl: 'https://github.com/peytonclark',
              children: [
                { id: 'opensource-colead', name: 'Rowan King', role: 'Open Source Co-Lead', githubUrl: 'https://github.com/rowanking', children: [] },
              ],
            },
            {
              id: 'aiml-lead',
              name: 'Dakota Wright',
              role: 'AI/ML Lead',
              githubUrl: 'https://github.com/dakotawright',
              children: [
                { id: 'aiml-colead', name: 'Parker Scott', role: 'AI/ML Co-Lead', githubUrl: 'https://github.com/parkerscott', children: [] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Each year currently reuses the same hierarchy — real per-year historical
// data can replace individual `hierarchy` values later without changing
// the data shape.
export const legacyYears = [
  { id: 'year-2026-27', yearRange: '2026–27', hierarchy: orgHierarchy },
  { id: 'year-2025-26', yearRange: '2025–26', hierarchy: orgHierarchy },
  { id: 'year-2024-25', yearRange: '2024–25', hierarchy: orgHierarchy },
  { id: 'year-founding', yearRange: 'Founding Era', hierarchy: orgHierarchy, isFoundingEra: true },
];
