export const orgHierarchy = [
  {
    id: 'lead',
    name: 'Alex Johnson',
    role: 'Lead',
    githubUrl: 'https://github.com/alexjohnson',
    children: []
  },
  {
    id: 'co-lead',
    name: 'Taylor Smith',
    role: 'Co-Lead',
    githubUrl: 'https://github.com/taylorsmith',
    children: []
  }
];

export const legacyYears = [
  { id: 'year-2025-26', yearRange: '2025–26', hierarchy: orgHierarchy },
  { id: 'year-2024-25', yearRange: '2024–25', hierarchy: orgHierarchy },
  { id: 'year-2023-24', yearRange: '2023–24', hierarchy: orgHierarchy }
];
