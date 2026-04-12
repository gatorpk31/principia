export interface TierMeta {
  id: number;
  title: string;
  gradeLevel: string;
  isPaid: boolean;
  accentColor: string;
  description: string;
  /** Number of concepts available for free preview in paid tiers */
  freePreviewCount?: number;
}

export const TIERS: TierMeta[] = [
  {
    id: 1,
    title: 'Numbers, Fractions & Ratios',
    gradeLevel: '6th Grade',
    isPaid: false,
    accentColor: '#6bbda0',
    description: 'Build number sense from the ground up.',
  },
  {
    id: 2,
    title: 'Proportions, Percents & Intro Equations',
    gradeLevel: '7th Grade',
    isPaid: false,
    accentColor: '#4ecdc4',
    description: 'Connect ratios to the world around you.',
  },
  {
    id: 3,
    title: 'Algebra I — Linear Thinking',
    gradeLevel: '8th–9th Grade',
    isPaid: true,
    accentColor: '#5ba8d4',
    description: 'The language of variables and lines.',
    freePreviewCount: 3,
  },
  {
    id: 4,
    title: 'Geometry — Shape, Space & Proof',
    gradeLevel: '9th–10th Grade',
    isPaid: true,
    accentColor: '#7b8cde',
    description: 'Why shapes behave the way they do.',
  },
  {
    id: 5,
    title: 'Algebra II — Nonlinear Functions',
    gradeLevel: '10th–11th Grade',
    isPaid: true,
    accentColor: '#c9a96e',
    description: 'Curves, exponentials, and the quadratic story.',
  },
  {
    id: 6,
    title: 'Pre-Calculus & Trigonometry',
    gradeLevel: '11th–12th Grade',
    isPaid: true,
    accentColor: '#d4915b',
    description: 'Functions, circles, and the doorway to calculus.',
  },
  {
    id: 7,
    title: 'Calculus I — Limits, Derivatives & Integrals',
    gradeLevel: 'College',
    isPaid: true,
    accentColor: '#d47878',
    description: 'The mathematics of change and accumulation.',
  },
  {
    id: 8,
    title: 'Calculus II & Proof-Based Mathematics',
    gradeLevel: 'College+',
    isPaid: true,
    accentColor: '#b86ecc',
    description: 'Rigorous proof, series, and Euler-level thinking.',
  },
];
