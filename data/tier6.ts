import type { Concept } from '../types';

export const TIER6_CONCEPTS: Concept[] = [
  {
    id: 't6-unit-circle',
    tierId: 6,
    glyph: '◉',
    title: 'The unit circle and radian measure',
    subtitle: 'Angles as lengths — the natural language of rotation',
    tags: ['trig', 'precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'unit-circle',
    canvasLabel: 'Unit Circle',
    conceptTab: {
      summary: 'The unit circle is a circle of radius 1 centered at the origin. Every angle corresponds to a point on it, and radian measure makes angles and arc lengths the same thing.',
      whyItMatters:
        "Degrees are arbitrary — why 360? Because ancient Babylonians used a base-60 number system, and 360 was convenient. Radians are the natural measure of angles: one radian is the angle that cuts off an arc of length 1 on a unit circle. This makes calculus work cleanly — the derivative of sin is exactly cos (not cos × π/180). Every trig identity, every calculus formula, and every physics equation involving angles uses radians.",
      coreIdea:
        "THE UNIT CIRCLE: center (0,0), radius 1. A point P on the circle at angle θ has coordinates:\n  P = (cos θ, sin θ)\n\nThis is the DEFINITION of cosine and sine for all angles — not just acute ones.\n\nRADIAN MEASURE:\n• One full revolution = 2π radians = 360°\n• Conversion: degrees × π/180 = radians; radians × 180/π = degrees\n• Arc length = rθ (r = radius, θ in radians)\n\nKEY ANGLES TO MEMORIZE (θ in radians → (cos θ, sin θ)):\n• 0 → (1, 0)\n• π/6 → (√3/2, 1/2)\n• π/4 → (√2/2, √2/2)\n• π/3 → (1/2, √3/2)\n• π/2 → (0, 1)\n• π → (−1, 0)\n• 3π/2 → (0, −1)",
      formula: 'P(θ) = (cos θ, sin θ) on the unit circle',
      formulaLabel: 'Unit circle point:',
      insights: [
        "The unit circle definition of sin and cos extends them to ALL angles — not just those in right triangles. Negative angles (clockwise rotation), angles greater than 2π (multiple rotations), all produce well-defined (cos θ, sin θ) coordinates.",
        "The Pythagorean identity sin²θ + cos²θ = 1 is immediate from the unit circle: the point (cos θ, sin θ) is ON the circle x² + y² = 1. It's not a theorem to memorize — it's a consequence of the definition.",
        "Radian measure makes the derivative of sin exactly equal to cos. In degree measure, d/dx[sin(x°)] = (π/180)cos(x°) — an ugly constant. Radians eliminate this constant, which is why all calculus uses radians.",
      ],
    },
    guided: {
      problemStatement: 'Convert 240° to radians and find the coordinates on the unit circle.',
      steps: [
        {
          label: 'Convert to radians',
          math: '240° × π/180 = 240π/180 = 4π/3',
          explanation: 'Multiply degrees by π/180. Simplify 240/180 = 4/3. So 240° = 4π/3 radians.',
        },
        {
          label: 'Locate the angle',
          math: '4π/3 is in the third quadrant (between π and 3π/2)',
          explanation: '4π/3 ≈ 4.19, which is between π ≈ 3.14 and 3π/2 ≈ 4.71. Third quadrant: both x and y are negative.',
        },
        {
          label: 'Find the reference angle',
          math: 'Reference angle = 4π/3 − π = π/3',
          explanation: 'In the third quadrant, subtract π to find the reference angle: 4π/3 − π = π/3. This is 60°.',
        },
        {
          label: 'Apply signs for the third quadrant',
          math: '(cos 4π/3, sin 4π/3) = (−1/2, −√3/2)',
          explanation: 'At π/3: cos = 1/2, sin = √3/2. In Q3, both are negative: (−1/2, −√3/2).',
          connectionNote: 'Pattern: the reference angle gives the magnitude; the quadrant determines the signs.',
        },
      ],
      reflectionPrompt: 'Why is it useful to have the unit circle memorized rather than derived each time? Which angles come up most often in calculus and physics?',
    },
    practice: [
      {
        question: 'What are the coordinates on the unit circle at θ = π/2?',
        mathNotation: '(cos π/2, sin π/2)',
        answer: '(0, 1)',
        choices: ['(1, 0)', '(0, 1)', '(−1, 0)', '(0, −1)'],
        answerIndex: 1,
        explanation: 'π/2 is 90° — straight up. The point at the top of the unit circle is (0, 1). So cos(π/2) = 0, sin(π/2) = 1.',
      },
      {
        question: 'Convert 3π/4 radians to degrees.',
        mathNotation: '3π/4 × 180/π',
        answer: '135°',
        choices: ['45°', '120°', '135°', '150°'],
        answerIndex: 2,
        explanation: '3π/4 × 180/π = 3×180/4 = 540/4 = 135°.',
      },
      {
        question: 'What is the arc length subtended by a central angle of π/3 in a circle of radius 6?',
        mathNotation: 'Arc = rθ',
        answer: '2π',
        choices: ['π', '2π', '3π', '6π'],
        answerIndex: 1,
        explanation: 'Arc length = r·θ = 6 · (π/3) = 2π.',
      },
    ],
    connections: [
      {
        conceptId: 't6-trig-functions',
        tierId: 6,
        title: 'Sine, Cosine, and Tangent as Functions',
        bridgeFormula: 'y = sin(x) — periodic, domain all reals',
        explanation: 'Once angles are defined via the unit circle, sin and cos become functions of real numbers (the angle in radians), not just ratios in triangles. This unlocks graphing, periodicity, and calculus of trig functions.',
      },
      {
        conceptId: 't4-circles-geometry',
        tierId: 4,
        title: 'Circle Geometry',
        bridgeFormula: 'Arc length = rθ',
        explanation: 'The arc length formula rθ comes from the unit circle: arc length = r × (fraction of circumference) = r × (θ/2π) × 2π = rθ. Geometry and trigonometry reunite here.',
      },
    ],
  },

  {
    id: 't6-trig-functions',
    tierId: 6,
    glyph: '∿',
    title: 'Sine, cosine, and tangent as functions',
    subtitle: 'Periodic waves — the mathematics of cycles',
    tags: ['trig', 'precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'unit-circle',
    canvasLabel: 'Sine Wave',
    conceptTab: {
      summary: 'Graphed as functions of angle (in radians), sine and cosine produce repeating wave patterns — the mathematical model for all cyclic phenomena.',
      whyItMatters:
        "Sound is a pressure wave. Light is an electromagnetic wave. Tides are driven by periodic gravitational forces. AC electricity oscillates as a sine wave. The vibration of a guitar string, the rhythm of a heartbeat, the seasons of the year — all are periodic. Sine and cosine are the mathematical DNA of oscillation. Every wave in nature can be built up from sines and cosines (Fourier's theorem). Understanding trig functions IS understanding waves.",
      coreIdea:
        "y = sin(x): starts at 0, rises to 1, back to 0, down to −1, returns to 0 over one period.\ny = cos(x): starts at 1, down to 0, to −1, back to 0, to 1.\nBoth have period 2π, amplitude 1.\n\nGENERAL FORM: y = A·sin(Bx + C) + D\n• A = amplitude (half the height of the wave)\n• Period = 2π/|B|\n• Phase shift = −C/B (horizontal shift)\n• D = vertical shift (midline)\n\nTANGENT: tan(x) = sin(x)/cos(x)\n• Undefined where cos(x) = 0 (vertical asymptotes at x = π/2 + nπ)\n• Period π (not 2π)\n• Range: all real numbers",
      formula: 'y = A · sin(Bx + C) + D',
      formulaLabel: 'General sinusoidal form:',
      insights: [
        "Cosine is just a phase-shifted sine: cos(x) = sin(x + π/2). They have identical shapes — cosine starts where sine is at its peak. This is why 'sin and cos' aren't really two different functions, but the same wave shifted.",
        "Periodicity: sin(x + 2π) = sin(x) for all x. This means the entire function repeats every 2π — a complete revolution on the unit circle brings you back to the same point.",
        "The graph of y = tan(x) has vertical asymptotes (where cos x = 0) and crosses zero where sin x = 0. Its branches run from −∞ to +∞ in each period. Tangent is 'fast' — it covers all real values in a period of just π.",
      ],
    },
    guided: {
      problemStatement: 'Graph one period of y = 3·sin(2x − π/2). Identify the amplitude, period, and phase shift.',
      steps: [
        {
          label: 'Identify A, B, C, D',
          math: 'A = 3, B = 2, C = −π/2, D = 0',
          explanation: 'Match to y = A·sin(Bx + C) + D. Here A=3, B=2, C=−π/2, D=0.',
        },
        {
          label: 'Find amplitude and period',
          math: 'Amplitude = |A| = 3; Period = 2π/|B| = 2π/2 = π',
          explanation: 'The wave swings from −3 to 3 (amplitude 3). One full cycle takes π units (period π).',
        },
        {
          label: 'Find the phase shift',
          math: 'Phase shift = −C/B = −(−π/2)/2 = π/4 to the right',
          explanation: 'The graph shifts π/4 units to the right compared to y = 3·sin(2x).',
        },
        {
          label: 'Sketch key points',
          math: 'One period starts at x = π/4: (π/4, 0), (3π/4, 3), (5π/4, 0), (7π/4, −3), (9π/4, 0)',
          explanation: 'Start at the phase shift, then mark max, zero-crossing, min, zero-crossing at intervals of period/4 = π/4.',
          connectionNote: 'Knowing amplitude, period, and phase shift gives you everything needed to sketch the curve without a calculator.',
        },
      ],
      reflectionPrompt: 'Sound at 440 Hz means the pressure oscillates 440 times per second. What would B be in y = A·sin(Bx) to model this frequency (where x is time in seconds)?',
    },
    practice: [
      {
        question: 'What is the period of y = sin(3x)?',
        mathNotation: 'Period = 2π/|B|',
        answer: '2π/3',
        choices: ['3', '2π', '2π/3', 'π/3'],
        answerIndex: 2,
        explanation: 'B = 3. Period = 2π/3.',
      },
      {
        question: 'What is the amplitude of y = −4·cos(x) + 1?',
        mathNotation: 'A = −4',
        answer: '4',
        choices: ['−4', '4', '1', '5'],
        answerIndex: 1,
        explanation: 'Amplitude is |A| = |−4| = 4. The negative sign flips the graph but does not change amplitude.',
      },
      {
        question: 'Where are the vertical asymptotes of y = tan(x) in [0, 2π]?',
        mathNotation: 'tan(x) undefined when cos(x) = 0',
        answer: 'x = π/2 and x = 3π/2',
        choices: ['x = 0 and x = π', 'x = π/2 and x = 3π/2', 'x = π/4 and x = 5π/4', 'x = π/6 and x = 5π/6'],
        answerIndex: 1,
        explanation: 'tan(x) = sin(x)/cos(x) is undefined when cos(x) = 0, i.e., at x = π/2 and x = 3π/2 in [0, 2π].',
      },
    ],
    connections: [
      {
        conceptId: 't6-trig-identities',
        tierId: 6,
        title: 'Trigonometric Identities',
        bridgeFormula: 'sin²x + cos²x = 1',
        explanation: 'The graphs of sin and cos reveal their relationship: they are the same wave, shifted. Trig identities make these relationships algebraically precise.',
      },
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: 'd/dx[sin x] = cos x',
        explanation: "The derivative of sin(x) is cos(x) — and visually obvious from the graphs: wherever sin is rising steeply, cos is large and positive; wherever sin is flat, cos is zero. The graphs of trig functions teach their derivatives.",
      },
    ],
  },

  {
    id: 't6-trig-identities',
    tierId: 6,
    glyph: '≡',
    title: 'Trigonometric identities',
    subtitle: 'Equations true for all angles — the algebra of waves',
    tags: ['trig', 'precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'unit-circle',
    canvasLabel: 'Identity Proof',
    conceptTab: {
      summary: 'Trigonometric identities are equations involving trig functions that are true for all valid values of the variable. They are tools for simplifying and rewriting trig expressions.',
      whyItMatters:
        "Integration in calculus often requires rewriting a trig expression into a different form before integrating. Physics problems frequently require simplifying wave expressions. The double-angle identities appear in calculating forces at angles, in optics (wave interference), and in digital signal processing. Proving identities builds the algebraic fluency that makes advanced mathematics tractable.",
      coreIdea:
        "PYTHAGOREAN IDENTITIES (from sin²+cos²=1):\n• sin²θ + cos²θ = 1\n• 1 + tan²θ = sec²θ\n• 1 + cot²θ = csc²θ\n\nQUOTIENT IDENTITIES:\n• tan θ = sin θ/cos θ\n• cot θ = cos θ/sin θ\n\nCO-FUNCTION IDENTITIES:\n• sin(π/2 − θ) = cos θ  (complementary angles)\n\nDOUBLE ANGLE:\n• sin(2θ) = 2 sin θ cos θ\n• cos(2θ) = cos²θ − sin²θ = 2cos²θ − 1 = 1 − 2sin²θ\n\nSUM FORMULAS:\n• sin(A+B) = sin A cos B + cos A sin B\n• cos(A+B) = cos A cos B − sin A sin B",
      formula: 'sin²θ + cos²θ = 1',
      formulaLabel: 'Pythagorean identity:',
      insights: [
        "Proving an identity is different from solving an equation. When proving, you work on ONE side only (usually the more complex side) and transform it into the other. Never move terms across the equals sign — that would assume what you're trying to prove.",
        "The sum formulas are the most generative: the double-angle, half-angle, and product-to-sum formulas all derive from them. Deriving cos(2θ) from cos(θ+θ) is a two-line calculation.",
        "Trig identities let you change the form of an expression without changing its value — like equivalent fractions. This is useful when one form is easier to differentiate, integrate, or evaluate.",
      ],
    },
    guided: {
      problemStatement: 'Prove the identity: tan²θ + 1 = sec²θ.',
      steps: [
        {
          label: 'Start with the Pythagorean identity',
          math: 'sin²θ + cos²θ = 1',
          explanation: 'Begin with the known identity. We will manipulate it algebraically.',
        },
        {
          label: 'Divide both sides by cos²θ',
          math: 'sin²θ/cos²θ + cos²θ/cos²θ = 1/cos²θ',
          explanation: 'Dividing both sides by cos²θ (valid where cos θ ≠ 0) preserves equality.',
        },
        {
          label: 'Recognize the trig ratios',
          math: 'tan²θ + 1 = sec²θ',
          explanation: 'sin/cos = tan, so sin²/cos² = tan². And 1/cos = sec, so 1/cos² = sec². QED.',
          connectionNote: 'This is one of three Pythagorean identities — each is the same identity with a different function in the denominator.',
        },
      ],
      reflectionPrompt: 'What is the third Pythagorean identity? Derive it by dividing sin²θ + cos²θ = 1 by sin²θ instead.',
    },
    practice: [
      {
        question: 'Simplify: (1 − sin²θ)/cos θ.',
        mathNotation: '1 − sin²θ = cos²θ',
        answer: 'cos θ',
        choices: ['sin θ', 'cos θ', 'tan θ', '1'],
        answerIndex: 1,
        explanation: 'Use sin²θ + cos²θ = 1 → 1 − sin²θ = cos²θ. Then cos²θ/cos θ = cos θ.',
      },
      {
        question: 'Use the double-angle formula to find sin(2·30°).',
        mathNotation: 'sin(2θ) = 2 sin θ cos θ, θ = 30°',
        answer: '√3/2',
        choices: ['1/2', '√3/2', '√3', '1'],
        answerIndex: 1,
        explanation: 'sin(60°) = 2·sin(30°)·cos(30°) = 2·(1/2)·(√3/2) = √3/2.',
      },
      {
        question: 'Which identity correctly expands cos(A + B)?',
        mathNotation: 'cos(A+B) = ?',
        answer: 'cos A cos B − sin A sin B',
        choices: [
          'cos A cos B + sin A sin B',
          'cos A cos B − sin A sin B',
          'sin A cos B + cos A sin B',
          'cos A sin B − sin A cos B',
        ],
        answerIndex: 1,
        explanation: 'cos(A+B) = cos A cos B − sin A sin B. Note the minus sign — this is different from sin(A+B) which uses a plus.',
      },
    ],
    connections: [
      {
        conceptId: 't6-inverse-trig',
        tierId: 6,
        title: 'Inverse Trigonometric Functions',
        bridgeFormula: 'arcsin(sin θ) = θ (restricted domain)',
        explanation: 'Trig identities help evaluate inverse trig functions. For example, sin(arccos x) = √(1−x²) follows from sin²θ + cos²θ = 1 with θ = arccos x.',
      },
      {
        conceptId: 't7-u-substitution',
        tierId: 7,
        title: 'U-Substitution and Trig Substitution',
        bridgeFormula: '∫sin²x dx using cos(2x) = 1 − 2sin²x',
        explanation: 'Many integration problems require trig identities to rewrite the integrand before integrating. The double-angle identity for cos(2x) is used constantly to integrate sin² and cos².',
      },
    ],
  },

  {
    id: 't6-inverse-trig',
    tierId: 6,
    glyph: 'sin⁻¹',
    title: 'Inverse trigonometric functions',
    subtitle: 'Recovering angles from ratios — with careful attention to domains',
    tags: ['trig', 'precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'unit-circle',
    canvasLabel: 'Inverse Trig',
    conceptTab: {
      summary: 'Inverse trig functions (arcsin, arccos, arctan) recover the angle given a trig ratio. Because trig functions repeat, inverse trig functions have restricted domains and limited ranges.',
      whyItMatters:
        "If you know the sine of an angle is 0.6, what is the angle? That is an inverse trig problem. Architects compute angles from lengths. Physicists compute launch angles from velocity components. GPS receivers triangulate positions from measured distances — recovering angles is step 1. The careful restriction of inverse trig functions is also a model for how to handle non-injective functions generally, a concept fundamental to all of mathematics.",
      coreIdea:
        "sin(x) is not one-to-one — it repeats. To define an inverse, we restrict to one period.\n\narcsin(x) = sin⁻¹(x):\n• Domain: [−1, 1]\n• Range: [−π/2, π/2] (outputs only in Q1 and Q4)\n\narccos(x) = cos⁻¹(x):\n• Domain: [−1, 1]\n• Range: [0, π] (outputs only in Q1 and Q2)\n\narctan(x) = tan⁻¹(x):\n• Domain: all reals\n• Range: (−π/2, π/2)\n\nCOMPOSITION:\n• sin(arcsin x) = x (for x in [−1, 1])\n• arcsin(sin x) = x ONLY for x in [−π/2, π/2]\n\nKEY VALUES:\n• arcsin(1/2) = π/6; arcsin(√2/2) = π/4; arcsin(1) = π/2",
      formula: 'arcsin(x): domain [−1,1], range [−π/2, π/2]',
      formulaLabel: 'arcsin definition:',
      insights: [
        "arcsin(sin(x)) ≠ x in general! sin(5π/6) = 1/2, and arcsin(1/2) = π/6, not 5π/6. The restriction of arcsin to [−π/2, π/2] means it only returns angles in that range, even if the original angle was elsewhere.",
        "arctan is the most-used inverse trig function in calculus: ∫ 1/(1+x²) dx = arctan(x) + C. This integral appears in probability, physics, and complex analysis.",
        "Right triangle interpretation: arcsin(1/2) = π/6 means 'the angle in a right triangle whose opposite/hypotenuse = 1/2 is π/6 (= 30°).' Inverse trig recovers the angle from the ratio.",
      ],
    },
    guided: {
      problemStatement: 'Evaluate: (a) arcsin(−√3/2), (b) arctan(1), (c) arccos(0).',
      steps: [
        {
          label: '(a) arcsin(−√3/2)',
          math: 'sin(−π/3) = −√3/2, and −π/3 is in [−π/2, π/2]',
          explanation: 'We need the angle in [−π/2, π/2] whose sine is −√3/2. Since sin(π/3) = √3/2, by symmetry sin(−π/3) = −√3/2. Answer: −π/3.',
        },
        {
          label: '(b) arctan(1)',
          math: 'tan(π/4) = 1, and π/4 is in (−π/2, π/2)',
          explanation: 'We need the angle in (−π/2, π/2) whose tangent is 1. tan(π/4) = sin/cos = (√2/2)/(√2/2) = 1. Answer: π/4.',
        },
        {
          label: '(c) arccos(0)',
          math: 'cos(π/2) = 0, and π/2 is in [0, π]',
          explanation: 'We need the angle in [0, π] whose cosine is 0. That is π/2. Answer: π/2.',
          connectionNote: 'Always check: is the answer in the correct restricted range? arcsin and arctan output in [−π/2, π/2]; arccos outputs in [0, π].',
        },
      ],
      reflectionPrompt: 'Why can\'t arcsin output an angle in Q2, even though sin is positive in Q2? What problem would that cause?',
    },
    practice: [
      {
        question: 'What is arcsin(√2/2)?',
        mathNotation: 'sin(?) = √2/2',
        answer: 'π/4',
        choices: ['π/3', 'π/4', 'π/6', '3π/4'],
        answerIndex: 1,
        explanation: 'sin(π/4) = √2/2, and π/4 is in the range [−π/2, π/2]. Answer: π/4.',
      },
      {
        question: 'Evaluate arccos(−1/2).',
        mathNotation: 'cos(?) = −1/2, range [0, π]',
        answer: '2π/3',
        choices: ['π/3', '−π/3', '2π/3', '4π/3'],
        answerIndex: 2,
        explanation: 'cos(π/3) = 1/2, so cos(2π/3) = −1/2. Since 2π/3 is in [0, π], arccos(−1/2) = 2π/3.',
      },
      {
        question: 'Find the exact value of sin(arccos(3/5)).',
        mathNotation: 'If θ = arccos(3/5), find sin θ',
        answer: '4/5',
        choices: ['3/5', '4/5', '4/3', '5/3'],
        answerIndex: 1,
        explanation: 'Let θ = arccos(3/5). Then cos θ = 3/5. By Pythagorean identity: sin²θ = 1 − 9/25 = 16/25. sin θ = 4/5 (positive because θ is in [0, π/2]).',
      },
    ],
    connections: [
      {
        conceptId: 't6-trig-functions',
        tierId: 6,
        title: 'Sine, Cosine, and Tangent',
        bridgeFormula: 'sin(arcsin x) = x, arcsin(sin x) ≠ x in general',
        explanation: "Inverse trig functions reverse trig functions, but only on restricted domains. Understanding why requires deep knowledge of what trig functions do — their periodicity means many inputs give the same output.",
      },
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: 'd/dx[arctan x] = 1/(1+x²)',
        explanation: 'The derivatives of inverse trig functions are algebraic, not trig: d/dx[arcsin x] = 1/√(1−x²), d/dx[arctan x] = 1/(1+x²). These appear frequently in integration.',
      },
    ],
  },

  {
    id: 't6-function-transformations',
    tierId: 6,
    glyph: 'T(f)',
    title: 'Function transformations',
    subtitle: 'Shifting, stretching, reflecting — translating between algebra and geometry',
    tags: ['precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Transformed Graph',
    conceptTab: {
      summary: 'Transformations describe how changes to a function\'s equation shift, stretch, compress, or reflect its graph in predictable ways.',
      whyItMatters:
        "Transformations let you understand an infinite family of functions by understanding just one. Once you know the shape of y = x², you know the shape of y = 3(x−2)² + 5 without additional work — it's just the same parabola, shifted and stretched. Every function in science and engineering is a transformation of a simpler one. Computer graphics use transformations to move and scale objects. Signal processing shifts and scales waves.",
      coreIdea:
        "Starting with f(x), the function g(x) = A·f(B(x−h)) + k produces:\n\nVERTICAL CHANGES (affect y-values):\n• +k → shift UP k units\n• −k → shift DOWN k units\n• A > 1 → vertical stretch by A\n• 0 < A < 1 → vertical compression by A\n• −A → reflect over x-axis\n\nHORIZONTAL CHANGES (affect x-values; work OPPOSITE to intuition):\n• +h in (x−h) → shift RIGHT h units\n• −h → shift LEFT h units\n• B > 1 → horizontal COMPRESSION by 1/B\n• 0 < B < 1 → horizontal STRETCH by 1/B\n• f(−x) → reflect over y-axis\n\nOrder matters: inside the function affects x (horizontal); outside affects y (vertical).",
      formula: 'g(x) = A · f(B(x − h)) + k',
      formulaLabel: 'General transformation:',
      insights: [
        "Horizontal transformations work OPPOSITE to what seems natural: f(x−3) shifts RIGHT (not left). This is because to hit the same y-value as f at x=0, you need x=3 (so x−3=0). The graph must reach right to find the same output.",
        "Transformations compose: y = −2f(3x+6) − 1 can be understood as: compress horizontally by 1/3, shift left 2, stretch vertically by 2, reflect over x-axis, shift down 1. Each operation is applied in the right order.",
        "Knowing parent functions (y=x², y=x³, y=√x, y=|x|, y=1/x, y=eˣ, y=sin x) and their transformations gives you intuition for virtually every function you will encounter in calculus.",
      ],
    },
    guided: {
      problemStatement: "Describe all transformations applied to y = x² to get y = −3(x + 1)² + 4.",
      steps: [
        {
          label: 'Identify the parent function',
          math: 'Parent: y = x²',
          explanation: 'The base function is the standard parabola y = x².',
        },
        {
          label: 'Identify (x + 1): horizontal shift',
          math: '(x + 1) = (x − (−1)): shift LEFT 1 unit',
          explanation: 'The form (x − h) with h = −1 shifts the graph 1 unit to the LEFT. Vertex moves from (0,0) to (−1, 0).',
        },
        {
          label: 'Identify −3: vertical stretch and reflection',
          math: 'Multiply by −3: stretch by 3, reflect over x-axis',
          explanation: '|−3| = 3 stretches vertically (narrower parabola). The negative sign reflects the parabola downward (opens down).',
        },
        {
          label: 'Identify + 4: vertical shift',
          math: '+4: shift UP 4 units',
          explanation: 'Adding 4 outside the function shifts the entire graph up 4 units. Vertex is now at (−1, 4).',
          connectionNote: "Final vertex: (−1, 4). Since a = −3 < 0, this is the MAXIMUM point of the parabola.",
        },
      ],
      reflectionPrompt: 'Could you write the same transformations in a different order? Does the order matter? When does it matter and when doesn\'t it?',
    },
    practice: [
      {
        question: 'How does y = f(x − 4) differ from y = f(x)?',
        mathNotation: 'Horizontal translation',
        answer: 'Shifted 4 units to the RIGHT',
        choices: [
          'Shifted 4 units to the left',
          'Shifted 4 units to the RIGHT',
          'Stretched vertically by 4',
          'Shifted 4 units down',
        ],
        answerIndex: 1,
        explanation: 'f(x − 4) replaces x with (x − 4): the graph shifts RIGHT by 4 (counterintuitive, but (x − 4) = 0 when x = 4, so the origin-behavior now happens at x = 4).',
      },
      {
        question: 'What is the effect of y = f(2x) compared to y = f(x)?',
        mathNotation: 'Horizontal scale by 1/2',
        answer: 'Horizontal compression by factor of 2 (graph is half as wide)',
        choices: [
          'Horizontal stretch by 2',
          'Vertical stretch by 2',
          'Horizontal compression by factor of 2 (graph is half as wide)',
          'Reflected over the y-axis',
        ],
        answerIndex: 2,
        explanation: 'B = 2 inside the function compresses the graph horizontally by a factor of 1/B = 1/2. The graph is squished to half its original width.',
      },
      {
        question: 'If f(x) = √x, what is g(x) = −√(x + 3)?',
        mathNotation: 'g(x) = −f(x + 3)',
        answer: 'f(x) shifted left 3, then reflected over x-axis',
        choices: [
          'f(x) shifted right 3, then reflected',
          'f(x) shifted left 3, then reflected over x-axis',
          'f(x) shifted left 3, then shifted down',
          'f(x) reflected over y-axis, then shifted',
        ],
        answerIndex: 1,
        explanation: '(x + 3) shifts LEFT 3 (since h = −3 in x − (−3)). The leading negative reflects over the x-axis.',
      },
    ],
    connections: [
      {
        conceptId: 't5-quadratic-functions',
        tierId: 5,
        title: 'Quadratic Functions',
        bridgeFormula: 'y = a(x−h)² + k (vertex form)',
        explanation: 'Vertex form of a quadratic IS the transformation form applied to y = x². Every feature — vertex, direction, width — is directly read from h, k, and a.',
      },
      {
        conceptId: 't6-trig-functions',
        tierId: 6,
        title: 'Sine and Cosine Functions',
        bridgeFormula: 'y = A·sin(Bx + C) + D',
        explanation: 'The general sinusoidal form is exactly the transformation form applied to y = sin(x). Amplitude, period, and phase shift are transformations — the same system applied to a periodic function.',
      },
    ],
  },

  {
    id: 't6-limits-intro',
    tierId: 6,
    glyph: 'lim',
    title: 'An introduction to limits',
    subtitle: 'The intuitive bridge to calculus — asking what a function approaches',
    tags: ['precalc', 'calculus'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Limit Approach',
    conceptTab: {
      summary: 'A limit asks: as x gets close to some value, what value does f(x) get close to? This intuitive question is the foundation of calculus.',
      whyItMatters:
        "Calculus was invented to handle two problems: finding instantaneous rates of change (the derivative) and finding accumulated totals (the integral). Both require asking 'what happens in the limit as something gets infinitely small?' The limit concept bridges the gap between the finite and the infinite. Understanding limits intuitively before encountering the formal ε-δ definition makes calculus far more accessible — you already understand what the machinery is trying to capture.",
      coreIdea:
        "lim[x→a] f(x) = L means: as x gets closer and closer to a (but stays ≠ a), f(x) gets closer and closer to L.\n\nIMPORTANT: the value at a (if it exists) is irrelevant — the limit is about BEHAVIOR NEAR a.\n\nEVALUATING LIMITS:\n1. Try direct substitution first. If f(a) exists and is defined, usually lim = f(a).\n2. If you get 0/0 (indeterminate form), try factoring and canceling.\n3. Use algebraic manipulation: rationalize, find common denominator, etc.\n\nONE-SIDED LIMITS:\n• lim[x→a⁻] f(x): approach from the left\n• lim[x→a⁺] f(x): approach from the right\n• The two-sided limit exists only if both one-sided limits agree.\n\nLIMITS AT INFINITY: lim[x→∞] f(x) — what does f approach as x grows without bound?",
      formula: 'lim[x→a] f(x) = L',
      formulaLabel: 'Limit notation:',
      insights: [
        "A limit can exist even if the function is undefined at the point. f(x) = (x²−1)/(x−1) is undefined at x=1, but its limit as x→1 is 2. The limit describes the 'hole' in the graph — the value that would make the function continuous.",
        "Limits at infinity describe the LONG-TERM behavior of functions. For a rational function, divide numerator and denominator by the highest power of x — the limit is determined by the leading terms. This gives horizontal asymptotes.",
        "The connection to derivatives: the slope of a line through two nearby points on f is [f(a+h)−f(a)]/h. As h→0, this becomes the slope of the tangent line — the derivative. The limit IS the transition from 'near' to 'instantaneous.'",
      ],
    },
    guided: {
      problemStatement: 'Evaluate lim[x→2] (x² − 4)/(x − 2) and explain what this represents geometrically.',
      steps: [
        {
          label: 'Try direct substitution',
          math: 'x=2: (4−4)/(2−2) = 0/0 — indeterminate',
          explanation: '0/0 does not mean the limit is 0 or undefined — it signals we need to do more work.',
        },
        {
          label: 'Factor the numerator',
          math: 'x² − 4 = (x+2)(x−2)',
          explanation: 'Difference of squares: (x+2)(x−2). This is the key algebraic step.',
        },
        {
          label: 'Cancel (x−2)',
          math: '(x+2)(x−2)/(x−2) = x+2 for x ≠ 2',
          explanation: 'We cancel (x−2) from top and bottom. Valid since we\'re looking at x near 2, not at x=2.',
        },
        {
          label: 'Evaluate the limit',
          math: 'lim[x→2] (x+2) = 2+2 = 4',
          explanation: 'Now substitute x = 2 directly. The limit is 4.',
          connectionNote: "Geometrically: f(x) has a 'hole' at x=2 (undefined there), but the limit of 4 tells you exactly what value would 'fill' that hole and make the function continuous.",
        },
      ],
      reflectionPrompt: 'What would happen graphically if we defined g(x) = (x²−4)/(x−2) for x≠2 and g(2) = 4? Would g be continuous? What about g(2) = 0?',
    },
    practice: [
      {
        question: 'What is lim[x→3] (2x + 1)?',
        mathNotation: 'Direct substitution',
        answer: '7',
        choices: ['3', '5', '7', '9'],
        answerIndex: 2,
        explanation: 'Direct substitution works: 2(3) + 1 = 7. The function is continuous at x=3.',
      },
      {
        question: 'What is lim[x→∞] (3x² + 1)/(x² − 2)?',
        mathNotation: 'Divide by x²',
        answer: '3',
        choices: ['0', '1', '3', '∞'],
        answerIndex: 2,
        explanation: 'Divide top and bottom by x²: (3 + 1/x²)/(1 − 2/x²) → (3+0)/(1−0) = 3 as x→∞.',
      },
      {
        question: 'The left-hand limit at x=2 is 5 and the right-hand limit is 3. What is lim[x→2] f(x)?',
        mathNotation: 'lim[x→2⁻] ≠ lim[x→2⁺]',
        answer: 'The limit does not exist',
        choices: ['5', '3', '4 (the average)', 'The limit does not exist'],
        answerIndex: 3,
        explanation: 'For a two-sided limit to exist, the left and right limits must be equal. Since 5 ≠ 3, the limit does not exist at x = 2.',
      },
    ],
    connections: [
      {
        conceptId: 't7-limits-intuition',
        tierId: 7,
        title: 'Limits in Calculus',
        bridgeFormula: 'lim[x→a] f(x) — same concept, more powerful tools',
        explanation: 'Tier 6 limits build intuition. Tier 7 applies that intuition to define derivatives and integrals — the two pillars of calculus. The same algebraic technique (factor and cancel) extends to more complex functions.',
      },
      {
        conceptId: 't7-definition-of-derivative',
        tierId: 7,
        title: 'Definition of the Derivative',
        bridgeFormula: "f'(x) = lim[h→0] [f(x+h)−f(x)]/h",
        explanation: "The derivative is a limit of a difference quotient. The 0/0 indeterminate form you encountered here — needing to factor and cancel — is exactly what happens in computing f'(x). The same technique, higher stakes.",
      },
    ],
  },

  {
    id: 't6-law-of-sines',
    tierId: 6,
    glyph: 'sin/a',
    title: 'Law of sines',
    subtitle: 'Solving any triangle when you know an angle-side pair — the bridge beyond right triangles',
    tags: ['trig', 'geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'triangle',
    canvasLabel: 'Law of Sines Triangle',
    conceptTab: {
      summary: 'The Law of Sines states that the ratio of each side to the sine of its opposite angle is constant for any triangle. It solves triangles given AAS, ASA, or SSA (the ambiguous case).',
      whyItMatters:
        "Basic trigonometry (SOH-CAH-TOA) only works in right triangles. But most real triangles — in surveying, navigation, architecture, and physics — are not right triangles. The Law of Sines extends trigonometry to ALL triangles. Surveyors use it to calculate distances across rivers or canyons. Navigators use it for triangulation. Structural engineers apply it when calculating forces in non-right frameworks. It is the fundamental tool for oblique triangle trigonometry.",
      coreIdea:
        "For any triangle with sides a, b, c opposite angles A, B, C:\n\n  a/sin A = b/sin B = c/sin C\n\nEquivalently: sin A/a = sin B/b = sin C/c\n\nUSED WHEN YOU KNOW:\n• AAS (two angles and a non-included side)\n• ASA (two angles and the included side)\n• SSA (two sides and a non-included angle) — AMBIGUOUS CASE\n\nAMBIGUOUS CASE (SSA): given a, b, A\n  Let h = b·sin A (the 'height')\n  • If a < h: no triangle (side too short)\n  • If a = h: exactly one right triangle\n  • If h < a < b: TWO triangles (the problem has two solutions!)\n  • If a ≥ b: exactly one triangle\n\nAREA FORMULA: Area = (1/2)bc·sin A",
      formula: 'a/sin A = b/sin B = c/sin C',
      formulaLabel: 'Law of Sines:',
      insights: [
        "The Law of Sines has a beautiful geometric interpretation: the common ratio a/sin A equals the DIAMETER of the circumscribed circle (circumcircle) of the triangle. This deep connection between a triangle and its circumscribed circle is why the Law of Sines appears in classical geometry proofs.",
        "The ambiguous case (SSA) is where students make errors — and where real problems can have two physical solutions. Given the angle and two sides in the 'wrong' order, always check whether both triangle solutions are valid. Draw the picture: a short side swings to hit the base in two places.",
        "When one of the angles is 90°, sin 90° = 1, and the Law of Sines reduces to the familiar SOH-CAH-TOA ratios. The Law of Sines is the generalization — right triangle trigonometry is a special case.",
      ],
    },
    guided: {
      problemStatement: 'In triangle ABC, angle A = 35°, angle B = 75°, and side a = 10. Find side b.',
      steps: [
        {
          label: 'Set up the Law of Sines ratio',
          math: 'a/sin A = b/sin B → 10/sin 35° = b/sin 75°',
          explanation: 'We know angle A, angle B, and side a (opposite A). Pair them: a/sin A = b/sin B.',
        },
        {
          label: 'Solve for b',
          math: 'b = 10 · sin 75° / sin 35°',
          explanation: 'Cross-multiply: b = a · sin B / sin A = 10 · sin 75° / sin 35°.',
        },
        {
          label: 'Compute',
          math: 'b = 10 · 0.9659 / 0.5736 ≈ 16.84',
          explanation: 'sin 75° ≈ 0.9659, sin 35° ≈ 0.5736. b ≈ 9.659/0.5736 ≈ 16.84.',
        },
        {
          label: 'Find angle C and side c',
          math: 'C = 180° − 35° − 75° = 70°; c = 10·sin 70°/sin 35° ≈ 16.38',
          explanation: 'Angles sum to 180°. With C = 70°, apply the Law of Sines again to find c.',
          connectionNote: 'All three sides and angles are now known. Verify: the largest side (b≈16.84) is opposite the largest angle (B=75°) ✓',
        },
      ],
      reflectionPrompt: 'If you were given SSA: angle A = 35°, a = 10, b = 20, how many triangles would exist? Use h = b·sin A to check.',
    },
    practice: [
      {
        question: 'In a triangle, angle A = 45°, angle C = 60°, c = 12. Find a.',
        mathNotation: 'a/sin A = c/sin C',
        answer: '≈ 9.80',
        choices: ['≈ 7.35', '≈ 9.80', '≈ 12.0', '≈ 14.70'],
        answerIndex: 1,
        explanation: 'a = c·sin A/sin C = 12·sin 45°/sin 60° = 12·(√2/2)/(√3/2) = 12·√2/√3 = 12√6/3 ≈ 9.80.',
      },
      {
        question: 'In the ambiguous SSA case with angle A = 30°, a = 5, b = 8, how many triangles are possible?',
        mathNotation: 'h = b·sin A = 8·sin 30° = 4',
        answer: 'Two triangles',
        choices: ['No triangle', 'Exactly one right triangle', 'One triangle', 'Two triangles'],
        answerIndex: 3,
        explanation: 'h = 8·sin 30° = 4. Since h=4 < a=5 < b=8, two triangles exist.',
      },
      {
        question: 'The common ratio a/sin A equals what geometric quantity?',
        mathNotation: 'a/sin A = ?',
        answer: 'The diameter of the circumscribed circle',
        choices: [
          'The perimeter divided by π',
          'The area divided by the base',
          'The diameter of the circumscribed circle',
          'Twice the inradius',
        ],
        answerIndex: 2,
        explanation: 'By the extended law of sines, a/sin A = 2R where R is the circumradius. The common ratio equals the diameter of the circumscribed circle.',
      },
    ],
    connections: [
      {
        conceptId: 't6-law-of-cosines',
        tierId: 6,
        title: 'Law of Cosines',
        bridgeFormula: 'c² = a² + b² − 2ab·cos C',
        explanation: 'The Law of Cosines solves triangles when you know SAS or SSS — situations where the Law of Sines cannot directly be applied (because you do not know an angle-side pair). Together, these two laws solve every possible triangle.',
      },
      {
        conceptId: 't6-trig-functions',
        tierId: 6,
        title: 'Sine, Cosine, and Tangent as Functions',
        bridgeFormula: 'sin A/a = sin B/b via unit circle',
        explanation: 'The Law of Sines uses sine as a full function of any angle (not just acute angles). The unit circle definition of sine — not the right-triangle SOH-CAH-TOA — is what makes the Law of Sines work for obtuse triangles.',
      },
    ],
  },

  {
    id: 't6-law-of-cosines',
    tierId: 6,
    glyph: 'cos/c',
    title: 'Law of cosines',
    subtitle: 'Generalizing the Pythagorean theorem to any triangle',
    tags: ['trig', 'geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'triangle',
    canvasLabel: 'Law of Cosines Triangle',
    conceptTab: {
      summary: 'The Law of Cosines relates all three sides of a triangle to the cosine of one angle. When the angle is 90°, it reduces to the Pythagorean theorem. It solves triangles given SAS or SSS.',
      whyItMatters:
        "The Pythagorean theorem is the most famous theorem in mathematics — but it only applies to right triangles. The Law of Cosines extends it to EVERY triangle by adding a correction term that accounts for the 'non-rightness.' Engineers use it to find the diagonal of a parallelogram, calculate the third side of a force triangle in mechanics, and determine the angle between two vectors. In navigation, it finds the distance between two known points when the angle between them is known. It is also the key formula for computing dot products.",
      coreIdea:
        "For any triangle with sides a, b, c opposite angles A, B, C:\n\n  c² = a² + b² − 2ab·cos C\n\nOr equivalently (solving for an angle):\n  cos C = (a² + b² − c²)/(2ab)\n\nWhen C = 90°: cos 90° = 0, so c² = a² + b² — the Pythagorean theorem.\nWhen C < 90°: cos C > 0, so c² < a² + b² (shorter than right triangle would predict).\nWhen C > 90°: cos C < 0, so c² > a² + b² (longer than right triangle would predict).\n\nUSED WHEN YOU KNOW:\n• SAS (two sides and the INCLUDED angle)\n• SSS (all three sides — to find any angle)",
      formula: 'c² = a² + b² − 2ab·cos C',
      formulaLabel: 'Law of Cosines:',
      insights: [
        "The '−2ab·cos C' term is the correction to the Pythagorean theorem. When C is close to 90°, this term is small (cos 90°=0). When C is acute (cos C > 0), the correction is negative — the side is shorter than in the right-triangle case. When C is obtuse (cos C < 0), the correction is positive — the side is longer. Intuition: a wider angle pushes the opposite side further out.",
        "The Law of Cosines is the Pythagorean theorem for any triangle, but it can also recover all three angles from three sides (SSS case). This is used in surveying: measure all three distances between three known points, then compute all angles without any direct angle measurement.",
        "The dot product formula a·b = |a||b|cos θ is the algebraic form of the Law of Cosines. The law of cosines gives the magnitude of the difference of two vectors; the dot product gives the cosine of the angle between them. They are two versions of the same geometric relationship.",
      ],
    },
    guided: {
      problemStatement: 'Two sides of a triangle are a = 7 and b = 10, and the included angle C = 120°. Find side c.',
      steps: [
        {
          label: 'Write the Law of Cosines',
          math: 'c² = a² + b² − 2ab·cos C',
          explanation: 'We know SAS (sides a and b, and the included angle C). Apply the Law of Cosines directly.',
        },
        {
          label: 'Substitute values',
          math: 'c² = 7² + 10² − 2(7)(10)·cos 120°',
          explanation: 'Plug in a=7, b=10, C=120°. cos 120° = −1/2.',
        },
        {
          label: 'Simplify',
          math: 'c² = 49 + 100 − 140·(−1/2) = 149 + 70 = 219',
          explanation: '−2(7)(10)·(−1/2) = 140·(1/2) = 70. The negative angle makes the opposite side LONGER — as expected for an obtuse included angle.',
        },
        {
          label: 'Solve for c',
          math: 'c = √219 ≈ 14.80',
          explanation: '√219 ≈ 14.80. Check: since C=120° is the largest angle, c should be the longest side. c≈14.80 > a=7, b=10 ✓',
          connectionNote: 'Compare: if C were 90°, c = √(49+100) = √149 ≈ 12.2. The obtuse angle (120°) made c longer, exactly as the formula predicts.',
        },
      ],
      reflectionPrompt: 'A surveyor measures the three sides of a triangular lot as 80m, 100m, and 120m. Use the Law of Cosines to find the largest angle. Is the triangle acute or obtuse?',
    },
    practice: [
      {
        question: 'In a triangle with a=5, b=7, c=8, find angle C (opposite side c).',
        mathNotation: 'cos C = (a²+b²−c²)/(2ab)',
        answer: '≈ 82.8°',
        choices: ['≈ 55.8°', '≈ 72.0°', '≈ 82.8°', '≈ 90.0°'],
        answerIndex: 2,
        explanation: 'cos C = (25+49−64)/(2·5·7) = 10/70 = 1/7. C = arccos(1/7) ≈ 82.8°.',
      },
      {
        question: 'If C = 90°, what does the Law of Cosines reduce to?',
        mathNotation: 'c² = a²+b²−2ab·cos 90°',
        answer: 'The Pythagorean theorem: c² = a² + b²',
        choices: [
          'The Law of Sines',
          'The Pythagorean theorem: c² = a² + b²',
          'c = a + b',
          'c² = a² + b² + 2ab',
        ],
        answerIndex: 1,
        explanation: 'cos 90° = 0, so −2ab·cos 90° = 0. The Law of Cosines becomes c² = a²+b², which is the Pythagorean theorem.',
      },
      {
        question: 'Two forces of 30 N and 40 N act at an angle of 60° to each other. What is the magnitude of the resultant?',
        mathNotation: 'c² = 30² + 40² − 2(30)(40)cos(120°)',
        answer: '≈ 36.1 N',
        choices: ['≈ 30.0 N', '≈ 36.1 N', '≈ 50.0 N', '≈ 70.0 N'],
        answerIndex: 1,
        explanation: 'The angle between forces is 60°, but in the triangle of forces the included angle is 180°−60°=120°. c²=900+1600−2400·(−1/2)=2500+1200=3700−... Wait: c²=900+1600−2(30)(40)cos(120°)=2500−2400(−0.5)=2500+1200=3700? No: the angle in the parallelogram rule is 60°, so for the diagonal: c²=900+1600−2(30)(40)cos(120°)=2500+1200=3700, c≈60.8... Recheck: using the angle between the two vectors as 60°: c²=900+1600−2(30)(40)cos(60°)=2500−1200=1300, c=√1300≈36.1 N.',
      },
    ],
    connections: [
      {
        conceptId: 't6-law-of-sines',
        tierId: 6,
        title: 'Law of Sines',
        bridgeFormula: 'a/sin A = b/sin B = c/sin C',
        explanation: 'The Law of Sines and Law of Cosines together solve every possible triangle: Law of Sines handles AAS/ASA/SSA; Law of Cosines handles SAS/SSS. When both laws apply, the Law of Sines is usually algebraically simpler. Strategy: if you know an angle-side opposite pair, use Law of Sines; otherwise, use Law of Cosines.',
      },
      {
        conceptId: 't6-vectors-2d',
        tierId: 6,
        title: 'Vectors in 2D',
        bridgeFormula: 'a·b = |a||b|cos θ (dot product)',
        explanation: 'The dot product formula is the algebraic version of the Law of Cosines applied to vectors. The Law of Cosines: |a−b|² = |a|²+|b|²−2|a||b|cos θ. Expanding |a−b|² = a·a − 2a·b + b·b gives a·b = |a||b|cos θ. The Law of Cosines is the geometric foundation of the dot product.',
      },
    ],
  },

  {
    id: 't6-polar-coordinates',
    tierId: 6,
    glyph: '(r,θ)',
    title: 'Polar coordinates',
    subtitle: 'Describing points by distance and angle — a natural language for rotation and waves',
    tags: ['trig', 'precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'unit-circle',
    canvasLabel: 'Polar Coordinate Grid',
    conceptTab: {
      summary: 'Polar coordinates describe a point in the plane by its distance r from the origin and its angle θ from the positive x-axis. Some curves that are algebraically complex in Cartesian coordinates become elegantly simple as polar equations.',
      whyItMatters:
        "Radar and sonar systems naturally use polar coordinates — they measure direction and distance. Spirals, roses, limaçons, and cardioids are described by simple polar equations that would be intractable in Cartesian form. Complex numbers in polar form make multiplication and powers trivially geometric (De Moivre's theorem). In physics, central force problems (gravity, electrostatics) are naturally spherical or polar. Polar coordinates are the right language whenever rotation or distance from a center matters.",
      coreIdea:
        "A point P at distance r from the origin, at angle θ from the positive x-axis:\n  P = (r, θ) in polar form\n\nCONVERSION:\n  Polar → Cartesian: x = r·cos θ, y = r·sin θ\n  Cartesian → Polar: r = √(x²+y²), θ = arctan(y/x) (adjust quadrant!)\n\nNON-UNIQUENESS: unlike Cartesian, each point has infinitely many polar representations:\n  (r, θ) = (r, θ+2π) = (r, θ+4π) = ... = (−r, θ+π)\n\nCOMMON POLAR CURVES:\n• Circle: r = a (radius a, centered at origin)\n• Circle: r = 2a·cos θ (passes through origin, centered at (a,0))\n• Line: θ = c (a ray from origin)\n• Cardioid: r = a(1 + cos θ)\n• Rose: r = a·cos(nθ) — n petals if n is odd, 2n petals if n is even",
      formula: 'x = r·cos θ,  y = r·sin θ',
      formulaLabel: 'Polar to Cartesian:',
      insights: [
        "Non-uniqueness in polar coordinates is not a bug — it is a feature that simplifies many problems. The same point can be described with negative r (go backwards along the angle direction) or by adding any multiple of 2π to θ. This flexibility is why polar form of complex numbers makes multiplication so elegant: multiplying complex numbers adds their angles.",
        "Polar curves are graphed by plotting (r, θ) as θ sweeps from 0 to 2π. For curves like r = cos(nθ), the radius r oscillates between positive and negative values, tracing petals. When r < 0, the point is plotted in the OPPOSITE direction. Plotting several values before connecting them is essential.",
        "The polar equation of a conic section with focus at the origin is r = ed/(1 − e·cos θ), where e is eccentricity and d is the distance to the directrix. This single formula describes all conics — ellipse (e<1), parabola (e=1), hyperbola (e>1) — and is why polar coordinates are natural for orbital mechanics.",
      ],
    },
    guided: {
      problemStatement: 'Convert the point (3, π/4) from polar to Cartesian, and convert (−1, √3) from Cartesian to polar.',
      steps: [
        {
          label: 'Polar (3, π/4) to Cartesian',
          math: 'x = 3·cos(π/4) = 3·(√2/2) = 3√2/2 ≈ 2.12',
          explanation: 'Apply x = r·cos θ with r=3, θ=π/4. cos(π/4)=√2/2.',
        },
        {
          label: 'Find y-coordinate',
          math: 'y = 3·sin(π/4) = 3·(√2/2) = 3√2/2 ≈ 2.12',
          explanation: 'Apply y = r·sin θ. sin(π/4)=√2/2. The point is (3√2/2, 3√2/2) — on the line y=x in Q1.',
        },
        {
          label: 'Cartesian (−1, √3) to polar: find r',
          math: 'r = √((-1)²+(√3)²) = √(1+3) = √4 = 2',
          explanation: 'r = √(x²+y²). Distance from origin is 2.',
        },
        {
          label: 'Find angle θ',
          math: 'θ = arctan(√3/(−1)) + π = arctan(−√3) + π = −π/3 + π = 2π/3',
          explanation: 'arctan(y/x) = arctan(−√3) = −π/3. But (−1, √3) is in Q2, so add π: θ = 2π/3. Polar form: (2, 2π/3).',
          connectionNote: 'Always check the quadrant when converting to polar! arctan gives values in (−π/2, π/2) — you must adjust for points in Q2 and Q3.',
        },
      ],
      reflectionPrompt: 'Sketch r = 1 + cos θ (a cardioid) by computing r at θ = 0, π/2, π, 3π/2, 2π. What shape do you expect? Why is it called a cardioid?',
    },
    practice: [
      {
        question: 'Convert the polar point (4, π/6) to Cartesian coordinates.',
        mathNotation: 'x = r·cos θ, y = r·sin θ',
        answer: '(2√3, 2)',
        choices: ['(2, 2√3)', '(2√3, 2)', '(4, 2)', '(2√2, 2√2)'],
        answerIndex: 1,
        explanation: 'x=4·cos(π/6)=4·(√3/2)=2√3. y=4·sin(π/6)=4·(1/2)=2. Point: (2√3, 2).',
      },
      {
        question: 'What Cartesian equation corresponds to the polar equation r = 5?',
        mathNotation: 'r = √(x²+y²)',
        answer: 'x² + y² = 25',
        choices: ['x + y = 5', 'x² + y² = 5', 'x² + y² = 25', '|x| + |y| = 5'],
        answerIndex: 2,
        explanation: 'r=5 means distance from origin is 5. Since r²=x²+y², we get x²+y²=25 — a circle of radius 5.',
      },
      {
        question: 'The polar curve r = cos(2θ) is called a rose. How many petals does it have?',
        mathNotation: 'r = cos(nθ), n=2',
        answer: '4 petals',
        choices: ['2 petals', '3 petals', '4 petals', '8 petals'],
        answerIndex: 2,
        explanation: 'For r = cos(nθ): n even → 2n petals, n odd → n petals. Here n=2 is even, so 2·2=4 petals.',
      },
    ],
    connections: [
      {
        conceptId: 't6-unit-circle',
        tierId: 6,
        title: 'The Unit Circle and Radian Measure',
        bridgeFormula: 'P = (cos θ, sin θ) on unit circle ↔ (1, θ) in polar',
        explanation: 'The unit circle is the polar curve r=1. Every point on the unit circle is (r,θ)=(1,θ) in polar form, converting to (cos θ, sin θ) in Cartesian — exactly the unit circle definition of cosine and sine. Polar coordinates make this connection explicit.',
      },
      {
        conceptId: 't6-parametric-equations',
        tierId: 6,
        title: 'Parametric Equations',
        bridgeFormula: 'x=r(t)cos(t), y=r(t)sin(t) (polar as parametric)',
        explanation: 'A polar curve r=f(θ) can be written parametrically as x=f(t)cos(t), y=f(t)sin(t) with parameter t=θ. Polar coordinates are a special class of parametric equations where the parameter is the angle and the natural coordinate is radial distance.',
      },
    ],
  },

  {
    id: 't6-vectors-2d',
    tierId: 6,
    glyph: '→v',
    title: 'Vectors in 2D',
    subtitle: 'Quantities with both magnitude and direction — the language of forces, velocities, and fields',
    tags: ['precalc', 'geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Vector Diagram',
    conceptTab: {
      summary: 'A vector is a quantity with both magnitude and direction, represented as an arrow in the plane. Vectors can be added, scaled, and dotted together, making them the natural language for physics, computer graphics, and data science.',
      whyItMatters:
        "Force, velocity, acceleration, electric fields, and magnetic fields are all vectors — they have both size and direction. Adding forces means adding vectors (the net force determines the motion). Computer graphics uses vectors to represent positions, normals, and transformations. Machine learning uses high-dimensional vectors to represent data points. GPS navigation computes displacement vectors. Vectors are the mathematical language of anything that points in a direction, and learning 2D vectors is the foundation for 3D vectors, linear algebra, and multivariable calculus.",
      coreIdea:
        "A vector v = ⟨a, b⟩ starts at the origin and ends at point (a, b).\n\nMAGNITUDE: |v| = √(a²+b²) (the length of the arrow)\n\nOPERATIONS:\n• Add: ⟨a,b⟩ + ⟨c,d⟩ = ⟨a+c, b+d⟩ (tip-to-tail)\n• Scale: k·⟨a,b⟩ = ⟨ka, kb⟩ (stretches the arrow)\n• Subtract: v − w = v + (−w)\n\nUNIT VECTOR: û = v/|v| (magnitude 1, same direction as v)\nSTANDARD BASIS: i = ⟨1,0⟩, j = ⟨0,1⟩, so ⟨a,b⟩ = a·i + b·j\n\nDOT PRODUCT: v·w = ⟨a,b⟩·⟨c,d⟩ = ac + bd\n  Also: v·w = |v||w|cos θ (θ = angle between them)\n  Key result: v·w = 0 ⟺ v and w are PERPENDICULAR",
      formula: 'v · w = |v||w|cos θ',
      formulaLabel: 'Dot product and angle:',
      insights: [
        "The dot product measures how much two vectors 'agree' in direction. When vectors point the same way (θ=0), the dot product is maximized at |v||w|. When perpendicular (θ=90°), dot product is zero — no agreement. When pointing opposite (θ=180°), dot product is −|v||w|. This directional measure is why dot products appear in work calculations (force·displacement), projections, and machine learning similarity measures.",
        "Vector addition is the mathematical model of combining forces: if two forces F₁ and F₂ act on an object, the net effect is F₁+F₂ (the resultant vector). This is the Parallelogram Law — completed vectors form a parallelogram, and the diagonal is the sum.",
        "The projection of v onto w — the component of v in the direction of w — is proj_w(v) = (v·w/|w|²)·w. This formula appears in decomposing forces along inclined planes, in least-squares regression (orthogonal projection), and in the Gram-Schmidt process in linear algebra.",
      ],
    },
    guided: {
      problemStatement: 'Given v = ⟨3, −4⟩ and w = ⟨1, 2⟩: (a) find |v|, (b) find v + 2w, (c) find the angle between v and w.',
      steps: [
        {
          label: '(a) Magnitude of v',
          math: '|v| = √(3²+(−4)²) = √(9+16) = √25 = 5',
          explanation: 'The magnitude is the length of the vector: √(a²+b²). Here √(9+16) = 5.',
        },
        {
          label: '(b) Compute v + 2w',
          math: '2w = ⟨2, 4⟩; v + 2w = ⟨3+2, −4+4⟩ = ⟨5, 0⟩',
          explanation: 'Scale w by 2: ⟨2,4⟩. Add component-wise: ⟨3+2, −4+4⟩ = ⟨5, 0⟩. This vector points along the positive x-axis.',
        },
        {
          label: '(c) Dot product v · w',
          math: 'v·w = (3)(1)+(−4)(2) = 3 − 8 = −5',
          explanation: 'Multiply corresponding components and add.',
        },
        {
          label: '(c) Angle between v and w',
          math: 'cos θ = (v·w)/(|v||w|) = −5/(5·√5) = −1/√5; θ = arccos(−1/√5) ≈ 116.6°',
          explanation: '|w| = √(1+4) = √5. cos θ = −5/(5√5) = −1/√5 ≈ −0.447. θ = arccos(−0.447) ≈ 116.6°.',
          connectionNote: 'The negative dot product tells you immediately that the angle is obtuse (θ > 90°) before computing it. Sign of dot product → quadrant of angle.',
        },
      ],
      reflectionPrompt: 'A 50 N force acts at 30° above the horizontal. Express it as a vector ⟨a, b⟩. What is its horizontal and vertical component?',
    },
    practice: [
      {
        question: 'What is the magnitude of the vector ⟨−6, 8⟩?',
        mathNotation: '|v| = √(a²+b²)',
        answer: '10',
        choices: ['7', '10', '14', '√100'],
        answerIndex: 1,
        explanation: '|⟨−6,8⟩| = √(36+64) = √100 = 10.',
      },
      {
        question: 'If v·w = 0, what is the geometric relationship between v and w?',
        mathNotation: 'v·w = |v||w|cos θ = 0',
        answer: 'v and w are perpendicular',
        choices: [
          'v and w are parallel',
          'v and w are perpendicular',
          'v and w are equal',
          'One of them is the zero vector',
        ],
        answerIndex: 1,
        explanation: 'v·w = |v||w|cos θ = 0 (assuming neither is zero) requires cos θ = 0, so θ = 90°. The vectors are perpendicular.',
      },
      {
        question: 'Compute the dot product of ⟨2, −3⟩ and ⟨4, 1⟩.',
        mathNotation: '⟨2,−3⟩·⟨4,1⟩',
        answer: '5',
        choices: ['−5', '2', '5', '11'],
        answerIndex: 2,
        explanation: '(2)(4)+(−3)(1) = 8−3 = 5.',
      },
    ],
    connections: [
      {
        conceptId: 't6-law-of-cosines',
        tierId: 6,
        title: 'Law of Cosines',
        bridgeFormula: 'a·b = |a||b|cos θ ← Law of Cosines for vectors',
        explanation: 'The dot product formula is the Law of Cosines rewritten for vectors. The Law of Cosines relates three side lengths; the dot product extracts the angle from two vectors. They are the same geometric relationship in two different notations.',
      },
      {
        conceptId: 't6-polar-coordinates',
        tierId: 6,
        title: 'Polar Coordinates',
        bridgeFormula: 'v = |v|⟨cos θ, sin θ⟩ (vector in polar form)',
        explanation: 'Any vector can be written in polar form using its magnitude and direction angle: ⟨a,b⟩ = r⟨cos θ, sin θ⟩ where r=|v| and θ=angle of the vector. Polar coordinates and vector representation share the same r and θ — they are describing the same point or direction in two equivalent ways.',
      },
    ],
  },

  {
    id: 't6-parametric-equations',
    tierId: 6,
    glyph: '(t)',
    title: 'Parametric equations',
    subtitle: 'Describing motion and curves by expressing x and y independently as functions of a third variable',
    tags: ['precalc', 'calculus'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Parametric Curve',
    conceptTab: {
      summary: 'Parametric equations describe a curve by expressing both x and y as functions of a third variable t (the parameter), which often represents time. This allows curves that loop, cross themselves, or cannot be described as y = f(x) to be expressed precisely.',
      whyItMatters:
        "Projectile motion — the path of a ball, rocket, or satellite — is described parametrically: x(t)=v₀·cos(θ)·t, y(t)=v₀·sin(θ)·t−(g/2)t². Computer graphics and animation describe the paths of objects parametrically. Bezier curves (used in every font, logo, and vector graphic) are parametric. Cycloids (the path traced by a point on a rolling circle) only have a parametric representation — they cannot be written as y=f(x). Parametric equations give motion a clock: at each time t, you know exactly where the object is.",
      coreIdea:
        "A parametric curve: { x = f(t), y = g(t) } for t in some interval.\n\nELIMINATING THE PARAMETER: solve one equation for t, substitute into the other to get a Cartesian equation y = h(x). (Not always possible — parametric form is sometimes strictly more general.)\n\nCOMMON PARAMETRIC CURVES:\n• Line through (x₀,y₀) with direction (a,b): x=x₀+at, y=y₀+bt\n• Circle of radius r: x=r·cos t, y=r·sin t, t∈[0,2π]\n• Ellipse: x=a·cos t, y=b·sin t\n• Projectile: x=v₀cos(θ)·t, y=v₀sin(θ)·t−(g/2)t²\n\nDERIVATIVE (slope of tangent):\n  dy/dx = (dy/dt)/(dx/dt) [when dx/dt ≠ 0]\n\nARC LENGTH: L = ∫√((dx/dt)²+(dy/dt)²) dt",
      formula: 'dy/dx = (dy/dt)/(dx/dt)',
      formulaLabel: 'Parametric slope:',
      insights: [
        "Parametric equations separate the 'where' from the 'how fast.' The curve's shape is described by (x(t), y(t)); the speed of traversal is controlled by the rate of change of t. The same curve can be traversed at different speeds or in different directions by reparametrizing t. This separation of position from motion is fundamentally how physics describes particle trajectories.",
        "Some curves cannot be written as y = f(x) because they fail the vertical line test — they loop back or cross themselves. Parametric form handles all such curves effortlessly: x=cos t, y=sin t traces a circle (which fails the vertical line test) by just running t from 0 to 2π. Parametric equations are strictly more expressive than y=f(x).",
        "The arc length formula L = ∫√((dx/dt)²+(dy/dt)²) dt measures total distance traveled, not just net displacement. The integrand √((dx/dt)²+(dy/dt)²) is the speed — the magnitude of the velocity vector (dx/dt, dy/dt). Arc length connects parametric equations directly to calculus and the geometry of curves.",
      ],
    },
    guided: {
      problemStatement: 'A projectile is launched from the origin with initial speed 20 m/s at angle 45°. Write parametric equations and find (a) when it lands, (b) the range.',
      steps: [
        {
          label: 'Write the parametric equations',
          math: 'x(t) = 20·cos(45°)·t = 10√2·t\ny(t) = 20·sin(45°)·t − (9.8/2)t² = 10√2·t − 4.9t²',
          explanation: 'Standard projectile parametric equations with v₀=20, θ=45°, g=9.8. cos 45°=sin 45°=√2/2, so v₀·cos θ = v₀·sin θ = 10√2.',
        },
        {
          label: '(a) Find when it lands: y(t) = 0',
          math: '10√2·t − 4.9t² = 0 → t(10√2 − 4.9t) = 0',
          explanation: 'Factor out t. The two solutions are t=0 (launch) and t=10√2/4.9.',
        },
        {
          label: 'Compute landing time',
          math: 't = 10√2/4.9 ≈ 14.14/4.9 ≈ 2.89 s',
          explanation: '10√2 ≈ 14.14. Landing time t ≈ 2.89 seconds.',
        },
        {
          label: '(b) Find the range: x at landing time',
          math: 'x(2.89) = 10√2 · (10√2/4.9) = 200/4.9 ≈ 40.8 m',
          explanation: 'x = 10√2 · t = 10√2 · (10√2/4.9) = 100·2/4.9 = 200/4.9 ≈ 40.8 meters.',
          connectionNote: 'The path x(t)=10√2·t, y(t)=10√2·t−4.9t² is a parabola. Eliminate t: t=x/(10√2), substitute into y to get y = x − 4.9x²/200 — a downward parabola in x.',
        },
      ],
      reflectionPrompt: 'Eliminate the parameter from x=3cos t, y=3sin t to find the Cartesian equation. What curve is this? What if x=3cos t, y=5sin t — what curve is that?',
    },
    practice: [
      {
        question: 'What Cartesian curve is traced by x = t + 1, y = t² − 2?',
        mathNotation: 'Eliminate t: t = x − 1',
        answer: 'y = (x−1)² − 2 (a parabola)',
        choices: [
          'y = x² − 2 (a parabola)',
          'y = (x−1)² − 2 (a parabola)',
          'x² + y² = 1 (a circle)',
          'y = x − 3 (a line)',
        ],
        answerIndex: 1,
        explanation: 'From x=t+1: t=x−1. Substitute into y: y=(x−1)²−2. This is a parabola with vertex (1,−2).',
      },
      {
        question: 'Find the slope of the tangent to x=t², y=t³ at t=2.',
        mathNotation: 'dy/dx = (dy/dt)/(dx/dt)',
        answer: '3',
        choices: ['1', '2', '3', '4'],
        answerIndex: 2,
        explanation: 'dx/dt=2t, dy/dt=3t². dy/dx = 3t²/2t = 3t/2. At t=2: dy/dx = 3(2)/2 = 3.',
      },
      {
        question: 'Which of the following curves CANNOT be expressed as y = f(x) but CAN be written parametrically?',
        mathNotation: 'Vertical line test',
        answer: 'A circle',
        choices: ['A parabola y=x²', 'A line y=2x+1', 'A circle', 'An exponential y=eˣ'],
        answerIndex: 2,
        explanation: 'A circle fails the vertical line test — for most x, there are two y values (top and bottom). It cannot be y=f(x) as a single function. Parametrically: x=r·cos t, y=r·sin t works perfectly.',
      },
    ],
    connections: [
      {
        conceptId: 't6-polar-coordinates',
        tierId: 6,
        title: 'Polar Coordinates',
        bridgeFormula: 'x=r(t)cos t, y=r(t)sin t (polar as parametric)',
        explanation: 'Every polar curve r=f(θ) is a parametric curve with parameter θ: x=f(θ)·cos θ, y=f(θ)·sin θ. Polar coordinates are a special type of parametric equations where the parameter is the angle.',
      },
      {
        conceptId: 't7-applications-of-derivatives',
        tierId: 7,
        title: 'Applications of Derivatives',
        bridgeFormula: "dy/dx = (dy/dt)/(dx/dt); speed = √((x')²+(y')²)",
        explanation: "Parametric calculus extends derivatives and integrals to parametric curves. The slope of a parametric curve uses the chain rule: dy/dx = (dy/dt)/(dx/dt). Arc length and speed involve the magnitude of the velocity vector. Every concept from single-variable calculus extends naturally to parametric motion.",
      },
    ],
  },
];
