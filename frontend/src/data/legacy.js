// One person in the hierarchy
// { id, name, role, githubUrl, children: [Person, ...] }

export const orgHierarchy = {
  id: 'lead',
  name: 'Ayush Kathal',
  role: 'Lead',
  githubUrl: 'https://github.com/ayushkathal2005',
  children: [
    {
      id: 'co-lead',
      name: 'Swapnil',
      role: 'Co-Lead',
      githubUrl: 'https://github.com/Swapnil220705',
      children: [
        {
          id: 'head-tech-ops',
          name: 'Suraj',
          role: 'Head of Technical Operations',
          githubUrl: 'https://github.com/surajiiitn',
          children: [
            {
              id: 'webdev-lead',
              name: 'Arnab Mistry',
              role: 'Web Dev Lead',
              githubUrl: 'https://github.com/ArnabMistry',
              children: [
                { id: 'webdev-colead', name: 'Arnz', role: 'Web Dev Co-Lead', githubUrl: 'https://github.com/Arnz18', children: [] },
              ],
            },
            {
              id: 'web3-lead',
              name: 'Abhist',
              role: 'Web3 Lead',
              githubUrl: 'https://github.com/Abhist17',
              children: [
                { id: 'web3-colead', name: 'Vedansh Shukla', role: 'Web3 Co-Lead', githubUrl: 'https://github.com/VedanshShuklaa', children: [] },
              ],
            },
            {
              id: 'appdev-lead',
              name: 'Kunal',
              role: 'App Dev Lead',
              githubUrl: 'https://github.com/Kunal218sss',
              children: [
                { id: 'appdev-colead', name: 'Dhruv Khandelwal', role: 'App Dev Co-Lead', githubUrl: 'https://github.com/dhruvkhandelwal005', children: [] },
              ],
            },
            {
              id: 'opensource-lead',
              name: 'Ojaswi Joshi',
              role: 'Open Source Lead',
              githubUrl: 'https://github.com/OjaswiJoshi13',
              children: [
                { id: 'opensource-colead', name: 'Dhruv', role: 'Open Source Co-Lead', githubUrl: 'https://github.com/dhruvnnd', children: [] },
              ],
            },
            {
              id: 'aiml-lead',
              name: 'Samarth',
              role: 'AI/ML Lead',
              githubUrl: 'https://github.com/Samarth101',
              children: [
                { id: 'aiml-colead', name: 'Raveena', role: 'AI/ML Co-Lead', githubUrl: 'https://github.com/raveena2309', children: [] },
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
