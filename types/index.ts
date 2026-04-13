export type ConceptTag =
  | 'arithmetic'
  | 'algebra'
  | 'geometry'
  | 'trig'
  | 'precalc'
  | 'calculus'
  | 'proof';

export type VisualizationType =
  // ── Tier 1: Numbers & Fractions ──
  | 'number-line'           // drag dot along a number line
  | 'fraction-bar'          // tap to change numerator/denominator
  | 'fraction-equivalence'  // drag to match equivalent fractions
  | 'fraction-arithmetic'   // tap pieces to add/subtract fractions
  | 'fraction-multiply'     // area-model tap grid
  | 'fraction-ordering'     // drag-to-sort fractions
  | 'mixed-numbers'         // toggle whole + fraction parts
  | 'decimal-slider'        // slide decimal expansion on number line
  | 'factor-tree'           // tap to split nodes
  | 'venn-gcf-lcm'          // drag factors into Venn diagram
  | 'ratio-tape'            // drag tape diagram to show ratio
  | 'percent-fill'          // drag to fill 100-grid
  | 'negative-number-line'  // drag across zero
  | 'pemdas-builder'        // tap to evaluate operations in order
  // ── Tier 2: Proportions & Intro Equations ──
  | 'proportional-line'     // drag to see y = kx through origin
  | 'balance-scale'         // drag weights to balance
  | 'two-step-balance'      // two operations on the scale
  | 'inequality-ray'        // drag to shade a ray on number line
  | 'variable-box'          // tap to reveal what x holds
  | 'area-rectangle'        // drag width/height to see area
  | 'coordinate-plot'       // tap to place points on grid
  | 'bar-chart'             // tap bars to compare percents
  | 'unit-rate-compare'     // side-by-side rate bars
  | 'scale-drawing'         // pinch to scale a shape
  | 'interest-growth'       // drag time slider, watch money grow
  | 'absolute-value-fold'   // fold number line at zero
  // ── Tier 3: Algebra I ──
  | 'slope-rise-run'        // drag two points, see Δy/Δx
  | 'slope-intercept-line'  // drag m and b sliders
  | 'system-intersection'   // drag two lines to see intersection
  | 'elimination-cancel'    // tap to cancel variable terms
  | 'graph-line-draw'       // draw a line from equation
  | 'inequality-shade'      // drag boundary, shade half-plane
  | 'absolute-value-v'      // drag vertex of V-shape
  | 'exponent-tower'        // tap to stack powers
  | 'multi-step-balance'    // 3+ operations on scale
  | 'sequence-dots'         // tap to extend a dot pattern
  | 'function-machine'      // drop input, see output
  | 'domain-range-box'      // drag boundaries of valid inputs
  // ── Tier 4: Geometry ──
  | 'parallel-angles'       // drag transversal across parallels
  | 'triangle-congruence'   // drag vertices to match shapes
  | 'pythagorean-squares'   // drag squares onto triangle sides
  | 'coordinate-geometry'   // tap midpoint, drag to measure
  | 'proof-chain'           // drag statements into logical order
  | 'circle-parts'          // tap arcs, chords, tangents
  | 'cube-3d'               // rotate 3D shape
  | 'volume-fill'           // drag slider to fill a solid
  | 'triangle-transform'    // drag to translate/reflect/rotate
  | 'triangle-inequality'   // drag side lengths, see if valid
  | 'midsegment-draw'       // drag midpoints, see midsegment
  // ── Tier 5: Algebra II ──
  | 'parabola'              // drag vertex and roots
  | 'quadratic-discriminant' // slide a,b,c see 0/1/2 roots
  | 'exponential-curve'     // drag base, see growth/decay
  | 'log-mirror'            // drag point, see reflection
  | 'polynomial-roots'      // drag roots, see curve change
  | 'complex-plane'         // tap to plot a+bi on 2D plane
  | 'complete-square'       // drag tiles into a perfect square
  | 'poly-division'         // step through long division
  | 'rational-asymptotes'   // drag to see vertical/horizontal asymptotes
  | 'series-sum'            // tap to add terms, watch sum converge
  | 'conic-slicer'          // drag slicing angle on a cone
  // ── Tier 6: Pre-Calculus & Trig ──
  | 'unit-circle'           // drag point around circle, see sin/cos
  | 'sine-wave'             // drag amplitude/period on a wave
  | 'trig-identity-puzzle'  // drag pieces to form identity
  | 'inverse-trig-arc'      // drag y-value, see arc
  | 'function-transform'    // drag shifts/stretches on a curve
  | 'limit-approach'        // drag x toward a, see f(x) approach L
  | 'law-of-sines-tri'      // drag triangle, see sin ratios update
  | 'law-of-cosines-tri'    // drag side c, see a²+b²−2ab·cos
  | 'polar-graph'           // drag angle, see polar coordinates
  | 'vector-addition'       // drag vectors, see resultant
  | 'parametric-trace'      // drag t-slider, trace curve
  // ── Tier 7: Calculus I ──
  | 'limit-table'           // tap x values, see f(x) approach
  | 'secant-tangent'        // drag secant toward tangent
  | 'derivative-slope'      // drag point, see slope at each x
  | 'optimization-box'      // drag dimensions, find max volume
  | 'riemann-sum'           // drag slider to add more bars
  | 'ftc-area'              // drag upper bound, see area accumulate
  | 'u-sub-chain'           // drag inner/outer function layers
  | 'continuity-test'       // drag to close/open gap in curve
  | 'mvt-secant'            // drag interval, see parallel tangent
  | 'lhopital-zoom'         // zoom into 0/0 to see true limit
  | 'related-rates-cone'    // drag water level, see rates change
  | 'implicit-curve'        // trace a circle/ellipse implicitly
  // ── Tier 8: Calculus II & Proof ──
  | 'ibp-product'           // drag u/dv split on a product
  | 'sequence-converge'     // tap to extend terms, see convergence
  | 'convergence-meter'     // drag terms, see ratio/root test
  | 'taylor-approx'         // drag n-terms, see polynomial match curve
  | 'epsilon-delta-band'    // drag ε, see δ adjust
  | 'induction-dominoes'    // tap to topple dominos in sequence
  | 'trig-sub-triangle'     // drag substitution triangle
  | 'improper-integral'     // drag upper bound toward ∞
  | 'contradiction-fork'    // tap to follow two branches
  | 'partial-fraction-split'// drag fraction apart into pieces
  | 'power-series-radius'   // drag x, see radius of convergence
  | 'generic';              // fallback breathing circle

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
