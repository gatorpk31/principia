import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { colors } from '../../../constants/theme';
import { W, H, type VizProps } from './shared';

// ── 1. Parallel Angles: auto-rotate transversal ────────────────────────────
export function ParallelAnglesViz({ accent }: VizProps) {
  const angles = [25, 40, 55, 70, 55, 40];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % angles.length), 1500);
    return () => clearInterval(t);
  }, []);
  const angle = angles[i];

  const y1 = H * 0.33;
  const y2 = H * 0.67;
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad) * W * 0.5;
  const dy = Math.sin(rad) * W * 0.5;
  const mx = W / 2;
  const my = (y1 + y2) / 2;

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={30} y1={y1} x2={W - 30} y2={y1} stroke={colors.text2} strokeWidth={2} />
        <Line x1={30} y1={y2} x2={W - 30} y2={y2} stroke={colors.text2} strokeWidth={2} />
        <Line x1={mx - dx} y1={my - dy} x2={mx + dx} y2={my + dy} stroke={accent} strokeWidth={2} />
        <SvgText x={W * 0.15} y={y1 - 8} fill={accent} fontSize={11}>∠1</SvgText>
        <SvgText x={W * 0.15} y={y2 - 8} fill={accent} fontSize={11}>∠2</SvgText>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Parallel Lines & Transversal</SvgText>
      </Svg>
    </View>
  );
}

// ── 2. Triangle Congruence: auto-cycle SSS/SAS/ASA/AAS ─────────────────────
export function TriangleCongruenceViz({ accent }: VizProps) {
  const types = ['SSS', 'SAS', 'ASA', 'AAS'];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % types.length), 1800);
    return () => clearInterval(t);
  }, []);
  const label = types[idx];

  const t1 = [[W * 0.1, H * 0.7], [W * 0.25, H * 0.25], [W * 0.4, H * 0.7]] as const;
  const t2 = [[W * 0.55, H * 0.7], [W * 0.7, H * 0.25], [W * 0.85, H * 0.7]] as const;

  const highlights: Record<string, { sides: number[]; angles: number[] }> = {
    SSS: { sides: [0, 1, 2], angles: [] },
    SAS: { sides: [0, 2], angles: [1] },
    ASA: { sides: [0], angles: [0, 2] },
    AAS: { sides: [1], angles: [0, 1] },
  };
  const h = highlights[label];

  const triPath = (pts: readonly (readonly [number, number])[]) =>
    `M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]} L${pts[2][0]},${pts[2][1]} Z`;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{label}</SvgText>
        <Path d={triPath(t1)} stroke={colors.text2} strokeWidth={1.5} fill="none" />
        <Path d={triPath(t2)} stroke={colors.text2} strokeWidth={1.5} fill="none" />
        {[t1, t2].map((tri, ti) =>
          h.sides.map(si => {
            const a = tri[si];
            const b = tri[(si + 1) % 3];
            return <Line key={`s${ti}${si}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={accent} strokeWidth={3} />;
          })
        )}
        {[t1, t2].map((tri, ti) =>
          h.angles.map(ai => (
            <Circle key={`a${ti}${ai}`} cx={tri[ai][0]} cy={tri[ai][1]} r={8} fill={accent + '44'} stroke={accent} strokeWidth={1.5} />
          ))
        )}
      </Svg>
    </View>
  );
}

// ── 3. Pythagorean Squares: a² + b² = c² (always show areas) ───────────────
export function PythagoreanSquaresViz({ accent }: VizProps) {
  const a = 60;
  const b = 80;
  const c = 100;
  const scale = 0.6;
  const aPx = a * scale;
  const bPx = b * scale;
  const ox = W * 0.35;
  const oy = H * 0.7;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">a² + b² = c²</SvgText>
        {/* Triangle: right angle at (ox, oy); vertical leg a up, horizontal leg b right */}
        <Path d={`M${ox},${oy} L${ox + bPx},${oy} L${ox},${oy - aPx} Z`} stroke={colors.text} strokeWidth={2} fill="none" />
        {/* Square on a (vertical leg) — sits to the left of the triangle */}
        <Rect x={ox - aPx} y={oy - aPx} width={aPx} height={aPx} fill={accent + '33'} stroke={accent} strokeWidth={1} />
        {/* Square on b (horizontal leg) — sits below the triangle */}
        <Rect x={ox} y={oy} width={bPx} height={bPx} fill={accent + '22'} stroke={accent + '88'} strokeWidth={1} />
        <SvgText x={ox - aPx / 2} y={oy - aPx / 2 + 4} fill={accent} fontSize={11} textAnchor="middle">{a * a}</SvgText>
        <SvgText x={ox + bPx / 2} y={oy + bPx / 2 + 4} fill={accent} fontSize={11} textAnchor="middle">{b * b}</SvgText>
        <SvgText x={W * 0.78} y={H / 2} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{a * a}+{b * b}={c * c}</SvgText>
        {/* Side labels: 'a' beside the vertical leg, 'b' above the horizontal leg */}
        <SvgText x={ox + 6} y={oy - aPx / 2 + 4} fill={colors.text3} fontSize={10}>a</SvgText>
        <SvgText x={ox + bPx / 2} y={oy - 4} fill={colors.text3} fontSize={10} textAnchor="middle">b</SvgText>
      </Svg>
    </View>
  );
}

// ── 4. Coordinate Geometry: auto-cycle B position ──────────────────────────
export function CoordinateGeometryViz({ accent }: VizProps) {
  const positions = [
    { x: W * 0.7, y: H * 0.3 },
    { x: W * 0.8, y: H * 0.5 },
    { x: W * 0.6, y: H * 0.25 },
    { x: W * 0.75, y: H * 0.4 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % positions.length), 1800);
    return () => clearInterval(t);
  }, []);
  const { x: px, y: py } = positions[i];

  const ax = W * 0.3;
  const ay = H * 0.65;

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Line x1={20} y1={20} x2={20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Line x1={ax} y1={ay} x2={px} y2={py} stroke={accent + '66'} strokeWidth={1.5} strokeDasharray="4 4" />
        <Circle cx={ax} cy={ay} r={6} fill={accent} />
        <Circle cx={px} cy={py} r={7} fill={accent} />
        <Circle cx={(ax + px) / 2} cy={(ay + py) / 2} r={5} fill={accent + '88'} />
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Midpoint & Distance</SvgText>
        <SvgText x={ax} y={ay + 18} fill={colors.text3} fontSize={10} textAnchor="middle">A</SvgText>
        <SvgText x={px} y={py - 12} fill={colors.text3} fontSize={10} textAnchor="middle">B</SvgText>
      </Svg>
    </View>
  );
}

// ── 5. Proof Chain: auto-advance steps ─────────────────────────────────────
export function ProofChainViz({ accent }: VizProps) {
  const statements = ['Given: ∠A ≅ ∠D', 'AB ∥ CD (Alt Int ∠)', '△ABE ≅ △DCE', 'BE ≅ CE (CPCTC)'];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % statements.length), 1500);
    return () => clearInterval(t);
  }, []);

  const boxH = 34;
  const gap = 8;
  const startY = 30;

  return (
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
      </Svg>
    </View>
  );
}

// ── 6. Circle Parts: auto-cycle radius/diameter/chord/arc/tangent ──────────
export function CirclePartsViz({ accent }: VizProps) {
  const parts = ['Radius', 'Diameter', 'Chord', 'Arc', 'Tangent'];
  const [part, setPart] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPart(p => (p + 1) % parts.length), 1800);
    return () => clearInterval(t);
  }, []);
  const label = parts[part];
  const cx = W / 2;
  const cy = H / 2;
  const r = 65;

  return (
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
      </Svg>
    </View>
  );
}

// ── 7. Cube 3D: auto-cycle views ───────────────────────────────────────────
export function Cube3dViz({ accent }: VizProps) {
  const offsets = [
    { dx: 20, dy: -12 },
    { dx: 25, dy: -8 },
    { dx: 12, dy: -20 },
  ];
  const [view, setView] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setView(p => (p + 1) % offsets.length), 2000);
    return () => clearInterval(t);
  }, []);

  const cx = W / 2;
  const cy = H / 2;
  const s = 45;
  const { dx, dy } = offsets[view];

  const f = [
    [cx - s, cy - s], [cx + s, cy - s],
    [cx + s, cy + s], [cx - s, cy + s],
  ];
  const b = f.map(([x, y]) => [x + dx, y + dy]);

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Faces: 6 · Edges: 12 · Vertices: 8</SvgText>
        {[0, 1, 2, 3].map(i => (
          <Line key={`b${i}`} x1={b[i][0]} y1={b[i][1]} x2={b[(i + 1) % 4][0]} y2={b[(i + 1) % 4][1]} stroke={accent + '44'} strokeWidth={1} strokeDasharray="4 4" />
        ))}
        {[0, 1, 2, 3].map(i => (
          <Line key={`c${i}`} x1={f[i][0]} y1={f[i][1]} x2={b[i][0]} y2={b[i][1]} stroke={accent + '88'} strokeWidth={1.5} />
        ))}
        <Path d={`M${f[0][0]},${f[0][1]} L${f[1][0]},${f[1][1]} L${f[2][0]},${f[2][1]} L${f[3][0]},${f[3][1]} Z`} stroke={accent} strokeWidth={2} fill={accent + '11'} />
      </Svg>
    </View>
  );
}

// ── 8. Volume Fill: auto-cycle fill levels ─────────────────────────────────
export function VolumeFillViz({ accent }: VizProps) {
  const levels = [0.2, 0.5, 0.8, 1.0, 0.6];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % levels.length), 1500);
    return () => clearInterval(t);
  }, []);
  const fill = levels[i];

  const l = 3;
  const w = 4;
  const h = 5;
  const vol = l * w * h;

  const prismX = W * 0.25;
  const prismW = 100;
  const prismH = 120;
  const prismY = 30;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W * 0.7} y={40} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">V = l × w × h</SvgText>
        <SvgText x={W * 0.7} y={60} fill={colors.text} fontSize={12} textAnchor="middle">{l} × {w} × {h} = {vol}</SvgText>
        <Rect x={prismX} y={prismY} width={prismW} height={prismH} rx={4} fill={colors.surface2} stroke={colors.border} strokeWidth={1.5} />
        <Rect x={prismX + 1} y={prismY + prismH * (1 - fill)} width={prismW - 2} height={prismH * fill} rx={3} fill={accent + '44'} />
      </Svg>
    </View>
  );
}

// ── 9. Triangle Transform: auto-cycle translate/reflect/rotate ─────────────
export function TriangleTransformViz({ accent }: VizProps) {
  const labels = ['Original', 'Translated', 'Reflected', 'Rotated'];
  const transforms = [
    [[W * 0.3, H * 0.65], [W * 0.4, H * 0.3], [W * 0.5, H * 0.65]],
    [[W * 0.5, H * 0.65], [W * 0.6, H * 0.3], [W * 0.7, H * 0.65]],
    [[W * 0.3, H * 0.3], [W * 0.4, H * 0.65], [W * 0.5, H * 0.3]],
    [[W * 0.55, H * 0.55], [W * 0.35, H * 0.45], [W * 0.55, H * 0.25]],
  ];
  const [state, setState] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setState(p => (p + 1) % labels.length), 1800);
    return () => clearInterval(t);
  }, []);
  const pts = transforms[state];

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{labels[state]}</SvgText>
        {state > 0 && (
          <Path d={`M${transforms[0][0][0]},${transforms[0][0][1]} L${transforms[0][1][0]},${transforms[0][1][1]} L${transforms[0][2][0]},${transforms[0][2][1]} Z`} stroke={colors.border} strokeWidth={1} fill="none" strokeDasharray="4 4" />
        )}
        <Path d={`M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]} L${pts[2][0]},${pts[2][1]} Z`} stroke={accent} strokeWidth={2} fill={accent + '22'} />
      </Svg>
    </View>
  );
}

// ── 10. Triangle Inequality: auto-cycle c length, show validity ────────────
export function TriangleInequalityViz({ accent }: VizProps) {
  const cLengths = [60, 120, 180, 175, 100];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % cLengths.length), 1500);
    return () => clearInterval(t);
  }, []);
  const cLen = cLengths[i];
  const a = 80;
  const b = 100;
  const valid = a + b > cLen;

  const barY = [60, 90, 120];

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Triangle Inequality</SvgText>
        <SvgText x={30} y={barY[0] + 14} fill={colors.text2} fontSize={11}>a:</SvgText>
        <Rect x={50} y={barY[0]} width={a} height={18} rx={4} fill={accent + '88'} />
        <SvgText x={30} y={barY[1] + 14} fill={colors.text2} fontSize={11}>b:</SvgText>
        <Rect x={50} y={barY[1]} width={b} height={18} rx={4} fill={accent + '88'} />
        <SvgText x={30} y={barY[2] + 14} fill={colors.text2} fontSize={11}>c:</SvgText>
        <Rect x={50} y={barY[2]} width={cLen} height={18} rx={4} fill={valid ? accent + 'cc' : '#cc4444cc'} />
        <SvgText x={W / 2} y={160} fill={colors.text} fontSize={14} fontWeight="bold" textAnchor="middle">a + b {'>'} c ?</SvgText>
        <SvgText x={W / 2} y={180} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">{a} + {b} {valid ? '>' : '≤'} {cLen}</SvgText>
      </Svg>
    </View>
  );
}

// ── 11. Midsegment Draw: auto-toggle midsegment ────────────────────────────
export function MidsegmentDrawViz({ accent }: VizProps) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setShow(p => !p), 1800);
    return () => clearInterval(t);
  }, []);

  const A: [number, number] = [W * 0.15, H * 0.75];
  const B: [number, number] = [W * 0.5, H * 0.15];
  const C: [number, number] = [W * 0.85, H * 0.75];
  const midAB: [number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const midBC: [number, number] = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];

  return (
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
      </Svg>
    </View>
  );
}
