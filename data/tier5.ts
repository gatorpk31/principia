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
];
