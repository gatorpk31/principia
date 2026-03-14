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

  {
    id: 't7-continuity',
    tierId: 7,
    glyph: '~',
    title: 'Continuity and types of discontinuity',
    subtitle: 'When functions flow smoothly — and when they break',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Continuity and Gaps',
    conceptTab: {
      summary: 'A function is continuous at a point if there is no interruption in its graph there — no holes, jumps, or vertical asymptotes. Understanding the ways continuity can fail is essential for calculus.',
      whyItMatters:
        "Continuity is the backstage requirement for most of calculus. The Intermediate Value Theorem, Mean Value Theorem, and Extreme Value Theorem all require continuity as a hypothesis. In physics, continuous functions model real, smoothly-varying quantities — temperature, pressure, position. Discontinuities model abrupt events like a door slamming or a switch flipping. Knowing precisely where a function breaks down is as important as knowing where it behaves.",
      coreIdea:
        "A function f is continuous at x = a if ALL THREE conditions hold:\n1. f(a) exists (the function is defined there)\n2. lim[x→a] f(x) exists (the limit exists)\n3. lim[x→a] f(x) = f(a) (the limit equals the function value)\n\nIf any condition fails, f has a DISCONTINUITY at a. There are three classic types:\n\nREMOVABLE DISCONTINUITY: The limit exists, but either f(a) is undefined or f(a) ≠ limit. The graph has a single 'hole.' Example: f(x) = (x²−1)/(x−1). Can be 'fixed' by redefining f(a).\n\nJUMP DISCONTINUITY: The left-hand and right-hand limits both exist but are not equal. The graph 'jumps' from one value to another. Example: f(x) = ⌊x⌋ (floor function) at every integer.\n\nINFINITE DISCONTINUITY: The function grows without bound near a (vertical asymptote). Example: f(x) = 1/x at x = 0.",
      formula: 'lim[x→a] f(x) = f(a)',
      formulaLabel: 'Continuity condition:',
      insights: [
        "The three-condition checklist is a diagnostic tool: check each in order. If condition 1 fails, stop — there is a hole or asymptote. If condition 2 fails, there is a jump or oscillation. If condition 3 fails alone, it is a removable discontinuity that can be patched.",
        "Continuity is a local property — a function can be continuous at some points and discontinuous at others. A function continuous on an entire closed interval [a,b] earns powerful guarantees: the Extreme Value Theorem (it hits a max and min) and the Intermediate Value Theorem (it hits every value in between).",
        "Differentiability implies continuity, but NOT vice versa. f(x) = |x| is continuous everywhere but not differentiable at x = 0 (corner). Continuity is the weaker condition — it only demands no breaks, not smoothness.",
      ],
    },
    guided: {
      problemStatement: "Determine whether f(x) = (x²−4)/(x−2) for x ≠ 2, and f(2) = 5, is continuous at x = 2.",
      steps: [
        {
          label: 'Check condition 1: is f(2) defined?',
          math: 'f(2) = 5',
          explanation: 'Yes — the problem states f(2) = 5. Condition 1 is satisfied.',
        },
        {
          label: 'Check condition 2: does lim[x→2] f(x) exist?',
          math: '(x²−4)/(x−2) = (x+2)(x−2)/(x−2) = x+2 for x≠2',
          explanation: 'Factor the numerator. Cancel (x−2). The simplified form is x+2, so lim[x→2] (x+2) = 4. The limit exists.',
        },
        {
          label: 'Check condition 3: does the limit equal f(2)?',
          math: 'lim[x→2] f(x) = 4, but f(2) = 5',
          explanation: '4 ≠ 5. The limit exists and f(2) is defined, but they disagree. Condition 3 fails.',
        },
        {
          label: 'Classify the discontinuity',
          math: 'Removable discontinuity at x = 2',
          explanation: 'Because the limit exists (= 4) but does not equal f(2) (= 5), this is a removable discontinuity. Redefining f(2) = 4 would make f continuous.',
          connectionNote: 'This is precisely the situation where a limit exists but continuity fails — the limit is the "correct" value the function should take at that point.',
        },
      ],
      reflectionPrompt: 'If we redefine f(2) = 4 instead of 5, is f now continuous at x = 2? Walk through all three conditions to confirm.',
    },
    practice: [
      {
        question: 'f(x) = 1/x has what type of discontinuity at x = 0?',
        mathNotation: 'f(x) = 1/x at x = 0',
        answer: 'Infinite discontinuity',
        choices: ['Removable discontinuity', 'Jump discontinuity', 'Infinite discontinuity', 'f is continuous at x = 0'],
        answerIndex: 2,
        explanation: 'As x→0⁺, 1/x → +∞ and as x→0⁻, 1/x → −∞. The function grows without bound — this is an infinite (essential) discontinuity, also called a vertical asymptote.',
      },
      {
        question: 'Which condition for continuity fails for f(x) = ⌊x⌋ (floor function) at x = 1?',
        mathNotation: 'f(x) = ⌊x⌋ at x = 1',
        answer: 'The limit does not exist',
        choices: ['f(1) is undefined', 'The limit does not exist', 'The limit does not equal f(1)', 'No condition fails; it is continuous'],
        answerIndex: 1,
        explanation: 'lim[x→1⁻] ⌊x⌋ = 0 and lim[x→1⁺] ⌊x⌋ = 1. The one-sided limits disagree, so the two-sided limit does not exist. This is a jump discontinuity.',
      },
      {
        question: 'If g(x) = (sin x)/x for x ≠ 0 and g(0) = 1, is g continuous at x = 0?',
        mathNotation: 'g(x) = sin(x)/x, g(0)=1',
        answer: 'Yes, because lim[x→0] (sin x)/x = 1 = g(0)',
        choices: [
          'No, because g(0) is artificially defined',
          'No, because (sin 0)/0 is undefined',
          'Yes, because lim[x→0] (sin x)/x = 1 = g(0)',
          'Yes, but only from the right',
        ],
        answerIndex: 2,
        explanation: 'The fundamental trig limit gives lim[x→0] (sin x)/x = 1. Since g(0) = 1 is defined and equals the limit, all three continuity conditions hold. g is continuous at x = 0.',
      },
    ],
    connections: [
      {
        conceptId: 't7-limits-intuition',
        tierId: 7,
        title: 'Limits — what a function approaches',
        bridgeFormula: 'lim[x→a] f(x) = L',
        explanation: 'Continuity is defined using limits. A function is continuous at a if and only if its limit at a equals its value at a. Understanding limits is the prerequisite for understanding continuity.',
      },
      {
        conceptId: 't7-mean-value-theorem',
        tierId: 7,
        title: 'Mean Value Theorem',
        bridgeFormula: "f'(c) = [f(b)−f(a)]/(b−a)",
        explanation: 'The Mean Value Theorem requires f to be continuous on [a,b] and differentiable on (a,b). Continuity is the minimum smoothness that gives the theorem its power.',
      },
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Definition',
        bridgeFormula: '∀ε>0 ∃δ>0: |x−a|<δ ⟹ |f(x)−f(a)|<ε',
        explanation: 'The epsilon-delta definition of continuity is the rigorous formulation of the three informal conditions. It makes precise what "no interruption" means analytically.',
      },
    ],
  },

  {
    id: 't7-mean-value-theorem',
    tierId: 7,
    glyph: 'MVT',
    title: 'Mean Value Theorem',
    subtitle: 'There is always a moment when instantaneous equals average',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'secant-tangent',
    canvasLabel: 'Secant and Tangent Lines',
    conceptTab: {
      summary: "The Mean Value Theorem guarantees that for any smooth curve on an interval, there is at least one point where the tangent line is perfectly parallel to the secant line connecting the endpoints.",
      whyItMatters:
        "The MVT is the bridge between local behavior (the derivative at a point) and global behavior (average change over an interval). It is the theorem behind speed cameras: if your average speed between two points exceeds the limit, you must have been speeding at some instant. In calculus, it underpins the proof that functions with zero derivatives are constant, and that anti-derivatives are unique up to a constant — both critical foundations for the theory of integration.",
      coreIdea:
        "STATEMENT: If f is continuous on [a, b] and differentiable on (a, b), then there exists at least one c ∈ (a, b) such that:\n\nf'(c) = [f(b) − f(a)] / (b − a)\n\nIn words: the instantaneous rate of change at c equals the average rate of change over [a, b].\n\nGEOMETRIC PICTURE: Draw the secant line connecting (a, f(a)) and (b, f(b)). The MVT says the curve must have a tangent line parallel to this secant somewhere in (a, b).\n\nROLLE'S THEOREM (special case): If additionally f(a) = f(b), the secant is horizontal, so f'(c) = 0 somewhere. This is the simpler result the MVT is built upon.\n\nCONSEQUENCE: If f'(x) = 0 for all x on an interval, then f is constant. If f'(x) = g'(x) everywhere, then f and g differ by a constant — this justifies the '+C' in every anti-derivative.",
      formula: "f'(c) = [f(b)−f(a)] / (b−a)",
      formulaLabel: 'Mean Value Theorem:',
      insights: [
        "The MVT is an existence theorem — it says c exists but gives no formula for it. Finding the exact c is an exercise in solving f'(c) = [f(b)−f(a)]/(b−a). In many applications, knowing c exists is all you need.",
        "Both hypotheses matter. Continuity on the closed interval [a,b] and differentiability on the open interval (a,b) are both required. f(x) = |x| on [−1,1] is continuous but not differentiable at 0 — and indeed the 'slope' at the corner cannot match the secant slope of 0.",
        "The MVT has a physical interpretation: if you drive from city A to city B with an average speed of 60 mph, there must be at least one moment when your speedometer reads exactly 60 mph. No matter how you accelerate and brake, that instantaneous moment is guaranteed.",
      ],
    },
    guided: {
      problemStatement: "Verify the Mean Value Theorem for f(x) = x² on [1, 3]. Find the value of c guaranteed by the theorem.",
      steps: [
        {
          label: 'Verify hypotheses',
          math: 'f(x) = x² is a polynomial',
          explanation: 'Polynomials are continuous everywhere and differentiable everywhere. Both hypotheses (continuous on [1,3], differentiable on (1,3)) are satisfied.',
        },
        {
          label: 'Compute the average rate of change',
          math: '[f(3)−f(1)]/(3−1) = (9−1)/2 = 8/2 = 4',
          explanation: 'f(3) = 9, f(1) = 1. The slope of the secant line is (9−1)/(3−1) = 4.',
        },
        {
          label: "Set f'(c) equal to the average rate",
          math: "f'(x) = 2x, so 2c = 4",
          explanation: "The derivative is f'(x) = 2x. The MVT guarantees some c with f'(c) = 4. So 2c = 4.",
        },
        {
          label: 'Solve for c',
          math: 'c = 2',
          explanation: 'c = 2. Check: 2 is in (1, 3). ✓ At x = 2, the tangent line has slope 4, which equals the slope of the secant from (1,1) to (3,9).',
          connectionNote: "For f(x) = x², the guaranteed point c is always the midpoint of [a,b]. This is a special property of parabolas — the average slope equals the derivative at the midpoint.",
        },
      ],
      reflectionPrompt: "Could there be MORE than one such c in (1, 3)? Does the MVT say c is unique? Try f(x) = sin(x) on [0, 2π] — how many values of c satisfy f'(c) = 0?",
    },
    practice: [
      {
        question: "For f(x) = x³ on [0, 2], what value of c satisfies the MVT conclusion?",
        mathNotation: "f'(c) = [f(2)−f(0)]/(2−0)",
        answer: 'c = 2/√3',
        choices: ['c = 1', 'c = 2/√3', 'c = √2', 'c = 4/3'],
        answerIndex: 1,
        explanation: "Average rate = (8−0)/2 = 4. f'(x) = 3x². Set 3c² = 4 → c² = 4/3 → c = 2/√3 ≈ 1.155, which is in (0,2). ✓",
      },
      {
        question: "Which hypothesis of the MVT fails for f(x) = 1/x on [−1, 1]?",
        mathNotation: 'f(x) = 1/x on [−1, 1]',
        answer: 'Continuity on [−1, 1] fails',
        choices: [
          'Differentiability on (−1, 1) fails',
          'Continuity on [−1, 1] fails',
          'Both hypotheses fail',
          'Neither hypothesis fails',
        ],
        answerIndex: 1,
        explanation: 'f(x) = 1/x is not defined (hence not continuous) at x = 0 ∈ [−1, 1]. Continuity on the closed interval fails. The MVT does not apply.',
      },
      {
        question: "The MVT guarantees f'(c) = 0 for some c ∈ (a, b) whenever f is smooth on [a,b] and:",
        mathNotation: "f'(c) = 0 ⟹ ?",
        answer: 'f(a) = f(b)',
        choices: ['f(a) = 0 and f(b) = 0', 'f(a) = f(b)', "f'(a) = f'(b)", 'f is increasing on [a,b]'],
        answerIndex: 1,
        explanation: "This is Rolle's Theorem: if f(a) = f(b), the average rate of change is 0, so f'(c) = 0 for some c. The curve must 'turn around' somewhere.",
      },
    ],
    connections: [
      {
        conceptId: 't7-continuity',
        tierId: 7,
        title: 'Continuity and types of discontinuity',
        bridgeFormula: 'lim[x→a] f(x) = f(a)',
        explanation: 'Continuity on [a,b] is the first hypothesis of the MVT. Without it, the curve can jump and avoid having any tangent parallel to the secant.',
      },
      {
        conceptId: 't7-definition-of-derivative',
        tierId: 7,
        title: 'Definition of the Derivative',
        bridgeFormula: "f'(x) = lim[h→0] [f(x+h)−f(x)]/h",
        explanation: "The MVT conclusion involves f'(c) — the derivative. Differentiability on (a,b) is the second hypothesis. The theorem ties instantaneous rate (derivative) to average rate (difference quotient).",
      },
      {
        conceptId: 't7-applications-of-derivatives',
        tierId: 7,
        title: 'Applications of Derivatives',
        bridgeFormula: "f'(x) > 0 ⟹ f increasing",
        explanation: "A key consequence of the MVT: if f'(x) > 0 on (a,b), then f is increasing on [a,b]. This is proved using the MVT and is the theoretical foundation for the first derivative test.",
      },
    ],
  },

  {
    id: 't7-lhopital',
    tierId: 7,
    glyph: 'L\'H',
    title: "L'Hôpital's rule",
    subtitle: 'Resolving indeterminate forms by differentiating numerator and denominator',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: "L'Hôpital's Rule",
    conceptTab: {
      summary: "L'Hôpital's rule converts a limit of the form 0/0 or ∞/∞ into a new limit by replacing the numerator and denominator with their derivatives — separately, not via the quotient rule.",
      whyItMatters:
        "Indeterminate forms are everywhere in calculus. The definition of the derivative is itself a 0/0 form. Limits involving e^x, ln(x), and trigonometric functions routinely produce indeterminate forms. L'Hôpital's rule is a power tool that resolves these efficiently. It also reveals deep relationships — for example, it proves that e^x grows faster than any polynomial, and that ln(x) grows slower than any power of x. These growth comparisons are essential in algorithm analysis and asymptotic reasoning throughout science and engineering.",
      coreIdea:
        "STATEMENT: If lim[x→a] f(x)/g(x) produces the form 0/0 or ±∞/∞, and if f and g are differentiable near a with g'(x) ≠ 0 near a, then:\n\nlim[x→a] f(x)/g(x) = lim[x→a] f'(x)/g'(x)\n\nprovided the right-hand limit exists (or is ±∞).\n\nIMPORTANT: You differentiate f and g SEPARATELY. This is NOT the quotient rule.\n\nOTHER INDETERMINATE FORMS — reduce to 0/0 or ∞/∞ first:\n• 0 · ∞: rewrite as 0/(1/∞) or ∞/(1/0)\n• ∞ − ∞: factor or combine fractions\n• 0⁰, 1^∞, ∞⁰: take ln, convert to 0/0, then exponentiate\n\nCLASSIC RESULT: lim[x→0] (sin x)/x = 1\n  f'(x) = cos x, g'(x) = 1 → lim[x→0] cos(x)/1 = cos(0) = 1 ✓",
      formula: "lim[x→a] f(x)/g(x) = lim[x→a] f'(x)/g'(x)",
      formulaLabel: "L'Hôpital's Rule (0/0 or ∞/∞):",
      insights: [
        "Always verify the indeterminate form BEFORE applying L'Hôpital's rule. If the limit is not 0/0 or ∞/∞, applying the rule gives a wrong answer. For example, lim[x→0] (x+1)/sin(x) is NOT indeterminate — it equals 1/0 = ∞, no rule needed.",
        "L'Hôpital's rule can be applied repeatedly if the resulting limit is still indeterminate. For lim[x→∞] x²/eˣ: first application gives 2x/eˣ (still ∞/∞), second gives 2/eˣ → 0. This proves exponentials eventually dominate polynomials.",
        "The rule was published by the Marquis de L'Hôpital in 1696, but discovered by Johann Bernoulli. L'Hôpital paid Bernoulli a retainer for mathematical results and published them under his own name — one of history's most famous disputes over mathematical credit.",
      ],
    },
    guided: {
      problemStatement: "Find lim[x→0] (eˣ − 1 − x) / x².",
      steps: [
        {
          label: 'Check the form',
          math: 'x=0: (e⁰−1−0)/0² = 0/0',
          explanation: 'At x = 0: numerator = 1−1−0 = 0, denominator = 0. This is a 0/0 indeterminate form. L\'Hôpital\'s rule applies.',
        },
        {
          label: 'Apply L\'Hôpital\'s rule once',
          math: "f'(x) = eˣ−1, g'(x) = 2x → lim[x→0] (eˣ−1)/(2x)",
          explanation: "Differentiate numerator: d/dx[eˣ−1−x] = eˣ−1. Differentiate denominator: d/dx[x²] = 2x. The new limit is lim[x→0] (eˣ−1)/(2x).",
        },
        {
          label: 'Check again — still 0/0',
          math: 'x=0: (e⁰−1)/(2·0) = 0/0',
          explanation: 'Still indeterminate. Apply L\'Hôpital\'s rule a second time.',
        },
        {
          label: 'Apply L\'Hôpital\'s rule again',
          math: "f''(x) = eˣ, g''(x) = 2 → lim[x→0] eˣ/2 = e⁰/2 = 1/2",
          explanation: "Differentiate again: d/dx[eˣ−1] = eˣ, d/dx[2x] = 2. Now substitute x = 0: e⁰/2 = 1/2.",
          connectionNote: "This result matches the coefficient of x² in the Taylor expansion of eˣ: eˣ = 1 + x + x²/2! + ... The limit 'reads off' the quadratic coefficient.",
        },
      ],
      reflectionPrompt: "What does the answer 1/2 tell you about how fast eˣ − 1 − x grows compared to x² near zero? Is eˣ above or below the line 1 + x near x = 0?",
    },
    practice: [
      {
        question: "Find lim[x→0] sin(3x) / x.",
        mathNotation: 'lim[x→0] sin(3x)/x',
        answer: '3',
        choices: ['0', '1', '3', 'does not exist'],
        answerIndex: 2,
        explanation: "0/0 form. Apply L'Hôpital: d/dx[sin(3x)] = 3cos(3x), d/dx[x] = 1. Limit = 3cos(0)/1 = 3·1 = 3.",
      },
      {
        question: "Find lim[x→∞] x² / eˣ.",
        mathNotation: 'lim[x→∞] x²/eˣ',
        answer: '0',
        choices: ['∞', '1', '2', '0'],
        answerIndex: 3,
        explanation: "∞/∞ form. First application: 2x/eˣ (still ∞/∞). Second application: 2/eˣ → 0 as x→∞. Exponentials dominate polynomials.",
      },
      {
        question: "For lim[x→1] (x²−1)/(x−1), should you use L'Hôpital's rule?",
        mathNotation: 'lim[x→1] (x²−1)/(x−1)',
        answer: "L'Hôpital's works, but factoring is easier: answer is 2",
        choices: [
          "No — L'Hôpital's rule does not apply here",
          "L'Hôpital's works, but factoring is easier: answer is 2",
          "L'Hôpital's gives answer 1",
          "L'Hôpital's gives answer 0",
        ],
        answerIndex: 1,
        explanation: "Both methods work: factoring gives (x+1)(x−1)/(x−1) = x+1 → 2. L'Hôpital: 2x/1 → 2. Same answer. Factoring is simpler when possible.",
      },
    ],
    connections: [
      {
        conceptId: 't7-limits-intuition',
        tierId: 7,
        title: 'Limits — what a function approaches',
        bridgeFormula: 'lim[x→a] f(x)/g(x) → 0/0 or ∞/∞',
        explanation: "L'Hôpital's rule is a technique for evaluating limits when direct substitution produces an indeterminate form. It extends the toolkit built around limit computation.",
      },
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: "d/dx[f(x)/g(x)] ≠ f'(x)/g'(x) in general",
        explanation: "L'Hôpital's rule differentiates numerator and denominator separately — which looks like the quotient rule but is NOT. The quotient rule computes the derivative of a ratio. L'Hôpital evaluates a limit. They are different operations used in different contexts.",
      },
      {
        conceptId: 't8-taylor-series',
        tierId: 8,
        title: 'Taylor Series',
        bridgeFormula: "f(x) = Σ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ",
        explanation: "Taylor series often provide an alternative to L'Hôpital's rule. Near x = 0, sin(x) ≈ x − x³/6, so sin(x)/x ≈ 1 − x²/6 → 1. Both methods converge to the same limit, but Taylor series reveal more about the rate of approach.",
      },
    ],
  },

  {
    id: 't7-related-rates',
    tierId: 7,
    glyph: 'dr/dt',
    title: 'Related rates',
    subtitle: 'When two changing quantities are linked by a geometric or physical relationship',
    tags: ['calculus', 'geometry'],
    accessibilityLevel: 'college',
    visualizationType: 'generic',
    canvasLabel: 'Related Rates Diagram',
    conceptTab: {
      summary: 'Related rates problems use implicit differentiation with respect to time to find how fast one quantity changes given how fast a related quantity changes.',
      whyItMatters:
        "Related rates bridge pure calculus and the physical world. Radar guns use related rates to compute the speed of an approaching car from changes in the measured distance. In medicine, the rate at which a spherical tumor grows determines how fast its volume increases. Engineers track how quickly water levels change in reservoirs of complicated shapes. Any time two geometric or physical quantities are tied together by a formula, related rates connects their rates of change — making it one of the most practically powerful applications of the derivative.",
      coreIdea:
        "CORE TECHNIQUE: When two quantities x and y are related by an equation, differentiating both sides with respect to time t gives a relationship between dx/dt and dy/dt.\n\nExample: A spherical balloon is being inflated. Volume V = (4/3)πr³. Differentiating with respect to t:\ndV/dt = 4πr² · dr/dt\n\nIf we know dV/dt (rate air is pumped in), we can solve for dr/dt (rate the radius grows) at any radius r.\n\nPROBLEM-SOLVING STRATEGY:\n1. Draw a diagram and label all relevant quantities with variables.\n2. Write an equation relating the quantities.\n3. Differentiate both sides implicitly with respect to t.\n4. Substitute the known values and rates.\n5. Solve for the unknown rate.\n\nCRITICAL NOTE: Substitute specific values ONLY AFTER differentiating. Substituting first freezes a dynamic quantity into a constant, destroying the rate information.",
      formula: 'dV/dt = 4πr² · dr/dt',
      formulaLabel: 'Sphere volume rate (example):',
      insights: [
        "The most common error in related rates: substituting numerical values BEFORE differentiating. Once you plug in a number, it becomes a constant with derivative zero. Always differentiate the general equation first, then substitute.",
        "The Pythagorean theorem (a² + b² = c²) appears constantly in related rates. Ladders sliding down walls, boats moving away from docks, shadows lengthening — all produce right-triangle configurations where differentiating a² + b² = c² with respect to t gives 2a(da/dt) + 2b(db/dt) = 2c(dc/dt).",
        "Related rates is really implicit differentiation applied to time. Both techniques differentiate an equation involving multiple variables — in implicit differentiation the independent variable is x, in related rates it is t. Mastering one is mastering both.",
      ],
    },
    guided: {
      problemStatement: 'A ladder 10 ft long leans against a wall. The base slides away at 2 ft/sec. How fast is the top sliding down when the base is 6 ft from the wall?',
      steps: [
        {
          label: 'Set up variables and equation',
          math: 'x = distance from wall, y = height on wall; x² + y² = 100',
          explanation: 'Let x be the distance of the base from the wall and y be the height of the top on the wall. By the Pythagorean theorem, x² + y² = 10² = 100.',
        },
        {
          label: 'Find y when x = 6',
          math: '6² + y² = 100 → y² = 64 → y = 8',
          explanation: 'At the moment of interest, x = 6. Plug into the Pythagorean equation: 36 + y² = 100, so y = 8 ft.',
        },
        {
          label: 'Differentiate with respect to t',
          math: '2x(dx/dt) + 2y(dy/dt) = 0',
          explanation: 'Differentiate x² + y² = 100 implicitly with respect to t. By the chain rule, d/dt[x²] = 2x(dx/dt) and d/dt[y²] = 2y(dy/dt). The right side is 0 (constant).',
        },
        {
          label: 'Substitute and solve',
          math: '2(6)(2) + 2(8)(dy/dt) = 0 → dy/dt = −24/16 = −3/2',
          explanation: 'Substitute x = 6, y = 8, dx/dt = 2. Solve: 24 + 16(dy/dt) = 0 → dy/dt = −3/2 ft/sec. The negative sign means the top is sliding DOWN.',
          connectionNote: 'As x increases, y must decrease (ladder length is fixed). The negative dy/dt confirms this geometric necessity.',
        },
      ],
      reflectionPrompt: 'Why does dy/dt → −∞ as the base approaches 10 ft from the wall? What is the physical meaning of this? Would the ladder actually reach infinite speed?',
    },
    practice: [
      {
        question: 'A spherical balloon is inflated at 100 cm³/sec. How fast is the radius growing when r = 5 cm? (V = 4πr³/3)',
        mathNotation: 'dV/dt = 100, r = 5, find dr/dt',
        answer: '1/π cm/sec',
        choices: ['5/π cm/sec', '1/π cm/sec', '4π cm/sec', '100/(4π) cm/sec'],
        answerIndex: 1,
        explanation: 'dV/dt = 4πr²(dr/dt). Substitute: 100 = 4π(25)(dr/dt) = 100π(dr/dt). So dr/dt = 100/(100π) = 1/π cm/sec.',
      },
      {
        question: 'A 5-ft tall person walks away from a 20-ft lamppost at 4 ft/sec. How fast is their shadow lengthening?',
        mathNotation: 'Person: 5 ft, post: 20 ft, dx/dt = 4 ft/sec',
        answer: '4/3 ft/sec',
        choices: ['1 ft/sec', '4/3 ft/sec', '5/3 ft/sec', '16/3 ft/sec'],
        answerIndex: 1,
        explanation: 'Let x = distance from post, s = shadow length. Similar triangles: 20/(x+s) = 5/s → 20s = 5(x+s) → 15s = 5x → s = x/3. So ds/dt = (1/3)(dx/dt) = 4/3 ft/sec.',
      },
      {
        question: 'In related rates, when should you substitute known numerical values into your equation?',
        mathNotation: 'Strategy question',
        answer: 'After differentiating with respect to t',
        choices: [
          'Before differentiating, to simplify the equation',
          'After differentiating with respect to t',
          'Either before or after — it makes no difference',
          'Only in the final step, after solving for the unknown rate',
        ],
        answerIndex: 1,
        explanation: 'Always differentiate first, then substitute. Substituting before differentiating turns dynamic variables into constants (derivative = 0), losing all rate information.',
      },
    ],
    connections: [
      {
        conceptId: 't7-implicit-differentiation',
        tierId: 7,
        title: 'Implicit differentiation',
        bridgeFormula: 'd/dt[f(x,y)] — both x and y depend on t',
        explanation: "Related rates is implicit differentiation with respect to time. The same technique of differentiating both sides of an equation and applying the chain rule to each variable applies in both contexts.",
      },
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: 'd/dt[r(t)²] = 2r(t)·r\'(t)',
        explanation: 'The chain rule is the engine of related rates. Every time you differentiate a function of x with respect to t, the chain rule produces a factor of dx/dt.',
      },
      {
        conceptId: 't7-applications-of-derivatives',
        tierId: 7,
        title: 'Applications of Derivatives',
        bridgeFormula: 'Rate = d/dt[quantity]',
        explanation: 'Related rates is an application of derivatives to dynamic physical situations. Optimization and related rates are the two pillars of applied differential calculus.',
      },
    ],
  },

  {
    id: 't7-implicit-differentiation',
    tierId: 7,
    glyph: 'dy/dx',
    title: 'Implicit differentiation',
    subtitle: 'Differentiating equations that cannot be solved for y',
    tags: ['calculus', 'algebra'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Implicit Curve',
    conceptTab: {
      summary: "Implicit differentiation finds dy/dx for curves defined by equations in both x and y, without needing to solve for y first. It treats y as a function of x and applies the chain rule.",
      whyItMatters:
        "Many important curves — circles, ellipses, hyperbolas, the folium of Descartes, curves in thermodynamics — cannot be written as y = f(x) globally. Implicit differentiation lets us find tangent lines and rates of change on these curves anyway. It is also the foundation for related rates (differentiating with respect to t instead of x) and appears in multivariable calculus through implicit function theorems. Without it, calculus would be restricted to explicit functions.",
      coreIdea:
        "IDEA: If y is implicitly defined as a function of x by an equation F(x, y) = 0, differentiate both sides with respect to x. Whenever you differentiate a term involving y, apply the chain rule — this introduces a factor of dy/dx.\n\nEXAMPLE: Find dy/dx for x² + y² = 25 (a circle).\n\nDifferentiate both sides with respect to x:\n2x + 2y(dy/dx) = 0\n\nSolve for dy/dx:\n2y(dy/dx) = −2x\ndy/dx = −x/y\n\nINTERPRETATION: At the point (3, 4) on the circle, dy/dx = −3/4. The tangent line at (3, 4) has slope −3/4.\n\nVERIFICATION: For the upper semicircle, y = √(25−x²), so dy/dx = −x/√(25−x²) = −x/y. ✓\n\nCOMPLEX EXAMPLE: y³ + xy = 5\nDifferentiate: 3y²(dy/dx) + y + x(dy/dx) = 0\nFactor: (3y² + x)(dy/dx) = −y\nSolve: dy/dx = −y/(3y² + x)",
      formula: 'd/dx[y²] = 2y · (dy/dx)',
      formulaLabel: 'Chain rule applied to y:',
      insights: [
        "The key mechanical step: every time you differentiate a y-term, write the derivative of the outside expression times dy/dx. So d/dx[y³] = 3y²(dy/dx), d/dx[sin(y)] = cos(y)(dy/dx), d/dx[eʸ] = eʸ(dy/dx). Treat y as a composite function of x.",
        "When differentiating a product like xy, use the product rule: d/dx[xy] = x(dy/dx) + y·1 = x(dy/dx) + y. Both terms matter — the x is explicit (derivative 1) and y is implicit (derivative dy/dx).",
        "Implicit differentiation can produce dy/dx expressed in terms of BOTH x and y. That is perfectly valid — to find the slope at a specific point, substitute both coordinates. This is different from explicit differentiation, where dy/dx involves only x.",
      ],
    },
    guided: {
      problemStatement: 'Find the slope of the tangent line to x³ + y³ = 9 at the point (1, 2).',
      steps: [
        {
          label: 'Differentiate both sides with respect to x',
          math: '3x² + 3y²(dy/dx) = 0',
          explanation: 'd/dx[x³] = 3x². For d/dx[y³]: y is a function of x, so by the chain rule, d/dx[y³] = 3y²(dy/dx). The right side is d/dx[9] = 0.',
        },
        {
          label: 'Isolate dy/dx',
          math: '3y²(dy/dx) = −3x²',
          explanation: 'Move the 3x² term to the right side.',
        },
        {
          label: 'Solve for dy/dx',
          math: 'dy/dx = −3x²/(3y²) = −x²/y²',
          explanation: 'Divide both sides by 3y². The derivative in implicit form is dy/dx = −x²/y².',
        },
        {
          label: 'Evaluate at (1, 2)',
          math: 'dy/dx|(1,2) = −(1)²/(2)² = −1/4',
          explanation: 'Substitute x = 1, y = 2. The slope of the tangent line at (1, 2) is −1/4.',
          connectionNote: "Verify the point is on the curve: 1³ + 2³ = 1 + 8 = 9. ✓ The curve x³+y³=9 is the folium-like cubic. No simple explicit formula for y exists, but implicit differentiation gives the slope effortlessly.",
        },
      ],
      reflectionPrompt: "Why can't you simply solve x³ + y³ = 9 for y and differentiate? What property of this curve makes explicit differentiation impossible globally?",
    },
    practice: [
      {
        question: 'Find dy/dx for x² + y² = r² (circle of radius r).',
        mathNotation: 'x² + y² = r²',
        answer: 'dy/dx = −x/y',
        choices: ['dy/dx = x/y', 'dy/dx = −x/y', 'dy/dx = −y/x', 'dy/dx = 2x + 2y'],
        answerIndex: 1,
        explanation: 'Differentiate: 2x + 2y(dy/dx) = 0. Solve: dy/dx = −x/y. The slope of a circle at (x,y) is −x/y — perpendicular to the radius vector (slope y/x). ✓',
      },
      {
        question: 'For sin(y) = x, find dy/dx.',
        mathNotation: 'sin(y) = x',
        answer: 'dy/dx = 1/cos(y) = sec(y)',
        choices: ['dy/dx = cos(y)', 'dy/dx = −cos(y)', 'dy/dx = 1/cos(y)', 'dy/dx = x/cos(y)'],
        answerIndex: 2,
        explanation: 'Differentiate: cos(y)(dy/dx) = 1. Solve: dy/dx = 1/cos(y) = sec(y). This derivation shows how the derivative of arcsin(x) = 1/√(1−x²) arises: y = arcsin(x) means sin(y)=x, and cos(y) = √(1−x²).',
      },
      {
        question: 'For xy + y² = 6, find dy/dx.',
        mathNotation: 'xy + y² = 6',
        answer: 'dy/dx = −y/(x + 2y)',
        choices: [
          'dy/dx = −y/(x + 2y)',
          'dy/dx = y/(x − 2y)',
          'dy/dx = −(x + 2y)/y',
          'dy/dx = −1/(1 + 2y)',
        ],
        answerIndex: 0,
        explanation: 'Product rule on xy: d/dx[xy] = y + x(dy/dx). Then: y + x(dy/dx) + 2y(dy/dx) = 0. Factor: (x+2y)(dy/dx) = −y. So dy/dx = −y/(x+2y).',
      },
    ],
    connections: [
      {
        conceptId: 't7-derivative-rules',
        tierId: 7,
        title: 'Derivative Rules',
        bridgeFormula: "d/dx[f(y)] = f'(y) · dy/dx",
        explanation: "Implicit differentiation is the chain rule applied to y as a function of x. Every standard derivative rule (power, product, chain) still applies — y just carries a dy/dx factor.",
      },
      {
        conceptId: 't7-related-rates',
        tierId: 7,
        title: 'Related rates',
        bridgeFormula: 'd/dt[F(x,y)] = 0',
        explanation: 'Related rates replaces x as the independent variable with time t. The technique is identical — differentiate both sides, apply the chain rule to every variable, then solve for the desired rate.',
      },
      {
        conceptId: 't7-applications-of-derivatives',
        tierId: 7,
        title: 'Applications of Derivatives',
        bridgeFormula: 'Tangent line: y − y₀ = m(x − x₀)',
        explanation: 'Implicit differentiation produces the slope needed for tangent lines to implicitly defined curves. Without it, finding tangent lines to circles, ellipses, and more complex curves would be impossible in many cases.',
      },
    ],
  },
];
