import type { Concept } from '../types';

export const TIER4_CONCEPTS: Concept[] = [
  {
    id: 't4-angles-parallel-lines',
    tierId: 4,
    glyph: '∠',
    title: 'Angles and parallel lines',
    subtitle: 'How a transversal creates predictable angle pairs',
    tags: ['geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'parallel-angles',
    canvasLabel: 'Angle Pairs',
    conceptTab: {
      summary: 'When a line crosses two parallel lines, it creates eight angles — and the relationships between them are completely predictable.',
      whyItMatters:
        "Architects and engineers rely on angle relationships when designing buildings, bridges, and roads. The fact that parallel lines create predictable angle pairs is the reason you can tile a floor perfectly, build a roof with matching angles on both sides, and navigate using a compass. Angle relationships are also the first building block of geometric proof — once you know the rules, you can prove things with certainty.",
      coreIdea:
        "An ANGLE is formed by two rays from a common point (vertex), measured in degrees.\n\nKEY ANGLE PAIRS:\n• Vertical angles (opposite when two lines cross): EQUAL\n• Supplementary angles (form a straight line): sum to 180°\n• Complementary angles: sum to 90°\n\nWhen a TRANSVERSAL crosses two PARALLEL LINES:\n• Corresponding angles: equal (same position at each intersection)\n• Alternate interior angles: equal (inside, on opposite sides of transversal)\n• Alternate exterior angles: equal (outside, on opposite sides)\n• Co-interior (same-side interior) angles: supplementary (sum to 180°)\n\nThese relationships hold if and only if the lines are parallel. This is a two-way street: if alternate interior angles are equal, the lines MUST be parallel.",
      formula: 'Alternate interior angles: ∠a = ∠b when lines are parallel',
      formulaLabel: 'Parallel line theorem:',
      insights: [
        'Vertical angles are equal because they are formed by the same two crossing lines — each pair "opens" the same amount. This is true for ANY two intersecting lines, not just parallel ones.',
        'The sum of angles in a triangle is 180° — and this fact is PROVED using parallel line angle relationships. Draw a line through the apex parallel to the base; the alternate interior angles fill in the 180°.',
        'In a regular polygon with n sides, the sum of interior angles is (n−2)·180°. For a triangle: (3−2)·180° = 180°. For a quadrilateral: (4−2)·180° = 360°. All from the same parallel-line logic.',
      ],
    },
    guided: {
      problemStatement: 'Two parallel lines are cut by a transversal. One angle at the first intersection is 65°. Find all other angles.',
      steps: [
        {
          label: 'Mark the given angle',
          math: '∠1 = 65°',
          explanation: 'Label the given angle as 65°. It creates four angles at the first intersection.',
        },
        {
          label: 'Find the vertical angle',
          math: '∠3 = 65° (vertical angles are equal)',
          explanation: 'The angle directly across the intersection from ∠1 is its vertical angle — they are always equal.',
        },
        {
          label: 'Find the supplementary angles',
          math: '∠2 = ∠4 = 180° − 65° = 115°',
          explanation: 'The angles adjacent to 65° form a straight line with it, so they each equal 180° − 65° = 115°.',
        },
        {
          label: 'Use parallel line relationships',
          math: 'All four angles at the second intersection match: 65°, 115°, 65°, 115°',
          explanation: 'Corresponding angles at the second intersection equal those at the first (lines are parallel). The pattern repeats exactly.',
          connectionNote: 'Eight angles total — only two distinct measures: 65° and 115°. This elegant repetition is the power of parallel lines.',
        },
      ],
      reflectionPrompt: 'The sum of angles on one side of a transversal between two parallel lines is always 180°. Can you explain WHY this must be true using the angle relationships you just learned?',
    },
    practice: [
      {
        question: 'Two parallel lines are cut by a transversal. If one angle is 110°, what is the alternate interior angle?',
        mathNotation: '∠alt interior = ?',
        answer: '110°',
        choices: ['70°', '110°', '180°', '55°'],
        answerIndex: 1,
        explanation: 'Alternate interior angles are equal when lines are parallel. The alternate interior angle is also 110°.',
      },
      {
        question: 'Two lines cross, forming angles of x° and (3x − 20)°. If they are vertical angles, find x.',
        mathNotation: 'x = 3x − 20',
        answer: '10',
        choices: ['5', '10', '15', '20'],
        answerIndex: 1,
        explanation: 'Vertical angles are equal: x = 3x − 20 → 20 = 2x → x = 10. The angles are each 10°.',
      },
      {
        question: 'What is the sum of interior angles in a hexagon?',
        mathNotation: '(n−2) × 180° where n=6',
        answer: '720°',
        choices: ['540°', '720°', '900°', '1080°'],
        answerIndex: 1,
        explanation: '(6−2) × 180° = 4 × 180° = 720°. A hexagon\'s interior angles sum to 720°.',
      },
    ],
    connections: [
      {
        conceptId: 't4-triangle-congruence',
        tierId: 4,
        title: 'Triangle Congruence and Similarity',
        bridgeFormula: 'AA similarity: two angles equal → triangles similar',
        explanation: 'Angle relationships are the basis of triangle similarity. When parallel lines cut by transversals create equal angles, those angles prove triangles similar — the foundation of all indirect measurement.',
      },
      {
        conceptId: 't4-intro-to-proof',
        tierId: 4,
        title: 'Introduction to Proof',
        bridgeFormula: 'Given: ∠1 = ∠2; Prove: lines are parallel',
        explanation: 'Angle relationships are among the first theorems students prove formally. The logic chain — given, theorem, conclusion — begins here and extends through all of mathematics.',
      },
    ],
  },

  {
    id: 't4-triangle-congruence',
    tierId: 4,
    glyph: '≅',
    title: 'Triangle congruence and similarity',
    subtitle: 'When shapes are identical — or just proportional',
    tags: ['geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'triangle-congruence',
    canvasLabel: 'Congruent Triangles',
    conceptTab: {
      summary: 'Congruent triangles are identical in shape and size. Similar triangles have the same shape but different sizes — their corresponding sides are proportional.',
      whyItMatters:
        "Surveyors measure the width of a river without crossing it using similar triangles. Architects scale blueprints. GPS systems compute distances using triangulation. Every indirect measurement in engineering, navigation, and science relies on triangle similarity and congruence. These aren't abstract theorems — they are tools that built the ancient pyramids and modern skyscrapers.",
      coreIdea:
        "CONGRUENCE: Two triangles are congruent (≅) — same size and shape — if any of these hold:\n• SSS: three sides equal\n• SAS: two sides and the included angle equal\n• ASA: two angles and the included side equal\n• AAS: two angles and a non-included side equal\n• HL: hypotenuse and leg (right triangles only)\n\nNOTE: SSA and AAA do NOT guarantee congruence.\n\nSIMILARITY: Two triangles are similar (~) — same shape, proportional sides — if:\n• AA: two pairs of equal angles (most useful)\n• SAS~: two sides proportional and included angle equal\n• SSS~: all three sides proportional\n\nIf triangles are similar with ratio k, then corresponding sides have ratio k but areas have ratio k².",
      formula: 'Similar triangles: a/a\' = b/b\' = c/c\' = k',
      formulaLabel: 'Side ratio in similar triangles:',
      insights: [
        'AA similarity is the most powerful test because angles are usually easiest to determine. If two angles of a triangle are fixed, the third is determined (since they sum to 180°) — so AA completely specifies the shape.',
        'Similar triangles underlie trigonometry. Sine, cosine, and tangent ratios are constant for a given angle because all right triangles with that angle are similar — the ratios of sides never change.',
        'The ratio of areas of similar figures is the SQUARE of the ratio of lengths. If a map has scale 1:10,000, a region on the map that looks 2 cm × 3 cm represents an actual area 10,000² = 100,000,000 times larger.',
      ],
    },
    guided: {
      problemStatement: 'A tree casts a shadow 24 feet long. At the same time, a 6-foot person casts a shadow 4 feet long. How tall is the tree?',
      steps: [
        {
          label: 'Set up the similar triangles',
          math: 'Person: height/shadow = 6/4; Tree: height/shadow = h/24',
          explanation: "The sun's rays are parallel, creating similar triangles. The angles of elevation are equal, so the ratios of height to shadow length are equal.",
        },
        {
          label: 'Write the proportion',
          math: '6/4 = h/24',
          explanation: 'Corresponding sides of similar triangles are proportional. Set the two ratios equal.',
        },
        {
          label: 'Solve for h',
          math: 'h = 24 × (6/4) = 24 × 1.5 = 36 feet',
          explanation: 'Cross-multiply or multiply both sides by 24: h = 36 feet.',
          connectionNote: 'This technique — using similar triangles for indirect measurement — is called the "shadow method." Thales of Miletus used it to measure the Great Pyramid of Giza around 600 BC.',
        },
      ],
      reflectionPrompt: 'Why does AA similarity work in the shadow problem? Which two angles are equal in the two triangles, and why?',
    },
    practice: [
      {
        question: 'Two triangles have angles 40°, 60°, 80° and 40°, 60°, 80°. What can you conclude?',
        mathNotation: 'AA similarity',
        answer: 'The triangles are similar (AA)',
        choices: [
          'The triangles are congruent (ASA)',
          'The triangles are similar (AA)',
          'Nothing — angles alone tell us nothing',
          'The triangles are equal in area',
        ],
        answerIndex: 1,
        explanation: 'Two pairs of equal angles (AA) proves similarity. They are NOT necessarily congruent — they could be different sizes with the same shape.',
      },
      {
        question: 'Two similar triangles have a side ratio of 3:1. What is the ratio of their areas?',
        mathNotation: 'Area ratio = k²',
        answer: '9:1',
        choices: ['3:1', '6:1', '9:1', '27:1'],
        answerIndex: 2,
        explanation: 'If the side ratio is k = 3, the area ratio is k² = 9. The larger triangle has 9 times the area of the smaller.',
      },
      {
        question: 'Which set of conditions does NOT prove triangle congruence?',
        mathNotation: 'Congruence shortcuts',
        answer: 'SSA (two sides and a non-included angle)',
        choices: ['SAS', 'ASA', 'SSS', 'SSA (two sides and a non-included angle)'],
        answerIndex: 3,
        explanation: 'SSA is the "ambiguous case" — two different triangles can satisfy the same SSA conditions. It is not a valid congruence theorem.',
      },
    ],
    connections: [
      {
        conceptId: 't4-pythagorean-theorem',
        tierId: 4,
        title: 'Pythagorean Theorem',
        bridgeFormula: 'a² + b² = c²',
        explanation: 'One of the most elegant proofs of the Pythagorean theorem uses similar triangles: drop an altitude from the right angle to the hypotenuse, creating two triangles similar to each other and to the original.',
      },
      {
        conceptId: 't6-trig-functions',
        tierId: 6,
        title: 'Sine, Cosine, and Tangent',
        bridgeFormula: 'sin θ = opposite/hypotenuse',
        explanation: 'Trig ratios are constant for a given angle because all right triangles with that angle are similar. The constancy of sin, cos, and tan across all triangle sizes IS the AA similarity theorem in action.',
      },
    ],
  },

  {
    id: 't4-pythagorean-theorem',
    tierId: 4,
    glyph: 'a²+b²',
    title: 'The Pythagorean theorem',
    subtitle: 'The relationship between the sides of every right triangle',
    tags: ['geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'pythagorean-squares',
    canvasLabel: 'Right Triangle',
    conceptTab: {
      summary: 'In any right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c².',
      whyItMatters:
        "The Pythagorean theorem is one of the most practically useful results in all of mathematics. It computes distances across any right-angle situation: the diagonal of a screen, the straight-line distance between two GPS coordinates, the length of a support cable, the height of a building. Pythagoras (and cultures before him) recognized this pattern over 2,500 years ago. With over 370 known proofs, it is one of the most proved theorems in mathematics.",
      coreIdea:
        "In a right triangle with legs a and b and hypotenuse c (the side opposite the right angle):\n\na² + b² = c²\n\nFinding the hypotenuse: c = √(a² + b²)\nFinding a leg: a = √(c² − b²)\n\nPYTHAGOREAN TRIPLES are whole-number solutions:\n• 3, 4, 5 (3² + 4² = 9 + 16 = 25 = 5²)\n• 5, 12, 13\n• 8, 15, 17\n• 7, 24, 25\n\nAny multiple works: 6, 8, 10 (double of 3-4-5); 9, 12, 15 (triple of 3-4-5).\n\nCONVERSE: If a² + b² = c², then the triangle IS a right triangle. This is how you prove a corner is square.",
      formula: 'a² + b² = c²',
      formulaLabel: 'Pythagorean Theorem:',
      insights: [
        "The theorem can be proved by rearranging four congruent right triangles inside a square. One arrangement shows that a square of side c has the same area as squares on sides a and b combined. Area = proof.",
        "The Converse is just as useful as the theorem itself. Ancient Egyptians used 3-4-5 ropes knotted at equal intervals to mark right angles for pyramid construction. Builders today use the '3-4-5 check' to square corners.",
        "The theorem generalizes to 3D: the space diagonal of a box with dimensions a, b, c is √(a²+b²+c²). In n dimensions, the distance formula is √(x₁²+x₂²+...+xₙ²) — the Pythagorean theorem in its most general form.",
      ],
    },
    guided: {
      problemStatement: 'A ladder 13 feet long leans against a wall. The base of the ladder is 5 feet from the wall. How high up the wall does the ladder reach?',
      steps: [
        {
          label: 'Identify the sides',
          math: 'Hypotenuse c = 13; one leg a = 5; find b',
          explanation: 'The ladder is the hypotenuse (longest side, opposite the right angle). The distance from the wall is one leg, the height is the other.',
        },
        {
          label: 'Apply the theorem',
          math: '5² + b² = 13²',
          explanation: 'Substitute: a = 5, c = 13, and solve for b.',
        },
        {
          label: 'Simplify',
          math: '25 + b² = 169 → b² = 144',
          explanation: '5² = 25, 13² = 169. Subtract 25 from both sides: b² = 144.',
        },
        {
          label: 'Take the square root',
          math: 'b = √144 = 12 feet',
          explanation: 'The ladder reaches 12 feet up the wall. (This is the 5-12-13 Pythagorean triple!)',
          connectionNote: 'Recognize Pythagorean triples on sight — they save computation. 5-12-13 is a classic.',
        },
      ],
      reflectionPrompt: 'If you move the base of the ladder farther from the wall, what happens to the height it reaches? Use the theorem to predict, then verify with numbers.',
    },
    practice: [
      {
        question: 'A right triangle has legs 9 and 12. What is the hypotenuse?',
        mathNotation: '9² + 12² = c²',
        answer: '15',
        choices: ['13', '15', '17', '21'],
        answerIndex: 1,
        explanation: '81 + 144 = 225. c = √225 = 15. (This is a 3-4-5 triple scaled by 3.)',
      },
      {
        question: 'A right triangle has hypotenuse 10 and one leg 6. What is the other leg?',
        mathNotation: '6² + b² = 10²',
        answer: '8',
        choices: ['4', '6', '8', '√136'],
        answerIndex: 2,
        explanation: '36 + b² = 100 → b² = 64 → b = 8. (The 6-8-10 triple is a 3-4-5 triple doubled.)',
      },
      {
        question: 'Can a triangle with sides 7, 24, 25 be a right triangle?',
        mathNotation: '7² + 24² vs 25²',
        answer: 'Yes, because 49 + 576 = 625 = 25²',
        choices: [
          'No, none of those form a triple',
          'Yes, because 49 + 576 = 625 = 25²',
          'Cannot tell without an angle',
          'Yes, but only if one angle is 90°',
        ],
        answerIndex: 1,
        explanation: '7² + 24² = 49 + 576 = 625 = 25². Since a² + b² = c², it is a right triangle by the converse.',
      },
    ],
    connections: [
      {
        conceptId: 't4-coordinate-geometry',
        tierId: 4,
        title: 'Coordinate Geometry',
        bridgeFormula: 'd = √[(x₂−x₁)² + (y₂−y₁)²]',
        explanation: 'The distance formula is the Pythagorean theorem applied to a coordinate plane. The horizontal and vertical differences are the legs; the distance between points is the hypotenuse.',
      },
      {
        conceptId: 't6-unit-circle',
        tierId: 6,
        title: 'The Unit Circle',
        bridgeFormula: 'sin²θ + cos²θ = 1',
        explanation: 'The Pythagorean identity sin²θ + cos²θ = 1 is the Pythagorean theorem for a right triangle inscribed in a unit circle. All of trigonometry rests on this foundation.',
      },
    ],
  },

  {
    id: 't4-coordinate-geometry',
    tierId: 4,
    glyph: '(x,y)',
    title: 'Coordinate geometry',
    subtitle: 'Distance, midpoint, and slope on the coordinate plane',
    tags: ['geometry', 'algebra'],
    accessibilityLevel: 'high',
    visualizationType: 'coordinate-geometry',
    canvasLabel: 'Coordinate Plane',
    conceptTab: {
      summary: 'Coordinate geometry merges algebra and geometry — every geometric shape gets an algebraic equation, and every algebraic equation gets a geometric shape.',
      whyItMatters:
        "When Descartes invented the coordinate plane in the 1600s, he unified algebra and geometry forever. Every GPS coordinate is a point on the plane. Every line on a map has an equation. Computer graphics, satellite imagery, video game physics — all run on coordinate geometry. The simple idea of labeling every point with an (x, y) pair turned two separate mathematical worlds into one.",
      coreIdea:
        "THREE CORE FORMULAS for two points (x₁,y₁) and (x₂,y₂):\n\nDISTANCE:\nd = √[(x₂−x₁)² + (y₂−y₁)²]\n(Pythagorean theorem applied to coordinates)\n\nMIDPOINT:\nM = ((x₁+x₂)/2, (y₁+y₂)/2)\n(average the x-coordinates and y-coordinates)\n\nSLOPE:\nm = (y₂−y₁)/(x₂−x₁)\n\nLINES:\n• Slope-intercept form: y = mx + b\n• Point-slope form: y − y₁ = m(x − x₁)\n• Parallel lines: same slope (m₁ = m₂)\n• Perpendicular lines: slopes multiply to −1 (m₁ · m₂ = −1)",
      formula: 'd = √[(x₂−x₁)² + (y₂−y₁)²]',
      formulaLabel: 'Distance formula:',
      insights: [
        "Perpendicular slopes are negative reciprocals: if a line has slope 2, a perpendicular line has slope −1/2. This is because rotating a vector 90° swaps and negates its components.",
        "The midpoint formula works by averaging — the midpoint is halfway between two points in both the x and y directions simultaneously. Simple arithmetic applied to two dimensions.",
        "Coordinate geometry lets you PROVE geometric theorems with algebra. Want to prove the diagonals of a rectangle are equal? Place it at coordinates, compute both diagonals with the distance formula. Done.",
      ],
    },
    guided: {
      problemStatement: 'Points A(1, 2) and B(7, 10) are endpoints of a segment. Find its length, midpoint, and the slope of the line through them.',
      steps: [
        {
          label: 'Distance (length)',
          math: 'd = √[(7−1)² + (10−2)²] = √[36 + 64] = √100 = 10',
          explanation: 'Subtract x-coordinates (7−1=6) and y-coordinates (10−2=8). Square each: 36+64=100. Take the square root: 10.',
        },
        {
          label: 'Midpoint',
          math: 'M = ((1+7)/2, (2+10)/2) = (4, 6)',
          explanation: 'Average the x-coordinates: (1+7)/2 = 4. Average the y-coordinates: (2+10)/2 = 6. Midpoint is (4, 6).',
        },
        {
          label: 'Slope',
          math: 'm = (10−2)/(7−1) = 8/6 = 4/3',
          explanation: 'Rise = 10−2 = 8, run = 7−1 = 6. Slope = 8/6 = 4/3. For every 3 units right, the line rises 4 units.',
          connectionNote: '4/3 is the slope of the line through A and B. The segment AB has the same slope — a segment is just a portion of the line.',
        },
      ],
      reflectionPrompt: 'What is the slope of the line perpendicular to AB? Verify that the two slopes multiply to −1.',
    },
    practice: [
      {
        question: 'What is the distance between (0, 0) and (3, 4)?',
        mathNotation: 'd = √(3² + 4²)',
        answer: '5',
        choices: ['7', '5', '√7', '√14'],
        answerIndex: 1,
        explanation: 'd = √(9+16) = √25 = 5. The classic 3-4-5 right triangle.',
      },
      {
        question: 'What is the midpoint of (−2, 6) and (8, −4)?',
        mathNotation: 'M = ((−2+8)/2, (6+(−4))/2)',
        answer: '(3, 1)',
        choices: ['(6, 2)', '(3, 1)', '(5, 5)', '(−5, 5)'],
        answerIndex: 1,
        explanation: '(−2+8)/2 = 6/2 = 3. (6+(−4))/2 = 2/2 = 1. Midpoint is (3, 1).',
      },
      {
        question: 'A line has slope 3. What is the slope of a perpendicular line?',
        mathNotation: 'm₁ × m₂ = −1',
        answer: '−1/3',
        choices: ['3', '1/3', '−3', '−1/3'],
        answerIndex: 3,
        explanation: 'Perpendicular slopes are negative reciprocals. Reciprocal of 3 is 1/3; negate it: −1/3. Check: 3 × (−1/3) = −1. ✓',
      },
    ],
    connections: [
      {
        conceptId: 't3-linear-equations-slope',
        tierId: 3,
        title: 'Linear Equations and Slope',
        bridgeFormula: 'y = mx + b (coordinate geometry form)',
        explanation: 'Slope from Algebra I becomes a geometric tool in coordinate geometry. The same formula m = Δy/Δx connects algebraic lines to geometric distances and directions.',
      },
      {
        conceptId: 't5-quadratic-functions',
        tierId: 5,
        title: 'Quadratic Functions and Parabolas',
        bridgeFormula: 'Vertex at (h, k): y = a(x−h)² + k',
        explanation: 'Coordinate geometry gives parabolas a home. The vertex (h,k), axis of symmetry, and x-intercepts are all defined using coordinates. Every feature of a quadratic becomes a location on the plane.',
      },
    ],
  },

  {
    id: 't4-intro-to-proof',
    tierId: 4,
    glyph: '∴',
    title: 'Introduction to proof',
    subtitle: 'Logical reasoning, the two-column proof, and why certainty matters',
    tags: ['geometry', 'proof'],
    accessibilityLevel: 'high',
    visualizationType: 'proof-chain',
    canvasLabel: 'Proof Logic',
    conceptTab: {
      summary: 'A mathematical proof is a chain of logical steps, each justified by a definition, postulate, or previously proved theorem, that leads inevitably to a conclusion.',
      whyItMatters:
        "Mathematics is different from every other field: in mathematics, we can be CERTAIN. Not 99.9% sure — certain. A theorem, once proved, is true forever, unconditionally, without exception. This certainty comes from proof. The skills you build proving geometry theorems — identifying what you know, what you need, and what bridges them — are the same skills used by software engineers verifying programs, lawyers building arguments, and scientists designing experiments.",
      coreIdea:
        "A PROOF has:\n• GIVEN: What you know (the hypotheses)\n• PROVE: What you must show (the conclusion)\n• STEPS: A chain of statements, each justified\n\nTWO-COLUMN FORMAT:\nStatement               | Reason\n------------------------|------------------\n1. AB = CD             | Given\n2. CD = EF             | Given\n3. AB = EF             | Transitive property\n\nKEY JUSTIFICATIONS:\n• Given: stated as a hypothesis\n• Definition: what a mathematical term means\n• Postulate: assumed without proof (axiom)\n• Theorem: previously proved result\n• Properties of equality: reflexive (a=a), symmetric, transitive\n\nTypes of proof: two-column, paragraph, flow proof — all are valid.",
      formula: 'Given → Logical Steps → QED',
      formulaLabel: 'Structure of proof:',
      insights: [
        "'QED' stands for 'quod erat demonstrandum' — Latin for 'which was to be demonstrated.' Mathematicians now often use a filled square (■). The tradition of marking proof-endings is thousands of years old.",
        "You cannot prove something by checking examples. 'It works for n = 1, 2, 3, ..., 100' does not prove it for n = 101. Only a general argument that covers ALL cases — infinitely many — is a proof.",
        "Proof by contradiction (reductio ad absurdum) assumes the OPPOSITE of what you want to prove, then shows this leads to a contradiction. This is how we prove √2 is irrational, and how Euclid proved infinitely many primes exist.",
      ],
    },
    guided: {
      problemStatement: "Prove: If ∠A and ∠B are supplementary and ∠B and ∠C are supplementary, then ∠A = ∠C.",
      steps: [
        {
          label: 'State the givens',
          math: 'Given: ∠A + ∠B = 180° and ∠B + ∠C = 180°',
          explanation: 'Write out the hypotheses. These are our starting facts.',
        },
        {
          label: 'Use the transitive property',
          math: '∠A + ∠B = ∠B + ∠C (both equal 180°)',
          explanation: 'Both expressions equal 180°. By the transitive property of equality, they equal each other.',
        },
        {
          label: 'Subtract ∠B from both sides',
          math: '∠A = ∠C',
          explanation: 'The subtraction property of equality: subtracting the same quantity from both sides preserves equality.',
          connectionNote: 'This is the "supplements of the same angle are equal" theorem. It generalizes: supplements of EQUAL angles are equal.',
        },
      ],
      reflectionPrompt: 'We proved ∠A = ∠C in three steps. Could you write it in two? What is the minimum number of steps, and is there a right answer?',
    },
    practice: [
      {
        question: 'In a two-column proof, what goes in the "Reason" column?',
        mathNotation: 'Statement | Reason',
        answer: 'Definitions, postulates, theorems, or properties that justify each statement',
        choices: [
          'The next logical step',
          'Definitions, postulates, theorems, or properties that justify each statement',
          'The conclusion to be proved',
          'Any mathematical fact you recall',
        ],
        answerIndex: 1,
        explanation: 'Every statement must be justified by a definition, postulate, theorem, or algebraic property. "I think so" is not a valid reason in a proof.',
      },
      {
        question: 'Why is "I checked 1,000 examples" not a valid proof?',
        mathNotation: 'Proof vs. evidence',
        answer: 'A proof must work for ALL cases — no finite check covers infinitely many cases',
        choices: [
          'You should check at least 1,000,000 examples',
          'Examples are never useful in mathematics',
          'A proof must work for ALL cases — no finite check covers infinitely many cases',
          'Only randomly chosen examples count',
        ],
        answerIndex: 2,
        explanation: 'Mathematical truth is universal. 1,000 examples leave infinitely many unchecked. Only a logical argument valid for all cases is a proof.',
      },
      {
        question: 'What is proof by contradiction?',
        mathNotation: 'Assume ¬P → contradiction → P is true',
        answer: 'Assume the negation of what you want to prove, show this leads to a contradiction, conclude the original statement is true',
        choices: [
          'Find an example where the statement is false',
          'Prove the contrapositive instead',
          'Assume the negation of what you want to prove, show this leads to a contradiction, conclude the original statement is true',
          'Check both the statement and its converse',
        ],
        answerIndex: 2,
        explanation: "If assuming ¬P leads to an impossibility, then ¬P must be false, so P must be true. It's powerful for proving something doesn't exist or can't happen.",
      },
    ],
    connections: [
      {
        conceptId: 't8-mathematical-induction',
        tierId: 8,
        title: 'Mathematical Induction',
        bridgeFormula: 'Base case + inductive step → ∀n P(n)',
        explanation: 'Mathematical induction is the proof technique for statements about all natural numbers. The logical structure — given, steps, conclusion — is the same as geometry proof, extended to infinite cases.',
      },
      {
        conceptId: 't8-epsilon-delta',
        tierId: 8,
        title: 'Epsilon-Delta Proofs',
        bridgeFormula: '∀ε>0, ∃δ>0: ...',
        explanation: 'Epsilon-delta proofs use the same structure as geometry proofs: given hypotheses, justify each step, reach the conclusion. The rigorous heart of calculus IS proof-based mathematics grown up.',
      },
    ],
  },

  {
    id: 't4-circles-geometry',
    tierId: 4,
    glyph: '○',
    title: 'Circle geometry',
    subtitle: 'Arcs, chords, tangents, and the angles they create',
    tags: ['geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'circle-parts',
    canvasLabel: 'Circle with Chord',
    conceptTab: {
      summary: 'A circle is defined by its center and radius. Lines and segments intersecting a circle create predictable angle and arc relationships.',
      whyItMatters:
        "Circles are everywhere: wheels, clocks, planetary orbits, ripples in water, radar screens, satellite dishes. The geometry of circles — how chords, tangents, and arcs relate — underlies optics (how lenses focus light), GPS (triangulation using circular signals), and engineering (gears, pulleys, pistons). Circle geometry is also the direct predecessor of trigonometry and the unit circle.",
      coreIdea:
        "KEY DEFINITIONS:\n• Radius (r): center to edge\n• Diameter (d = 2r): all the way across through the center\n• Chord: segment with both endpoints on the circle\n• Tangent: line touching the circle at exactly one point\n• Arc: a portion of the circle (measured in degrees)\n• Central angle: vertex at the center — equals the arc it intercepts\n• Inscribed angle: vertex on the circle — equals HALF the arc it intercepts\n\nKEY THEOREMS:\n• A tangent is perpendicular to the radius at the point of tangency\n• Inscribed angle = ½ × intercepted arc\n• Angles inscribed in a semicircle = 90° (Thales' theorem)\n• Chord-chord: two chords intersecting inside — products of segments are equal",
      formula: 'Inscribed angle = ½ × intercepted arc',
      formulaLabel: 'Inscribed Angle Theorem:',
      insights: [
        "The inscribed angle theorem means ANY inscribed angle intercepting the same arc is equal, regardless of where on the circle the vertex sits. Draw three different inscribed angles to the same chord — all three are identical.",
        "Thales' theorem: any triangle inscribed in a semicircle (diameter as hypotenuse) is a right triangle. This follows from the inscribed angle theorem: the arc is 180°, so the angle is 90°.",
        "Circumference = 2πr and Area = πr². The number π is defined as circumference/diameter — the same ratio for EVERY circle. This universality is what makes π fundamental to mathematics.",
      ],
    },
    guided: {
      problemStatement: 'An inscribed angle intercepts an arc of 140°. What is the measure of the inscribed angle? What would the central angle for the same arc measure?',
      steps: [
        {
          label: 'Apply the inscribed angle theorem',
          math: 'Inscribed angle = ½ × 140° = 70°',
          explanation: 'An inscribed angle is always half the intercepted arc. Half of 140° is 70°.',
        },
        {
          label: 'State the central angle rule',
          math: 'Central angle = arc = 140°',
          explanation: 'A central angle (vertex at the center) equals the arc it intercepts. The central angle is 140°.',
        },
        {
          label: 'Compare the two',
          math: 'Inscribed angle (70°) = ½ × Central angle (140°)',
          explanation: 'The inscribed angle is exactly half the central angle for the same arc. This is the heart of the theorem.',
          connectionNote: 'This means every inscribed angle intercepting a given arc is equal — the position of the vertex on the circle does not matter, only which arc it sees.',
        },
      ],
      reflectionPrompt: 'If two inscribed angles intercept the same arc, what can you conclude about them? What if they intercept supplementary arcs?',
    },
    practice: [
      {
        question: 'An inscribed angle intercepts an arc of 80°. What is the inscribed angle measure?',
        mathNotation: 'Inscribed angle = ½ × arc',
        answer: '40°',
        choices: ['20°', '40°', '80°', '160°'],
        answerIndex: 1,
        explanation: 'Inscribed angle = ½ × 80° = 40°.',
      },
      {
        question: 'A central angle of 120° intercepts an arc in a circle of radius 6. What is the arc length?',
        mathNotation: 'Arc length = (θ/360°) × 2πr',
        answer: '4π',
        choices: ['2π', '4π', '6π', '12π'],
        answerIndex: 1,
        explanation: 'Arc length = (120/360) × 2π(6) = (1/3) × 12π = 4π.',
      },
      {
        question: 'A triangle is inscribed in a semicircle with the diameter as one side. What is the angle opposite the diameter?',
        mathNotation: "Thales' theorem",
        answer: '90°',
        choices: ['45°', '60°', '90°', 'Depends on the triangle'],
        answerIndex: 2,
        explanation: "By Thales' theorem, any inscribed angle intercepting a diameter (a 180° arc) is 90°. Half of 180° is 90°.",
      },
    ],
    connections: [
      {
        conceptId: 't6-unit-circle',
        tierId: 6,
        title: 'The Unit Circle',
        bridgeFormula: '(cos θ, sin θ) on the unit circle',
        explanation: "The unit circle is a circle of radius 1 centered at the origin. Every angle θ corresponds to a point on it, and circle geometry explains the Pythagorean identity and trig relationships.",
      },
      {
        conceptId: 't4-pythagorean-theorem',
        tierId: 4,
        title: 'Pythagorean Theorem',
        bridgeFormula: 'x² + y² = r² (equation of a circle)',
        explanation: 'The equation of a circle centered at the origin is x² + y² = r². This is exactly the Pythagorean theorem: r is the hypotenuse of a right triangle with legs x and y to any point on the circle.',
      },
    ],
  },

  {
    id: 't4-surface-area',
    tierId: 4,
    glyph: '□',
    title: 'Surface area of 3D shapes',
    subtitle: 'The total area of every face — the paint problem',
    tags: ['geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'cube-3d',
    canvasLabel: '3D Shape Net',
    conceptTab: {
      summary: 'Surface area is the total area of all exposed faces of a three-dimensional solid. It answers: how much material covers the outside?',
      whyItMatters:
        "Surface area appears every time an outside covering matters: wrapping a gift, painting a building, tiling a pool, manufacturing a can, or computing heat loss from a structure. Engineers designing packaging minimize surface area to reduce material cost. Biologists note that small cells have high surface-area-to-volume ratios, which controls how quickly they exchange nutrients. Surface area bridges the flat geometry of polygons with the three-dimensional world.",
      coreIdea:
        "Surface area (SA) is found by unfolding (or 'netting') a 3D shape into its flat faces, computing each area, and adding them up.\n\nKEY FORMULAS:\n\nRectangular Prism (box): l × w × h\nSA = 2lw + 2lh + 2wh\n(6 rectangles — opposite faces are equal)\n\nCube (side s):\nSA = 6s²\n(6 identical square faces)\n\nTriangular Prism:\nSA = (area of 2 triangular bases) + (area of 3 rectangular lateral faces)\n\nCylinder (radius r, height h):\nSA = 2πr² + 2πrh\n(2 circular bases + lateral rectangle when unrolled)\n\nCone (radius r, slant height l):\nSA = πr² + πrl\n(1 circular base + lateral sector)\n\nSphere (radius r):\nSA = 4πr²\n\nKEY INSIGHT: A cylinder unrolled becomes a rectangle with width = circumference = 2πr and height h. This is why the lateral area is 2πrh.",
      formula: 'SA_cylinder = 2πr² + 2πrh',
      formulaLabel: 'Surface area of a cylinder:',
      insights: [
        "The net of a solid is its 2D unfolded form. Every surface area formula is just the sum of areas of the polygons (or curved surfaces) in the net. If you ever forget a formula, unfold the solid mentally and add the pieces.",
        "Surface-area-to-volume ratio is biologically and physically critical. Small objects have much larger SA:V ratios than large ones. This is why small animals lose heat faster relative to their mass, why medicines are often powdered (maximizing surface for absorption), and why cells divide rather than grow arbitrarily large.",
        "The surface area formula for a sphere, SA = 4πr², is not obvious — it requires calculus (integration) to derive rigorously. Archimedes proved that the surface of a sphere equals the lateral area of its enclosing cylinder, a beautiful result connecting these two shapes.",
      ],
    },
    guided: {
      problemStatement: 'A can of soup is a cylinder with radius 4 cm and height 12 cm. Find its total surface area (top, bottom, and label).',
      steps: [
        {
          label: 'Identify the formula',
          math: 'SA = 2πr² + 2πrh',
          explanation: '2πr² covers both circular ends (top and bottom). 2πrh covers the lateral (side) surface — the label.',
        },
        {
          label: 'Compute the area of both circular ends',
          math: '2πr² = 2π(4)² = 2π(16) = 32π cm²',
          explanation: 'Each circular face has area πr² = π(16) = 16π. Two faces: 32π.',
        },
        {
          label: 'Compute the lateral area',
          math: '2πrh = 2π(4)(12) = 96π cm²',
          explanation: 'Unroll the label into a rectangle: width = circumference = 2π(4) = 8π, height = 12. Area = 8π × 12 = 96π.',
        },
        {
          label: 'Add all parts',
          math: 'SA = 32π + 96π = 128π ≈ 402.1 cm²',
          explanation: 'Total surface area = 128π cm². As a decimal, 128 × 3.1416 ≈ 402.1 cm².',
          connectionNote: 'The lateral area 2πrh dominates when the can is tall and thin; the circular ends dominate when it is wide and short. This trade-off matters in packaging optimization.',
        },
      ],
      reflectionPrompt: 'If you double the radius of the cylinder but keep the height the same, how does the surface area change? Which term (circular ends or lateral) grows faster? Why does doubling a length not simply double the area?',
    },
    practice: [
      {
        question: 'What is the surface area of a cube with side length 5 cm?',
        mathNotation: 'SA = 6s²',
        answer: '150 cm²',
        choices: ['25 cm²', '100 cm²', '125 cm²', '150 cm²'],
        answerIndex: 3,
        explanation: 'SA = 6s² = 6(5)² = 6 × 25 = 150 cm². A cube has 6 identical square faces.',
      },
      {
        question: 'A rectangular box is 3 cm × 4 cm × 5 cm. What is its surface area?',
        mathNotation: 'SA = 2lw + 2lh + 2wh',
        answer: '94 cm²',
        choices: ['60 cm²', '94 cm²', '120 cm²', '47 cm²'],
        answerIndex: 1,
        explanation: 'SA = 2(3)(4) + 2(3)(5) + 2(4)(5) = 24 + 30 + 40 = 94 cm².',
      },
      {
        question: 'What is the lateral surface area of a cylinder with radius 3 cm and height 10 cm?',
        mathNotation: 'Lateral SA = 2πrh',
        answer: '60π cm²',
        choices: ['30π cm²', '18π cm²', '60π cm²', '90π cm²'],
        answerIndex: 2,
        explanation: 'Lateral SA = 2πrh = 2π(3)(10) = 60π cm². The two circular ends are not included.',
      },
    ],
    connections: [
      {
        conceptId: 't4-volume',
        tierId: 4,
        title: 'Volume of Prisms and Cylinders',
        bridgeFormula: 'SA vs Volume — different measures of 3D size',
        explanation: 'Surface area measures the outside covering; volume measures the inside capacity. They use the same dimensions but different formulas. A solid can have large volume and small surface area, or vice versa — a key distinction in engineering and biology.',
      },
      {
        conceptId: 't4-pythagorean-theorem',
        tierId: 4,
        title: 'Pythagorean Theorem',
        bridgeFormula: 'Slant height l = √(r² + h²)',
        explanation: 'The slant height of a cone or pyramid — needed for its surface area formula — is found using the Pythagorean theorem. The radius and vertical height are the legs; the slant height is the hypotenuse.',
      },
      {
        conceptId: 't6-trig-functions',
        tierId: 6,
        title: 'Arc Length and Sector Area',
        bridgeFormula: 'SA_sphere = 4πr²',
        explanation: 'Computing the surface areas of curved solids (spheres, cones) requires integrating over curved regions — precisely the arc length and sector area ideas from circle geometry, extended by calculus into full surfaces.',
      },
    ],
  },

  {
    id: 't4-volume',
    tierId: 4,
    glyph: '∛',
    title: 'Volume of prisms and cylinders',
    subtitle: 'How much space a solid occupies — the universal V = Bh idea',
    tags: ['geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'volume-fill',
    canvasLabel: 'Cylinder Volume',
    conceptTab: {
      summary: 'Volume measures how much three-dimensional space a solid occupies. For any prism or cylinder, volume equals the area of the base times the height: V = Bh.',
      whyItMatters:
        "Volume is indispensable in science and engineering: how much water fits in a pipe, how much concrete is needed for a foundation, how many cells fit in a container. Liquids and gases are measured by volume (liters, cubic meters, gallons). Drug dosages, fuel tank capacities, and industrial chemical quantities are all volume calculations. Every design problem involving three-dimensional space requires volume.",
      coreIdea:
        "The KEY INSIGHT for prisms and cylinders: volume = (area of base) × height.\n\nV = B × h\n\nWhere B is the base area and h is the perpendicular height.\n\nThis works because the solid is built by stacking identical cross-sections (layers) from bottom to top.\n\nSPECIFIC FORMULAS:\n\nRectangular Prism: V = l × w × h  (base area B = lw)\n\nCube: V = s³  (base area B = s²)\n\nTriangular Prism: V = (½bh_triangle) × l\n(B = triangular base area; l = length of the prism)\n\nCylinder: V = πr²h  (base area B = πr²)\n\nCAVALIERI'S PRINCIPLE: Two solids with equal heights and equal cross-sectional areas at every height have equal volumes — even if they are tilted or differently shaped. An oblique cylinder has the same volume as a right cylinder with the same base and height.\n\nPyramids and cones: V = (1/3)Bh — one-third the prism volume with the same base and height.",
      formula: 'V = Bh  (V = πr²h for a cylinder)',
      formulaLabel: 'Volume of prism/cylinder:',
      insights: [
        "The factor of 1/3 in pyramid and cone volume is not obvious — it requires calculus to derive rigorously. But you can see it experimentally: fill a cone-shaped container three times to fill a cylinder with the same base and height. The formula V = (1/3)Bh captures an exact mathematical truth discoverable with water and two containers.",
        'Units of volume are always cubic: cm³, m³, ft³. Area is squared (two dimensions); volume is cubed (three dimensions). When you multiply three length measurements together, the units multiply too: cm × cm × cm = cm³. Dimensional analysis catches errors instantly.',
        "Cavalieri's Principle, formalized in the 17th century, means a tilted stack of coins has the same volume as an upright stack — only height and cross-section matter. This principle is the geometric precursor to integration, where volume is computed by summing infinitely many infinitesimal slices.",
      ],
    },
    guided: {
      problemStatement: 'A cylindrical water tank has a radius of 5 m and a height of 8 m. Find its volume in cubic meters and in liters (1 m³ = 1000 L).',
      steps: [
        {
          label: 'Identify the base and height',
          math: 'Base: circle with r = 5 m.  Height: h = 8 m.',
          explanation: 'The base of the cylinder is a circle. Identify the radius and height before applying the formula.',
        },
        {
          label: 'Compute the base area',
          math: 'B = πr² = π(5)² = 25π m²',
          explanation: 'Area of the circular base: π × 5² = 25π. Keep in terms of π for an exact answer.',
        },
        {
          label: 'Multiply by height',
          math: 'V = B × h = 25π × 8 = 200π m³',
          explanation: 'V = πr²h = 25π × 8 = 200π. As a decimal: 200 × 3.1416 ≈ 628.3 m³.',
        },
        {
          label: 'Convert to liters',
          math: '200π m³ × 1000 L/m³ = 200,000π L ≈ 628,318 L',
          explanation: 'Multiply by 1000 to convert m³ to liters. This tank holds approximately 628,000 liters — over half a million liters of water.',
          connectionNote: 'The enormous capacity illustrates why industrial tanks are cylinders: circles maximize area for a given perimeter (isoperimetric inequality), making cylinders the most efficient shape per unit of material.',
        },
      ],
      reflectionPrompt: 'Compare a cylinder of radius 4 m and height 9 m with a cylinder of radius 6 m and height 4 m. Which has the greater volume? What does this tell you about how changing radius vs. height affects volume?',
    },
    practice: [
      {
        question: 'What is the volume of a rectangular prism 6 cm × 4 cm × 3 cm?',
        mathNotation: 'V = lwh',
        answer: '72 cm³',
        choices: ['36 cm³', '48 cm³', '72 cm³', '96 cm³'],
        answerIndex: 2,
        explanation: 'V = 6 × 4 × 3 = 72 cm³.',
      },
      {
        question: 'A cylinder has radius 3 cm and height 7 cm. What is its volume?',
        mathNotation: 'V = πr²h',
        answer: '63π cm³',
        choices: ['21π cm³', '42π cm³', '63π cm³', '126π cm³'],
        answerIndex: 2,
        explanation: 'V = π(3)²(7) = π(9)(7) = 63π cm³.',
      },
      {
        question: 'A triangular prism has a triangular base with base 4 cm, height 3 cm, and a length of 10 cm. What is its volume?',
        mathNotation: 'V = (½ × base × height_triangle) × length',
        answer: '60 cm³',
        choices: ['30 cm³', '60 cm³', '120 cm³', '24 cm³'],
        answerIndex: 1,
        explanation: 'Base area = ½ × 4 × 3 = 6 cm². V = 6 × 10 = 60 cm³.',
      },
    ],
    connections: [
      {
        conceptId: 't4-surface-area',
        tierId: 4,
        title: 'Surface Area of 3D Shapes',
        bridgeFormula: 'SA measures outside; V measures inside',
        explanation: 'Surface area and volume are both measures of 3D solids but capture different things. For a container, volume determines capacity and surface area determines material cost. Understanding both — and how they scale differently — is essential in design and science.',
      },
      {
        conceptId: 't4-circles-geometry',
        tierId: 4,
        title: 'Circle Geometry',
        bridgeFormula: 'V_cylinder = (πr²)h',
        explanation: "The cylinder's base is a circle. Its volume formula πr²h multiplies the circle area formula πr² by the height. Mastery of circle area is the direct prerequisite for cylinder and cone volume.",
      },
      {
        conceptId: 't7-riemann-sums-integrals',
        tierId: 7,
        title: 'Riemann Sums',
        bridgeFormula: 'V = ∫A(x)dx (disk/washer method)',
        explanation: "Volume by slicing — the disk and washer methods in calculus — is the limiting case of Cavalieri's Principle. Stacking infinitely many infinitesimally thin circular slices and summing their areas is exactly a Riemann sum in disguise.",
      },
    ],
  },

  {
    id: 't4-transformations',
    tierId: 4,
    glyph: '↻',
    title: 'Transformations — reflections, rotations, translations',
    subtitle: 'Moving and flipping shapes without changing their size or shape',
    tags: ['geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'triangle-transform',
    canvasLabel: 'Transformation on Coordinate Plane',
    conceptTab: {
      summary: "Transformations are rules that move every point of a figure to a new location. Reflections flip, rotations turn, and translations slide — all without changing the figure's size or shape.",
      whyItMatters:
        "Computer graphics, animation, robotics, and architecture all depend on transformations. Rotating a 3D model, animating a character walking, or computing the trajectory of a robotic arm all come down to applying sequences of translations and rotations to coordinate points. The mathematics is the same whether the object is a triangle on paper or a satellite in orbit.",
      coreIdea:
        "RIGID TRANSFORMATIONS (isometries) preserve size and shape — the image is congruent to the original.\n\nTRANSLATION: slide every point by the same vector (a, b).\nRule: (x, y) → (x + a, y + b)\nExample: translate by (3, −2): (1, 4) → (4, 2)\n\nREFLECTION: flip over a line (the line of reflection).\n• Over the x-axis: (x, y) → (x, −y)\n• Over the y-axis: (x, y) → (−x, y)\n• Over y = x: (x, y) → (y, x)\n• Over y = −x: (x, y) → (−y, −x)\n\nROTATION about the origin:\n• 90° counterclockwise: (x, y) → (−y, x)\n• 180°: (x, y) → (−x, −y)\n• 270° counterclockwise (= 90° clockwise): (x, y) → (y, −x)\n\nDILATION (not rigid — changes size):\n(x, y) → (kx, ky)  — scale factor k\n\nCompositions: apply transformations one after another. The order matters.",
      formula: 'Translation: (x, y) → (x + a, y + b)',
      formulaLabel: 'Transformation rules:',
      insights: [
        'Every rigid transformation preserves distance between points and angle measures. This is exactly what congruence means: two figures are congruent if and only if one can be mapped onto the other by a sequence of rigid transformations.',
        'Reflections are the building blocks of all rigid transformations. Every rotation is equivalent to two reflections across intersecting lines; every translation is equivalent to two reflections across parallel lines. This means reflections generate all of rigid geometry.',
        'In linear algebra and computer graphics, transformations are represented as matrix multiplications. A rotation by angle θ is the matrix [[cosθ, −sinθ], [sinθ, cosθ]] applied to a coordinate vector. The algebraic rules you learn here are exactly the matrix operations at the heart of 3D rendering engines.',
      ],
    },
    guided: {
      problemStatement: 'Triangle ABC has vertices A(1, 2), B(4, 2), C(4, 5). (a) Translate by (−3, 1). (b) Reflect the original over the y-axis.',
      steps: [
        {
          label: 'Apply the translation to each vertex',
          math: "A'(1−3, 2+1) = (−2, 3);  B'(4−3, 2+1) = (1, 3);  C'(4−3, 5+1) = (1, 6)",
          explanation: "Add −3 to every x-coordinate and +1 to every y-coordinate. The triangle slides left 3 and up 1. The shape and size are unchanged — the image A'B'C' is congruent to ABC.",
        },
        {
          label: 'Apply reflection over the y-axis to the original vertices',
          math: 'Reflection over y-axis: (x, y) → (−x, y)',
          explanation: 'Negate each x-coordinate; keep each y-coordinate the same. The y-axis is a mirror.',
        },
        {
          label: 'Compute the reflected coordinates',
          math: "A''(−1, 2);  B''(−4, 2);  C''(−4, 5)",
          explanation: "Negate x: A(1,2) → (−1,2), B(4,2) → (−4,2), C(4,5) → (−4,5). The triangle flips to the left side of the y-axis.",
          connectionNote: "Notice that the reflected triangle A''B''C'' and the original ABC are mirror images across the y-axis — corresponding distances from the y-axis are equal.",
        },
      ],
      reflectionPrompt: "What single transformation maps the original triangle ABC onto the translated image A'B'C'? If you then reflect A'B'C' over the y-axis, what is the composition of those two transformations? Is the result a rotation, translation, or reflection of the original?",
    },
    practice: [
      {
        question: "The point (3, −5) is translated by (−2, 4). What are the new coordinates?",
        mathNotation: '(3 + (−2), −5 + 4)',
        answer: '(1, −1)',
        choices: ['(5, −9)', '(1, −1)', '(−1, 1)', '(3, −1)'],
        answerIndex: 1,
        explanation: 'x: 3 + (−2) = 1. y: −5 + 4 = −1. New point: (1, −1).',
      },
      {
        question: 'The point (4, 7) is reflected over the x-axis. What are the new coordinates?',
        mathNotation: '(x, y) → (x, −y)',
        answer: '(4, −7)',
        choices: ['(−4, 7)', '(4, −7)', '(−4, −7)', '(7, 4)'],
        answerIndex: 1,
        explanation: 'Reflection over the x-axis negates the y-coordinate: (4, 7) → (4, −7).',
      },
      {
        question: 'The point (2, 5) is rotated 90° counterclockwise about the origin. What is the image?',
        mathNotation: '(x, y) → (−y, x)',
        answer: '(−5, 2)',
        choices: ['(5, −2)', '(−5, 2)', '(−2, −5)', '(5, 2)'],
        answerIndex: 1,
        explanation: '90° counterclockwise: (x, y) → (−y, x). So (2, 5) → (−5, 2).',
      },
    ],
    connections: [
      {
        conceptId: 't4-triangle-congruence',
        tierId: 4,
        title: 'Triangle Congruence and Similarity',
        bridgeFormula: 'Congruence ↔ exists a rigid transformation mapping one to the other',
        explanation: 'The modern definition of congruence is transformation-based: two figures are congruent if and only if one can be mapped to the other by a sequence of reflections, rotations, and translations. This unifies the SSS/SAS/ASA criteria with the transformation framework.',
      },
      {
        conceptId: 't4-coordinate-geometry',
        tierId: 4,
        title: 'Coordinate Geometry',
        bridgeFormula: '(x, y) → (x + a, y + b)',
        explanation: 'All transformation rules are stated in coordinate form. Translating, reflecting, and rotating require exactly the coordinate algebra and distance reasoning developed in coordinate geometry.',
      },
      {
        conceptId: 't6-function-transformations',
        tierId: 6,
        title: 'Function Transformations',
        bridgeFormula: 'f(x − h) + k shifts graph right h, up k',
        explanation: "Transforming function graphs is the direct algebraic analog of geometric transformations. Shifting f(x) horizontally is a translation; negating the input is a reflection; stretching is a dilation. Geometric and function transformations are the same ideas in different notation.",
      },
    ],
  },

  {
    id: 't4-triangle-inequality',
    tierId: 4,
    glyph: '△',
    title: 'Triangle inequality and angle-side relationships',
    subtitle: 'The constraints that make a valid triangle — and the side-angle link',
    tags: ['geometry'],
    accessibilityLevel: 'high',
    visualizationType: 'triangle-inequality',
    canvasLabel: 'Triangle Inequality',
    conceptTab: {
      summary: 'Not every three lengths form a triangle. The triangle inequality states that the sum of any two sides must exceed the third. Within a triangle, larger angles always face longer sides.',
      whyItMatters:
        "The triangle inequality is one of the most fundamental inequalities in mathematics. It applies to distances in any metric space — including probability, data science, and network routing — whenever you need to compare direct distances with indirect paths. In geometry specifically, it tells engineers and architects which truss configurations are possible, and it predicts which sides of a triangular structure bear more load.",
      coreIdea:
        "TRIANGLE INEQUALITY THEOREM:\nThree lengths a, b, c can form a triangle if and only if:\n• a + b > c\n• a + c > b\n• b + c > a\n(All three conditions must hold.)\n\nIn practice, only check: (sum of the two smaller sides) > (largest side).\n\nExample: Can 4, 7, 12 form a triangle?\n4 + 7 = 11 < 12. No — the two shorter sides do not reach across the longest.\n\nExample: Can 5, 8, 10 form a triangle?\n5 + 8 = 13 > 10. Yes. ✓\n\nANGLE-SIDE RELATIONSHIP:\n• The longest side is opposite the largest angle.\n• The shortest side is opposite the smallest angle.\n• Equal sides are opposite equal angles (isosceles triangle property).\n\nExterior Angle Inequality: An exterior angle of a triangle is greater than either non-adjacent interior angle.",
      formula: 'a + b > c,  a + c > b,  b + c > a',
      formulaLabel: 'Triangle inequality:',
      insights: [
        'The triangle inequality becomes an equality in the degenerate case: if a + b = c, the three points are collinear — the "triangle" has collapsed into a straight line with zero area. The strict inequality > ensures a genuine, non-degenerate triangle.',
        'The angle-side relationship directly enables the hinge theorem (SAS inequality): if two triangles have two pairs of equal sides but the included angle in one is larger, then its opposite side is longer. This is how you compare side lengths across different triangles without computing them.',
        'In the abstract setting of metric spaces, the triangle inequality d(A, C) ≤ d(A, B) + d(B, C) is one of the three defining axioms of a distance (metric). It guarantees that going from A to C directly is no farther than going via B. Every notion of "distance" in mathematics — Euclidean, Manhattan, probability — satisfies this law.',
      ],
    },
    guided: {
      problemStatement: 'The two known sides of a triangle are 6 cm and 10 cm. What is the range of possible lengths for the third side?',
      steps: [
        {
          label: 'Apply the triangle inequality — lower bound',
          math: '6 + x > 10  →  x > 4',
          explanation: 'The sum of the two given sides must exceed the third. Rearranging: x > 10 − 6 = 4. The third side must be more than 4 cm.',
        },
        {
          label: 'Apply the triangle inequality — upper bound',
          math: '6 + 10 > x  →  x < 16',
          explanation: 'The two given sides together must exceed the third. 6 + 10 = 16 > x, so x < 16.',
        },
        {
          label: 'State the range',
          math: '4 < x < 16',
          explanation: 'The third side must be strictly between 4 and 16 centimeters. At exactly 4 or 16, the triangle degenerates to a line segment.',
          connectionNote: 'The range 4 < x < 16 is an open interval — both endpoints excluded. This is a real-world constraint: a bridge truss member with these two anchor lengths must fall strictly within this range to form a stable triangular frame.',
        },
      ],
      reflectionPrompt: 'A triangle has angles 35°, 70°, and 75°. Without knowing the side lengths, rank the three sides from shortest to longest. Which theorem justifies your answer?',
    },
    practice: [
      {
        question: 'Can sides of length 3, 5, and 9 form a triangle?',
        mathNotation: '3 + 5 vs 9',
        answer: 'No — 3 + 5 = 8 < 9',
        choices: [
          'Yes — all three sides are positive',
          'No — 3 + 5 = 8 < 9',
          'Yes — two sides exceed the third',
          'Cannot determine without angles',
        ],
        answerIndex: 1,
        explanation: '3 + 5 = 8, which is less than 9. The two shorter sides cannot bridge the longest. Not a valid triangle.',
      },
      {
        question: 'In a triangle, the longest side is opposite which angle?',
        mathNotation: 'Angle-side relationship',
        answer: 'The largest angle',
        choices: ['The smallest angle', 'The largest angle', 'The right angle only', 'The middle angle'],
        answerIndex: 1,
        explanation: 'The angle-side relationship: in any triangle, the largest angle is opposite the longest side and the smallest angle is opposite the shortest side.',
      },
      {
        question: 'Two sides of a triangle are 7 and 11. Which value CANNOT be the third side?',
        mathNotation: '|11 − 7| < x < 11 + 7',
        answer: '18',
        choices: ['5', '10', '15', '18'],
        answerIndex: 3,
        explanation: 'The third side must satisfy 4 < x < 18. The value 18 is not strictly less than 18, so it fails. (At 18, 7 + 11 = 18, which is not strictly greater than 18.)',
      },
    ],
    connections: [
      {
        conceptId: 't4-triangle-congruence',
        tierId: 4,
        title: 'Triangle Congruence and Similarity',
        bridgeFormula: 'SSS congruence requires valid triangle sides',
        explanation: 'Before checking SSS congruence, the three given sides must satisfy the triangle inequality. The inequality is the prerequisite check — if it fails, there is no triangle to be congruent to.',
      },
      {
        conceptId: 't4-midsegment-theorem',
        tierId: 4,
        title: 'Midsegment Theorem and Proportional Parts',
        bridgeFormula: 'Midsegment = ½ × (base)',
        explanation: 'The midsegment theorem is a proportional result about sides of a triangle. The triangle inequality governs when such a triangle exists at all; the midsegment theorem governs how the sides relate internally.',
      },
      {
        conceptId: 't6-law-of-cosines',
        tierId: 6,
        title: 'Law of Cosines',
        bridgeFormula: 'c² = a² + b² − 2ab cos C',
        explanation: 'The law of cosines computes any side or angle of any triangle. It implicitly enforces the triangle inequality: if the given sides violate it, the law of cosines produces an impossible angle (cos C > 1 or < −1), which is the algebraic signature of a degenerate triangle.',
      },
    ],
  },

  {
    id: 't4-midsegment-theorem',
    tierId: 4,
    glyph: '∥',
    title: 'Midsegment theorem and proportional parts',
    subtitle: 'The segment connecting two midpoints — half the base and always parallel',
    tags: ['geometry', 'proof'],
    accessibilityLevel: 'high',
    visualizationType: 'midsegment-draw',
    canvasLabel: 'Triangle Midsegment',
    conceptTab: {
      summary: 'The midsegment of a triangle connects the midpoints of two sides. It is always parallel to the third side and exactly half as long. This is a special case of the broader proportionality theorem for parallel lines.',
      whyItMatters:
        "The midsegment theorem is a cornerstone of proportional reasoning in geometry. It explains why every triangle can be divided into four congruent smaller triangles. In engineering and architecture, understanding how a structure's middle section relates to its overall span enables efficient truss and frame design. In coordinate geometry, it reduces to the midpoint formula — the algebra and geometry fuse perfectly.",
      coreIdea:
        "MIDSEGMENT THEOREM:\nIf M and N are the midpoints of two sides of a triangle, then MN is parallel to the third side and MN = ½ × (third side).\n\nExample: In △ABC with M the midpoint of AB and N the midpoint of AC:\n• MN ∥ BC\n• MN = ½ BC\n\nPROOF IDEA (coordinate proof):\nPlace A at origin, B = (2b, 0), C = (2c, 2d).\nM = midpoint of AB = (b, 0)\nN = midpoint of AC = (c, d)\nSlope of MN = (d − 0)/(c − b) = d/(c − b)\nSlope of BC = (2d − 0)/(2c − 2b) = d/(c − b). Equal → parallel. ✓\nMN = √((c−b)² + d²)\nBC = √((2c−2b)² + (2d)²) = 2√((c−b)² + d²) = 2·MN ✓\n\nTRIANGLE PROPORTIONALITY THEOREM (generalization):\nIf a line is parallel to one side of a triangle and intersects the other two sides, it divides those sides proportionally:\nAD/DB = AE/EC",
      formula: 'Midsegment = ½ × base;  Midsegment ∥ base',
      formulaLabel: 'Midsegment theorem:',
      insights: [
        'The midsegment divides the triangle into four congruent smaller triangles, each similar to the original with scale factor 1/2. The medial triangle (formed by all three midsegments) has area equal to one-quarter of the original.',
        'The coordinate proof of the midsegment theorem is a template for all coordinate geometry proofs: place the figure strategically (using even numbers like 2b makes midpoints come out cleanly), compute the needed quantities, and compare. Choosing coordinates wisely is the art of the method.',
        'The general triangle proportionality theorem is the key to proving AA similarity of triangles and, from there, all of trigonometry. The midsegment is the special case where the ratio is 1:1 (midpoints). The general case says any parallel cross-section divides the sides in equal ratios.',
      ],
    },
    guided: {
      problemStatement: 'In triangle PQR, S is the midpoint of PQ and T is the midpoint of PR. If QR = 24 cm, find ST. If ST ∥ QR, what does that tell you about angles ∠PST and ∠PQR?',
      steps: [
        {
          label: 'Apply the midsegment theorem',
          math: 'ST = ½ × QR = ½ × 24 = 12 cm',
          explanation: 'S and T are midpoints of two sides of triangle PQR. By the midsegment theorem, ST = ½ × QR = 12 cm.',
        },
        {
          label: 'State the parallel relationship',
          math: 'ST ∥ QR (midsegment is parallel to the third side)',
          explanation: 'The midsegment ST is parallel to QR — the theorem guarantees both the length and the parallelism.',
        },
        {
          label: 'Use parallel line angle reasoning',
          math: '∠PST = ∠PQR (corresponding angles, ST ∥ QR, cut by transversal PQ)',
          explanation: 'Since ST ∥ QR, the line PQ is a transversal crossing two parallel lines. Corresponding angles are equal: ∠PST = ∠PQR.',
          connectionNote: 'This angle equality is exactly what makes triangle PST similar to triangle PQR (AA similarity). The midsegment produces a similar triangle at scale factor 1/2.',
        },
        {
          label: 'Conclude the similarity',
          math: '△PST ~ △PQR with scale factor 1/2',
          explanation: 'Two pairs of equal angles (∠P is shared; ∠PST = ∠PQR) → AA similarity. Corresponding sides are in ratio 1:2.',
        },
      ],
      reflectionPrompt: "If ST = 15 cm and you know S and T are midpoints of two sides of a triangle, what is the length of the third side? Now generalize: if a segment connecting two sides of a triangle is parallel to the third side and equals one-third of the third side, are S and T midpoints? Explain.",
    },
    practice: [
      {
        question: 'The midsegment of a triangle is 9 cm. What is the length of the parallel base?',
        mathNotation: 'Midsegment = ½ × base',
        answer: '18 cm',
        choices: ['4.5 cm', '9 cm', '18 cm', '27 cm'],
        answerIndex: 2,
        explanation: 'Midsegment = ½ × base → 9 = ½ × base → base = 18 cm.',
      },
      {
        question: 'M and N are midpoints of two sides of △ABC with BC = 30 cm. What is MN?',
        mathNotation: 'MN = ½ × BC',
        answer: '15 cm',
        choices: ['10 cm', '15 cm', '20 cm', '30 cm'],
        answerIndex: 1,
        explanation: 'MN = ½ × BC = ½ × 30 = 15 cm.',
      },
      {
        question: 'If a line parallel to one side of a triangle divides the other two sides so that AD = 4 and DB = 6, what is AE/EC?',
        mathNotation: 'AD/DB = AE/EC',
        answer: '4/6 = 2/3',
        choices: ['1/2', '2/3', '3/4', '2/5'],
        answerIndex: 1,
        explanation: 'By the triangle proportionality theorem, AD/DB = AE/EC = 4/6 = 2/3.',
      },
    ],
    connections: [
      {
        conceptId: 't4-triangle-congruence',
        tierId: 4,
        title: 'Triangle Congruence and Similarity',
        bridgeFormula: '△PST ~ △PQR at scale 1:2',
        explanation: 'The midsegment creates a triangle similar to the original with scale factor 1/2 (proven via AA from corresponding angles). The midsegment theorem is a specific application of AA similarity, and it provides a clean example of how similarity produces proportional sides.',
      },
      {
        conceptId: 't4-coordinate-geometry',
        tierId: 4,
        title: 'Coordinate Geometry',
        bridgeFormula: 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)',
        explanation: 'The midsegment theorem is most elegantly proved using the coordinate midpoint formula. The proof strategy — placing triangle vertices at convenient coordinates, then computing — is a general method used throughout coordinate geometry.',
      },
      {
        conceptId: 't4-intro-to-proof',
        tierId: 4,
        title: 'Introduction to Proof',
        bridgeFormula: 'Coordinate proof: compute, compare, conclude',
        explanation: 'The coordinate proof of the midsegment theorem is an excellent model for geometric proof: make strategic choices (even-numbered coordinates), compute what you need (slope and distance), and state the conclusion with justification. It shows proof as a tool, not a formality.',
      },
    ],
  },
];
