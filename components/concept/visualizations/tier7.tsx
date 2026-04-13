import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '../../../constants/theme';
import { W, H, AnimatedCircle, AnimatedLine, AnimatedRect, type VizProps } from './shared';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── 1. Limit Table: tap to add x-values approaching a ──────────────────────
export function LimitTableViz({ accent }: VizProps) {
  const [rows, setRows] = useState(1);
  const xVals = [1.5, 1.9, 1.99, 1.999, 1.9999];
  const f = (x: number) => (x * x - 4) / (x - 2); // approaches 4 as x→2
  const tap = Gesture.Tap().onEnd(() => runOnJS(setRows)(rows >= xVals.length ? 1 : rows + 1));

  const colW = (W - 40) / 2;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">f(x) → L as x → 2</SvgText>
          {/* Header */}
          <Rect x={20} y={24} width={colW} height={22} fill={accent + '22'} />
          <Rect x={20 + colW} y={24} width={colW} height={22} fill={accent + '22'} />
          <SvgText x={20 + colW / 2} y={40} fill={accent} fontSize={11} fontWeight="bold" textAnchor="middle">x</SvgText>
          <SvgText x={20 + colW + colW / 2} y={40} fill={accent} fontSize={11} fontWeight="bold" textAnchor="middle">f(x)</SvgText>
          {/* Rows */}
          {xVals.slice(0, rows).map((x, i) => {
            const y = 50 + i * 22;
            return (
              <G key={i}>
                <Rect x={20} y={y} width={colW} height={22} fill={i % 2 === 0 ? colors.surface2 : 'transparent'} />
                <Rect x={20 + colW} y={y} width={colW} height={22} fill={i % 2 === 0 ? colors.surface2 : 'transparent'} />
                <SvgText x={20 + colW / 2} y={y + 16} fill={colors.text} fontSize={11} textAnchor="middle">{x}</SvgText>
                <SvgText x={20 + colW + colW / 2} y={y + 16} fill={colors.text} fontSize={11} textAnchor="middle">{f(x).toFixed(4)}</SvgText>
              </G>
            );
          })}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to add rows → L = 4</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 2. Secant → Tangent: drag second point closer ───────────────────────────
export function SecantTangentViz({ accent }: VizProps) {
  const p2x = useSharedValue(W * 0.75);
  const startP = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startP.value = p2x.value; })
    .onUpdate(e => { p2x.value = clamp(startP.value + e.translationX, W * 0.42, W - 30); });

  const p2Props = useAnimatedProps(() => ({ cx: p2x.value }));

  const cx = W / 2;
  const cy = H * 0.7;
  const s = 14;
  const f = (px: number) => { const x = (px - 40) / s; return cy - x * x * 3; };

  const p1px = W * 0.38;
  const p1py = f(p1px);

  // Curve
  const pts: string[] = [];
  for (let px = 30; px <= W - 30; px += 2) {
    const y = f(px);
    if (y > 0 && y < H) pts.push(`${pts.length === 0 ? 'M' : 'L'}${px},${y}`);
  }

  const secLineProps = useAnimatedProps(() => {
    const p2py = f(p2x.value);
    const dx = p2x.value - p1px;
    const dy = p2py - p1py;
    const ext = 40;
    return {
      x1: p1px - ext * (dx / Math.max(Math.abs(dx), 1)),
      y1: p1py - ext * (dy / Math.max(Math.abs(dx), 1)),
      x2: p2x.value + ext * (dx / Math.max(Math.abs(dx), 1)),
      y2: p2py + ext * (dy / Math.max(Math.abs(dx), 1)),
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Secant → Tangent</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Path d={pts.join(' ')} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          <AnimatedLine animatedProps={secLineProps} stroke={accent} strokeWidth={2} />
          <Circle cx={p1px} cy={p1py} r={5} fill={accent} />
          <AnimatedCircle animatedProps={p2Props} cy={f(W * 0.75)} r={6} fill={accent} />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag point closer</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 3. Derivative Slope: drag point along x² ────────────────────────────────
export function DerivativeSlopeViz({ accent }: VizProps) {
  const dotX = useSharedValue(W * 0.55);
  const startD = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startD.value = dotX.value; })
    .onUpdate(e => { dotX.value = clamp(startD.value + e.translationX, 30, W - 30); });

  const dotProps = useAnimatedProps(() => {
    const x = (dotX.value - W / 2) / 14;
    const y = H * 0.75 - x * x * 3;
    return { cx: dotX.value, cy: y };
  });

  const cy = H * 0.75;
  const s = 14;
  const pts: string[] = [];
  for (let px = 30; px <= W - 30; px += 2) {
    const x = (px - W / 2) / s;
    const y = cy - x * x * 3;
    if (y > 0) pts.push(`${pts.length === 0 ? 'M' : 'L'}${px},${y}`);
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">f'(x) = 2x (slope at each point)</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={W / 2} y1={10} x2={W / 2} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <Path d={pts.join(' ')} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          <AnimatedCircle animatedProps={dotProps} r={7} fill={accent} />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag along curve to see slope</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 4. Optimization Box: drag cut size ──────────────────────────────────────
export function OptimizationBoxViz({ accent }: VizProps) {
  const cutPos = useSharedValue(W * 0.35);
  const startC = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startC.value = cutPos.value; })
    .onUpdate(e => { cutPos.value = clamp(startC.value + e.translationX, 40, W - 40); });

  const cutDotProps = useAnimatedProps(() => ({ cx: cutPos.value }));

  const L = 12;
  const Wd2 = 8;
  const optX = Math.min(L, Wd2) / 6; // theoretical optimal

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">V = x(L−2x)(W−2x)</SvgText>
          {/* Flat sheet representation */}
          <Rect x={W * 0.2} y={40} width={W * 0.6} height={80} rx={4} fill={colors.surface2} stroke={colors.border} strokeWidth={1} />
          {/* Corner cuts */}
          <Rect x={W * 0.2} y={40} width={20} height={20} fill={accent + '44'} stroke={accent} strokeWidth={1} />
          <Rect x={W * 0.8 - 20} y={40} width={20} height={20} fill={accent + '44'} stroke={accent} strokeWidth={1} />
          <Rect x={W * 0.2} y={100} width={20} height={20} fill={accent + '44'} stroke={accent} strokeWidth={1} />
          <Rect x={W * 0.8 - 20} y={100} width={20} height={20} fill={accent + '44'} stroke={accent} strokeWidth={1} />
          <SvgText x={W / 2} y={85} fill={colors.text2} fontSize={11} textAnchor="middle">cut corners, fold up</SvgText>
          {/* Volume slider */}
          <Rect x={40} y={H - 38} width={W - 80} height={4} rx={2} fill={colors.surface2} />
          <AnimatedCircle animatedProps={cutDotProps} cy={H - 36} r={7} fill={accent} />
          <SvgText x={25} y={H - 30} fill={colors.text3} fontSize={10}>x</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag to change cut size</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 5. Riemann Sum: tap to add more rectangles ──────────────────────────────
export function RiemannSumViz({ accent }: VizProps) {
  const [n, setN] = useState(4);
  const counts = [2, 4, 8, 16, 32];
  const tap = Gesture.Tap().onEnd(() => {
    const idx = counts.indexOf(n);
    runOnJS(setN)(counts[(idx + 1) % counts.length]);
  });

  const cy = H * 0.75;
  const lx = 40;
  const rx = W - 40;
  const rangeW = rx - lx;

  const f = (t: number) => cy - 60 * Math.sin(t * Math.PI);

  // Curve
  const pts: string[] = [];
  for (let px = lx; px <= rx; px += 2) {
    const t = (px - lx) / rangeW;
    pts.push(`${px === lx ? 'M' : 'L'}${px},${f(t)}`);
  }

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Riemann Sum (n = {n})</SvgText>
          <Line x1={lx} y1={cy} x2={rx} y2={cy} stroke={colors.border} strokeWidth={1} />
          {/* Rectangles */}
          {Array.from({ length: n }, (_, i) => {
            const xl = lx + (i * rangeW) / n;
            const w = rangeW / n;
            const t = (xl - lx + w / 2) / rangeW;
            const h = cy - f(t);
            return <Rect key={i} x={xl} y={cy - h} width={w - 1} height={h} fill={accent + '33'} stroke={accent} strokeWidth={0.5} />;
          })}
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to change n</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 6. FTC Area: drag upper bound ───────────────────────────────────────────
export function FtcAreaViz({ accent }: VizProps) {
  const bX = useSharedValue(W * 0.65);
  const startB = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startB.value = bX.value; })
    .onUpdate(e => { bX.value = clamp(startB.value + e.translationX, 60, W - 40); });

  const bLineProps = useAnimatedProps(() => ({ x1: bX.value, x2: bX.value }));

  const cy = H * 0.7;
  const lx = 50;

  const f = (px: number) => cy - 50 * Math.sin(((px - lx) / (W - 80)) * Math.PI);

  const pts: string[] = [];
  for (let px = lx; px <= W - 30; px += 2) {
    pts.push(`${px === lx ? 'M' : 'L'}${px},${f(px)}`);
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">∫ₐᵇ f(x)dx = F(b) − F(a)</SvgText>
          <Line x1={lx} y1={cy} x2={W - 30} y2={cy} stroke={colors.border} strokeWidth={1} />
          {/* Area fill (approximate with rect) */}
          <Rect x={lx} y={cy - 50} width={W * 0.65 - lx} height={50} fill={accent + '22'} />
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          {/* Lower bound */}
          <Line x1={lx} y1={cy - 55} x2={lx} y2={cy + 5} stroke={accent + '88'} strokeWidth={2} />
          <SvgText x={lx} y={cy + 18} fill={colors.text3} fontSize={10} textAnchor="middle">a</SvgText>
          {/* Upper bound (draggable) */}
          <AnimatedLine animatedProps={bLineProps} y1={cy - 55} y2={cy + 5} stroke={accent} strokeWidth={2} />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag upper bound b</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 7. u-Substitution Chain: tap to peel layers ─────────────────────────────
export function USubChainViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'f(g(x))', desc: 'Composite function' },
    { label: 'Outer: f(u)', desc: 'f = sin(u)' },
    { label: 'Inner: g(x)', desc: 'u = g(x) = x²' },
    { label: "f'(g(x))·g'(x)", desc: 'Chain rule result' },
  ];
  const s = steps[step];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % steps.length));

  const bx = W * 0.15;
  const by = 50;
  const bw = W * 0.7;
  const bh = 50;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{s.label}</SvgText>
          <SvgText x={W / 2} y={34} fill={colors.text2} fontSize={11} textAnchor="middle">{s.desc}</SvgText>
          {/* Outer box */}
          <Rect x={bx} y={by} width={bw} height={bh * 2 + 10} rx={12} fill={step >= 1 ? accent + '15' : colors.surface2} stroke={step >= 1 ? accent : colors.border} strokeWidth={2} />
          <SvgText x={bx + 10} y={by + 18} fill={step >= 1 ? accent : colors.text3} fontSize={10}>outer f</SvgText>
          {/* Inner box */}
          <Rect x={bx + 20} y={by + 30} width={bw - 40} height={bh} rx={8} fill={step >= 2 ? accent + '22' : colors.surface2} stroke={step >= 2 ? accent + '88' : colors.border} strokeWidth={1.5} />
          <SvgText x={W / 2} y={by + 60} fill={step >= 2 ? accent : colors.text3} fontSize={12} fontWeight="bold" textAnchor="middle">g(x) = x²</SvgText>
          {/* Chain rule result */}
          {step >= 3 && (
            <G>
              <Rect x={bx} y={by + bh * 2 + 20} width={bw} height={30} rx={8} fill={accent + '22'} stroke={accent} strokeWidth={2} />
              <SvgText x={W / 2} y={by + bh * 2 + 40} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">cos(x²) · 2x</SvgText>
            </G>
          )}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to peel layers</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 8. Continuity Test: drag to close gap ───────────────────────────────────
export function ContinuityTestViz({ accent }: VizProps) {
  const gapY = useSharedValue(30);
  const startG = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startG.value = gapY.value; })
    .onUpdate(e => { gapY.value = clamp(startG.value + e.translationY, 0, 60); });

  const cy = H * 0.5;
  const splitX = W / 2;

  // Left curve
  const leftPts: string[] = [];
  for (let px = 30; px <= splitX - 5; px += 2) {
    const t = (px - 30) / (splitX - 35);
    const y = cy - 20 * t;
    leftPts.push(`${px === 30 ? 'M' : 'L'}${px},${y}`);
  }

  const dotProps = useAnimatedProps(() => ({
    cy: cy - 20 + gapY.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Continuity Test</SvgText>
          <Line x1={20} y1={cy + 30} x2={W - 20} y2={cy + 30} stroke={colors.border} strokeWidth={1} />
          {/* Left curve segment */}
          <Path d={leftPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          {/* Right curve segment */}
          <Path d={`M${splitX + 5},${cy - 20} L${W - 30},${cy - 40}`} stroke={accent} strokeWidth={2} fill="none" />
          {/* Draggable piece */}
          <AnimatedCircle animatedProps={dotProps} cx={splitX} r={6} fill={accent} />
          {/* Hole */}
          <Circle cx={splitX} cy={cy - 20} r={5} fill={colors.bg} stroke={accent} strokeWidth={2} />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag to close the gap</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 9. MVT Secant: tap to show parallel tangent ─────────────────────────────
export function MvtSecantViz({ accent }: VizProps) {
  const [showTangent, setShowTangent] = useState(false);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setShowTangent)(!showTangent));

  const lx = W * 0.15;
  const rx = W * 0.85;
  const cy = H * 0.65;

  const f = (px: number) => {
    const t = (px - lx) / (rx - lx);
    return cy - 60 * Math.sin(t * Math.PI * 0.8);
  };

  const pts: string[] = [];
  for (let px = lx; px <= rx; px += 2) pts.push(`${px === lx ? 'M' : 'L'}${px},${f(px)}`);

  const fa = f(lx);
  const fb = f(rx);

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Mean Value Theorem</SvgText>
          <Path d={pts.join(' ')} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          {/* Secant line */}
          <Line x1={lx} y1={fa} x2={rx} y2={fb} stroke={accent + '88'} strokeWidth={2} strokeDasharray="6 4" />
          <Circle cx={lx} cy={fa} r={4} fill={accent} />
          <Circle cx={rx} cy={fb} r={4} fill={accent} />
          <SvgText x={lx} y={fa + 16} fill={colors.text3} fontSize={10} textAnchor="middle">a</SvgText>
          <SvgText x={rx} y={fb + 16} fill={colors.text3} fontSize={10} textAnchor="middle">b</SvgText>
          {/* Parallel tangent at c */}
          {showTangent && (
            <>
              <Line x1={W * 0.25} y1={f(W * 0.45) - 15} x2={W * 0.65} y2={f(W * 0.45) + 15} stroke={accent} strokeWidth={2} />
              <Circle cx={W * 0.45} cy={f(W * 0.45)} r={5} fill={accent} />
              <SvgText x={W * 0.45} y={f(W * 0.45) + 18} fill={accent} fontSize={10} textAnchor="middle">c</SvgText>
            </>
          )}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to {showTangent ? 'hide' : 'show'} tangent at c</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 10. L'Hôpital Zoom: tap to zoom into 0/0 ───────────────────────────────
export function LhopitalZoomViz({ accent }: VizProps) {
  const [zoom, setZoom] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setZoom)((zoom + 1) % 4));

  const levels = [
    { label: 'f(x)/g(x) at x=0', scale: 1, val: '0/0' },
    { label: 'Zoom 2×', scale: 2, val: '≈ ?' },
    { label: 'Zoom 4×', scale: 4, val: '→ 1' },
    { label: "f'(x)/g'(x) = 1", scale: 8, val: '= 1' },
  ];
  const z = levels[zoom];

  const cx = W / 2;
  const cy = H / 2;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">{z.label}</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={20} x2={cx} y2={H - 30} stroke={colors.border} strokeWidth={1} />
          {/* f(x) = sin(x) curve zoomed */}
          {(() => {
            const pts: string[] = [];
            for (let px = 30; px <= W - 30; px += 2) {
              const x = ((px - cx) / (40 * z.scale));
              const y = cy - Math.sin(x) * 40 * z.scale;
              if (y > 10 && y < H - 10) pts.push(`${pts.length === 0 ? 'M' : 'L'}${px},${y}`);
            }
            return <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />;
          })()}
          {/* g(x) = x curve zoomed */}
          {(() => {
            const pts: string[] = [];
            for (let px = 30; px <= W - 30; px += 2) {
              const x = ((px - cx) / (40 * z.scale));
              const y = cy - x * 40 * z.scale;
              if (y > 10 && y < H - 10) pts.push(`${pts.length === 0 ? 'M' : 'L'}${px},${y}`);
            }
            return <Path d={pts.join(' ')} stroke={accent + '66'} strokeWidth={2} fill="none" strokeDasharray="4 3" />;
          })()}
          <Circle cx={cx} cy={cy} r={4} fill={colors.bg} stroke={accent} strokeWidth={2} />
          <SvgText x={W * 0.78} y={cy + 5} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">{z.val}</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to zoom in</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 11. Related Rates Cone: drag water level ────────────────────────────────
export function RelatedRatesConeViz({ accent }: VizProps) {
  const waterY = useSharedValue(H * 0.6);
  const startW = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startW.value = waterY.value; })
    .onUpdate(e => { waterY.value = clamp(startW.value + e.translationY, H * 0.2, H * 0.85); });

  const waterLineProps = useAnimatedProps(() => {
    const ratio = (waterY.value - H * 0.1) / (H * 0.8);
    const halfW = ratio * 60;
    return { x1: W / 2 - halfW, x2: W / 2 + halfW, y1: waterY.value, y2: waterY.value };
  });

  const apex = [W / 2, H * 0.1] as const;
  const baseL = W / 2 - 65;
  const baseR = W / 2 + 65;
  const baseY = H * 0.9;

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W * 0.8} y={30} fill={accent} fontSize={12} fontWeight="bold" textAnchor="middle">dV/dt</SvgText>
          {/* Cone outline */}
          <Line x1={apex[0]} y1={apex[1]} x2={baseL} y2={baseY} stroke={colors.text2} strokeWidth={1.5} />
          <Line x1={apex[0]} y1={apex[1]} x2={baseR} y2={baseY} stroke={colors.text2} strokeWidth={1.5} />
          <Line x1={baseL} y1={baseY} x2={baseR} y2={baseY} stroke={colors.text2} strokeWidth={1.5} />
          {/* Water level line */}
          <AnimatedLine animatedProps={waterLineProps} stroke={accent} strokeWidth={2} />
          {/* Labels */}
          <SvgText x={W * 0.8} y={50} fill={colors.text2} fontSize={10} textAnchor="middle">h ∝ r</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag water level</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 12. Implicit Curve: tap to move point on ellipse ────────────────────────
export function ImplicitCurveViz({ accent }: VizProps) {
  const [idx, setIdx] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setIdx)((idx + 1) % 4));

  const cx = W / 2;
  const cy = H / 2;
  const rx = 90;
  const ry = 60;

  const angles = [0.4, 1.2, 2.5, 3.8];
  const t = angles[idx];
  const px = cx + rx * Math.cos(t);
  const py = cy + ry * Math.sin(t);

  // dy/dx for ellipse x²/a²+y²/b²=1 → dy/dx = -(b²x)/(a²y)
  const ex = rx * Math.cos(t);
  const ey = ry * Math.sin(t);
  const slope = ey !== 0 ? -(ry * ry * ex) / (rx * rx * ey) : Infinity;
  const tanLen = 40;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">x²/a² + y²/b² = 1</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          {/* Ellipse */}
          {(() => {
            const pts: string[] = [];
            for (let i = 0; i <= 64; i++) {
              const a = (i / 64) * 2 * Math.PI;
              const x = cx + rx * Math.cos(a);
              const y = cy + ry * Math.sin(a);
              pts.push(`${i === 0 ? 'M' : 'L'}${x},${y}`);
            }
            return <Path d={pts.join(' ') + ' Z'} stroke={accent} strokeWidth={2} fill="none" />;
          })()}
          {/* Point */}
          <Circle cx={px} cy={py} r={6} fill={accent} />
          {/* Tangent line */}
          {isFinite(slope) && (
            <Line
              x1={px - tanLen} y1={py - tanLen * slope}
              x2={px + tanLen} y2={py + tanLen * slope}
              stroke={accent + '88'} strokeWidth={1.5} strokeDasharray="4 3"
            />
          )}
          <SvgText x={W * 0.78} y={H * 0.35} fill={colors.text2} fontSize={10} textAnchor="middle">dy/dx = {isFinite(slope) ? slope.toFixed(2) : '∞'}</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to move point</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}
