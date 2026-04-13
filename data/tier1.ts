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
    visualizationType: 'fraction-equivalence',
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
    visualizationType: 'fraction-arithmetic',
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
    visualizationType: 'fraction-multiply',
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
    visualizationType: 'ratio-tape',
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
    visualizationType: 'percent-fill',
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
    visualizationType: 'negative-number-line',
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
    visualizationType: 'pemdas-builder',
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

  {
    id: 't1-ordering-fractions',
    tierId: 1,
    glyph: '≺',
    title: 'Ordering fractions',
    subtitle: 'Which fraction is bigger — and how to know for sure',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'fraction-ordering',
    canvasLabel: 'Fraction Comparison Bar',
    conceptTab: {
      summary: 'To compare fractions, convert them to the same denominator — then the bigger numerator wins.',
      whyItMatters:
        "Which is more — 3/4 of a pizza or 5/6 of the same pizza? You can't just look at the top numbers (3 vs. 5) or the bottom numbers (4 vs. 6) alone. Comparing fractions is a skill that comes up in cooking, measurement, shopping, and anywhere you make decisions with parts of things.",
      coreIdea:
        "When fractions have the SAME denominator, comparison is easy: bigger numerator = bigger fraction. 5/8 > 3/8 because both have pieces of the same size and 5 of them is more than 3.\n\nWhen denominators are DIFFERENT, you need a common denominator before you can compare. Rewrite both fractions with the same denominator, then compare the numerators.\n\nTo compare 3/4 and 5/6:\n- LCD of 4 and 6 is 12\n- 3/4 = 9/12\n- 5/6 = 10/12\n- Since 10/12 > 9/12, we know 5/6 > 3/4\n\nTwo useful shortcuts:\n• Cross-multiply: 3/4 vs. 5/6 → 3×6=18 vs. 4×5=20. Since 18 < 20, 3/4 < 5/6.\n• Benchmark: Is the fraction bigger or smaller than 1/2? 3/5 > 1/2 (numerator more than half the denominator); 2/7 < 1/2.",
      formula: 'a/b < c/d  ⟺  a×d < b×c',
      formulaLabel: 'Cross-multiply comparison:',
      insights: [
        'Larger denominator means SMALLER pieces. So 1/8 < 1/4 — even though 8 > 4. More cuts means smaller slices.',
        'The benchmark of 1/2 is powerful. Any fraction where the numerator is more than half the denominator is greater than 1/2. This lets you quickly place fractions on the number line.',
        'Cross-multiplication is a shortcut for finding a common denominator and comparing. It works for any two fractions and avoids the intermediate step.',
      ],
    },
    guided: {
      problemStatement: 'Order these fractions from least to greatest: 2/3, 1/2, 5/6.',
      steps: [
        {
          label: 'Find the LCD',
          math: 'LCD(3, 2, 6) = 6',
          explanation: 'List multiples: 3→3,6; 2→2,4,6; 6→6. The smallest number on all three lists is 6.',
        },
        {
          label: 'Convert all fractions to sixths',
          math: '2/3 = 4/6, 1/2 = 3/6, 5/6 = 5/6',
          explanation: 'Multiply each fraction top and bottom to reach denominator 6. 2/3×(2/2)=4/6; 1/2×(3/3)=3/6; 5/6 already has denominator 6.',
        },
        {
          label: 'Compare the numerators',
          math: '3/6 < 4/6 < 5/6',
          explanation: 'Now the pieces are the same size — just compare the tops: 3 < 4 < 5.',
        },
        {
          label: 'Translate back to original fractions',
          math: '1/2 < 2/3 < 5/6',
          explanation: 'The order of the converted fractions matches the order of the originals: 1/2 < 2/3 < 5/6.',
          connectionNote: 'Notice that 5/6 is closest to 1 (one piece shy of a whole). 1/2 is the benchmark midpoint.',
        },
      ],
      reflectionPrompt: 'Without calculating, which is larger: 99/100 or 100/101? What reasoning can you use without finding a common denominator?',
    },
    practice: [
      {
        question: 'Which fraction is larger: 3/5 or 2/3?',
        mathNotation: '3/5  vs  2/3',
        answer: '2/3',
        choices: ['3/5', '2/3', 'They are equal', 'Cannot tell'],
        answerIndex: 1,
        explanation: 'Cross-multiply: 3×3=9 vs. 5×2=10. Since 9 < 10, we have 3/5 < 2/3. So 2/3 is larger.',
      },
      {
        question: 'Order from least to greatest: 1/4, 1/3, 1/6.',
        mathNotation: '1/4, 1/3, 1/6 → least to greatest',
        answer: '1/6 < 1/4 < 1/3',
        choices: ['1/6 < 1/4 < 1/3', '1/3 < 1/4 < 1/6', '1/4 < 1/6 < 1/3', '1/6 < 1/3 < 1/4'],
        answerIndex: 0,
        explanation: 'All have numerator 1 — larger denominator means smaller piece. 6 is the largest denominator, so 1/6 is smallest. Order: 1/6 < 1/4 < 1/3.',
      },
      {
        question: 'Which fraction is closest to 1?',
        mathNotation: '5/6, 7/8, 3/4, 9/10',
        answer: '9/10',
        choices: ['5/6', '7/8', '3/4', '9/10'],
        answerIndex: 3,
        explanation: 'Each fraction is "one piece away from a whole": 1/6, 1/8, 1/4, and 1/10 away respectively. 1/10 is the smallest gap, so 9/10 is closest to 1.',
      },
    ],
    connections: [
      {
        conceptId: 't1-equivalent-fractions',
        tierId: 1,
        title: 'Equivalent Fractions',
        bridgeFormula: 'a/b = (a×n)/(b×n)',
        explanation: 'Finding a common denominator to compare fractions uses the same multiplication technique as making equivalent fractions. Ordering fractions is equivalent fractions applied.',
      },
      {
        conceptId: 't1-gcf-lcm',
        tierId: 1,
        title: 'GCF and LCM',
        bridgeFormula: 'LCD = LCM(denominator₁, denominator₂)',
        explanation: 'The Least Common Denominator you use to compare fractions IS the Least Common Multiple of the denominators. GCF and LCM give you the tools to find it efficiently.',
      },
      {
        conceptId: 't2-inequalities',
        tierId: 2,
        title: 'Inequalities on the Number Line',
        bridgeFormula: '3/4 < 5/6 on number line',
        explanation: 'Comparing fractions is the same as placing them on a number line and using inequality symbols. Fraction ordering and inequality notation go hand in hand.',
      },
    ],
  },

  {
    id: 't1-mixed-numbers',
    tierId: 1,
    glyph: '1½',
    title: 'Mixed numbers and improper fractions',
    subtitle: 'Two ways to write amounts bigger than one',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'mixed-numbers',
    canvasLabel: 'Mixed Number Bar',
    conceptTab: {
      summary: 'A mixed number combines a whole number and a fraction. An improper fraction has a numerator larger than its denominator. They are the same amount written differently.',
      whyItMatters:
        "A recipe calls for 2½ cups of flour — that's a mixed number. A calculator might display 5/2 — that's an improper fraction. You'll encounter both forms constantly in cooking, carpentry, time calculations, and everyday measurement. Knowing how to switch between them is essential for doing arithmetic with amounts larger than 1.",
      coreIdea:
        "MIXED NUMBER: A whole number and a proper fraction side by side. Example: 2¾ means 2 wholes and 3/4 more.\n\nIMPROPER FRACTION: Numerator ≥ denominator. Example: 11/4. It just means more than one whole.\n\nConverting mixed → improper:\n2¾ → (2 × 4 + 3)/4 = 11/4\nMultiply whole number by denominator, add the numerator, put over same denominator.\n\nConverting improper → mixed:\n11/4 → divide 11 ÷ 4 = 2 remainder 3 → 2 and 3/4 → 2¾\nDivide to find the whole number; the remainder becomes the new numerator.\n\nFor arithmetic (adding, subtracting, multiplying fractions), it's usually easier to convert mixed numbers to improper fractions first.",
      formula: 'a b/c = (a×c + b)/c',
      formulaLabel: 'Mixed to improper:',
      insights: [
        'An improper fraction is not "wrong" — the name is misleading. It\'s just a fraction greater than 1. Improper fractions are actually EASIER to multiply and divide with.',
        'The denominator stays the same when you convert. 2¾ and 11/4 both have denominator 4 — they both talk about "fourths." Only how many fourths changes.',
        'Every whole number is an improper fraction. The number 3 = 3/1 = 6/2 = 12/4. Understanding this makes adding mixed numbers with fractions more natural.',
      ],
    },
    guided: {
      problemStatement: 'A board is 3 and 2/5 feet long. Convert this to an improper fraction, then add another board that is 7/5 feet long.',
      steps: [
        {
          label: 'Convert 3 2/5 to an improper fraction',
          math: '(3 × 5 + 2)/5 = 17/5',
          explanation: 'Multiply the whole number (3) by the denominator (5), then add the numerator (2). Put that over the original denominator: 17/5.',
        },
        {
          label: 'Add the fractions',
          math: '17/5 + 7/5 = 24/5',
          explanation: 'Same denominators — just add the numerators: 17 + 7 = 24. Total is 24/5 feet.',
        },
        {
          label: 'Convert back to a mixed number',
          math: '24 ÷ 5 = 4 remainder 4 → 4 4/5',
          explanation: 'Divide 24 by 5: 5 goes in 4 times (4×5=20), with 4 left over. So 24/5 = 4 and 4/5 feet.',
          connectionNote: 'Always check: 4 4/5 ≈ 4.8 feet, and 3.4 + 1.4 = 4.8. ✓',
        },
      ],
      reflectionPrompt: 'Why is it easier to add mixed numbers after converting to improper fractions? Try adding 1½ + 2¾ both ways and compare.',
    },
    practice: [
      {
        question: 'Convert 3 2/7 to an improper fraction.',
        mathNotation: '3 2/7 = ?/7',
        answer: '23/7',
        choices: ['5/7', '23/7', '32/7', '17/7'],
        answerIndex: 1,
        explanation: '3×7 = 21, then 21 + 2 = 23. Answer is 23/7.',
      },
      {
        question: 'Convert 19/4 to a mixed number.',
        mathNotation: '19/4 = ?',
        answer: '4 3/4',
        choices: ['4 3/4', '5 1/4', '3 4/4', '4 4/4'],
        answerIndex: 0,
        explanation: '19 ÷ 4 = 4 remainder 3. So 19/4 = 4 and 3/4.',
      },
      {
        question: 'Add: 1 1/3 + 2 2/3',
        mathNotation: '1 1/3 + 2 2/3 = ?',
        answer: '4',
        choices: ['3 3/3', '4', '3 2/3', '4 1/3'],
        answerIndex: 1,
        explanation: 'Convert: 4/3 + 8/3 = 12/3 = 4. Or add whole numbers (1+2=3) and fractions (1/3+2/3=1), then 3+1=4.',
      },
    ],
    connections: [
      {
        conceptId: 't1-adding-fractions',
        tierId: 1,
        title: 'Adding and Subtracting Fractions',
        bridgeFormula: '1 2/5 + 3/5 → 7/5 + 3/5 = 10/5 = 2',
        explanation: 'Adding mixed numbers is easiest after converting to improper fractions — then you apply the same addition rules you already know.',
      },
      {
        conceptId: 't1-ordering-fractions',
        tierId: 1,
        title: 'Ordering Fractions',
        bridgeFormula: '2 1/3 vs 7/3 — they are equal',
        explanation: 'Comparing mixed numbers and improper fractions requires converting to a common form first. Your ordering skills extend naturally to values greater than 1.',
      },
      {
        conceptId: 't1-decimals-intro',
        tierId: 1,
        title: 'Decimals — Fractions in Disguise',
        bridgeFormula: '2 3/4 = 2.75',
        explanation: 'Mixed numbers and decimals both represent numbers greater than 1 with a fractional part. 2¾ and 2.75 are the same number in two notations.',
      },
    ],
  },

  {
    id: 't1-decimals-intro',
    tierId: 1,
    glyph: '0.1',
    title: 'Decimals — fractions in disguise',
    subtitle: 'Tenths, hundredths, thousandths — the place-value extension',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'decimal-slider',
    canvasLabel: 'Decimal Number Line',
    conceptTab: {
      summary: 'A decimal is just a fraction whose denominator is a power of 10 (10, 100, 1000…), written using a dot instead of a fraction bar.',
      whyItMatters:
        "Money is decimals: $3.75 means 3 dollars and 75 hundredths of a dollar. Measurements are decimals: 1.5 meters, 2.75 miles. Science uses decimals: 0.003 grams. Percentages become decimals the moment you calculate with them. Decimals are how the world expresses fractions in everyday life — understanding them deeply makes every practical calculation easier.",
      coreIdea:
        "The decimal point separates the whole number part from the fractional part.\n\nPlace values to the right of the decimal:\n• Tenths: 0.1 = 1/10\n• Hundredths: 0.01 = 1/100\n• Thousandths: 0.001 = 1/1000\n\nSo 0.37 = 3/10 + 7/100 = 30/100 + 7/100 = 37/100.\n\nFraction ↔ Decimal conversions:\n• Fraction → decimal: divide numerator by denominator. 3/4 = 3 ÷ 4 = 0.75\n• Decimal → fraction: write as fraction over matching power of 10, then simplify. 0.6 = 6/10 = 3/5\n\nTerminating vs. repeating decimals:\n• 1/4 = 0.25 (terminates — ends)\n• 1/3 = 0.333… = 0.3̄ (repeats forever)",
      formula: '0.xyz = x/10 + y/100 + z/1000',
      formulaLabel: 'Decimal place values:',
      insights: [
        'Adding zeros after the last decimal digit does NOT change the value. 0.5 = 0.50 = 0.500. This is the decimal version of equivalent fractions: 1/2 = 5/10 = 50/100.',
        'Multiplying a decimal by 10 just shifts the decimal point one place RIGHT. 0.37 × 10 = 3.7. Dividing by 10 shifts it LEFT. This is why the metric system is so convenient.',
        'Every fraction is either a terminating or repeating decimal — never random. Fractions whose denominators (in simplest form) only have factors of 2 and 5 terminate; all others repeat.',
      ],
    },
    guided: {
      problemStatement: 'Convert 3/8 to a decimal, and then place 0.375 on a number line between 0 and 1.',
      steps: [
        {
          label: 'Divide numerator by denominator',
          math: '3 ÷ 8 = 0.375',
          explanation: 'Long divide: 3.000 ÷ 8. 8 goes into 30 three times (24), remainder 6. 8 into 60 seven times (56), remainder 4. 8 into 40 exactly five times. Result: 0.375.',
        },
        {
          label: 'Identify the place values',
          math: '0.375 = 3/10 + 7/100 + 5/1000',
          explanation: '3 is in the tenths place, 7 in the hundredths place, 5 in the thousandths place.',
        },
        {
          label: 'Place on number line',
          math: '0 ──── 0.375 ──── 0.5 ──── 1',
          explanation: '0.375 is between 0 and 0.5 (which is 1/2). It is closer to 0.5 than to 0, sitting at just over 3/8 of the way from 0 to 1.',
          connectionNote: '0.375 = 3/8, and we can verify: 0.375 × 8 = 3. ✓',
        },
      ],
      reflectionPrompt: 'Will 1/7 convert to a terminating or repeating decimal? Try dividing 1 ÷ 7 — what pattern do you notice in the remainders?',
    },
    practice: [
      {
        question: 'Convert 3/5 to a decimal.',
        mathNotation: '3 ÷ 5 = ?',
        answer: '0.6',
        choices: ['0.35', '0.6', '0.53', '0.15'],
        answerIndex: 1,
        explanation: '3 ÷ 5 = 0.6. Or equivalently: 3/5 = 6/10 = 0.6.',
      },
      {
        question: 'Convert 0.125 to a fraction in simplest form.',
        mathNotation: '0.125 = ?',
        answer: '1/8',
        choices: ['1/4', '1/8', '125/10', '5/40'],
        answerIndex: 1,
        explanation: '0.125 = 125/1000. GCF of 125 and 1000 is 125. 125÷125 = 1; 1000÷125 = 8. So 0.125 = 1/8.',
      },
      {
        question: 'Which decimal is greatest: 0.3, 0.31, 0.309?',
        mathNotation: '0.3 vs 0.31 vs 0.309',
        answer: '0.31',
        choices: ['0.3', '0.31', '0.309', 'They are equal'],
        answerIndex: 1,
        explanation: 'Write with same decimal places: 0.300, 0.310, 0.309. Comparing: 310 > 309 > 300. So 0.31 is greatest.',
      },
    ],
    connections: [
      {
        conceptId: 't1-percentages',
        tierId: 1,
        title: 'Percentages — What They Really Mean',
        bridgeFormula: '0.75 = 75/100 = 75%',
        explanation: 'Percentages are decimals multiplied by 100. Converting between percents and decimals is a two-step shift of the decimal point. Mastering decimals makes percentage calculations automatic.',
      },
      {
        conceptId: 't1-mixed-numbers',
        tierId: 1,
        title: 'Mixed Numbers and Improper Fractions',
        bridgeFormula: '2 3/4 = 2.75',
        explanation: 'Every mixed number corresponds to a decimal with a whole-number part and a decimal fraction part. The decimal system and mixed-number notation describe the same thing differently.',
      },
      {
        conceptId: 't2-proportional-relationships',
        tierId: 2,
        title: 'Proportional Relationships',
        bridgeFormula: 'y = 0.25x (unit price in decimals)',
        explanation: 'Unit rates and constants of proportionality are almost always written as decimals in practice. 25 cents per item = $0.25 per item = the slope of a proportional graph.',
      },
    ],
  },

  {
    id: 't1-factors-multiples',
    tierId: 1,
    glyph: '×',
    title: 'Factors and multiples',
    subtitle: 'What divides evenly — and the times-table connection',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'factor-tree',
    canvasLabel: 'Factor Pairs',
    conceptTab: {
      summary: 'A factor divides a number evenly. A multiple is what you get when you multiply a number by any integer.',
      whyItMatters:
        "Factors and multiples are the grammar of arithmetic. You need them to simplify fractions (find common factors), add fractions (find common multiples), tell whether numbers are prime or composite, and understand divisibility. Every branch of number theory starts here.",
      coreIdea:
        "FACTORS of a number n: all whole numbers that divide n evenly (no remainder).\nFactors of 12: 1, 2, 3, 4, 6, 12 — because 12 ÷ 1 = 12, 12 ÷ 2 = 6, 12 ÷ 3 = 4, etc.\n\nFactor pairs help you find all factors systematically: (1,12), (2,6), (3,4). When the pair numbers cross over each other, you've found them all.\n\nMULTIPLES of a number n: n×1, n×2, n×3, …\nMultiples of 4: 4, 8, 12, 16, 20, … (the 4-times table, going forever)\n\nPRIME vs. COMPOSITE:\n• Prime: exactly 2 factors — 1 and itself. Examples: 2, 3, 5, 7, 11, 13…\n• Composite: more than 2 factors. Examples: 4, 6, 9, 12…\n• Special: 1 is neither prime nor composite.\n\nPRIME FACTORIZATION: Breaking a number into a product of prime factors. 36 = 2 × 2 × 3 × 3 = 2² × 3²",
      formula: 'n = p₁^a × p₂^b × p₃^c × …',
      formulaLabel: 'Prime factorization:',
      insights: [
        'Every number has a unique prime factorization — this is called the Fundamental Theorem of Arithmetic. Like a fingerprint, each number\'s prime factorization is one-of-a-kind.',
        'To find all factors efficiently, only check divisors up to √n. If n = 36, check up to 6 — because any factor larger than 6 pairs with one smaller than 6.',
        'Factors of n and multiples of n are opposites: 3 is a factor of 12, and 12 is a multiple of 3. "Factor" and "multiple" are two sides of the same division relationship.',
      ],
    },
    guided: {
      problemStatement: 'Find all the factors of 36, identify whether 36 is prime or composite, and write its prime factorization.',
      steps: [
        {
          label: 'Find factor pairs systematically',
          math: '(1,36), (2,18), (3,12), (4,9), (6,6)',
          explanation: 'Test each number: does it divide 36 evenly? Check up to √36 = 6. Factor pairs: (1,36), (2,18), (3,12), (4,9), (6,6). After 6, you start repeating.',
        },
        {
          label: 'List all factors',
          math: '1, 2, 3, 4, 6, 9, 12, 18, 36',
          explanation: 'Combine both numbers from each pair: 1,36,2,18,3,12,4,9,6. Sort them: 1,2,3,4,6,9,12,18,36. Nine factors total.',
        },
        {
          label: 'Prime or composite?',
          math: '36 has 9 factors → composite',
          explanation: 'Because 36 has more than just 1 and 36 as factors, it is composite.',
        },
        {
          label: 'Prime factorization',
          math: '36 = 4 × 9 = (2×2) × (3×3) = 2² × 3²',
          explanation: 'Break 36 into factors, keep breaking until all factors are prime: 36 → 4×9 → 2×2×3×3 → 2² × 3².',
          connectionNote: 'This prime factorization is the key ingredient for finding the GCF and LCM of 36 with any other number.',
        },
      ],
      reflectionPrompt: 'Is the number of factors always odd? Investigate by counting factors of 9, 16, 25 compared to 12, 18, 20. What determines whether a number has an odd number of factors?',
    },
    practice: [
      {
        question: 'Which of the following is a factor of 48?',
        mathNotation: 'Which divides 48 evenly?',
        answer: '16',
        choices: ['7', '16', '11', '20'],
        answerIndex: 1,
        explanation: '48 ÷ 16 = 3 exactly. Check others: 48÷7 ≈ 6.86, 48÷11 ≈ 4.36, 48÷20 = 2.4. Only 16 divides evenly.',
      },
      {
        question: 'Which number is prime?',
        mathNotation: 'Exactly 2 factors?',
        answer: '17',
        choices: ['15', '21', '17', '27'],
        answerIndex: 2,
        explanation: '15=3×5, 21=3×7, 27=3³ are all composite. 17 has no factors other than 1 and 17 — it is prime.',
      },
      {
        question: 'What is the prime factorization of 60?',
        mathNotation: '60 = ?',
        answer: '2² × 3 × 5',
        choices: ['2 × 30', '2² × 3 × 5', '4 × 15', '2 × 2 × 15'],
        answerIndex: 1,
        explanation: '60 = 2×30 = 2×2×15 = 2×2×3×5 = 2² × 3 × 5. All factors (2, 3, 5) are prime.',
      },
    ],
    connections: [
      {
        conceptId: 't1-gcf-lcm',
        tierId: 1,
        title: 'GCF and LCM',
        bridgeFormula: 'GCF(12,18) uses prime factorizations',
        explanation: 'Factors and prime factorization are the direct inputs to finding GCF and LCM. You must understand what a factor is before you can find the greatest common one.',
      },
      {
        conceptId: 't1-equivalent-fractions',
        tierId: 1,
        title: 'Equivalent Fractions',
        bridgeFormula: '8/12 ÷ (GCF=4) = 2/3',
        explanation: 'Simplifying fractions means dividing top and bottom by a common factor. Knowing the factors of the numerator and denominator tells you exactly how far you can simplify.',
      },
      {
        conceptId: 't1-adding-fractions',
        tierId: 1,
        title: 'Adding and Subtracting Fractions',
        bridgeFormula: 'LCD(4,6) = LCM(4,6) = 12',
        explanation: 'The least common denominator for adding fractions is the LCM of the denominators, which you find using multiples. Factor knowledge makes this automatic.',
      },
    ],
  },

  {
    id: 't1-gcf-lcm',
    tierId: 1,
    glyph: '⊗',
    title: 'GCF and LCM',
    subtitle: 'Greatest common factor and least common multiple',
    tags: ['arithmetic'],
    accessibilityLevel: 'elementary',
    visualizationType: 'venn-gcf-lcm',
    canvasLabel: 'GCF and LCM',
    conceptTab: {
      summary: 'The GCF is the largest number that divides two numbers evenly. The LCM is the smallest number that both numbers divide into evenly.',
      whyItMatters:
        "GCF and LCM are the two most useful tools in fraction arithmetic. The GCF lets you simplify fractions to lowest terms in one step. The LCM gives you the LCD for adding or subtracting fractions. They also show up in scheduling problems, tiling, and anywhere you need two things to align perfectly.",
      coreIdea:
        "GCF (Greatest Common Factor): The biggest number that is a factor of BOTH numbers.\nGCF(12, 18): Factors of 12: {1,2,3,4,6,12}. Factors of 18: {1,2,3,6,9,18}. Common factors: {1,2,3,6}. Greatest: 6.\n\nLCM (Least Common Multiple): The smallest number that is a multiple of BOTH numbers.\nLCM(4, 6): Multiples of 4: 4,8,12,16,… Multiples of 6: 6,12,18,… First in common: 12.\n\nPRIME FACTORIZATION METHOD (most efficient):\n12 = 2² × 3\n18 = 2 × 3²\n• GCF = product of SHARED prime factors with LOWER exponents: 2¹ × 3¹ = 6\n• LCM = product of ALL prime factors with HIGHER exponents: 2² × 3² = 36\n\nUseful relationship: GCF(a,b) × LCM(a,b) = a × b",
      formula: 'GCF × LCM = a × b',
      formulaLabel: 'Key relationship:',
      insights: [
        'The GCF×LCM = a×b relationship is a powerful shortcut. If you know the GCF of two numbers, you can find the LCM by dividing: LCM = (a×b)/GCF. No need to list multiples.',
        'GCF = 1 means the numbers are "relatively prime" — they share no common factor except 1. Example: 8 and 9 are relatively prime even though neither is prime itself.',
        'LCM is always at least as large as the bigger number, and GCF is always at most as large as the smaller number. If one number divides the other (like 4 and 12), GCF = smaller, LCM = larger.',
      ],
    },
    guided: {
      problemStatement: 'Two buses leave a station at the same time. Bus A comes every 12 minutes; Bus B comes every 8 minutes. When will they next arrive together?',
      steps: [
        {
          label: 'Find the prime factorizations',
          math: '12 = 2² × 3   and   8 = 2³',
          explanation: 'We need LCM(12, 8) — the smallest number both 12 and 8 divide into. Start with prime factorizations.',
        },
        {
          label: 'Find the LCM',
          math: 'LCM = 2³ × 3 = 8 × 3 = 24',
          explanation: 'Take the HIGHEST power of each prime that appears: 2³ (from 8) and 3¹ (from 12). LCM = 2³ × 3 = 24.',
        },
        {
          label: 'Interpret the answer',
          math: 'Both buses arrive together after 24 minutes',
          explanation: 'After 24 minutes: Bus A has made 2 trips (24÷12=2), Bus B has made 3 trips (24÷8=3). They meet again at minute 24.',
          connectionNote: 'Check with GCF×LCM = a×b: GCF(12,8)=4, and 4×24 = 96 = 12×8. ✓',
        },
      ],
      reflectionPrompt: 'If the buses instead came every 6 and 10 minutes, when would they next meet? Does it help to find the GCF first?',
    },
    practice: [
      {
        question: 'What is the GCF of 24 and 36?',
        mathNotation: 'GCF(24, 36) = ?',
        answer: '12',
        choices: ['6', '12', '4', '72'],
        answerIndex: 1,
        explanation: '24 = 2³×3, 36 = 2²×3². GCF = 2² × 3 = 4×3 = 12. Alternatively, factors of 24: {1,2,3,4,6,8,12,24}; factors of 36: {1,2,3,4,6,9,12,18,36}. Largest common: 12.',
      },
      {
        question: 'What is the LCM of 5 and 8?',
        mathNotation: 'LCM(5, 8) = ?',
        answer: '40',
        choices: ['13', '40', '20', '5'],
        answerIndex: 1,
        explanation: '5 = 5, 8 = 2³. No shared prime factors (GCF = 1), so LCM = 5 × 8 = 40. When two numbers are relatively prime, their LCM is their product.',
      },
      {
        question: 'Simplify 18/24 using the GCF.',
        mathNotation: '18/24 ÷ GCF/GCF = ?',
        answer: '3/4',
        choices: ['6/8', '3/4', '9/12', '1/2'],
        answerIndex: 1,
        explanation: 'GCF(18, 24) = 6. Divide both by 6: 18÷6=3, 24÷6=4. So 18/24 = 3/4 in simplest form.',
      },
    ],
    connections: [
      {
        conceptId: 't1-factors-multiples',
        tierId: 1,
        title: 'Factors and Multiples',
        bridgeFormula: 'GCF from shared factors; LCM from multiples',
        explanation: 'GCF and LCM are built entirely from your understanding of factors and multiples. They are the natural next step once you can list factors and recognize prime numbers.',
      },
      {
        conceptId: 't1-adding-fractions',
        tierId: 1,
        title: 'Adding and Subtracting Fractions',
        bridgeFormula: 'LCD(3,4) = LCM(3,4) = 12',
        explanation: 'The LCM is the LCD. Whenever you add fractions, you\'re computing the LCM of the denominators. GCF and LCM make fraction addition systematic and fast.',
      },
      {
        conceptId: 't1-equivalent-fractions',
        tierId: 1,
        title: 'Equivalent Fractions',
        bridgeFormula: '18/24 → GCF=6 → 3/4',
        explanation: 'Reducing a fraction to lowest terms means dividing by the GCF. If you know the GCF, you reduce in one step instead of several.',
      },
    ],
  },
];
