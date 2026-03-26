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
    visualizationType: 'balance-scale',
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
    visualizationType: 'balance-scale',
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
    visualizationType: 'balance-scale',
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
    visualizationType: 'area-rectangle',
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
        conceptId: 't4-circles-geometry',
        tierId: 4,
        title: 'Circles — Area, Circumference, Arc Length',
        bridgeFormula: 'A = πr²',
        explanation: 'Circle area extends the rectangle area idea to curved shapes — a beautiful generalization that requires understanding what area means in the first place.',
      },
      {
        conceptId: 't7-riemann-sums-integrals',
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

  {
    id: 't2-percent-change',
    tierId: 2,
    glyph: '↑%',
    title: 'Percent increase and decrease',
    subtitle: 'How much did it grow — or shrink — relative to the original?',
    tags: ['arithmetic', 'algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'bar-chart',
    canvasLabel: 'Percent Change Graph',
    conceptTab: {
      summary: 'Percent change measures how much a quantity has grown or shrunk, expressed as a percentage of the original value.',
      whyItMatters:
        "Inflation, population growth, sale discounts, salary raises, stock gains and losses — all are described as percent change. When a news report says \"prices rose 4%\" or \"unemployment fell by 0.5%,\" they're using this formula. It is one of the most universally applied math concepts in adult life.",
      coreIdea:
        "PERCENT CHANGE formula:\nPercent change = (New − Original) / Original × 100\n\nIf the result is positive → percent INCREASE.\nIf the result is negative → percent DECREASE.\n\nExample: A shirt originally costs $40. It's now $52.\nChange = 52 − 40 = 12\nPercent change = (12/40) × 100 = 30% increase\n\nFinding a new value after a percent change:\nNew = Original × (1 + rate) for increase\nNew = Original × (1 − rate) for decrease\n\nExample: $80 after a 25% increase:\n$80 × 1.25 = $100\n\nKey trap: A 20% increase followed by a 20% decrease does NOT return to the original. $100 × 1.2 = $120, then $120 × 0.8 = $96. The base changes each time.",
      formula: 'Percent change = ((New − Original) / Original) × 100',
      formulaLabel: 'Percent change:',
      insights: [
        'Percent change is ALWAYS relative to the original. A raise from $10 to $12 is 20%; a raise from $100 to $102 is only 2% — the same $2 dollar change means very different things depending on the starting value.',
        'A 100% increase doubles the value. A 100% decrease would reach zero. A 50% decrease followed by a 100% increase gets you back to the original — not intuitive!',
        'The multiplier form (1 ± r) is powerful for chaining changes. Three years of 10% annual growth: 1000 × 1.10³ = 1,331. This multiplier idea is the seed of exponential growth.',
      ],
    },
    guided: {
      problemStatement: 'A town\'s population was 12,500 last year. This year it is 13,250. Find the percent change.',
      steps: [
        {
          label: 'Find the amount of change',
          math: '13,250 − 12,500 = 750',
          explanation: 'Subtract original from new. The population grew by 750 people.',
        },
        {
          label: 'Divide by the original',
          math: '750 / 12,500 = 0.06',
          explanation: 'Divide the change (750) by the ORIGINAL value (12,500). Never divide by the new value.',
        },
        {
          label: 'Convert to a percentage',
          math: '0.06 × 100 = 6%',
          explanation: 'Multiply by 100 to get the percent. The population increased by 6%.',
          connectionNote: 'Because the result is positive, this is a percent increase. A negative result would indicate a decrease.',
        },
      ],
      reflectionPrompt: 'If a value decreases by 20% and then increases by 20%, does it return to the original? Try with a starting value of $100 and explain why the answer is surprising.',
    },
    practice: [
      {
        question: 'A laptop originally costs $800 and is now on sale for $680. What is the percent decrease?',
        mathNotation: '((680 − 800) / 800) × 100 = ?',
        answer: '15%',
        choices: ['12%', '15%', '17%', '20%'],
        answerIndex: 1,
        explanation: 'Change = 680−800 = −120. Percent = (−120/800)×100 = −15%. A 15% decrease.',
      },
      {
        question: 'A store increases a $45 price by 20%. What is the new price?',
        mathNotation: '$45 × 1.20 = ?',
        answer: '$54',
        choices: ['$47', '$54', '$65', '$9'],
        answerIndex: 1,
        explanation: 'New = 45 × (1 + 0.20) = 45 × 1.20 = $54.',
      },
      {
        question: 'A value went from 250 to 200. What is the percent change?',
        mathNotation: '((200 − 250) / 250) × 100 = ?',
        answer: '−20%',
        choices: ['−25%', '−20%', '20%', '25%'],
        answerIndex: 1,
        explanation: 'Change = −50. Percent = (−50/250)×100 = −20%. A 20% decrease.',
      },
    ],
    connections: [
      {
        conceptId: 't1-percentages',
        tierId: 1,
        title: 'Percentages — What They Really Mean',
        bridgeFormula: 'change/original × 100',
        explanation: 'Percent change is an application of percentage fundamentals. You must be comfortable converting between percent and decimal before applying the percent-change formula.',
      },
      {
        conceptId: 't2-simple-interest',
        tierId: 2,
        title: 'Simple Interest',
        bridgeFormula: 'I = Prt — interest is a percent of principal',
        explanation: 'Simple interest is percent change applied to money over time. Interest is a percentage increase of the principal, making percent-change intuition directly applicable.',
      },
      {
        conceptId: 't5-exponential-growth',
        tierId: 5,
        title: 'Exponential Growth and Decay',
        bridgeFormula: 'A = P(1 + r)^t',
        explanation: 'When percent change is applied repeatedly each period, it becomes exponential growth. The multiplier (1+r) you use for percent increase is the base of the exponential function.',
      },
    ],
  },

  {
    id: 't2-unit-rates-pricing',
    tierId: 2,
    glyph: '$/u',
    title: 'Unit rates and unit pricing',
    subtitle: 'Cost per one — the key to smart comparison shopping',
    tags: ['arithmetic', 'algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'number-line',
    canvasLabel: 'Unit Rate Number Line',
    conceptTab: {
      summary: 'A unit rate expresses a ratio with a denominator of 1. Unit pricing is the cost per single item — the essential tool for comparing value.',
      whyItMatters:
        "Grocery stores post unit prices on shelf labels because consumers need them to compare value across different package sizes. A 24-oz jar of peanut butter at $4.80 versus a 40-oz jar at $7.60 — which is cheaper? Unit pricing answers this instantly. Understanding unit rates is a life skill with direct financial impact every time you shop.",
      coreIdea:
        "A UNIT RATE is a ratio expressed 'per 1 unit.'\n• Speed: 60 miles per hour (miles per 1 hour)\n• Fuel economy: 32 miles per gallon (miles per 1 gallon)\n• Wage: $15 per hour (dollars per 1 hour)\n\nCalculating a unit rate: divide the first quantity by the second.\nUnit price = total cost ÷ number of units\n\nComparing unit prices:\n24 oz for $4.80 → $4.80/24 = $0.20 per oz\n40 oz for $7.60 → $7.60/40 = $0.19 per oz\nThe 40-oz jar is cheaper per ounce.\n\nEquivalent rates: if two ratios have the same unit rate, they are proportional.\n$0.20/oz and $0.40/2oz are equivalent — same unit rate.\n\nUnit rates are the constant of proportionality k in y = kx.",
      formula: 'unit rate = quantity₁ / quantity₂',
      formulaLabel: 'Unit rate:',
      insights: [
        'The bigger package is NOT always cheaper per unit. Stores sometimes price large packages at higher unit costs, counting on shoppers to assume "bigger = better deal." Always check the unit price.',
        'Unit rates are ratios expressed as fractions with denominator 1. 60 miles/1 hour is a fraction. Every unit rate is a fraction — and all fraction skills apply.',
        'When two unit rates are the same, the quantities are proportional. "Miles per gallon is constant" means miles and gallons are in a proportional relationship — the foundation of y = kx.',
      ],
    },
    guided: {
      problemStatement: 'Brand A: 18 oz of cereal for $3.78. Brand B: 24 oz for $4.56. Which brand gives more cereal per dollar?',
      steps: [
        {
          label: 'Find Brand A\'s unit price',
          math: '$3.78 ÷ 18 oz = $0.21 per oz',
          explanation: 'Divide the total price by the number of ounces. Brand A costs 21 cents per ounce.',
        },
        {
          label: 'Find Brand B\'s unit price',
          math: '$4.56 ÷ 24 oz = $0.19 per oz',
          explanation: 'Brand B costs 19 cents per ounce.',
        },
        {
          label: 'Compare',
          math: '$0.19 < $0.21 → Brand B is cheaper per ounce',
          explanation: 'Even though Brand B costs more in total ($4.56 > $3.78), you get more cereal per dollar with Brand B.',
          connectionNote: 'Alternatively, find oz per dollar: Brand A = 18/3.78 ≈ 4.76 oz/$, Brand B = 24/4.56 ≈ 5.26 oz/$. More oz per dollar confirms Brand B is better value.',
        },
      ],
      reflectionPrompt: 'Think of a case where buying the larger, lower unit-price package would NOT be the best choice. What factors besides unit price might influence your decision?',
    },
    practice: [
      {
        question: 'A car travels 325 miles on 13 gallons of gas. What is the unit rate (fuel economy)?',
        mathNotation: '325 miles ÷ 13 gallons = ?',
        answer: '25 miles per gallon',
        choices: ['20 mpg', '25 mpg', '30 mpg', '338 mpg'],
        answerIndex: 1,
        explanation: '325 ÷ 13 = 25 miles per gallon.',
      },
      {
        question: 'Which is the better deal: 6 cans for $4.50, or 9 cans for $6.48?',
        mathNotation: '$4.50/6 vs $6.48/9',
        answer: '9 cans for $6.48',
        choices: ['6 cans for $4.50', '9 cans for $6.48', 'They are equal', 'Cannot determine'],
        answerIndex: 1,
        explanation: '6 cans: $4.50÷6 = $0.75/can. 9 cans: $6.48÷9 = $0.72/can. The 9-can option is cheaper per can.',
      },
      {
        question: 'A typist types 840 words in 12 minutes. What is the unit rate in words per minute?',
        mathNotation: '840 ÷ 12 = ?',
        answer: '70 words per minute',
        choices: ['60 wpm', '70 wpm', '80 wpm', '852 wpm'],
        answerIndex: 1,
        explanation: '840 ÷ 12 = 70 words per minute.',
      },
    ],
    connections: [
      {
        conceptId: 't1-ratios',
        tierId: 1,
        title: 'Ratios and Unit Rates',
        bridgeFormula: 'unit rate = ratio with denominator 1',
        explanation: 'Unit rates are the Tier 1 concept extended to a middle-school context. The mechanics are identical — divide to find per-one — but now applied to real financial decisions.',
      },
      {
        conceptId: 't2-proportional-relationships',
        tierId: 2,
        title: 'Proportional Relationships',
        bridgeFormula: 'y = kx, where k is the unit rate',
        explanation: 'A constant unit rate is what makes a relationship proportional. The unit price per ounce (k) is the constant of proportionality — cost and ounces are proportional because k is fixed.',
      },
      {
        conceptId: 't2-percent-change',
        tierId: 2,
        title: 'Percent Increase and Decrease',
        bridgeFormula: 'unit price change from $0.21 to $0.19 = ~9.5% decrease',
        explanation: 'After finding unit prices, you can ask "by what percent is one better than the other?" — combining unit rate skills with percent change to make richer comparisons.',
      },
    ],
  },

  {
    id: 't2-scale-drawings',
    tierId: 2,
    glyph: '🗺',
    title: 'Scale drawings and maps',
    subtitle: 'Using ratios to shrink (or enlarge) the real world',
    tags: ['arithmetic', 'geometry'],
    accessibilityLevel: 'middle',
    visualizationType: 'area-rectangle',
    canvasLabel: 'Scale Drawing Grid',
    conceptTab: {
      summary: 'A scale drawing represents a real object at a fixed ratio between drawing size and actual size. The scale factor connects the two.',
      whyItMatters:
        "Maps, blueprints, model cars, architect plans, and phone-screen graphics all use scale drawings. A city map couldn't exist without a scale — you couldn't fit the real city on paper. Architects draw buildings at 1/4 inch per foot. Scale is how we work with the world's real dimensions in a manageable size.",
      coreIdea:
        "A SCALE is a ratio that relates a measurement on a drawing to the actual measurement.\nExample: 1 cm = 5 m means every 1 cm in the drawing represents 5 real meters.\n\nSCALE FACTOR = drawing length / actual length\nIf scale is 1 cm : 5 m, the scale factor is 1/500 (since 5 m = 500 cm).\n\nFinding actual length:\nactual = drawing measurement ÷ scale factor\nor: actual = drawing measurement × (actual scale unit / drawing scale unit)\n\nFinding drawing length:\ndrawing = actual measurement × scale factor\nor: drawing = actual measurement ÷ (actual scale unit / drawing scale unit)\n\nSimilar figures: two shapes are similar if all corresponding sides have the same ratio (same scale factor) and all corresponding angles are equal.",
      formula: 'scale factor = drawing length / actual length',
      formulaLabel: 'Scale factor:',
      insights: [
        'The scale ratio is a unit rate in disguise. "1 inch = 20 miles" means the unit rate is 20 miles per inch — divide or multiply to convert between drawing and reality.',
        'Scale drawings preserve shape but not size. All angles stay the same; all lengths change by the same factor. These are called "similar" figures in geometry.',
        'Architects write scale as 1/4" = 1\'. This means a 1-foot wall is drawn as a quarter-inch. The scale factor is 1/48 — every drawing measurement is 1/48 of actual.',
      ],
    },
    guided: {
      problemStatement: 'A map has a scale of 2 cm = 50 km. Two cities are 7.5 cm apart on the map. How far apart are they in real life? Also, a third city is actually 175 km away — how far is it on the map?',
      steps: [
        {
          label: 'Find the unit rate',
          math: '50 km / 2 cm = 25 km per cm',
          explanation: 'Divide actual distance by map distance. Each centimeter on the map represents 25 real kilometers.',
        },
        {
          label: 'Convert map distance to actual distance',
          math: '7.5 cm × 25 km/cm = 187.5 km',
          explanation: 'Multiply map distance by the unit rate. The two cities are 187.5 km apart.',
        },
        {
          label: 'Convert actual distance to map distance',
          math: '175 km ÷ 25 km/cm = 7 cm',
          explanation: 'Divide actual distance by the unit rate to get map distance. The third city is 7 cm away on the map.',
          connectionNote: 'The scale sets up a proportional relationship: map/actual = 2/50 = constant. You can also solve with proportions: 2/50 = d/175.',
        },
      ],
      reflectionPrompt: 'If you enlarged a scale drawing by doubling all measurements, how would the area of the drawn shape change? Would it double too?',
    },
    practice: [
      {
        question: 'A drawing uses a scale of 1 inch = 8 feet. A room measures 3.5 inches on the drawing. How wide is the room in real life?',
        mathNotation: '3.5 in × 8 ft/in = ?',
        answer: '28 feet',
        choices: ['11.5 feet', '28 feet', '22.5 feet', '4.375 feet'],
        answerIndex: 1,
        explanation: '3.5 × 8 = 28 feet.',
      },
      {
        question: 'A bridge is 360 m long. A model is built with a scale factor of 1:1200. How long is the model?',
        mathNotation: '360 m ÷ 1200 = ?',
        answer: '0.3 m (30 cm)',
        choices: ['3 m', '0.3 m', '30 m', '0.03 m'],
        answerIndex: 1,
        explanation: '360 ÷ 1200 = 0.3 m = 30 cm.',
      },
      {
        question: 'On a map with scale 1 cm = 25 km, two towns are 175 km apart. How far apart are they on the map?',
        mathNotation: '175 km ÷ 25 km/cm = ?',
        answer: '7 cm',
        choices: ['4.375 cm', '7 cm', '14 cm', '3 cm'],
        answerIndex: 1,
        explanation: '175 ÷ 25 = 7 cm.',
      },
    ],
    connections: [
      {
        conceptId: 't2-proportional-relationships',
        tierId: 2,
        title: 'Proportional Relationships',
        bridgeFormula: 'map/actual = constant scale factor',
        explanation: 'A scale drawing is a proportional relationship. Map distances and actual distances always have the same ratio — the scale factor is the constant of proportionality k.',
      },
      {
        conceptId: 't2-unit-rates-pricing',
        tierId: 2,
        title: 'Unit Rates and Unit Pricing',
        bridgeFormula: '25 km per cm = unit rate',
        explanation: 'The scale is a unit rate: km per cm. Converting between map and real distances is just multiplying or dividing by the unit rate — identical to unit-pricing calculations.',
      },
      {
        conceptId: 't4-triangle-congruence',
        tierId: 4,
        title: 'Similar Triangles',
        bridgeFormula: 'a/a\' = b/b\' = c/c\' (scale factor)',
        explanation: 'Similar triangles are scale drawings of each other. The scale factor between sides of similar triangles is exactly the same concept you use for maps and blueprints.',
      },
    ],
  },

  {
    id: 't2-simple-interest',
    tierId: 2,
    glyph: '$+',
    title: 'Simple interest',
    subtitle: 'How money grows over time at a fixed rate',
    tags: ['arithmetic', 'algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'bar-chart',
    canvasLabel: 'Interest Growth Graph',
    conceptTab: {
      summary: 'Simple interest is a fixed percentage of the original principal charged (or earned) for each time period. Total interest grows linearly with time.',
      whyItMatters:
        "Savings accounts, car loans, personal loans, and bonds all involve interest. Understanding how interest is calculated is a basic financial literacy skill that directly affects your wallet. Borrowing $1,000 at 8% simple interest for 3 years costs you $240 in interest — not knowing this means you can't evaluate financial decisions.",
      coreIdea:
        "SIMPLE INTEREST formula:\nI = P × r × t\n\nWhere:\n• I = interest (the extra money earned or owed)\n• P = principal (starting amount)\n• r = rate (annual interest rate as a decimal)\n• t = time (in years)\n\nTotal amount (principal + interest):\nA = P + I = P(1 + rt)\n\nExample: $2,000 at 5% annual interest for 3 years:\nI = 2000 × 0.05 × 3 = $300\nA = 2000 + 300 = $2,300\n\nFor simple interest, a graph of total amount vs. time is a STRAIGHT LINE. The slope is P×r (dollars of interest per year). This makes it a linear relationship.",
      formula: 'I = Prt   and   A = P(1 + rt)',
      formulaLabel: 'Simple interest:',
      insights: [
        'Simple interest grows LINEARLY — the same dollar amount every year regardless of how much has accumulated. Compound interest (which you\'ll study later) grows on the growing balance, producing exponential growth.',
        'The interest rate r must match the time unit t. If the rate is "annual," then t is in years. If the rate is "monthly," t is in months. Mixing up units is a common and expensive error.',
        'You can rearrange I = Prt to solve for any variable. Need to know the rate? r = I/(Pt). Need the principal? P = I/(rt). One formula, four variables, four possible questions.',
      ],
    },
    guided: {
      problemStatement: 'You deposit $1,500 in a savings account that earns 4% simple interest per year. How much interest will you earn in 2.5 years? What is your total balance?',
      steps: [
        {
          label: 'Identify the values',
          math: 'P = $1,500, r = 0.04, t = 2.5',
          explanation: 'Principal P = $1,500. Rate r = 4% = 0.04 (convert percent to decimal). Time t = 2.5 years.',
        },
        {
          label: 'Calculate the interest',
          math: 'I = 1500 × 0.04 × 2.5 = $150',
          explanation: 'I = P × r × t = 1500 × 0.04 × 2.5 = 1500 × 0.10 = $150.',
        },
        {
          label: 'Find the total amount',
          math: 'A = 1500 + 150 = $1,650',
          explanation: 'Add the interest to the principal: $1,500 + $150 = $1,650.',
          connectionNote: 'Using A = P(1 + rt): 1500 × (1 + 0.04×2.5) = 1500 × 1.10 = $1,650. ✓',
        },
      ],
      reflectionPrompt: 'How would you rearrange I = Prt to find out how long it takes to earn $600 in interest if P = $2,000 and r = 5%? Solve for t.',
    },
    practice: [
      {
        question: 'How much simple interest is earned on $3,000 at 6% per year for 4 years?',
        mathNotation: 'I = 3000 × 0.06 × 4',
        answer: '$720',
        choices: ['$180', '$720', '$360', '$3,720'],
        answerIndex: 1,
        explanation: 'I = 3000 × 0.06 × 4 = 3000 × 0.24 = $720.',
      },
      {
        question: 'A loan of $500 charges $60 in simple interest over 2 years. What is the annual interest rate?',
        mathNotation: 'r = I / (P × t) = 60 / (500 × 2)',
        answer: '6%',
        choices: ['3%', '6%', '12%', '4%'],
        answerIndex: 1,
        explanation: 'r = I/(Pt) = 60/(500×2) = 60/1000 = 0.06 = 6%.',
      },
      {
        question: 'What is the total amount (principal + interest) after investing $2,500 at 3% simple interest for 5 years?',
        mathNotation: 'A = 2500(1 + 0.03 × 5)',
        answer: '$2,875',
        choices: ['$375', '$2,875', '$3,125', '$2,650'],
        answerIndex: 1,
        explanation: 'I = 2500 × 0.03 × 5 = $375. A = 2500 + 375 = $2,875.',
      },
    ],
    connections: [
      {
        conceptId: 't2-percent-change',
        tierId: 2,
        title: 'Percent Increase and Decrease',
        bridgeFormula: 'A = P × (1 + rt) — linear percent growth',
        explanation: 'Simple interest is percent increase applied repeatedly at a fixed base. Each year, interest is rt% of the original principal — a constant percent of P, not of the growing balance.',
      },
      {
        conceptId: 't2-proportional-relationships',
        tierId: 2,
        title: 'Proportional Relationships',
        bridgeFormula: 'I = (Pr)t — interest proportional to time',
        explanation: 'For fixed P and r, the interest I is proportional to time t. The graph of I vs. t is a straight line through the origin with slope Pr — a perfect proportional relationship.',
      },
      {
        conceptId: 't5-exponential-growth',
        tierId: 5,
        title: 'Exponential Growth and Decay',
        bridgeFormula: 'A = P(1 + r)^t (compound) vs P(1 + rt) (simple)',
        explanation: 'Simple interest grows linearly while compound interest grows exponentially. Studying the contrast between I = Prt and A = P(1+r)^t is one of the clearest illustrations of the difference between linear and exponential growth.',
      },
    ],
  },

  {
    id: 't2-absolute-value',
    tierId: 2,
    glyph: '|x|',
    title: 'Absolute value expressions',
    subtitle: 'Distance from zero — and how to solve equations with |x|',
    tags: ['algebra'],
    accessibilityLevel: 'middle',
    visualizationType: 'number-line',
    canvasLabel: 'Absolute Value Number Line',
    conceptTab: {
      summary: 'The absolute value of a number is its distance from zero on the number line — always non-negative. Absolute value equations can have two solutions.',
      whyItMatters:
        "Absolute value appears in error margins (\"within ±0.5°\"), tolerances in manufacturing, distance calculations, and later in calculus. In algebra, it teaches a critical pattern: some equations have two valid solutions that are mirror images of each other. Recognizing this structure is key to higher-level math.",
      coreIdea:
        "The absolute value |x| is the distance from 0 to x, regardless of direction.\n|7| = 7  (7 is 7 units from 0)\n|−7| = 7  (−7 is also 7 units from 0)\n|0| = 0\n\nAbsolute value is always ≥ 0. You can't have negative distance.\n\nEvaluating expressions:\n|3 − 8| = |−5| = 5\n|2x + 1| when x = −3: |2(−3) + 1| = |−5| = 5\n\nSolving absolute value equations:\n|x| = 4 means x = 4 OR x = −4 (two answers — both are 4 away from 0)\n|x − 2| = 5 → two cases:\n  Case 1: x − 2 = 5 → x = 7\n  Case 2: x − 2 = −5 → x = −3\nAlways check that |7−2| = 5 ✓ and |−3−2| = 5 ✓",
      formula: '|a| = a if a ≥ 0,  |a| = −a if a < 0',
      formulaLabel: 'Absolute value definition:',
      insights: [
        'The equation |x| = k has TWO solutions when k > 0 (x = k and x = −k), ONE solution when k = 0 (x = 0), and NO solutions when k < 0 (distance can\'t be negative).',
        'Absolute value can be thought of as a "distance formula on a number line." |a − b| = distance between a and b. So |x − 5| = 3 asks: "which numbers are 3 away from 5?" Answer: 2 and 8.',
        'The two-case method for absolute value equations is a preview of piecewise functions, where different rules apply in different situations. The absolute value IS a piecewise function: f(x) = x if x ≥ 0, −x if x < 0.',
      ],
    },
    guided: {
      problemStatement: 'Solve |2x − 3| = 7. Then interpret the solutions as distances on a number line.',
      steps: [
        {
          label: 'Set up two cases',
          math: '2x − 3 = 7   OR   2x − 3 = −7',
          explanation: 'Since |2x − 3| = 7, the expression (2x − 3) is either +7 or −7 away from zero.',
        },
        {
          label: 'Solve Case 1',
          math: '2x − 3 = 7 → 2x = 10 → x = 5',
          explanation: 'Add 3: 2x = 10. Divide by 2: x = 5.',
        },
        {
          label: 'Solve Case 2',
          math: '2x − 3 = −7 → 2x = −4 → x = −2',
          explanation: 'Add 3: 2x = −4. Divide by 2: x = −2.',
        },
        {
          label: 'Check and interpret',
          math: '|2(5)−3| = |7| = 7 ✓   |2(−2)−3| = |−7| = 7 ✓',
          explanation: 'Both solutions check out. On the number line, x = 5 and x = −2 are each 7 units away from x = 1.5 (the value where 2x−3 = 0).',
          connectionNote: 'The midpoint between the two solutions (5 + (−2))/2 = 1.5 is the "center" of the absolute value expression.',
        },
      ],
      reflectionPrompt: 'What happens if you try to solve |x + 4| = −2? Why does this equation have no solution? What does this tell you about absolute values?',
    },
    practice: [
      {
        question: 'Evaluate |−14 + 6|.',
        mathNotation: '|−14 + 6| = ?',
        answer: '8',
        choices: ['−8', '8', '20', '−20'],
        answerIndex: 1,
        explanation: '−14 + 6 = −8. Then |−8| = 8. Absolute value of −8 is 8.',
      },
      {
        question: 'Solve: |x − 5| = 3',
        mathNotation: '|x − 5| = 3',
        answer: 'x = 8 or x = 2',
        choices: ['x = 8 only', 'x = 2 only', 'x = 8 or x = 2', 'x = −8 or x = −2'],
        answerIndex: 2,
        explanation: 'Case 1: x−5 = 3 → x = 8. Case 2: x−5 = −3 → x = 2. Both: |8−5|=3 ✓ and |2−5|=3 ✓',
      },
      {
        question: 'How many solutions does |2x + 1| = 0 have?',
        mathNotation: '|2x + 1| = 0',
        answer: 'Exactly one: x = −1/2',
        choices: ['No solutions', 'Exactly one: x = −1/2', 'Two solutions', 'Infinitely many'],
        answerIndex: 1,
        explanation: '|expression| = 0 only when the expression equals 0. 2x + 1 = 0 → x = −1/2. Only one solution.',
      },
    ],
    connections: [
      {
        conceptId: 't1-negative-numbers',
        tierId: 1,
        title: 'Negative Numbers and the Number Line',
        bridgeFormula: '|−7| = 7 = distance from 0',
        explanation: 'Absolute value is the natural next concept after negative numbers. Understanding that −7 is "7 units from zero" requires comfort with the number line and negatives.',
      },
      {
        conceptId: 't2-inequalities',
        tierId: 2,
        title: 'Inequalities on the Number Line',
        bridgeFormula: '|x − 3| < 4 means −1 < x < 7',
        explanation: 'Absolute value inequalities combine two concepts: solving absolute value equations and reading number line solution sets. |x − a| < k describes a range of distances, creating a compound inequality.',
      },
      {
        conceptId: 't2-solving-two-step-equations',
        tierId: 2,
        title: 'Solving Two-Step Equations',
        bridgeFormula: '|2x − 3| = 7 → two two-step equations',
        explanation: 'Each case in an absolute value equation is itself a one- or two-step equation. Absolute value equations are simply two algebraic equations packaged together by the "distance" interpretation.',
      },
    ],
  },
];
