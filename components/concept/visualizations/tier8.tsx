import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '../../../constants/theme';
import { W, H, AnimatedCircle, AnimatedLine, AnimatedRect, type VizProps } from './shared';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── 1. Integration by Parts: tap through u·dv split ─────────────────────────
export function IbpProductViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const steps = [
    { label: '∫ x·eˣ dx', desc: 'Choose u and dv' },
    { label: 'u = x, dv = eˣ dx', desc: 'Split the product' },
    { label: 'du = dx, v = eˣ', desc: 'Differentiate u, integrate dv' },
    { label: 'x·eˣ − ∫ eˣ dx', desc: 'uv − ∫ v du' },
    { label: 'x·eˣ − eˣ + C', desc: 'Final answer' },
  ];
  const s = steps[step];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % steps.length));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={18} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{s.label}</SvgText>
          <SvgText x={W / 2} y={36} fill={colors.text2} fontSize={11} textAnchor="middle">{s.desc}</SvgText>
          {/* Step indicator boxes */}
          {steps.map((_, i) => (
            <Rect key={i} x={W * 0.1 + i * (W * 0.16)} y={55} width={W * 0.14} height={6} rx={3} fill={i <= step ? accent : colors.surface2} />
          ))}
          {/* Visual boxes for u and dv */}
          {step >= 1 && (
            <>
              <Rect x={W * 0.1} y={80} width={W * 0.35} height={40} rx={8} fill={accent + '22'} stroke={accent} strokeWidth={1.5} />
              <SvgText x={W * 0.1 + W * 0.175} y={105} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">u = x</SvgText>
              <Rect x={W * 0.55} y={80} width={W * 0.35} height={40} rx={8} fill={accent + '15'} stroke={accent + '88'} strokeWidth={1.5} />
              <SvgText x={W * 0.55 + W * 0.175} y={105} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">dv = eˣ</SvgText>
            </>
          )}
          {step >= 2 && (
            <>
              <Rect x={W * 0.1} y={130} width={W * 0.35} height={34} rx={8} fill={colors.surface2} />
              <SvgText x={W * 0.1 + W * 0.175} y={152} fill={colors.text} fontSize={12} textAnchor="middle">du = dx</SvgText>
              <Rect x={W * 0.55} y={130} width={W * 0.35} height={34} rx={8} fill={colors.surface2} />
              <SvgText x={W * 0.55 + W * 0.175} y={152} fill={colors.text} fontSize={12} textAnchor="middle">v = eˣ</SvgText>
            </>
          )}
          {step >= 3 && (
            <Rect x={W * 0.1} y={174} width={W * 0.8} height={30} rx={8} fill={accent + '11'} stroke={accent} strokeWidth={1} />
          )}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to step through</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 2. Sequence Converge: tap to add terms ──────────────────────────────────
export function SequenceConvergeViz({ accent }: VizProps) {
  const [n, setN] = useState(3);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setN)(n >= 12 ? 3 : n + 1));

  const limit = 1;
  const cy = H / 2;
  const lx = 40;
  const rx = W - 40;
  const rangeW = rx - lx;

  const seq = (k: number) => 1 + Math.pow(-1, k) / k; // oscillates toward 1

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">aₙ → {limit} as n → ∞</SvgText>
          {/* Number line */}
          <Line x1={lx} y1={cy} x2={rx} y2={cy} stroke={colors.border} strokeWidth={1} />
          {/* Limit target */}
          <Line x1={W / 2} y1={cy - 30} x2={W / 2} y2={cy + 30} stroke={accent + '44'} strokeWidth={2} strokeDasharray="4 3" />
          <SvgText x={W / 2} y={cy + 44} fill={accent} fontSize={10} textAnchor="middle">L = {limit}</SvgText>
          {/* Dots for sequence terms */}
          {Array.from({ length: n }, (_, i) => {
            const k = i + 1;
            const val = seq(k);
            const px = lx + ((val - 0.5) / 1) * rangeW; // map [0.5, 1.5] → [lx, rx]
            const clamped = clamp(px, lx + 5, rx - 5);
            return (
              <G key={k}>
                <Circle cx={clamped} cy={cy} r={5} fill={k === n ? accent : accent + '66'} />
                <SvgText x={clamped} y={cy - 12} fill={k === n ? accent : colors.text3} fontSize={9} textAnchor="middle">{k}</SvgText>
              </G>
            );
          })}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to add terms</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 3. Convergence Meter: tap to cycle tests ────────────────────────────────
export function ConvergenceMeterViz({ accent }: VizProps) {
  const [test, setTest] = useState(0);
  const tests = [
    { name: 'Ratio Test', val: 0.5, result: 'Converges', color: '#6bbda0' },
    { name: 'Root Test', val: 0.7, result: 'Converges', color: '#6bbda0' },
    { name: 'Ratio Test', val: 1.3, result: 'Diverges', color: '#d47878' },
  ];
  const t = tests[test];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setTest)((test + 1) % tests.length));

  const meterX = W * 0.15;
  const meterW = W * 0.7;
  const meterY = H / 2 - 10;
  const meterH = 24;
  const needleX = meterX + meterW * (t.val / 2); // map [0,2] to meter width

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={18} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{t.name}</SvgText>
          <SvgText x={W / 2} y={36} fill={t.color} fontSize={16} fontWeight="bold" textAnchor="middle">{t.result}</SvgText>
          {/* Meter background */}
          <Rect x={meterX} y={meterY} width={meterW} height={meterH} rx={12} fill={colors.surface2} />
          {/* Converge zone (left half) */}
          <Rect x={meterX} y={meterY} width={meterW / 2} height={meterH} rx={12} fill="#6bbda033" />
          {/* Diverge zone (right half) */}
          <Rect x={meterX + meterW / 2} y={meterY} width={meterW / 2} height={meterH} rx={12} fill="#d4787833" />
          {/* Center line at 1 */}
          <Line x1={meterX + meterW / 2} y1={meterY - 5} x2={meterX + meterW / 2} y2={meterY + meterH + 5} stroke={colors.text} strokeWidth={2} />
          <SvgText x={meterX + meterW / 2} y={meterY + meterH + 20} fill={colors.text2} fontSize={10} textAnchor="middle">1</SvgText>
          {/* Needle */}
          <Circle cx={needleX} cy={meterY + meterH / 2} r={8} fill={t.color} />
          <SvgText x={needleX} y={meterY - 8} fill={t.color} fontSize={12} fontWeight="bold" textAnchor="middle">{t.val}</SvgText>
          <SvgText x={meterX} y={meterY + meterH + 20} fill={colors.text3} fontSize={9} textAnchor="start">0</SvgText>
          <SvgText x={meterX + meterW} y={meterY + meterH + 20} fill={colors.text3} fontSize={9} textAnchor="end">2</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to cycle tests</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 4. Taylor Approximation: tap to add terms ───────────────────────────────
export function TaylorApproxViz({ accent }: VizProps) {
  const [terms, setTerms] = useState(1);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setTerms)(terms >= 6 ? 1 : terms + 1));

  const cx = W * 0.3;
  const cy = H * 0.6;
  const s = 20;

  // sin(x) curve
  const sinPts: string[] = [];
  for (let px = 20; px <= W - 20; px += 2) {
    const x = (px - cx) / s;
    const y = cy - Math.sin(x) * 40;
    if (y > 5 && y < H - 5) sinPts.push(`${sinPts.length === 0 ? 'M' : 'L'}${px},${y}`);
  }

  // Taylor polynomial for sin(x): x - x³/6 + x⁵/120 - ...
  const taylor = (x: number, n: number) => {
    let sum = 0;
    for (let k = 0; k < n; k++) {
      const exp = 2 * k + 1;
      let fact = 1;
      for (let j = 2; j <= exp; j++) fact *= j;
      sum += (Math.pow(-1, k) * Math.pow(x, exp)) / fact;
    }
    return sum;
  };

  const tayPts: string[] = [];
  for (let px = 20; px <= W - 20; px += 2) {
    const x = (px - cx) / s;
    const y = cy - taylor(x, terms) * 40;
    if (y > -20 && y < H + 20) tayPts.push(`${tayPts.length === 0 ? 'M' : 'L'}${px},${clamp(y, 5, H - 5)}`);
  }

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Taylor: sin(x) ≈ {terms} term{terms > 1 ? 's' : ''}</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={10} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <Path d={sinPts.join(' ')} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          <Path d={tayPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to add terms</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 5. Epsilon-Delta Band: drag ε ───────────────────────────────────────────
export function EpsilonDeltaBandViz({ accent }: VizProps) {
  const eps = useSharedValue(40);
  const startE = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startE.value = eps.value; })
    .onUpdate(e => { eps.value = clamp(startE.value + e.translationY, 10, 70); });

  const epsTopProps = useAnimatedProps(() => ({ y1: H / 2 - eps.value, y2: H / 2 - eps.value }));
  const epsBotProps = useAnimatedProps(() => ({ y1: H / 2 + eps.value, y2: H / 2 + eps.value }));
  const bandProps = useAnimatedProps(() => ({
    y: H / 2 - eps.value,
    height: eps.value * 2,
  }));

  const cx = W / 2;
  const cy = H / 2;

  const pts: string[] = [];
  for (let px = 30; px <= W - 30; px += 2) {
    const t = (px - 30) / (W - 60);
    const y = cy - 30 * Math.sin(t * 2 * Math.PI);
    pts.push(`${px === 30 ? 'M' : 'L'}${px},${y}`);
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">ε-δ Definition of Limit</SvgText>
          {/* ε band */}
          <AnimatedRect animatedProps={bandProps} x={20} width={W - 40} fill={accent + '11'} />
          <AnimatedLine animatedProps={epsTopProps} x1={20} x2={W - 20} stroke={accent + '55'} strokeWidth={1} strokeDasharray="4 3" />
          <AnimatedLine animatedProps={epsBotProps} x1={20} x2={W - 20} stroke={accent + '55'} strokeWidth={1} strokeDasharray="4 3" />
          {/* L line */}
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <SvgText x={W - 25} y={cy - 6} fill={colors.text3} fontSize={10}>L</SvgText>
          {/* Curve */}
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          {/* a mark */}
          <Line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} stroke={accent} strokeWidth={2} />
          <SvgText x={cx} y={cy + 18} fill={colors.text3} fontSize={10} textAnchor="middle">a</SvgText>
          <SvgText x={25} y={cy - 3} fill={accent} fontSize={10}>ε</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag to change ε</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 6. Induction Dominoes: tap to topple ────────────────────────────────────
export function InductionDominoesViz({ accent }: VizProps) {
  const [fallen, setFallen] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setFallen)(fallen >= 8 ? 0 : fallen + 1));

  const count = 8;
  const domW = 16;
  const domH = 50;
  const gap = (W - 60) / count;
  const baseY = H * 0.7;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Mathematical Induction</SvgText>
          {fallen === 0 && <SvgText x={W / 2} y={34} fill={colors.text2} fontSize={11} textAnchor="middle">Base case: prove P(1)</SvgText>}
          {fallen === 1 && <SvgText x={W / 2} y={34} fill={accent} fontSize={11} textAnchor="middle">Base case ✓ — now the chain begins</SvgText>}
          {fallen > 1 && <SvgText x={W / 2} y={34} fill={accent} fontSize={11} textAnchor="middle">Inductive step: P(k) → P(k+1)</SvgText>}
          {/* Ground line */}
          <Line x1={20} y1={baseY + domH / 2 + 4} x2={W - 20} y2={baseY + domH / 2 + 4} stroke={colors.border} strokeWidth={1} />
          {/* Dominoes */}
          {Array.from({ length: count }, (_, i) => {
            const x = 30 + i * gap;
            const isFallen = i < fallen;
            if (isFallen) {
              // Fallen domino (horizontal)
              return (
                <G key={i}>
                  <Rect x={x} y={baseY + domH / 2 - domW / 2} width={domH * 0.6} height={domW} rx={3} fill={accent} />
                  <SvgText x={x + domH * 0.3} y={baseY + domH / 2 + 5} fill={colors.bg} fontSize={9} fontWeight="bold" textAnchor="middle">{i + 1}</SvgText>
                </G>
              );
            }
            // Standing domino
            return (
              <G key={i}>
                <Rect x={x} y={baseY - domH / 2 + 10} width={domW} height={domH} rx={3} fill={colors.surface2} stroke={i === fallen ? accent : colors.border} strokeWidth={i === fallen ? 2 : 1} />
                <SvgText x={x + domW / 2} y={baseY + 10} fill={i === fallen ? accent : colors.text3} fontSize={9} fontWeight="bold" textAnchor="middle">{i + 1}</SvgText>
              </G>
            );
          })}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to topple next</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 7. Trig Sub Triangle: tap to cycle substitutions ────────────────────────
export function TrigSubTriangleViz({ accent }: VizProps) {
  const [sub, setSub] = useState(0);
  const subs = [
    { name: 'x = a·sinθ', opp: 'x', hyp: 'a', adj: '√(a²−x²)' },
    { name: 'x = a·tanθ', opp: 'x', hyp: '√(a²+x²)', adj: 'a' },
    { name: 'x = a·secθ', opp: '√(x²−a²)', hyp: 'x', adj: 'a' },
  ];
  const s = subs[sub];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setSub)((sub + 1) % subs.length));

  const ax = W * 0.25;
  const ay = H * 0.75;
  const bx = W * 0.65;
  const by = H * 0.75;
  const cx = W * 0.25;
  const cy = H * 0.2;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{s.name}</SvgText>
          {/* Right triangle */}
          <Path d={`M${ax},${ay} L${bx},${by} L${cx},${cy} Z`} stroke={colors.text2} strokeWidth={2} fill="none" />
          {/* Right angle indicator */}
          <Rect x={ax} y={ay - 12} width={12} height={12} fill="none" stroke={colors.text3} strokeWidth={1} />
          {/* Labels */}
          <SvgText x={(ax + bx) / 2} y={ay + 18} fill={accent} fontSize={12} fontWeight="bold" textAnchor="middle">{s.adj}</SvgText>
          <SvgText x={ax - 14} y={(ay + cy) / 2} fill={accent} fontSize={12} fontWeight="bold" textAnchor="middle">{s.opp}</SvgText>
          <SvgText x={(bx + cx) / 2 + 14} y={(by + cy) / 2} fill={accent + '88'} fontSize={12} fontWeight="bold" textAnchor="middle">{s.hyp}</SvgText>
          {/* θ label */}
          <SvgText x={bx - 8} y={by - 8} fill={colors.text2} fontSize={11}>θ</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to cycle substitutions</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 8. Improper Integral: drag upper bound toward ∞ ─────────────────────────
export function ImproperIntegralViz({ accent }: VizProps) {
  const bX = useSharedValue(W * 0.6);
  const startB = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startB.value = bX.value; })
    .onUpdate(e => { bX.value = clamp(startB.value + e.translationX, W * 0.3, W - 30); });

  const bLineProps = useAnimatedProps(() => ({ x1: bX.value, x2: bX.value }));

  const cy = H * 0.7;
  const lx = 50;
  const f = (px: number) => cy - 4000 / Math.max((px - lx + 20) * (px - lx + 20), 1);

  const pts: string[] = [];
  for (let px = lx; px <= W - 20; px += 2) {
    const y = f(px);
    if (y > 10 && y < H) pts.push(`${pts.length === 0 ? 'M' : 'L'}${px},${y}`);
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">∫₁^∞ 1/x² dx → 1</SvgText>
          <Line x1={lx} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          {/* Shaded area */}
          <Rect x={lx} y={cy - 40} width={W * 0.6 - lx} height={40} fill={accent + '22'} />
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          {/* Upper bound */}
          <AnimatedLine animatedProps={bLineProps} y1={cy - 50} y2={cy + 5} stroke={accent} strokeWidth={2} />
          <SvgText x={W - 30} y={cy - 5} fill={colors.text3} fontSize={10}>→ ∞</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag upper bound rightward</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 9. Contradiction Fork: tap to follow branches ───────────────────────────
export function ContradictionForkViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % 4));

  const labels = [
    'Assume ¬P',
    'Follow logic...',
    'Contradiction! ✗',
    'Therefore P is true ✓',
  ];

  const forkX = W / 2;
  const forkY = 65;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Proof by Contradiction</SvgText>
          {/* Assumption box */}
          <Rect x={W * 0.2} y={35} width={W * 0.6} height={30} rx={8} fill={step >= 0 ? accent + '22' : colors.surface2} stroke={step >= 0 ? accent : colors.border} strokeWidth={1.5} />
          <SvgText x={forkX} y={55} fill={step >= 0 ? accent : colors.text2} fontSize={12} fontWeight="bold" textAnchor="middle">{labels[0]}</SvgText>
          {/* Fork lines */}
          {step >= 1 && (
            <>
              <Line x1={forkX} y1={forkY} x2={forkX - 60} y2={forkY + 40} stroke={accent} strokeWidth={2} />
              <Line x1={forkX} y1={forkY} x2={forkX + 60} y2={forkY + 40} stroke={accent} strokeWidth={2} />
            </>
          )}
          {/* Left branch: leads to contradiction */}
          {step >= 2 && (
            <>
              <Rect x={forkX - 110} y={forkY + 45} width={100} height={30} rx={8} fill="#d4787833" stroke="#d47878" strokeWidth={1.5} />
              <SvgText x={forkX - 60} y={forkY + 65} fill="#d47878" fontSize={11} fontWeight="bold" textAnchor="middle">✗ Contradiction</SvgText>
            </>
          )}
          {/* Right branch: valid path */}
          {step >= 2 && (
            <>
              <Rect x={forkX + 10} y={forkY + 45} width={100} height={30} rx={8} fill={colors.surface2} stroke={colors.border} strokeWidth={1} />
              <SvgText x={forkX + 60} y={forkY + 65} fill={colors.text3} fontSize={11} textAnchor="middle">leads to...</SvgText>
            </>
          )}
          {/* Conclusion */}
          {step >= 3 && (
            <>
              <Rect x={W * 0.15} y={forkY + 90} width={W * 0.7} height={34} rx={10} fill="#6bbda022" stroke="#6bbda0" strokeWidth={2} />
              <SvgText x={forkX} y={forkY + 112} fill="#6bbda0" fontSize={13} fontWeight="bold" textAnchor="middle">∴ P is true ✓</SvgText>
            </>
          )}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to follow the proof</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 10. Partial Fraction Split: tap to split ────────────────────────────────
export function PartialFractionSplitViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % 3));

  const steps = [
    '1 / ((x−1)(x+2))',
    'A/(x−1) + B/(x+2)',
    'A = 1/3, B = −1/3',
  ];

  const boxW = W * 0.7;
  const boxH = 50;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Partial Fractions</SvgText>
          {/* Original fraction */}
          <Rect x={(W - boxW) / 2} y={35} width={boxW} height={boxH} rx={10} fill={step === 0 ? accent + '22' : colors.surface2} stroke={step === 0 ? accent : colors.border} strokeWidth={step === 0 ? 2 : 1} />
          <SvgText x={W / 2} y={65} fill={step === 0 ? accent : colors.text2} fontSize={14} fontWeight="bold" textAnchor="middle">{steps[0]}</SvgText>
          {step >= 1 && (
            <>
              {/* Arrow */}
              <SvgText x={W / 2} y={100} fill={accent} fontSize={18} textAnchor="middle">↓</SvgText>
              {/* Split fractions */}
              <Rect x={(W - boxW) / 2} y={108} width={boxW * 0.45} height={boxH} rx={10} fill={accent + '22'} stroke={accent} strokeWidth={1.5} />
              <SvgText x={(W - boxW) / 2 + boxW * 0.225} y={138} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">A/(x−1)</SvgText>
              <SvgText x={W / 2} y={138} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">+</SvgText>
              <Rect x={W / 2 + boxW * 0.05} y={108} width={boxW * 0.45} height={boxH} rx={10} fill={accent + '15'} stroke={accent + '88'} strokeWidth={1.5} />
              <SvgText x={W / 2 + boxW * 0.05 + boxW * 0.225} y={138} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">B/(x+2)</SvgText>
            </>
          )}
          {step >= 2 && (
            <SvgText x={W / 2} y={180} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{steps[2]}</SvgText>
          )}
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to split</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 11. Power Series Radius: drag R ─────────────────────────────────────────
export function PowerSeriesRadiusViz({ accent }: VizProps) {
  const rPos = useSharedValue(W * 0.65);
  const startR = useSharedValue(0);
  const [closed, setClosed] = useState(true);

  const pan = Gesture.Pan()
    .onBegin(() => { startR.value = rPos.value; })
    .onUpdate(e => { rPos.value = clamp(startR.value + e.translationX, W * 0.35, W - 40); });
  const tap = Gesture.Tap().onEnd(() => runOnJS(setClosed)(!closed));

  const rDotProps = useAnimatedProps(() => ({ cx: rPos.value }));
  const lDotProps = useAnimatedProps(() => ({ cx: W - rPos.value }));

  const cy = H / 2;
  const lineY = cy;

  // Interval shading
  const shadeProps = useAnimatedProps(() => ({
    x: W - rPos.value,
    width: 2 * rPos.value - W,
  }));

  return (
    <GestureDetector gesture={Gesture.Race(pan, tap)}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Radius of Convergence</SvgText>
          <SvgText x={W / 2} y={34} fill={colors.text2} fontSize={11} textAnchor="middle">
            {closed ? '[−R, R]' : '(−R, R)'} — tap to toggle endpoints
          </SvgText>
          {/* Number line */}
          <Line x1={30} y1={lineY} x2={W - 30} y2={lineY} stroke={colors.border} strokeWidth={2} />
          {/* Center mark */}
          <Line x1={W / 2} y1={lineY - 8} x2={W / 2} y2={lineY + 8} stroke={colors.text} strokeWidth={2} />
          <SvgText x={W / 2} y={lineY + 22} fill={colors.text3} fontSize={10} textAnchor="middle">0</SvgText>
          {/* Shaded interval */}
          <AnimatedRect animatedProps={shadeProps} y={lineY - 6} height={12} fill={accent + '33'} />
          {/* Right endpoint */}
          <AnimatedCircle animatedProps={rDotProps} cy={lineY} r={7} fill={closed ? accent : 'transparent'} stroke={accent} strokeWidth={2} />
          {/* Left endpoint (mirror) */}
          <AnimatedCircle animatedProps={lDotProps} cy={lineY} r={7} fill={closed ? accent : 'transparent'} stroke={accent} strokeWidth={2} />
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag R · tap to toggle open/closed</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}
