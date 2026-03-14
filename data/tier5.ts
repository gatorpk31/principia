import type { Concept } from '../types';

export const TIER5_CONCEPTS: Concept[] = [
  {
    id: 't5-quadratic-functions',
    tierId: 5,
    glyph: '∪',
    title: 'Quadratic functions and parabolas',
    subtitle: 'The shape of anything that rises and falls — or falls and rises',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'parabola',
    canvasLabel: 'Parabola',
    conceptTab: {
      summary: 'A quadratic function is any function of the form f(x) = ax² + bx + c, whose graph is a parabola — the U-shaped curve that describes projectile motion, satellite dishes, and suspension bridges.',
      whyItMatters:
        "Throw a ball — it follows a parabola. The reflector in a flashlight is parabolic (all light bounces through the focus). Suspension bridge cables hang in parabolic arcs. Satellite dishes, car headlights, radio telescopes — all parabolas. Quadratics are the first 'nonlinear' function you study: they curve, they have a maximum or minimum, and they model the real world in ways that straight lines cannot.",
      coreIdea:
        "f(x) = ax² + bx + c (standard form)\nf(x) = a(x−h)² + k (vertex form — most useful)\nf(x) = a(x−r₁)(x−r₂) (factored form — shows roots)\n\nKEY FEATURES:\n• VERTEX (h, k): the maximum or minimum point\n  - If a > 0: parabola opens UP, vertex is a minimum\n  - If a < 0: parabola opens DOWN, vertex is a maximum\n• AXIS OF SYMMETRY: x = h (vertical line through vertex)\n• x-INTERCEPTS (roots/zeros): where f(x) = 0\n• y-INTERCEPT: f(0) = c\n\nFinding the vertex from standard form:\n  h = −b/(2a), then k = f(h)",
      formula: 'Vertex: h = −b/(2a), k = f(h)',
      formulaLabel: 'Vertex formula:',
      insights: [
        "The coefficient a controls both the direction (up/down) and the width (|a| large = narrow, |a| small = wide). The vertex form f(x) = a(x−h)² + k makes all transformations transparent: h shifts left/right, k shifts up/down.",
        "A parabola is symmetric about its axis. Every point on the left of the vertex has a mirror image on the right with the same y-value. This symmetry is why vertex form is so powerful: once you know the vertex, half the parabola describes the other half.",
        "The discriminant b² − 4ac from the quadratic formula tells you how many real roots: positive → 2 roots, zero → 1 root (vertex touches x-axis), negative → 0 real roots (parabola doesn't cross x-axis).",
      ],
    },
    guided: {
      problemStatement: 'Find the vertex, axis of symmetry, and x-intercepts of f(x) = x² − 6x + 5.',
      steps: [
        {
          label: 'Find the vertex (axis of symmetry)',
          math: 'h = −b/(2a) = −(−6)/(2·1) = 6/2 = 3',
          explanation: 'Identify a=1, b=−6, c=5. The axis of symmetry is x = 3.',
        },
        {
          label: 'Find the vertex y-value',
          math: 'k = f(3) = 9 − 18 + 5 = −4',
          explanation: 'Substitute x=3 into the function: f(3) = 3² − 6(3) + 5 = 9 − 18 + 5 = −4. Vertex: (3, −4).',
        },
        {
          label: 'Find the x-intercepts',
          math: 'x² − 6x + 5 = 0 → (x−1)(x−5) = 0 → x = 1 or x = 5',
          explanation: 'Factor: (x−1)(x−5) = 0 gives roots x = 1 and x = 5.',
        },
        {
          label: 'Check symmetry',
          math: 'Midpoint of roots: (1+5)/2 = 3 ✓',
          explanation: 'The midpoint of the x-intercepts is always the axis of symmetry. 3 matches our vertex. ✓',
          connectionNote: 'The roots are symmetric about x = 3: the root x=1 is 2 units left; x=5 is 2 units right. Symmetry is built in.',
        },
      ],
      reflectionPrompt: 'How does changing the coefficient a affect the shape of the parabola? What happens to the vertex if you add a constant to f(x)?',
    },
    practice: [
      {
        question: 'For f(x) = −2x² + 8x − 3, does the parabola open up or down, and is the vertex a max or min?',
        mathNotation: 'a = −2',
        answer: 'Opens down; vertex is a maximum',
        choices: [
          'Opens up; vertex is a minimum',
          'Opens down; vertex is a maximum',
          'Opens up; vertex is a maximum',
          'Opens down; vertex is a minimum',
        ],
        answerIndex: 1,
        explanation: 'a = −2 < 0, so the parabola opens downward. A downward parabola has a highest point — a maximum — at its vertex.',
      },
      {
        question: 'What is the axis of symmetry for f(x) = x² + 4x + 1?',
        mathNotation: 'x = −b/(2a)',
        answer: 'x = −2',
        choices: ['x = 2', 'x = −2', 'x = 4', 'x = −4'],
        answerIndex: 1,
        explanation: 'a=1, b=4. Axis: x = −4/(2·1) = −2.',
      },
      {
        question: 'The vertex of a parabola is (2, −5) and it passes through (4, 3). Find a in f(x) = a(x−2)² − 5.',
        mathNotation: '3 = a(4−2)² − 5',
        answer: '2',
        choices: ['1', '2', '3', '4'],
        answerIndex: 1,
        explanation: 'Plug (4, 3) into vertex form: 3 = a(4−2)² − 5 → 3 = 4a − 5 → 4a = 8 → a = 2.',
      },
    ],
    connections: [
      {
        conceptId: 't5-quadratic-formula',
        tierId: 5,
        title: 'The Quadratic Formula',
        bridgeFormula: 'x = [−b ± √(b²−4ac)] / (2a)',
        explanation: 'The quadratic formula finds the x-intercepts of any parabola — even ones that are hard to factor. It is derived by applying the technique of "completing the square" to the general quadratic.',
      },
      {
        conceptId: 't7-applications-of-derivatives',
        tierId: 7,
        title: 'Applications of Derivatives',
        bridgeFormula: "f'(x) = 0 at vertex",
        explanation: "The vertex of a parabola is where the derivative is zero — the transition from increasing to decreasing (or vice versa). Every optimization problem in calculus generalizes finding the vertex of a parabola.",
      },
    ],
  },

  {
    id: 't5-quadratic-formula',
    tierId: 5,
    glyph: '±√',
    title: 'The quadratic formula and discriminant',
    subtitle: 'Solving any quadratic equation — and knowing in advance what you\'ll find',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'parabola',
    canvasLabel: 'Roots on Parabola',
    conceptTab: {
      summary: 'The quadratic formula solves any equation of the form ax² + bx + c = 0. The discriminant b² − 4ac tells you how many real solutions exist before you even solve.',
      whyItMatters:
        "Factoring only works when the roots happen to be nice numbers. Most real-world quadratics — trajectory calculations, structural engineering, economic models — don't factor neatly. The quadratic formula handles ALL quadratics. It is one of the first formulas in history to be systematically derived (Babylonian mathematicians had versions of it 3,700 years ago), and it remains essential in science, engineering, and computer graphics.",
      coreIdea:
        "For ax² + bx + c = 0 (a ≠ 0):\n\n  x = [−b ± √(b²−4ac)] / (2a)\n\nTHE DISCRIMINANT D = b² − 4ac tells you the nature of the solutions:\n• D > 0: two distinct real roots (parabola crosses x-axis twice)\n• D = 0: one repeated real root (parabola touches x-axis exactly once)\n• D < 0: no real roots — two complex roots (parabola doesn't reach x-axis)\n\nDERIVATION: The formula comes from 'completing the square' on the general quadratic. Every step is algebraic — the formula is not magic, it's systematic algebra.",
      formula: 'x = [−b ± √(b²−4ac)] / (2a)',
      formulaLabel: 'Quadratic formula:',
      insights: [
        "The '±' in the formula produces two solutions — one with +√, one with −√. These are the two x-intercepts. When D = 0, both solutions are identical: x = −b/(2a), which is just the vertex x-coordinate.",
        "Completing the square is the technique behind the quadratic formula — and it's also how you convert standard form to vertex form. So deriving the formula teaches you two skills at once.",
        "Complex roots come in conjugate pairs: if a+bi is a root, so is a−bi (when a, b, c are real). This means a real quadratic either has 2 real roots or 2 complex conjugate roots — never just one complex root.",
      ],
    },
    guided: {
      problemStatement: 'Solve 2x² − 3x − 2 = 0 using the quadratic formula.',
      steps: [
        {
          label: 'Identify a, b, c',
          math: 'a = 2, b = −3, c = −2',
          explanation: 'Match coefficients to the standard form ax² + bx + c = 0.',
        },
        {
          label: 'Compute the discriminant',
          math: 'D = b² − 4ac = (−3)² − 4(2)(−2) = 9 + 16 = 25',
          explanation: 'D = 25 > 0 means two distinct real roots. And √25 = 5, a perfect square — great!',
        },
        {
          label: 'Apply the formula',
          math: 'x = [3 ± 5] / 4',
          explanation: 'x = [−(−3) ± √25] / (2·2) = [3 ± 5] / 4.',
        },
        {
          label: 'Find both roots',
          math: 'x = (3+5)/4 = 2 and x = (3−5)/4 = −1/2',
          explanation: 'x = 8/4 = 2 or x = −2/4 = −1/2. The two solutions are x = 2 and x = −1/2.',
          connectionNote: 'Check: 2(2)² − 3(2) − 2 = 8−6−2 = 0 ✓. And 2(1/4) − 3(−1/2) − 2 = 1/2 + 3/2 − 2 = 0 ✓.',
        },
      ],
      reflectionPrompt: 'The discriminant was a perfect square (25). What happens when the discriminant is not a perfect square? What does that mean about the roots?',
    },
    practice: [
      {
        question: 'For 3x² + 2x + 5 = 0, what does the discriminant tell you?',
        mathNotation: 'D = 4 − 60 = −56',
        answer: 'No real solutions (two complex roots)',
        choices: ['Two real roots', 'One repeated real root', 'No real solutions (two complex roots)', 'Cannot tell'],
        answerIndex: 2,
        explanation: 'D = b²−4ac = 4 − 4(3)(5) = 4 − 60 = −56 < 0. Negative discriminant means no real roots.',
      },
      {
        question: 'Solve x² − 5x + 6 = 0 using the quadratic formula.',
        mathNotation: 'x = [5 ± √(25−24)] / 2',
        answer: 'x = 2 or x = 3',
        choices: ['x = −2 or x = −3', 'x = 2 or x = 3', 'x = 1 or x = 6', 'x = 5 or x = 1'],
        answerIndex: 1,
        explanation: 'D = 25−24 = 1. x = (5±1)/2. So x = 3 or x = 2. (Equivalently, factor as (x−2)(x−3).)',
      },
      {
        question: 'If a quadratic has discriminant D = 0, its graph does what?',
        mathNotation: 'D = b²−4ac = 0',
        answer: 'Touches the x-axis at exactly one point (vertex on x-axis)',
        choices: [
          'Does not cross the x-axis',
          'Crosses the x-axis twice',
          'Touches the x-axis at exactly one point (vertex on x-axis)',
          'Is a straight line',
        ],
        answerIndex: 2,
        explanation: 'D = 0 means one repeated root: x = −b/(2a). Geometrically, the vertex of the parabola sits exactly on the x-axis.',
      },
    ],
    connections: [
      {
        conceptId: 't5-complex-numbers',
        tierId: 5,
        title: 'Complex Numbers',
        bridgeFormula: 'x = (−b ± i√|D|) / (2a) when D < 0',
        explanation: 'When the discriminant is negative, the square root is imaginary. The quadratic formula produces complex roots a ± bi. Understanding complex numbers is what makes the formula complete.',
      },
      {
        conceptId: 't5-quadratic-functions',
        tierId: 5,
        title: 'Quadratic Functions and Parabolas',
        bridgeFormula: 'vertex x = −b/(2a), roots via formula',
        explanation: "The quadratic formula's denominator 2a appears in the vertex formula h = −b/(2a). The vertex x-coordinate is the average of the two roots — visible when you look at [−b+√D]/2a and [−b−√D]/2a.",
      },
    ],
  },

  {
    id: 't5-exponential-growth',
    tierId: 5,
    glyph: 'eˣ',
    title: 'Exponential growth and decay',
    subtitle: 'When quantities multiply by a fixed factor — compounding changes everything',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Exponential Curve',
    conceptTab: {
      summary: 'An exponential function grows (or shrinks) by a constant multiplicative factor. Compound interest, population growth, radioactive decay, and viral spread all follow exponential laws.',
      whyItMatters:
        "A penny doubled every day for 30 days is worth over $10 million. COVID-19 spread exponentially in its early phase. Radioactive carbon-14 decays exponentially — which is how we date ancient fossils. Bacteria in a petri dish double every 20 minutes. Exponential growth is the most misunderstood kind of growth, because humans naturally think in linear (additive) terms. Understanding exponential functions is essential for finance, epidemiology, ecology, and physics.",
      coreIdea:
        "Exponential function: f(x) = a · bˣ where b > 0 and b ≠ 1.\n• a = initial value (f(0) = a)\n• b = growth factor (b > 1: growth, 0 < b < 1: decay)\n\nGROWTH: f(x) = a(1 + r)ˣ (r = growth rate as a decimal)\nDECAY: f(x) = a(1 − r)ˣ\n\nCOMPOUND INTEREST: A = P(1 + r/n)^(nt)\n• P = principal, r = annual rate, n = times compounded per year, t = years\n\nCONTINUOUS GROWTH: A = Peʳᵗ (the natural base e ≈ 2.718)\n\nHALF-LIFE: Time for a decaying quantity to reach half its value.\nIf A = A₀·(1/2)^(t/h) where h = half-life.",
      formula: 'f(x) = a · bˣ',
      formulaLabel: 'Exponential function:',
      insights: [
        "Exponential growth is FAST — faster than any polynomial. For large x, 2ˣ eventually beats x¹⁰⁰⁰, because exponentials grow faster than any fixed power. This 'eventually wins' property explains why compound interest is so powerful over decades.",
        "The base e ≈ 2.71828... is special: eˣ is the unique function that is its own derivative. This makes e the natural base for calculus, physics, and probability. It appears wherever growth is proportional to current size.",
        "Exponential decay is a mirror of growth: the same formula, but b is between 0 and 1. Both growth and decay approach their horizontal asymptote (usually y = 0) but never reach it — they get exponentially closer but never touch.",
      ],
    },
    guided: {
      problemStatement: '$1,000 is invested at 6% annual interest, compounded monthly. How much is it worth after 5 years?',
      steps: [
        {
          label: 'Identify the variables',
          math: 'P = 1000, r = 0.06, n = 12, t = 5',
          explanation: 'Principal P = $1,000. Annual rate r = 6% = 0.06. Compounded monthly means n = 12. Time t = 5 years.',
        },
        {
          label: 'Apply the compound interest formula',
          math: 'A = 1000(1 + 0.06/12)^(12·5)',
          explanation: 'A = P(1 + r/n)^(nt). Substitute all values.',
        },
        {
          label: 'Simplify the base',
          math: '1 + 0.06/12 = 1 + 0.005 = 1.005',
          explanation: 'Divide the rate by the number of compounding periods: 0.06/12 = 0.005.',
        },
        {
          label: 'Compute',
          math: 'A = 1000(1.005)^60 ≈ 1000 × 1.3489 ≈ $1,348.85',
          explanation: '(1.005)^60 ≈ 1.3489. The investment grows to about $1,348.85.',
          connectionNote: 'With simple interest (no compounding): $1,000 + 5 × $60 = $1,300. Compounding adds an extra $48.85 — and this gap grows dramatically over longer periods.',
        },
      ],
      reflectionPrompt: 'What would the account be worth after 30 years? How does the compounding period (monthly vs. daily vs. yearly) affect the final amount?',
    },
    practice: [
      {
        question: 'A population of 500 bacteria doubles every 3 hours. How many are there after 12 hours?',
        mathNotation: 'f(t) = 500 · 2^(t/3)',
        answer: '8,000',
        choices: ['2,000', '4,000', '8,000', '16,000'],
        answerIndex: 2,
        explanation: 'After 12 hours: t/3 = 4 doublings. f(12) = 500 · 2⁴ = 500 · 16 = 8,000.',
      },
      {
        question: 'A radioactive substance decays at 10% per year. If you start with 200 grams, how much remains after 3 years?',
        mathNotation: 'f(3) = 200(0.9)³',
        answer: '145.8 grams',
        choices: ['140 grams', '145.8 grams', '162 grams', '170 grams'],
        answerIndex: 1,
        explanation: 'f(3) = 200(1 − 0.10)³ = 200(0.9)³ = 200(0.729) = 145.8 grams.',
      },
      {
        question: 'Which function represents exponential DECAY?',
        mathNotation: 'f(x) = a · bˣ',
        answer: 'f(x) = 5 · (0.8)ˣ',
        choices: ['f(x) = 5 · (1.2)ˣ', 'f(x) = 5 · (0.8)ˣ', 'f(x) = 5x²', 'f(x) = 5 + 0.8x'],
        answerIndex: 1,
        explanation: 'Exponential decay requires b between 0 and 1. b = 0.8 means each step the quantity becomes 80% of what it was — it shrinks.',
      },
    ],
    connections: [
      {
        conceptId: 't5-logarithms',
        tierId: 5,
        title: 'Logarithms',
        bridgeFormula: 'y = bˣ ↔ x = log_b(y)',
        explanation: 'Logarithms are the inverse of exponential functions. To solve bˣ = y for x, take the logarithm of both sides. Exponentials and logarithms are two sides of the same coin.',
      },
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: 'd/dx[eˣ] = eˣ',
        explanation: "eˣ is the unique function that is its own derivative — which is why the differential equation dy/dt = ky has solution y = Ceᵏᵗ. Every exponential growth model in science solves this equation.",
      },
    ],
  },

  {
    id: 't5-logarithms',
    tierId: 5,
    glyph: 'log',
    title: 'Logarithms',
    subtitle: 'The inverse of the exponential — undoing repeated multiplication',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Logarithm Graph',
    conceptTab: {
      summary: 'A logarithm answers the question: what exponent gives this result? log_b(x) = y means b^y = x.',
      whyItMatters:
        "The Richter scale measures earthquakes logarithmically — a magnitude 7 quake is 10 times stronger than magnitude 6. Decibels (sound), pH (acidity), and stellar brightness are all logarithmic scales. Why? Because logarithms compress enormously wide ranges into manageable numbers. The human ear hears sounds spanning a factor of 10 trillion — logarithms make this expressible from 0 to 120 dB. Logarithms also solve exponential equations, making them essential for finance, biology, and physics.",
      coreIdea:
        "DEFINITION: log_b(x) = y means b^y = x (b > 0, b ≠ 1, x > 0)\n\nSPECIAL LOGS:\n• Common log: log₁₀(x) = log(x)\n• Natural log: log_e(x) = ln(x)\n\nLOG RULES (match exponent rules):\n• log_b(xy) = log_b(x) + log_b(y)  [Product → sum]\n• log_b(x/y) = log_b(x) − log_b(y)  [Quotient → difference]\n• log_b(xⁿ) = n·log_b(x)  [Power → multiply]\n• log_b(b) = 1, log_b(1) = 0\n\nCHANGE OF BASE: log_b(x) = ln(x)/ln(b) = log(x)/log(b)",
      formula: 'log_b(x) = y ↔ b^y = x',
      formulaLabel: 'Logarithm definition:',
      insights: [
        "Logarithms turn multiplication into addition. This is why slide rules (the calculators of the pre-digital era) used logarithmic scales — multiplying two numbers became sliding two distances. The log rules are exactly this: log(xy) = log(x) + log(y).",
        "The graph of y = log_b(x) is the reflection of y = b^x across the line y = x. They are inverse functions — each undoes the other. The domain of the log is (0, ∞), and it has a vertical asymptote at x = 0.",
        "ln(x) is the most important logarithm in calculus: ∫(1/x)dx = ln|x| + C, and d/dx[ln x] = 1/x. These beautiful formulas make ln the bridge between logarithms and integration.",
      ],
    },
    guided: {
      problemStatement: 'Solve 5ˣ = 200 for x using logarithms.',
      steps: [
        {
          label: 'Take the natural log of both sides',
          math: 'ln(5ˣ) = ln(200)',
          explanation: 'Apply ln to both sides. Since ln is a function, applying it to both sides of an equation preserves equality.',
        },
        {
          label: 'Use the power rule',
          math: 'x · ln(5) = ln(200)',
          explanation: 'The log power rule: ln(5ˣ) = x · ln(5). The exponent comes down as a multiplier.',
        },
        {
          label: 'Solve for x',
          math: 'x = ln(200)/ln(5)',
          explanation: 'Divide both sides by ln(5).',
        },
        {
          label: 'Compute',
          math: 'x = 5.298/1.609 ≈ 3.29',
          explanation: 'ln(200) ≈ 5.298, ln(5) ≈ 1.609. So x ≈ 3.29.',
          connectionNote: 'Check: 5^3.29 ≈ 200 ✓. The log rules allow us to solve for any exponent, no matter how "ugly" the answer.',
        },
      ],
      reflectionPrompt: 'Why can you take ANY log (log base 10, ln, log base 2) of both sides and still get the same answer? What does this tell you about the change-of-base formula?',
    },
    practice: [
      {
        question: 'What is log₂(32)?',
        mathNotation: 'log₂(32) = ?',
        answer: '5',
        choices: ['3', '4', '5', '16'],
        answerIndex: 2,
        explanation: '2⁵ = 32, so log₂(32) = 5. Ask: "What power of 2 gives 32?"',
      },
      {
        question: 'Simplify: log(x³) − log(x)',
        mathNotation: 'log(x³) − log(x)',
        answer: '2log(x)',
        choices: ['log(x²)', '2log(x)', 'log(x³/x)', 'log(3)'],
        answerIndex: 1,
        explanation: 'Power rule: log(x³) = 3log(x). Then 3log(x) − log(x) = 2log(x). (Also equals log(x²).)',
      },
      {
        question: 'Solve ln(x) = 4.',
        mathNotation: 'e^4 = x',
        answer: 'x = e⁴ ≈ 54.6',
        choices: ['x = 4e', 'x = e⁴ ≈ 54.6', 'x = 4', 'x = ln(4)'],
        answerIndex: 1,
        explanation: 'ln(x) = 4 means e⁴ = x. Since e ≈ 2.718, e⁴ ≈ 54.6.',
      },
    ],
    connections: [
      {
        conceptId: 't5-exponential-growth',
        tierId: 5,
        title: 'Exponential Growth and Decay',
        bridgeFormula: 'A = A₀eʳᵗ → t = ln(A/A₀)/r',
        explanation: 'Logarithms solve exponential equations. "When does the investment double?" or "How old is this fossil?" are both logarithm problems — you have the output, need the exponent (time).',
      },
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: 'd/dx[ln x] = 1/x',
        explanation: "The derivative of ln(x) is 1/x — the most important derivative involving logarithms. This means ∫(1/x)dx = ln|x|, filling the one gap in the power rule (which can't handle x⁻¹).",
      },
    ],
  },

  {
    id: 't5-polynomial-functions',
    tierId: 5,
    glyph: 'p(x)',
    title: 'Polynomial functions',
    subtitle: 'Higher-degree curves, end behavior, and the factor theorem',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Polynomial Curve',
    conceptTab: {
      summary: 'Polynomial functions are sums of power terms. Their degree determines end behavior, maximum number of roots, and how many turns the graph can make.',
      whyItMatters:
        "Polynomials are the building blocks of all smooth functions — they can approximate any curve to any desired accuracy. Engineers use polynomials to design smooth transitions (roads, rollercoasters). Computer graphics render curves using polynomial splines. Every Taylor series (the ultimate calculus tool for approximation) is an infinite polynomial. Understanding polynomial behavior prepares you for analyzing all functions.",
      coreIdea:
        "A polynomial: p(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀, degree n\n\nEND BEHAVIOR (determined by leading term aₙxⁿ):\n• n even, aₙ > 0: both ends go UP (W shape extended)\n• n even, aₙ < 0: both ends go DOWN\n• n odd, aₙ > 0: left DOWN, right UP\n• n odd, aₙ < 0: left UP, right DOWN\n\nROOTS:\n• Degree n → at most n real roots\n• FACTOR THEOREM: (x−r) is a factor ⟺ r is a root\n• Multiplicity: if (x−r)^k is a factor, the graph touches (even k) or crosses (odd k) the x-axis at r\n\nFUNDAMENTAL THEOREM OF ALGEBRA: Every degree-n polynomial has exactly n roots (counting complex and repeated roots).",
      formula: 'Factor Theorem: p(r) = 0 ↔ (x − r) is a factor',
      formulaLabel: 'Factor theorem:',
      insights: [
        "Multiplicity determines graphical behavior at a root. A simple root (multiplicity 1) crosses the axis. A double root (multiplicity 2) bounces off — the curve touches but doesn't cross. A triple root crosses with a flat 'S' shape.",
        "The Fundamental Theorem of Algebra guarantees n roots for degree n — but they may be complex. A cubic always has at least one real root (its graph must cross the x-axis). A quartic might have 0, 2, or 4 real roots.",
        "Polynomial long division and synthetic division let you factor out known roots. If you know r is a root, divide p(x) by (x−r) to get a lower-degree polynomial — then solve that. Repeating this factors the polynomial completely.",
      ],
    },
    guided: {
      problemStatement: 'Given p(x) = x³ − 6x² + 11x − 6, verify that x=1 is a root, then factor completely.',
      steps: [
        {
          label: 'Verify x=1 is a root',
          math: 'p(1) = 1 − 6 + 11 − 6 = 0 ✓',
          explanation: 'Plug x=1 into p(x). If p(1) = 0, then (x−1) is a factor.',
        },
        {
          label: 'Divide by (x−1)',
          math: 'p(x) ÷ (x−1) = x² − 5x + 6',
          explanation: 'Use polynomial long division or synthetic division. Dividing x³−6x²+11x−6 by (x−1) gives x²−5x+6.',
        },
        {
          label: 'Factor the quotient',
          math: 'x² − 5x + 6 = (x−2)(x−3)',
          explanation: 'Factor: what two numbers multiply to 6 and add to −5? Answer: −2 and −3.',
        },
        {
          label: 'Write the complete factorization',
          math: 'p(x) = (x−1)(x−2)(x−3)',
          explanation: 'The roots are x = 1, 2, and 3. Three roots for a degree-3 polynomial — exactly as the Fundamental Theorem predicts.',
          connectionNote: 'The graph crosses the x-axis at x=1, 2, and 3, each with multiplicity 1 (simple roots, no bouncing).',
        },
      ],
      reflectionPrompt: 'How does the end behavior of p(x) = x³ − 6x² + 11x − 6 match the rule for odd-degree polynomials with positive leading coefficient?',
    },
    practice: [
      {
        question: 'What is the end behavior of f(x) = −3x⁴ + 2x² − 1?',
        mathNotation: 'Leading term: −3x⁴',
        answer: 'Both ends go down',
        choices: [
          'Both ends go up',
          'Both ends go down',
          'Left end down, right end up',
          'Left end up, right end down',
        ],
        answerIndex: 1,
        explanation: 'Degree 4 (even) with negative leading coefficient → both ends go DOWN.',
      },
      {
        question: 'If (x+2)² is a factor of p(x), what happens at x = −2 on the graph?',
        mathNotation: 'Multiplicity 2 root',
        answer: 'The graph touches but does not cross the x-axis',
        choices: [
          'The graph crosses the x-axis',
          'The graph touches but does not cross the x-axis',
          'The graph has a vertical asymptote',
          'Cannot determine without the full polynomial',
        ],
        answerIndex: 1,
        explanation: 'Even multiplicity (2) means the graph bounces off the x-axis — touches but does not cross. Odd multiplicity means crossing.',
      },
      {
        question: 'A degree-5 polynomial with real coefficients can have how many real roots?',
        mathNotation: 'Degree 5',
        answer: '1, 3, or 5 real roots',
        choices: ['Exactly 5', '0, 2, or 4', '1, 3, or 5 real roots', 'Any number from 0 to 5'],
        answerIndex: 2,
        explanation: 'Complex roots come in conjugate pairs. A degree-5 polynomial has 5 roots total; subtracting pairs of complex roots leaves 1, 3, or 5 real roots (must be odd).',
      },
    ],
    connections: [
      {
        conceptId: 't5-quadratic-functions',
        tierId: 5,
        title: 'Quadratic Functions',
        bridgeFormula: 'f(x) = ax² + bx + c (degree 2)',
        explanation: 'Quadratics are degree-2 polynomials — the simplest case. All polynomial concepts (roots, factoring, end behavior, multiplicity) generalize exactly what you learned for quadratics.',
      },
      {
        conceptId: 't8-taylor-series',
        tierId: 8,
        title: 'Taylor Series',
        bridgeFormula: 'f(x) ≈ f(a) + f\'(a)(x−a) + f\'\'(a)/2!(x−a)² + ...',
        explanation: 'Taylor series are infinite polynomials. Every smooth function can be approximated arbitrarily well by polynomials. Polynomial behavior is the foundation for understanding all smooth functions.',
      },
    ],
  },

  {
    id: 't5-complex-numbers',
    tierId: 5,
    glyph: 'i',
    title: 'Complex numbers',
    subtitle: 'Extending the number line to a plane — where √(−1) lives',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Complex Plane',
    conceptTab: {
      summary: 'Complex numbers extend the real numbers by introducing i = √(−1), enabling every polynomial to have roots and unlocking deep connections between algebra, geometry, and analysis.',
      whyItMatters:
        "Electrical engineers routinely work with complex numbers — alternating current calculations require them. Quantum mechanics is written entirely in terms of complex numbers (wave functions are complex-valued). Signal processing, control theory, fluid dynamics, and image compression all use complex numbers. They weren't invented to be abstract — they were invented because the real numbers are simply not enough to solve all polynomial equations.",
      coreIdea:
        "The imaginary unit: i = √(−1), so i² = −1\n\nA complex number: z = a + bi\n• a = real part, b = imaginary part\n• Real numbers are complex numbers with b = 0\n\nARITHMETIC:\n• Add/subtract: (a+bi) ± (c+di) = (a±c) + (b±d)i\n• Multiply: (a+bi)(c+di) = ac + adi + bci + bdi² = (ac−bd) + (ad+bc)i\n• Complex conjugate: z̄ = a − bi\n• |z|² = z · z̄ = a² + b² (magnitude squared)\n• Division: multiply top and bottom by the conjugate\n\nGEOMETRY: z = a+bi lives at point (a,b) in the complex plane. |z| = √(a²+b²) is its distance from the origin.",
      formula: 'i² = −1, z = a + bi',
      formulaLabel: 'Complex number:',
      insights: [
        "The complex conjugate is the mirror image across the real axis. Multiplying z by z̄ gives |z|² — always a non-negative real number. This is how we 'rationalize' complex denominators.",
        "Euler's formula eⁱˣ = cos(x) + i·sin(x) unifies exponentials and trig functions through complex numbers. Setting x = π gives eⁱᵖ + 1 = 0, which contains the five most important constants in mathematics in one equation.",
        "The Fundamental Theorem of Algebra (every degree-n polynomial has exactly n roots) only becomes fully true in the complex numbers. Over the reals, quadratics can fail to have roots. Over ℂ, they always do.",
      ],
    },
    guided: {
      problemStatement: 'Compute (2 + 3i)(1 − 4i) and express the result in a + bi form.',
      steps: [
        {
          label: 'Distribute (FOIL)',
          math: '(2)(1) + (2)(−4i) + (3i)(1) + (3i)(−4i)',
          explanation: 'Multiply as you would with binomials: First, Outer, Inner, Last.',
        },
        {
          label: 'Simplify each term',
          math: '2 − 8i + 3i − 12i²',
          explanation: 'Each product: 2·1=2, 2·(−4i)=−8i, 3i·1=3i, 3i·(−4i)=−12i².',
        },
        {
          label: 'Replace i² = −1',
          math: '2 − 8i + 3i − 12(−1) = 2 − 8i + 3i + 12',
          explanation: 'i² = −1, so −12i² = −12(−1) = +12. This is the key step.',
        },
        {
          label: 'Combine like terms',
          math: '(2 + 12) + (−8 + 3)i = 14 − 5i',
          explanation: 'Real parts: 2 + 12 = 14. Imaginary parts: −8 + 3 = −5. Result: 14 − 5i.',
          connectionNote: 'The procedure is exactly polynomial multiplication, with i² replaced by −1 whenever it appears.',
        },
      ],
      reflectionPrompt: 'What is the complex conjugate of 14 − 5i? What is their product? Is it always a real number? Why?',
    },
    practice: [
      {
        question: 'What is i³?',
        mathNotation: 'i³ = i² · i',
        answer: '−i',
        choices: ['i', '−i', '1', '−1'],
        answerIndex: 1,
        explanation: 'i³ = i² · i = (−1) · i = −i. The powers of i cycle: i, −1, −i, 1, i, ...',
      },
      {
        question: 'What is the modulus (magnitude) of 3 + 4i?',
        mathNotation: '|3 + 4i| = √(3² + 4²)',
        answer: '5',
        choices: ['7', '5', '√7', '25'],
        answerIndex: 1,
        explanation: '|3 + 4i| = √(9 + 16) = √25 = 5. The 3-4-5 triple appears in the complex plane.',
      },
      {
        question: 'Simplify (2 + i)/(1 − i).',
        mathNotation: 'Multiply by conjugate of denominator',
        answer: '(1/2) + (3/2)i',
        choices: ['2 + i', '1 + i', '(1/2) + (3/2)i', '(3/2) + (1/2)i'],
        answerIndex: 2,
        explanation: 'Multiply by (1+i)/(1+i): (2+i)(1+i)/((1−i)(1+i)) = (2+2i+i+i²)/(1+1) = (2+3i−1)/2 = (1+3i)/2 = 1/2 + (3/2)i.',
      },
    ],
    connections: [
      {
        conceptId: 't5-quadratic-formula',
        tierId: 5,
        title: 'The Quadratic Formula',
        bridgeFormula: 'x = (−b ± i√|D|)/(2a) when D < 0',
        explanation: 'Complex numbers complete the quadratic formula: when D < 0, the square root of a negative number is imaginary. Complex numbers are the answer to "what are the roots when the parabola doesn\'t cross the x-axis?"',
      },
      {
        conceptId: 't8-taylor-series',
        tierId: 8,
        title: 'Taylor Series and Euler\'s Formula',
        bridgeFormula: 'eⁱˣ = cos x + i·sin x',
        explanation: "Euler's formula eⁱˣ = cos x + i·sin x connects complex exponentials to trig functions through Taylor series. It's the most surprising and useful identity in advanced mathematics.",
      },
    ],
  },

  {
    id: 't5-completing-the-square',
    tierId: 5,
    glyph: '□',
    title: 'Completing the square',
    subtitle: 'Rewriting any quadratic by building a perfect square — the engine behind the quadratic formula',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'parabola',
    canvasLabel: 'Vertex Form Parabola',
    conceptTab: {
      summary: 'Completing the square transforms ax² + bx + c into the vertex form a(x − h)² + k by adding and subtracting a carefully chosen constant. It is the algebraic technique that reveals the vertex, derives the quadratic formula, and defines circles and ellipses.',
      whyItMatters:
        "Completing the square is one of the most powerful techniques in algebra. It directly reveals the vertex of a parabola without any formula memorization — you derive the vertex by doing the algebra. More importantly, completing the square is how the quadratic formula is derived — every step in the derivation is just completing the square on the general form ax² + bx + c = 0. Beyond quadratics, completing the square is how you identify the center and radius of a circle from its general equation, and how you convert general conic sections to standard form.",
      coreIdea:
        "GOAL: Rewrite ax² + bx + c as a(x − h)² + k\n\nSTEPS for x² + bx + c (when a = 1):\n1. Group the x terms: (x² + bx) + c\n2. Add (b/2)² inside the parentheses, subtract outside to compensate:\n   (x² + bx + (b/2)²) + c − (b/2)²\n3. Factor the perfect square trinomial:\n   (x + b/2)² + (c − b²/4)\n4. Identify h = −b/2, k = c − b²/4\n\nWhen a ≠ 1: factor a out first from the x² and x terms, THEN complete the square inside.\n\nWhy it works: (x + n)² = x² + 2nx + n², so adding n² to x² + 2nx creates the perfect square. We 'complete' the square that was already 'started' by the x term.",
      formula: 'x² + bx + c = (x + b/2)² + (c − b²/4)',
      formulaLabel: 'Completed square (a = 1):',
      insights: [
        "Adding and subtracting the same quantity keeps the expression equal — you change the form, not the value. This is the key insight: (b/2)² is added inside and subtracted outside, so the net change is zero. The expression looks different but is identical.",
        "Completing the square gives you vertex form directly. Once you have a(x−h)² + k, you read off the vertex (h, k) immediately. There is no formula to memorize — the vertex falls out of the algebra.",
        "The quadratic formula x = [−b ± √(b²−4ac)]/(2a) is derived by completing the square on ax² + bx + c = 0. Every step is completing the square. This means you can always re-derive the formula if you forget it, and you understand exactly where it comes from.",
      ],
    },
    guided: {
      problemStatement: 'Rewrite f(x) = 2x² − 12x + 7 in vertex form by completing the square. Identify the vertex.',
      steps: [
        {
          label: 'Factor out the leading coefficient from x terms',
          math: 'f(x) = 2(x² − 6x) + 7',
          explanation: 'Factor 2 out of the first two terms only. The constant 7 stays outside. Inside the parentheses: x² − 6x.',
        },
        {
          label: 'Identify (b/2)² and add/subtract inside',
          math: 'b = −6, so (b/2)² = (−3)² = 9',
          explanation: 'Half of the coefficient of x is −6/2 = −3. Squaring gives 9. Add 9 inside the parentheses and subtract to compensate.',
        },
        {
          label: 'Rewrite with the perfect square trinomial',
          math: 'f(x) = 2(x² − 6x + 9 − 9) + 7 = 2(x² − 6x + 9) − 18 + 7',
          explanation: 'Add 9 inside (making a perfect square) and subtract 9 inside as well. Distributing the 2 through the −9: 2(−9) = −18. Bring that outside.',
        },
        {
          label: 'Factor and simplify',
          math: 'f(x) = 2(x − 3)² − 11',
          explanation: 'x² − 6x + 9 = (x−3)². So f(x) = 2(x−3)² − 11. Vertex form is complete.',
          connectionNote: 'Vertex is (3, −11). Since a = 2 > 0 the parabola opens up and the vertex is a minimum. Check: h = −b/(2a) = 12/4 = 3 ✓',
        },
      ],
      reflectionPrompt: 'Use completing the square to solve x² + 6x − 7 = 0. Compare your answer to using the quadratic formula — do they agree? Which method feels more transparent?',
    },
    practice: [
      {
        question: 'Complete the square for x² + 8x + 3. What is the vertex form?',
        mathNotation: '(b/2)² = (4)² = 16',
        answer: '(x + 4)² − 13',
        choices: ['(x + 4)² + 3', '(x + 4)² − 13', '(x − 4)² − 13', '(x + 8)² − 61'],
        answerIndex: 1,
        explanation: 'Add and subtract (8/2)² = 16: x² + 8x + 16 − 16 + 3 = (x+4)² − 13.',
      },
      {
        question: 'Using completing the square, what is the vertex of f(x) = x² − 10x + 21?',
        mathNotation: 'f(x) = (x − 5)² + k',
        answer: '(5, −4)',
        choices: ['(5, 21)', '(−5, −4)', '(5, −4)', '(10, −4)'],
        answerIndex: 2,
        explanation: 'x²−10x+25−25+21 = (x−5)² − 4. Vertex: (5, −4).',
      },
      {
        question: 'The equation x² + y² + 4x − 6y = 3 describes a circle. After completing the square in both x and y, what is the center?',
        mathNotation: '(x+2)² + (y−3)² = r²',
        answer: '(−2, 3)',
        choices: ['(2, −3)', '(−2, 3)', '(4, −6)', '(2, 3)'],
        answerIndex: 1,
        explanation: 'Complete square in x: (x+2)²−4; in y: (y−3)²−9. Right side: 3+4+9=16. Circle: (x+2)²+(y−3)²=16. Center (−2, 3), radius 4.',
      },
    ],
    connections: [
      {
        conceptId: 't5-quadratic-formula',
        tierId: 5,
        title: 'The Quadratic Formula',
        bridgeFormula: 'x = [−b ± √(b²−4ac)]/(2a) — derived by completing the square',
        explanation: 'The quadratic formula is completing the square applied to the general equation ax²+bx+c=0. Every step is the same: factor out a, add (b/2a)², take the square root. Understanding completing the square means you can derive the quadratic formula from scratch.',
      },
      {
        conceptId: 't5-conic-sections',
        tierId: 5,
        title: 'Introduction to Conic Sections',
        bridgeFormula: '(x−h)² + (y−k)² = r² (circle in standard form)',
        explanation: 'Conic section equations (circles, ellipses, parabolas, hyperbolas) are given in general form ax²+bx+cy²+dy+e=0. Completing the square in x and y separately converts them to standard form, revealing the center, radii, and orientation.',
      },
    ],
  },

  {
    id: 't5-polynomial-division',
    tierId: 5,
    glyph: '÷p',
    title: 'Polynomial long division',
    subtitle: 'Dividing polynomials to find factors, remainders, and asymptotes',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Polynomial Division',
    conceptTab: {
      summary: 'Polynomial long division extends the arithmetic long division algorithm to polynomials, producing a quotient and remainder. It is the tool for factoring polynomials, finding oblique asymptotes, and applying the Remainder Theorem.',
      whyItMatters:
        "Polynomial division is the algebraic analogue of integer division: just as 17 ÷ 5 = 3 remainder 2, (x² − 3x + 1) ÷ (x − 2) has a polynomial quotient and a numerical remainder. The Remainder Theorem — that the remainder when dividing p(x) by (x − a) equals p(a) — lets you evaluate polynomials and test for roots without full division. Polynomial division is also how you find oblique asymptotes of rational functions, a key step in graphing and calculus analysis.",
      coreIdea:
        "DIVISION ALGORITHM for polynomials:\nIf p(x) ÷ d(x), then p(x) = d(x) · q(x) + r(x)\nwhere deg(r) < deg(d), or r = 0 if d divides evenly.\n\nLONG DIVISION STEPS:\n1. Divide the LEADING TERM of the dividend by the leading term of the divisor.\n2. Multiply the result by the entire divisor.\n3. Subtract (flip signs and add) from the dividend.\n4. Bring down the next term.\n5. Repeat until the degree of the remainder is less than the divisor.\n\nREMAINDER THEOREM: The remainder when p(x) is divided by (x − a) is p(a).\n\nFACTOR THEOREM (consequence): (x − a) is a factor of p(x) ⟺ p(a) = 0.\n\nSYNTHETIC DIVISION: A shorthand version of long division that works when the divisor is (x − a).",
      formula: 'p(x) = d(x) · q(x) + r(x)',
      formulaLabel: 'Division algorithm:',
      insights: [
        "The leading term of each step drives the process: always divide the leading term of the current dividend by the leading term of the divisor. Every other calculation (multiply, subtract) flows from that single division. If you keep track of leading terms, you will never lose your place.",
        "The Remainder Theorem shortcuts evaluation: instead of computing p(17) by substituting x=17 into a degree-5 polynomial, divide by (x−17) and read the remainder. For large values or complex polynomials, this is faster and less error-prone.",
        "When a rational function's numerator has higher degree than its denominator, long division reveals the asymptote: the quotient q(x) is the oblique (or polynomial) asymptote. For example, (x²+x+1)÷(x−1) has quotient x+2, so the rational function has the line y=x+2 as an asymptote.",
      ],
    },
    guided: {
      problemStatement: 'Divide p(x) = 2x³ − 3x² + x − 5 by d(x) = x − 2.',
      steps: [
        {
          label: 'Set up and divide the leading terms',
          math: '2x³ ÷ x = 2x²',
          explanation: 'Divide the leading term of the dividend (2x³) by the leading term of the divisor (x). Write 2x² as the first term of the quotient.',
        },
        {
          label: 'Multiply 2x² by (x−2), subtract',
          math: '2x²(x−2) = 2x³ − 4x²; subtract: (2x³−3x²) − (2x³−4x²) = x²',
          explanation: 'Multiply and subtract to get the new leading term x². Bring down the next term: x² + x.',
        },
        {
          label: 'Repeat: x² ÷ x = x, multiply and subtract',
          math: 'x(x−2) = x²−2x; subtract: (x²+x) − (x²−2x) = 3x; bring down −5: 3x − 5',
          explanation: 'The next quotient term is x. Multiply, subtract to get 3x, bring down −5.',
        },
        {
          label: 'Final step and remainder',
          math: '3x ÷ x = 3; 3(x−2) = 3x−6; subtract: (3x−5)−(3x−6) = 1',
          explanation: 'Last quotient term is 3. Subtracting gives remainder 1.',
          connectionNote: 'Result: 2x³−3x²+x−5 = (x−2)(2x²+x+3) + 1. Verify via Remainder Theorem: p(2) = 16−12+2−5 = 1 ✓',
        },
      ],
      reflectionPrompt: 'The remainder was 1, confirming p(2) = 1. What would it mean if the remainder had been 0? How would you use that fact to factor p(x) completely?',
    },
    practice: [
      {
        question: 'Using the Remainder Theorem, find the remainder when p(x) = x³ − 4x + 6 is divided by (x − 2).',
        mathNotation: 'p(2) = ?',
        answer: '6',
        choices: ['0', '2', '6', '10'],
        answerIndex: 2,
        explanation: 'p(2) = 8 − 8 + 6 = 6. The remainder is 6, so (x−2) is NOT a factor.',
      },
      {
        question: 'If x = 3 is a root of p(x) = x³ − 7x + 6, what can you conclude?',
        mathNotation: 'p(3) = 27 − 21 + 6 = 12? Check: p(3) = 27 − 21 + 6',
        answer: '(x − 3) is a factor of p(x)',
        choices: [
          '(x − 3) is NOT a factor of p(x)',
          '(x − 3) is a factor of p(x)',
          'p(x) has no other real roots',
          'p(x) has remainder 3 when divided by (x−3)',
        ],
        answerIndex: 1,
        explanation: 'p(3) = 27−21+6 = 12 ≠ 0... Actually p(3) = 27−7(3)+6 = 27−21+6 = 12. Wait — x=1 is a root: p(1)=1−7+6=0. By the Factor Theorem, p(a)=0 ⟺ (x−a) is a factor.',
      },
      {
        question: 'Divide x³ + 1 by (x + 1). What is the quotient?',
        mathNotation: 'x³ + 1 = (x+1)·q(x)',
        answer: 'x² − x + 1',
        choices: ['x² + x + 1', 'x² − x + 1', 'x² − x − 1', 'x² + 1'],
        answerIndex: 1,
        explanation: 'x³+1 = (x+1)(x²−x+1). Check: (x+1)(x²−x+1) = x³−x²+x+x²−x+1 = x³+1 ✓',
      },
    ],
    connections: [
      {
        conceptId: 't5-polynomial-functions',
        tierId: 5,
        title: 'Polynomial Functions',
        bridgeFormula: 'p(x) = (x−r)·q(x) when r is a root',
        explanation: 'The Factor Theorem unites polynomial division with roots: every root of p(x) corresponds to a linear factor you can divide out. Polynomial division is the practical tool for factoring higher-degree polynomials once one root is known.',
      },
      {
        conceptId: 't5-rational-expressions',
        tierId: 5,
        title: 'Rational Expressions and Asymptotes',
        bridgeFormula: 'p(x)/d(x) = q(x) + r(x)/d(x)',
        explanation: 'When the degree of the numerator exceeds the degree of the denominator, polynomial long division splits a rational expression into a polynomial part q(x) plus a proper fraction. The polynomial part q(x) is the oblique (or polynomial) asymptote of the rational function.',
      },
    ],
  },

  {
    id: 't5-rational-expressions',
    tierId: 5,
    glyph: 'p/q',
    title: 'Rational expressions and asymptotes',
    subtitle: 'Functions as fractions of polynomials — with holes, vertical walls, and distant guidelines',
    tags: ['algebra', 'precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Rational Function Graph',
    conceptTab: {
      summary: 'A rational function is a ratio of two polynomials. Its graph features vertical asymptotes where the denominator is zero, horizontal or oblique asymptotes describing end behavior, and sometimes removable holes where a factor cancels.',
      whyItMatters:
        "Rational functions model an enormous range of real phenomena: the time it takes to complete a job as a function of rate, the concentration of a drug in the bloodstream over time, the force of gravity as a function of distance, the resistance in a circuit. Many functions in physics and engineering are rational. The asymptotic behavior — what happens at the extremes and near singularities — is often the most important feature. Understanding asymptotes is also foundational for limits and calculus.",
      coreIdea:
        "For f(x) = p(x)/q(x) where p, q are polynomials:\n\nDOMAIN: all x where q(x) ≠ 0\n\nVERTICAL ASYMPTOTES: occur at zeros of q(x) that are NOT also zeros of p(x).\n  — The graph approaches ±∞ as x approaches these values.\n\nHOLES (removable discontinuities): occur at values where BOTH p and q are zero, i.e., a shared factor (x−a). Cancel the factor; the hole is at x = a.\n\nHORIZONTAL ASYMPTOTES (end behavior, from comparing degrees n = deg(p), m = deg(q)):\n  • n < m: y = 0 (x-axis)\n  • n = m: y = (leading coeff of p)/(leading coeff of q)\n  • n > m: NO horizontal asymptote (but possibly oblique)\n\nOBLIQUE ASYMPTOTE: when n = m + 1, divide p by q; the quotient line is the asymptote.",
      formula: 'Horizontal: y = aₙ/bₘ when deg(p) = deg(q)',
      formulaLabel: 'Horizontal asymptote (equal degree):',
      insights: [
        "Vertical asymptotes and holes look similar algebraically (both happen where the denominator is zero) but are completely different graphically. Holes are isolated missing points; vertical asymptotes are barriers where the function explodes to infinity. The key distinction: did you cancel that factor, or is it still in the denominator?",
        "Horizontal asymptotes describe limiting behavior but the function can CROSS them at finite x-values. Many students think asymptotes are never crossed — that is only true for vertical asymptotes. A rational function can oscillate across its horizontal asymptote and still approach it as x→±∞.",
        "Sign analysis between asymptotes: to determine if f(x) approaches +∞ or −∞ near a vertical asymptote, test a value just to the left and just to the right. The sign of f at those test points determines whether the curve shoots up or down on each side of the asymptote.",
      ],
    },
    guided: {
      problemStatement: 'Analyze f(x) = (x² − x − 6)/(x² − 9). Find any holes, vertical asymptotes, and horizontal asymptote.',
      steps: [
        {
          label: 'Factor numerator and denominator',
          math: 'f(x) = (x−3)(x+2) / ((x−3)(x+3))',
          explanation: 'Numerator: x²−x−6 = (x−3)(x+2). Denominator: x²−9 = (x−3)(x+3).',
        },
        {
          label: 'Identify the hole',
          math: 'Cancel (x−3): f(x) = (x+2)/(x+3), hole at x = 3',
          explanation: '(x−3) appears in both — cancel it. The function is undefined at x=3 but has no vertical asymptote there; just a hole. The hole is at (3, f(3) in reduced form) = (3, 5/6).',
        },
        {
          label: 'Find vertical asymptote',
          math: 'x + 3 = 0 → x = −3',
          explanation: 'After canceling, the remaining denominator factor (x+3) gives the vertical asymptote x = −3.',
        },
        {
          label: 'Find horizontal asymptote',
          math: 'deg(p) = deg(q) = 2, leading coeffs both 1: y = 1',
          explanation: 'The original degrees are equal (both degree 2) with leading coefficient ratio 1/1 = 1. Horizontal asymptote: y = 1.',
          connectionNote: 'Graph summary: vertical asymptote at x=−3, hole at (3, 5/6), horizontal asymptote y=1, x-intercept where x+2=0: x=−2.',
        },
      ],
      reflectionPrompt: 'Confirm the horizontal asymptote by computing f(100) and f(1000). How close is the function to y=1 for large x? What does this say about the meaning of the asymptote?',
    },
    practice: [
      {
        question: 'For f(x) = (3x² + 1)/(x² − 4), what is the horizontal asymptote?',
        mathNotation: 'Compare leading terms: 3x²/x²',
        answer: 'y = 3',
        choices: ['y = 0', 'y = 1', 'y = 3', 'No horizontal asymptote'],
        answerIndex: 2,
        explanation: 'Same degree (2) in numerator and denominator. Ratio of leading coefficients: 3/1 = 3. Horizontal asymptote: y = 3.',
      },
      {
        question: 'For f(x) = (x − 2)/((x − 2)(x + 5)), what is at x = 2?',
        mathNotation: 'Factor cancels',
        answer: 'A hole (removable discontinuity)',
        choices: [
          'A vertical asymptote',
          'A hole (removable discontinuity)',
          'An x-intercept',
          'The function is defined there',
        ],
        answerIndex: 1,
        explanation: '(x−2) cancels from both numerator and denominator. At x=2 the function is undefined, but the factor cancels — this is a hole, not an asymptote.',
      },
      {
        question: 'For f(x) = (2x + 1)/(x² − 1), where are the vertical asymptotes?',
        mathNotation: 'x² − 1 = (x−1)(x+1)',
        answer: 'x = 1 and x = −1',
        choices: ['x = 1 only', 'x = −1 only', 'x = 1 and x = −1', 'No vertical asymptotes'],
        answerIndex: 2,
        explanation: 'x²−1 = (x−1)(x+1). Neither root is a root of the numerator (2x+1=0 at x=−1/2). Both x=1 and x=−1 are vertical asymptotes.',
      },
    ],
    connections: [
      {
        conceptId: 't5-polynomial-division',
        tierId: 5,
        title: 'Polynomial Long Division',
        bridgeFormula: 'f(x) = q(x) + r(x)/d(x) → oblique asymptote y = q(x)',
        explanation: 'When the numerator degree exceeds the denominator degree, polynomial long division separates the function into its asymptotic polynomial part and a remainder. The polynomial quotient is the oblique asymptote.',
      },
      {
        conceptId: 't6-limits-intro',
        tierId: 6,
        title: 'Introduction to Limits',
        bridgeFormula: 'lim[x→∞] p(x)/q(x) = horizontal asymptote',
        explanation: 'Asymptotes are limit statements: the horizontal asymptote y = L means lim[x→∞] f(x) = L. Vertical asymptotes mean lim[x→a] f(x) = ±∞. Understanding rational functions prepares you for limits precisely because asymptotic behavior IS a limit concept.',
      },
    ],
  },

  {
    id: 't5-arithmetic-geometric-series',
    tierId: 5,
    glyph: 'Σ',
    title: 'Arithmetic and geometric series',
    subtitle: 'Summing sequences — from counting steps to infinite compounding',
    tags: ['algebra', 'precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Series Terms',
    conceptTab: {
      summary: 'An arithmetic sequence adds a fixed amount each step; a geometric sequence multiplies by a fixed ratio. Their sums (series) have elegant closed formulas derived from patterns, and geometric series can converge to a finite sum even with infinitely many terms.',
      whyItMatters:
        "Summation formulas are everywhere in quantitative fields. The sum of an arithmetic series counts equally spaced totals — like the total distance when accelerating uniformly. Geometric series model compound interest accumulation, the total bounce distance of a ball, and the sum of a repeating decimal. Infinite geometric series, where an infinite number of terms add to a finite number, is the first glimpse of the infinite processes that calculus formalizes. Archimedes computed the area under a parabola 2,300 years ago using a geometric series.",
      coreIdea:
        "ARITHMETIC SEQUENCE: a, a+d, a+2d, ... (common difference d)\n  nth term: aₙ = a + (n−1)d\n  Sum of first n terms: Sₙ = n(a₁ + aₙ)/2 = n[2a + (n−1)d]/2\n  (Average of first and last term, times number of terms)\n\nGEOMETRIC SEQUENCE: a, ar, ar², ar³, ... (common ratio r)\n  nth term: aₙ = a · rⁿ⁻¹\n  Sum of first n terms: Sₙ = a(1 − rⁿ)/(1 − r),  r ≠ 1\n\nINFINITE GEOMETRIC SERIES (|r| < 1):\n  S∞ = a/(1 − r)\n  When |r| < 1, each term gets smaller and the infinite sum converges.\n  When |r| ≥ 1, the series DIVERGES (sum grows without bound).",
      formula: 'S∞ = a/(1 − r), |r| < 1',
      formulaLabel: 'Infinite geometric series:',
      insights: [
        "The arithmetic sum formula Sₙ = n(a₁+aₙ)/2 has a beautiful intuition: pair the first and last term (sum = a₁+aₙ), then the second and second-to-last (same sum), and so on. There are n/2 such pairs. Gauss reportedly discovered this as a child when asked to sum 1+2+...+100 = 5050.",
        "The infinite geometric series formula S∞ = a/(1−r) means the repeating decimal 0.333... = 3/10 + 3/100 + ... = (3/10)/(1−1/10) = (3/10)/(9/10) = 1/3. Infinite series turns a repeating decimal into an exact fraction — the intuition behind the fact that 0.999... = 1.",
        "The derivation of Sₙ = a(1−rⁿ)/(1−r) uses an elegant algebraic trick: write S, write rS, subtract. Almost everything cancels: S − rS = a − arⁿ, so S(1−r) = a(1−rⁿ). This 'multiply and subtract' technique reappears in calculus when summing Riemann rectangles.",
      ],
    },
    guided: {
      problemStatement: 'A ball is dropped from 8 meters. Each bounce reaches 3/4 of the previous height. (a) What is the total distance the ball travels? (b) Sum the first 5 bounce heights.',
      steps: [
        {
          label: 'Recognize the geometric structure',
          math: 'Heights: 8, 6, 4.5, 3.375, ... (ratio r = 3/4)',
          explanation: 'Each height is 3/4 of the previous. This is a geometric sequence with first term a = 8 and ratio r = 3/4.',
        },
        {
          label: 'Total distance: account for going up AND down',
          math: 'Total = 8 + 2·(6 + 4.5 + ...) = 8 + 2·S∞(bounce heights)',
          explanation: 'The ball falls 8m, then bounces up 6, down 6, up 4.5, down 4.5, etc. The original drop is counted once; every bounce height is counted twice (up and down).',
        },
        {
          label: 'Apply the infinite geometric series formula',
          math: 'S∞ = 6/(1 − 3/4) = 6/(1/4) = 24',
          explanation: 'The bounce heights form a geometric series with a=6, r=3/4. S∞ = 6/(1−3/4) = 24.',
        },
        {
          label: 'Compute total and first 5 partial sum',
          math: 'Total = 8 + 2(24) = 56 m; S₅ = 8(1−(3/4)⁵)/(1−3/4) ≈ 26.6 m',
          explanation: 'Total distance: 8 + 48 = 56 meters. For the first 5 terms of the original series (a=8): S₅ = 8(1−(3/4)⁵)/(1/4) ≈ 8·(1−0.2373)/0.25 ≈ 24.3 m (partial sum of heights only).',
          connectionNote: 'Note how quickly the partial sums approach the infinite sum: after just 5 bounces, the ball has already covered most of the total distance. This is what |r| < 1 convergence looks like.',
        },
      ],
      reflectionPrompt: 'What happens to the total distance if the bounce ratio is exactly 1 (a perfectly elastic ball)? What if the ratio is greater than 1? Why does the formula break down in those cases?',
    },
    practice: [
      {
        question: 'Find the sum of the first 100 positive integers: 1 + 2 + 3 + ... + 100.',
        mathNotation: 'Sₙ = n(a₁ + aₙ)/2',
        answer: '5050',
        choices: ['1000', '5000', '5050', '10100'],
        answerIndex: 2,
        explanation: 'Arithmetic series with a₁=1, a₁₀₀=100, n=100: S₁₀₀ = 100(1+100)/2 = 100·101/2 = 5050.',
      },
      {
        question: 'What is the sum of the infinite geometric series 1 + 1/3 + 1/9 + 1/27 + ...?',
        mathNotation: 'S∞ = a/(1−r), a=1, r=1/3',
        answer: '3/2',
        choices: ['1', '3/2', '2', '3'],
        answerIndex: 1,
        explanation: 'a=1, r=1/3. S∞ = 1/(1−1/3) = 1/(2/3) = 3/2.',
      },
      {
        question: 'An arithmetic sequence has first term 5 and common difference 3. What is the 20th term?',
        mathNotation: 'aₙ = a + (n−1)d',
        answer: '62',
        choices: ['55', '60', '62', '65'],
        answerIndex: 2,
        explanation: 'a₂₀ = 5 + (20−1)·3 = 5 + 57 = 62.',
      },
    ],
    connections: [
      {
        conceptId: 't5-exponential-growth',
        tierId: 5,
        title: 'Exponential Growth and Decay',
        bridgeFormula: 'aₙ = a·rⁿ⁻¹ mirrors f(n) = a·rⁿ',
        explanation: 'A geometric sequence is a discrete exponential function — the ratio r plays the same role as the base b in f(x)=bˣ. Compound interest (discrete) and continuous exponential growth are two descriptions of the same underlying multiplicative process.',
      },
      {
        conceptId: 't8-taylor-series',
        tierId: 8,
        title: 'Taylor Series',
        bridgeFormula: 'S∞ = a/(1−r) ← geometric series ← power series',
        explanation: 'The infinite geometric series is the simplest power series: ∑rⁿ = 1/(1−r) for |r|<1. Taylor series are generalizations — infinite polynomial series representing arbitrary functions. The convergence ideas introduced here (|r|<1 for convergence) generalize to radius of convergence for power series.',
      },
    ],
  },

  {
    id: 't5-conic-sections',
    tierId: 5,
    glyph: '⊚',
    title: 'Introduction to conic sections',
    subtitle: 'Circles, ellipses, parabolas, and hyperbolas — all from slicing a cone',
    tags: ['algebra', 'geometry', 'precalc'],
    accessibilityLevel: 'high',
    visualizationType: 'parabola',
    canvasLabel: 'Conic Sections',
    conceptTab: {
      summary: 'Conic sections are the curves obtained by intersecting a plane with a double cone. They include circles, ellipses, parabolas, and hyperbolas — each with a standard algebraic form and a reflective focal property that makes them indispensable in physics and engineering.',
      whyItMatters:
        "Planets orbit the Sun in ellipses (Kepler's First Law). Projectiles trace parabolas. Hyperbolic curves describe sonic booms and certain telescope mirror designs. The reflective property of parabolas focuses light to a single point — which is why satellite dishes, car headlights, and reflecting telescopes are parabolic. GPS positioning uses hyperbolic geometry. Conic sections connect pure geometry (slicing a cone) with algebra (quadratic equations in two variables) and with the physical laws that govern the universe.",
      coreIdea:
        "CIRCLE: (x−h)² + (y−k)² = r²\n  Center (h, k), radius r. All points equidistant from the center.\n\nELLIPSE: (x−h)²/a² + (y−k)²/b² = 1  (a > b > 0)\n  Center (h,k). Semi-major axis a (along x), semi-minor axis b (along y).\n  Foci at (h ± c, k) where c² = a² − b².\n\nPARABOLA: y = a(x−h)² + k (opens up/down) or x = a(y−k)² + h (opens left/right)\n  Vertex (h, k). Focus at distance 1/(4a) from vertex.\n  Every point on a parabola is equidistant from the focus and the directrix.\n\nHYPERBOLA: (x−h)²/a² − (y−k)²/b² = 1  (opens left/right)\n  or (y−k)²/a² − (x−h)²/b² = 1  (opens up/down)\n  Asymptotes: y−k = ±(b/a)(x−h)\n\nGENERAL FORM: Ax² + Bxy + Cy² + Dx + Ey + F = 0\n  Discriminant B²−4AC: negative→ellipse/circle, zero→parabola, positive→hyperbola.",
      formula: '(x−h)²/a² + (y−k)²/b² = 1',
      formulaLabel: 'Ellipse standard form:',
      insights: [
        "Each conic has a unifying FOCAL definition: a parabola is all points equidistant from a point (focus) and a line (directrix); an ellipse is all points where the sum of distances to two foci is constant; a hyperbola is all points where the difference of distances to two foci is constant. These focal properties explain why conics occur so naturally in physics — they are the shapes that minimize or equalize distances in the most natural ways.",
        "Completing the square converts the general form Ax²+Cy²+Dx+Ey+F=0 to standard form. The same technique used to find a parabola's vertex applies directly. This is why completing the square in two variables is such an important algebraic tool.",
        "The eccentricity e = c/a (for ellipses and hyperbolas) unifies all conics: e=0 is a circle, 0<e<1 is an ellipse, e=1 is a parabola, e>1 is a hyperbola. Eccentricity measures how 'elongated' or 'open' a conic is — and is the quantity that appears in Kepler's laws and orbital mechanics.",
      ],
    },
    guided: {
      problemStatement: 'Identify and sketch: 4x² + 9y² − 16x + 18y − 11 = 0.',
      steps: [
        {
          label: 'Group x and y terms',
          math: '4(x² − 4x) + 9(y² + 2y) = 11',
          explanation: 'Factor 4 from x terms and 9 from y terms. Move the constant to the right side.',
        },
        {
          label: 'Complete the square for x',
          math: '4(x²−4x+4) = 4(x−2)², adds 4·4=16 to right side',
          explanation: 'Half of −4 is −2; (−2)²=4. Add 4 inside the x-group; this adds 4·4=16 to the left side, so add 16 to the right.',
        },
        {
          label: 'Complete the square for y',
          math: '9(y²+2y+1) = 9(y+1)², adds 9·1=9 to right side',
          explanation: 'Half of 2 is 1; 1²=1. Add 1 inside the y-group; this adds 9·1=9 to the right side.',
        },
        {
          label: 'Write in standard form',
          math: '4(x−2)² + 9(y+1)² = 36 → (x−2)²/9 + (y+1)²/4 = 1',
          explanation: 'Right side: 11+16+9=36. Divide everything by 36. This is an ELLIPSE with center (2,−1), a=3, b=2.',
          connectionNote: 'Semi-major axis a=3 along x; semi-minor axis b=2 along y. c²=9−4=5, so foci at (2±√5, −1).',
        },
      ],
      reflectionPrompt: 'What changes in the equation would make it a hyperbola instead of an ellipse? What if the coefficients of x² and y² were equal — what conic would you get?',
    },
    practice: [
      {
        question: 'What conic section does (x−1)²/16 + (y+2)²/9 = 1 represent?',
        mathNotation: 'Standard form: a²=16, b²=9',
        answer: 'An ellipse with center (1, −2)',
        choices: [
          'A circle with center (1, −2)',
          'An ellipse with center (1, −2)',
          'A hyperbola with center (1, −2)',
          'A parabola with vertex (1, −2)',
        ],
        answerIndex: 1,
        explanation: 'The form (x−h)²/a² + (y−k)²/b² = 1 with a² ≠ b² is an ellipse. Center (1, −2), a=4, b=3.',
      },
      {
        question: 'For the parabola y = (1/8)(x − 3)², how far is the focus from the vertex?',
        mathNotation: 'a = 1/8, focal length = 1/(4a)',
        answer: '2',
        choices: ['1/8', '1/2', '2', '8'],
        answerIndex: 2,
        explanation: 'Focal length = 1/(4a) = 1/(4·1/8) = 1/(1/2) = 2. The focus is 2 units above the vertex.',
      },
      {
        question: 'The general equation Ax²+Cy²+Dx+Ey+F=0 (with B=0) is a hyperbola when:',
        mathNotation: 'Discriminant: B²−4AC > 0 (here B=0)',
        answer: 'A and C have opposite signs',
        choices: [
          'A = C',
          'A and C are both positive',
          'A and C have opposite signs',
          'A = 0 or C = 0',
        ],
        answerIndex: 2,
        explanation: 'With B=0, discriminant = −4AC > 0 requires AC < 0 — A and C have opposite signs. Ellipse: same sign (A,C>0 or A,C<0). Parabola: A=0 or C=0.',
      },
    ],
    connections: [
      {
        conceptId: 't5-completing-the-square',
        tierId: 5,
        title: 'Completing the Square',
        bridgeFormula: 'Ax²+Dx + Cy²+Ey + F = 0 → standard conic form',
        explanation: 'Completing the square in both x and y is the algebraic operation that transforms a general conic equation into standard form. Without completing the square, you cannot identify which conic you have, nor read off its key features.',
      },
      {
        conceptId: 't5-quadratic-functions',
        tierId: 5,
        title: 'Quadratic Functions and Parabolas',
        bridgeFormula: 'y = a(x−h)² + k ← parabola is a degenerate conic',
        explanation: "The parabola y=a(x−h)²+k is one of the four conic sections. Every quadratic function you graphed is a parabola — a conic. The vertex form is already the standard form for a conic. Conics generalize everything you learned about quadratic functions to two-variable equations.",
      },
    ],
  },
];
