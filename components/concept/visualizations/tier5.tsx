import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { colors } from '../../../constants/theme';
import { W, H, type VizProps } from './shared';

// ── 1. Parabola: auto-cycle vertex position ────────────────────────────────
export function ParabolaViz({ accent }: VizProps) {
  const verts = [
    { x: W / 2, y: H * 0.6 },
    { x: W * 0.35, y: H * 0.5 },
    { x: W * 0.65, y: H * 0.55 },
    { x: W * 0.5, y: H * 0.7 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % verts.length), 1800);
    return () => clearInterval(t);
  }, []);
  const v = verts[i];

  // Static parabola path built from default center (visual content preserved)
  const cx = W / 2;
  const cy = H * 0.6;
  const a = -0.015;
  const pts: string[] = [];
  for (let px = 20; px <= W - 20; px += 3) {
    const dy = a * (px - cx) * (px - cx);
    const y = cy + dy;
    pts.push(`${px === 20 ? 'M' : 'L'}${px},${y}`);
  }

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={20} y1={H - 15} x2={W - 20} y2={H - 15} stroke={colors.border} strokeWidth={1} />
        <Line x1={W / 2} y1={10} x2={W / 2} y2={H - 15} stroke={colors.border} strokeWidth={1} />
        <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
        <Circle cx={v.x} cy={v.y} r={7} fill={accent} />
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = a(x − h)² + k</SvgText>
      </Svg>
    </View>
  );
}

// ── 2. Quadratic Discriminant: auto-cycle b, see 0/1/2 roots ───────────────
export function QuadraticDiscriminantViz({ accent }: VizProps) {
  const [bIdx, setBIdx] = useState(2);
  const bVals = [-4, -2, 0, 2, 4, 6];
  useEffect(() => {
    const t = setInterval(() => setBIdx(p => (p + 1) % bVals.length), 1800);
    return () => clearInterval(t);
  }, []);
  const b = bVals[bIdx];
  const a = 1;
  const c = 4;
  const disc = b * b - 4 * a * c;
  const rootCount = disc > 0 ? 2 : disc === 0 ? 1 : 0;
  const rootColor = disc > 0 ? '#6bbda0' : disc === 0 ? '#c9a96e' : '#d47878';

  const cx = W / 2;
  const cy = H * 0.65;
  const s = 12;
  const pts: string[] = [];
  for (let px = 20; px <= W - 20; px += 3) {
    const x = (px - cx) / s;
    const y = a * x * x + b * x + c;
    pts.push(`${px === 20 ? 'M' : 'L'}${px},${cy - y * 3}`);
  }

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
          b²−4ac = {disc}
        </SvgText>
        <SvgText x={W / 2} y={30} fill={rootColor} fontSize={12} textAnchor="middle">
          {rootCount} real root{rootCount !== 1 ? 's' : ''}
        </SvgText>
        <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
        <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
        {disc >= 0 && (
          <>
            {rootCount >= 1 && <Circle cx={cx - Math.sqrt(Math.max(0, disc)) * s / (2 * a)} cy={cy} r={5} fill={rootColor} />}
            {rootCount >= 2 && <Circle cx={cx + Math.sqrt(Math.max(0, disc)) * s / (2 * a)} cy={cy} r={5} fill={rootColor} />}
          </>
        )}
        <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={11} textAnchor="middle">b = {b}</SvgText>
      </Svg>
    </View>
  );
}

// ── 3. Exponential Curve: auto-cycle slider position ───────────────────────
export function ExponentialCurveViz({ accent }: VizProps) {
  const positions = [W * 0.3, W * 0.5, W * 0.7, W * 0.85];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % positions.length), 1800);
    return () => clearInterval(t);
  }, []);
  const bPos = positions[i];

  // Draw curve with default base
  const cx = W * 0.15;
  const cy = H * 0.75;
  const base = 2;
  const s = 30;
  const pts: string[] = [];
  for (let px = 20; px <= W - 20; px += 3) {
    const x = (px - cx) / s;
    const y = Math.pow(base, x);
    const py = cy - y * 4;
    if (py > -10 && py < H + 10) pts.push(`${pts.length === 0 ? 'M' : 'L'}${px},${py}`);
  }

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = bˣ</SvgText>
        <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
        <Line x1={cx} y1={10} x2={cx} y2={H - 30} stroke={colors.border} strokeWidth={1} />
        <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
        <SvgText x={W * 0.7} y={40} fill={colors.text2} fontSize={12} textAnchor="middle">Growth (b {'>'} 1)</SvgText>
        <Rect x={40} y={H - 18} width={W - 80} height={4} rx={2} fill={colors.surface2} />
        <Circle cx={bPos} cy={H - 16} r={7} fill={accent} />
      </Svg>
    </View>
  );
}

// ── 4. Log Mirror: auto-cycle exp / log / mirror line ──────────────────────
export function LogMirrorViz({ accent }: VizProps) {
  const [show, setShow] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShow(p => (p + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  const cx = W * 0.2;
  const cy = H * 0.75;
  const s = 22;

  const expPts: string[] = [];
  const logPts: string[] = [];
  for (let px = 20; px <= W - 20; px += 3) {
    const x = (px - cx) / s;
    // exp curve
    const ye = Math.pow(2, x);
    const pye = cy - ye * 3;
    if (pye > -10 && pye < H + 10) expPts.push(`${expPts.length === 0 ? 'M' : 'L'}${px},${pye}`);
    // log curve (swap x,y of exp)
    if (x > 0) {
      const yl = Math.log2(x);
      const pyl = cy - yl * s;
      logPts.push(`${logPts.length === 0 ? 'M' : 'L'}${px},${pyl}`);
    }
  }

  const labels = ['y = 2ˣ', 'y = log₂(x)', 'Mirror: y = x'];

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">{labels[show]}</SvgText>
        <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
        <Line x1={cx} y1={10} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        {(show === 0 || show === 2) && <Path d={expPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />}
        {(show === 1 || show === 2) && <Path d={logPts.join(' ')} stroke={accent + '88'} strokeWidth={2} fill="none" />}
        {show === 2 && <Line x1={20} y1={cy - (20 - cx) / s * s} x2={W - 20} y2={cy - (W - 20 - cx) / s * s} stroke={colors.text3} strokeWidth={1} strokeDasharray="6 4" />}
      </Svg>
    </View>
  );
}

// ── 5. Polynomial Roots: auto-cycle third root position ────────────────────
export function PolynomialRootsViz({ accent }: VizProps) {
  const r3Positions = [W * 0.6, W * 0.7, W * 0.8, W * 0.9];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % r3Positions.length), 1800);
    return () => clearInterval(t);
  }, []);
  const r3x = r3Positions[i];

  const cy = H * 0.55;
  const r1 = W * 0.2;
  const r2 = W * 0.4;

  const pts: string[] = [];
  for (let px = 20; px <= W - 20; px += 2) {
    const y = ((px - r1) * (px - r2) * (px - W * 0.75)) * 0.0003;
    pts.push(`${px === 20 ? 'M' : 'L'}${px},${cy - y}`);
  }

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Cubic with 3 roots</SvgText>
        <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
        <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
        <Circle cx={r1} cy={cy} r={5} fill={accent} />
        <Circle cx={r2} cy={cy} r={5} fill={accent} />
        <Circle cx={r3x} cy={cy} r={7} fill={accent} />
      </Svg>
    </View>
  );
}

// ── 6. Complex Plane: auto-cycle complex numbers ───────────────────────────
export function ComplexPlaneViz({ accent }: VizProps) {
  const [idx, setIdx] = useState(0);
  const nums = [
    { re: 3, im: 2, label: '3 + 2i' },
    { re: -1, im: 4, label: '-1 + 4i' },
    { re: 2, im: -3, label: '2 − 3i' },
    { re: -2, im: -1, label: '-2 − i' },
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % nums.length), 1800);
    return () => clearInterval(t);
  }, []);
  const n = nums[idx];
  const cx = W / 2;
  const cy = H / 2;
  const s = 22;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{n.label}</SvgText>
        <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
        <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <SvgText x={W - 25} y={cy - 6} fill={colors.text3} fontSize={10}>Re</SvgText>
        <SvgText x={cx + 6} y={26} fill={colors.text3} fontSize={10}>Im</SvgText>
        {/* Grid ticks */}
        {[-4, -3, -2, -1, 1, 2, 3, 4].map(t => (
          <G key={t}>
            <Line x1={cx + t * s} y1={cy - 3} x2={cx + t * s} y2={cy + 3} stroke={colors.border} strokeWidth={1} />
            <Line x1={cx - 3} y1={cy - t * s} x2={cx + 3} y2={cy - t * s} stroke={colors.border} strokeWidth={1} />
          </G>
        ))}
        <Line x1={cx} y1={cy} x2={cx + n.re * s} y2={cy - n.im * s} stroke={accent + '66'} strokeWidth={1.5} strokeDasharray="4 3" />
        <Circle cx={cx + n.re * s} cy={cy - n.im * s} r={7} fill={accent} />
      </Svg>
    </View>
  );
}

// ── 7. Complete the Square: auto-step through visual ───────────────────────
export function CompleteSquareViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'x² + 6x', desc: 'Start' },
    { label: 'x² + 6x + 9 − 9', desc: 'Add & subtract (6/2)²' },
    { label: '(x + 3)² − 9', desc: 'Factor' },
  ];
  useEffect(() => {
    const t = setInterval(() => setStep(p => (p + 1) % steps.length), 2000);
    return () => clearInterval(t);
  }, []);
  const s = steps[step];

  const boxX = W * 0.15;
  const boxY = 50;
  const bSz = 80;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{s.label}</SvgText>
        <SvgText x={W / 2} y={32} fill={colors.text2} fontSize={11} textAnchor="middle">{s.desc}</SvgText>
        {/* x² square */}
        <Rect x={boxX} y={boxY} width={bSz} height={bSz} fill={accent + '33'} stroke={accent} strokeWidth={2} />
        <SvgText x={boxX + bSz / 2} y={boxY + bSz / 2 + 5} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">x²</SvgText>
        {step >= 0 && (
          <>
            {/* 6x rectangle split into two 3x pieces */}
            <Rect x={boxX + bSz + 4} y={boxY} width={30} height={bSz} fill={accent + '22'} stroke={accent + '88'} strokeWidth={1} />
            <SvgText x={boxX + bSz + 19} y={boxY + bSz / 2 + 5} fill={accent} fontSize={10} textAnchor="middle">3x</SvgText>
            <Rect x={boxX} y={boxY + bSz + 4} width={bSz} height={30} fill={accent + '22'} stroke={accent + '88'} strokeWidth={1} />
            <SvgText x={boxX + bSz / 2} y={boxY + bSz + 22} fill={accent} fontSize={10} textAnchor="middle">3x</SvgText>
          </>
        )}
        {step >= 1 && (
          <>
            {/* Corner piece = 9 */}
            <Rect x={boxX + bSz + 4} y={boxY + bSz + 4} width={30} height={30} fill={accent + '44'} stroke={accent} strokeWidth={2} />
            <SvgText x={boxX + bSz + 19} y={boxY + bSz + 22} fill={accent} fontSize={10} fontWeight="bold" textAnchor="middle">9</SvgText>
          </>
        )}
        {step >= 2 && (
          <SvgText x={W * 0.75} y={H / 2 + 5} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">(x+3)²−9</SvgText>
        )}
      </Svg>
    </View>
  );
}

// ── 8. Poly Division: auto-step through long division ──────────────────────
export function PolyDivisionViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const lines = [
    'x² + 3x + 2  ÷  (x + 1)',
    'x · (x+1) = x² + x',
    'Subtract → 2x + 2',
    '2 · (x+1) = 2x + 2',
    'Remainder = 0 → Answer: x + 2',
  ];
  useEffect(() => {
    const t = setInterval(() => setStep(p => (p + 1) % lines.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Polynomial Long Division</SvgText>
        {lines.slice(0, step + 1).map((line, i) => (
          <G key={i}>
            <Rect x={W * 0.08} y={32 + i * 34} width={W * 0.84} height={28} rx={6} fill={i === step ? accent + '22' : colors.surface2} />
            <SvgText x={W / 2} y={50 + i * 34} fill={i === step ? accent : colors.text2} fontSize={12} fontWeight={i === step ? 'bold' : 'normal'} textAnchor="middle">{line}</SvgText>
          </G>
        ))}
      </Svg>
    </View>
  );
}

// ── 9. Rational Asymptotes: auto-cycle vertical asymptote ──────────────────
export function RationalAsymptotesViz({ accent }: VizProps) {
  const positions = [W * 0.35, W * 0.5, W * 0.65, W * 0.5];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % positions.length), 1800);
    return () => clearInterval(t);
  }, []);
  const aX = positions[i];

  const cy = H / 2;
  // Draw 1/(x-2) style hyperbola with asymptote at W/2
  const mid = W / 2;
  const leftPts: string[] = [];
  const rightPts: string[] = [];
  for (let px = 20; px <= W - 20; px += 2) {
    const dx = px - mid;
    if (Math.abs(dx) < 8) continue;
    const y = cy - 600 / dx;
    const clamped = Math.min(Math.max(y, -20), H + 20);
    if (dx < 0) leftPts.push(`${leftPts.length === 0 ? 'M' : 'L'}${px},${clamped}`);
    else rightPts.push(`${rightPts.length === 0 ? 'M' : 'L'}${px},${clamped}`);
  }

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Rational Function</SvgText>
        <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} strokeDasharray="4 4" />
        <Line x1={aX} y1={20} x2={aX} y2={H - 20} stroke={accent + '55'} strokeWidth={2} strokeDasharray="6 4" />
        <Path d={leftPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
        <Path d={rightPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
      </Svg>
    </View>
  );
}

// ── 10. Series Sum: auto-add terms of geometric series ─────────────────────
export function SeriesSumViz({ accent }: VizProps) {
  const [terms, setTerms] = useState(1);
  const maxTerms = 8;
  useEffect(() => {
    const t = setInterval(() => setTerms(p => (p >= maxTerms ? 1 : p + 1)), 1500);
    return () => clearInterval(t);
  }, []);
  let sum = 0;
  for (let i = 0; i < terms; i++) sum += 1 / Math.pow(2, i);

  const barW = W - 60;
  const barH = 30;
  const barY = H / 2 - barH / 2;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
          Σ 1/2ⁿ = {sum.toFixed(4)}
        </SvgText>
        <SvgText x={W / 2} y={32} fill={colors.text2} fontSize={11} textAnchor="middle">{terms} term{terms > 1 ? 's' : ''} · converges → 2</SvgText>
        {/* Target bar */}
        <Rect x={30} y={barY} width={barW} height={barH} rx={6} fill={colors.surface2} />
        {/* Filled portion (sum/2 of total width) */}
        <Rect x={30} y={barY} width={barW * (sum / 2)} height={barH} rx={6} fill={accent + 'aa'} />
        {/* Target line at 2 */}
        <Line x1={30 + barW} y1={barY - 6} x2={30 + barW} y2={barY + barH + 6} stroke={accent} strokeWidth={2} strokeDasharray="4 3" />
        <SvgText x={30 + barW} y={barY - 10} fill={accent} fontSize={10} textAnchor="middle">2</SvgText>
        {/* Individual term blocks */}
        {Array.from({ length: terms }, (_, i) => {
          const tw = Math.max(8, barW * (1 / Math.pow(2, i)) / 2);
          return (
            <Rect key={i} x={30 + i * (barW / maxTerms)} y={barY + barH + 14} width={Math.min(tw, barW / maxTerms - 2)} height={14} rx={3} fill={accent + (i % 2 === 0 ? 'cc' : '77')} />
          );
        })}
      </Svg>
    </View>
  );
}

// ── 11. Conic Slicer: auto-cycle slice angle on a cone ─────────────────────
export function ConicSlicerViz({ accent }: VizProps) {
  const slices = [
    { y: H * 0.2, label: 'Circle' },
    { y: H * 0.4, label: 'Ellipse' },
    { y: H * 0.6, label: 'Parabola' },
    { y: H * 0.8, label: 'Hyperbola' },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % slices.length), 1800);
    return () => clearInterval(t);
  }, []);
  const sliceY = slices[i].y;

  // Cone outline
  const apex = [W * 0.35, 25] as const;
  const baseL = [W * 0.1, H - 25] as const;
  const baseR = [W * 0.6, H - 25] as const;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W * 0.78} y={30} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Conic Sections</SvgText>
        {/* Cone */}
        <Path d={`M${apex[0]},${apex[1]} L${baseL[0]},${baseL[1]} L${baseR[0]},${baseR[1]} Z`} stroke={colors.text2} strokeWidth={1.5} fill={colors.surface2} />
        {/* Slice line */}
        <Line x1={W * 0.05} y1={sliceY} x2={W * 0.65} y2={sliceY} stroke={accent} strokeWidth={2} />
        {/* Shape preview area */}
        <Rect x={W * 0.65} y={60} width={W * 0.3} height={H - 90} rx={8} fill={colors.surface2} />
        <SvgText x={W * 0.8} y={H / 2} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{slices[i].label}</SvgText>
      </Svg>
    </View>
  );
}
