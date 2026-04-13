import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '../../../constants/theme';
import { W, H, AnimatedCircle, AnimatedLine, AnimatedRect, type VizProps } from './shared';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── 1. Unit Circle: pan point around circle, see sin/cos ───────────────────
export function UnitCircleViz({ accent }: VizProps) {
  const [angle, setAngle] = useState(45);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setAngle)((angle + 30) % 360));

  const cx = W * 0.4;
  const cy = H / 2;
  const r = 70;
  const rad = (angle * Math.PI) / 180;
  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad);
  const cosVal = Math.cos(rad).toFixed(2);
  const sinVal = Math.sin(rad).toFixed(2);

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <Line x1={cx - r - 10} y1={cy} x2={cx + r + 10} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={cy - r - 10} x2={cx} y2={cy + r + 10} stroke={colors.border} strokeWidth={1} />
          <Circle cx={cx} cy={cy} r={r} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          {/* cos projection */}
          <Line x1={cx} y1={cy} x2={px} y2={cy} stroke={accent} strokeWidth={2} />
          {/* sin projection */}
          <Line x1={px} y1={cy} x2={px} y2={py} stroke={accent + '88'} strokeWidth={2} />
          {/* radius line */}
          <Line x1={cx} y1={cy} x2={px} y2={py} stroke={colors.text} strokeWidth={1.5} />
          <Circle cx={px} cy={py} r={6} fill={accent} />
          <SvgText x={W * 0.78} y={cy - 20} fill={accent} fontSize={12} fontWeight="bold" textAnchor="middle">θ = {angle}°</SvgText>
          <SvgText x={W * 0.78} y={cy} fill={accent} fontSize={11} textAnchor="middle">cos = {cosVal}</SvgText>
          <SvgText x={W * 0.78} y={cy + 16} fill={accent + '88'} fontSize={11} textAnchor="middle">sin = {sinVal}</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to rotate (+30°)</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 2. Sine Wave: drag amplitude slider ─────────────────────────────────────
export function SineWaveViz({ accent }: VizProps) {
  const ampPos = useSharedValue(W * 0.6);
  const startA = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startA.value = ampPos.value; })
    .onUpdate(e => { ampPos.value = clamp(startA.value + e.translationX, 40, W - 40); });

  const sliderProps = useAnimatedProps(() => ({ cx: ampPos.value }));

  const cy = H / 2 - 10;
  const amp = 50;
  const pts: string[] = [];
  for (let px = 20; px <= W - 20; px += 2) {
    const t = ((px - 20) / (W - 40)) * 4 * Math.PI;
    const y = cy - amp * Math.sin(t);
    pts.push(`${px === 20 ? 'M' : 'L'}${px},${y}`);
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = A · sin(Bx)</SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <Rect x={40} y={H - 18} width={W - 80} height={4} rx={2} fill={colors.surface2} />
          <AnimatedCircle animatedProps={sliderProps} cy={H - 16} r={7} fill={accent} />
          <SvgText x={25} y={H - 10} fill={colors.text3} fontSize={10}>A</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag to change amplitude</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 3. Trig Identity Puzzle: sin²θ + cos²θ = 1 ─────────────────────────────
export function TrigIdentityPuzzleViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % 4));

  const barW = W - 80;
  const barH = 36;
  const barY = H / 2 - barH / 2;
  const sin2 = 0.6;
  const cos2 = 0.4;

  const labels = ['sin²θ + cos²θ = ?', 'sin²θ = 0.6', '+ cos²θ = 0.4', '= 1 ✓'];

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={20} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{labels[step]}</SvgText>
          {/* Background bar */}
          <Rect x={40} y={barY} width={barW} height={barH} rx={8} fill={colors.surface2} />
          {/* sin² portion */}
          {step >= 1 && <Rect x={40} y={barY} width={barW * sin2} height={barH} rx={8} fill={accent + 'aa'} />}
          {step >= 1 && <SvgText x={40 + barW * sin2 / 2} y={barY + barH / 2 + 5} fill={colors.text} fontSize={12} fontWeight="bold" textAnchor="middle">sin²θ</SvgText>}
          {/* cos² portion */}
          {step >= 2 && <Rect x={40 + barW * sin2} y={barY} width={barW * cos2} height={barH} rx={0} fill={accent + '66'} />}
          {step >= 2 && <SvgText x={40 + barW * sin2 + barW * cos2 / 2} y={barY + barH / 2 + 5} fill={colors.text} fontSize={12} fontWeight="bold" textAnchor="middle">cos²θ</SvgText>}
          {/* Result */}
          {step >= 3 && (
            <>
              <Rect x={40} y={barY + barH + 12} width={barW} height={4} rx={2} fill={accent} />
              <SvgText x={W / 2} y={barY + barH + 34} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">= 1</SvgText>
            </>
          )}
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to step through</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 4. Inverse Trig Arc: drag y, see arcsin ─────────────────────────────────
export function InverseTrigArcViz({ accent }: VizProps) {
  const yPos = useSharedValue(H / 2);
  const startY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startY.value = yPos.value; })
    .onUpdate(e => { yPos.value = clamp(startY.value + e.translationY, 30, H - 30); });

  const dotProps = useAnimatedProps(() => ({ cy: yPos.value }));

  const cx = W * 0.35;
  const cy = H / 2;
  const r = 70;

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = arcsin(x)</SvgText>
          <Circle cx={cx} cy={cy} r={r} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          <Line x1={cx - r - 10} y1={cy} x2={cx + r + 10} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={cy - r - 10} x2={cx} y2={cy + r + 10} stroke={colors.border} strokeWidth={1} />
          {/* Draggable y-value indicator */}
          <AnimatedCircle animatedProps={dotProps} cx={W * 0.78} r={7} fill={accent} />
          <Line x1={W * 0.7} y1={30} x2={W * 0.7} y2={H - 30} stroke={colors.surface2} strokeWidth={4} />
          <SvgText x={W * 0.85} y={cy} fill={colors.text3} fontSize={10}>y</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag y value</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 5. Function Transform: shift y = x² ─────────────────────────────────────
export function FunctionTransformViz({ accent }: VizProps) {
  const hShift = useSharedValue(0);
  const startH = useSharedValue(0);
  const [stretched, setStretched] = useState(false);

  const pan = Gesture.Pan()
    .onBegin(() => { startH.value = hShift.value; })
    .onUpdate(e => { hShift.value = clamp(startH.value + e.translationX, -80, 80); });
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStretched)(!stretched));

  const cx = W / 2;
  const cy = H * 0.7;
  const a = stretched ? 2 : 1;
  const s = 14;

  // Base curve (ghost)
  const basePts: string[] = [];
  for (let px = 20; px <= W - 20; px += 3) {
    const x = (px - cx) / s;
    const y = x * x;
    const py = cy - y * 3;
    if (py > 0) basePts.push(`${basePts.length === 0 ? 'M' : 'L'}${px},${py}`);
  }

  // Transformed (shifted) curve
  const transPts: string[] = [];
  for (let px = 20; px <= W - 20; px += 3) {
    const x = (px - cx) / s;
    const y = a * x * x;
    const py = cy - y * 3;
    if (py > 0) transPts.push(`${transPts.length === 0 ? 'M' : 'L'}${px},${py}`);
  }

  return (
    <GestureDetector gesture={Gesture.Race(pan, tap)}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
            y = {stretched ? '2' : ''}(x − h)²
          </SvgText>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={10} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <Path d={basePts.join(' ')} stroke={colors.border} strokeWidth={1} fill="none" strokeDasharray="4 4" />
          <Path d={transPts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag to shift · tap to stretch</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 6. Limit Approach: drag dot toward hole ─────────────────────────────────
export function LimitApproachViz({ accent }: VizProps) {
  const dotX = useSharedValue(W * 0.25);
  const startD = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startD.value = dotX.value; })
    .onUpdate(e => { dotX.value = clamp(startD.value + e.translationX, 30, W - 30); });

  const dotProps = useAnimatedProps(() => ({ cx: dotX.value }));

  const holeX = W * 0.6;
  const cy = H * 0.45;
  const pts: string[] = [];
  for (let px = 20; px <= W - 20; px += 2) {
    if (Math.abs(px - holeX) < 4) continue;
    const t = (px - 20) / (W - 40);
    const y = cy - 30 * Math.sin(t * 3);
    pts.push(`${pts.length === 0 ? 'M' : 'L'}${px},${y}`);
  }

  // f value at hole
  const holeY = cy - 30 * Math.sin(((holeX - 20) / (W - 40)) * 3);

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">lim f(x) as x → a</SvgText>
          <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <Path d={pts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          {/* Hole */}
          <Circle cx={holeX} cy={holeY} r={5} fill={colors.bg} stroke={accent} strokeWidth={2} />
          {/* Moving dot on curve */}
          <AnimatedCircle animatedProps={dotProps} cy={cy - 10} r={6} fill={accent} />
          <SvgText x={holeX} y={holeY + 20} fill={colors.text3} fontSize={10} textAnchor="middle">hole</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag toward the hole</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 7. Law of Sines: tap to cycle ratios ────────────────────────────────────
export function LawOfSinesTriViz({ accent }: VizProps) {
  const [idx, setIdx] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setIdx)((idx + 1) % 3));

  const A: [number, number] = [W * 0.15, H * 0.75];
  const B: [number, number] = [W * 0.85, H * 0.75];
  const C: [number, number] = [W * 0.45, H * 0.15];

  const sides = [
    { label: 'a / sin A', from: B, to: C, angle: A },
    { label: 'b / sin B', from: A, to: C, angle: B },
    { label: 'c / sin C', from: A, to: B, angle: C },
  ];
  const s = sides[idx];

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Law of Sines: {s.label}</SvgText>
          <Path d={`M${A[0]},${A[1]} L${B[0]},${B[1]} L${C[0]},${C[1]} Z`} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          {/* Highlighted side */}
          <Line x1={s.from[0]} y1={s.from[1]} x2={s.to[0]} y2={s.to[1]} stroke={accent} strokeWidth={3} />
          {/* Highlighted angle */}
          <Circle cx={s.angle[0]} cy={s.angle[1]} r={12} fill={accent + '33'} stroke={accent} strokeWidth={1.5} />
          <SvgText x={A[0]} y={A[1] + 16} fill={colors.text3} fontSize={10} textAnchor="middle">A</SvgText>
          <SvgText x={B[0]} y={B[1] + 16} fill={colors.text3} fontSize={10} textAnchor="middle">B</SvgText>
          <SvgText x={C[0]} y={C[1] - 8} fill={colors.text3} fontSize={10} textAnchor="middle">C</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to cycle ratios</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 8. Law of Cosines: drag side c ──────────────────────────────────────────
export function LawOfCosinesTriViz({ accent }: VizProps) {
  const cLen = useSharedValue(W * 0.5);
  const startC = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startC.value = cLen.value; })
    .onUpdate(e => { cLen.value = clamp(startC.value + e.translationX, W * 0.2, W * 0.8); });

  const cBarProps = useAnimatedProps(() => ({ width: cLen.value }));

  const a = 5;
  const b = 7;

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">c² = a² + b² − 2ab·cos C</SvgText>
          <SvgText x={W / 2} y={34} fill={colors.text2} fontSize={11} textAnchor="middle">a = {a}, b = {b}</SvgText>
          {/* Triangle */}
          <Path d={`M${W * 0.2},${H * 0.7} L${W * 0.5},${H * 0.25} L${W * 0.8},${H * 0.7} Z`} stroke={colors.text2} strokeWidth={1.5} fill="none" />
          {/* Side c (bottom) highlighted */}
          <Line x1={W * 0.2} y1={H * 0.7} x2={W * 0.8} y2={H * 0.7} stroke={accent} strokeWidth={3} />
          <SvgText x={W * 0.5} y={H * 0.7 + 18} fill={accent} fontSize={12} fontWeight="bold" textAnchor="middle">c</SvgText>
          {/* Slider bar for c */}
          <Rect x={30} y={H - 20} width={W - 60} height={4} rx={2} fill={colors.surface2} />
          <AnimatedRect animatedProps={cBarProps} x={30} y={H - 22} height={8} rx={4} fill={accent + '44'} />
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag to change c</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 9. Polar Graph: tap to cycle polar points ───────────────────────────────
export function PolarGraphViz({ accent }: VizProps) {
  const [idx, setIdx] = useState(0);
  const pts = [
    { r: 2, theta: 45, label: '(2, 45°)' },
    { r: 3, theta: 120, label: '(3, 120°)' },
    { r: 1.5, theta: 210, label: '(1.5, 210°)' },
    { r: 2.5, theta: 315, label: '(2.5, 315°)' },
  ];
  const p = pts[idx];
  const cx = W * 0.4;
  const cy = H / 2;
  const s = 25;
  const rad = (p.theta * Math.PI) / 180;
  const px = cx + p.r * s * Math.cos(rad);
  const py = cy - p.r * s * Math.sin(rad);

  const tap = Gesture.Tap().onEnd(() => runOnJS(setIdx)((idx + 1) % pts.length));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W * 0.78} y={30} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">{p.label}</SvgText>
          {/* Concentric circles */}
          {[1, 2, 3].map(r => (
            <Circle key={r} cx={cx} cy={cy} r={r * s} stroke={colors.border} strokeWidth={1} fill="none" />
          ))}
          {/* Angle lines */}
          {[0, 45, 90, 135].map(a => {
            const ar = (a * Math.PI) / 180;
            return (
              <Line key={a} x1={cx - 3 * s * Math.cos(ar)} y1={cy + 3 * s * Math.sin(ar)} x2={cx + 3 * s * Math.cos(ar)} y2={cy - 3 * s * Math.sin(ar)} stroke={colors.border} strokeWidth={0.5} />
            );
          })}
          <Line x1={cx} y1={cy} x2={px} y2={py} stroke={accent + '66'} strokeWidth={1.5} />
          <Circle cx={px} cy={py} r={7} fill={accent} />
          <SvgText x={W * 0.78} y={50} fill={colors.text2} fontSize={11} textAnchor="middle">r = {p.r}, θ = {p.theta}°</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">tap to cycle points</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 10. Vector Addition: drag to change angle of B ──────────────────────────
export function VectorAdditionViz({ accent }: VizProps) {
  const bAngle = useSharedValue(60);
  const startB = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startB.value = bAngle.value; })
    .onUpdate(e => { bAngle.value = clamp(startB.value + e.translationX * 0.5, -90, 150); });

  const ox = W * 0.2;
  const oy = H * 0.65;
  const lenA = 80;
  const lenB = 60;

  // Vector A (fixed at 20°)
  const aRad = (20 * Math.PI) / 180;
  const ax = ox + lenA * Math.cos(aRad);
  const ay = oy - lenA * Math.sin(aRad);

  const bLineProps = useAnimatedProps(() => {
    const bRad = (bAngle.value * Math.PI) / 180;
    return { x2: ox + lenB * Math.cos(bRad), y2: oy - lenB * Math.sin(bRad) };
  });

  // Resultant line (simplified — uses default angle)
  const bRad60 = (60 * Math.PI) / 180;
  const bx = ox + lenB * Math.cos(bRad60);
  const by = oy - lenB * Math.sin(bRad60);

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Vector Addition: A + B</SvgText>
          {/* Vector A */}
          <Line x1={ox} y1={oy} x2={ax} y2={ay} stroke={accent} strokeWidth={2.5} />
          <SvgText x={ax + 8} y={ay} fill={accent} fontSize={11}>A</SvgText>
          {/* Vector B */}
          <AnimatedLine animatedProps={bLineProps} x1={ox} y1={oy} stroke={accent + '77'} strokeWidth={2.5} />
          <SvgText x={bx + 8} y={by} fill={accent + '77'} fontSize={11}>B</SvgText>
          {/* Resultant (dashed) — from origin to tip of A+B */}
          <Line x1={ox} y1={oy} x2={ox + lenA * Math.cos(aRad) + lenB * Math.cos(bRad60)} y2={oy - lenA * Math.sin(aRad) - lenB * Math.sin(bRad60)} stroke={colors.text} strokeWidth={1.5} strokeDasharray="6 3" />
          <SvgText x={W * 0.7} y={H * 0.35} fill={colors.text2} fontSize={10}>Resultant</SvgText>
          <Circle cx={ox} cy={oy} r={3} fill={colors.text} />
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag to change B angle</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 11. Parametric Trace: drag t-slider ─────────────────────────────────────
export function ParametricTraceViz({ accent }: VizProps) {
  const tPos = useSharedValue(W * 0.3);
  const startT = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startT.value = tPos.value; })
    .onUpdate(e => { tPos.value = clamp(startT.value + e.translationX, 40, W - 40); });

  const tSliderProps = useAnimatedProps(() => ({ cx: tPos.value }));

  const cx = W / 2;
  const cy = H / 2 - 10;
  const rx = 80;
  const ry = 50;

  // Full ellipse path
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * 2 * Math.PI;
    const x = cx + rx * Math.cos(t);
    const y = cy + ry * Math.sin(t);
    pts.push(`${i === 0 ? 'M' : 'L'}${x},${y}`);
  }

  // Current point at default t
  const t = Math.PI * 0.6;
  const px = cx + rx * Math.cos(t);
  const py = cy + ry * Math.sin(t);

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">x = cos(t), y = sin(t)</SvgText>
          <Path d={pts.join(' ') + ' Z'} stroke={colors.border} strokeWidth={1} fill="none" strokeDasharray="4 3" />
          {/* Traced portion */}
          <Path d={pts.slice(0, 20).join(' ')} stroke={accent} strokeWidth={2.5} fill="none" />
          <Circle cx={px} cy={py} r={6} fill={accent} />
          {/* t slider */}
          <Rect x={40} y={H - 18} width={W - 80} height={4} rx={2} fill={colors.surface2} />
          <AnimatedCircle animatedProps={tSliderProps} cy={H - 16} r={7} fill={accent} />
          <SvgText x={25} y={H - 10} fill={colors.text3} fontSize={10}>t</SvgText>
          <SvgText x={W / 2} y={H - 2} fill={colors.text3} fontSize={11} textAnchor="middle">drag t slider</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}
