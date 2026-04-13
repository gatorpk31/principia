import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '../../../constants/theme';
import { W, H, AnimatedCircle, AnimatedLine, AnimatedRect, type VizProps } from './shared';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── 1. Parabola: drag vertex ────────────────────────────────────────────────
export function ParabolaViz({ accent }: VizProps) {
  const vx = useSharedValue(W / 2);
  const vy = useSharedValue(H * 0.6);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startX.value = vx.value; startY.value = vy.value; })
    .onUpdate(e => { vx.value = clamp(startX.value + e.translationX, 40, W - 40); vy.value = clamp(startY.value + e.translationY, 40, H - 20); });

  const dotProps = useAnimatedProps(() => ({ cx: vx.value, cy: vy.value }));

  // Static parabola path built from state (simplified — uses default center)
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
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <Line x1={20} y1={H - 15} x2={W - 20} y2={H - 15} stroke={colors.border} strokeWidth={1} />
          <Line x1={W / 2} y1={10} x2={W / 2} y2={H - 15} stroke={colors.border} strokeWidth={1} />
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <AnimatedCircle animatedProps={dotProps} r={7} fill={accent} />
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = a(x − h)² + k</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag vertex</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 2. Quadratic Discriminant: slider for b, see 0/1/2 roots ────────────────
export function QuadraticDiscriminantViz({ accent }: VizProps) {
  const [bIdx, setBIdx] = useState(2);
  const bVals = [-4, -2, 0, 2, 4, 6];
  const b = bVals[bIdx];
  const a = 1;
  const c = 4;
  const disc = b * b - 4 * a * c;
  const rootCount = disc > 0 ? 2 : disc === 0 ? 1 : 0;
  const rootColor = disc > 0 ? '#6bbda0' : disc === 0 ? '#c9a96e' : '#d47878';

  const tap = Gesture.Tap().onEnd(() => runOnJS(setBIdx)((bIdx + 1) % bVals.length));

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
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to change b (b = {b})</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 3. Exponential Curve: slider for base ───────────────────────────────────
export function ExponentialCurveViz({ accent }: VizProps) {
  const bPos = useSharedValue(W * 0.6);
  const startB = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startB.value = bPos.value; })
    .onUpdate(e => { bPos.value = clamp(startB.value + e.translationX, 40, W - 40); });

  const sliderProps = useAnimatedProps(() => ({ cx: bPos.value }));

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
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = bˣ</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={10} x2={cx} y2={H - 30} stroke={colors.border} strokeWidth={1} />
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <SvgText x={W * 0.7} y={40} fill={colors.text2} fontSize={12} textAnchor="middle">Growth (b {'>'} 1)</SvgText>
          <Rect x={40} y={H - 18} width={W - 80} height={4} rx={2} fill={colors.surface2} />
          <AnimatedCircle animatedProps={sliderProps} cy={H - 16} r={7} fill={accent} />
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag to change base</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 4. Log Mirror: toggle exp / log / mirror line ───────────────────────────
export function LogMirrorViz({ accent }: VizProps) {
  const [show, setShow] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setShow)((show + 1) % 3));

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
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">{labels[show]}</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={10} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          {(show === 0 || show === 2) && <Path d={expPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />}
          {(show === 1 || show === 2) && <Path d={logPts.join(' ')} stroke={accent + '88'} strokeWidth={2} fill="none" />}
          {show === 2 && <Line x1={20} y1={cy - (20 - cx) / s * s} x2={W - 20} y2={cy - (W - 20 - cx) / s * s} stroke={colors.text3} strokeWidth={1} strokeDasharray="6 4" />}
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to toggle</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 5. Polynomial Roots: drag one root ──────────────────────────────────────
export function PolynomialRootsViz({ accent }: VizProps) {
  const r3x = useSharedValue(W * 0.75);
  const startR = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startR.value = r3x.value; })
    .onUpdate(e => { r3x.value = clamp(startR.value + e.translationX, W * 0.5, W - 30); });

  const r3Props = useAnimatedProps(() => ({ cx: r3x.value }));

  const cx = W / 2;
  const cy = H * 0.55;
  const r1 = W * 0.2;
  const r2 = W * 0.4;
  const s = 1;

  const pts: string[] = [];
  for (let px = 20; px <= W - 20; px += 2) {
    const y = ((px - r1) * (px - r2) * (px - W * 0.75)) * 0.0003;
    pts.push(`${px === 20 ? 'M' : 'L'}${px},${cy - y}`);
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Cubic with 3 roots</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <Circle cx={r1} cy={cy} r={5} fill={accent} />
          <Circle cx={r2} cy={cy} r={5} fill={accent} />
          <AnimatedCircle animatedProps={r3Props} cy={cy} r={7} fill={accent} />
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag third root</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 6. Complex Plane: tap to cycle complex numbers ──────────────────────────
export function ComplexPlaneViz({ accent }: VizProps) {
  const [idx, setIdx] = useState(0);
  const nums = [
    { re: 3, im: 2, label: '3 + 2i' },
    { re: -1, im: 4, label: '-1 + 4i' },
    { re: 2, im: -3, label: '2 − 3i' },
    { re: -2, im: -1, label: '-2 − i' },
  ];
  const n = nums[idx];
  const cx = W / 2;
  const cy = H / 2;
  const s = 22;
  const tap = Gesture.Tap().onEnd(() => runOnJS(setIdx)((idx + 1) % nums.length));

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to cycle numbers</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 7. Complete the Square: step through visual ─────────────────────────────
export function CompleteSquareViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'x² + 6x', desc: 'Start' },
    { label: 'x² + 6x + 9 − 9', desc: 'Add & subtract (6/2)²' },
    { label: '(x + 3)² − 9', desc: 'Factor' },
  ];
  const s = steps[step];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % steps.length));

  const boxX = W * 0.15;
  const boxY = 50;
  const bSz = 80;

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to step through</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 8. Poly Division: step through long division ────────────────────────────
export function PolyDivisionViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const lines = [
    'x² + 3x + 2  ÷  (x + 1)',
    'x · (x+1) = x² + x',
    'Subtract → 2x + 2',
    '2 · (x+1) = 2x + 2',
    'Remainder = 0 → Answer: x + 2',
  ];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)(Math.min(step + 1, lines.length - 1)));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Polynomial Long Division</SvgText>
          {lines.slice(0, step + 1).map((line, i) => (
            <G key={i}>
              <Rect x={W * 0.08} y={32 + i * 34} width={W * 0.84} height={28} rx={6} fill={i === step ? accent + '22' : colors.surface2} />
              <SvgText x={W / 2} y={50 + i * 34} fill={i === step ? accent : colors.text2} fontSize={12} fontWeight={i === step ? 'bold' : 'normal'} textAnchor="middle">{line}</SvgText>
            </G>
          ))}
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">{step < lines.length - 1 ? 'tap for next step' : 'tap to restart'}</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 9. Rational Asymptotes: drag vertical asymptote ─────────────────────────
export function RationalAsymptotesViz({ accent }: VizProps) {
  const aX = useSharedValue(W * 0.5);
  const startA = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startA.value = aX.value; })
    .onUpdate(e => { aX.value = clamp(startA.value + e.translationX, 60, W - 60); });

  const asymProps = useAnimatedProps(() => ({ x1: aX.value, x2: aX.value }));

  const cy = H / 2;
  // Draw 1/(x-2) style hyperbola with asymptote at W/2
  const mid = W / 2;
  const leftPts: string[] = [];
  const rightPts: string[] = [];
  for (let px = 20; px <= W - 20; px += 2) {
    const dx = px - mid;
    if (Math.abs(dx) < 8) continue;
    const y = cy - 600 / dx;
    const clamped = clamp(y, -20, H + 20);
    if (dx < 0) leftPts.push(`${leftPts.length === 0 ? 'M' : 'L'}${px},${clamped}`);
    else rightPts.push(`${rightPts.length === 0 ? 'M' : 'L'}${px},${clamped}`);
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Rational Function</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} strokeDasharray="4 4" />
          <AnimatedLine animatedProps={asymProps} y1={20} y2={H - 20} stroke={accent + '55'} strokeWidth={2} strokeDasharray="6 4" />
          <Path d={leftPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <Path d={rightPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag asymptote</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 10. Series Sum: tap to add terms of geometric series ────────────────────
export function SeriesSumViz({ accent }: VizProps) {
  const [terms, setTerms] = useState(1);
  const maxTerms = 8;
  let sum = 0;
  for (let i = 0; i < terms; i++) sum += 1 / Math.pow(2, i);

  const tap = Gesture.Tap().onEnd(() => runOnJS(setTerms)(terms >= maxTerms ? 1 : terms + 1));

  const barW = W - 60;
  const barH = 30;
  const barY = H / 2 - barH / 2;

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to add term</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 11. Conic Slicer: drag slice angle on a cone ────────────────────────────
export function ConicSlicerViz({ accent }: VizProps) {
  const sliceY = useSharedValue(H * 0.5);
  const startS = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startS.value = sliceY.value; })
    .onUpdate(e => { sliceY.value = clamp(startS.value + e.translationY, 30, H - 30); });

  const sliceProps = useAnimatedProps(() => ({ y1: sliceY.value, y2: sliceY.value }));

  // Determine shape based on position
  const getShape = (y: number) => {
    const pct = (y - 30) / (H - 60);
    if (pct < 0.25) return 'Circle';
    if (pct < 0.5) return 'Ellipse';
    if (pct < 0.75) return 'Parabola';
    return 'Hyperbola';
  };

  // Cone outline
  const apex = [W * 0.35, 25] as const;
  const baseL = [W * 0.1, H - 25] as const;
  const baseR = [W * 0.6, H - 25] as const;

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W * 0.78} y={30} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Conic Sections</SvgText>
          {/* Cone */}
          <Path d={`M${apex[0]},${apex[1]} L${baseL[0]},${baseL[1]} L${baseR[0]},${baseR[1]} Z`} stroke={colors.text2} strokeWidth={1.5} fill={colors.surface2} />
          {/* Slice line */}
          <AnimatedLine animatedProps={sliceProps} x1={W * 0.05} x2={W * 0.65} stroke={accent} strokeWidth={2} />
          {/* Shape preview area */}
          <Rect x={W * 0.65} y={60} width={W * 0.3} height={H - 90} rx={8} fill={colors.surface2} />
          <SvgText x={W * 0.8} y={H / 2} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">?</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag slice line up/down</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}
