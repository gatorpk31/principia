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
];
