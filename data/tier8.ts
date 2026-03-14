import type { Concept } from '../types';

export const TIER8_CONCEPTS: Concept[] = [
  {
    id: 't8-integration-by-parts',
    tierId: 8,
    glyph: '∫uv',
    title: 'Integration by parts',
    subtitle: 'Reversing the product rule to integrate products',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Integration by Parts',
    conceptTab: {
      summary: "Integration by parts transforms an integral of a product into a (hopefully simpler) integral, by reversing the product rule for differentiation.",
      whyItMatters:
        "U-substitution handles compositions. Integration by parts handles products. Together they conquer most integrals you will ever encounter. Integrals like ∫x·eˣ dx, ∫x·sin(x) dx, and ∫ln(x) dx all yield to integration by parts. In physics, quantum mechanics integrals, energy calculations, and signal processing all rely on this technique. It is one of the two master techniques of integration.",
      coreIdea:
        "DERIVATION: The product rule says d/dx[uv] = u'v + uv'. Rearrange: uv' = d/dx[uv] − u'v. Integrate both sides:\n∫uv' dx = uv − ∫u'v dx\n\nIn standard notation (du = u'dx, dv = v'dx):\n∫u dv = uv − ∫v du\n\nThe goal: choose u and dv so that ∫v du is simpler than ∫u dv.\n\nLIPET PRIORITY for choosing u (first on the list = better candidate for u):\nL — Logarithms (ln x)\nI — Inverse trig (arctan x)\nP — Polynomials (x², x, ...)\nE — Exponentials (eˣ)\nT — Trig (sin x, cos x)\n\nExample: ∫x·eˣ dx\n  u = x, dv = eˣ dx\n  du = dx, v = eˣ\n  = x·eˣ − ∫eˣ dx = x·eˣ − eˣ + C = eˣ(x−1) + C",
      formula: '∫u dv = uv − ∫v du',
      formulaLabel: 'Integration by Parts:',
      insights: [
        "Sometimes you must apply integration by parts TWICE. For ∫x²eˣdx, the first round gives ∫xeˣdx, which requires a second application. Some integrals (like ∫eˣcos x dx) cycle back to themselves — solve algebraically for the integral.",
        "∫ln(x) dx seems to have no dv, but set u = ln(x) and dv = dx. Then du = dx/x and v = x. Result: x·ln(x) − ∫x·(1/x)dx = x·ln(x) − x + C. Integration by parts works even when the 'product' is hidden.",
        "The formula ∫u dv = uv − ∫v du is symmetric. You could also write it as ∫v du = uv − ∫u dv. The choice of which factor is u and which is dv determines whether the problem gets easier or harder.",
      ],
    },
    guided: {
      problemStatement: 'Compute ∫ x·sin(x) dx.',
      steps: [
        {
          label: 'Choose u and dv',
          math: 'u = x, dv = sin(x) dx',
          explanation: 'By LIPET, the polynomial x should be u and the trig function dv. Polynomial choice makes du simpler (it reduces degree).',
        },
        {
          label: 'Compute du and v',
          math: 'du = dx; v = ∫sin(x)dx = −cos(x)',
          explanation: 'Differentiate u to get du = dx. Integrate dv to get v = −cos(x). (No constant needed here.)',
        },
        {
          label: 'Apply the formula',
          math: '∫x·sin(x)dx = x·(−cos x) − ∫(−cos x)dx',
          explanation: '∫u dv = uv − ∫v du = x·(−cos x) − ∫(−cos x)·1·dx.',
        },
        {
          label: 'Integrate the remaining term',
          math: '= −x·cos(x) + ∫cos(x)dx = −x·cos(x) + sin(x) + C',
          explanation: '∫cos(x)dx = sin(x). Combine: the answer is −x·cos(x) + sin(x) + C.',
          connectionNote: "Check by differentiating: d/dx[−x cos x + sin x] = −cos x + x sin x + cos x = x sin x. ✓",
        },
      ],
      reflectionPrompt: 'What would happen if you tried u = sin(x) and dv = x dx instead? Would that make the remaining integral simpler or harder? Try it and see.',
    },
    practice: [
      {
        question: 'Compute ∫ x·eˣ dx.',
        mathNotation: '∫ x·eˣ dx',
        answer: 'eˣ(x−1) + C',
        choices: ['x·eˣ + C', 'eˣ(x+1) + C', 'eˣ(x−1) + C', 'x²eˣ/2 + C'],
        answerIndex: 2,
        explanation: 'u=x, dv=eˣdx → du=dx, v=eˣ. ∫xeˣdx = xeˣ − ∫eˣdx = xeˣ − eˣ + C = eˣ(x−1) + C.',
      },
      {
        question: 'Compute ∫ ln(x) dx.',
        mathNotation: '∫ ln(x) dx',
        answer: 'x·ln(x) − x + C',
        choices: ['x/ln(x) + C', 'ln(x)/x + C', 'x·ln(x) − x + C', 'x·ln(x) + C'],
        answerIndex: 2,
        explanation: 'u=ln(x), dv=dx → du=dx/x, v=x. ∫ln(x)dx = x·ln(x) − ∫x·(1/x)dx = x·ln(x) − ∫1dx = x·ln(x) − x + C.',
      },
      {
        question: 'For ∫ x²·eˣ dx, how many times must integration by parts be applied?',
        mathNotation: '∫ x²·eˣ dx',
        answer: 'Twice',
        choices: ['Once', 'Twice', 'Three times', 'It cannot be done'],
        answerIndex: 1,
        explanation: "First application gives ∫xeˣdx (reducing x² to x). Second application gives ∫eˣdx (reducing x to 1). Each round reduces the polynomial degree by one.",
      },
    ],
    connections: [
      {
        conceptId: 't8-sequences-series',
        tierId: 8,
        title: 'Sequences and Series',
        bridgeFormula: '∫[0→∞] xⁿe⁻ˣdx = n!',
        explanation: 'The Gamma function Γ(n+1) = ∫[0→∞] xⁿe⁻ˣdx = n! is proved by integration by parts. Series and integrals merge in advanced mathematics.',
      },
      {
        conceptId: 't7-fundamental-theorem',
        tierId: 7,
        title: 'Fundamental Theorem of Calculus',
        bridgeFormula: '∫u dv = [uv]ₐᵇ − ∫v du (definite version)',
        explanation: 'Integration by parts works for definite integrals too: ∫[a→b]u dv = [uv]ₐᵇ − ∫[a→b]v du. The FTC supplies the framework for evaluating these boundary terms.',
      },
    ],
  },

  {
    id: 't8-sequences-series',
    tierId: 8,
    glyph: 'Σ',
    title: 'Sequences and infinite series',
    subtitle: 'When infinite sums have finite answers',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Partial Sums',
    conceptTab: {
      summary: 'An infinite series is an infinite sum of terms. Some infinite series converge to a finite number; others diverge to infinity. Determining which is which is the central challenge.',
      whyItMatters:
        "How can infinitely many numbers add up to something finite? 1/2 + 1/4 + 1/8 + ... = 1. Zeno's paradox — you must cross infinitely many midpoints to cross a room — is resolved by this fact. Beyond philosophy, series make computation possible: sin(x), cos(x), eˣ, and ln(x) are computed by computers using their series expansions. GPS, signal processing, quantum mechanics — all rely on series.",
      coreIdea:
        "A SEQUENCE is a list: a₁, a₂, a₃, ...\nA SERIES is the SUM of a sequence: Σaₙ = a₁ + a₂ + a₃ + ...\n\nA series CONVERGES if the partial sums Sₙ = a₁+...+aₙ approach a finite limit as n→∞.\n\nGEOMETRIC SERIES (most important example):\nΣᵢ₌₀^∞ arⁱ = a/(1−r), provided |r| < 1\nIf |r| ≥ 1, the series diverges.\n\nExample: 1 + 1/2 + 1/4 + ... = Σ(1/2)ⁿ = 1/(1−½) = 2\n\nHARMONIC SERIES: 1 + 1/2 + 1/3 + 1/4 + ... diverges (grows without bound, just very slowly).",
      formula: 'Σᵢ₌₀^∞ arⁱ = a/(1−r), |r| < 1',
      formulaLabel: 'Geometric series:',
      insights: [
        "The harmonic series 1 + 1/2 + 1/3 + ... diverges even though individual terms go to zero. Terms going to zero is NECESSARY but not SUFFICIENT for convergence. The divergence of the harmonic series surprises almost everyone the first time they see the proof.",
        "The p-series Σ 1/nᵖ converges if p > 1 and diverges if p ≤ 1. The harmonic series is the boundary case p=1. The value of Σ 1/n² = π²/6 — an extraordinary result connecting integers, powers, and π.",
        "Convergence tests (ratio test, comparison test, integral test, alternating series test) are tools for determining whether a series converges WITHOUT computing its sum. Often you only need to know IF it converges, not WHAT it converges to.",
      ],
    },
    guided: {
      problemStatement: 'Does the series Σₙ₌₁^∞ (3/5)ⁿ converge? If so, find its sum.',
      steps: [
        {
          label: 'Identify the type of series',
          math: 'Σ(3/5)ⁿ = (3/5) + (3/5)² + (3/5)³ + ...',
          explanation: 'This is a geometric series with first term a = 3/5 and common ratio r = 3/5.',
        },
        {
          label: 'Check the convergence condition',
          math: '|r| = |3/5| = 3/5 < 1 ✓',
          explanation: 'Since |r| = 3/5 < 1, the geometric series converges.',
        },
        {
          label: 'Apply the formula',
          math: 'S = a/(1−r) = (3/5)/(1 − 3/5) = (3/5)/(2/5)',
          explanation: 'Use the geometric series formula with a = 3/5 and r = 3/5.',
        },
        {
          label: 'Simplify',
          math: '(3/5) ÷ (2/5) = (3/5) × (5/2) = 3/2',
          explanation: 'Dividing fractions: multiply by the reciprocal. The sum is 3/2.',
          connectionNote: 'Interpretation: infinitely many powers of 3/5, starting from (3/5)¹, add up exactly to 3/2 = 1.5.',
        },
      ],
      reflectionPrompt: 'What happens to the geometric series Σarⁿ if r = 1? If r = −1? Why does the formula a/(1−r) break down in these cases?',
    },
    practice: [
      {
        question: 'What is the sum of the geometric series 1 + 1/3 + 1/9 + 1/27 + ...?',
        mathNotation: 'Σ (1/3)ⁿ, n=0 to ∞',
        answer: '3/2',
        choices: ['1', '3/2', '3', 'diverges'],
        answerIndex: 1,
        explanation: 'a=1, r=1/3. Sum = a/(1−r) = 1/(1−1/3) = 1/(2/3) = 3/2.',
      },
      {
        question: 'Does the series Σ 1/n (harmonic series) converge?',
        mathNotation: '1 + 1/2 + 1/3 + 1/4 + ...',
        answer: 'No, it diverges',
        choices: ['Yes, it converges to 2', 'Yes, it converges to ln(2)', 'No, it diverges', 'Cannot determine'],
        answerIndex: 2,
        explanation: "The harmonic series diverges. Despite terms going to zero, they don't go to zero fast enough. The partial sums grow without bound (very slowly, like ln(n)).",
      },
      {
        question: 'For a geometric series with a=4 and r=3, what is the sum?',
        mathNotation: '4 + 12 + 36 + ...',
        answer: 'The series diverges',
        choices: ['12', '6', '2', 'The series diverges'],
        answerIndex: 3,
        explanation: '|r| = 3 ≥ 1, so the geometric series diverges. Terms grow without bound.',
      },
    ],
    connections: [
      {
        conceptId: 't8-taylor-series',
        tierId: 8,
        title: 'Taylor and Maclaurin Series',
        bridgeFormula: "eˣ = Σ xⁿ/n! = 1 + x + x²/2! + ...",
        explanation: 'Taylor series express functions as power series (special infinite series with powers of x). Understanding convergence of series is prerequisite to understanding when Taylor series representations are valid.',
      },
      {
        conceptId: 't7-riemann-sums-integrals',
        tierId: 7,
        title: 'Riemann Sums',
        bridgeFormula: '∫f dx = lim[n→∞] Σf(xᵢ)Δx',
        explanation: 'The definite integral is a limit of sums — a series with infinitely many terms each going to zero. The integral IS a special kind of series, and series convergence ideas apply.',
      },
    ],
  },

  {
    id: 't8-convergence-tests',
    tierId: 8,
    glyph: '?→',
    title: 'Convergence tests',
    subtitle: 'Tools for determining if a series converges',
    tags: ['calculus', 'proof'],
    accessibilityLevel: 'college',
    visualizationType: 'generic',
    canvasLabel: 'Convergence Tests',
    conceptTab: {
      summary: 'Convergence tests are theorems that tell you whether a series converges or diverges, usually without requiring you to find the exact sum.',
      whyItMatters:
        "Most series don't have nice closed-form sums. You rarely need to know that Σ 1/n³ = 1.202...; you just need to know it converges (it does, by p-series with p=3>1). Convergence tests are the tools. In real analysis, proving convergence rigorously is the bridge between computation and proof-based mathematics. In applications, knowing a series converges (or an approximation error is bounded) is what allows engineers and scientists to trust their calculations.",
      coreIdea:
        "THE MAIN TESTS:\n\n1. DIVERGENCE TEST: If lim[n→∞] aₙ ≠ 0, the series diverges. (If aₙ→0, this test is inconclusive.)\n\n2. GEOMETRIC SERIES: Σarⁿ converges iff |r|<1. Sum = a/(1−r).\n\n3. p-SERIES: Σ 1/nᵖ converges iff p>1.\n\n4. COMPARISON TEST: If 0 ≤ aₙ ≤ bₙ and Σbₙ converges, then Σaₙ converges. If Σaₙ diverges, so does Σbₙ.\n\n5. RATIO TEST: Let L = lim|aₙ₊₁/aₙ|. If L<1: converges. If L>1: diverges. If L=1: inconclusive.\n\n6. ALTERNATING SERIES TEST: Σ(−1)ⁿbₙ converges if bₙ↓0 (decreasing to zero).",
      formula: 'L = lim[n→∞] |aₙ₊₁/aₙ|: L<1 → converges, L>1 → diverges',
      formulaLabel: 'Ratio Test:',
      insights: [
        "The Ratio Test excels for series involving factorials (n!) or exponentials (rⁿ), because these simplify beautifully in the ratio aₙ₊₁/aₙ. For example, (n+1)!/n! = n+1, and aⁿ⁺¹/aⁿ = a.",
        "No single test works for everything. Strategy: (1) Check if terms go to 0. (2) Recognize geometric or p-series. (3) Try comparison with a known series. (4) Try ratio test. (5) Check for alternating sign.",
        "Absolute convergence (Σ|aₙ| converges) implies convergence. Conditional convergence (Σaₙ converges but Σ|aₙ| doesn't) is subtler. The alternating harmonic series Σ(−1)ⁿ/n converges conditionally to ln(2), but Σ1/n diverges.",
      ],
    },
    guided: {
      problemStatement: 'Determine whether Σₙ₌₁^∞ n!/3ⁿ converges or diverges.',
      steps: [
        {
          label: 'Choose the ratio test (factorials present)',
          math: 'aₙ = n!/3ⁿ',
          explanation: 'Factorials in a series strongly suggest the ratio test, which handles n! elegantly through telescoping.',
        },
        {
          label: 'Compute the ratio',
          math: 'aₙ₊₁/aₙ = [(n+1)!/3ⁿ⁺¹] / [n!/3ⁿ] = (n+1)/3',
          explanation: '(n+1)!/n! = n+1 (just the top factor remains). 3ⁿ/3ⁿ⁺¹ = 1/3. Product: (n+1)/3.',
        },
        {
          label: 'Take the limit',
          math: 'L = lim[n→∞] (n+1)/3 = ∞',
          explanation: 'As n→∞, (n+1)/3 → ∞. So L = ∞ > 1.',
        },
        {
          label: 'Conclude',
          math: 'L = ∞ > 1 → series DIVERGES',
          explanation: 'The ratio test: L > 1 means divergence. Factorials grow faster than exponentials.',
          connectionNote: "This is why n! eventually crushes 3ⁿ: factorials multiply by n each step; 3ⁿ always multiplies by the fixed number 3.",
        },
      ],
      reflectionPrompt: 'The Divergence Test says if aₙ → 0, the test is inconclusive. Can you find a series where aₙ → 0 but the series diverges? (Hint: think harmonic.)',
    },
    practice: [
      {
        question: 'Does Σ n/(n²+1) converge? Use the comparison or limit comparison test.',
        mathNotation: 'Σ n/(n²+1)',
        answer: 'Diverges',
        choices: ['Converges', 'Diverges', 'Cannot determine', 'Converges to 1'],
        answerIndex: 1,
        explanation: 'n/(n²+1) ≈ n/n² = 1/n for large n. Limit comparison with 1/n: lim [n/(n²+1)]/(1/n) = lim n²/(n²+1) = 1 > 0. Since Σ1/n diverges, Σn/(n²+1) diverges.',
      },
      {
        question: 'Use the ratio test on Σ xⁿ/n!. For what values of x does it converge?',
        mathNotation: 'L = lim|xⁿ⁺¹/(n+1)! · n!/xⁿ|',
        answer: 'All real x',
        choices: ['|x| < 1 only', '|x| < e only', 'All real x', 'x > 0 only'],
        answerIndex: 2,
        explanation: 'Ratio: |x/(n+1)| → 0 for ANY fixed x as n→∞. So L=0<1 for all x. The series eˣ = Σxⁿ/n! converges for ALL real (and complex) x.',
      },
      {
        question: 'Does the alternating series Σ (−1)ⁿ/n converge?',
        mathNotation: '−1 + 1/2 − 1/3 + 1/4 − ...',
        answer: 'Yes, conditionally',
        choices: ['No, diverges', 'Yes, absolutely', 'Yes, conditionally', 'Cannot determine'],
        answerIndex: 2,
        explanation: "bₙ = 1/n is decreasing and → 0, so by the Alternating Series Test it converges. But Σ|1/n| = Σ1/n diverges. So it's conditionally (not absolutely) convergent. Its sum is ln(2).",
      },
    ],
    connections: [
      {
        conceptId: 't8-taylor-series',
        tierId: 8,
        title: 'Taylor and Maclaurin Series',
        bridgeFormula: 'Interval of convergence via ratio test',
        explanation: "Taylor series are power series Σcₙ(x−a)ⁿ. The ratio test determines the 'radius of convergence' — the interval of x-values for which the Taylor series equals the function.",
      },
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Proofs',
        bridgeFormula: '∀ε>0 ∃N: n>N ⟹ |Sₙ−S|<ε',
        explanation: 'The formal definition of series convergence is an ε-N argument (parallel to ε-δ for function limits): the partial sums Sₙ must get within ε of S for all n beyond some N.',
      },
    ],
  },

  {
    id: 't8-taylor-series',
    tierId: 8,
    glyph: 'Tₙ',
    title: 'Taylor and Maclaurin series',
    subtitle: 'Approximating functions as infinite polynomials',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Taylor Approximation',
    conceptTab: {
      summary: "Taylor series express a smooth function as an infinite sum of polynomial terms, giving increasingly accurate approximations using the function's derivatives at a single point.",
      whyItMatters:
        "Your calculator computes sin(0.5) in milliseconds — not by drawing a triangle, but by summing a few terms of the Taylor series. GPS receivers compute trig functions this way thousands of times per second. Taylor series are how computers approximate every transcendental function (sin, cos, eˣ, ln). Beyond computation, Taylor series reveal deep structure: they show that eⁱˣ = cos(x) + i·sin(x), leading to Euler's formula eⁱᵖ + 1 = 0 — considered the most beautiful equation in mathematics.",
      coreIdea:
        "If f is infinitely differentiable at x=a, its Taylor series is:\n\nf(x) = Σₙ₌₀^∞ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ\n    = f(a) + f'(a)(x−a) + f''(a)/2!(x−a)² + f'''(a)/3!(x−a)³ + ...\n\nWhen a=0: MACLAURIN SERIES.\n\nKey Maclaurin series to memorize:\n• eˣ = 1 + x + x²/2! + x³/3! + ... (converges for all x)\n• sin x = x − x³/3! + x⁵/5! − ... (converges for all x)\n• cos x = 1 − x²/2! + x⁴/4! − ... (converges for all x)\n• 1/(1−x) = 1 + x + x² + x³ + ... (converges for |x|<1)",
      formula: "f(x) = Σₙ₌₀^∞ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ",
      formulaLabel: 'Taylor series at x=a:',
      insights: [
        "The nth degree Taylor polynomial Tₙ(x) is the best polynomial approximation to f near x=a, in the sense that it matches f and all its derivatives up to order n at the point a. The error is bounded by the (n+1)th term.",
        "Euler's formula eⁱˣ = cos(x) + i sin(x) follows directly from the Taylor series of eˣ, sin(x), and cos(x) — plug in ix and separate real and imaginary parts. Setting x=π gives eⁱᵖ + 1 = 0.",
        "Taylor series can be differentiated and integrated term by term (within the radius of convergence). This gives easy antiderivatives for functions like eˣ²/x or sin(x)/x, which have no closed-form antiderivative otherwise.",
      ],
    },
    guided: {
      problemStatement: "Find the first four nonzero terms of the Maclaurin series for eˣ and use it to approximate e⁰·¹.",
      steps: [
        {
          label: 'Compute derivatives at x=0',
          math: 'f(x)=eˣ, f(0)=1; f\'=eˣ, f\'(0)=1; and so on — all derivatives equal 1 at 0',
          explanation: 'Every derivative of eˣ is eˣ. At x=0, every derivative equals e⁰ = 1.',
        },
        {
          label: 'Write the Maclaurin series',
          math: 'eˣ = 1 + x + x²/2! + x³/3! + x⁴/4! + ...',
          explanation: 'Plug f⁽ⁿ⁾(0) = 1 into the formula: Σ xⁿ/n!. First four terms: 1 + x + x²/2 + x³/6.',
        },
        {
          label: 'Substitute x = 0.1',
          math: 'e⁰·¹ ≈ 1 + 0.1 + 0.01/2 + 0.001/6 = 1 + 0.1 + 0.005 + 0.000167',
          explanation: 'Plug x = 0.1 into the polynomial approximation.',
        },
        {
          label: 'Sum the approximation',
          math: 'e⁰·¹ ≈ 1.10517 (actual: 1.10517...)',
          explanation: 'Sum: 1.105167. The true value is 1.10517... — just four terms give six-digit accuracy!',
          connectionNote: 'The error after the nth term is bounded by the next term. Here |error| < 0.1⁴/4! = 0.0000042 — the approximation is extremely accurate.',
        },
      ],
      reflectionPrompt: 'Why does the Taylor series for eˣ converge for all x, while the geometric series 1/(1−x) only converges for |x|<1? What determines the radius of convergence?',
    },
    practice: [
      {
        question: 'Using the Maclaurin series for sin(x), what is the approximation sin(x) ≈ x valid for?',
        mathNotation: 'sin(x) ≈ x',
        answer: 'Small values of x (near 0)',
        choices: ['All values of x', 'x > 0 only', 'Small values of x (near 0)', 'x between −π and π'],
        answerIndex: 2,
        explanation: 'sin(x) = x − x³/6 + ... For small x, x³/6 is negligible so sin(x) ≈ x. This "small angle approximation" is used throughout physics.',
      },
      {
        question: "What is the coefficient of x³ in the Maclaurin series for cos(x)?",
        mathNotation: 'cos(x) = 1 − x²/2! + x⁴/4! − ...',
        answer: '0',
        choices: ['−1/6', '1/6', '−1/3!', '0'],
        answerIndex: 3,
        explanation: 'cos(x) only has even powers: 1 − x²/2! + x⁴/4! − ... There is no x³ term, so its coefficient is 0.',
      },
      {
        question: 'Use the series for 1/(1−x) to find the series for 1/(1−x²).',
        mathNotation: '1/(1−x²) = ?',
        answer: '1 + x² + x⁴ + x⁶ + ...',
        choices: ['1 + x + x² + x³ + ...', '1 + x² + x⁴ + x⁶ + ...', '1 − x² + x⁴ − x⁶ + ...', '1 + 2x² + 3x⁴ + ...'],
        answerIndex: 1,
        explanation: 'Substitute x → x² in the series 1/(1−x) = Σxⁿ. Get 1/(1−x²) = Σ(x²)ⁿ = Σx²ⁿ = 1 + x² + x⁴ + ..., valid for |x|<1.',
      },
    ],
    connections: [
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Proofs',
        bridgeFormula: '|f(x) − Tₙ(x)| ≤ M|x−a|ⁿ⁺¹/(n+1)!',
        explanation: "The Taylor remainder theorem bounds the error between f and its Taylor polynomial using ε-style estimates. Proving a Taylor series EQUALS the function requires showing the remainder → 0.",
      },
      {
        conceptId: 't8-mathematical-induction',
        tierId: 8,
        title: 'Mathematical Induction',
        bridgeFormula: 'd^n/dx^n [eˣ] = eˣ for all n',
        explanation: 'Proving that all derivatives of eˣ are eˣ — needed to derive its Taylor series — is a natural induction argument: the base case is trivially true, and the inductive step just differentiates once.',
      },
    ],
  },

  {
    id: 't8-epsilon-delta',
    tierId: 8,
    glyph: 'ε-δ',
    title: 'Epsilon-delta proofs',
    subtitle: 'Making limits rigorous with formal quantifiers',
    tags: ['calculus', 'proof'],
    accessibilityLevel: 'advanced',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Epsilon-Delta',
    conceptTab: {
      summary: 'The epsilon-delta definition of a limit replaces the vague phrase "gets close to" with a precise mathematical challenge: for any desired closeness ε, find a δ that achieves it.',
      whyItMatters:
        "For 150 years, calculus worked brilliantly but rested on shaky foundations. Bishop Berkeley famously mocked derivatives as 'ghosts of departed quantities.' In 1821, Cauchy, and later Weierstrass, provided the rigorous ε-δ definition that resolved all the paradoxes. This definition is the gateway to real analysis — the rigorous, proof-based version of calculus. It separates intuitive calculus from mathematically airtight calculus, and is the starting point of all higher analysis.",
      coreIdea:
        "FORMAL DEFINITION:\nlim[x→a] f(x) = L means:\n∀ε > 0, ∃δ > 0 such that: 0 < |x − a| < δ ⟹ |f(x) − L| < ε\n\nIn English: For EVERY challenge ε (how close you want f(x) to L), there EXISTS a response δ (how close x must be to a) that works.\n\nThe quantifier order matters: ∀ε, ∃δ. First someone names ε, THEN you find δ that works for that ε.\n\nExample: Prove lim[x→3] 2x = 6.\nGiven ε > 0, we need |2x − 6| < ε. Since |2x−6| = 2|x−3|, we need |x−3| < ε/2. Choose δ = ε/2. Then: if |x−3| < δ = ε/2, then |2x−6| = 2|x−3| < 2·(ε/2) = ε. ✓",
      formula: '∀ε>0, ∃δ>0: 0<|x−a|<δ ⟹ |f(x)−L|<ε',
      formulaLabel: 'Limit definition (formal):',
      insights: [
        "The definition is a GAME: the adversary picks ε (how precise they want). You must find δ (how close x must be) so that f(x) is within ε of L. The limit exists if you can ALWAYS win this game, no matter how small ε is.",
        "The condition 0 < |x − a| < δ enforces that x ≠ a. The limit says nothing about f(a) — only about behavior near a. This distinction (which seemed pedantic) is precisely what makes removable discontinuities make sense.",
        "Proving limits with ε-δ requires ALGEBRA to find δ in terms of ε. The proof template is: assume |x−a|<δ, bound |f(x)−L|, choose δ = (something in terms of ε), verify the implication holds.",
      ],
    },
    guided: {
      problemStatement: 'Use ε-δ to prove lim[x→2] (3x − 1) = 5.',
      steps: [
        {
          label: 'Identify what we need to bound',
          math: '|f(x) − L| = |(3x−1) − 5| = |3x − 6| = 3|x − 2|',
          explanation: 'Simplify |f(x) − L|. We want this to be less than ε. We have control over |x − 2| < δ.',
        },
        {
          label: 'Find the relationship',
          math: '3|x − 2| < ε ⟺ |x − 2| < ε/3',
          explanation: 'We need 3|x−2| < ε. Divide both sides by 3: |x−2| < ε/3. So choosing δ = ε/3 should work.',
        },
        {
          label: 'Write the proof',
          math: 'Given ε>0, choose δ = ε/3.',
          explanation: 'State the δ explicitly. It depends on ε — different challenges get different responses.',
        },
        {
          label: 'Verify the implication',
          math: 'If |x−2|<δ=ε/3, then |f(x)−5|=3|x−2|<3·(ε/3)=ε. ✓',
          explanation: 'Assume |x−2|<δ and chain the inequalities. The conclusion |f(x)−5|<ε follows.',
          connectionNote: 'This is a PROOF — every step is logically justified. No handwaving. This is what "rigorous mathematics" means.',
        },
      ],
      reflectionPrompt: 'Why must δ depend on ε? Could you choose a single fixed δ that works for all ε simultaneously? What would go wrong with, say, δ = 1 for all ε?',
    },
    practice: [
      {
        question: 'In the ε-δ game, who picks ε and who picks δ?',
        mathNotation: '∀ε>0, ∃δ>0: ...',
        answer: 'The adversary picks ε; you (the prover) pick δ',
        choices: [
          'You pick both ε and δ',
          'The adversary picks ε; you (the prover) pick δ',
          'You pick ε; the adversary picks δ',
          'Both are determined by the function',
        ],
        answerIndex: 1,
        explanation: '∀ε means "for all ε" — anyone can pick any ε. ∃δ means "there exists a δ" that you provide. The limit holds if your response works for every possible challenge ε.',
      },
      {
        question: "For proving lim[x→5] (2x+1) = 11, what choice of δ works?",
        mathNotation: '|(2x+1)−11| = 2|x−5|',
        answer: 'δ = ε/2',
        choices: ['δ = ε', 'δ = ε/2', 'δ = 2ε', 'δ = ε²'],
        answerIndex: 1,
        explanation: '|f(x)−11| = |2x−10| = 2|x−5|. We need 2|x−5| < ε, i.e., |x−5| < ε/2. Choose δ = ε/2.',
      },
      {
        question: 'A function f satisfies: for EVERY ε>0, there is NO δ>0 making the ε-δ condition hold. What does this mean?',
        mathNotation: '¬(lim[x→a] f(x) = L)',
        answer: 'The limit does not equal L at that point',
        choices: [
          'f is undefined at a',
          'The limit does not equal L at that point',
          'f is continuous at a',
          "f'(a) does not exist",
        ],
        answerIndex: 1,
        explanation: "The ε-δ condition failing for even one ε means lim[x→a] f(x) ≠ L. It could mean the limit doesn't exist, or equals a different value.",
      },
    ],
    connections: [
      {
        conceptId: 't8-mathematical-induction',
        tierId: 8,
        title: 'Mathematical Induction',
        bridgeFormula: '∀n∈ℕ, P(n) is true',
        explanation: 'Both ε-δ and mathematical induction are proof techniques that use formal quantifiers (∀, ∃). Mastering ε-δ builds the quantifier fluency needed for all rigorous mathematics.',
      },
      {
        conceptId: 't7-limits-intuition',
        tierId: 7,
        title: 'Limits — Intuition',
        bridgeFormula: 'Intuitive limit → formal ε-δ definition',
        explanation: 'Tier 7 limits use intuition and algebra. Tier 8 makes this rigorous. The ε-δ definition captures exactly the same idea — "f(x) gets close to L as x gets close to a" — but in a form that can be proved.',
      },
    ],
  },

  {
    id: 't8-mathematical-induction',
    tierId: 8,
    glyph: '⊢n',
    title: 'Mathematical induction',
    subtitle: 'Proving statements true for all natural numbers',
    tags: ['proof'],
    accessibilityLevel: 'advanced',
    visualizationType: 'generic',
    canvasLabel: 'Induction Steps',
    conceptTab: {
      summary: 'Mathematical induction is a proof technique that establishes a statement is true for all natural numbers by proving a base case and an inductive step.',
      whyItMatters:
        "How do you prove something is true for ALL infinitely many natural numbers? You can't check every case. Induction is the answer: prove it for n=1 (base case), then prove that truth for n implies truth for n+1 (inductive step). Like a row of dominoes — knock over the first and prove each knocks over the next — and all of them fall. Induction is used to prove formulas for sums, divisibility results, properties of sequences, and correctness of algorithms.",
      coreIdea:
        "STRUCTURE OF AN INDUCTION PROOF:\n\n1. STATE: What you're proving. 'P(n) holds for all n ≥ 1.'\n\n2. BASE CASE: Verify P(1) directly.\n\n3. INDUCTIVE HYPOTHESIS (IH): Assume P(k) is true for some arbitrary k ≥ 1.\n\n4. INDUCTIVE STEP: Using the IH, PROVE P(k+1).\n\n5. CONCLUDE: By induction, P(n) holds for all n ≥ 1.\n\nExample: Prove 1+2+3+...+n = n(n+1)/2.\nBase: n=1: 1 = 1·2/2 = 1. ✓\nIH: Assume 1+2+...+k = k(k+1)/2.\nStep: 1+2+...+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2. ✓\n[Factor: (k+1)[k/2 + 1] = (k+1)(k+2)/2]",
      formula: '[P(1) ∧ ∀k(P(k)⟹P(k+1))] ⟹ ∀n P(n)',
      formulaLabel: 'Induction principle:',
      insights: [
        "The inductive step does NOT assume P(k) is true for some specific known k. It assumes P(k) for an ARBITRARY k and derives P(k+1). The word 'arbitrary' is crucial — only then does the argument work for all n.",
        "Strong induction assumes P(1), P(2), ..., P(k) are ALL true (not just P(k)) and derives P(k+1). It's equivalent in power to regular induction but more convenient for sequences where each term depends on several previous ones.",
        "Induction proves the FORMULA is correct, but doesn't explain WHERE the formula came from. You might guess the formula by computing small cases, then prove it by induction. Discovery and proof are separate processes.",
      ],
    },
    guided: {
      problemStatement: 'Prove by induction: 1² + 2² + 3² + ... + n² = n(n+1)(2n+1)/6.',
      steps: [
        {
          label: 'Base case: n = 1',
          math: 'LHS = 1² = 1; RHS = 1·2·3/6 = 1. ✓',
          explanation: 'Verify the formula for n=1. Left side: just 1². Right side: plug n=1 into the formula. Both equal 1.',
        },
        {
          label: 'State the inductive hypothesis',
          math: 'Assume 1²+2²+...+k² = k(k+1)(2k+1)/6 for some k ≥ 1.',
          explanation: 'This is the IH. We assume the formula holds for k and will prove it for k+1.',
        },
        {
          label: 'Prove for k+1',
          math: '1²+...+k²+(k+1)² = k(k+1)(2k+1)/6 + (k+1)²',
          explanation: 'Add (k+1)² to both sides of the IH equation.',
        },
        {
          label: 'Simplify the right side',
          math: '= (k+1)[k(2k+1)/6 + (k+1)] = (k+1)(2k²+7k+6)/6 = (k+1)(k+2)(2k+3)/6',
          explanation: 'Factor out (k+1), combine fractions, factor the quadratic. The result matches the formula with n = k+1.',
          connectionNote: 'The formula with k+1 is (k+1)(k+2)(2(k+1)+1)/6 = (k+1)(k+2)(2k+3)/6. ✓ Induction complete.',
        },
      ],
      reflectionPrompt: 'Could you prove this sum formula by any other method? (Hint: try pairing terms, or use a visual/geometric argument.) What does induction add that those approaches lack?',
    },
    practice: [
      {
        question: 'In an induction proof, what is the "inductive hypothesis"?',
        mathNotation: 'IH: P(k) is true',
        answer: 'The assumption that P(k) is true for some arbitrary k, used to prove P(k+1)',
        choices: [
          'The base case P(1)',
          'The conclusion P(n) for all n',
          'The assumption that P(k) is true for some arbitrary k, used to prove P(k+1)',
          'A guess about what the formula might be',
        ],
        answerIndex: 2,
        explanation: 'The IH is the assumption made in the inductive step. You temporarily assume P(k) and then use that assumption to deduce P(k+1).',
      },
      {
        question: 'Prove that 2ⁿ > n for all n ≥ 1. What is the inductive step?',
        mathNotation: '2^(k+1) vs k+1',
        answer: '2^(k+1) = 2·2^k > 2k ≥ k+1 (for k≥1)',
        choices: [
          '2^(k+1) = 2^k + 1 > k + 1',
          '2^(k+1) = 2·2^k > 2k ≥ k+1 (for k≥1)',
          '2^(k+1) = (2^k)² > k²',
          '2^(k+1) > k+1 because 2 > 1',
        ],
        answerIndex: 1,
        explanation: 'Assuming 2^k > k (IH), we have 2^(k+1) = 2·2^k > 2k. And 2k = k+k ≥ k+1 for k≥1. So 2^(k+1) > k+1. ✓',
      },
      {
        question: 'Why must you prove BOTH the base case AND the inductive step?',
        mathNotation: 'Base case ∧ Inductive step → ∀n P(n)',
        answer: 'Both are required: the base case starts the chain, the inductive step extends it',
        choices: [
          'Only the inductive step matters for large n',
          'Only the base case is needed for simple formulas',
          'Both are required: the base case starts the chain, the inductive step extends it',
          'You only need one if the other is obvious',
        ],
        answerIndex: 2,
        explanation: 'Without the base case, the chain has no starting point. Without the inductive step, truth for k never implies truth for k+1. Both are logically necessary.',
      },
    ],
    connections: [
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Proofs',
        bridgeFormula: '∀n≥1: P(n) vs ∀ε>0: ∃δ>0',
        explanation: 'Both induction and ε-δ proofs require fluency with universal quantifiers (∀) and existential quantifiers (∃). They are the two foundational proof styles of rigorous undergraduate mathematics.',
      },
      {
        conceptId: 't8-sequences-series',
        tierId: 8,
        title: 'Sequences and Series',
        bridgeFormula: 'Σₖ₌₁ⁿ k = n(n+1)/2',
        explanation: "The formulas for sums of sequences (1+2+...+n, 1²+2²+...+n²) are proved by induction. Series formulas and induction go hand in hand: you use induction to prove the closed-form expressions for partial sums.",
      },
    ],
  },

  {
    id: 't8-trig-substitution',
    tierId: 8,
    glyph: 'trig∫',
    title: 'Trigonometric substitution',
    subtitle: 'Using trig identities to eliminate square roots from integrands',
    tags: ['calculus', 'trig'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Trig Substitution Triangle',
    conceptTab: {
      summary: 'Trigonometric substitution replaces algebraic expressions involving square roots of quadratics with trigonometric expressions, exploiting Pythagorean identities to eliminate the root.',
      whyItMatters:
        "Integrals involving √(a²−x²), √(a²+x²), and √(x²−a²) appear constantly in physics and engineering: computing arc lengths, areas of ellipses, gravitational fields, and electric potential all produce such integrals. Trig substitution is the systematic technique for handling this entire family. It is also the gateway to understanding why the area of a circle is πr² — the calculation requires integrating √(r²−x²), which demands trig substitution.",
      coreIdea:
        "THREE CASES — each uses a different substitution:\n\nCASE 1: √(a²−x²) → let x = a·sin(θ), then √(a²−x²) = a·cos(θ)\n  (Uses: 1−sin²θ = cos²θ)\n\nCASE 2: √(a²+x²) → let x = a·tan(θ), then √(a²+x²) = a·sec(θ)\n  (Uses: 1+tan²θ = sec²θ)\n\nCASE 3: √(x²−a²) → let x = a·sec(θ), then √(x²−a²) = a·tan(θ)\n  (Uses: sec²θ−1 = tan²θ)\n\nAFTER INTEGRATING: Convert back to x using a reference triangle.\n  If x = a·sin(θ), then θ = arcsin(x/a), and the triangle has opposite side x, hypotenuse a, adjacent √(a²−x²).\n\nEXAMPLE: ∫√(1−x²) dx\n  Let x = sin(θ), dx = cos(θ)dθ\n  √(1−x²) = cos(θ)\n  Integral becomes: ∫cos²(θ)dθ = (1/2)∫(1+cos(2θ))dθ\n  = θ/2 + sin(2θ)/4 + C\n  Back-substitute: θ = arcsin(x), sin(2θ) = 2sin(θ)cos(θ) = 2x√(1−x²)\n  Final: arcsin(x)/2 + x√(1−x²)/2 + C",
      formula: 'x = a·sin(θ) ⟹ √(a²−x²) = a·cos(θ)',
      formulaLabel: 'Trig substitution (Case 1):',
      insights: [
        "The choice of substitution is determined by the expression under the radical, not the whole integrand. See √(a²−x²) → sine substitution. See √(a²+x²) → tangent substitution. See √(x²−a²) → secant substitution. Memorize these three cases by the Pythagorean identity each one uses.",
        "The back-substitution step is where many errors happen. Draw a right triangle labeled with the substitution: for x = a·tan(θ), the opposite side is x, the adjacent side is a, and the hypotenuse is √(a²+x²). Read off any trig function of θ directly from this triangle.",
        "Trig substitution works even when there is no visible square root, if completing the square reveals the hidden quadratic. For ∫1/(x²+2x+5)dx, complete the square: x²+2x+5 = (x+1)²+4. Now let u = x+1, and use a tangent substitution with a=2.",
      ],
    },
    guided: {
      problemStatement: 'Compute ∫ x² / √(9−x²) dx.',
      steps: [
        {
          label: 'Identify the case and substitute',
          math: 'x = 3sin(θ), dx = 3cos(θ)dθ, √(9−x²) = 3cos(θ)',
          explanation: '√(9−x²) matches Case 1 with a = 3. Substitute x = 3sin(θ). Then dx = 3cos(θ)dθ and √(9−9sin²θ) = 3√(cos²θ) = 3cos(θ) (assuming cos θ > 0).',
        },
        {
          label: 'Rewrite the integral',
          math: '∫ (9sin²θ)/(3cosθ) · 3cosθ dθ = ∫9sin²(θ)dθ',
          explanation: 'Substitute: x² = 9sin²θ. The denominator 3cosθ and dx = 3cosθ dθ cancel, leaving ∫9sin²(θ)dθ — a standard trig integral.',
        },
        {
          label: 'Integrate using the half-angle identity',
          math: '9∫sin²θ dθ = 9∫(1−cos2θ)/2 dθ = (9/2)(θ − sin(2θ)/2) + C',
          explanation: 'Use sin²θ = (1−cos2θ)/2. Integrate: (9/2)θ − (9/4)sin(2θ) + C.',
        },
        {
          label: 'Back-substitute to x',
          math: 'θ = arcsin(x/3); sin(2θ) = 2sinθcosθ = 2(x/3)(√(9−x²)/3)',
          explanation: 'From the triangle: sinθ = x/3 so θ = arcsin(x/3), and cosθ = √(9−x²)/3. Thus sin(2θ) = 2(x/3)(√(9−x²)/3) = 2x√(9−x²)/9.',
          connectionNote: 'Final answer: (9/2)arcsin(x/3) − (x√(9−x²))/2 + C. This is the area-of-ellipse formula in disguise.',
        },
      ],
      reflectionPrompt: "Why does differentiating (9/2)arcsin(x/3) − x√(9−x²)/2 recover the original integrand x²/√(9−x²)? Try it with the chain rule and see the algebra work out.",
    },
    practice: [
      {
        question: 'For ∫ 1/√(4−x²) dx, which substitution is appropriate?',
        mathNotation: '∫ 1/√(4−x²) dx',
        answer: 'x = 2sin(θ)',
        choices: ['x = 2tan(θ)', 'x = 2sin(θ)', 'x = 2sec(θ)', 'x = 2cos(θ)'],
        answerIndex: 1,
        explanation: '√(4−x²) = √(a²−x²) with a=2 — this is Case 1. Use x = 2sin(θ). Result: ∫1/(2cosθ)·2cosθ dθ = ∫dθ = θ + C = arcsin(x/2) + C.',
      },
      {
        question: 'For ∫ 1/(x²+25) dx, which substitution reduces the integral?',
        mathNotation: '∫ 1/(x²+25) dx',
        answer: 'x = 5tan(θ)',
        choices: ['x = 5sin(θ)', 'x = 5tan(θ)', 'x = 5sec(θ)', 'No substitution needed'],
        answerIndex: 1,
        explanation: 'x²+25 = x²+5² matches Case 2 with a=5. Use x = 5tan(θ). Then x²+25 = 25sec²θ and dx = 5sec²θ dθ. The integral becomes ∫(1/25sec²θ)·5sec²θ dθ = (1/5)∫dθ = θ/5 + C = (1/5)arctan(x/5) + C.',
      },
      {
        question: 'After trig substitution integrates to an expression in θ, how do you convert back to x?',
        mathNotation: 'θ → x back-substitution',
        answer: 'Draw a reference triangle from the original substitution and read off trig values',
        choices: [
          'Replace θ with the original substitution equation',
          'Draw a reference triangle from the original substitution and read off trig values',
          'Differentiate the trig answer with respect to θ',
          'There is no need to convert back',
        ],
        answerIndex: 1,
        explanation: 'Drawing a reference triangle (with sides labeled from the substitution) allows you to express sin(θ), cos(θ), tan(θ) in terms of x. For x = a·tan(θ): opposite = x, adjacent = a, hypotenuse = √(x²+a²). Read any needed trig value directly.',
      },
    ],
    connections: [
      {
        conceptId: 't7-u-substitution',
        tierId: 7,
        title: 'U-Substitution',
        bridgeFormula: 'u = g(x), du = g\'(x)dx',
        explanation: "Trig substitution is a special substitution where u = trig function. The same principle applies: introduce a new variable to simplify the integrand, compute the new differential, and back-substitute at the end.",
      },
      {
        conceptId: 't8-integration-by-parts',
        tierId: 8,
        title: 'Integration by Parts',
        bridgeFormula: '∫u dv = uv − ∫v du',
        explanation: 'After trig substitution, you often face integrals like ∫sin²θ dθ or ∫sec³θ dθ. These require the half-angle identity or integration by parts (for ∫sec³θ). The techniques layer on each other.',
      },
      {
        conceptId: 't7-continuity',
        tierId: 7,
        title: 'Continuity and types of discontinuity',
        bridgeFormula: '√(a²−x²) defined on [−a, a]',
        explanation: "The expressions under the radical restrict the domain. For √(a²−x²), the integrand is only defined on [−a,a], and continuity on this closed interval guarantees the integral exists. Domain awareness is essential for setting up trig substitutions correctly.",
      },
    ],
  },

  {
    id: 't8-improper-integrals',
    tierId: 8,
    glyph: '∫∞',
    title: 'Improper integrals',
    subtitle: 'Integrating over infinite intervals or past vertical asymptotes',
    tags: ['calculus'],
    accessibilityLevel: 'college',
    visualizationType: 'riemann-sum',
    canvasLabel: 'Improper Integral Area',
    conceptTab: {
      summary: 'An improper integral extends the definite integral to cases where the interval is infinite or the integrand has a vertical asymptote. Convergence is determined by taking a limit.',
      whyItMatters:
        "Improper integrals are everywhere in advanced mathematics and physics. The Gaussian integral ∫[−∞,∞] e^(−x²) dx = √π underlies all of probability and statistics. The Gamma function, Laplace transforms, and Fourier transforms are all defined as improper integrals. In probability, computing the expected value of a continuous random variable often requires integrating over (−∞,∞). The question of whether an improper integral converges or diverges is as important as computing its value.",
      coreIdea:
        "TYPE 1 — Infinite interval:\n∫[a,∞] f(x) dx = lim[t→∞] ∫[a,t] f(x) dx\n\nIf the limit exists (is finite), the integral CONVERGES. Otherwise it DIVERGES.\n\nEXAMPLE: ∫[1,∞] 1/x² dx = lim[t→∞] [−1/x]₁ᵗ = lim[t→∞](−1/t + 1) = 1 ✓ Converges!\n\nBut: ∫[1,∞] 1/x dx = lim[t→∞] [ln x]₁ᵗ = lim[t→∞] ln t = ∞ ✗ Diverges!\n\nTYPE 2 — Vertical asymptote:\n∫[a,b] f(x) dx where f → ±∞ at c ∈ [a,b]:\n∫[a,c] f(x)dx = lim[t→c⁻] ∫[a,t] f(x)dx\n\nKEY RESULT — p-integrals:\n∫[1,∞] 1/xᵖ dx: converges if p > 1, diverges if p ≤ 1\n∫[0,1] 1/xᵖ dx: converges if p < 1, diverges if p ≥ 1\n\nThese are the benchmark cases used in the comparison test for series.",
      formula: '∫[a,∞] f(x) dx = lim[t→∞] ∫[a,t] f(x) dx',
      formulaLabel: 'Improper integral (Type 1):',
      insights: [
        "The p-integral dichotomy (converges iff p > 1 for ∫[1,∞] 1/xᵖ dx) is perhaps the single most useful benchmark in calculus. It directly parallels the p-series test for Σ1/nᵖ in series. The same cutoff (p = 1) appears in both cases — this is not a coincidence.",
        "When the interval is (−∞,∞), split at a convenient point: ∫[−∞,∞] = ∫[−∞,0] + ∫[0,∞]. BOTH integrals must converge independently. If one diverges, the whole integral diverges — you cannot 'cancel' +∞ with −∞ (that would be the Cauchy principal value, a different concept).",
        "The comparison test for improper integrals: if 0 ≤ f(x) ≤ g(x) and ∫g converges, then ∫f converges. If ∫f diverges, then ∫g diverges. This mirrors the comparison test for series and allows you to determine convergence without computing the integral explicitly.",
      ],
    },
    guided: {
      problemStatement: 'Determine whether ∫[0,1] 1/√x dx converges, and find its value if it does.',
      steps: [
        {
          label: 'Identify the problem',
          math: 'f(x) = 1/√x → ∞ as x → 0⁺',
          explanation: 'At x = 0, f(x) = x^(−1/2) → +∞. This is a Type 2 improper integral with a vertical asymptote at the left endpoint.',
        },
        {
          label: 'Set up the limit',
          math: '∫[0,1] x^(−1/2) dx = lim[t→0⁺] ∫[t,1] x^(−1/2) dx',
          explanation: 'Replace the problematic lower limit 0 with t > 0, then take t → 0⁺.',
        },
        {
          label: 'Evaluate the definite integral',
          math: '∫[t,1] x^(−1/2) dx = [2√x]ₜ¹ = 2√1 − 2√t = 2 − 2√t',
          explanation: 'Anti-derivative of x^(−1/2) is 2x^(1/2). Apply bounds: 2(1) − 2√t = 2 − 2√t.',
        },
        {
          label: 'Take the limit',
          math: 'lim[t→0⁺] (2 − 2√t) = 2 − 0 = 2',
          explanation: 'As t → 0⁺, √t → 0, so the expression approaches 2. The integral converges to 2.',
          connectionNote: "This is a p-integral with p = 1/2 < 1, so ∫[0,1] 1/xᵖ converges. The boundary p = 1 separates convergence from divergence at 0 — here p = 1/2 is safely below 1.",
        },
      ],
      reflectionPrompt: "Why does ∫[0,1] 1/x dx diverge (ln x → −∞ at 0) but ∫[0,1] 1/√x dx converge? What geometric property makes one finite and the other infinite despite both having an asymptote at x = 0?",
    },
    practice: [
      {
        question: 'Does ∫[1,∞] 1/x³ dx converge? If so, what is its value?',
        mathNotation: '∫[1,∞] x^(−3) dx',
        answer: 'Converges to 1/2',
        choices: ['Diverges', 'Converges to 1', 'Converges to 1/2', 'Converges to 1/3'],
        answerIndex: 2,
        explanation: 'Anti-derivative: −1/(2x²). Evaluate from 1 to t: −1/(2t²) + 1/2. As t→∞, −1/(2t²) → 0. Limit = 1/2. Alternatively, p = 3 > 1, so convergence is guaranteed by the p-test.',
      },
      {
        question: 'Does ∫[1,∞] 1/√x dx converge?',
        mathNotation: '∫[1,∞] x^(−1/2) dx',
        answer: 'No, it diverges',
        choices: ['Yes, it converges to 2', 'Yes, it converges to 1', 'No, it diverges', 'Yes, it converges to √π'],
        answerIndex: 2,
        explanation: 'Anti-derivative: 2√x. Evaluate: [2√x]₁ᵗ = 2√t − 2 → ∞ as t → ∞. Diverges. Also, p = 1/2 < 1 for ∫[1,∞] 1/xᵖ, confirming divergence.',
      },
      {
        question: 'For ∫[−∞,∞] e^(−|x|) dx, what is the value?',
        mathNotation: '∫[−∞,∞] e^(−|x|) dx',
        answer: '2',
        choices: ['1', '2', 'e', '∞'],
        answerIndex: 1,
        explanation: 'Split: ∫[−∞,0] eˣ dx + ∫[0,∞] e^(−x) dx. First: [eˣ]₋∞⁰ = 1−0 = 1. Second: [−e^(−x)]₀^∞ = 0−(−1) = 1. Total = 2.',
      },
    ],
    connections: [
      {
        conceptId: 't7-riemann-sums-integrals',
        tierId: 7,
        title: 'Riemann Sums and Integrals',
        bridgeFormula: '∫[a,b] f(x) dx requires f bounded on [a,b]',
        explanation: "The standard Riemann integral requires a bounded function on a bounded interval. Improper integrals extend this by taking limits — they are the natural completion of the Riemann theory when these conditions fail.",
      },
      {
        conceptId: 't8-convergence-tests',
        tierId: 8,
        title: 'Convergence Tests',
        bridgeFormula: '∫[1,∞] f(x) dx converges ⟺ Σf(n) converges (Integral Test)',
        explanation: "The integral test for series directly connects improper integrals and series convergence. If ∫[1,∞] f(x) dx converges, the series Σf(n) converges, and vice versa. The p-test for both comes from this connection.",
      },
      {
        conceptId: 't8-taylor-series',
        tierId: 8,
        title: 'Taylor Series',
        bridgeFormula: 'Γ(n+1) = ∫[0,∞] xⁿe^(−x) dx = n!',
        explanation: "The Gamma function — defined as an improper integral — extends the factorial to non-integers. Taylor series for many functions involve factorial denominators, so the Gamma function provides the deeper context.",
      },
    ],
  },

  {
    id: 't8-proof-by-contradiction',
    tierId: 8,
    glyph: '⊥',
    title: 'Proof by contradiction',
    subtitle: 'Assuming the opposite to prove the truth',
    tags: ['proof'],
    accessibilityLevel: 'college',
    visualizationType: 'generic',
    canvasLabel: 'Logical Contradiction',
    conceptTab: {
      summary: "Proof by contradiction (reductio ad absurdum) assumes the negation of what you want to prove, then derives a logical contradiction — showing the assumption must be false and therefore the original statement true.",
      whyItMatters:
        "Many of mathematics' most important results were first proved by contradiction. Euclid's proof that infinitely many primes exist is a contradiction proof over 2000 years old. The irrationality of √2 — the discovery that shook the Pythagoreans — is proved by contradiction. Cantor's diagonal argument, proving that real numbers are uncountably infinite, is a contradiction proof. The technique is essential when direct construction is impossible or non-obvious: you establish existence by showing non-existence is impossible.",
      coreIdea:
        "STRUCTURE OF THE PROOF:\n1. State the goal: prove P.\n2. Assume ¬P (the negation of P).\n3. Use valid logical steps and known theorems to derive a statement that is clearly false — either a contradiction with a known fact, or a self-contradictory statement (like Q and ¬Q).\n4. Conclude: since ¬P leads to a contradiction, ¬P is false. Therefore P is true.\n\nCLASSIC EXAMPLE: Prove √2 is irrational.\nAssume √2 = p/q where p, q are integers with no common factors (fully reduced).\nThen 2 = p²/q², so p² = 2q².\nThus p² is even, which means p is even (since odd² is odd).\nWrite p = 2k. Then p² = 4k², so 2q² = 4k², meaning q² = 2k².\nThus q² is even, so q is even.\nBut then p and q are BOTH even — contradicting our assumption that p/q is fully reduced. ⊥\nTherefore √2 is irrational.\n\nLOGICAL FORM: Proof by contradiction establishes P via the tautology (¬P → ⊥) → P, which is a theorem of classical logic.",
      formula: 'Assume ¬P ⟹ derive ⊥ ⟹ conclude P',
      formulaLabel: 'Contradiction structure:',
      insights: [
        "The hardest part of a contradiction proof is knowing where the contradiction will come from before you find it. In the √2 proof, the contradiction is 'p and q are both even' despite being assumed coprime. Often you must write out consequences of ¬P patiently until the contradiction appears naturally.",
        "Proof by contradiction is CONSTRUCTIVELY controversial. In classical logic, ¬¬P implies P, making contradiction proofs valid. In constructive (intuitionistic) mathematics, this does not hold. A contradiction proof shows that the assumption is impossible but may not exhibit a concrete example. Some mathematicians require direct constructions; they accept the √2 proof but not every use of contradiction.",
        "Proof by contradiction and proof by contrapositive are related but different. Contrapositive proves P → Q by proving ¬Q → ¬P (logically equivalent). Contradiction proves P by deriving ⊥ from ¬P. Contrapositive is cleaner when the structure is an implication; contradiction is used when P has no obvious implication form.",
      ],
    },
    guided: {
      problemStatement: "Prove: if n² is even, then n is even.",
      steps: [
        {
          label: 'State the goal and negate it',
          math: 'Assume: n is ODD (i.e., n = 2k+1 for some integer k)',
          explanation: "We want to prove 'n² even ⟹ n even.' Equivalently, prove its contrapositive: 'n odd ⟹ n² odd.' Assume n is odd.",
        },
        {
          label: 'Compute n²',
          math: 'n² = (2k+1)² = 4k² + 4k + 1 = 2(2k²+2k) + 1',
          explanation: 'Expand: (2k+1)² = 4k²+4k+1. Factor out 2: 2(2k²+2k) + 1.',
        },
        {
          label: 'Identify the contradiction',
          math: 'n² = 2m + 1 where m = 2k²+2k → n² is ODD',
          explanation: "n² has the form 2m+1, so n² is odd. But we assumed n² is EVEN — a contradiction. (We used the contrapositive form, which proves the original implication.)",
        },
        {
          label: 'Conclude',
          math: 'n odd ⟹ n² odd, i.e., n² even ⟹ n even. ∎',
          explanation: 'Since assuming n odd forces n² odd, the contrapositive is established. Therefore n² even implies n even.',
          connectionNote: "This lemma is the engine of the √2 irrationality proof: 'p² even implies p even' is used to show both p and q must be even.",
        },
      ],
      reflectionPrompt: "Why does the √2 proof assume the fraction is fully reduced (p and q coprime)? What would go wrong if you didn't make that assumption?",
    },
    practice: [
      {
        question: "In the classic proof that √2 is irrational, what contradiction is reached?",
        mathNotation: '√2 = p/q in lowest terms ⟹ ?',
        answer: 'Both p and q turn out to be even, contradicting that p/q is in lowest terms',
        choices: [
          'p² = 2q² has no integer solutions',
          'Both p and q turn out to be even, contradicting that p/q is in lowest terms',
          'p and q cannot both be integers',
          '2 is shown to equal a rational number other than √2',
        ],
        answerIndex: 1,
        explanation: 'Assuming p²=2q² shows p is even (p=2k), then q²=2k² shows q is even. Both even contradicts gcd(p,q)=1. This ⊥ proves √2 ∉ ℚ.',
      },
      {
        question: "Prove there are infinitely many primes. What is the contradiction in Euclid's proof?",
        mathNotation: 'Assume finitely many primes: p₁, p₂, ..., pₙ',
        answer: 'N = p₁p₂···pₙ + 1 is divisible by none of the listed primes, contradicting the list being complete',
        choices: [
          'N = p₁p₂···pₙ + 1 is prime itself, which is a contradiction',
          'N = p₁p₂···pₙ + 1 is divisible by none of the listed primes, contradicting the list being complete',
          'The product p₁p₂···pₙ is shown to be irrational',
          'p₁p₂···pₙ + 1 = 0, which is impossible',
        ],
        answerIndex: 1,
        explanation: "N = p₁···pₙ+1 leaves remainder 1 when divided by any pᵢ, so none of the listed primes divide N. But every integer > 1 has a prime factor — so N's prime factor is not on the list. Contradiction.",
      },
      {
        question: "Which statement correctly describes the relationship between proof by contradiction and proof by contrapositive?",
        mathNotation: 'P→Q vs ¬Q→¬P vs ¬P→⊥',
        answer: 'Contrapositive proves P→Q via ¬Q→¬P; contradiction proves P by showing ¬P leads to ⊥',
        choices: [
          'They are the same method with different names',
          'Contrapositive is a special case of contradiction',
          'Contrapositive proves P→Q via ¬Q→¬P; contradiction proves P by showing ¬P leads to ⊥',
          'Contradiction is only valid in classical logic; contrapositive is always valid',
        ],
        answerIndex: 2,
        explanation: 'These are distinct techniques. Contrapositive (¬Q→¬P) is logically equivalent to (P→Q) and proves implications. Contradiction derives a false statement from ¬P to prove P. Contrapositive is constructively valid; pure contradiction (proving P from ¬P→⊥) is only classically valid.',
      },
    ],
    connections: [
      {
        conceptId: 't8-mathematical-induction',
        tierId: 8,
        title: 'Mathematical Induction',
        bridgeFormula: 'Base case + inductive step ⟹ ∀n P(n)',
        explanation: "Both induction and contradiction are fundamental proof techniques for establishing universal statements. Induction proves P(n) for all n constructively; contradiction proves existence or impossibility non-constructively. Together they cover most proof needs in undergraduate mathematics.",
      },
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Definition',
        bridgeFormula: '∀ε>0 ∃δ>0: |x−a|<δ ⟹ |f(x)−L|<ε',
        explanation: "Many epsilon-delta proofs use contradiction: assume the limit is NOT L, then show this leads to a contradiction with the epsilon-delta conditions. The method appears throughout rigorous analysis.",
      },
      {
        conceptId: 't8-convergence-tests',
        tierId: 8,
        title: 'Convergence Tests',
        bridgeFormula: 'Assume convergence ⟹ derive contradiction',
        explanation: "Divergence proofs often use contradiction: assume a series converges, derive that the necessary term condition (aₙ→0) must hold, then show it does not. The divergence of the harmonic series is a classic contradiction argument.",
      },
    ],
  },

  {
    id: 't8-partial-fractions',
    tierId: 8,
    glyph: 'A/B',
    title: 'Partial fraction decomposition',
    subtitle: 'Breaking rational functions into simpler pieces for integration',
    tags: ['calculus', 'algebra'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Rational Function',
    conceptTab: {
      summary: 'Partial fraction decomposition rewrites a rational function (polynomial over polynomial) as a sum of simpler fractions, each of which can be integrated using basic rules.',
      whyItMatters:
        "Rational functions appear throughout engineering and physics: transfer functions in control systems, response functions in circuit analysis, and probability density functions all involve ratios of polynomials. Partial fractions is the systematic algebraic technique that makes these integrals tractable. It is also the foundation for computing inverse Laplace transforms, which are the standard tool for solving linear differential equations in engineering.",
      coreIdea:
        "SETUP: For ∫ P(x)/Q(x) dx, if deg(P) ≥ deg(Q), perform polynomial long division first to get quotient + remainder/Q(x).\n\nFACTOR THE DENOMINATOR Q(x) into linear and irreducible quadratic factors, then decompose:\n\nLINEAR FACTORS: Each (x−a)ⁿ contributes:\nA₁/(x−a) + A₂/(x−a)² + ... + Aₙ/(x−a)ⁿ\n\nIRREDUCIBLE QUADRATICS: Each (x²+bx+c)ⁿ contributes:\n(B₁x+C₁)/(x²+bx+c) + (B₂x+C₂)/(x²+bx+c)² + ...\n\nEXAMPLE: ∫ 1/[(x−1)(x+2)] dx\n  Decompose: 1/[(x−1)(x+2)] = A/(x−1) + B/(x+2)\n  Multiply through: 1 = A(x+2) + B(x−1)\n  Set x=1: 1 = 3A → A = 1/3\n  Set x=−2: 1 = −3B → B = −1/3\n  Integrate: (1/3)ln|x−1| − (1/3)ln|x+2| + C = (1/3)ln|(x−1)/(x+2)| + C",
      formula: 'P(x)/[(x−a)(x−b)] = A/(x−a) + B/(x−b)',
      formulaLabel: 'Partial fractions (distinct roots):',
      insights: [
        "The 'cover-up' method for distinct linear factors: to find A in A/(x−a), cover the factor (x−a) in the original denominator and evaluate the rest at x = a. For 1/[(x−1)(x+2)], cover (x−1) and evaluate 1/(x+2) at x=1: 1/3 = A. This is faster than multiplying out.",
        "When the denominator has an irreducible quadratic factor x²+bx+c (discriminant < 0), the numerator must be Bx+C, not just B. After integrating, you get arctan-type integrals. Complete the square on the denominator to put it in standard form for arctan integration.",
        "The method always works for proper rational functions: every rational P/Q with deg(P) < deg(Q) can be decomposed into partial fractions. This is a theorem from algebra (the partial fraction theorem), guaranteed by the fundamental theorem of algebra.",
      ],
    },
    guided: {
      problemStatement: 'Compute ∫ (2x+1) / [(x²+x)(x+2)] dx.',
      steps: [
        {
          label: 'Factor the denominator completely',
          math: 'x²+x = x(x+1), so denominator = x(x+1)(x+2)',
          explanation: 'Factor x²+x = x(x+1). The denominator is x(x+1)(x+2) — three distinct linear factors.',
        },
        {
          label: 'Set up the decomposition',
          math: '(2x+1)/[x(x+1)(x+2)] = A/x + B/(x+1) + C/(x+2)',
          explanation: 'Three distinct linear factors give three terms, each with a constant numerator.',
        },
        {
          label: 'Find A, B, C by cover-up or substitution',
          math: 'x=0: 1/(1·2) = A → A = 1/2\nx=−1: (−1)/(−1·1) = B → B = 1\nx=−2: (−3)/(−2·−1) = C → C = −3/2',
          explanation: 'Cover-up: For A, cover x and evaluate at x=0: (2·0+1)/[(0+1)(0+2)] = 1/2. For B, cover (x+1) at x=−1: (−2+1)/[(−1)(1)] = 1. For C, cover (x+2) at x=−2: (−4+1)/[(−2)(−1)] = −3/2.',
        },
        {
          label: 'Integrate each partial fraction',
          math: '(1/2)ln|x| + ln|x+1| − (3/2)ln|x+2| + C',
          explanation: '∫A/x dx = A·ln|x|, etc. Each term integrates to a logarithm. Combine: (1/2)ln|x| + ln|x+1| − (3/2)ln|x+2| + C.',
          connectionNote: 'You can verify by differentiating the answer: combine the logarithm derivatives over a common denominator to recover (2x+1)/[x(x+1)(x+2)].',
        },
      ],
      reflectionPrompt: "What changes if the denominator has a repeated factor like (x−1)²? Why does a repeated factor require TWO partial fraction terms: A/(x−1) and B/(x−1)²?",
    },
    practice: [
      {
        question: 'Decompose 5/(x²−x−6) = 5/[(x−3)(x+2)] into partial fractions.',
        mathNotation: '5/[(x−3)(x+2)] = A/(x−3) + B/(x+2)',
        answer: 'A = 1, B = −1',
        choices: ['A = 1, B = −1', 'A = 5, B = −5', 'A = 1/5, B = −1/5', 'A = −1, B = 1'],
        answerIndex: 0,
        explanation: 'Cover-up: A = 5/(3+2) = 1. B = 5/(−2−3) = −1. Check: 1/(x−3) − 1/(x+2) = [(x+2)−(x−3)]/[(x−3)(x+2)] = 5/[(x−3)(x+2)]. ✓',
      },
      {
        question: 'For ∫ 1/(x²+1) dx, is partial fractions needed?',
        mathNotation: '∫ 1/(x²+1) dx',
        answer: 'No — x²+1 is irreducible over ℝ; integrate directly as arctan(x) + C',
        choices: [
          'Yes — decompose into 1/(x+i) and 1/(x−i)',
          'Yes — use A/x + B/x²',
          'No — x²+1 is irreducible over ℝ; integrate directly as arctan(x) + C',
          'No — the integral does not exist',
        ],
        answerIndex: 2,
        explanation: 'x²+1 has no real roots (discriminant = −4 < 0) so it is irreducible over ℝ. It cannot be decomposed into real linear factors. The integral is directly ∫1/(x²+1)dx = arctan(x)+C.',
      },
      {
        question: 'What should you do FIRST if the integrand is (x³+1)/(x²−1)?',
        mathNotation: '(x³+1)/(x²−1)',
        answer: 'Perform polynomial long division since the degree of the numerator equals or exceeds the denominator',
        choices: [
          'Factor the numerator immediately',
          'Perform polynomial long division since the degree of the numerator equals or exceeds the denominator',
          'Decompose (x²−1) into partial fractions first',
          'Apply L\'Hôpital\'s rule',
        ],
        answerIndex: 1,
        explanation: 'deg(numerator) = 3 ≥ deg(denominator) = 2. Partial fractions requires a proper fraction (deg numerator < deg denominator). Divide first: x³+1 = (x)(x²−1) + (x+1), so the integrand = x + (x+1)/(x²−1). Now decompose (x+1)/[(x−1)(x+1)] = 1/(x−1).',
      },
    ],
    connections: [
      {
        conceptId: 't7-u-substitution',
        tierId: 7,
        title: 'U-Substitution',
        bridgeFormula: '∫ 1/(x−a) dx = ln|x−a| + C',
        explanation: 'Each partial fraction of the form A/(x−a) integrates to A·ln|x−a| via the substitution u = x−a. U-substitution is the final step after the algebraic decomposition is complete.',
      },
      {
        conceptId: 't8-integration-by-parts',
        tierId: 8,
        title: 'Integration by Parts',
        bridgeFormula: '∫ (Bx+C)/(x²+bx+c) dx — may require IBP or trig sub',
        explanation: 'When partial fractions produce terms with irreducible quadratic denominators like (Bx+C)/(x²+bx+c), integration may require completing the square followed by a trig substitution or a direct arctan form.',
      },
      {
        conceptId: 't7-lhopital',
        tierId: 7,
        title: "L'Hôpital's rule",
        bridgeFormula: "lim[x→a] P(x)/Q(x) — rational function limit",
        explanation: "Both partial fractions and L'Hôpital's rule deal with rational functions but in different contexts. Partial fractions integrates them; L'Hôpital evaluates their limits at problematic points. Together they give complete analytical control over rational functions.",
      },
    ],
  },

  {
    id: 't8-power-series',
    tierId: 8,
    glyph: 'Σcₙxⁿ',
    title: 'Power series and radius of convergence',
    subtitle: 'Infinite polynomials and the interval where they converge',
    tags: ['calculus', 'precalc'],
    accessibilityLevel: 'college',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Power Series Convergence',
    conceptTab: {
      summary: 'A power series is an infinite polynomial Σcₙ(x−a)ⁿ. It converges on an interval around its center a. The radius of convergence R, found by the ratio or root test, determines this interval.',
      whyItMatters:
        "Power series are how calculators compute sin(x), eˣ, and ln(x). They allow functions to be represented as infinite polynomials, enabling differentiation and integration term by term. In differential equations, power series solutions can represent functions that have no closed form. In physics and engineering, perturbation theory — the technique of computing approximate solutions by stopping after a few terms — depends entirely on power series. The radius of convergence tells you when your series representation is reliable.",
      coreIdea:
        "DEFINITION: A power series centered at a is:\nΣ[n=0,∞] cₙ(x−a)ⁿ = c₀ + c₁(x−a) + c₂(x−a)² + ...\n\nCONVERGENCE: For each power series, exactly one of three cases holds:\n• Converges ONLY at x = a (R = 0)\n• Converges for ALL x (R = ∞) — e.g., eˣ, sin(x), cos(x)\n• Converges on an interval (a−R, a+R) for some R > 0\n\nRADIUS OF CONVERGENCE by Ratio Test:\nR = lim[n→∞] |cₙ/cₙ₊₁|\n(Equivalently: 1/R = lim[n→∞] |cₙ₊₁/cₙ|)\n\nEXAMPLE: Geometric series Σxⁿ = 1/(1−x) for |x| < 1. Here R = 1.\n\nENDPOINT BEHAVIOR: The ratio test is inconclusive at x = a ± R. Check endpoints separately using other tests (often alternating series test or p-series comparison).\n\nKEY OPERATIONS — term-by-term operations valid inside (a−R, a+R):\n• Differentiate: d/dx[Σcₙxⁿ] = Σn·cₙxⁿ⁻¹\n• Integrate: ∫Σcₙxⁿ dx = Σcₙxⁿ⁺¹/(n+1)\nBoth operations preserve the radius of convergence.",
      formula: 'R = lim[n→∞] |cₙ/cₙ₊₁|',
      formulaLabel: 'Radius of convergence:',
      insights: [
        "The interval of convergence is NOT automatically [a−R, a+R]. The ratio test only guarantees the OPEN interval (a−R, a+R). You must test the endpoints x = a±R separately — each may converge (conditionally or absolutely) or diverge independently.",
        "Term-by-term differentiation and integration are the most powerful properties of power series. They let you find the power series of derivatives and anti-derivatives from a known series. For example, differentiating the geometric series 1/(1−x) = Σxⁿ gives 1/(1−x)² = Σn·xⁿ⁻¹ — a new series for free.",
        "Every Taylor series IS a power series centered at a, with specific coefficients cₙ = f⁽ⁿ⁾(a)/n!. Conversely, if a power series represents a function f on its interval of convergence, then those coefficients must be the Taylor coefficients. Power series and Taylor series are two views of the same object.",
      ],
    },
    guided: {
      problemStatement: 'Find the radius and interval of convergence for Σ[n=1,∞] xⁿ/n.',
      steps: [
        {
          label: 'Apply the ratio test',
          math: '|aₙ₊₁/aₙ| = |xⁿ⁺¹/(n+1)| / |xⁿ/n| = |x| · n/(n+1)',
          explanation: 'Let aₙ = xⁿ/n. Compute the ratio of consecutive terms: |xⁿ⁺¹/(n+1)| ÷ |xⁿ/n| = |x|·n/(n+1).',
        },
        {
          label: 'Take the limit',
          math: 'lim[n→∞] |x| · n/(n+1) = |x| · 1 = |x|',
          explanation: 'As n → ∞, n/(n+1) → 1. The limit of the ratio is |x|.',
        },
        {
          label: 'Determine convergence from the ratio test',
          math: 'Converges when |x| < 1, diverges when |x| > 1; R = 1',
          explanation: 'Ratio test: series converges absolutely when limit < 1, i.e., |x| < 1. Diverges when |x| > 1. The radius of convergence is R = 1.',
        },
        {
          label: 'Test the endpoints x = ±1',
          math: 'x=1: Σ1/n (harmonic, diverges). x=−1: Σ(−1)ⁿ/n (alternating, converges).',
          explanation: 'At x=1: Σxⁿ/n = Σ1/n — the harmonic series, which diverges. At x=−1: Σ(−1)ⁿ/n — the alternating harmonic series, which converges by the alternating series test.',
          connectionNote: "Interval of convergence: [−1, 1). This series represents −ln(1−x) on (−1,1), and at x=−1 gives the conditionally convergent series for ln(2): Σ(−1)ⁿ/n = −ln(1/2) = ln 2.",
        },
      ],
      reflectionPrompt: "Why can the series converge at one endpoint but not the other? What property of x = −1 makes its series converge when x = 1's series diverges?",
    },
    practice: [
      {
        question: 'Find the radius of convergence for Σ[n=0,∞] xⁿ/n! (the series for eˣ).',
        mathNotation: 'Σ xⁿ/n!',
        answer: 'R = ∞ (converges for all x)',
        choices: ['R = 0', 'R = 1', 'R = e', 'R = ∞ (converges for all x)'],
        answerIndex: 3,
        explanation: 'Ratio: |x|/(n+1) → 0 for every fixed x. Since the limit is 0 < 1 for all x, the series converges everywhere. R = ∞.',
      },
      {
        question: 'Find the radius of convergence for Σ[n=0,∞] n!·xⁿ.',
        mathNotation: 'Σ n! · xⁿ',
        answer: 'R = 0 (converges only at x = 0)',
        choices: ['R = 0 (converges only at x = 0)', 'R = 1', 'R = ∞', 'R = 1/e'],
        answerIndex: 0,
        explanation: 'Ratio: |(n+1)!·xⁿ⁺¹| / |n!·xⁿ| = (n+1)|x| → ∞ for any x ≠ 0. Limit > 1 for all x ≠ 0, so the series diverges everywhere except x = 0. R = 0.',
      },
      {
        question: 'If Σcₙxⁿ has radius of convergence R = 3, what is the radius of convergence of Σn·cₙxⁿ⁻¹ (the term-by-term derivative)?',
        mathNotation: 'd/dx[Σcₙxⁿ] = Σn·cₙxⁿ⁻¹',
        answer: 'R = 3 (same radius)',
        choices: ['R = 2', 'R = 3 (same radius)', 'R = 4', 'R = 9'],
        answerIndex: 1,
        explanation: 'Term-by-term differentiation preserves the radius of convergence. The differentiated series has the same radius R = 3. (Endpoint behavior may differ, but the radius does not change.)',
      },
    ],
    connections: [
      {
        conceptId: 't8-taylor-series',
        tierId: 8,
        title: 'Taylor Series',
        bridgeFormula: "f(x) = Σ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ",
        explanation: "A Taylor series is a power series with specific coefficients cₙ = f⁽ⁿ⁾(a)/n!. The radius of convergence of the Taylor series determines where the Taylor expansion accurately represents f(x). Every Taylor series is a power series; the converse holds within the interval of convergence.",
      },
      {
        conceptId: 't8-convergence-tests',
        tierId: 8,
        title: 'Convergence Tests',
        bridgeFormula: 'lim|aₙ₊₁/aₙ| < 1 ⟹ converges absolutely',
        explanation: "The ratio test for series is the same tool used to find the radius of convergence. Power series bring the ratio test into the context of a parameterized family of series (parameterized by x), revealing how convergence transitions from absolute to conditional to divergence as |x| crosses R.",
      },
      {
        conceptId: 't8-sequences-series',
        tierId: 8,
        title: 'Sequences and Series',
        bridgeFormula: 'Σcₙ(x−a)ⁿ — a series of functions',
        explanation: "A power series is a series where each term cₙ(x−a)ⁿ is a function of x rather than a fixed number. The convergence theory of sequences and series (partial sums, absolute convergence, conditionally convergence) applies at each fixed x, making power series the natural extension of series into functional analysis.",
      },
    ],
  },
];
