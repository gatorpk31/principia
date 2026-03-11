import type { Concept } from '../types';

export const TIER1_CONCEPTS: Concept[] = [
  {
    id: 't1-fractions-intro',
    tierId: 1,
    glyph: '½',
    title: 'What is a fraction?',
    subtitle: 'Sharing things equally — the big idea',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'fraction-bar',
    canvasLabel: 'Fraction Bar',
    conceptTab: {
      summary: 'A fraction is just a way to describe a part of a whole thing.',
      whyItMatters:
        "Imagine you have one pizza and three friends. How do you split it? Fractions are the math tool that answers this exact question — they let us talk about parts of things, not just whole things. You use fractions every day without realizing it: half a sandwich, a quarter tank of gas, 75% battery on your phone.",
      coreIdea:
        "Here's the simple truth: a fraction has two parts. The bottom number (denominator) tells you how many equal pieces the whole thing is cut into. The top number (numerator) tells you how many of those pieces you have.\n\nThink of a chocolate bar with 8 squares. If you eat 3 squares, you've eaten 3/8 of the bar. The bar was cut into 8 equal pieces (denominator = 8), and you had 3 of them (numerator = 3).\n\nThe line in the middle of a fraction is actually a division sign. 3/8 literally means 3 ÷ 8. So fractions and division are secretly the same idea.",
      formula: 'numerator / denominator',
      formulaLabel: 'A fraction =',
      insights: [
        "The denominator (bottom) tells you the size of each piece — bigger denominator means smaller pieces. Cutting a pie into 8 pieces gives you smaller pieces than cutting it into 4.",
        'The numerator (top) is just counting how many of those pieces you have. It works exactly like regular counting.',
        'Every whole number is secretly a fraction. The number 3 is the same as 3/1 — three out of one group of one. This will matter a lot later when we add fractions.',
      ],
    },
    guided: {
      problemStatement:
        'A lemon tart is cut into 6 equal slices. You eat 2 slices. What fraction of the tart did you eat?',
      steps: [
        {
          label: 'Find the denominator',
          math: 'denominator = 6',
          explanation:
            "The whole tart is cut into 6 equal slices. That number — how many pieces the whole is divided into — always goes on the bottom. So our denominator is 6.",
          connectionNote: 'Denominator comes from the Latin "denominare," meaning to name. It names what kind of piece we\'re talking about.',
        },
        {
          label: 'Find the numerator',
          math: 'numerator = 2',
          explanation:
            "You ate 2 slices. The number of pieces you have always goes on the top. So our numerator is 2.",
        },
        {
          label: 'Write the fraction',
          math: '2/6',
          explanation:
            "Put the numerator on top and denominator on bottom. You ate 2/6 of the tart — two out of six equal slices.",
          connectionNote: '2/6 is the same as 1/3. We\'ll learn why when we study equivalent fractions.',
        },
      ],
      reflectionPrompt:
        'Where do you see fractions in your everyday life? Think of something you split or share. How would you write that as a fraction?',
    },
    practice: [
      {
        question: 'A candy bar is split into 4 equal pieces. You take 1 piece. Which fraction shows what you have?',
        mathNotation: '? out of 4 pieces',
        answer: '1/4',
        choices: ['1/4', '4/1', '1/3', '3/4'],
        answerIndex: 0,
        explanation: 'You have 1 piece out of 4 total equal pieces, so the fraction is 1/4. The total pieces (4) go on bottom; your pieces (1) go on top.',
      },
      {
        question: 'In the fraction 5/8, what does the 8 tell you?',
        mathNotation: '5/8',
        answer: 'The whole is cut into 8 equal pieces',
        choices: [
          'The whole is cut into 8 equal pieces',
          'You have 8 pieces',
          'The fraction equals 8',
          '8 pieces were eaten',
        ],
        answerIndex: 0,
        explanation: 'The denominator (bottom number) always tells you how many equal pieces the whole is divided into. The 5 on top tells you how many of those pieces you have.',
      },
      {
        question: 'A class has 20 students. 7 students are wearing red. What fraction of students are wearing red?',
        mathNotation: '7 out of 20',
        answer: '7/20',
        choices: ['20/7', '7/20', '7/13', '13/20'],
        answerIndex: 1,
        explanation: '7 students (numerator) out of 20 total students (denominator) gives us 7/20. The "whole group" is 20 students.',
      },
    ],
    connections: [
      {
        conceptId: 't1-equivalent-fractions',
        tierId: 1,
        title: 'Equivalent Fractions',
        bridgeFormula: '2/6 = 1/3',
        explanation: 'The fraction you just learned about — 2/6 — is the same amount as 1/3. Equivalent fractions are different ways of writing the same portion. Understanding what a fraction IS makes equivalent fractions make sense.',
      },
      {
        conceptId: 't2-proportional-relationships',
        tierId: 2,
        title: 'Proportional Relationships',
        bridgeFormula: 'a/b = c/d',
        explanation: 'Fractions are the foundation of proportions. When two fractions are equal (like 1/2 = 3/6), that\'s a proportion. Everything in Tier 2 about ratios and proportions builds directly on fraction understanding.',
      },
      {
        conceptId: 't7-definition-of-derivative',
        tierId: 7,
        title: 'Definition of the Derivative',
        bridgeFormula: "f'(x) = lim[Δx→0] Δy/Δx",
        explanation: 'The derivative — the core object of calculus — is literally a fraction: a tiny change in y divided by a tiny change in x. The fraction you\'re learning right now (numerator/denominator) is the same structure that defines instantaneous rate of change.',
      },
    ],
  },

  {
    id: 't1-equivalent-fractions',
    tierId: 1,
    glyph: '≡',
    title: 'Equivalent fractions',
    subtitle: 'Same amount, different names',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'fraction-bar',
    canvasLabel: 'Equal Portions',
    conceptTab: {
      summary: 'Equivalent fractions are different fractions that show the exact same amount.',
      whyItMatters:
        "Imagine you and a friend both order pizza. You eat 2/4 of yours; your friend eats 1/2 of theirs. Who ate more? Nobody — you both ate the same amount. 2/4 and 1/2 are equivalent fractions. This idea shows up constantly when you add fractions, compare amounts, or simplify answers.",
      coreIdea:
        "Equivalent fractions are like the same road with different names. Half the pizza is half the pizza whether you call it 1/2, 2/4, 3/6, or 50/100.\n\nHere's how to make equivalent fractions: multiply (or divide) BOTH the top and bottom by the same number. If you do the same thing to both numbers, you're not changing the value — just how it looks.\n\n1/2 → multiply top and bottom by 3 → 3/6. Same amount, different name.\n\nTo simplify a fraction, divide both top and bottom by the same number. This is called 'reducing' and gets you to the simplest name for that amount.",
      formula: 'a/b = (a×n)/(b×n)',
      formulaLabel: 'Making equivalents:',
      insights: [
        'Multiplying or dividing both parts of a fraction by the same number never changes the VALUE — only the name. Think of it like converting 1 dollar to 100 cents: same money, different name.',
        "The simplest form of a fraction is when the top and bottom share no common factor except 1. We call this 'reduced' or 'simplified.' For example, 6/8 simplifies to 3/4 (divide both by 2).",
        'Every fraction has infinite equivalent forms. 1/2 = 2/4 = 3/6 = 4/8 = 50/100 = ... This becomes powerful when adding fractions with different denominators.',
      ],
    },
    guided: {
      problemStatement: 'Are 3/4 and 9/12 equivalent? Show why or why not.',
      steps: [
        {
          label: 'Look for a multiplier',
          math: '4 × ? = 12',
          explanation: 'Compare the denominators. What do you multiply 4 by to get 12? The answer is 3.',
        },
        {
          label: 'Apply the same multiplier to the top',
          math: '3 × 3 = 9',
          explanation: 'Since we multiplied the denominator by 3, we must multiply the numerator by 3 as well. 3 × 3 = 9.',
        },
        {
          label: 'Check equivalence',
          math: '3/4 = 9/12 ✓',
          explanation: 'We got 9/12, which matches what we started with. These fractions ARE equivalent — they name the same amount.',
          connectionNote: 'You can also cross-multiply to check: 3×12 = 36 and 4×9 = 36. Equal products mean equal fractions.',
        },
      ],
      reflectionPrompt: 'Can you find three different equivalent fractions for 1/3? What pattern do you notice in the numerators and denominators?',
    },
    practice: [
      {
        question: 'Which fraction is equivalent to 2/5?',
        mathNotation: '2/5 = ?',
        answer: '4/10',
        choices: ['3/5', '4/10', '2/10', '5/10'],
        answerIndex: 1,
        explanation: 'Multiply both top and bottom by 2: (2×2)/(5×2) = 4/10. This is equivalent to 2/5.',
      },
      {
        question: 'Simplify 8/12 to its lowest terms.',
        mathNotation: '8/12 = ?',
        answer: '2/3',
        choices: ['4/6', '2/3', '1/2', '3/4'],
        answerIndex: 1,
        explanation: 'The GCF of 8 and 12 is 4. Divide both by 4: 8÷4 = 2, 12÷4 = 3. So 8/12 = 2/3. (4/6 is also equivalent but not fully simplified.)',
      },
      {
        question: 'Are 3/5 and 6/10 equivalent?',
        mathNotation: '3/5 vs 6/10',
        answer: 'Yes',
        choices: ['Yes, they are equal', 'No, 6/10 is bigger', 'No, 3/5 is bigger', 'Cannot tell'],
        answerIndex: 0,
        explanation: 'Multiply 3/5 by 2/2: (3×2)/(5×2) = 6/10. Yes, they are equivalent. Same amount, different names.',
      },
    ],
    connections: [
      {
        conceptId: 't1-adding-fractions',
        tierId: 1,
        title: 'Adding and Subtracting Fractions',
        bridgeFormula: '1/3 + 1/6 → 2/6 + 1/6 = 3/6',
        explanation: 'To add fractions with different denominators, you first rewrite them as equivalent fractions with the same denominator. Without equivalent fractions, adding fractions is impossible.',
      },
      {
        conceptId: 't1-percentages',
        tierId: 1,
        title: 'Percentages',
        bridgeFormula: '3/4 = 75/100 = 75%',
        explanation: 'A percentage is just a fraction with denominator 100. Converting 3/4 to a percentage means finding the equivalent fraction with denominator 100.',
      },
    ],
  },

  {
    id: 't1-adding-fractions',
    tierId: 1,
    glyph: '+',
    title: 'Adding and subtracting fractions',
    subtitle: 'The same-denominator rule — and why it exists',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'fraction-bar',
    canvasLabel: 'Adding Fractions',
    conceptTab: {
      summary: 'You can only add fractions directly when they describe pieces of the same size.',
      whyItMatters:
        "Imagine adding 1 apple and 1 orange. The total is 2 pieces of fruit, but they're different things. Fractions work the same way — 1/3 and 1/4 are pieces of DIFFERENT sizes. To add them, you first have to convert them to the same size piece. That's the whole game.",
      coreIdea:
        "SAME denominators: Just add the tops. 2/7 + 3/7 = 5/7. Easy — the pieces are already the same size.\n\nDIFFERENT denominators: Find a common denominator first. This means finding a number that both denominators divide into evenly. Then convert both fractions to that denominator and add.\n\nFor 1/3 + 1/4:\n- Common denominator: 12 (because both 3 and 4 divide into 12)\n- 1/3 = 4/12 (multiply by 4/4)\n- 1/4 = 3/12 (multiply by 3/3)\n- 4/12 + 3/12 = 7/12\n\nSubtraction works exactly the same way — same rule, just subtract the tops.",
      formula: 'a/c + b/c = (a+b)/c',
      formulaLabel: 'Same denominator:',
      insights: [
        "Why can't you just add numerators AND denominators? If 1/2 + 1/2 = 2/4, that would mean half plus half equals half — which is wrong. The denominator tells you the SIZE of each piece. The size doesn't change when you combine pieces.",
        'The Least Common Denominator (LCD) is the smallest number that works as a common denominator. It keeps the numbers from getting huge.',
        'Subtracting fractions is identical to adding — same common denominator rule, just subtract. 5/8 - 2/8 = 3/8.',
      ],
    },
    guided: {
      problemStatement: 'Your recipe needs 2/3 cup of flour and 1/4 cup of sugar. How much dry ingredient is that in total?',
      steps: [
        {
          label: 'Find the LCD (Least Common Denominator)',
          math: 'LCD(3, 4) = 12',
          explanation: 'List multiples of 3: 3, 6, 9, 12. List multiples of 4: 4, 8, 12. The first number on both lists is 12. That\'s our LCD.',
        },
        {
          label: 'Convert 2/3',
          math: '2/3 = 8/12',
          explanation: 'To change the denominator from 3 to 12, multiply by 4. Must also multiply the top by 4: 2×4 = 8. So 2/3 = 8/12.',
        },
        {
          label: 'Convert 1/4',
          math: '1/4 = 3/12',
          explanation: 'To change the denominator from 4 to 12, multiply by 3. Must also multiply the top by 3: 1×3 = 3. So 1/4 = 3/12.',
        },
        {
          label: 'Add',
          math: '8/12 + 3/12 = 11/12',
          explanation: 'Now the pieces are the same size. Just add the tops: 8 + 3 = 11. Keep the denominator: 11/12.',
          connectionNote: 'The answer is 11/12 of a cup — just under a full cup. Always check: does the answer make sense?',
        },
      ],
      reflectionPrompt: 'Why did we need to find a common denominator first? What would have gone wrong if we just added 2/3 + 1/4 = 3/7?',
    },
    practice: [
      {
        question: 'What is 3/8 + 2/8?',
        mathNotation: '3/8 + 2/8 = ?',
        answer: '5/8',
        choices: ['5/16', '5/8', '1/2', '6/8'],
        answerIndex: 1,
        explanation: 'Same denominator! Just add the numerators: 3 + 2 = 5. Keep the denominator 8. Answer is 5/8.',
      },
      {
        question: 'What is 1/2 + 1/3?',
        mathNotation: '1/2 + 1/3 = ?',
        answer: '5/6',
        choices: ['2/5', '2/6', '5/6', '3/6'],
        answerIndex: 2,
        explanation: 'LCD is 6. Convert: 1/2 = 3/6 and 1/3 = 2/6. Then 3/6 + 2/6 = 5/6.',
      },
      {
        question: 'What is 3/4 - 1/6?',
        mathNotation: '3/4 - 1/6 = ?',
        answer: '7/12',
        choices: ['2/3', '7/12', '1/3', '5/12'],
        answerIndex: 1,
        explanation: 'LCD is 12. Convert: 3/4 = 9/12 and 1/6 = 2/12. Then 9/12 - 2/12 = 7/12.',
      },
    ],
    connections: [
      {
        conceptId: 't1-multiplying-fractions',
        tierId: 1,
        title: 'Multiplying and Dividing Fractions',
        bridgeFormula: '(a/b) × (c/d) = ac/bd',
        explanation: 'Multiplication needs no common denominator — you just multiply across. Understanding why addition needs a common denominator makes the contrast with multiplication feel natural and interesting.',
      },
      {
        conceptId: 't2-solving-one-step-equations',
        tierId: 2,
        title: 'Solving One-Step Equations',
        bridgeFormula: 'x + 2/3 = 5/6 → x = 1/6',
        explanation: 'Equations often involve fraction arithmetic. Solving x + 2/3 = 5/6 requires subtracting fractions. The algebra skill and fraction skill combine.',
      },
    ],
  },

  {
    id: 't1-multiplying-fractions',
    tierId: 1,
    glyph: '×',
    title: 'Multiplying and dividing fractions',
    subtitle: '"Of" means multiply — and division flips',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'fraction-bar',
    canvasLabel: 'Fraction Multiplication',
    conceptTab: {
      summary: 'To multiply fractions, multiply the tops together and the bottoms together. Division is multiplication with a flipped second fraction.',
      whyItMatters:
        "\"What is 1/2 of 3/4?\" That's a multiplication problem. In English, the word 'of' means multiply when we're talking about fractions. You use this in cooking all the time: if a recipe makes 24 cookies and you want to make 3/4 of the batch, you multiply 24 × 3/4. Understanding this unlocks proportional thinking for life.",
      coreIdea:
        "MULTIPLICATION: Multiply tops together, multiply bottoms together. No common denominator needed.\n\n(2/3) × (3/5) = (2×3)/(3×5) = 6/15 = 2/5\n\nDIVISION: Division by a fraction means MULTIPLY by its reciprocal (the fraction flipped upside down).\n\n(2/3) ÷ (4/5) = (2/3) × (5/4) = 10/12 = 5/6\n\nWhy flip? Dividing by 2 is the same as multiplying by 1/2. Dividing by 2/3 is the same as multiplying by 3/2. Division and multiplication are always a flip away from each other.",
      formula: '(a/b) ÷ (c/d) = (a/b) × (d/c)',
      formulaLabel: 'Division = multiply by reciprocal:',
      insights: [
        'Multiplying two fractions less than 1 always gives a SMALLER answer. 1/2 of 1/2 is 1/4 — a quarter. This feels weird because we\'re used to multiplication making things bigger. But "half of a half" really is a quarter.',
        "The reciprocal of a fraction is just that fraction flipped. The reciprocal of 3/4 is 4/3. Every number has a reciprocal — and multiplying a number by its reciprocal always gives 1.",
        'Dividing by a fraction is asking "how many of this fraction fit into that fraction?" 1/2 ÷ 1/8 = 4, because four eighths fit into one half.',
      ],
    },
    guided: {
      problemStatement: 'A recipe calls for 2/3 cup of butter. You want to make 3/4 of the recipe. How much butter do you need?',
      steps: [
        {
          label: 'Set up the multiplication',
          math: '(2/3) × (3/4)',
          explanation: '"3/4 of 2/3" means multiplication. The word "of" with fractions always means multiply.',
        },
        {
          label: 'Multiply numerators',
          math: '2 × 3 = 6',
          explanation: 'Multiply the tops (numerators): 2 times 3 equals 6.',
        },
        {
          label: 'Multiply denominators',
          math: '3 × 4 = 12',
          explanation: 'Multiply the bottoms (denominators): 3 times 4 equals 12.',
        },
        {
          label: 'Simplify',
          math: '6/12 = 1/2',
          explanation: 'Divide both 6 and 12 by their common factor 6: 6/12 = 1/2. You need 1/2 cup of butter.',
          connectionNote: 'Tip: you can simplify BEFORE multiplying to keep numbers small. 2/3 × 3/4 — the 3s cancel (top and bottom), leaving 2/4 = 1/2.',
        },
      ],
      reflectionPrompt: 'Without calculating, would 3/4 × 5/6 be more or less than 3/4? Why? What does multiplying by a fraction less than 1 always do?',
    },
    practice: [
      {
        question: 'What is 2/3 × 3/4?',
        mathNotation: '(2/3) × (3/4) = ?',
        answer: '1/2',
        choices: ['5/7', '6/12', '1/2', '2/4'],
        answerIndex: 2,
        explanation: 'Multiply tops: 2×3=6. Multiply bottoms: 3×4=12. So 6/12 = 1/2.',
      },
      {
        question: 'What is 1/2 ÷ 1/4?',
        mathNotation: '(1/2) ÷ (1/4) = ?',
        answer: '2',
        choices: ['1/8', '1/2', '2', '4'],
        answerIndex: 2,
        explanation: 'Flip the second fraction and multiply: 1/2 × 4/1 = 4/2 = 2. Two quarters fit into one half.',
      },
      {
        question: 'A tank is 3/4 full. Each day it loses 1/6 of its contents. How much does it lose in one day?',
        mathNotation: '(3/4) × (1/6) = ?',
        answer: '1/8',
        choices: ['3/24', '1/8', '1/4', '3/10'],
        answerIndex: 1,
        explanation: '(3/4) × (1/6) = 3/24 = 1/8. The tank loses 1/8 of its total capacity per day.',
      },
    ],
    connections: [
      {
        conceptId: 't1-ratios',
        tierId: 1,
        title: 'Ratios and Unit Rates',
        bridgeFormula: 'rate = distance/time',
        explanation: 'Dividing fractions is the same operation as finding a unit rate. Miles per gallon (miles ÷ gallons) is fraction division in disguise.',
      },
      {
        conceptId: 't3-exponent-rules',
        tierId: 3,
        title: 'Exponent Rules',
        bridgeFormula: 'x^(1/2) = √x',
        explanation: 'Fractional exponents are built on fraction multiplication. When you learn that x^(2/3) means "cube root of x squared," the exponent IS a fraction — and the rules combine.',
      },
    ],
  },

  {
    id: 't1-ratios',
    tierId: 1,
    glyph: '∶',
    title: 'Ratios and unit rates',
    subtitle: 'Comparing two amounts — and finding the per-one rate',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'number-line',
    canvasLabel: 'Rate on Number Line',
    conceptTab: {
      summary: 'A ratio compares two amounts. A unit rate is what happens when one of those amounts equals 1.',
      whyItMatters:
        "Speed is a ratio: miles per hour. Price is a ratio: dollars per item. Fuel efficiency is a ratio: miles per gallon. Batting average is a ratio: hits per at-bat. Ratios and unit rates are everywhere. When you compare ANY two things, you're using ratio thinking.",
      coreIdea:
        "A ratio is a comparison of two quantities. If your class has 12 girls and 15 boys, the ratio of girls to boys is 12:15 (read as '12 to 15').\n\nA ratio can be written three ways:\n  12:15\n  12 to 15\n  12/15\n\nA UNIT RATE is a ratio where the second quantity is 1. It answers the question: 'How much per ONE?'\n\nIf you drive 150 miles in 3 hours, your speed is 150/3 = 50 miles per HOUR. That '1 hour' denominator makes it a unit rate.\n\nUnit rates are useful because they let you compare directly. $3.00 for 4 apples vs. $4.50 for 6 apples — which is cheaper? Find the unit rate: $0.75/apple vs. $0.75/apple. Same price!",
      formula: 'unit rate = quantity ÷ units',
      formulaLabel: 'Finding unit rate:',
      insights: [
        'A ratio and a fraction are the same mathematical object. 12:15 and 12/15 are identical — the only difference is what they describe.',
        'Unit rates always have "per 1" in them. Miles per hour = miles per 1 hour. Dollars per pound = dollars per 1 pound. The "per" is always division.',
        'Equal ratios are equivalent fractions. If you know equivalent fractions (which you do!), you already understand proportional reasoning.',
      ],
    },
    guided: {
      problemStatement: 'Store A sells 5 notebooks for $8.75. Store B sells 3 notebooks for $5.10. Which store has the better price per notebook?',
      steps: [
        {
          label: 'Find Store A\'s unit rate',
          math: '$8.75 ÷ 5 = $1.75 per notebook',
          explanation: 'Divide the total cost by the number of items. $8.75 divided by 5 notebooks = $1.75 per notebook.',
        },
        {
          label: 'Find Store B\'s unit rate',
          math: '$5.10 ÷ 3 = $1.70 per notebook',
          explanation: '$5.10 divided by 3 notebooks = $1.70 per notebook.',
        },
        {
          label: 'Compare',
          math: '$1.70 < $1.75',
          explanation: 'Store B is cheaper per notebook ($1.70 vs. $1.75). Store B has the better deal.',
          connectionNote: 'This is unit rate thinking. By reducing both to "per 1," we can compare apples to apples (or notebooks to notebooks).',
        },
      ],
      reflectionPrompt: 'Think of a real situation where you\'d want to find a unit rate to make a decision. What are the two quantities being compared?',
    },
    practice: [
      {
        question: 'A car travels 240 miles in 4 hours. What is the unit rate (speed)?',
        mathNotation: '240 miles ÷ 4 hours = ?',
        answer: '60 miles per hour',
        choices: ['60 mph', '244 mph', '40 mph', '236 mph'],
        answerIndex: 0,
        explanation: '240 ÷ 4 = 60 miles per hour. The unit rate is how far the car travels in exactly 1 hour.',
      },
      {
        question: 'Which is a better deal: 12 eggs for $3.60, or 18 eggs for $4.50?',
        mathNotation: '$3.60÷12 vs $4.50÷18',
        answer: '18 eggs for $4.50',
        choices: ['12 eggs for $3.60', '18 eggs for $4.50', 'They are equal', 'Cannot tell'],
        answerIndex: 1,
        explanation: '12 eggs: $3.60÷12 = $0.30/egg. 18 eggs: $4.50÷18 = $0.25/egg. The 18-egg option is cheaper per egg.',
      },
      {
        question: 'In a survey, 30 out of 50 students prefer math. Write this as a ratio in simplest form.',
        mathNotation: '30:50 simplified',
        answer: '3:5',
        choices: ['30:50', '3:5', '6:10', '15:25'],
        answerIndex: 1,
        explanation: '30/50 simplified by dividing both by 10 gives 3/5, or 3:5. This means 3 out of every 5 students prefer math.',
      },
    ],
    connections: [
      {
        conceptId: 't2-proportional-relationships',
        tierId: 2,
        title: 'Proportional Relationships',
        bridgeFormula: 'y/x = k (constant ratio)',
        explanation: 'A proportional relationship is just a constant ratio throughout a table of values. The "constant of proportionality" k is the unit rate.',
      },
      {
        conceptId: 't7-definition-of-derivative',
        tierId: 7,
        title: 'Definition of the Derivative',
        bridgeFormula: "f'(x) = lim Δy/Δx as Δx→0",
        explanation: 'The derivative is the ultimate unit rate — the rate of change at one exact instant. All rate thinking (speed, slope, growth) leads here.',
      },
    ],
  },

  {
    id: 't1-percentages',
    tierId: 1,
    glyph: '%',
    title: 'Percentages — what they really mean',
    subtitle: 'Per hundred: fractions with a fixed denominator',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'fraction-bar',
    canvasLabel: 'Percent Bar',
    conceptTab: {
      summary: 'A percentage is just a fraction with a denominator of 100. "Per cent" means "per hundred."',
      whyItMatters:
        "Percentages are everywhere: sales taxes, discounts, test scores, tips, interest rates, statistics, weather forecasts. When you understand that 75% just means 75/100, every percentage problem becomes a fraction problem you already know how to solve.",
      coreIdea:
        'Percent literally means "per hundred" (Latin: per centum). So:\n\n75% = 75/100 = 0.75\n30% = 30/100 = 0.30 = 3/10\n100% = 100/100 = 1 (the whole thing)\n\nTo convert fraction → percent: divide top by bottom, then multiply by 100.\n3/4 → 3 ÷ 4 = 0.75 → 0.75 × 100 = 75%\n\nTo find a percent OF a number: convert the percent to a decimal and multiply.\n30% of 80 = 0.30 × 80 = 24',
      formula: 'percent = (part/whole) × 100',
      formulaLabel: 'Percent formula:',
      insights: [
        '100% = 1 = the whole thing. More than 100% means more than the original. 150% of 40 = 60, which is bigger than 40.',
        'To find x% of a number, translate: "of" means multiply, "%" means divide by 100. "40% of 90" = 0.40 × 90 = 36.',
        'Percentages, decimals, and fractions are three languages for the same number. 3/4 = 0.75 = 75%. Moving between them is a key skill.',
      ],
    },
    guided: {
      problemStatement: 'A jacket costs $80. It is on sale for 25% off. What is the sale price?',
      steps: [
        {
          label: 'Convert percent to decimal',
          math: '25% = 25/100 = 0.25',
          explanation: 'To use a percent in math, convert it to a decimal first. Divide by 100: 25 ÷ 100 = 0.25.',
        },
        {
          label: 'Find the discount amount',
          math: '0.25 × $80 = $20',
          explanation: '"25% of $80" means 0.25 × 80 = $20. The discount is $20.',
        },
        {
          label: 'Find the sale price',
          math: '$80 - $20 = $60',
          explanation: 'Subtract the discount from the original price. The sale price is $60.',
          connectionNote: 'Shortcut: 25% off means you pay 75%. So 0.75 × $80 = $60 directly.',
        },
      ],
      reflectionPrompt: 'A shirt is 30% off. Another shirt is already marked down to 70% of its original price. Are these the same deal? Why?',
    },
    practice: [
      {
        question: 'What is 40% of 150?',
        mathNotation: '40% × 150 = ?',
        answer: '60',
        choices: ['40', '60', '110', '190'],
        answerIndex: 1,
        explanation: '40% = 0.40. Then 0.40 × 150 = 60.',
      },
      {
        question: 'A student got 18 out of 24 questions correct. What percent is that?',
        mathNotation: '(18/24) × 100 = ?',
        answer: '75%',
        choices: ['18%', '24%', '75%', '80%'],
        answerIndex: 2,
        explanation: '18 ÷ 24 = 0.75. Then 0.75 × 100 = 75%.',
      },
      {
        question: 'A price increased from $50 to $65. What is the percent increase?',
        mathNotation: '(change/original) × 100 = ?',
        answer: '30%',
        choices: ['15%', '25%', '30%', '35%'],
        answerIndex: 2,
        explanation: 'Change = $65 - $50 = $15. Percent increase = (15/50) × 100 = 30%.',
      },
    ],
    connections: [
      {
        conceptId: 't2-proportional-relationships',
        tierId: 2,
        title: 'Proportional Relationships',
        bridgeFormula: 'part = percent × whole',
        explanation: 'Percentage problems are proportional relationships. "30% of 80 = 24" is the same structure as "for every 100 units, I have 30." Proportions formalize this pattern.',
      },
      {
        conceptId: 't5-exponential-growth',
        tierId: 5,
        title: 'Exponential Growth and Decay',
        bridgeFormula: 'A = P(1 + r)^t',
        explanation: 'Compound interest and exponential growth are built on percentages. A 5% annual growth rate applied repeatedly uses the same percent-of-a-number idea you\'re learning right now.',
      },
    ],
  },

  {
    id: 't1-negative-numbers',
    tierId: 1,
    glyph: '−',
    title: 'Negative numbers and the number line',
    subtitle: 'Numbers below zero — debt, temperature, and direction',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'number-line',
    canvasLabel: 'Number Line',
    conceptTab: {
      summary: 'Negative numbers represent amounts less than zero — below freezing, in debt, or moving backward.',
      whyItMatters:
        "Your bank account can go negative. Temperature can go below zero. An elevator can go below ground level. Football teams lose yards. Negative numbers exist because the real world has quantities that go in both directions — and math needs to describe ALL of those situations.",
      coreIdea:
        "The number line goes in both directions from zero. To the right: positive numbers (1, 2, 3...). To the left: negative numbers (−1, −2, −3...).\n\nRules for arithmetic with negatives:\n• Adding a negative is the same as subtracting: 5 + (−3) = 5 − 3 = 2\n• Two negatives cancel: −(−5) = 5\n• Multiplying same signs → positive: (−3) × (−4) = +12\n• Multiplying different signs → negative: 3 × (−4) = −12\n\nAbsolute value |x| = distance from zero. |−7| = 7. Distance is always positive.",
      formula: '|a| = distance from 0',
      formulaLabel: 'Absolute value:',
      insights: [
        'The number line has a direction. Positive means right/up/forward. Negative means left/down/backward. This directional thinking shows up in vectors, coordinates, and calculus.',
        'Subtracting is adding the opposite. 8 − 5 is the same as 8 + (−5). This is why subtraction and addition are really one operation.',
        'Two negatives multiplied give a positive. Why? Think of "negative" as "flip direction." Flipping twice returns you to where you started.',
      ],
    },
    guided: {
      problemStatement: 'At 8 AM the temperature is −6°F. By noon it has risen 15 degrees. What is the noon temperature?',
      steps: [
        {
          label: 'Set up the addition',
          math: '−6 + 15',
          explanation: 'We start at −6 and go UP 15 degrees. Going up means adding a positive number.',
        },
        {
          label: 'Use the number line',
          math: '−6 + 15 = +9',
          explanation: 'Start at −6. Move right 15 spaces. You pass through zero (that takes 6 steps) and continue 9 more. End up at +9.',
          connectionNote: 'This is absolute value thinking: you need 6 steps to reach zero from −6, leaving 15−6=9 steps into positive territory.',
        },
      ],
      reflectionPrompt: 'What does it mean for a number to have an absolute value of 5? How many numbers have this property? What are they?',
    },
    practice: [
      {
        question: 'What is −3 + (−4)?',
        mathNotation: '−3 + (−4) = ?',
        answer: '−7',
        choices: ['7', '−7', '1', '−1'],
        answerIndex: 1,
        explanation: 'Adding two negatives: the negatives add together. −3 + (−4) = −7. You move 4 MORE to the left from −3.',
      },
      {
        question: 'What is (−5) × (−3)?',
        mathNotation: '(−5) × (−3) = ?',
        answer: '15',
        choices: ['−15', '15', '−8', '8'],
        answerIndex: 1,
        explanation: 'Negative × negative = positive. (−5) × (−3) = +15. Two direction-flips cancel each other.',
      },
      {
        question: 'Which has a greater absolute value: −9 or 7?',
        mathNotation: '|−9| vs |7|',
        answer: '−9',
        choices: ['7, because it is positive', '−9, because |−9| = 9 > 7', 'They are equal', 'Cannot compare'],
        answerIndex: 1,
        explanation: '|−9| = 9 and |7| = 7. Since 9 > 7, the number −9 has the greater absolute value.',
      },
    ],
    connections: [
      {
        conceptId: 't2-inequalities',
        tierId: 2,
        title: 'Inequalities on the Number Line',
        bridgeFormula: '−3 < 2 on the number line',
        explanation: 'Inequalities live on the number line. Understanding that −3 is to the LEFT of 2 (and therefore less than 2) requires number line intuition with negatives.',
      },
      {
        conceptId: 't3-absolute-value-equations',
        tierId: 3,
        title: 'Absolute Value Equations',
        bridgeFormula: '|x − 3| = 5',
        explanation: 'Absolute value equations show up in Algebra I. Solving |x − 3| = 5 requires understanding that absolute value means distance from zero on the number line.',
      },
    ],
  },

  {
    id: 't1-order-of-operations',
    tierId: 1,
    glyph: '∘',
    title: 'Order of operations',
    subtitle: "Why PEMDAS exists — and what it's really for",
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'generic',
    canvasLabel: 'Order of Operations',
    conceptTab: {
      summary: 'Order of operations is a set of agreed-upon rules that makes sure everyone who reads a math expression gets the same answer.',
      whyItMatters:
        "Math is a language. And like any language, it needs grammar — rules that make sure everyone reading the same sentence understands it the same way. Without order of operations, the expression 2 + 3 × 4 could mean 20 (if you add first) or 14 (if you multiply first). The rules exist so we all agree.",
      coreIdea:
        "PEMDAS is the agreed-upon order:\n\n1. Parentheses — do what's inside first\n2. Exponents — powers (we'll learn these soon)\n3. Multiplication and Division — left to right\n4. Addition and Subtraction — left to right\n\nIMPORTANT: Multiplication and Division have equal priority — do them left to right. Same for Addition and Subtraction.\n\n2 + 3 × 4:\n→ Multiplication first: 3 × 4 = 12\n→ Then addition: 2 + 12 = 14\n\n(2 + 3) × 4:\n→ Parentheses first: 2 + 3 = 5\n→ Then multiplication: 5 × 4 = 20",
      formula: 'P → E → MD (left→right) → AS (left→right)',
      formulaLabel: 'PEMDAS order:',
      insights: [
        "PEMDAS is an agreement, not a law of the universe. Different calculators handle it differently — this is why always-connected programming languages define these rules strictly.",
        'Parentheses are the great override. If you want addition done before multiplication, PUT IT IN PARENTHESES. Parentheses are how you communicate intent.',
        'Division and multiplication have equal rank — go left to right. 12 ÷ 3 × 2 = (12÷3)×2 = 4×2 = 8. NOT 12÷(3×2) = 12÷6 = 2.',
      ],
    },
    guided: {
      problemStatement: 'Evaluate: 3 + 4 × (8 − 2) ÷ 2 − 1',
      steps: [
        {
          label: 'Parentheses first',
          math: '8 − 2 = 6 → 3 + 4 × 6 ÷ 2 − 1',
          explanation: 'The expression inside parentheses is (8 − 2) = 6. Replace it.',
        },
        {
          label: 'Multiply and divide left to right',
          math: '4 × 6 = 24 → 3 + 24 ÷ 2 − 1',
          explanation: 'Going left to right: multiplication first. 4 × 6 = 24.',
        },
        {
          label: 'Continue division',
          math: '24 ÷ 2 = 12 → 3 + 12 − 1',
          explanation: 'Next: division. 24 ÷ 2 = 12.',
        },
        {
          label: 'Add and subtract left to right',
          math: '3 + 12 = 15 → 15 − 1 = 14',
          explanation: 'Finally, addition and subtraction left to right: 3 + 12 = 15, then 15 − 1 = 14.',
          connectionNote: 'This order matters. Try doing addition first: you\'d get a different (wrong) answer.',
        },
      ],
      reflectionPrompt: 'What would happen to the answer if someone forgot to apply PEMDAS and just went left to right? Try it — what number do you get?',
    },
    practice: [
      {
        question: 'What is 2 + 3 × 4?',
        mathNotation: '2 + 3 × 4 = ?',
        answer: '14',
        choices: ['20', '14', '24', '9'],
        answerIndex: 1,
        explanation: 'Multiply first: 3 × 4 = 12. Then add: 2 + 12 = 14. (Not 5 × 4 = 20, which would be wrong.)',
      },
      {
        question: 'What is (6 + 2) × 3 − 4?',
        mathNotation: '(6 + 2) × 3 − 4 = ?',
        answer: '20',
        choices: ['16', '20', '18', '22'],
        answerIndex: 1,
        explanation: 'Parentheses: 6+2=8. Then multiply: 8×3=24. Then subtract: 24−4=20.',
      },
      {
        question: 'What is 20 ÷ 4 × 2?',
        mathNotation: '20 ÷ 4 × 2 = ?',
        answer: '10',
        choices: ['2.5', '10', '40', '5'],
        answerIndex: 1,
        explanation: 'Multiplication and division have equal priority — go left to right. First 20÷4=5, then 5×2=10.',
      },
    ],
    connections: [
      {
        conceptId: 't3-exponent-rules',
        tierId: 3,
        title: 'Exponent Rules',
        bridgeFormula: '2³ comes before × in PEMDAS',
        explanation: 'Exponents (the E in PEMDAS) come before multiplication. Knowing where exponents fit in order of operations becomes essential when you learn exponent rules in Algebra I.',
      },
      {
        conceptId: 't3-linear-equations-slope',
        tierId: 3,
        title: 'Linear Equations and Slope',
        bridgeFormula: 'y = 2x + 3 — multiply before add',
        explanation: 'Every time you evaluate a linear equation like y = 2x + 3, you\'re applying PEMDAS: multiplication (2×x) before addition (+3). PEMDAS is embedded in every algebraic expression.',
      },
    ],
  },
];
