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
    visualizationType: 'triangle',
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
    visualizationType: 'triangle',
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
    visualizationType: 'triangle',
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
    visualizationType: 'coordinate-plane',
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
    visualizationType: 'generic',
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
    visualizationType: 'circle',
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
];
