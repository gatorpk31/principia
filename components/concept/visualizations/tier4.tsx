import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '../../../constants/theme';
import { W, H, AnimatedCircle, AnimatedLine, AnimatedRect, type VizProps } from './shared';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── 1. Parallel Angles: drag transversal across parallels ──────────────────
export function ParallelAnglesViz({ accent }: VizProps) {
  const angle = useSharedValue(45);
  const startA = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startA.value = angle.value; })
    .onUpdate(e => { angle.value = clamp(startA.value + e.translationX * 0.5, 15, 75); });

  const y1 = H * 0.33;
  const y2 = H * 0.67;

  const transProps = useAnimatedProps(() => {
    const rad = (angle.value * Math.PI) / 180;
    const dx = Math.cos(rad) * W * 0.5;
    const dy = Math.sin(rad) * W * 0.5;
    const mx = W / 2;
    const my = (y1 + y2) / 2;
    return { x1: mx - dx, y1: my - dy, x2: mx + dx, y2: my + dy };
  });

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <Line x1={30} y1={y1} x2={W - 30} y2={y1} stroke={colors.text2} strokeWidth={2} />
          <Line x1={30} y1={y2} x2={W - 30} y2={y2} stroke={colors.text2} strokeWidth={2} />
          <AnimatedLine animatedProps={transProps} stroke={accent} strokeWidth={2} />
          <SvgText x={W * 0.15} y={y1 - 8} fill={accent} fontSize={11}>∠1</SvgText>
          <SvgText x={W * 0.15} y={y2 - 8} fill={accent} fontSize={11}>∠2</SvgText>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Parallel Lines & Transversal</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag to rotate transversal</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 2. Triangle Congruence: tap to cycle SSS/SAS/ASA/AAS ───────────────────
export function TriangleCongruenceViz({ accent }: VizProps) {
  const [idx, setIdx] = useState(0);
  const types = ['SSS', 'SAS', 'ASA', 'AAS'];
  const label = types[idx];

  // Two triangles
  const t1 = [[W * 0.1, H * 0.7], [W * 0.25, H * 0.25], [W * 0.4, H * 0.7]] as const;
  const t2 = [[W * 0.55, H * 0.7], [W * 0.7, H * 0.25], [W * 0.85, H * 0.7]] as const;

  // Which sides/angles to highlight per type
  const highlights: Record<string, { sides: number[]; angles: number[] }> = {
    SSS: { sides: [0, 1, 2], angles: [] },
    SAS: { sides: [0, 2], angles: [1] },
    ASA: { sides: [0], angles: [0, 2] },
    AAS: { sides: [1], angles: [0, 1] },
  };
  const h = highlights[label];

  const tap = Gesture.Tap().onEnd(() => runOnJS(setIdx)((idx + 1) % types.length));

  const triPath = (pts: readonly (readonly [number, number])[]) =>
    `M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]} L${pts[2][0]},${pts[2][1]} Z`;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{label}</SvgText>
          <Path d={triPath(t1)} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          <Path d={triPath(t2)} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          {/* Highlight matching sides */}
          {[t1, t2].map((tri, ti) =>
            h.sides.map(si => {
              const a = tri[si];
              const b = tri[(si + 1) % 3];
              return <Line key={`s${ti}${si}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={accent} strokeWidth={3} />;
            })
          )}
          {/* Highlight matching angles with small arcs */}
          {[t1, t2].map((tri, ti) =>
            h.angles.map(ai => (
              <Circle key={`a${ti}${ai}`} cx={tri[ai][0]} cy={tri[ai][1]} r={8} fill={accent + '44'} stroke={accent} strokeWidth={1.5} />
            ))
          )}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to cycle congruence types</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 3. Pythagorean Squares: a² + b² = c² ───────────────────────────────────
export function PythagoreanSquaresViz({ accent }: VizProps) {
  const [showAreas, setShowAreas] = useState(false);
  const a = 60;
  const b = 80;
  const c = 100;
  const ox = W * 0.35;
  const oy = H * 0.7;

  const tap = Gesture.Tap().onEnd(() => runOnJS(setShowAreas)(!showAreas));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">a² + b² = c²</SvgText>
          {/* Triangle */}
          <Path d={`M${ox},${oy} L${ox + b * 0.6},${oy} L${ox},${oy - a * 0.6} Z`} stroke={colors.text} strokeWidth={2} fill="none" />
          {/* Square on a (vertical side) */}
          <Rect x={ox - a * 0.6} y={oy - a * 0.6} width={a * 0.6} height={a * 0.6} fill={accent + '33'} stroke={accent} strokeWidth={1} />
          {/* Square on b (horizontal side) */}
          <Rect x={ox} y={oy} width={b * 0.6} height={b * 0.6 * 0.6} fill={accent + '22'} stroke={accent + '88'} strokeWidth={1} />
          {showAreas && (
            <>
              <SvgText x={ox - a * 0.3} y={oy - a * 0.3 + 5} fill={accent} fontSize={11} textAnchor="middle">{a * a}</SvgText>
              <SvgText x={ox + b * 0.3} y={oy + b * 0.2} fill={accent} fontSize={11} textAnchor="middle">{b * b}</SvgText>
              <SvgText x={W * 0.75} y={H / 2} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{a * a}+{b * b}={c * c}</SvgText>
            </>
          )}
          <SvgText x={ox + 4} y={oy - 4} fill={colors.text3} fontSize={10}>a</SvgText>
          <SvgText x={ox + b * 0.3} y={oy - 4} fill={colors.text3} fontSize={10}>b</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to show areas</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 4. Coordinate Geometry: drag point, see midpoint & distance ─────────────
export function CoordinateGeometryViz({ accent }: VizProps) {
  const px = useSharedValue(W * 0.7);
  const py = useSharedValue(H * 0.3);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const ax = W * 0.3;
  const ay = H * 0.65;

  const pan = Gesture.Pan()
    .onBegin(() => { startX.value = px.value; startY.value = py.value; })
    .onUpdate(e => { px.value = clamp(startX.value + e.translationX, 30, W - 30); py.value = clamp(startY.value + e.translationY, 30, H - 30); });

  const dotProps = useAnimatedProps(() => ({ cx: px.value, cy: py.value }));
  const midProps = useAnimatedProps(() => ({ cx: (ax + px.value) / 2, cy: (ay + py.value) / 2 }));
  const lineProps = useAnimatedProps(() => ({ x1: ax, y1: ay, x2: px.value, y2: py.value }));

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <Line x1={20} y1={20} x2={20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <AnimatedLine animatedProps={lineProps} stroke={accent + '66'} strokeWidth={1.5} strokeDasharray="4 4" />
          <Circle cx={ax} cy={ay} r={6} fill={accent} />
          <AnimatedCircle animatedProps={dotProps} r={7} fill={accent} />
          <AnimatedCircle animatedProps={midProps} r={5} fill={accent + '88'} />
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Midpoint & Distance</SvgText>
          <SvgText x={ax} y={ay + 18} fill={colors.text3} fontSize={10} textAnchor="middle">A</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag point B</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 5. Proof Chain: tap to highlight logical steps ──────────────────────────
export function ProofChainViz({ accent }: VizProps) {
  const [active, setActive] = useState(0);
  const statements = ['Given: ∠A ≅ ∠D', 'AB ∥ CD (Alt Int ∠)', '△ABE ≅ △DCE', 'BE ≅ CE (CPCTC)'];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setActive)((active + 1) % statements.length));

  const boxH = 34;
  const gap = 8;
  const startY = 30;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Proof Chain</SvgText>
          {statements.map((s, i) => {
            const y = startY + i * (boxH + gap);
            const isActive = i <= active;
            return (
              <G key={i}>
                <Rect x={W * 0.1} y={y} width={W * 0.8} height={boxH} rx={8} fill={isActive ? accent + '22' : colors.surface2} stroke={isActive ? accent : colors.border} strokeWidth={isActive ? 2 : 1} />
                <SvgText x={W / 2} y={y + boxH / 2 + 5} fill={isActive ? accent : colors.text2} fontSize={12} fontWeight={isActive ? 'bold' : 'normal'} textAnchor="middle">{s}</SvgText>
                {i < statements.length - 1 && (
                  <Line x1={W / 2} y1={y + boxH} x2={W / 2} y2={y + boxH + gap} stroke={isActive && i < active ? accent : colors.border} strokeWidth={2} />
                )}
              </G>
            );
          })}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to advance proof</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 6. Circle Parts: tap to cycle radius/diameter/chord/arc/tangent ─────────
export function CirclePartsViz({ accent }: VizProps) {
  const [part, setPart] = useState(0);
  const parts = ['Radius', 'Diameter', 'Chord', 'Arc', 'Tangent'];
  const label = parts[part];
  const cx = W / 2;
  const cy = H / 2;
  const r = 65;

  const tap = Gesture.Tap().onEnd(() => runOnJS(setPart)((part + 1) % parts.length));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <Circle cx={cx} cy={cy} r={r} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          <Circle cx={cx} cy={cy} r={3} fill={colors.text2} />
          {part === 0 && <Line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={accent} strokeWidth={3} />}
          {part === 1 && <Line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={accent} strokeWidth={3} />}
          {part === 2 && <Line x1={cx - r * 0.7} y1={cy - r * 0.7} x2={cx + r * 0.5} y2={cy + r * 0.85} stroke={accent} strokeWidth={3} />}
          {part === 3 && (
            <Path d={`M${cx + r * Math.cos(-0.5)},${cy + r * Math.sin(-0.5)} A${r},${r} 0 0,1 ${cx + r * Math.cos(1.2)},${cy + r * Math.sin(1.2)}`} stroke={accent} strokeWidth={4} fill="none" />
          )}
          {part === 4 && <Line x1={cx + r - 40} y1={cy - r - 10} x2={cx + r + 40} y2={cy - r - 10} stroke={accent} strokeWidth={3} />}
          <SvgText x={W / 2} y={16} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{label}</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to cycle parts</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 7. Cube 3D: tap to rotate between views ─────────────────────────────────
export function Cube3dViz({ accent }: VizProps) {
  const [view, setView] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setView)((view + 1) % 3));

  const cx = W / 2;
  const cy = H / 2;
  const s = 45;

  // Isometric offsets per view
  const offsets = [
    { dx: 20, dy: -12 },
    { dx: 25, dy: -8 },
    { dx: 12, dy: -20 },
  ];
  const { dx, dy } = offsets[view];

  // Front face
  const f = [
    [cx - s, cy - s], [cx + s, cy - s],
    [cx + s, cy + s], [cx - s, cy + s],
  ];
  // Back face
  const b = f.map(([x, y]) => [x + dx, y + dy]);

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Faces: 6 · Edges: 12 · Vertices: 8</SvgText>
          {/* Back edges */}
          {[0, 1, 2, 3].map(i => (
            <Line key={`b${i}`} x1={b[i][0]} y1={b[i][1]} x2={b[(i + 1) % 4][0]} y2={b[(i + 1) % 4][1]} stroke={accent + '44'} strokeWidth={1} strokeDasharray="4 4" />
          ))}
          {/* Connecting edges */}
          {[0, 1, 2, 3].map(i => (
            <Line key={`c${i}`} x1={f[i][0]} y1={f[i][1]} x2={b[i][0]} y2={b[i][1]} stroke={accent + '88'} strokeWidth={1.5} />
          ))}
          {/* Front face */}
          <Path d={`M${f[0][0]},${f[0][1]} L${f[1][0]},${f[1][1]} L${f[2][0]},${f[2][1]} L${f[3][0]},${f[3][1]} Z`} stroke={accent} strokeWidth={2} fill={accent + '11'} />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to rotate view</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 8. Volume Fill: drag slider to fill rectangular prism ───────────────────
export function VolumeFillViz({ accent }: VizProps) {
  const fill = useSharedValue(0.4);
  const startF = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startF.value = fill.value; })
    .onUpdate(e => { fill.value = clamp(startF.value - e.translationY / (H - 60), 0, 1); });

  const l = 3;
  const w = 4;
  const h = 5;
  const vol = l * w * h;

  const prismX = W * 0.25;
  const prismW = 100;
  const prismH = 120;
  const prismY = 30;

  const fillProps = useAnimatedProps(() => ({
    y: prismY + prismH * (1 - fill.value),
    height: prismH * fill.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W * 0.7} y={40} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">V = l × w × h</SvgText>
          <SvgText x={W * 0.7} y={60} fill={colors.text} fontSize={12} textAnchor="middle">{l} × {w} × {h} = {vol}</SvgText>
          <Rect x={prismX} y={prismY} width={prismW} height={prismH} rx={4} fill={colors.surface2} stroke={colors.border} strokeWidth={1.5} />
          <AnimatedRect animatedProps={fillProps} x={prismX + 1} width={prismW - 2} rx={3} fill={accent + '44'} />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag to fill</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 9. Triangle Transform: tap to cycle translate/reflect/rotate ────────────
export function TriangleTransformViz({ accent }: VizProps) {
  const [state, setState] = useState(0);
  const labels = ['Original', 'Translated', 'Reflected', 'Rotated'];
  const transforms = [
    [[W * 0.3, H * 0.65], [W * 0.4, H * 0.3], [W * 0.5, H * 0.65]],
    [[W * 0.5, H * 0.65], [W * 0.6, H * 0.3], [W * 0.7, H * 0.65]],
    [[W * 0.3, H * 0.3], [W * 0.4, H * 0.65], [W * 0.5, H * 0.3]],
    [[W * 0.55, H * 0.55], [W * 0.35, H * 0.45], [W * 0.55, H * 0.25]],
  ];
  const pts = transforms[state];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setState)((state + 1) % labels.length));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{labels[state]}</SvgText>
          {/* Ghost of original */}
          {state > 0 && (
            <Path d={`M${transforms[0][0][0]},${transforms[0][0][1]} L${transforms[0][1][0]},${transforms[0][1][1]} L${transforms[0][2][0]},${transforms[0][2][1]} Z`} stroke={colors.border} strokeWidth={1} fill="none" strokeDasharray="4 4" />
          )}
          <Path d={`M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]} L${pts[2][0]},${pts[2][1]} Z`} stroke={accent} strokeWidth={2} fill={accent + '22'} />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to transform</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 10. Triangle Inequality: drag side, see if valid ────────────────────────
export function TriangleInequalityViz({ accent }: VizProps) {
  const cLen = useSharedValue(W * 0.35);
  const startC = useSharedValue(0);
  const a = 80;
  const b = 100;

  const pan = Gesture.Pan()
    .onBegin(() => { startC.value = cLen.value; })
    .onUpdate(e => { cLen.value = clamp(startC.value + e.translationX, 20, W * 0.8); });

  const barY = [60, 90, 120];
  const barProps = useAnimatedProps(() => ({ width: cLen.value }));

  const [valid, setValid] = useState(true);

  // Check validity reactively via a tap (simplification)
  const tap = Gesture.Tap().onEnd(() => {
    // Toggle doesn't apply here; we just let pan do the work
  });

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Triangle Inequality</SvgText>
          <SvgText x={30} y={barY[0] + 14} fill={colors.text2} fontSize={11}>a:</SvgText>
          <Rect x={50} y={barY[0]} width={a} height={18} rx={4} fill={accent + '88'} />
          <SvgText x={30} y={barY[1] + 14} fill={colors.text2} fontSize={11}>b:</SvgText>
          <Rect x={50} y={barY[1]} width={b} height={18} rx={4} fill={accent + '88'} />
          <SvgText x={30} y={barY[2] + 14} fill={colors.text2} fontSize={11}>c:</SvgText>
          <AnimatedRect animatedProps={barProps} x={50} y={barY[2]} height={18} rx={4} fill={accent + 'cc'} />
          <SvgText x={W / 2} y={160} fill={colors.text} fontSize={14} fontWeight="bold" textAnchor="middle">a + b {'>'} c ?</SvgText>
          <SvgText x={W / 2} y={180} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">{a} + {b} = {a + b}</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag c bar to test</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 11. Midsegment Draw: tap to show midsegment ────────────────────────────
export function MidsegmentDrawViz({ accent }: VizProps) {
  const [show, setShow] = useState(false);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setShow)(!show));

  const A: [number, number] = [W * 0.15, H * 0.75];
  const B: [number, number] = [W * 0.5, H * 0.15];
  const C: [number, number] = [W * 0.85, H * 0.75];
  const midAB: [number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const midBC: [number, number] = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Midsegment Theorem</SvgText>
          <Path d={`M${A[0]},${A[1]} L${B[0]},${B[1]} L${C[0]},${C[1]} Z`} stroke={colors.text2} strokeWidth={2} fill="none" />
          <Circle cx={midAB[0]} cy={midAB[1]} r={5} fill={accent} />
          <Circle cx={midBC[0]} cy={midBC[1]} r={5} fill={accent} />
          {show && (
            <>
              <Line x1={midAB[0]} y1={midAB[1]} x2={midBC[0]} y2={midBC[1]} stroke={accent} strokeWidth={3} />
              <Line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={accent + '44'} strokeWidth={2} />
              <SvgText x={W / 2} y={H * 0.55} fill={accent} fontSize={11} textAnchor="middle">midsegment ∥ base, length = ½ base</SvgText>
            </>
          )}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to {show ? 'hide' : 'show'} midsegment</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}
