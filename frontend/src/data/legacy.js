import lead25Img from '../assets/images/Elevate_lead_2025.jpeg';
import colead25Img from '../assets/images/elevate_colead_2025_final.png';
import lead24Img from '../assets/images/elevate_lead_2024.png';
import colead24Img from '../assets/images/elevate_colead_2024.jpeg';
import lead23Img from '../assets/images/elevate_lead_2023.jpg';
import colead23Img from '../assets/images/elevate_colead_2023.jpg';

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

export const orgHierarchy2025 = [
  {
    id: 'lead-25',
    name: 'Ayush Kathal',
    role: 'Lead',
    imageUrl: lead25Img,
    children: []
  },
  {
    id: 'co-lead-25',
    name: 'Swapnil Jain',
    role: 'Co-Lead',
    imageUrl: colead25Img,
    children: []
  }
];

export const orgHierarchy2024 = [
  {
    id: 'lead-24',
    name: 'Ayush Ajgaonkar',
    role: 'Lead',
    imageUrl: lead24Img,
    children: []
  },
  {
    id: 'co-lead-24',
    name: 'Debdip Mukherjee',
    role: 'Co-Lead',
    imageUrl: colead24Img,
    children: []
  }
];

export const orgHierarchy2023 = [
  {
    id: 'lead-23',
    name: 'Dhananjay Pachori',
    role: 'Lead',
    imageUrl: lead23Img,
    children: []
  },
  {
    id: 'co-lead-23',
    name: 'Sameer Jain',
    role: 'Co-Lead',
    imageUrl: colead23Img,
    children: []
  }
];

export const legacyYears = [
  { id: 'year-2025-26', yearRange: '2025–26', hierarchy: orgHierarchy2025 },
  { id: 'year-2024-25', yearRange: '2024–25', hierarchy: orgHierarchy2024 },
  { id: 'year-2023-24', yearRange: '2023–24', hierarchy: orgHierarchy2023 }
];

