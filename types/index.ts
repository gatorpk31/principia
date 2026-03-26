export type ConceptTag =
  | 'arithmetic'
  | 'algebra'
  | 'geometry'
  | 'trig'
  | 'precalc'
  | 'calculus'
  | 'proof';

export type VisualizationType =
  | 'number-line'
  | 'fraction-bar'
  | 'coordinate-plane'
  | 'triangle'
  | 'circle'
  | 'parabola'
  | 'unit-circle'
  | 'secant-tangent'
  | 'riemann-sum'
  | 'balance-scale'
  | 'area-rectangle'
  | 'bar-chart'
  | 'factor-tree'
  | 'exponent-tower'
  | 'cube-3d'
  | 'generic';

export type AccessibilityLevel =
  | 'elementary'
  | 'middle'
  | 'high'
  | 'college'
  | 'advanced';

export interface ConceptTabData {
  summary: string;
  whyItMatters: string;
  coreIdea: string;
  formula?: string;
  formulaLabel?: string;
  insights: [string, string, string];
}

export interface GuidedStep {
  label: string;
  math?: string;
  explanation: string;
  connectionNote?: string;
}

export interface GuidedData {
  problemStatement: string;
  steps: GuidedStep[];
  reflectionPrompt: string;
}

export interface PracticeQuestion {
  question: string;
  mathNotation: string;
  answer: string;
  choices: string[];
  explanation: string;
  answerIndex: number;
}

export interface Connection {
  conceptId: string;
  tierId: number;
  title: string;
  bridgeFormula: string;
  explanation: string;
}

export interface Concept {
  id: string;
  tierId: number;
  glyph: string;
  title: string;
  subtitle: string;
  tags: ConceptTag[];
  conceptTab: ConceptTabData;
  guided: GuidedData;
  practice: PracticeQuestion[];
  connections: Connection[];
  visualizationType: VisualizationType;
  canvasLabel: string;
  canvasControls?: string[];
  accessibilityLevel: AccessibilityLevel;
}

export interface ConceptProgress {
  conceptId: string;
  tierId: number;
  concept: boolean;
  guided: boolean;
  practice: boolean;
  connections: boolean;
  practiceScore?: number;
  completedAt?: string;
}

export type ProgressMap = Record<string, ConceptProgress>;
