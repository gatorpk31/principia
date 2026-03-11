import type { Concept } from '../types';

export const TIER3_CONCEPTS: Concept[] = [
  {
    id: 't3-linear-equations-slope',
    tierId: 3,
    glyph: '/',
    title: 'Linear equations and slope',
    subtitle: 'Steepness as a rate — the heartbeat of algebra',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Slope on Coordinate Plane',
    conceptTab: {
      summary: 'Slope measures how steeply a line rises or falls. It is the ratio of vertical change to horizontal change between any two points on a line.',
      whyItMatters:
        "Every time someone says 'this is growing at 5% per year' or 'the road climbs 200 feet per mile,' they are describing slope. Engineers use it to design roads and ramps. Economists describe rates of change with it. Physicists define velocity using it. Slope is the first great idea of applied mathematics — and it never stops appearing.",
      coreIdea:
        "Slope answers the question: for every 1 step to the right, how many steps do you go up (or down)?\n\nFormula: m = (y₂ − y₁) / (x₂ − x₁)\n\nThis is called 'rise over run.' Rise is the vertical change (Δy); run is the horizontal change (Δx).\n\nFrom the points (1, 2) and (4, 8):\nm = (8 − 2) / (4 − 1) = 6 / 3 = 2\n\nThis means: every step right, go up 2. The line has slope 2.\n\nSlope interpretations:\n• Positive slope → line rises left to right\n• Negative slope → line falls left to right\n• Zero slope → horizontal line (no rise)\n• Undefined slope → vertical line (run is zero; can't divide by zero)\n\nSlope is constant along an entire line. Any two points on the same line give the same slope. That constancy is exactly what makes a line a line.",
      formula: 'm = (y₂ − y₁) / (x₂ − x₁)',
      formulaLabel: 'Slope (rise over run):',
      insights: [
        "Slope is a rate of change. If x is time and y is distance, slope is speed. If x is hours worked and y is dollars earned, slope is your hourly wage. Every real-world rate is a slope in disguise.",
        'A slope of 0 means completely flat — no change in y no matter how much x changes. An undefined slope (vertical line) means infinite change in y for zero change in x, which cannot be assigned a finite number.',
        'The slope formula m = Δy/Δx is the same idea as the derivative in calculus. When Δx shrinks toward zero, this ratio becomes the instantaneous rate of change. Every time you compute slope, you are previewing calculus.',
      ],
    },
    guided: {
      problemStatement: 'Find the slope of the line through (−2, 1) and (4, 7). Then describe what it means.',
      steps: [
        {
          label: 'Label the points',
          math: '(x₁, y₁) = (−2, 1),  (x₂, y₂) = (4, 7)',
          explanation: 'Choose one point as (x₁, y₁) and the other as (x₂, y₂). Either labeling gives the same slope.',
        },
        {
          label: 'Compute the rise (Δy)',
          math: 'Δy = y₂ − y₁ = 7 − 1 = 6',
          explanation: 'The vertical change from y = 1 to y = 7 is 6 units upward.',
        },
        {
          label: 'Compute the run (Δx)',
          math: 'Δx = x₂ − x₁ = 4 − (−2) = 6',
          explanation: 'The horizontal change from x = −2 to x = 4 is 6 units to the right. Be careful: 4 − (−2) = 4 + 2 = 6.',
        },
        {
          label: 'Divide rise by run',
          math: 'm = 6 / 6 = 1',
          explanation: 'Slope = rise / run = 6 / 6 = 1. For every 1 step to the right, the line goes exactly 1 step up — a perfectly diagonal line.',
          connectionNote: 'A slope of 1 produces a 45° angle. The line rises at the same rate it runs — the balance point between shallow and steep.',
        },
      ],
      reflectionPrompt: 'What would a slope of −3 mean on a graph where x is time (hours) and y is the water level in a draining tank? Describe the physical situation in plain language.',
    },
    practice: [
      {
        question: 'What is the slope of the line through (0, 3) and (2, 7)?',
        mathNotation: 'm = (7 − 3) / (2 − 0) = ?',
        answer: '2',
        choices: ['1', '2', '4', '3'],
        answerIndex: 1,
        explanation: 'Rise = 7 − 3 = 4. Run = 2 − 0 = 2. Slope = 4 / 2 = 2. For every step right, the line rises 2 units.',
      },
      {
        question: 'A line passes through (1, 5) and (4, −1). What is its slope?',
        mathNotation: 'm = (−1 − 5) / (4 − 1) = ?',
        answer: '−2',
        choices: ['2', '−2', '−3', '3'],
        answerIndex: 1,
        explanation: 'Rise = −1 − 5 = −6. Run = 4 − 1 = 3. Slope = −6 / 3 = −2. The negative slope means the line falls going left to right.',
      },
      {
        question: 'A line has slope 0. Which of the following describes it?',
        mathNotation: 'm = 0',
        answer: 'It is a horizontal line',
        choices: ['It is a vertical line', 'It is a horizontal line', 'It rises steeply', 'It has no equation'],
        answerIndex: 1,
        explanation: 'Slope = rise / run = 0 means zero vertical change — the line is perfectly horizontal. A vertical line has undefined slope, not slope 0.',
      },
    ],
    connections: [
      {
        conceptId: 't3-slope-intercept',
        tierId: 3,
        title: 'Slope-Intercept Form',
        bridgeFormula: 'y = mx + b',
        explanation: 'Slope is m in y = mx + b. Once you can calculate slope, you need only one more piece — the y-intercept b — to write the complete equation of any non-vertical line.',
      },
      {
        conceptId: 't4-coordinate-geometry',
        tierId: 4,
        title: 'Coordinate Geometry — Distance and Midpoint',
        bridgeFormula: 'd = √((x₂−x₁)² + (y₂−y₁)²)',
        explanation: 'The same Δx and Δy differences that define slope also appear in the distance formula. Slope measures direction and rate; distance measures magnitude. Together they fully characterize the relationship between two points.',
      },
      {
        conceptId: 't7-definition-of-derivative',
        tierId: 7,
        title: 'Definition of the Derivative',
        bridgeFormula: "f'(x) = lim[Δx→0] Δy/Δx",
        explanation: 'The derivative is slope taken to its logical extreme. Instead of slope between two points, the derivative asks for the slope at a single instant. The ratio Δy/Δx you compute for lines becomes the foundation of differential calculus.',
      },
    ],
  },

  {
    id: 't3-slope-intercept',
    tierId: 3,
    glyph: 'y',
    title: 'Slope-intercept form — why y = mx + b',
    subtitle: 'Starting value plus rate — the complete blueprint of a line',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'y = mx + b Graph',
    conceptTab: {
      summary: 'Every non-vertical line can be written as y = mx + b, where m is the slope (rate of change) and b is the y-intercept (starting value).',
      whyItMatters:
        "When a taxi charges $3 per mile plus a $2 base fare, their pricing is y = 3x + 2. When a scientist tracks temperature rising 1.5° per hour starting at 20°, that is y = 1.5x + 20. Slope-intercept form captures the two pieces of every linear situation: starting value and constant rate. It is the most widely used algebraic form in science, business, and engineering.",
      coreIdea:
        "y = mx + b has two parameters:\n\n• m (slope): the rate of change — how much y changes per unit increase in x. Steepness and direction.\n• b (y-intercept): the value of y when x = 0. The starting value, the baseline, the flat fee before any usage.\n\nTo graph from y = mx + b:\n1. Plot the point (0, b) — your starting point on the y-axis.\n2. Use slope m as a stepping direction: from (0, b), move right 1 and up m to reach a second point.\n3. Draw a line through the two points.\n\nTo find the equation from a graph:\n1. Read the y-intercept where the line crosses the y-axis → that is b.\n2. Pick two clear grid points, compute rise/run → that is m.\n3. Write y = mx + b.\n\nSpecial cases:\n• b = 0: line passes through origin (y = mx) — a proportional relationship.\n• m = 0: horizontal line (y = b) — constant output.\n• Equal m, different b: parallel lines — same slope, different position.",
      formula: 'y = mx + b',
      formulaLabel: 'Slope-intercept form:',
      insights: [
        'The y-intercept b answers the question: what is y when nothing has happened yet (x = 0)? In a cost problem it is the flat fee. In a physics problem it is the initial position. It anchors the line to the coordinate plane.',
        'Two lines with equal slopes are parallel — they never meet. Changing b shifts a line up or down without rotating it. This is why the slope alone determines the family of parallel lines.',
        'Any linear equation in standard form (ax + by = c) can be rewritten in slope-intercept form by solving for y. Doing so reveals the slope and y-intercept immediately, turning an opaque equation into a visual-ready formula.',
      ],
    },
    guided: {
      problemStatement: 'A cell phone plan charges $0.10 per text plus a $5 monthly fee. Write the equation, identify m and b, and find the cost for 80 texts.',
      steps: [
        {
          label: 'Identify the slope and y-intercept',
          math: 'm = 0.10,  b = 5',
          explanation: 'The $0.10 per-text rate is the slope: cost changes by $0.10 for every additional text. The $5 flat fee is the y-intercept: the cost when zero texts are sent.',
        },
        {
          label: 'Write the equation',
          math: 'y = 0.10x + 5',
          explanation: 'y = total cost in dollars, x = number of texts. Equation: y = 0.10x + 5.',
        },
        {
          label: 'Evaluate at x = 80',
          math: 'y = 0.10(80) + 5 = 8 + 5 = 13',
          explanation: 'Multiply first (PEMDAS): 0.10 × 80 = 8. Then add: 8 + 5 = 13. The cost for 80 texts is $13.',
          connectionNote: 'The order of operations in y = mx + b is always multiply first, then add — the same PEMDAS rule you learned in Tier 1.',
        },
      ],
      reflectionPrompt: 'If two plans have the same slope but different y-intercepts, when (if ever) would they cost the same amount? Graph both lines mentally and describe how they are related.',
    },
    practice: [
      {
        question: 'What is the slope and y-intercept of y = −3x + 7?',
        mathNotation: 'y = −3x + 7',
        answer: 'm = −3, b = 7',
        choices: ['m = 7, b = −3', 'm = 3, b = 7', 'm = −3, b = 7', 'm = −3, b = −7'],
        answerIndex: 2,
        explanation: 'In y = mx + b, the coefficient of x is m and the constant is b. So m = −3 (line falls left to right) and b = 7 (crosses y-axis at 7).',
      },
      {
        question: 'Which equation represents a line with slope 2 passing through (0, −4)?',
        mathNotation: 'y = mx + b, m = 2, b = ?',
        answer: 'y = 2x − 4',
        choices: ['y = 2x + 4', 'y = −4x + 2', 'y = 2x − 4', 'y = 4x − 2'],
        answerIndex: 2,
        explanation: 'The point (0, −4) means the y-intercept is b = −4. With m = 2, the equation is y = 2x − 4.',
      },
      {
        question: 'A line has equation y = (1/2)x + 3. What is y when x = 6?',
        mathNotation: 'y = (1/2)(6) + 3 = ?',
        answer: '6',
        choices: ['3', '4.5', '6', '9'],
        answerIndex: 2,
        explanation: 'y = (1/2)(6) + 3 = 3 + 3 = 6.',
      },
    ],
    connections: [
      {
        conceptId: 't3-graphing-lines',
        tierId: 3,
        title: 'Graphing Lines',
        bridgeFormula: 'plot (0, b), step by slope m',
        explanation: 'Slope-intercept form is the most direct graphing tool: plot b as the first point, use m as the step direction to the second. Every graphing technique for lines depends on reading m and b from the equation.',
      },
      {
        conceptId: 't3-systems-substitution',
        tierId: 3,
        title: 'Systems of Equations — Substitution',
        bridgeFormula: 'y = 2x + 1 and y = −x + 7',
        explanation: 'When both equations in a system are written in slope-intercept form (solved for y), substitution is immediate — set the two right-hand sides equal and solve for x.',
      },
      {
        conceptId: 't5-exponential-growth',
        tierId: 5,
        title: 'Exponential Growth and Decay',
        bridgeFormula: 'y = abˣ vs y = mx + b',
        explanation: 'Linear functions grow by a constant amount per step. Exponential functions grow by a constant factor. Recognizing which model fits real data — and comparing the two — is a central question in precalculus and data analysis.',
      },
    ],
  },

  {
    id: 't3-systems-substitution',
    tierId: 3,
    glyph: '∥',
    title: 'Systems of equations — substitution',
    subtitle: 'Finding where two lines cross by swapping variables',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Intersection of Two Lines',
    conceptTab: {
      summary: 'A system of equations asks what values of x and y satisfy both equations simultaneously. Substitution solves this by expressing one variable in terms of the other and plugging it in.',
      whyItMatters:
        "Two competing pricing plans. Two trains approaching each other. A mixture needing a specific concentration. Any scenario with two unknowns and two constraints is a system of equations. Solving it tells you the exact point — price, time, distance — where the two situations are equal. This reasoning structure underlies every optimization and equilibrium calculation in science and economics.",
      coreIdea:
        "The substitution method has three steps:\n\n1. Isolate one variable in one equation (solve for, say, y).\n2. Substitute that expression into the other equation. Now you have one equation with one unknown — solve it.\n3. Back-substitute to find the other variable. State the solution as an ordered pair (x, y).\n\nExample: { y = 2x + 1 and x + y = 7 }\n\nStep 1: y is already isolated: y = 2x + 1.\nStep 2: Substitute into x + y = 7:\n  x + (2x + 1) = 7\n  3x + 1 = 7\n  3x = 6\n  x = 2\nStep 3: y = 2(2) + 1 = 5. Solution: (2, 5).\nCheck: 2 + 5 = 7 ✓\n\nGeometric meaning: (2, 5) is the exact point where both lines intersect on the coordinate plane.",
      formula: 'y = f(x) → substitute into g(x, y) = c',
      formulaLabel: 'Substitution strategy:',
      insights: [
        'Substitution works best when one equation is already solved for a variable — or when one variable has coefficient 1, making isolation easy. If both equations have tangled coefficients, elimination is usually cleaner.',
        'Always check the solution in BOTH original equations. A true solution satisfies every equation in the system. Checking only one equation can miss errors.',
        'If substitution leads to 0 = 0, the equations describe the same line (infinitely many solutions). If it leads to a false statement like 0 = 5, the lines are parallel — they never meet (no solution).',
      ],
    },
    guided: {
      problemStatement: 'Alex has $20 and saves $15 per week. Jordan has $50 and saves $10 per week. After how many weeks do they have the same amount?',
      steps: [
        {
          label: 'Write both equations',
          math: 'Alex: y = 15x + 20,  Jordan: y = 10x + 50',
          explanation: 'x = weeks elapsed, y = total savings. Alex starts at $20 and adds $15/week. Jordan starts at $50 and adds $10/week.',
        },
        {
          label: 'Substitute — set expressions equal',
          math: '15x + 20 = 10x + 50',
          explanation: 'Both expressions equal y, so they equal each other. This is substitution: we replace y in one equation with the right-hand side of the other.',
        },
        {
          label: 'Solve for x',
          math: '5x = 30 → x = 6 weeks',
          explanation: 'Subtract 10x: 5x + 20 = 50. Subtract 20: 5x = 30. Divide: x = 6.',
        },
        {
          label: 'Find the common savings amount',
          math: 'y = 15(6) + 20 = 90 + 20 = 110',
          explanation: 'After 6 weeks, Alex has $110. Check Jordan: 10(6) + 50 = 60 + 50 = 110 ✓. They both have $110.',
          connectionNote: 'Graphically, (6, 110) is the intersection point of the two lines. That single point is simultaneously on both lines — just like the single savings amount satisfies both savings plans.',
        },
      ],
      reflectionPrompt: 'What if Alex saved $10 per week instead of $15 — the same rate as Jordan? How many intersection points would that system have, and what does that mean in the context of savings?',
    },
    practice: [
      {
        question: 'Solve the system: y = x + 3 and y = 2x − 1. What is x?',
        mathNotation: 'x + 3 = 2x − 1',
        answer: 'x = 4',
        choices: ['x = 2', 'x = 4', 'x = −4', 'x = 1'],
        answerIndex: 1,
        explanation: 'Set the expressions equal: x + 3 = 2x − 1. Subtract x from both sides: 3 = x − 1. Add 1: x = 4. Check: y = 4 + 3 = 7 and y = 2(4) − 1 = 7 ✓.',
      },
      {
        question: 'Solve: y = 3x and x + y = 8. What is the solution?',
        mathNotation: 'x + 3x = 8',
        answer: '(2, 6)',
        choices: ['(2, 6)', '(4, 4)', '(1, 3)', '(3, 5)'],
        answerIndex: 0,
        explanation: 'Substitute y = 3x into x + y = 8: x + 3x = 8 → 4x = 8 → x = 2. Then y = 3(2) = 6. Solution: (2, 6). Check: 2 + 6 = 8 ✓.',
      },
      {
        question: 'Which solution satisfies both y = −x + 5 and y = 2x − 1?',
        mathNotation: '−x + 5 = 2x − 1',
        answer: '(2, 3)',
        choices: ['(1, 4)', '(2, 3)', '(3, 2)', '(0, 5)'],
        answerIndex: 1,
        explanation: 'Set equal: −x + 5 = 2x − 1 → 6 = 3x → x = 2. Then y = −2 + 5 = 3. Solution: (2, 3). Verify: y = 2(2) − 1 = 3 ✓.',
      },
    ],
    connections: [
      {
        conceptId: 't3-systems-elimination',
        tierId: 3,
        title: 'Systems of Equations — Elimination',
        bridgeFormula: 'Add equations to cancel a variable',
        explanation: 'Elimination is the complementary method to substitution. Both find the same intersection point — the choice of method depends on which one requires fewer algebraic steps for the given system.',
      },
      {
        conceptId: 't3-graphing-lines',
        tierId: 3,
        title: 'Graphing Lines',
        bridgeFormula: 'intersection point = solution to system',
        explanation: 'The algebraic solution to a system corresponds exactly to the intersection of two lines on a graph. Graphing gives a visual check: if your algebra says (2, 5) but the lines visibly cross somewhere else, there is an error.',
      },
      {
        conceptId: 't5-matrix-basics',
        tierId: 5,
        title: 'Matrices and Linear Systems',
        bridgeFormula: 'Ax = b',
        explanation: 'Systems with many variables (not just two) are organized and solved using matrices. The substitution and elimination strategies you learn now are the building blocks of matrix row-reduction algorithms.',
      },
    ],
  },

  {
    id: 't3-systems-elimination',
    tierId: 3,
    glyph: '+',
    title: 'Systems of equations — elimination',
    subtitle: 'Cancel a variable by adding or subtracting equations',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Elimination — Two Lines',
    conceptTab: {
      summary: 'Elimination solves a system by strategically combining the two equations so one variable disappears, reducing the problem to a single-variable equation.',
      whyItMatters:
        "When two equations are in standard form and one variable's coefficients are set up to cancel, elimination is faster and cleaner than substitution. Chemists use it to balance mixture equations. Electrical engineers use it to solve circuit systems. It is also the direct precursor to Gaussian elimination — the algorithm computers use to solve systems of thousands of equations simultaneously.",
      coreIdea:
        "Elimination uses one key fact: you can add two true equations together and the result is also true.\n\nExample: { 2x + y = 9 and x − y = 3 }\n\nThe y-coefficients (+1 and −1) are opposites. Add both equations:\n(2x + y) + (x − y) = 9 + 3\n3x + 0 = 12\nx = 4\n\nBack-substitute: 2(4) + y = 9 → y = 1. Solution: (4, 1). Check: 4 − 1 = 3 ✓.\n\nWhen coefficients don't cancel directly, multiply one equation by a constant first:\n\n{ 3x + 2y = 16 and x − y = 1 }\n\nMultiply the second equation by 2: 2x − 2y = 2.\nAdd to first: (3x + 2y) + (2x − 2y) = 16 + 2\n5x = 18 → x = 18/5.\n\nThe key move: create equal and opposite coefficients for the variable you want to eliminate.",
      formula: 'Multiply to align coefficients, then add to eliminate',
      formulaLabel: 'Elimination strategy:',
      insights: [
        'Multiplying an equation by any non-zero constant does not change its solutions — it just rescales the equation. This is why multiplying before adding is always valid.',
        'If adding the equations makes both variables vanish giving 0 = 0, the lines are identical (infinite solutions). If you get a false statement like 0 = 7, the lines are parallel (no solution).',
        'Elimination is the foundation of matrix row reduction (Gaussian elimination). The same add-and-scale row operations you do by hand here are what computers execute — just on systems of thousands of equations.',
      ],
    },
    guided: {
      problemStatement: 'A shop sells apples ($1 each) and oranges ($2 each). Yesterday they sold 10 pieces of fruit for $14. How many of each?',
      steps: [
        {
          label: 'Write the system',
          math: 'a + o = 10  and  a + 2o = 14',
          explanation: 'Let a = apples sold, o = oranges sold. Total count: a + o = 10. Revenue: a + 2o = 14.',
        },
        {
          label: 'Subtract the first equation from the second',
          math: '(a + 2o) − (a + o) = 14 − 10  →  o = 4',
          explanation: 'When we subtract, the a terms cancel: a − a = 0. We are left with o = 4 oranges.',
        },
        {
          label: 'Back-substitute to find a',
          math: 'a + 4 = 10  →  a = 6',
          explanation: 'Plug o = 4 into the first equation: a = 10 − 4 = 6 apples.',
        },
        {
          label: 'Check both equations',
          math: '6 + 4 = 10 ✓  and  6 + 2(4) = 14 ✓',
          explanation: '6 apples + 4 oranges = 10 items. Revenue: $6 + $8 = $14. Both satisfied.',
          connectionNote: 'Graphically, (6, 4) is the intersection of the lines a + o = 10 and a + 2o = 14.',
        },
      ],
      reflectionPrompt: 'When would you prefer elimination over substitution? Design one system where elimination takes two lines of work and substitution would take five.',
    },
    practice: [
      {
        question: 'Solve by elimination: x + y = 6 and x − y = 2. What is x?',
        mathNotation: '(x + y) + (x − y) = 6 + 2',
        answer: 'x = 4',
        choices: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
        answerIndex: 2,
        explanation: 'Add the equations: 2x = 8 → x = 4. Then y = 6 − 4 = 2. Check: 4 − 2 = 2 ✓.',
      },
      {
        question: 'Solve: 3x + 2y = 16 and 3x − y = 7. What is y?',
        mathNotation: '(3x + 2y) − (3x − y) = 16 − 7',
        answer: 'y = 3',
        choices: ['y = 2', 'y = 3', 'y = 4', 'y = 9'],
        answerIndex: 1,
        explanation: 'Subtract the second equation from the first: 3y = 9 → y = 3. Then 3x − 3 = 7 → 3x = 10 → x = 10/3.',
      },
      {
        question: 'To eliminate x from { 2x + y = 5 and 4x − 3y = 1 }, what is the best first step?',
        mathNotation: '? × (2x + y = 5)',
        answer: 'Multiply the first equation by 2',
        choices: [
          'Multiply the second equation by −2',
          'Add the equations directly',
          'Multiply the first equation by 2',
          'Multiply the first equation by −3',
        ],
        answerIndex: 2,
        explanation: 'To cancel x, we need equal and opposite x-coefficients. Multiply 2x + y = 5 by 2 to get 4x + 2y = 10. Subtract from 4x − 3y = 1: the 4x terms cancel, leaving −5y = −9.',
      },
    ],
    connections: [
      {
        conceptId: 't3-systems-substitution',
        tierId: 3,
        title: 'Systems of Equations — Substitution',
        bridgeFormula: 'Isolate one variable, then substitute',
        explanation: 'Substitution and elimination solve the same problem with different approaches. Both yield the same intersection point. Fluency in both lets you choose the faster method depending on the system.',
      },
      {
        conceptId: 't4-coordinate-geometry',
        tierId: 4,
        title: 'Coordinate Geometry — Distance and Midpoint',
        bridgeFormula: 'Two lines meet at one point',
        explanation: 'The solution to a system is a specific point in the coordinate plane. Coordinate geometry gives precise tools to reason about, measure, and verify such intersection points.',
      },
      {
        conceptId: 't5-matrix-basics',
        tierId: 5,
        title: 'Matrices and Linear Systems',
        bridgeFormula: '[A|b] row operations',
        explanation: 'Gaussian elimination generalizes the row-operation strategy from two equations to any number. What you are doing by hand now is precisely what computers execute algorithmically on large systems.',
      },
    ],
  },

  {
    id: 't3-graphing-lines',
    tierId: 3,
    glyph: '—',
    title: 'Graphing lines',
    subtitle: 'Turning equations into pictures — the algebra-geometry bridge',
    tags: ['algebra', 'geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Graphing Lines',
    conceptTab: {
      summary: 'Graphing a linear equation means plotting every point (x, y) that satisfies it. The complete set of solutions is always a straight line.',
      whyItMatters:
        "Graphs make abstract equations concrete. Two lines crossing — that is a system solution. A steep slope — fast rate of change. A line through the origin — proportional relationship. In data science, physics, and economics, graphing lines is the first step to seeing structure, comparing rates, and communicating results visually. Every spreadsheet chart, stock price graph, and trend line is a graphed linear equation.",
      coreIdea:
        "Any linear equation can be graphed using one of three methods:\n\nMethod 1 — Slope-intercept form: Write as y = mx + b. Plot (0, b) first. From there, use the slope to reach a second point (right 1, up m). Draw the line.\n\nMethod 2 — Intercept method: Find the x-intercept (set y = 0, solve for x) and the y-intercept (set x = 0, solve for y). Plot both and connect.\n\nMethod 3 — Table of values: Choose 2–3 values of x, compute the corresponding y, plot the points.\n\nFor 2x + y = 6:\n• x-intercept: set y = 0 → 2x = 6 → x = 3 → point (3, 0)\n• y-intercept: set x = 0 → y = 6 → point (0, 6)\n• Draw line through (3, 0) and (0, 6).\n\nKey visual features to read from any graph:\n• Where does it cross each axis?\n• Does it slope upward or downward?\n• Is it steep (large |m|) or shallow (small |m|)?",
      formula: 'y = mx + b → plot (0, b), use slope m to step',
      formulaLabel: 'Graphing from slope-intercept:',
      insights: [
        'Every equation has infinitely many (x, y) solutions — a whole line of them. Graphing shows all of those solutions simultaneously as a geometric object. The line IS the solution set.',
        'Parallel lines have equal slopes and different y-intercepts. They never intersect, which means the corresponding system has no solution. You can see this structural fact instantly from a graph.',
        'Perpendicular lines have slopes that are negative reciprocals: if one slope is m, the other is −1/m. Their product is always −1. This geometric perpendicularity has a clean algebraic signature.',
      ],
    },
    guided: {
      problemStatement: 'Graph the line 3x − 2y = 6 using the intercept method. Then identify the slope.',
      steps: [
        {
          label: 'Find the x-intercept (set y = 0)',
          math: '3x − 2(0) = 6  →  x = 2  →  point (2, 0)',
          explanation: 'Set y = 0: 3x = 6, so x = 2. The line crosses the x-axis at (2, 0).',
        },
        {
          label: 'Find the y-intercept (set x = 0)',
          math: '3(0) − 2y = 6  →  −2y = 6  →  y = −3  →  point (0, −3)',
          explanation: 'Set x = 0: −2y = 6, so y = −3. The line crosses the y-axis at (0, −3).',
        },
        {
          label: 'Plot both intercepts and draw',
          math: 'Plot (2, 0) and (0, −3); draw the line through them',
          explanation: 'Two points uniquely determine a line. Mark both intercepts and draw a straight line through them with a ruler.',
        },
        {
          label: 'Identify the slope',
          math: 'm = (0 − (−3)) / (2 − 0) = 3/2',
          explanation: 'Rise = 0 − (−3) = 3. Run = 2 − 0 = 2. Slope = 3/2. Alternatively, solve for y: y = (3/2)x − 3, confirming m = 3/2.',
          connectionNote: 'Standard form ax + by = c always converts to slope-intercept by solving for y. Here −2y = −3x + 6 → y = (3/2)x − 3.',
        },
      ],
      reflectionPrompt: 'If you change 3x − 2y = 6 to 3x − 2y = 12, how does the graph change? Do the two lines intersect? What does that tell you about the system formed by those two equations?',
    },
    practice: [
      {
        question: 'What is the y-intercept of y = 4x − 5?',
        mathNotation: 'y = 4(0) − 5 = ?',
        answer: '(0, −5)',
        choices: ['(0, 4)', '(0, −5)', '(5, 0)', '(−5, 4)'],
        answerIndex: 1,
        explanation: 'Set x = 0: y = 4(0) − 5 = −5. The y-intercept is (0, −5).',
      },
      {
        question: 'What is the x-intercept of 2x + 3y = 12?',
        mathNotation: '2x + 3(0) = 12',
        answer: '(6, 0)',
        choices: ['(4, 0)', '(6, 0)', '(0, 4)', '(3, 2)'],
        answerIndex: 1,
        explanation: 'Set y = 0: 2x = 12 → x = 6. The x-intercept is (6, 0).',
      },
      {
        question: 'Which line is parallel to y = 3x + 1?',
        mathNotation: 'Parallel → same slope m = 3',
        answer: 'y = 3x − 7',
        choices: ['y = −3x + 1', 'y = (1/3)x + 1', 'y = 3x − 7', 'y = −(1/3)x + 1'],
        answerIndex: 2,
        explanation: 'Parallel lines have equal slopes and different y-intercepts. The slope of y = 3x + 1 is 3. The line y = 3x − 7 also has slope 3 and y-intercept −7, so it is parallel.',
      },
    ],
    connections: [
      {
        conceptId: 't3-slope-intercept',
        tierId: 3,
        title: 'Slope-Intercept Form',
        bridgeFormula: 'y = mx + b',
        explanation: 'Slope-intercept form is the direct input for graphing. Reading m and b from the equation lets you plot a line in two steps — no calculations needed beyond identifying the two parameters.',
      },
      {
        conceptId: 't3-systems-substitution',
        tierId: 3,
        title: 'Systems of Equations — Substitution',
        bridgeFormula: 'Intersection = solution to system',
        explanation: 'When you graph two lines, their intersection is the solution to the system they form. Graphing provides a visual cross-check that algebraic work is correct.',
      },
      {
        conceptId: 't5-parabolas',
        tierId: 5,
        title: 'Graphing Parabolas',
        bridgeFormula: 'y = ax² + bx + c',
        explanation: 'Graphing parabolas extends the coordinate-plane skills used for lines. Instead of a constant slope, the rate of change itself changes — but the same tools (intercepts, key points, symmetry) apply.',
      },
    ],
  },

  {
    id: 't3-absolute-value-equations',
    tierId: 3,
    glyph: '|x|',
    title: 'Absolute value equations',
    subtitle: 'Distance from zero — and the two-case split',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'number-line',
    canvasLabel: 'Absolute Value on Number Line',
    conceptTab: {
      summary: 'Absolute value measures distance from zero on the number line, ignoring direction. Equations with absolute value almost always split into two separate cases.',
      whyItMatters:
        "Manufacturing tolerances, GPS error margins, temperature deviation from a target — all these describe how far a value is from a reference, regardless of direction. Absolute value is the precise mathematical language for distance and deviation. It also forms the bridge to the formal definition of limits in calculus, where |f(x) − L| < ε expresses 'closeness' precisely.",
      coreIdea:
        "The absolute value of a number is its distance from zero:\n|5| = 5,  |−5| = 5,  |0| = 0\n\nFormal piecewise definition:\n|x| = x if x ≥ 0\n|x| = −x if x < 0\n\nSolving |expression| = k (with k > 0) means asking: 'what values are exactly k units from zero?' The answer is always two cases:\n\nCase 1: expression = k\nCase 2: expression = −k\n\nExample: |2x − 3| = 7\nCase 1: 2x − 3 = 7 → 2x = 10 → x = 5\nCase 2: 2x − 3 = −7 → 2x = −4 → x = −2\nSolution: x = 5 or x = −2\n\nSpecial situations:\n• k < 0: no solution (distance is never negative).\n• k = 0: exactly one solution (only zero is zero distance from zero).",
      formula: '|expression| = k  →  expression = k  or  expression = −k',
      formulaLabel: 'Two-case split:',
      insights: [
        'Absolute value equations almost always have two solutions — one from each case. Forgetting the negative case is the most common error. Both solutions arise because two numbers can be equally far from zero: one positive, one negative.',
        'On a number line, the solutions to |x − a| = r are the two points exactly r units from a. This is a 1-dimensional circle: a segment of radius r centered at a.',
        'The formal definition of a limit uses absolute value: |f(x) − L| < ε means f(x) is within ε of L. The two-case intuition and distance language you develop here are precisely the tools for understanding epsilon-delta proofs.',
      ],
    },
    guided: {
      problemStatement: 'Solve |3x + 1| = 10. Verify both solutions.',
      steps: [
        {
          label: 'Set up the two cases',
          math: '3x + 1 = 10  OR  3x + 1 = −10',
          explanation: 'The expression inside the absolute value bars is either +10 or −10 — both have absolute value 10. Write both cases explicitly.',
        },
        {
          label: 'Solve Case 1',
          math: '3x + 1 = 10  →  3x = 9  →  x = 3',
          explanation: 'Subtract 1 from both sides: 3x = 9. Divide by 3: x = 3.',
        },
        {
          label: 'Solve Case 2',
          math: '3x + 1 = −10  →  3x = −11  →  x = −11/3',
          explanation: 'Subtract 1: 3x = −11. Divide by 3: x = −11/3.',
        },
        {
          label: 'Verify both solutions',
          math: '|3(3) + 1| = |10| = 10 ✓  and  |3(−11/3) + 1| = |−11 + 1| = |−10| = 10 ✓',
          explanation: 'Both values check out when substituted into the original equation.',
          connectionNote: "The center value is where 3x + 1 = 0, at x = −1/3. The two solutions are symmetric about this center — that's the geometry of absolute value.",
        },
      ],
      reflectionPrompt: 'What happens when you try to solve |3x + 1| = −5? Work through it carefully and explain why the result makes sense using the definition of absolute value.',
    },
    practice: [
      {
        question: 'Solve |x − 4| = 6. What are the two solutions?',
        mathNotation: 'x − 4 = 6 or x − 4 = −6',
        answer: 'x = 10 or x = −2',
        choices: ['x = 10 or x = 2', 'x = 10 or x = −2', 'x = 2 or x = −10', 'x = 6 or x = −6'],
        answerIndex: 1,
        explanation: 'Case 1: x − 4 = 6 → x = 10. Case 2: x − 4 = −6 → x = −2. Check: |10 − 4| = 6 ✓ and |−2 − 4| = |−6| = 6 ✓.',
      },
      {
        question: 'How many solutions does |2x + 5| = −3 have?',
        mathNotation: '|expression| = −3',
        answer: 'No solutions',
        choices: ['One solution', 'Two solutions', 'No solutions', 'Infinitely many solutions'],
        answerIndex: 2,
        explanation: 'Absolute value is always ≥ 0. It can never equal a negative number, so there are no solutions.',
      },
      {
        question: 'Solve |x| = 7. What is the positive solution?',
        mathNotation: '|x| = 7',
        answer: '7',
        choices: ['49', '7', 'Only −7', '0'],
        answerIndex: 1,
        explanation: 'The two solutions are x = 7 and x = −7. Both are 7 units from zero. The positive solution is 7.',
      },
    ],
    connections: [
      {
        conceptId: 't1-negative-numbers',
        tierId: 1,
        title: 'Negative Numbers and the Number Line',
        bridgeFormula: '|−5| = 5',
        explanation: 'Absolute value is meaningless without negative numbers. The concept of distance from zero — and the fact that −5 and +5 are equidistant from zero — requires a complete number line with both directions.',
      },
      {
        conceptId: 't2-inequalities',
        tierId: 2,
        title: 'Inequalities on the Number Line',
        bridgeFormula: '|x − a| < r  →  a − r < x < a + r',
        explanation: 'Absolute value inequalities describe intervals — all values within a certain distance of a center. Solving them combines absolute value technique with inequality reasoning from Tier 2.',
      },
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Proofs',
        bridgeFormula: '|f(x) − L| < ε whenever |x − a| < δ',
        explanation: 'The formal definition of a limit uses absolute value to express closeness. The two-case reasoning and distance interpretation you develop here are exactly the tools needed to read and write epsilon-delta proofs.',
      },
    ],
  },

  {
    id: 't3-exponent-rules',
    tierId: 3,
    glyph: 'xⁿ',
    title: 'Exponent rules',
    subtitle: 'Shortcuts for repeated multiplication — and why they work',
    tags: ['algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'generic',
    canvasLabel: 'Exponent Rules',
    conceptTab: {
      summary: 'Exponent rules are efficient shortcuts for multiplying and dividing powers of the same base. Every rule follows directly from the definition: xⁿ means n copies of x multiplied together.',
      whyItMatters:
        "Scientific notation, compound interest, population growth, radioactive decay, signal strength — all are described using exponents. Every quantitative science uses exponential notation daily. Fluent manipulation of exponent rules lets you simplify enormous expressions, work with scientific notation, and understand the formulas of physics, chemistry, and finance with confidence.",
      coreIdea:
        "Start with the definition: x³ = x · x · x — three copies of x.\n\nAll rules follow from counting copies:\n\n• Product rule: xᵃ · xᵇ = xᵃ⁺ᵇ\n  x² · x³ = (x·x)(x·x·x) = x⁵. Combine copies by adding exponents.\n\n• Quotient rule: xᵃ / xᵇ = xᵃ⁻ᵇ  (x ≠ 0)\n  x⁵ / x² = x·x·x·x·x / x·x = x³. Cancel copies by subtracting exponents.\n\n• Power rule: (xᵃ)ᵇ = xᵃᵇ\n  (x²)³ = x² · x² · x² = x⁶. Three groups of two = six copies.\n\n• Zero exponent: x⁰ = 1  (x ≠ 0)\n  x³ / x³ = 1, and by quotient rule x³⁻³ = x⁰. Therefore x⁰ = 1.\n\n• Negative exponent: x⁻ⁿ = 1/xⁿ\n  x² / x⁵ = x⁻³ = 1/x³. A negative exponent means move the factor to the denominator.\n\n• Fractional exponent: x^(m/n) = ⁿ√(xᵐ)\n  x^(1/2) = √x. The denominator of the fractional exponent is the root index.",
      formula: 'xᵃ · xᵇ = xᵃ⁺ᵇ,  xᵃ / xᵇ = xᵃ⁻ᵇ,  (xᵃ)ᵇ = xᵃᵇ',
      formulaLabel: 'Core exponent rules:',
      insights: [
        'Every rule is just careful counting of factors. There is nothing to memorize if you remember the definition. Product rule: you are pooling copies. Quotient rule: you are canceling copies. Power rule: you are grouping copies.',
        'Negative exponents do not produce negative numbers. x⁻² = 1/x². The negative sign in the exponent means "this factor belongs in the denominator" — it says nothing about the sign of the result.',
        'Fractional exponents unify the exponent and radical systems. x^(1/n) = ⁿ√x. This allows the power rule from calculus — d/dx(xⁿ) = nxⁿ⁻¹ — to differentiate radical functions cleanly: d/dx(x^(1/2)) = (1/2)x^(−1/2).',
      ],
    },
    guided: {
      problemStatement: 'Simplify the expression: (x³ · x²) / x⁴. Write the answer with no negative exponents.',
      steps: [
        {
          label: 'Apply the product rule in the numerator',
          math: 'x³ · x² = x^(3+2) = x⁵',
          explanation: 'Same base, multiplication: add the exponents. 3 + 2 = 5.',
        },
        {
          label: 'Apply the quotient rule',
          math: 'x⁵ / x⁴ = x^(5−4) = x¹ = x',
          explanation: 'Same base, division: subtract the exponents. 5 − 4 = 1. And x¹ = x.',
          connectionNote: 'If the denominator had a larger exponent (say x⁶), you would get x⁻¹ = 1/x. The negative exponent signals that the factor moves below.',
        },
      ],
      reflectionPrompt: "Why must x⁰ = 1 for any nonzero x? Work through x² / x² two ways: (1) simplify the fraction directly, and (2) apply the quotient rule. What do both answers tell you?",
    },
    practice: [
      {
        question: 'Simplify: x⁴ · x³',
        mathNotation: 'x⁴ · x³ = x?',
        answer: 'x⁷',
        choices: ['x¹²', 'x⁷', 'x¹', 'x⁴³'],
        answerIndex: 1,
        explanation: 'Product rule: add exponents. x⁴ · x³ = x^(4+3) = x⁷.',
      },
      {
        question: 'Simplify: (y²)⁵',
        mathNotation: '(y²)⁵ = y?',
        answer: 'y¹⁰',
        choices: ['y⁷', 'y³', 'y¹⁰', 'y²⁵'],
        answerIndex: 2,
        explanation: 'Power rule: multiply exponents. (y²)⁵ = y^(2×5) = y¹⁰.',
      },
      {
        question: 'What does 5⁻² equal?',
        mathNotation: '5⁻² = ?',
        answer: '1/25',
        choices: ['−25', '−10', '1/25', '10'],
        answerIndex: 2,
        explanation: 'Negative exponent: x⁻ⁿ = 1/xⁿ. So 5⁻² = 1/5² = 1/25.',
      },
    ],
    connections: [
      {
        conceptId: 't1-multiplying-fractions',
        tierId: 1,
        title: 'Multiplying and Dividing Fractions',
        bridgeFormula: 'x^(1/2) = √x',
        explanation: 'Fractional exponents are fractions positioned as exponents. The rules of fraction arithmetic — adding, subtracting, and multiplying fractions — apply directly when combining fractional exponents.',
      },
      {
        conceptId: 't5-exponential-growth',
        tierId: 5,
        title: 'Exponential Growth and Decay',
        bridgeFormula: 'A = P(1 + r)ⁿ',
        explanation: 'Compound interest uses A = P(1 + r)ⁿ. Evaluating this for various n, comparing growth rates, and simplifying ratios of exponential expressions all require the exponent rules you have just learned.',
      },
      {
        conceptId: 't7-power-rule',
        tierId: 7,
        title: 'Power Rule for Derivatives',
        bridgeFormula: 'd/dx(xⁿ) = nxⁿ⁻¹',
        explanation: 'The power rule for differentiation subtracts 1 from the exponent — the quotient rule in disguise. Every calculus differentiation of a polynomial term is an exponent rule applied algebraically.',
      },
    ],
  },
];
