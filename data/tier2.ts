import type { Concept } from '../types';

export const TIER2_CONCEPTS: Concept[] = [
  {
    id: 't2-proportional-relationships',
    tierId: 2,
    glyph: '∝',
    title: 'Proportional relationships',
    subtitle: 'When two quantities grow together at a steady rate',
    tags: ['arithmetic', 'algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Proportional Graph',
    conceptTab: {
      summary: 'A proportional relationship is when two quantities always have the same ratio — one grows, the other grows at the exact same pace.',
      whyItMatters:
        "Miles and hours at a constant speed. Cups of flour and batches of cookies. Gallons of gas and miles driven. Cost and number of items at a fixed price. These are all proportional relationships — they appear in every field from cooking to engineering to economics. Recognizing them is a foundational thinking skill.",
      coreIdea:
        "A proportional relationship looks like a table where every row has the same ratio y/x. That constant ratio is called the constant of proportionality, written k.\n\ny = kx\n\nIf you drive at exactly 60 mph, then:\n- At 1 hour: 60 miles\n- At 2 hours: 120 miles\n- At 3 hours: 180 miles\n\nEvery entry has y/x = 60. The ratio is constant.\n\nOn a graph, proportional relationships are STRAIGHT LINES THROUGH THE ORIGIN (0,0). This is the key visual test: if the line doesn't pass through (0,0), it's not proportional.",
      formula: 'y = kx  (k is the constant of proportionality)',
      formulaLabel: 'Proportional relationship:',
      insights: [
        'The constant k is the unit rate. In y = kx, k tells you how much y changes for every 1 unit increase in x. It\'s the same unit rate idea from Tier 1.',
        'Proportional relationships pass through the origin because zero x-value must give zero y-value. If you buy 0 apples, you spend $0. This is built into the structure.',
        'Not every straight-line relationship is proportional! y = 2x + 5 is a straight line but NOT proportional (doesn\'t pass through origin). You\'ll study these in Algebra I.',
      ],
    },
    guided: {
      problemStatement: 'A car uses 2 gallons of gas for every 50 miles driven. Is this proportional? If so, find k and write the equation.',
      steps: [
        {
          label: 'Check the ratio for multiple values',
          math: '50/2 = 25, 100/4 = 25, 150/6 = 25',
          explanation: 'Divide miles by gallons for several pairs. Every time you get 25. The ratio is constant.',
        },
        {
          label: 'Identify k',
          math: 'k = 25 miles per gallon',
          explanation: 'The constant ratio k = 25. This means 25 miles for every 1 gallon. This IS proportional.',
        },
        {
          label: 'Write the equation',
          math: 'miles = 25 × gallons, or y = 25x',
          explanation: 'The proportional relationship equation is y = 25x, where x = gallons and y = miles.',
          connectionNote: 'This is the equation of a line through the origin with slope 25. You\'ll see why slope matters when you study linear equations.',
        },
      ],
      reflectionPrompt: 'If the car already has 5 miles on the odometer when you start tracking, does that change the proportionality? Why?',
    },
    practice: [
      {
        question: 'A recipe uses 3 cups of flour for every 2 cups of sugar. If you use 9 cups of flour, how many cups of sugar do you need?',
        mathNotation: 'flour/sugar = 3/2 → 9/? = 3/2',
        answer: '6',
        choices: ['4', '6', '8', '12'],
        answerIndex: 1,
        explanation: '3/2 = 9/x → 3x = 18 → x = 6 cups of sugar.',
      },
      {
        question: 'Which table shows a proportional relationship?',
        mathNotation: 'Check y/x ratio',
        answer: 'x: 2,4,6 y: 6,12,18',
        choices: ['x: 2,4,6 y: 6,12,18', 'x: 1,2,3 y: 3,5,7', 'x: 0,1,2 y: 1,3,5', 'x: 2,4,6 y: 5,9,13'],
        answerIndex: 0,
        explanation: 'In the first table, y/x = 6/2 = 12/4 = 18/6 = 3. Constant ratio = proportional.',
      },
      {
        question: 'If y = 4x represents a proportional relationship, what is y when x = 7?',
        mathNotation: 'y = 4(7) = ?',
        answer: '28',
        choices: ['11', '28', '3', '47'],
        answerIndex: 1,
        explanation: 'y = 4 × 7 = 28. Plug x = 7 into y = 4x.',
      },
    ],
    connections: [
      {
        conceptId: 't3-linear-equations-slope',
        tierId: 3,
        title: 'Linear Equations and Slope',
        bridgeFormula: 'y = mx + b',
        explanation: 'Proportional relationships are linear equations with b = 0. In Algebra I, you\'ll generalize to y = mx + b, adding a starting value (b) to the proportional core.',
      },
      {
        conceptId: 't7-fundamental-theorem',
        tierId: 7,
        title: 'Fundamental Theorem of Calculus',
        bridgeFormula: '∫f(x)dx = area under curve',
        explanation: 'For a proportional relationship y = kx, the area under the graph between 0 and t is exactly (k/2)t² — which you\'ll derive using integrals. Proportional thinking extends all the way to calculus.',
      },
    ],
  },

  {
    id: 't2-solving-one-step-equations',
    tierId: 2,
    glyph: '=',
    title: 'Solving one-step equations',
    subtitle: 'The balance principle — do the same thing to both sides',
    tags: ['algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Equation Balance',
    conceptTab: {
      summary: 'An equation is a balance. Whatever you do to one side, you must do to the other to keep it balanced.',
      whyItMatters:
        "Every word problem in math eventually becomes 'find x.' Every engineering calculation, financial formula, and scientific law uses equations. Learning to solve them — starting with the simplest one-step versions — is the foundation of all applied mathematics.",
      coreIdea:
        "Think of an equation as a perfectly balanced scale. Both sides are equal. Your goal is to get x alone on one side while keeping the scale balanced.\n\nThe rule: whatever operation you perform on one side, MUST also be performed on the other.\n\nFor addition equations:\nx + 5 = 12 → subtract 5 from BOTH sides → x = 7\n\nFor multiplication equations:\n3x = 15 → divide BOTH sides by 3 → x = 5\n\nFor subtraction:\nx − 4 = 9 → add 4 to BOTH sides → x = 13\n\nFor division:\nx/6 = 4 → multiply BOTH sides by 6 → x = 24",
      formula: 'if a = b, then a ± c = b ± c, and a × c = b × c',
      formulaLabel: 'Properties of equality:',
      insights: [
        'You\'re not guessing — you\'re using inverse operations. Addition and subtraction undo each other. Multiplication and division undo each other. The goal is to reverse whatever was done to x.',
        'Always check your answer by plugging it back in. If x + 5 = 12 and you got x = 7, check: 7 + 5 = 12 ✓. If the check works, you\'re right.',
        'The variable can be on either side. 12 = x + 5 is identical to x + 5 = 12. Convention puts the variable on the left, but math works either way.',
      ],
    },
    guided: {
      problemStatement: 'You have some money. After spending $13, you have $27 left. How much did you start with?',
      steps: [
        {
          label: 'Write the equation',
          math: 'x − 13 = 27',
          explanation: 'Let x be the starting amount. You spent $13 (subtracted), leaving $27. Write x − 13 = 27.',
        },
        {
          label: 'Use the inverse operation',
          math: 'Add 13 to both sides',
          explanation: 'To undo the subtraction of 13, add 13 to both sides of the equation.',
        },
        {
          label: 'Solve',
          math: 'x = 27 + 13 = 40',
          explanation: 'x = 40. You started with $40.',
        },
        {
          label: 'Check',
          math: '40 − 13 = 27 ✓',
          explanation: 'Substitute x = 40 back into the original: 40 − 13 = 27. It checks out.',
          connectionNote: 'Every equation-solving step has a corresponding check. Always verify.',
        },
      ],
      reflectionPrompt: 'Why do you have to do the same thing to both sides? What would happen to the balance if you only changed one side?',
    },
    practice: [
      {
        question: 'Solve: x + 8 = 15',
        mathNotation: 'x + 8 = 15',
        answer: 'x = 7',
        choices: ['x = 23', 'x = 7', 'x = 8', 'x = 15'],
        answerIndex: 1,
        explanation: 'Subtract 8 from both sides: x = 15 − 8 = 7.',
      },
      {
        question: 'Solve: 4x = 36',
        mathNotation: '4x = 36',
        answer: 'x = 9',
        choices: ['x = 32', 'x = 40', 'x = 9', 'x = 144'],
        answerIndex: 2,
        explanation: 'Divide both sides by 4: x = 36 ÷ 4 = 9.',
      },
      {
        question: 'Solve: x/5 = 7',
        mathNotation: 'x/5 = 7',
        answer: 'x = 35',
        choices: ['x = 2', 'x = 35', 'x = 12', 'x = 1.4'],
        answerIndex: 1,
        explanation: 'Multiply both sides by 5: x = 7 × 5 = 35.',
      },
    ],
    connections: [
      {
        conceptId: 't2-solving-two-step-equations',
        tierId: 2,
        title: 'Solving Two-Step Equations',
        bridgeFormula: '2x + 3 = 11',
        explanation: 'Two-step equations combine exactly what you just learned — but applied twice in sequence. Every two-step equation is just two one-step equations in a row.',
      },
      {
        conceptId: 't3-systems-substitution',
        tierId: 3,
        title: 'Systems of Equations — Substitution',
        bridgeFormula: 'y = 2x, x + y = 9',
        explanation: 'Systems of equations require solving multiple one-step and two-step equations in sequence. The individual solving skills chain together.',
      },
    ],
  },

  {
    id: 't2-solving-two-step-equations',
    tierId: 2,
    glyph: '⟹',
    title: 'Solving two-step equations',
    subtitle: 'Two operations to undo — reverse the order',
    tags: ['algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Two Steps',
    conceptTab: {
      summary: 'Two-step equations need two inverse operations — always undo addition/subtraction first, then multiplication/division.',
      whyItMatters:
        "Most real-world equations have multiple steps. Figuring out how much to pay including tax, calculating a tip, determining a discounted price — these become two-step equations. The strategy you learn here scales up to equations with 10 steps.",
      coreIdea:
        "A two-step equation has two things happening to x. To solve it, undo them in REVERSE order (like taking off shoes and socks — you put socks on first, so you take shoes off first).\n\nExample: 2x + 3 = 11\n\nStep 1 — Undo the addition (−3 from both sides):\n2x = 8\n\nStep 2 — Undo the multiplication (÷2 from both sides):\nx = 4\n\nWhy this order? Think of x being dressed: first multiplied by 2, THEN added 3. To undress x, remove the outer layer (3) first, then the inner layer (×2).",
      formula: 'ax + b = c → x = (c − b) / a',
      formulaLabel: 'General two-step form:',
      insights: [
        'Reverse order matters. In 2x + 3 = 11, the 3 was added AFTER the multiplication. So we subtract 3 BEFORE we divide. Going backwards undoes things correctly.',
        'It helps to think of ax + b as a recipe: "Take x, multiply by a, then add b." To reverse: "subtract b first, then divide by a."',
        'These equations are the backbone of linear algebra. You solve them thousands of times in science, engineering, and finance — often without realizing it.',
      ],
    },
    guided: {
      problemStatement: 'A plumber charges $40 per hour plus a $25 service fee. If a repair cost $145 total, how many hours did it take?',
      steps: [
        {
          label: 'Write the equation',
          math: '40h + 25 = 145',
          explanation: 'Let h = hours. Rate × time + fee = total: 40h + 25 = 145.',
        },
        {
          label: 'Undo the addition first',
          math: '40h = 145 − 25 = 120',
          explanation: 'Subtract 25 from both sides to isolate the 40h term.',
        },
        {
          label: 'Undo the multiplication',
          math: 'h = 120 ÷ 40 = 3',
          explanation: 'Divide both sides by 40. The repair took 3 hours.',
        },
        {
          label: 'Check',
          math: '40(3) + 25 = 120 + 25 = 145 ✓',
          explanation: 'Plug h = 3 into the original equation. It checks.',
        },
      ],
      reflectionPrompt: 'Could you have solved this equation in a different order? What would happen if you divided by 40 first instead of subtracting 25?',
    },
    practice: [
      {
        question: 'Solve: 3x − 7 = 14',
        mathNotation: '3x − 7 = 14',
        answer: 'x = 7',
        choices: ['x = 7/3', 'x = 7', 'x = 21', 'x = 2.3'],
        answerIndex: 1,
        explanation: 'Add 7 to both sides: 3x = 21. Divide by 3: x = 7.',
      },
      {
        question: 'Solve: x/4 + 2 = 6',
        mathNotation: 'x/4 + 2 = 6',
        answer: 'x = 16',
        choices: ['x = 8', 'x = 16', 'x = 2', 'x = 32'],
        answerIndex: 1,
        explanation: 'Subtract 2 from both sides: x/4 = 4. Multiply by 4: x = 16.',
      },
      {
        question: 'Solve: 5 − 2x = 1',
        mathNotation: '5 − 2x = 1',
        answer: 'x = 2',
        choices: ['x = −2', 'x = 3', 'x = 2', 'x = −3'],
        answerIndex: 2,
        explanation: 'Subtract 5 from both sides: −2x = −4. Divide by −2: x = 2.',
      },
    ],
    connections: [
      {
        conceptId: 't3-linear-equations-slope',
        tierId: 3,
        title: 'Linear Equations and Slope',
        bridgeFormula: 'y = mx + b',
        explanation: 'The two-step equation ax + b = c is the same as y = mx + b with a known y-value. Solving linear equations and graphing lines are the same operation from different angles.',
      },
    ],
  },

  {
    id: 't2-inequalities',
    tierId: 2,
    glyph: '<',
    title: 'Inequalities on the number line',
    subtitle: 'A range of answers, not just one',
    tags: ['algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'number-line',
    canvasLabel: 'Inequality on Number Line',
    conceptTab: {
      summary: 'An inequality describes all numbers that satisfy a condition — usually an infinite set, shown as a ray on the number line.',
      whyItMatters:
        "Real life is full of inequalities: you need AT LEAST $20 for a ticket, a temperature BELOW 32°F causes freezing, you need MORE THAN 60% to pass. Inequalities describe constraints and ranges — a more realistic type of math than single answers.",
      coreIdea:
        "Inequalities use four symbols:\n< (less than)\n> (greater than)\n≤ (less than or equal to)\n≥ (greater than or equal to)\n\nSolving an inequality is just like solving an equation, with ONE key difference:\n\n⚠️ When you multiply or divide by a NEGATIVE number, FLIP the inequality sign.\n\nFor example:\n−2x > 6\n÷ (−2): flip the sign → x < −3\n\nOn a number line, the solution is shown with:\n• Open circle (○) for < or > (not including that point)\n• Filled circle (●) for ≤ or ≥ (including that point)\n• A ray going in the correct direction",
      formula: 'If a > b and c < 0, then a × c < b × c',
      formulaLabel: 'Flipping rule:',
      insights: [
        'The flip rule for negatives is non-obvious. Think about it: 2 < 3, but if you multiply both sides by −1, you get −2 and −3. Since −2 > −3, the direction flipped.',
        'Compound inequalities like 3 < x < 7 describe a range. "x is between 3 and 7" is a compound inequality in disguise.',
        'Inequalities in two variables (like y < 2x + 1) shade regions of a coordinate plane. You\'ll use this in linear programming and optimization.',
      ],
    },
    guided: {
      problemStatement: 'You need to earn at least $200 this week. You earn $15 per hour. How many hours must you work?',
      steps: [
        {
          label: 'Write the inequality',
          math: '15h ≥ 200',
          explanation: '"At least $200" means ≥ 200. Earnings are 15 per hour × h hours.',
        },
        {
          label: 'Solve (divide both sides by 15)',
          math: 'h ≥ 200/15 = 13.3̄',
          explanation: 'Dividing by positive 15 — no flip needed. h ≥ 13.33...',
        },
        {
          label: 'Interpret',
          math: 'h ≥ 14 (whole hours)',
          explanation: 'Since hours must be whole, you need at least 14 hours. (13 hours gives only $195 — not enough.)',
          connectionNote: 'This is where context matters. Math gives 13.3̄; real life says round up to 14.',
        },
      ],
      reflectionPrompt: 'When solving −3x > 12, what happens to the inequality sign when you divide by −3? Why does this make sense on a number line?',
    },
    practice: [
      {
        question: 'Solve: x + 4 > 9',
        mathNotation: 'x + 4 > 9',
        answer: 'x > 5',
        choices: ['x > 5', 'x > 13', 'x < 5', 'x ≥ 5'],
        answerIndex: 0,
        explanation: 'Subtract 4 from both sides: x > 9 − 4 = 5. Open circle at 5, ray going right.',
      },
      {
        question: 'Solve: −2x ≤ 8',
        mathNotation: '−2x ≤ 8',
        answer: 'x ≥ −4',
        choices: ['x ≤ −4', 'x ≤ 4', 'x ≥ −4', 'x ≥ 4'],
        answerIndex: 2,
        explanation: 'Divide both sides by −2. FLIP the sign: x ≥ 8/(−2) = −4.',
      },
      {
        question: 'Which number satisfies 3x − 1 < 8?',
        mathNotation: '3x − 1 < 8',
        answer: 'x = 2',
        choices: ['x = 5', 'x = 3', 'x = 2', 'x = 4'],
        answerIndex: 2,
        explanation: '3x < 9, so x < 3. Of the choices, only x = 2 satisfies x < 3.',
      },
    ],
    connections: [
      {
        conceptId: 't5-quadratic-formula',
        tierId: 5,
        title: 'Quadratic Formula',
        bridgeFormula: 'discriminant b² − 4ac ≥ 0 for real roots',
        explanation: 'The discriminant of the quadratic formula uses inequality to determine whether solutions exist. This basic concept — comparing to zero — links directly to inequality thinking.',
      },
    ],
  },

  {
    id: 't2-intro-variables',
    tierId: 2,
    glyph: 'x',
    title: 'Introduction to variables — what x really means',
    subtitle: 'A letter that holds a number\'s place',
    tags: ['algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'generic',
    canvasLabel: 'Variable',
    conceptTab: {
      summary: "A variable is a symbol (usually a letter) that stands in for a number we don't know yet — or a number that can change.",
      whyItMatters:
        "Why do mathematicians use letters? Because they want to say something TRUE for ALL numbers, not just one. 'The area of a rectangle is length times width' — written as A = lw — is true for every possible rectangle. Without variables, you'd have to write out every specific case. Variables let you write rules that cover infinite situations.",
      coreIdea:
        "A variable is a placeholder. When we write x + 3 = 7, the letter x is standing in for some specific number we're trying to find (in this case, 4).\n\nVariables can also express general relationships. A = lw means 'area ALWAYS equals length times width.' Here, A, l, and w aren't unknown — they're names for quantities that vary.\n\nExpression vs. Equation:\n• Expression: 2x + 5 (no equals sign — just a formula)\n• Equation: 2x + 5 = 13 (has equals sign — can be solved)\n\nLike terms: 3x + 5x = 8x (x-terms combine). But 3x + 5y can't combine (different variables).",
      formula: 'ax + b (expression) vs ax + b = c (equation)',
      formulaLabel: 'Expression vs Equation:',
      insights: [
        'Variables were invented to save writing. Instead of "a number added to 3 equals 7," we write x + 3 = 7. Every equation is just math\'s shorthand for an English sentence.',
        'The letter doesn\'t matter — x, n, t, or any letter works. By convention: x, y, z for unknowns; a, b, c for constants; n for integers; t for time.',
        'Combining like terms (2x + 3x = 5x) works for the same reason 2 apples + 3 apples = 5 apples: same units (x, or apples) can be added.',
      ],
    },
    guided: {
      problemStatement: 'A store sells apples for $0.75 each. Write an expression for the cost of n apples, and find the cost of 8 apples.',
      steps: [
        {
          label: 'Identify the variable',
          math: 'n = number of apples',
          explanation: 'The number of apples can vary, so we use a variable n to represent it.',
        },
        {
          label: 'Write the expression',
          math: 'cost = 0.75n',
          explanation: 'Each apple costs $0.75. For n apples: multiply. The expression is 0.75n.',
        },
        {
          label: 'Evaluate at n = 8',
          math: '0.75 × 8 = $6.00',
          explanation: 'Replace n with 8. 0.75 × 8 = 6.00. Eight apples cost $6.00.',
          connectionNote: 'This expression 0.75n is a proportional relationship: cost is always 0.75 times the number of apples.',
        },
      ],
      reflectionPrompt: 'What\'s the difference between 2x and x²? Why can\'t you combine them as like terms?',
    },
    practice: [
      {
        question: 'Simplify: 4x + 2x − x',
        mathNotation: '4x + 2x − x = ?',
        answer: '5x',
        choices: ['7x', '5x', '6x − 1', '5'],
        answerIndex: 1,
        explanation: '4x + 2x = 6x, then 6x − x = 5x. All x-terms combine.',
      },
      {
        question: 'Which expression represents "3 more than twice a number n"?',
        mathNotation: '"3 more than twice n"',
        answer: '2n + 3',
        choices: ['3n + 2', '2n + 3', '2(n + 3)', 'n + 6'],
        answerIndex: 1,
        explanation: '"Twice a number" = 2n. "3 more than" = +3. So 2n + 3.',
      },
      {
        question: 'If a = 4 and b = 3, what is 2a − b + 1?',
        mathNotation: '2(4) − 3 + 1 = ?',
        answer: '6',
        choices: ['12', '6', '4', '10'],
        answerIndex: 1,
        explanation: '2(4) = 8. Then 8 − 3 = 5. Then 5 + 1 = 6.',
      },
    ],
    connections: [
      {
        conceptId: 't3-linear-equations-slope',
        tierId: 3,
        title: 'Linear Equations and Slope',
        bridgeFormula: 'y = mx + b',
        explanation: 'Every variable concept you\'ve learned (unknown, expression, like terms) is active in linear equations. The variables x and y, the expression mx + b, and combining like terms all appear.',
      },
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Proofs',
        bridgeFormula: '∀ε > 0, ∃δ > 0 such that...',
        explanation: 'In advanced mathematics, variables take on much richer meaning — they stand for any value in a set, bound by quantifiers. The intuition starts here.',
      },
    ],
  },

  {
    id: 't2-area-perimeter',
    tierId: 2,
    glyph: '□',
    title: 'Area and perimeter',
    subtitle: 'How much space, and how far around',
    tags: ['geometry'],
    accessibilityLevel: 'middle',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Area vs Perimeter',
    conceptTab: {
      summary: 'Perimeter is the total distance around a shape. Area is the amount of flat space inside it.',
      whyItMatters:
        "Painting a room (area). Fencing a yard (perimeter). Buying carpet (area). Measuring how far you ran around a track (perimeter). Tiling a floor (area). These are the two most practical geometry measurements — and they describe fundamentally different things.",
      coreIdea:
        "PERIMETER: Add up all the side lengths. For a rectangle: P = 2l + 2w (or P = 2(l + w)).\n\nAREA: The number of unit squares that fit inside. For a rectangle: A = l × w.\n\nKey formulas:\n• Rectangle: A = lw, P = 2l + 2w\n• Triangle: A = ½bh (half base times height)\n• Circle: A = πr², C = 2πr (circumference, not perimeter, but same idea)\n\nUnits matter: Perimeter is in regular units (feet, meters). Area is in SQUARE units (ft², m²). If you mix units and get a non-square unit for area, something went wrong.",
      formula: 'A = lw (rectangle)   A = ½bh (triangle)',
      formulaLabel: 'Area formulas:',
      insights: [
        'Area and perimeter measure DIFFERENT things and can change independently. A shape can have large area with small perimeter (a circle approaches this) or large perimeter with small area (a very thin rectangle).',
        'The factor of ½ in triangle area comes from the fact that every triangle is exactly half a parallelogram. You can always pair triangles to form rectangles.',
        'Circle area A = πr² can be derived by slicing a circle into thin wedges and rearranging them into a near-rectangle. This is the intuition behind integration.',
      ],
    },
    guided: {
      problemStatement: 'A rectangular room is 12 ft long and 9 ft wide. How much carpet do you need? How much baseboard molding?',
      steps: [
        {
          label: 'Find the area (carpet)',
          math: 'A = 12 × 9 = 108 ft²',
          explanation: 'Carpet covers the FLOOR — that\'s area. A = length × width = 12 × 9 = 108 square feet.',
        },
        {
          label: 'Find the perimeter (molding)',
          math: 'P = 2(12) + 2(9) = 24 + 18 = 42 ft',
          explanation: 'Molding goes around the EDGES — that\'s perimeter. P = 2l + 2w = 42 feet.',
          connectionNote: 'Notice: 108 ft² (area) vs. 42 ft (perimeter) — different numbers, different units, different meanings.',
        },
      ],
      reflectionPrompt: 'If you double the length of a rectangle, how does that affect its area? Its perimeter? Do they change by the same factor?',
    },
    practice: [
      {
        question: 'A triangle has base 8 cm and height 5 cm. What is its area?',
        mathNotation: 'A = ½ × 8 × 5 = ?',
        answer: '20 cm²',
        choices: ['40 cm²', '20 cm²', '13 cm²', '80 cm²'],
        answerIndex: 1,
        explanation: 'A = ½ × base × height = ½ × 8 × 5 = 20 cm².',
      },
      {
        question: 'A square has side length 7 m. What is its perimeter?',
        mathNotation: 'P = 4 × 7 = ?',
        answer: '28 m',
        choices: ['49 m²', '28 m', '14 m', '14 m²'],
        answerIndex: 1,
        explanation: 'Perimeter = 4 × side = 4 × 7 = 28 m. (Not 49 m², which would be the area.)',
      },
      {
        question: 'A rectangle has area 48 ft² and length 8 ft. What is its width?',
        mathNotation: '8 × w = 48',
        answer: '6 ft',
        choices: ['6 ft', '40 ft', '3 ft', '384 ft'],
        answerIndex: 0,
        explanation: 'A = l × w → 48 = 8 × w → w = 48 ÷ 8 = 6 ft.',
      },
    ],
    connections: [
      {
        conceptId: 't4-circles',
        tierId: 4,
        title: 'Circles — Area, Circumference, Arc Length',
        bridgeFormula: 'A = πr²',
        explanation: 'Circle area extends the rectangle area idea to curved shapes — a beautiful generalization that requires understanding what area means in the first place.',
      },
      {
        conceptId: 't7-definite-integral',
        tierId: 7,
        title: 'Definite Integral — Area Under a Curve',
        bridgeFormula: '∫[a to b] f(x)dx = area',
        explanation: 'The integral in calculus is a generalized area formula. The area between a curve and the x-axis is computed the same way area formulas work — accumulating thin strips.',
      },
    ],
  },

  {
    id: 't2-coordinate-plane',
    tierId: 2,
    glyph: '⊕',
    title: 'Introduction to the coordinate plane',
    subtitle: 'Latitude and longitude for math — locating points in 2D',
    tags: ['geometry', 'algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'coordinate-plane',
    canvasLabel: 'Coordinate Grid',
    conceptTab: {
      summary: 'The coordinate plane is a system for identifying every point in 2D space using two numbers: x (horizontal) and y (vertical).',
      whyItMatters:
        "GPS coordinates, computer graphics, maps, scatter plots, graphs of equations — all of these use the coordinate plane. The idea of assigning two numbers to every point in a plane is one of the most powerful inventions in mathematics, connecting algebra (equations) to geometry (shapes).",
      coreIdea:
        "Two number lines cross at right angles at a point called the ORIGIN (0, 0). The horizontal line is the x-axis; the vertical line is the y-axis.\n\nEvery point is written as (x, y) — an ORDERED PAIR. The order matters: (3, 5) is different from (5, 3).\n\nTo plot (3, 5):\n1. Start at the origin\n2. Move RIGHT 3 (positive x)\n3. Move UP 5 (positive y)\n\nThe four quadrants:\n• Quadrant I: (+, +)\n• Quadrant II: (−, +)\n• Quadrant III: (−, −)\n• Quadrant IV: (+, −)",
      formula: 'P = (x, y)',
      formulaLabel: 'Ordered pair:',
      insights: [
        'This system is named after René Descartes (hence "Cartesian coordinates"). Legend says he invented it watching a fly on the ceiling — wanting to describe its exact position using distances from two walls.',
        'Points on the x-axis have y = 0. Points on the y-axis have x = 0. These are the "floor" and "wall" of the coordinate system.',
        'The coordinate plane connects algebra and geometry. An equation like y = 2x + 1 produces POINTS that, when plotted, make a LINE. Geometry and algebra are the same thing, viewed differently.',
      ],
    },
    guided: {
      problemStatement: 'Plot the points A(2, 3), B(−1, 4), and C(3, −2). Then identify which quadrant each is in.',
      steps: [
        {
          label: 'Plot A(2, 3)',
          math: 'Right 2, Up 3',
          explanation: 'Starting at origin, move right 2 units (positive x) and up 3 units (positive y). A is in Quadrant I (+, +).',
        },
        {
          label: 'Plot B(−1, 4)',
          math: 'Left 1, Up 4',
          explanation: 'Move left 1 (negative x) and up 4 (positive y). B is in Quadrant II (−, +).',
        },
        {
          label: 'Plot C(3, −2)',
          math: 'Right 3, Down 2',
          explanation: 'Move right 3 (positive x) and down 2 (negative y). C is in Quadrant IV (+, −).',
          connectionNote: 'Quadrant III would be (−, −). When would you see negative x and negative y?',
        },
      ],
      reflectionPrompt: 'If a point has the same x and y coordinates, where must it lie? Try a few examples — what pattern do you see?',
    },
    practice: [
      {
        question: 'What is the location of the origin?',
        mathNotation: 'Origin = ?',
        answer: '(0, 0)',
        choices: ['(1, 1)', '(0, 0)', '(0, 1)', '(1, 0)'],
        answerIndex: 1,
        explanation: 'The origin is where the x-axis and y-axis cross, always at (0, 0).',
      },
      {
        question: 'The point (−3, 5) is in which quadrant?',
        mathNotation: '(−3, 5)',
        answer: 'Quadrant II',
        choices: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
        answerIndex: 1,
        explanation: 'x is negative and y is positive: (−, +) = Quadrant II.',
      },
      {
        question: 'Which point is 4 units to the right and 3 units below the origin?',
        mathNotation: 'Right 4, Down 3',
        answer: '(4, −3)',
        choices: ['(−4, 3)', '(3, −4)', '(4, −3)', '(−3, 4)'],
        answerIndex: 2,
        explanation: 'Right means positive x: x = 4. Down means negative y: y = −3. The point is (4, −3).',
      },
    ],
    connections: [
      {
        conceptId: 't3-graphing-lines',
        tierId: 3,
        title: 'Graphing Lines',
        bridgeFormula: 'y = 2x − 1: plot points and connect',
        explanation: 'Graphing lines is just plotting many ordered pairs from a linear equation on the coordinate plane you just learned. The plane and the equation come together.',
      },
      {
        conceptId: 't4-coordinate-geometry',
        tierId: 4,
        title: 'Coordinate Geometry — Distance and Midpoint',
        bridgeFormula: 'd = √((x₂−x₁)² + (y₂−y₁)²)',
        explanation: 'Once you have the coordinate plane, you can calculate distances between points using the Pythagorean theorem. This is coordinate geometry.',
      },
    ],
  },
];
