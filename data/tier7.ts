import type { Concept } from '../types';

export const TIER7_CONCEPTS: Concept[] = [
  {
    id: 't7-limits-intuition',
    tierId: 7,
    glyph: '→',
    title: 'Limits — what a function approaches',
    subtitle: 'Getting infinitely close without arriving',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Function Approach',
    conceptTab: {
      summary: 'A limit describes the value a function gets closer and closer to as the input approaches some number — even if the function never actually reaches it.',
      whyItMatters:
        "Every major idea in calculus — derivatives, integrals, continuity — is defined using limits. The limit is the foundation stone of the entire subject. Without it, you can't make precise sense of 'instantaneous' rate of change or the area under a smooth curve. Calculus spent 150 years being used effectively (by Newton and Leibniz) before limits were formally defined. When they finally were, all the pieces clicked into place.",
      coreIdea:
        "We write lim[x→a] f(x) = L to mean: as x gets arbitrarily close to a (but doesn't have to equal a), f(x) gets arbitrarily close to L.\n\nExample: f(x) = (x² − 1)/(x − 1)\nAt x = 1, this is 0/0 — undefined! But watch what happens as x approaches 1:\nx = 0.9 → f = 1.9\nx = 0.99 → f = 1.99\nx = 0.999 → f = 1.999\n\nThe function is zooming in on 2. So lim[x→1] (x²−1)/(x−1) = 2, even though f(1) doesn't exist.\n\nWhy? Because (x²−1)/(x−1) = (x+1)(x−1)/(x−1) = x+1, and x+1 → 2 as x → 1.",
      formula: 'lim[x→a] f(x) = L',
      formulaLabel: 'Limit definition:',
      insights: [
        "The value of f(a) is IRRELEVANT to the limit. The limit only cares about what happens near a. f(a) could be undefined, or defined but wrong — the limit is independent of it. This is what makes limits so powerful.",
        'Left-hand and right-hand limits must agree for a limit to exist. lim[x→a⁻] f(x) must equal lim[x→a⁺] f(x). If they differ (like at a jump discontinuity), the limit does not exist.',
        'Limits formalize the intuition of "getting infinitely close." Mathematicians spent centuries arguing about infinitesimals before Weierstrass gave us the ε-δ definition, which made calculus rigorous.',
      ],
    },
    guided: {
      problemStatement: 'Find lim[x→3] (x² − 9)/(x − 3).',
      steps: [
        {
          label: 'Try direct substitution',
          math: 'x=3: (9−9)/(3−3) = 0/0',
          explanation: 'Plugging in x = 3 gives 0/0 — an indeterminate form. This tells us to look more carefully, not that the limit is 0 or undefined.',
        },
        {
          label: 'Factor the numerator',
          math: 'x² − 9 = (x+3)(x−3)',
          explanation: 'The numerator is a difference of squares: x² − 9 = (x+3)(x−3). This is a standard factoring pattern.',
        },
        {
          label: 'Cancel the common factor',
          math: '(x+3)(x−3)/(x−3) = x+3 (when x ≠ 3)',
          explanation: 'Cancel the (x−3) from top and bottom. This is valid because we are looking at x near 3 but NOT equal to 3, so (x−3) ≠ 0.',
        },
        {
          label: 'Take the limit',
          math: 'lim[x→3] (x+3) = 6',
          explanation: 'Now substitute x = 3 into x+3: 3+3 = 6. The limit is 6.',
          connectionNote: 'The original function has a "hole" (removable discontinuity) at x = 3. The limit tells you exactly what value would fill that hole.',
        },
      ],
      reflectionPrompt: 'Why does the fact that f(3) is undefined not prevent the limit from existing? What does this tell you about what limits are actually measuring?',
    },
    practice: [
      {
        question: 'What is lim[x→2] (x² − 4)/(x − 2)?',
        mathNotation: 'lim[x→2] (x²−4)/(x−2)',
        answer: '4',
        choices: ['0', '2', '4', 'undefined'],
        answerIndex: 2,
        explanation: 'Factor: (x²−4) = (x+2)(x−2). Cancel (x−2): left with x+2. As x→2: 2+2 = 4.',
      },
      {
        question: 'For f(x) = |x|/x, what happens to lim[x→0] f(x)?',
        mathNotation: 'lim[x→0] |x|/x',
        answer: 'The limit does not exist',
        choices: ['0', '1', '−1', 'The limit does not exist'],
        answerIndex: 3,
        explanation: 'From the right (x>0): |x|/x = x/x = 1. From the left (x<0): |x|/x = −x/x = −1. The one-sided limits disagree, so the limit does not exist.',
      },
      {
        question: 'If lim[x→5] f(x) = 7 but f(5) = 3, what can you conclude?',
        mathNotation: 'lim[x→5] f(x) = 7, f(5) = 3',
        answer: 'f is discontinuous at x = 5',
        choices: [
          'The limit is wrong',
          'f is discontinuous at x = 5',
          'f(5) should be redefined to 7',
          'The function has no issues',
        ],
        answerIndex: 1,
        explanation: "For continuity, we need lim[x→a] f(x) = f(a). Here 7 ≠ 3, so f is discontinuous at x = 5. It's called a 'removable discontinuity' because redefining f(5) = 7 would fix it.",
      },
    ],
    connections: [
      {
        conceptId: 't7-definition-of-derivative',
        tierId: 7,
        title: 'Definition of the Derivative',
        bridgeFormula: "f'(x) = lim[h→0] [f(x+h)−f(x)]/h",
        explanation: 'The derivative is defined as a limit. Every rule for differentiation is just a clever computation of this limit. Without limits, the derivative has no rigorous meaning.',
      },
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Definition',
        bridgeFormula: '∀ε>0 ∃δ>0: |x−a|<δ ⟹ |f(x)−L|<ε',
        explanation: 'The epsilon-delta definition makes "arbitrarily close" mathematically precise. This is the rigorous foundation underneath the intuitive limit concept.',
      },
    ],
  },

  {
    id: 't7-definition-of-derivative',
    tierId: 7,
    glyph: "f'",
    title: 'Definition of the derivative',
    subtitle: 'Instantaneous rate of change as a limit',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'secant-tangent',
    canvasLabel: 'Secant → Tangent',
    conceptTab: {
      summary: "The derivative f'(x) is the instantaneous rate of change of f at x — defined as the limit of average rates of change over shrinking intervals.",
      whyItMatters:
        "Speed is rate of change of position. Acceleration is rate of change of speed. The growth rate of a population is rate of change of population size. Every time something changes — and everything changes — you want to know HOW FAST it's changing at a given instant. The derivative is the mathematical answer to that question. It's arguably the most important single idea in all of applied mathematics.",
      coreIdea:
        "Start with the average rate of change over [x, x+h]:\n  average rate = [f(x+h) − f(x)] / h\n\nThis is the slope of the secant line through two points. Now let h shrink toward zero — the secant line rotates toward the tangent line:\n\n  f'(x) = lim[h→0] [f(x+h) − f(x)] / h\n\nThis limit (when it exists) is the derivative — the slope of the tangent line at x, or equivalently, the instantaneous rate of change.\n\nExample: f(x) = x². Then:\n  [f(x+h)−f(x)]/h = [(x+h)² − x²]/h = [x²+2xh+h²−x²]/h = [2xh+h²]/h = 2x+h\n  As h→0: f'(x) = 2x",
      formula: "f'(x) = lim[h→0] [f(x+h) − f(x)] / h",
      formulaLabel: 'Derivative definition:',
      insights: [
        "The derivative is a function — it takes each input x and returns the instantaneous rate of change at that x. f'(x) = 2x means the rate of change of x² at any point is twice the x-value. At x=3, the slope of x² is 6.",
        "Notation: f'(x), dy/dx, df/dx, Df, and ẋ all mean the same thing. Leibniz notation (dy/dx) is the most useful because it reminds you that the derivative is a ratio Δy/Δx in the limit.",
        "Not every function has a derivative everywhere. Corners, cusps, and vertical tangents are places where the limit doesn't exist. Differentiability implies continuity, but continuity does not imply differentiability.",
      ],
    },
    guided: {
      problemStatement: 'Use the limit definition to find the derivative of f(x) = x² + 3x.',
      steps: [
        {
          label: 'Write the difference quotient',
          math: '[f(x+h) − f(x)] / h',
          explanation: 'Start with the definition. We need f(x+h) and f(x), then subtract and divide by h.',
        },
        {
          label: 'Compute f(x+h)',
          math: 'f(x+h) = (x+h)² + 3(x+h) = x² + 2xh + h² + 3x + 3h',
          explanation: 'Expand (x+h)² = x² + 2xh + h², and distribute 3(x+h) = 3x + 3h.',
        },
        {
          label: 'Subtract f(x) and simplify',
          math: 'f(x+h) − f(x) = 2xh + h² + 3h = h(2x + h + 3)',
          explanation: 'Subtract f(x) = x² + 3x. The x² and 3x terms cancel, leaving h(2x + h + 3).',
        },
        {
          label: 'Divide by h and take the limit',
          math: '[h(2x+h+3)]/h = 2x+h+3 → 2x+3 as h→0',
          explanation: 'Cancel h (valid since h ≠ 0 in the limit). Then let h→0: the h term vanishes.',
          connectionNote: "f'(x) = 2x + 3. This matches the power rule: d/dx[x²] = 2x and d/dx[3x] = 3.",
        },
      ],
      reflectionPrompt: "The derivative of x² + 3x is 2x + 3. What does f'(2) = 7 tell you, geometrically and physically?",
    },
    practice: [
      {
        question: "Use the limit definition to find f'(x) for f(x) = 3x.",
        mathNotation: "f'(x) = lim[h→0] [3(x+h)−3x]/h",
        answer: '3',
        choices: ['3x', '3', '0', '3h'],
        answerIndex: 1,
        explanation: '[3(x+h)−3x]/h = [3x+3h−3x]/h = 3h/h = 3. The limit as h→0 is 3. A linear function has constant slope.',
      },
      {
        question: "If f(x) = x², what is f'(5)?",
        mathNotation: "f'(x) = 2x, so f'(5) = ?",
        answer: '10',
        choices: ['5', '10', '25', '50'],
        answerIndex: 1,
        explanation: "f'(x) = 2x (from the definition or power rule). Plug in x=5: f'(5) = 2(5) = 10. The slope of x² at the point (5, 25) is 10.",
      },
      {
        question: "Which interpretation of f'(a) is correct?",
        mathNotation: "f'(a) = ?",
        answer: 'Both the slope of the tangent line at x=a and the instantaneous rate of change at x=a',
        choices: [
          'Only the slope of the tangent line',
          'Only the instantaneous rate of change',
          'Both the slope of the tangent line at x=a and the instantaneous rate of change at x=a',
          'The average rate of change over [0, a]',
        ],
        answerIndex: 2,
        explanation: "The derivative has two equivalent geometric/physical interpretations: slope of the tangent line (geometry) and instantaneous rate of change (physics/applications). They are the same thing.",
      },
    ],
    connections: [
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: 'd/dx[xⁿ] = nxⁿ⁻¹',
        explanation: "The power rule and all other derivative shortcuts are just the limit definition computed once and turned into a pattern. Every rule is a proved theorem about that limit.",
      },
      {
        conceptId: 't1-ratios',
        tierId: 1,
        title: 'Ratios and Unit Rates',
        bridgeFormula: 'Δy/Δx → dy/dx as Δx→0',
        explanation: "The derivative is the ultimate unit rate. Speed = Δd/Δt. As Δt → 0, this becomes instantaneous speed = dd/dt. Every rate concept from Tier 1 builds to this moment.",
      },
    ],
  },

  {
    id: 't7-derivative-rules',
    tierId: 7,
    glyph: 'Dx',
    title: 'Derivative rules',
    subtitle: 'Power, product, quotient, and chain rules',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Derivative Graph',
    conceptTab: {
      summary: 'Derivative rules are shortcuts that let you differentiate any algebraic, trigonometric, or exponential function without recomputing the limit definition every time.',
      whyItMatters:
        "You could use the limit definition for every derivative — but it's like multiplying two three-digit numbers from scratch every time instead of using multiplication tables. Derivative rules are the multiplication tables of calculus: patterns proved once from the definition that you then apply quickly. Mastery of these rules is what makes solving physics, economics, and engineering problems tractable.",
      coreIdea:
        "THE BIG FOUR RULES:\n\n1. Power Rule: d/dx[xⁿ] = nxⁿ⁻¹\n   Example: d/dx[x⁵] = 5x⁴\n\n2. Product Rule: d/dx[fg] = f'g + fg'\n   Example: d/dx[x² sin x] = 2x sin x + x² cos x\n\n3. Quotient Rule: d/dx[f/g] = (f'g − fg')/g²\n   Example: d/dx[x²/(x+1)] = [2x(x+1) − x²·1]/(x+1)²\n\n4. Chain Rule: d/dx[f(g(x))] = f'(g(x)) · g'(x)\n   Example: d/dx[(x²+1)⁵] = 5(x²+1)⁴ · 2x\n\nAlso: d/dx[sin x] = cos x, d/dx[eˣ] = eˣ, d/dx[ln x] = 1/x",
      formula: 'd/dx[f(g(x))] = f\'(g(x)) · g\'(x)',
      formulaLabel: 'Chain Rule:',
      insights: [
        "The chain rule is the most important rule in practice — almost every real function is a composition of simpler ones. 'Work from the outside in': differentiate the outer function first, leaving the inside alone, then multiply by the derivative of the inside.",
        "eˣ is special: its derivative is itself. This is the ONLY function (up to scaling) with this property. It makes eˣ appear everywhere in differential equations — anything that grows or decays proportionally to its current size.",
        "The quotient rule is really the product rule applied to f · g⁻¹ with the chain rule. Some people find it easier to rethink quotients as products to avoid memorizing a separate rule.",
      ],
    },
    guided: {
      problemStatement: 'Find the derivative of f(x) = (3x² + 1)⁴.',
      steps: [
        {
          label: 'Identify the structure',
          math: 'Outer: ( )⁴, Inner: g(x) = 3x²+1',
          explanation: 'This is a composition: a power function applied to the inner function 3x²+1. We need the chain rule.',
        },
        {
          label: 'Differentiate the outer function',
          math: "d/du[u⁴] = 4u³",
          explanation: 'Treat the inner function as a single unit u. The power rule gives 4u³.',
        },
        {
          label: 'Differentiate the inner function',
          math: "g'(x) = d/dx[3x²+1] = 6x",
          explanation: 'By the power rule: d/dx[3x²] = 6x, and d/dx[1] = 0.',
        },
        {
          label: 'Apply the chain rule',
          math: "f'(x) = 4(3x²+1)³ · 6x = 24x(3x²+1)³",
          explanation: 'Multiply: outer derivative (with inner plugged back in) times inner derivative. Simplify 4·6 = 24.',
          connectionNote: 'The pattern is: bring down the power, reduce it by one, multiply by the derivative of what\'s inside.',
        },
      ],
      reflectionPrompt: "Why must you multiply by g'(x) in the chain rule? What goes wrong if you just apply the outer derivative and forget the inner derivative?",
    },
    practice: [
      {
        question: 'What is d/dx[x⁷]?',
        mathNotation: 'd/dx[x⁷] = ?',
        answer: '7x⁶',
        choices: ['7x⁷', '7x⁶', 'x⁶', '6x⁷'],
        answerIndex: 1,
        explanation: 'Power rule: bring down the exponent, reduce by one. d/dx[x⁷] = 7x⁶.',
      },
      {
        question: 'Find the derivative of f(x) = x³ · eˣ.',
        mathNotation: "d/dx[x³eˣ] = ?",
        answer: '3x²eˣ + x³eˣ',
        choices: ['3x²eˣ', 'x³eˣ', '3x²eˣ + x³eˣ', '3x²eˣ · x³eˣ'],
        answerIndex: 2,
        explanation: "Product rule: (x³)'·eˣ + x³·(eˣ)' = 3x²eˣ + x³eˣ. Factor out: eˣ(3x²+x³) = x²eˣ(3+x) if desired.",
      },
      {
        question: 'Find d/dx[sin(5x)].',
        mathNotation: 'd/dx[sin(5x)] = ?',
        answer: '5cos(5x)',
        choices: ['cos(5x)', '5cos(5x)', '−cos(5x)', '−5cos(5x)'],
        answerIndex: 1,
        explanation: 'Chain rule: outer is sin(u), whose derivative is cos(u). Inner is 5x, whose derivative is 5. Result: cos(5x)·5 = 5cos(5x).',
      },
    ],
    connections: [
      {
        conceptId: 't7-applications-of-derivatives',
        tierId: 7,
        title: 'Applications of Derivatives',
        bridgeFormula: "f'(x) = 0 at extrema",
        explanation: 'To find maxima and minima, you set the derivative to zero and solve. Without derivative rules, finding these critical points would require the slow limit definition each time.',
      },
      {
        conceptId: 't8-series-and-convergence',
        tierId: 8,
        title: 'Taylor Series',
        bridgeFormula: "f(x) = f(a) + f'(a)(x−a) + f''(a)/2!(x−a)² + ...",
        explanation: 'Taylor series express functions as infinite polynomials using derivatives of all orders. The chain and product rules become essential for computing higher derivatives.',
      },
    ],
  },

  {
    id: 't7-applications-of-derivatives',
    tierId: 7,
    glyph: '△',
    title: 'Applications of derivatives',
    subtitle: 'Optimization, curve sketching, and related rates',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'parabola',
    canvasLabel: 'Critical Points',
    conceptTab: {
      summary: "Derivatives reveal where functions increase, decrease, and turn around — enabling optimization problems that find true maxima and minima.",
      whyItMatters:
        "A company wants to maximize profit. An engineer wants to minimize material used while maximizing strength. A doctor models how drug concentration peaks and decays. All of these are optimization problems. The derivative is the universal tool: a function's maximum and minimum values always occur where the derivative is zero (or undefined). Setting f'(x) = 0 and solving is one of the most powerful techniques in all of applied mathematics.",
      coreIdea:
        "KEY FACTS:\n• f is INCREASING where f'(x) > 0\n• f is DECREASING where f'(x) < 0\n• f has a LOCAL MAX or MIN at critical points where f'(x) = 0 or f' is undefined\n\nFIRST DERIVATIVE TEST: At a critical point x = c,\n  If f' changes + → −: local maximum\n  If f' changes − → +: local minimum\n\nSECOND DERIVATIVE TEST:\n  f''(c) > 0 → local minimum (concave up)\n  f''(c) < 0 → local maximum (concave down)\n\nRELATED RATES: When two changing quantities are related by an equation, differentiate both sides with respect to time using the chain rule to find how their rates of change relate.",
      formula: "f'(c) = 0 and f''(c) > 0 ⟹ local minimum at c",
      formulaLabel: 'Second Derivative Test:',
      insights: [
        "The ABSOLUTE maximum and minimum on a closed interval [a,b] occur either at critical points inside the interval or at the endpoints. Never forget to check the endpoints — the extreme values can hide there.",
        "Inflection points occur where f'' changes sign (concavity switches). A function can be concave up (smile), then concave down (frown), with an inflection point at the transition. f''=0 is necessary but not sufficient.",
        "Related rates problems are pure chain rule. If volume V and radius r of a sphere are related by V = (4/3)πr³, then dV/dt = 4πr² · dr/dt. The rate of change of volume depends on r and on how fast r is changing.",
      ],
    },
    guided: {
      problemStatement: 'A farmer has 200 feet of fence to enclose a rectangular area. What dimensions maximize the enclosed area?',
      steps: [
        {
          label: 'Set up the constraint',
          math: '2l + 2w = 200, so l + w = 100, so l = 100 − w',
          explanation: 'The total perimeter is fixed at 200. This is our constraint. Express length l in terms of width w.',
        },
        {
          label: 'Write the objective function',
          math: 'A(w) = l · w = (100 − w) · w = 100w − w²',
          explanation: 'Area = length × width. Substitute l = 100 − w to get area as a function of one variable.',
        },
        {
          label: 'Find the critical point',
          math: "A'(w) = 100 − 2w = 0 → w = 50",
          explanation: "Take the derivative and set it equal to zero. A'(w) = 100 − 2w = 0 gives w = 50 feet.",
        },
        {
          label: 'Verify it is a maximum',
          math: "A''(w) = −2 < 0 → maximum confirmed",
          explanation: "The second derivative is −2, which is negative everywhere. This means the critical point is a maximum (concave down). So w = 50, l = 100 − 50 = 50.",
          connectionNote: 'Maximum area = 50 × 50 = 2500 sq ft. A square always maximizes area for a fixed perimeter — this is a famous result in optimization.',
        },
      ],
      reflectionPrompt: "Why does a derivative of zero not always mean a maximum or minimum? Can you think of a function where f'(c) = 0 but c is neither a max nor a min?",
    },
    practice: [
      {
        question: "For f(x) = x³ − 3x, find all critical points.",
        mathNotation: "f'(x) = 0",
        answer: 'x = 1 and x = −1',
        choices: ['x = 0 only', 'x = 3 only', 'x = 1 and x = −1', 'x = ±√3'],
        answerIndex: 2,
        explanation: "f'(x) = 3x² − 3 = 3(x²−1) = 3(x+1)(x−1) = 0 → x = 1 or x = −1.",
      },
      {
        question: "On the interval [0, 3], where does f(x) = −x² + 4x attain its maximum?",
        mathNotation: "max on [0,3]",
        answer: 'x = 2',
        choices: ['x = 0', 'x = 2', 'x = 3', 'x = 4'],
        answerIndex: 1,
        explanation: "f'(x) = −2x + 4 = 0 → x = 2. Check: f(0)=0, f(2)=4, f(3)=3. Maximum is f(2)=4.",
      },
      {
        question: "A balloon is inflated so its radius increases at 2 cm/sec. How fast is the volume increasing when r = 3 cm? (V = 4/3·πr³)",
        mathNotation: "dV/dt when r=3, dr/dt=2",
        answer: '72π cm³/sec',
        choices: ['12π cm³/sec', '36π cm³/sec', '72π cm³/sec', '108π cm³/sec'],
        answerIndex: 2,
        explanation: "dV/dt = 4πr² · dr/dt = 4π(3²)(2) = 4π(9)(2) = 72π cm³/sec.",
      },
    ],
    connections: [
      {
        conceptId: 't7-riemann-sums-integrals',
        tierId: 7,
        title: 'Riemann Sums and Integrals',
        bridgeFormula: '∫f(x)dx = area under curve',
        explanation: 'After mastering what derivatives do (measure rate of change), integrals answer the reverse: given the rate of change, find the accumulated total. The two operations are inverses of each other.',
      },
      {
        conceptId: 't5-exponential-growth',
        tierId: 5,
        title: 'Exponential Growth and Decay',
        bridgeFormula: 'dy/dt = ky → y = Ceᵏᵗ',
        explanation: "The exponential growth model from Algebra II becomes fully understandable here: it's the solution to the differential equation dy/dt = ky. The derivative of an exponential is proportional to itself.",
      },
    ],
  },

  {
    id: 't7-riemann-sums-integrals',
    tierId: 7,
    glyph: '∫',
    title: 'Riemann sums and definite integrals',
    subtitle: 'Area under a curve as an infinite sum',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'riemann-sum',
    canvasLabel: 'Riemann Sum',
    conceptTab: {
      summary: 'A definite integral measures the signed area between a function and the x-axis, defined as the limit of Riemann sums (sums of rectangle areas).',
      whyItMatters:
        "If you know how fast something is changing (rate of change = derivative), the integral tells you how much it changed in total (accumulated change). Distance traveled from velocity. Total revenue from marginal revenue. Mass from density. Work from force. The integral is the mathematical answer to every 'total amount' question when the rate is continuously changing.",
      coreIdea:
        "To find the area under f(x) from a to b:\n1. Divide [a,b] into n subintervals of width Δx = (b−a)/n\n2. In each subinterval, approximate with a rectangle of height f(xᵢ)\n3. Sum all rectangle areas: Σ f(xᵢ)Δx\n4. Take the limit as n→∞ (Δx→0)\n\nThis limit IS the definite integral:\n∫[a→b] f(x) dx = lim[n→∞] Σᵢ f(xᵢ)Δx\n\nProperties:\n• ∫[a→b] f(x)dx = −∫[b→a] f(x)dx\n• ∫[a→b] [f+g]dx = ∫f dx + ∫g dx\n• ∫[a→a] f(x)dx = 0",
      formula: '∫[a→b] f(x) dx = lim[n→∞] Σᵢ f(xᵢ)Δx',
      formulaLabel: 'Definite integral:',
      insights: [
        "The integral gives SIGNED area: area above the x-axis is positive, area below is negative. This matters: the integral of sin(x) from 0 to 2π is 0, because the positive and negative areas cancel. If you want total area, you integrate |f(x)|.",
        "The variable of integration is a 'dummy variable.' ∫[0→1] x dx and ∫[0→1] t dt compute the same number. The letter inside doesn't matter.",
        "Riemann sums can use left endpoints, right endpoints, or midpoints — they all converge to the same limit as n→∞ (for nice functions). Midpoint rule is most accurate for a given n.",
      ],
    },
    guided: {
      problemStatement: 'Estimate ∫[0→4] x² dx using a right Riemann sum with n = 4 rectangles.',
      steps: [
        {
          label: 'Find Δx and the right endpoints',
          math: 'Δx = (4−0)/4 = 1; endpoints: x=1, 2, 3, 4',
          explanation: 'Divide the interval [0,4] into 4 equal pieces. Each has width Δx = 1. Right endpoints are x = 1, 2, 3, 4.',
        },
        {
          label: 'Evaluate f at each right endpoint',
          math: 'f(1)=1, f(2)=4, f(3)=9, f(4)=16',
          explanation: 'f(x) = x², so plug in each right endpoint: 1²=1, 2²=4, 3²=9, 4²=16.',
        },
        {
          label: 'Sum the rectangle areas',
          math: 'R₄ = (1+4+9+16)·1 = 30',
          explanation: 'Each rectangle has width Δx=1 and height f(xᵢ). Sum: 1+4+9+16 = 30.',
        },
        {
          label: 'Compare to the exact value',
          math: '∫[0→4] x² dx = [x³/3]₀⁴ = 64/3 ≈ 21.33',
          explanation: 'The exact answer is 64/3 ≈ 21.33. Our estimate of 30 is an overestimate (right endpoints on an increasing function overshoot). More rectangles would give a better estimate.',
          connectionNote: 'The Fundamental Theorem of Calculus tells us how to compute this exactly without summing rectangles.',
        },
      ],
      reflectionPrompt: 'Would a left Riemann sum overestimate or underestimate the true area for f(x) = x² on [0,4]? What about a midpoint sum?',
    },
    practice: [
      {
        question: 'What does ∫[2→5] f(x) dx represent geometrically?',
        mathNotation: '∫[2→5] f(x) dx',
        answer: 'The signed area between f(x) and the x-axis from x=2 to x=5',
        choices: [
          'The slope of f at x = 2',
          'The average value of f between 2 and 5',
          'The signed area between f(x) and the x-axis from x=2 to x=5',
          "The derivative of f at x=3.5",
        ],
        answerIndex: 2,
        explanation: 'A definite integral gives signed area: positive where f>0, negative where f<0, between the function and the x-axis over the given interval.',
      },
      {
        question: 'If ∫[0→3] f(x)dx = 7 and ∫[3→5] f(x)dx = 2, what is ∫[0→5] f(x)dx?',
        mathNotation: '∫[0→3] + ∫[3→5] = ∫[0→5]',
        answer: '9',
        choices: ['5', '7', '9', '14'],
        answerIndex: 2,
        explanation: 'Integrals over adjacent intervals add: ∫[0→5] = ∫[0→3] + ∫[3→5] = 7 + 2 = 9.',
      },
      {
        question: "A right Riemann sum with n=2 on [0,2] for f(x)=x gives what estimate?",
        mathNotation: 'R₂ for ∫[0→2] x dx',
        answer: '3',
        choices: ['1', '2', '3', '4'],
        answerIndex: 2,
        explanation: 'Δx=1; right endpoints x=1,2; f(1)=1, f(2)=2; sum = (1+2)·1 = 3. Exact answer is 2. Right sum overestimates on an increasing function.',
      },
    ],
    connections: [
      {
        conceptId: 't7-fundamental-theorem',
        tierId: 7,
        title: 'Fundamental Theorem of Calculus',
        bridgeFormula: '∫[a→b] f(x)dx = F(b) − F(a)',
        explanation: 'The Fundamental Theorem connects the integral (defined as a limit of Riemann sums) to antiderivatives. It transforms integration from an infinite process into a simple evaluation.',
      },
      {
        conceptId: 't1-fractions-intro',
        tierId: 1,
        title: 'Fractions and Division',
        bridgeFormula: 'Δx = (b−a)/n → 0',
        explanation: 'The width Δx = (b−a)/n is a fraction that shrinks as n grows. The core idea of a Riemann sum is fraction-based: dividing an interval into n equal pieces.',
      },
    ],
  },

  {
    id: 't7-fundamental-theorem',
    tierId: 7,
    glyph: 'FTC',
    title: 'Fundamental Theorem of Calculus',
    subtitle: 'Derivatives and integrals are inverse operations',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Antiderivative',
    conceptTab: {
      summary: 'The Fundamental Theorem of Calculus reveals that differentiation and integration are inverse operations — the two great processes of calculus are secretly one.',
      whyItMatters:
        "This theorem is one of the most important in all of mathematics. Before it, computing areas required painstaking limit calculations. After it, computing the area under x² from 0 to 1 takes one line of algebra. The FTC bridges the geometric concept (area) with the algebraic concept (antiderivative), making calculus computable. It is why Newton and Leibniz's calculus was so revolutionary.",
      coreIdea:
        "The FTC has two parts:\n\nPART 1: If A(x) = ∫[a→x] f(t)dt, then A'(x) = f(x).\nThe derivative of the area function IS the original function. Differentiation undoes integration.\n\nPART 2: If F'(x) = f(x) (F is an antiderivative of f), then:\n∫[a→b] f(x)dx = F(b) − F(a)\n\nTo compute a definite integral:\n1. Find ANY antiderivative F of f\n2. Compute F(b) − F(a)\n\nExample: ∫[1→4] x² dx = [x³/3]₁⁴ = 4³/3 − 1³/3 = 64/3 − 1/3 = 63/3 = 21",
      formula: '∫[a→b] f(x) dx = F(b) − F(a) where F\'= f',
      formulaLabel: 'FTC Part 2:',
      insights: [
        "The '+ C' in indefinite integrals ∫f(x)dx = F(x) + C disappears in definite integrals. When you compute F(b) − F(a), the constant C cancels: [F(b)+C] − [F(a)+C] = F(b) − F(a). Any antiderivative works.",
        'Part 1 of FTC is often overlooked but is profound: the rate of change of accumulated area IS the height of the function. If you drive faster, you accumulate distance faster. If f is bigger, A(x) grows faster.',
        "The notation ∫f(x)dx (without limits) means 'find the general antiderivative.' The notation ∫[a→b] f(x)dx means 'find the number F(b)−F(a).' These are related but distinct operations.",
      ],
    },
    guided: {
      problemStatement: 'Compute ∫[0→π] sin(x) dx.',
      steps: [
        {
          label: 'Find an antiderivative of sin(x)',
          math: 'F(x) = −cos(x) (since d/dx[−cos x] = sin x)',
          explanation: "We need a function whose derivative is sin(x). The derivative of −cos(x) is sin(x). ✓",
        },
        {
          label: 'Apply FTC Part 2',
          math: '∫[0→π] sin(x) dx = F(π) − F(0) = −cos(π) − (−cos(0))',
          explanation: 'Plug in the upper limit (π) and lower limit (0) into F(x) = −cos(x), then subtract.',
        },
        {
          label: 'Evaluate',
          math: '−cos(π) − (−cos(0)) = −(−1) − (−1) = 1 + 1 = 2',
          explanation: 'cos(π) = −1, cos(0) = 1. So: −(−1) − (−1) = 1 + 1 = 2.',
          connectionNote: 'The area under one arch of sin(x) is exactly 2 — a beautiful, clean result. This represents the total displacement of a particle with velocity sin(t) over a half-period.',
        },
      ],
      reflectionPrompt: 'Why does it not matter which antiderivative you choose (e.g., −cos(x) or −cos(x) + 7)? What happens to the constant when you compute F(b) − F(a)?',
    },
    practice: [
      {
        question: 'Compute ∫[0→3] 2x dx.',
        mathNotation: '∫[0→3] 2x dx',
        answer: '9',
        choices: ['6', '9', '3', '18'],
        answerIndex: 1,
        explanation: 'Antiderivative of 2x is x². So [x²]₀³ = 3² − 0² = 9 − 0 = 9.',
      },
      {
        question: 'Compute ∫[1→e] (1/x) dx.',
        mathNotation: '∫[1→e] (1/x) dx',
        answer: '1',
        choices: ['e', '1', '0', 'ln(e²)'],
        answerIndex: 1,
        explanation: 'Antiderivative of 1/x is ln|x|. So [ln x]₁ᵉ = ln(e) − ln(1) = 1 − 0 = 1.',
      },
      {
        question: "If F(x) = ∫[0→x] t³ dt, what is F'(x)?",
        mathNotation: "F'(x) = ?",
        answer: 'x³',
        choices: ['x⁴/4', 'x³', '3x²', '4x³'],
        answerIndex: 1,
        explanation: "By FTC Part 1: the derivative of ∫[0→x] f(t)dt is f(x). So F'(x) = x³.",
      },
    ],
    connections: [
      {
        conceptId: 't7-u-substitution',
        tierId: 7,
        title: 'U-Substitution',
        bridgeFormula: '∫f(g(x))g\'(x)dx = ∫f(u)du',
        explanation: 'U-substitution is the integration analogue of the chain rule. FTC reduces integration to finding antiderivatives; u-substitution is the key technique for finding them when direct formulas fail.',
      },
      {
        conceptId: 't8-integration-by-parts',
        tierId: 8,
        title: 'Integration by Parts',
        bridgeFormula: '∫u dv = uv − ∫v du',
        explanation: 'Integration by parts is the integration analogue of the product rule, and builds directly on FTC. Together with u-substitution, it handles a vast class of integrals.',
      },
    ],
  },

  {
    id: 't7-u-substitution',
    tierId: 7,
    glyph: 'u',
    title: 'U-substitution',
    subtitle: 'Reversing the chain rule to integrate compositions',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Substitution',
    conceptTab: {
      summary: "U-substitution rewrites a complicated integral in terms of a simpler variable u, transforming it into a recognizable form. It is the reverse of the chain rule.",
      whyItMatters:
        "Most integrals you encounter in applications involve composite functions. ∫2x·cos(x²)dx isn't in any formula table, but with the substitution u = x², it becomes ∫cos(u)du — which equals sin(u) + C = sin(x²) + C. U-substitution extends the range of integrable functions from a few basic forms to nearly everything you'll see in applied mathematics and physics.",
      coreIdea:
        "THE IDEA: If you see a composite function multiplied by the derivative of the inside, reverse the chain rule.\n\nPROCEDURE:\n1. Choose u = g(x), an inner function\n2. Compute du = g'(x)dx\n3. Rewrite the integral entirely in terms of u\n4. Integrate in u\n5. Substitute back: replace u with g(x)\n\nEXAMPLE: ∫ 2x·cos(x²) dx\n  Let u = x², then du = 2x dx\n  Rewrite: ∫ cos(u) du = sin(u) + C = sin(x²) + C\n\nFOR DEFINITE INTEGRALS: Either change the limits when you change variables, or substitute back before evaluating.",
      formula: 'u = g(x), du = g\'(x)dx → ∫f(g(x))g\'(x)dx = ∫f(u)du',
      formulaLabel: 'U-substitution:',
      insights: [
        "Choosing u correctly is an art. A good u is usually the 'inside' of a composition, and you should check that du (or a constant multiple of du) appears in the original integral. If it doesn't, try a different u.",
        "For definite integrals, you can either (a) change limits: when x=a, u=g(a); when x=b, u=g(b). Or (b) integrate in u, substitute back to x, then evaluate. Method (a) is cleaner.",
        "U-substitution fails when the derivative of the inside isn't present (even approximately). ∫x·cos(x²+x)dx is much harder because d(x²+x)/dx = 2x+1, not x. In such cases, try integration by parts or a different approach.",
      ],
    },
    guided: {
      problemStatement: 'Compute ∫ 3x²·(x³+1)⁵ dx.',
      steps: [
        {
          label: 'Identify u and du',
          math: 'u = x³+1, du = 3x² dx',
          explanation: 'The inner function of the composition is x³+1. Its derivative is 3x², which appears in the integrand. Perfect for substitution.',
        },
        {
          label: 'Rewrite in terms of u',
          math: '∫ u⁵ du',
          explanation: 'Replace (x³+1) with u and replace 3x²dx with du. The integral simplifies dramatically.',
        },
        {
          label: 'Integrate',
          math: '∫ u⁵ du = u⁶/6 + C',
          explanation: 'Apply the power rule for integrals: ∫uⁿ du = uⁿ⁺¹/(n+1) + C. Here n=5: u⁶/6 + C.',
        },
        {
          label: 'Substitute back',
          math: 'u⁶/6 + C = (x³+1)⁶/6 + C',
          explanation: 'Replace u with x³+1 to express the answer in terms of x.',
          connectionNote: "Check: differentiate (x³+1)⁶/6. Chain rule gives 6(x³+1)⁵/6 · 3x² = 3x²(x³+1)⁵. ✓",
        },
      ],
      reflectionPrompt: 'How does u-substitution relate to the chain rule? If differentiation uses the chain rule (outside × inside derivative), what does that tell you about what to look for in an integral?',
    },
    practice: [
      {
        question: 'Compute ∫ cos(3x) dx.',
        mathNotation: '∫ cos(3x) dx',
        answer: 'sin(3x)/3 + C',
        choices: ['sin(3x) + C', 'sin(3x)/3 + C', '−sin(3x)/3 + C', '3sin(3x) + C'],
        answerIndex: 1,
        explanation: 'Let u=3x, du=3dx, so dx=du/3. ∫cos(u)·du/3 = sin(u)/3 + C = sin(3x)/3 + C.',
      },
      {
        question: 'Compute ∫ x·eˣ² dx.',
        mathNotation: '∫ x·eˣ² dx',
        answer: 'eˣ²/2 + C',
        choices: ['eˣ² + C', 'eˣ²/2 + C', '2x·eˣ² + C', 'x²·eˣ²/2 + C'],
        answerIndex: 1,
        explanation: 'Let u=x², du=2x dx, so x dx = du/2. ∫eᵘ · du/2 = eᵘ/2 + C = eˣ²/2 + C.',
      },
      {
        question: 'Compute ∫[0→1] 2x(x²+1)³ dx.',
        mathNotation: '∫[0→1] 2x(x²+1)³ dx',
        answer: '15/4',
        choices: ['4', '15/4', '3', '8'],
        answerIndex: 1,
        explanation: 'Let u=x²+1, du=2x dx. When x=0: u=1; x=1: u=2. ∫[1→2] u³ du = [u⁴/4]₁² = 16/4 − 1/4 = 15/4.',
      },
    ],
    connections: [
      {
        conceptId: 't8-integration-by-parts',
        tierId: 8,
        title: 'Integration by Parts',
        bridgeFormula: '∫u dv = uv − ∫v du',
        explanation: 'U-substitution handles compositions (chain rule reversed). Integration by parts handles products (product rule reversed). Together they cover most integration problems encountered in calculus.',
      },
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: "d/dx[f(g(x))] = f'(g(x))·g'(x)",
        explanation: "U-substitution is the chain rule run backwards. Recognizing f'(g(x))·g'(x) in an integrand is the key skill that connects differentiation and integration.",
      },
    ],
  },
];
