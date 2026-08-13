import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path } from 'react-native-svg';
import { colors } from '../../../constants/theme';
import { W, H, type VizProps } from './shared';

// ── 1. Slope Rise-Run: auto-cycle through point pairs ───────────────────────
export function SlopeRiseRunViz({ accent }: VizProps) {
  const pairs = [
    { x1: W * 0.25, y1: H * 0.65, x2: W * 0.75, y2: H * 0.35 },
    { x1: W * 0.30, y1: H * 0.30, x2: W * 0.70, y2: H * 0.70 },
    { x1: W * 0.20, y1: H * 0.55, x2: W * 0.80, y2: H * 0.25 },
    { x1: W * 0.35, y1: H * 0.25, x2: W * 0.65, y2: H * 0.65 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % pairs.length), 2000);
    return () => clearInterval(t);
  }, []);
  const p = pairs[i];

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Line x1={20} y1={20} x2={20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y1} stroke={accent + '88'} strokeWidth={2} strokeDasharray="4 4" />
        <Line x1={p.x2} y1={p.y1} x2={p.x2} y2={p.y2} stroke={accent + '88'} strokeWidth={2} strokeDasharray="4 4" />
        <Line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={accent} strokeWidth={2} />
        <Circle cx={p.x1} cy={p.y1} r={8} fill={accent} />
        <Circle cx={p.x2} cy={p.y2} r={8} fill={accent} />
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">rise ÷ run = slope</SvgText>
      </Svg>
    </View>
  );
}

// ── 2. Slope-Intercept Line: cycle through (m, b) values ────────────────────
export function SlopeInterceptLineViz({ accent }: VizProps) {
  const states = [
    { m: 1, b: 0 },
    { m: 0.5, b: 1 },
    { m: -1, b: 2 },
    { m: 2, b: -1 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % states.length), 2000);
    return () => clearInterval(t);
  }, []);
  const { m, b } = states[i];
  const cx = W / 2;
  const cy = H / 2 - 20;
  const scale = 20;
  const lx = 20;
  const rx = W - 20;
  const ly = cy - (((lx - cx) / scale) * m + b) * scale;
  const ry = cy - (((rx - cx) / scale) * m + b) * scale;

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={20} y1={H / 2 - 20} x2={W - 20} y2={H / 2 - 20} stroke={colors.border} strokeWidth={1} />
        <Line x1={W / 2} y1={20} x2={W / 2} y2={H - 50} stroke={colors.border} strokeWidth={1} />
        <Line x1={lx} y1={ly} x2={rx} y2={ry} stroke={accent} strokeWidth={2} />
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = mx + b</SvgText>
        <SvgText x={W / 2} y={H - 8} fill={colors.text2} fontSize={12} textAnchor="middle">m = {m}, b = {b}</SvgText>
      </Svg>
    </View>
  );
}

// ── 3. System Intersection: auto-cycle line 2 slope ─────────────────────────
export function SystemIntersectionViz({ accent }: VizProps) {
  const slopes = [1, -0.5, 2, -1];
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAngle(p => (p + 1) % slopes.length), 1800);
    return () => clearInterval(t);
  }, []);
  const m1 = 0.8;
  const m2 = slopes[angle];
  const cx = W / 2;
  const cy = H / 2;
  const s = 22;

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
        <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Line x1={20} y1={cy - m1 * ((20 - cx) / s) * s} x2={W - 20} y2={cy - m1 * ((W - 20 - cx) / s) * s} stroke={accent} strokeWidth={2} />
        <Line x1={20} y1={cy - m2 * ((20 - cx) / s) * s} x2={W - 20} y2={cy - m2 * ((W - 20 - cx) / s) * s} stroke={accent + '77'} strokeWidth={2} strokeDasharray="6 4" />
        <Circle cx={cx} cy={cy} r={6} fill={accent} />
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
          System: line₁ ∩ line₂
        </SvgText>
      </Svg>
    </View>
  );
}

// ── 4. Elimination Cancel: auto-cycle steps ────────────────────────────────
export function EliminationCancelViz({ accent }: VizProps) {
  const steps = [
    { top: '2x + 3y = 7', bot: '2x − 3y = 1', result: '' },
    { top: '2x + 3y = 7', bot: '2x − 3y = 1', result: '4x = 8' },
    { top: '', bot: '', result: 'x = 2' },
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(p => (p + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, []);
  const s = steps[step];

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Elimination Method</SvgText>
        {s.top ? (
          <>
            <Rect x={W * 0.15} y={40} width={W * 0.7} height={36} rx={8} fill={colors.surface2} />
            <SvgText x={W / 2} y={64} fill={colors.text} fontSize={16} fontWeight="bold" textAnchor="middle">{s.top}</SvgText>
            <SvgText x={W / 2} y={82} fill={colors.text3} fontSize={14} textAnchor="middle">+</SvgText>
            <Rect x={W * 0.15} y={90} width={W * 0.7} height={36} rx={8} fill={colors.surface2} />
            <SvgText x={W / 2} y={114} fill={colors.text} fontSize={16} fontWeight="bold" textAnchor="middle">{s.bot}</SvgText>
          </>
        ) : null}
        {s.result ? (
          <>
            <Line x1={W * 0.2} y1={140} x2={W * 0.8} y2={140} stroke={accent} strokeWidth={2} />
            <Rect x={W * 0.2} y={150} width={W * 0.6} height={40} rx={10} fill={accent + '22'} />
            <SvgText x={W / 2} y={176} fill={accent} fontSize={20} fontWeight="bold" textAnchor="middle">{s.result}</SvgText>
          </>
        ) : null}
      </Svg>
    </View>
  );
}

// ── 5. Graph Line Draw: auto-plot points on y=2x−1 ─────────────────────────
export function GraphLineDrawViz({ accent }: VizProps) {
  const points = [{ x: 0, y: -1 }, { x: 1, y: 1 }, { x: 2, y: 3 }, { x: -1, y: -3 }];
  const [pts, setPts] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setPts(p => (p % points.length) + 1), 1200);
    return () => clearInterval(t);
  }, []);
  const cx = W / 2;
  const cy = H / 2;
  const s = 24;

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
        <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = 2x − 1</SvgText>
        {points.slice(0, pts).map((p, i) => (
          <Circle key={i} cx={cx + p.x * s} cy={cy - p.y * s} r={5} fill={accent} />
        ))}
        {pts >= 2 && (
          <Line
            x1={cx + points[0].x * s} y1={cy - points[0].y * s}
            x2={cx + points[pts - 1].x * s} y2={cy - points[pts - 1].y * s}
            stroke={accent + '88'} strokeWidth={2}
          />
        )}
      </Svg>
    </View>
  );
}

// ── 6. Inequality Shade: auto-cycle boundary + side ────────────────────────
export function InequalityShadeViz({ accent }: VizProps) {
  const states = [
    { y: H * 0.4, above: true },
    { y: H * 0.6, above: true },
    { y: H * 0.5, above: false },
    { y: H * 0.35, above: false },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % states.length), 1800);
    return () => clearInterval(t);
  }, []);
  const { y: bY, above } = states[i];
  const shadeY = above ? 20 : bY;
  const shadeH = above ? Math.max(0, bY - 20) : Math.max(0, H - 30 - bY);

  return (
    <View>
      <Svg width={W} height={H}>
        <Rect x={20} y={shadeY} width={W - 40} height={shadeH} fill={accent + '22'} />
        <Line x1={20} y1={bY} x2={W - 20} y2={bY} stroke={accent} strokeWidth={2} />
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
          {above ? 'y < boundary' : 'y > boundary'}
        </SvgText>
      </Svg>
    </View>
  );
}

// ── 7. Absolute Value V: auto-shift vertex ─────────────────────────────────
export function AbsoluteValueVViz({ accent }: VizProps) {
  const verts = [
    { x: W / 2, y: H * 0.55 },
    { x: W * 0.35, y: H * 0.45 },
    { x: W * 0.65, y: H * 0.50 },
    { x: W * 0.45, y: H * 0.65 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % verts.length), 1800);
    return () => clearInterval(t);
  }, []);
  const v = verts[i];
  const slope = 1.5;
  const lx = 20;
  const rx = W - 20;
  const ly = v.y + Math.abs(lx - v.x) * slope;
  const ry = v.y + Math.abs(rx - v.x) * slope;
  const pathD = `M${lx},${Math.min(ly, H - 5)} L${v.x},${v.y} L${rx},${Math.min(ry, H - 5)}`;

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Line x1={W / 2} y1={10} x2={W / 2} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Path d={pathD} stroke={accent} strokeWidth={2} fill="none" />
        <Circle cx={v.x} cy={v.y} r={7} fill={accent} />
        <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = |x − h| + k</SvgText>
      </Svg>
    </View>
  );
}

// ── 8. Exponent Tower: auto-cycle exponent ─────────────────────────────────
export function ExponentTowerViz({ accent }: VizProps) {
  const [exp, setExp] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setExp(p => (p >= 5 ? 1 : p + 1)), 1500);
    return () => clearInterval(t);
  }, []);
  const base = 2;
  const val = Math.pow(base, exp);
  const mult = Array.from({ length: exp }, () => String(base)).join(' × ');
  const maxH = 160;
  const barH = Math.min(maxH, (val / 32) * maxH);

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
          {base}^{exp} = {val}
        </SvgText>
        <SvgText x={W / 2} y={34} fill={colors.text2} fontSize={11} textAnchor="middle">{mult}</SvgText>
        {Array.from({ length: exp }, (_, i) => {
          const bw = 30;
          const bh = barH / exp;
          const x = W / 2 - bw / 2;
          const y = H - 30 - (i + 1) * bh;
          return <Rect key={i} x={x} y={y} width={bw} height={bh - 2} rx={4} fill={accent + (i % 2 === 0 ? 'cc' : '88')} />;
        })}
      </Svg>
    </View>
  );
}

// ── 9. Multi-Step Balance: auto-cycle solve steps ──────────────────────────
export function MultiStepBalanceViz({ accent }: VizProps) {
  const steps = [
    { eq: '3x + 2 = 11', left: 5, right: 11, note: '' },
    { eq: '3x = 9', left: 3, right: 9, note: '−2 both sides' },
    { eq: 'x = 3', left: 1, right: 3, note: '÷3 both sides' },
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(p => (p + 1) % steps.length), 2000);
    return () => clearInterval(t);
  }, []);
  const s = steps[step];

  const fulcrumX = W / 2;
  const beamY = H * 0.45;
  const beamW = W * 0.65;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={15} fontWeight="bold" textAnchor="middle">{s.eq}</SvgText>
        {s.note ? <SvgText x={W / 2} y={32} fill={colors.text2} fontSize={11} textAnchor="middle">{s.note}</SvgText> : null}
        <Path d={`M${fulcrumX},${H - 20} L${fulcrumX - 15},${beamY + 20} L${fulcrumX + 15},${beamY + 20} Z`} fill={colors.surface2} />
        <Line x1={fulcrumX - beamW / 2} y1={beamY} x2={fulcrumX + beamW / 2} y2={beamY} stroke={accent} strokeWidth={3} />
        {Array.from({ length: s.left }, (_, i) => (
          <Rect key={`l${i}`} x={fulcrumX - beamW / 2 + 8 + i * 18} y={beamY - 20} width={14} height={14} rx={3} fill={accent + 'cc'} />
        ))}
        {Array.from({ length: Math.min(s.right, 11) }, (_, i) => (
          <Rect key={`r${i}`} x={fulcrumX + beamW / 2 - 22 - i * 18} y={beamY - 20} width={14} height={14} rx={3} fill={accent + '77'} />
        ))}
      </Svg>
    </View>
  );
}

// ── 10. Sequence Dots: auto-grow triangular numbers ────────────────────────
export function SequenceDotsViz({ accent }: VizProps) {
  const [rows, setRows] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setRows(p => (p >= 6 ? 1 : p + 1)), 1500);
    return () => clearInterval(t);
  }, []);
  const total = (rows * (rows + 1)) / 2;

  const dotR = 6;
  const gap = 18;
  const baseY = H - 40;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
          T({rows}) = {total}
        </SvgText>
        {Array.from({ length: rows }, (_, r) => {
          const count = r + 1;
          const rowW = count * gap;
          const sx = W / 2 - rowW / 2 + gap / 2;
          const y = baseY - (rows - 1 - r) * gap;
          return Array.from({ length: count }, (__, c) => (
            <Circle key={`${r}-${c}`} cx={sx + c * gap} cy={y} r={dotR} fill={accent + (r === rows - 1 ? 'ff' : '88')} />
          ));
        })}
      </Svg>
    </View>
  );
}

// ── 11. Function Machine: auto-cycle inputs ────────────────────────────────
export function FunctionMachineViz({ accent }: VizProps) {
  const inputs = [1, 2, 3, 4, 5];
  const [input, setInput] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setInput(p => (p + 1) % inputs.length), 1500);
    return () => clearInterval(t);
  }, []);
  const rule = (n: number) => n * 2 + 1;
  const x = inputs[input];
  const y = rule(x);

  const machX = W * 0.3;
  const machW = W * 0.4;

  return (
    <View>
      <Svg width={W} height={H}>
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Function Machine</SvgText>
        <Circle cx={W * 0.12} cy={H / 2} r={20} fill={accent + '33'} stroke={accent} strokeWidth={2} />
        <SvgText x={W * 0.12} y={H / 2 + 5} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">{x}</SvgText>
        <Line x1={W * 0.12 + 22} y1={H / 2} x2={machX} y2={H / 2} stroke={accent} strokeWidth={2} />
        <SvgText x={W * 0.22} y={H / 2 - 8} fill={colors.text3} fontSize={10} textAnchor="middle">in</SvgText>
        <Rect x={machX} y={H / 2 - 30} width={machW} height={60} rx={10} fill={colors.surface2} stroke={accent} strokeWidth={2} />
        <SvgText x={W / 2} y={H / 2 + 5} fill={colors.text} fontSize={16} fontWeight="bold" textAnchor="middle">× 2 + 1</SvgText>
        <Line x1={machX + machW} y1={H / 2} x2={W * 0.88 - 22} y2={H / 2} stroke={accent} strokeWidth={2} />
        <SvgText x={W * 0.78} y={H / 2 - 8} fill={colors.text3} fontSize={10} textAnchor="middle">out</SvgText>
        <Circle cx={W * 0.88} cy={H / 2} r={20} fill={accent + '33'} stroke={accent} strokeWidth={2} />
        <SvgText x={W * 0.88} y={H / 2 + 5} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">{y}</SvgText>
      </Svg>
    </View>
  );
}

// ── 12. Domain-Range Box: auto-cycle bounds ────────────────────────────────
export function DomainRangeBoxViz({ accent }: VizProps) {
  const states = [
    { l: W * 0.25, r: W * 0.75 },
    { l: W * 0.15, r: W * 0.55 },
    { l: W * 0.40, r: W * 0.85 },
    { l: W * 0.30, r: W * 0.70 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % states.length), 1800);
    return () => clearInterval(t);
  }, []);
  const { l, r } = states[i];

  // Draw a simple curve
  const curvePts: string[] = [];
  for (let px = 20; px <= W - 20; px += 4) {
    const t = (px - 20) / (W - 40);
    const y = H / 2 - 40 * Math.sin(t * Math.PI);
    curvePts.push(`${px === 20 ? 'M' : 'L'}${px},${y}`);
  }

  return (
    <View>
      <Svg width={W} height={H}>
        <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Line x1={20} y1={20} x2={20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
        <Rect x={l} y={30} width={Math.max(0, r - l)} height={H - 60} fill={accent + '15'} />
        <Line x1={l} y1={30} x2={l} y2={H - 30} stroke={accent} strokeWidth={2} strokeDasharray="6 3" />
        <Line x1={r} y1={30} x2={r} y2={H - 30} stroke={accent} strokeWidth={2} strokeDasharray="6 3" />
        <Path d={curvePts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
        <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Domain & Range</SvgText>
      </Svg>
    </View>
  );
}
