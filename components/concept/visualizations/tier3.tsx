import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '../../../constants/theme';
import { W, H, AnimatedCircle, AnimatedLine, AnimatedRect, type VizProps } from './shared';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── 1. Slope Rise-Run: drag two points, see Δy/Δx ─────────────────────────
export function SlopeRiseRunViz({ accent }: VizProps) {
  const x1 = useSharedValue(W * 0.25);
  const y1 = useSharedValue(H * 0.65);
  const x2 = useSharedValue(W * 0.75);
  const y2 = useSharedValue(H * 0.35);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const pan1 = Gesture.Pan()
    .onBegin(() => { startX.value = x1.value; startY.value = y1.value; })
    .onUpdate(e => { x1.value = clamp(startX.value + e.translationX, 20, W - 20); y1.value = clamp(startY.value + e.translationY, 20, H - 20); });

  const pan2 = Gesture.Pan()
    .onBegin(() => { startX.value = x2.value; startY.value = y2.value; })
    .onUpdate(e => { x2.value = clamp(startX.value + e.translationX, 20, W - 20); y2.value = clamp(startY.value + e.translationY, 20, H - 20); });

  const p1Props = useAnimatedProps(() => ({ cx: x1.value, cy: y1.value }));
  const p2Props = useAnimatedProps(() => ({ cx: x2.value, cy: y2.value }));
  const lineProps = useAnimatedProps(() => ({ x1: x1.value, y1: y1.value, x2: x2.value, y2: y2.value }));
  const riseProps = useAnimatedProps(() => ({ x1: x2.value, y1: y1.value, x2: x2.value, y2: y2.value }));
  const runProps = useAnimatedProps(() => ({ x1: x1.value, y1: y1.value, x2: x2.value, y2: y1.value }));

  return (
    <View>
      <GestureDetector gesture={pan1}>
        <View style={{ position: 'absolute', width: W, height: H }}>
          <Svg width={W} height={H}>
            <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
            <Line x1={20} y1={20} x2={20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
            <AnimatedLine animatedProps={runProps} stroke={accent + '88'} strokeWidth={2} strokeDasharray="4 4" />
            <AnimatedLine animatedProps={riseProps} stroke={accent + '88'} strokeWidth={2} strokeDasharray="4 4" />
            <AnimatedLine animatedProps={lineProps} stroke={accent} strokeWidth={2} />
            <AnimatedCircle animatedProps={p1Props} r={8} fill={accent} />
            <AnimatedCircle animatedProps={p2Props} r={8} fill={accent} />
            <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">rise ÷ run = slope</SvgText>
            <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag points to change slope</SvgText>
          </Svg>
        </View>
      </GestureDetector>
    </View>
  );
}

// ── 2. Slope-Intercept Line: sliders for m and b ────────────────────────────
export function SlopeInterceptLineViz({ accent }: VizProps) {
  const mPos = useSharedValue(W * 0.6);
  const bPos = useSharedValue(W * 0.5);
  const startM = useSharedValue(0);
  const startB = useSharedValue(0);

  const panM = Gesture.Pan()
    .onBegin(() => { startM.value = mPos.value; })
    .onUpdate(e => { mPos.value = clamp(startM.value + e.translationX, 40, W - 40); });

  const panB = Gesture.Pan()
    .onBegin(() => { startB.value = bPos.value; })
    .onUpdate(e => { bPos.value = clamp(startB.value + e.translationX, 40, W - 40); });

  const mDotProps = useAnimatedProps(() => ({ cx: mPos.value }));
  const bDotProps = useAnimatedProps(() => ({ cx: bPos.value }));

  const lineProps = useAnimatedProps(() => {
    const m = ((mPos.value - 40) / (W - 80)) * 6 - 3;
    const b = ((bPos.value - 40) / (W - 80)) * 6 - 3;
    const cx = W / 2;
    const cy = H / 2 - 20;
    const scale = 20;
    const lx = 20;
    const rx = W - 20;
    const ly = cy - (((lx - cx) / scale) * m + b) * scale;
    const ry = cy - (((rx - cx) / scale) * m + b) * scale;
    return { x1: lx, y1: ly, x2: rx, y2: ry };
  });

  return (
    <GestureDetector gesture={Gesture.Race(panM, panB)}>
      <View>
        <Svg width={W} height={H}>
          <Line x1={20} y1={H / 2 - 20} x2={W - 20} y2={H / 2 - 20} stroke={colors.border} strokeWidth={1} />
          <Line x1={W / 2} y1={20} x2={W / 2} y2={H - 50} stroke={colors.border} strokeWidth={1} />
          <AnimatedLine animatedProps={lineProps} stroke={accent} strokeWidth={2} />
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = mx + b</SvgText>
          <Rect x={40} y={H - 38} width={W - 80} height={4} rx={2} fill={colors.surface2} />
          <AnimatedCircle animatedProps={mDotProps} cy={H - 36} r={7} fill={accent} />
          <SvgText x={30} y={H - 30} fill={colors.text3} fontSize={10}>m</SvgText>
          <Rect x={40} y={H - 20} width={W - 80} height={4} rx={2} fill={colors.surface2} />
          <AnimatedCircle animatedProps={bDotProps} cy={H - 18} r={7} fill={accent + 'aa'} />
          <SvgText x={30} y={H - 12} fill={colors.text3} fontSize={10}>b</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 3. System Intersection: two lines, see where they cross ─────────────────
export function SystemIntersectionViz({ accent }: VizProps) {
  const [angle, setAngle] = useState(0);
  const slopes = [1, -0.5, 2, -1];
  const m1 = 0.8;
  const m2 = slopes[angle];
  const cx = W / 2;
  const cy = H / 2;
  const s = 22;

  const ix = m1 !== m2 ? 0 : NaN;
  const iy = m1 !== m2 ? m1 * ix : NaN;

  const tap = Gesture.Tap().onEnd(() => runOnJS(setAngle)((angle + 1) % slopes.length));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.border} strokeWidth={1} />
          <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <Line x1={20} y1={cy - m1 * ((20 - cx) / s) * s} x2={W - 20} y2={cy - m1 * ((W - 20 - cx) / s) * s} stroke={accent} strokeWidth={2} />
          <Line x1={20} y1={cy - m2 * ((20 - cx) / s) * s} x2={W - 20} y2={cy - m2 * ((W - 20 - cx) / s) * s} stroke={accent + '77'} strokeWidth={2} strokeDasharray="6 4" />
          {!isNaN(ix) && <Circle cx={cx + ix * s} cy={cy - iy * s} r={6} fill={accent} />}
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
            System: line₁ ∩ line₂
          </SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to change line 2</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 4. Elimination Cancel: tap to cancel terms ─────────────────────────────
export function EliminationCancelViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const steps = [
    { top: '2x + 3y = 7', bot: '2x − 3y = 1', result: '' },
    { top: '2x + 3y = 7', bot: '2x − 3y = 1', result: '4x = 8' },
    { top: '', bot: '', result: 'x = 2' },
  ];
  const s = steps[step];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % steps.length));

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to step through</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 5. Graph Line Draw: plot points on y=2x−1 ──────────────────────────────
export function GraphLineDrawViz({ accent }: VizProps) {
  const [pts, setPts] = useState(0);
  const points = [{ x: 0, y: -1 }, { x: 1, y: 1 }, { x: 2, y: 3 }, { x: -1, y: -3 }];
  const cx = W / 2;
  const cy = H / 2;
  const s = 24;

  const tap = Gesture.Tap().onEnd(() => runOnJS(setPts)(Math.min(pts + 1, points.length)));

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to plot points</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 6. Inequality Shade: drag boundary, tap to toggle side ──────────────────
export function InequalityShadeViz({ accent }: VizProps) {
  const [above, setAbove] = useState(true);
  const bY = useSharedValue(H / 2);
  const startB = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startB.value = bY.value; })
    .onUpdate(e => { bY.value = clamp(startB.value + e.translationY, 30, H - 30); });
  const tap = Gesture.Tap().onEnd(() => runOnJS(setAbove)(!above));

  const lineProps = useAnimatedProps(() => ({ y1: bY.value, y2: bY.value }));
  const shadeProps = useAnimatedProps(() => ({
    y: above ? 20 : bY.value,
    height: above ? Math.max(0, bY.value - 20) : Math.max(0, H - 30 - bY.value),
  }));

  return (
    <GestureDetector gesture={Gesture.Race(pan, tap)}>
      <View>
        <Svg width={W} height={H}>
          <AnimatedRect animatedProps={shadeProps} x={20} width={W - 40} fill={accent + '22'} />
          <AnimatedLine animatedProps={lineProps} x1={20} x2={W - 20} stroke={accent} strokeWidth={2} />
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">
            {above ? 'y < boundary' : 'y > boundary'}
          </SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag line · tap to flip shade</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 7. Absolute Value V: drag vertex of V-shape ────────────────────────────
export function AbsoluteValueVViz({ accent }: VizProps) {
  const vx = useSharedValue(W / 2);
  const vy = useSharedValue(H * 0.55);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startX.value = vx.value; startY.value = vy.value; })
    .onUpdate(e => { vx.value = clamp(startX.value + e.translationX, 40, W - 40); vy.value = clamp(startY.value + e.translationY, 40, H - 20); });

  const pathProps = useAnimatedProps(() => {
    const slope = 1.5;
    const lx = 20;
    const rx = W - 20;
    const ly = vy.value + Math.abs(lx - vx.value) * slope;
    const ry = vy.value + Math.abs(rx - vx.value) * slope;
    return { d: `M${lx},${Math.min(ly, H - 5)} L${vx.value},${vy.value} L${rx},${Math.min(ry, H - 5)}` };
  });

  const AnimatedPath = React.useMemo(() => {
    const AP = require('react-native-reanimated').default.createAnimatedComponent(Path);
    return AP;
  }, []);

  const dotProps = useAnimatedProps(() => ({ cx: vx.value, cy: vy.value }));

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <Line x1={W / 2} y1={10} x2={W / 2} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <AnimatedPath animatedProps={pathProps} stroke={accent} strokeWidth={2} fill="none" />
          <AnimatedCircle animatedProps={dotProps} r={7} fill={accent} />
          <SvgText x={W / 2} y={14} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">y = |x − h| + k</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag vertex</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 8. Exponent Tower: tap to stack powers ──────────────────────────────────
export function ExponentTowerViz({ accent }: VizProps) {
  const [exp, setExp] = useState(1);
  const base = 2;
  const val = Math.pow(base, exp);
  const mult = Array.from({ length: exp }, () => String(base)).join(' × ');
  const maxH = 160;
  const barH = Math.min(maxH, (val / 32) * maxH);

  const tap = Gesture.Tap().onEnd(() => runOnJS(setExp)(exp >= 5 ? 1 : exp + 1));

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to increase exponent</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 9. Multi-Step Balance: solve 3x + 2 = 11 ───────────────────────────────
export function MultiStepBalanceViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  const steps = [
    { eq: '3x + 2 = 11', left: 5, right: 11, note: '' },
    { eq: '3x = 9', left: 3, right: 9, note: '−2 both sides' },
    { eq: 'x = 3', left: 1, right: 3, note: '÷3 both sides' },
  ];
  const s = steps[step];
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % steps.length));

  const fulcrumX = W / 2;
  const beamY = H * 0.45;
  const beamW = W * 0.65;

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to solve step by step</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 10. Sequence Dots: triangular numbers ───────────────────────────────────
export function SequenceDotsViz({ accent }: VizProps) {
  const [rows, setRows] = useState(1);
  const total = (rows * (rows + 1)) / 2;
  const tap = Gesture.Tap().onEnd(() => runOnJS(setRows)(rows >= 6 ? 1 : rows + 1));

  const dotR = 6;
  const gap = 18;
  const baseY = H - 40;

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to add row</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 11. Function Machine: input → rule → output ─────────────────────────────
export function FunctionMachineViz({ accent }: VizProps) {
  const [input, setInput] = useState(0);
  const inputs = [1, 2, 3, 4, 5];
  const rule = (n: number) => n * 2 + 1;
  const x = inputs[input];
  const y = rule(x);

  const tap = Gesture.Tap().onEnd(() => runOnJS(setInput)((input + 1) % inputs.length));

  const machX = W * 0.3;
  const machW = W * 0.4;

  return (
    <GestureDetector gesture={tap}>
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
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to change input</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 12. Domain-Range Box: drag boundaries ───────────────────────────────────
export function DomainRangeBoxViz({ accent }: VizProps) {
  const leftX = useSharedValue(W * 0.25);
  const rightX = useSharedValue(W * 0.75);
  const startL = useSharedValue(0);
  const startR = useSharedValue(0);

  const panL = Gesture.Pan()
    .onBegin(() => { startL.value = leftX.value; })
    .onUpdate(e => { leftX.value = clamp(startL.value + e.translationX, 20, W * 0.7); });

  const panR = Gesture.Pan()
    .onBegin(() => { startR.value = rightX.value; })
    .onUpdate(e => { rightX.value = clamp(startR.value + e.translationX, W * 0.3, W - 20); });

  const boxProps = useAnimatedProps(() => ({
    x: leftX.value,
    width: Math.max(0, rightX.value - leftX.value),
  }));
  const lLineProps = useAnimatedProps(() => ({ x1: leftX.value, x2: leftX.value }));
  const rLineProps = useAnimatedProps(() => ({ x1: rightX.value, x2: rightX.value }));

  // Draw a simple curve
  const curvePts: string[] = [];
  for (let px = 20; px <= W - 20; px += 4) {
    const t = (px - 20) / (W - 40);
    const y = H / 2 - 40 * Math.sin(t * Math.PI);
    curvePts.push(`${px === 20 ? 'M' : 'L'}${px},${y}`);
  }

  return (
    <GestureDetector gesture={Gesture.Race(panL, panR)}>
      <View>
        <Svg width={W} height={H}>
          <Line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <Line x1={20} y1={20} x2={20} y2={H - 20} stroke={colors.border} strokeWidth={1} />
          <AnimatedRect animatedProps={boxProps} y={30} height={H - 60} fill={accent + '15'} />
          <AnimatedLine animatedProps={lLineProps} y1={30} y2={H - 30} stroke={accent} strokeWidth={2} strokeDasharray="6 3" />
          <AnimatedLine animatedProps={rLineProps} y1={30} y2={H - 30} stroke={accent} strokeWidth={2} strokeDasharray="6 3" />
          <Path d={curvePts.join(' ')} stroke={accent} strokeWidth={2} fill="none" />
          <SvgText x={W / 2} y={16} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">Domain & Range</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag boundaries</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}
