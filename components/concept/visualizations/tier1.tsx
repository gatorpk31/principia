import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '../../../constants/theme';
import { W, H, AnimatedCircle, AnimatedLine, AnimatedRect, type VizProps } from './shared';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── 1. Fraction Bar: tap to cycle filled pieces ─────────────────────────────
export function FractionBarViz({ accent }: VizProps) {
  const [filled, setFilled] = useState(1);
  const denom = 4;
  const barW = W - 60;
  const barH = 50;
  const y = H / 2 - barH / 2;

  const tap = Gesture.Tap().onEnd(() => runOnJS(setFilled)((filled % denom) + 1));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={y - 12} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">
            {filled}/{denom}
          </SvgText>
          <Rect x={30} y={y} width={barW} height={barH} rx={8} fill={colors.surface2} />
          {Array.from({ length: denom }, (_, i) => (
            <Rect key={i} x={30 + i * (barW / denom) + 1} y={y + 1} width={barW / denom - 2} height={barH - 2} rx={4} fill={i < filled ? accent + 'cc' : 'transparent'} />
          ))}
          {Array.from({ length: denom - 1 }, (_, i) => (
            <Line key={`d${i}`} x1={30 + (i + 1) * (barW / denom)} y1={y} x2={30 + (i + 1) * (barW / denom)} y2={y + barH} stroke={colors.bg} strokeWidth={2} />
          ))}
          <SvgText x={W / 2} y={y + barH + 22} fill={colors.text3} fontSize={11} textAnchor="middle">tap to change</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 2. Fraction Equivalence: tap to cycle equivalent fractions ───────────────
export function FractionEquivalenceViz({ accent }: VizProps) {
  const [idx, setIdx] = useState(0);
  const equivs = [{ n: 2, d: 4 }, { n: 3, d: 6 }, { n: 4, d: 8 }, { n: 5, d: 10 }];
  const eq = equivs[idx];
  const barW = W - 60;
  const barH = 32;

  const tap = Gesture.Tap().onEnd(() => runOnJS(setIdx)((idx + 1) % equivs.length));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={28} fill={colors.text2} fontSize={12} textAnchor="middle">1/2 = {eq.n}/{eq.d}</SvgText>
          {/* Top bar: 1/2 */}
          <Rect x={30} y={50} width={barW} height={barH} rx={6} fill={colors.surface2} />
          <Rect x={30} y={50} width={barW / 2} height={barH} rx={6} fill={accent + 'aa'} />
          <Line x1={30 + barW / 2} y1={50} x2={30 + barW / 2} y2={50 + barH} stroke={colors.bg} strokeWidth={2} />
          <SvgText x={30 + barW / 4} y={50 + barH / 2 + 5} fill={colors.bg} fontSize={12} fontWeight="bold" textAnchor="middle">1/2</SvgText>
          {/* Bottom bar: equivalent */}
          <Rect x={30} y={100} width={barW} height={barH} rx={6} fill={colors.surface2} />
          {Array.from({ length: eq.d }, (_, i) => (
            <Rect key={i} x={30 + i * (barW / eq.d) + 0.5} y={100.5} width={barW / eq.d - 1} height={barH - 1} rx={3} fill={i < eq.n ? accent + 'aa' : 'transparent'} />
          ))}
          {Array.from({ length: eq.d - 1 }, (_, i) => (
            <Line key={`l${i}`} x1={30 + (i + 1) * (barW / eq.d)} y1={100} x2={30 + (i + 1) * (barW / eq.d)} y2={100 + barH} stroke={colors.bg} strokeWidth={1.5} />
          ))}
          <SvgText x={30 + (eq.n / eq.d) * barW / 2} y={100 + barH / 2 + 5} fill={colors.bg} fontSize={12} fontWeight="bold" textAnchor="middle">{eq.n}/{eq.d}</SvgText>
          <SvgText x={W / 2} y={160} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">same amount!</SvgText>
          <SvgText x={W / 2} y={H - 12} fill={colors.text3} fontSize={11} textAnchor="middle">tap to see more</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 3. Fraction Arithmetic: tap to combine fractions ────────────────────────
export function FractionArithmeticViz({ accent }: VizProps) {
  const [stage, setStage] = useState(0); // 0: separate, 1: combined
  const barW = (W - 80) / 2;
  const barH = 40;
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStage)((stage + 1) % 2));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={28} fill={colors.text2} fontSize={13} textAnchor="middle">1/3 + 1/3 = 2/3</SvgText>
          {stage === 0 ? (
            <>
              {/* Left 1/3 */}
              <Rect x={30} y={70} width={barW} height={barH} rx={6} fill={colors.surface2} />
              {[0, 1, 2].map(i => <Rect key={i} x={30 + i * (barW / 3) + 0.5} y={70.5} width={barW / 3 - 1} height={barH - 1} rx={3} fill={i === 0 ? accent + 'cc' : 'transparent'} />)}
              <SvgText x={30 + barW / 2} y={70 + barH + 18} fill={colors.text3} fontSize={11} textAnchor="middle">1/3</SvgText>
              {/* Plus sign */}
              <SvgText x={W / 2} y={70 + barH / 2 + 5} fill={accent} fontSize={20} textAnchor="middle">+</SvgText>
              {/* Right 1/3 */}
              <Rect x={W / 2 + 10} y={70} width={barW} height={barH} rx={6} fill={colors.surface2} />
              {[0, 1, 2].map(i => <Rect key={i} x={W / 2 + 10 + i * (barW / 3) + 0.5} y={70.5} width={barW / 3 - 1} height={barH - 1} rx={3} fill={i === 0 ? accent + 'cc' : 'transparent'} />)}
              <SvgText x={W / 2 + 10 + barW / 2} y={70 + barH + 18} fill={colors.text3} fontSize={11} textAnchor="middle">1/3</SvgText>
            </>
          ) : (
            <>
              {/* Combined 2/3 */}
              <Rect x={30} y={70} width={W - 60} height={barH} rx={6} fill={colors.surface2} />
              {[0, 1, 2].map(i => <Rect key={i} x={30 + i * ((W - 60) / 3) + 0.5} y={70.5} width={(W - 60) / 3 - 1} height={barH - 1} rx={3} fill={i < 2 ? accent + 'cc' : 'transparent'} />)}
              <SvgText x={W / 2} y={70 + barH + 18} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">= 2/3</SvgText>
            </>
          )}
          <SvgText x={W / 2} y={H - 12} fill={colors.text3} fontSize={11} textAnchor="middle">tap to {stage === 0 ? 'combine' : 'separate'}</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 4. Fraction Multiply: area model grid ───────────────────────────────────
export function FractionMultiplyViz({ accent }: VizProps) {
  const [idx, setIdx] = useState(0);
  const models = [
    { c: 2, r: 3, tc: 3, tr: 4, label: '2/3 × 3/4 = 6/12 = 1/2' },
    { c: 1, r: 2, tc: 2, tr: 3, label: '1/2 × 2/3 = 2/6 = 1/3' },
  ];
  const m = models[idx];
  const gSize = Math.min((W - 60) / m.tc, (H - 70) / m.tr);
  const ox = (W - m.tc * gSize) / 2;
  const oy = 40;

  const tap = Gesture.Tap().onEnd(() => runOnJS(setIdx)((idx + 1) % models.length));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={24} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">{m.label}</SvgText>
          {Array.from({ length: m.tr }, (_, r) =>
            Array.from({ length: m.tc }, (_, c) => (
              <Rect key={`${r}-${c}`} x={ox + c * gSize + 1} y={oy + r * gSize + 1} width={gSize - 2} height={gSize - 2} rx={3} fill={c < m.c && r < m.r ? accent + 'aa' : colors.surface2} stroke={colors.border} strokeWidth={1} />
            ))
          )}
          <SvgText x={W / 2} y={H - 12} fill={colors.text3} fontSize={11} textAnchor="middle">tap to switch</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 5. Ratio Tape: drag divider to change ratio ─────────────────────────────
export function RatioTapeViz({ accent }: VizProps) {
  const dividerX = useSharedValue(W * 0.4);
  const startX = useSharedValue(0);
  const barY = H / 2 - 25;
  const barH = 50;

  const pan = Gesture.Pan()
    .onBegin(() => { startX.value = dividerX.value; })
    .onUpdate(e => { dividerX.value = clamp(startX.value + e.translationX, 60, W - 60); });

  const leftProps = useAnimatedProps(() => ({ width: dividerX.value - 30 }));
  const rightProps = useAnimatedProps(() => ({ x: dividerX.value, width: W - 30 - dividerX.value }));
  const divProps = useAnimatedProps(() => ({ x1: dividerX.value, x2: dividerX.value }));

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={barY - 16} fill={colors.text2} fontSize={13} textAnchor="middle">drag divider to change ratio</SvgText>
          <AnimatedRect x={30} y={barY} height={barH} rx={8} fill={accent + 'aa'} animatedProps={leftProps} />
          <AnimatedRect y={barY} height={barH} rx={8} fill={accent + '44'} animatedProps={rightProps} />
          <AnimatedLine y1={barY - 5} y2={barY + barH + 5} stroke={colors.text2} strokeWidth={3} animatedProps={divProps} />
          <SvgText x={W / 2} y={barY + barH + 24} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">ratio</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 6. Percent Fill: tap to fill 10% at a time ──────────────────────────────
export function PercentFillViz({ accent }: VizProps) {
  const [filled, setFilled] = useState(0);
  const gridSize = Math.min((W - 40) / 10, (H - 50) / 10);
  const ox = (W - 10 * gridSize) / 2;
  const oy = 30;

  const tap = Gesture.Tap().onEnd(() => runOnJS(setFilled)((filled + 10) % 110));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={20} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">{filled}%</SvgText>
          {Array.from({ length: 100 }, (_, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;
            return (
              <Rect key={i} x={ox + col * gridSize + 0.5} y={oy + row * gridSize + 0.5} width={gridSize - 1} height={gridSize - 1} rx={2} fill={i < filled ? accent + 'bb' : colors.surface2} stroke={colors.border} strokeWidth={0.5} />
            );
          })}
          <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={10} textAnchor="middle">tap to fill</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 7. Negative Number Line: drag dot across zero ───────────────────────────
export function NegativeNumberLineViz({ accent }: VizProps) {
  const dotX = useSharedValue(W / 2);
  const startX = useSharedValue(0);
  const cy = H / 2;
  const left = 30;
  const right = W - 30;

  const pan = Gesture.Pan()
    .onBegin(() => { startX.value = dotX.value; })
    .onUpdate(e => { dotX.value = clamp(startX.value + e.translationX, left, right); });

  const dotProps = useAnimatedProps(() => {
    const val = ((dotX.value - left) / (right - left)) * 10 - 5;
    return { cx: dotX.value, fill: val < 0 ? '#5ba8d4' : accent };
  });

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={cy - 40} fill={colors.text2} fontSize={12} textAnchor="middle">drag the dot</SvgText>
          <Line x1={left} y1={cy} x2={right} y2={cy} stroke={colors.border2} strokeWidth={2} />
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(n => {
            const x = left + ((n + 5) / 10) * (right - left);
            return (
              <G key={n}>
                <Line x1={x} y1={cy - 8} x2={x} y2={cy + 8} stroke={n === 0 ? accent : colors.text3} strokeWidth={n === 0 ? 2 : 1} />
                <SvgText x={x} y={cy + 24} fill={colors.text2} fontSize={11} textAnchor="middle">{n}</SvgText>
              </G>
            );
          })}
          <AnimatedCircle cy={cy} r={12} animatedProps={dotProps} />
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 8. PEMDAS Builder: tap to evaluate in order ─────────────────────────────
export function PemdasBuilderViz({ accent }: VizProps) {
  const [stage, setStage] = useState(0);
  const tap = Gesture.Tap().onEnd(() => runOnJS(setStage)((stage + 1) % 3));

  const labels = [
    { parts: ['2', '+', '3', '×', '4'], note: '3 × 4 first!' },
    { parts: ['2', '+', '12', '', ''], note: 'now add' },
    { parts: ['14', '', '', '', ''], note: '= 14' },
  ];
  const s = labels[stage];
  const cx = W / 2;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={cx} y={30} fill={colors.text2} fontSize={12} textAnchor="middle">2 + 3 × 4</SvgText>
          {s.parts.filter(Boolean).map((p, i) => {
            const x = cx + (i - (s.parts.filter(Boolean).length - 1) / 2) * 50;
            const isOp = p === '+' || p === '×';
            return (
              <G key={i}>
                {!isOp && <Circle cx={x} cy={H / 2} r={24} fill={stage > 0 && i === 0 ? accent + '33' : colors.surface2} stroke={accent} strokeWidth={1.5} />}
                <SvgText x={x} y={H / 2 + 6} fill={isOp ? colors.text3 : accent} fontSize={isOp ? 18 : 20} fontWeight="bold" textAnchor="middle">{p}</SvgText>
              </G>
            );
          })}
          <SvgText x={cx} y={H / 2 + 50} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">{s.note}</SvgText>
          <SvgText x={cx} y={H - 12} fill={colors.text3} fontSize={11} textAnchor="middle">tap to evaluate</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 9. Fraction Ordering: tap to sort ───────────────────────────────────────
export function FractionOrderingViz({ accent }: VizProps) {
  const [sorted, setSorted] = useState(false);
  const fracs = sorted
    ? [{ n: 1, d: 4 }, { n: 1, d: 2 }, { n: 2, d: 3 }, { n: 3, d: 4 }]
    : [{ n: 2, d: 3 }, { n: 1, d: 4 }, { n: 3, d: 4 }, { n: 1, d: 2 }];
  const barW = W - 60;
  const tap = Gesture.Tap().onEnd(() => runOnJS(setSorted)(!sorted));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={22} fill={colors.text2} fontSize={12} textAnchor="middle">{sorted ? 'sorted! ✓' : 'tap to sort smallest → largest'}</SvgText>
          {fracs.map((f, i) => {
            const y = 36 + i * 42;
            const fillW = (f.n / f.d) * barW;
            return (
              <G key={i}>
                <Rect x={30} y={y} width={barW} height={30} rx={6} fill={colors.surface2} />
                <Rect x={30} y={y} width={fillW} height={30} rx={6} fill={accent + (sorted ? 'cc' : '77')} />
                <SvgText x={35 + fillW + 6} y={y + 20} fill={colors.text2} fontSize={12}>{f.n}/{f.d}</SvgText>
              </G>
            );
          })}
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 10. Mixed Numbers: tap to toggle view ───────────────────────────────────
export function MixedNumbersViz({ accent }: VizProps) {
  const [improper, setImproper] = useState(false);
  const barW = (W - 70) / 2;
  const barH = 40;
  const tap = Gesture.Tap().onEnd(() => runOnJS(setImproper)(!improper));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={28} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">{improper ? '5/3' : '1⅔'}</SvgText>
          {improper ? (
            // Show 5 equal thirds
            <G>
              <Rect x={30} y={70} width={W - 60} height={barH} rx={6} fill={colors.surface2} />
              {Array.from({ length: 5 }, (_, i) => (
                <Rect key={i} x={30 + i * ((W - 60) / 5) + 0.5} y={70.5} width={(W - 60) / 5 - 1} height={barH - 1} rx={3} fill={accent + 'bb'} />
              ))}
              <SvgText x={W / 2} y={70 + barH + 18} fill={colors.text3} fontSize={12} textAnchor="middle">5 thirds total</SvgText>
            </G>
          ) : (
            // Show 1 whole + 2/3
            <G>
              <Rect x={30} y={70} width={barW} height={barH} rx={6} fill={accent + 'cc'} />
              <SvgText x={30 + barW / 2} y={70 + barH / 2 + 5} fill={colors.bg} fontSize={14} fontWeight="bold" textAnchor="middle">1</SvgText>
              <Rect x={40 + barW} y={70} width={barW} height={barH} rx={6} fill={colors.surface2} />
              {[0, 1, 2].map(i => (
                <Rect key={i} x={40 + barW + i * (barW / 3) + 0.5} y={70.5} width={barW / 3 - 1} height={barH - 1} rx={3} fill={i < 2 ? accent + '88' : 'transparent'} />
              ))}
              <SvgText x={W / 2} y={70 + barH + 18} fill={colors.text3} fontSize={12} textAnchor="middle">1 whole + 2/3</SvgText>
            </G>
          )}
          <SvgText x={W / 2} y={H - 12} fill={colors.text3} fontSize={11} textAnchor="middle">tap to toggle</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 11. Decimal Slider: drag to see decimal/fraction ────────────────────────
export function DecimalSliderViz({ accent }: VizProps) {
  const dotX = useSharedValue(W / 2);
  const startX = useSharedValue(0);
  const left = 40;
  const right = W - 40;
  const cy = H / 2 - 10;

  const pan = Gesture.Pan()
    .onBegin(() => { startX.value = dotX.value; })
    .onUpdate(e => {
      const raw = clamp(startX.value + e.translationX, left, right);
      // Snap to 0.1 increments
      const step = (right - left) / 10;
      dotX.value = left + Math.round((raw - left) / step) * step;
    });

  const dotProps = useAnimatedProps(() => ({ cx: dotX.value }));

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={cy - 40} fill={colors.text2} fontSize={12} textAnchor="middle">drag to see decimal = fraction</SvgText>
          <Line x1={left} y1={cy} x2={right} y2={cy} stroke={colors.border2} strokeWidth={2} />
          {Array.from({ length: 11 }, (_, i) => {
            const x = left + (i / 10) * (right - left);
            return (
              <G key={i}>
                <Line x1={x} y1={cy - 6} x2={x} y2={cy + 6} stroke={colors.text3} strokeWidth={1.5} />
                <SvgText x={x} y={cy + 22} fill={colors.text3} fontSize={10} textAnchor="middle">{(i / 10).toFixed(1)}</SvgText>
              </G>
            );
          })}
          <AnimatedCircle cy={cy} r={12} fill={accent} animatedProps={dotProps} />
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 12. Factor Tree: tap to split ───────────────────────────────────────────
export function FactorTreeViz({ accent }: VizProps) {
  const [stage, setStage] = useState(0);
  const tap = Gesture.Tap().onEnd(() => { if (stage < 2) runOnJS(setStage)(stage + 1); else runOnJS(setStage)(0); });
  const cx = W / 2;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          {/* Root: 36 */}
          <Circle cx={cx} cy={35} r={22} fill={colors.surface2} stroke={accent} strokeWidth={2} />
          <SvgText x={cx} y={41} fill={accent} fontSize={16} fontWeight="bold" textAnchor="middle">36</SvgText>

          {stage >= 1 && (
            <>
              <Line x1={cx} y1={57} x2={cx - 60} y2={85} stroke={colors.text3} strokeWidth={1.5} />
              <Line x1={cx} y1={57} x2={cx + 60} y2={85} stroke={colors.text3} strokeWidth={1.5} />
              <Circle cx={cx - 60} cy={95} r={18} fill={colors.surface2} stroke={accent} strokeWidth={1.5} />
              <SvgText x={cx - 60} y={100} fill={accent} fontSize={14} textAnchor="middle">6</SvgText>
              <Circle cx={cx + 60} cy={95} r={18} fill={colors.surface2} stroke={accent} strokeWidth={1.5} />
              <SvgText x={cx + 60} y={100} fill={accent} fontSize={14} textAnchor="middle">6</SvgText>
              <SvgText x={cx} y={100} fill={colors.text3} fontSize={14} textAnchor="middle">×</SvgText>
            </>
          )}

          {stage >= 2 && (
            <>
              {[[-60, -90, -30], [60, 30, 90]].map(([parent, lx, rx]) => (
                <G key={parent}>
                  <Line x1={cx + parent} y1={113} x2={cx + lx} y2={145} stroke={colors.text3} strokeWidth={1.5} />
                  <Line x1={cx + parent} y1={113} x2={cx + rx} y2={145} stroke={colors.text3} strokeWidth={1.5} />
                  <Circle cx={cx + lx} cy={155} r={16} fill={accent + '33'} stroke={accent} strokeWidth={2} />
                  <SvgText x={cx + lx} y={160} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">2</SvgText>
                  <Circle cx={cx + rx} cy={155} r={16} fill={accent + '33'} stroke={accent} strokeWidth={2} />
                  <SvgText x={cx + rx} y={160} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">3</SvgText>
                </G>
              ))}
              <SvgText x={cx} y={H - 10} fill={colors.text2} fontSize={12} textAnchor="middle">36 = 2 × 3 × 2 × 3 = 2² × 3²</SvgText>
            </>
          )}

          {stage < 2 && <SvgText x={cx} y={H - 12} fill={colors.text3} fontSize={11} textAnchor="middle">tap to split</SvgText>}
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 13. Venn GCF/LCM: tap to cycle highlights ──────────────────────────────
export function VennGcfLcmViz({ accent }: VizProps) {
  const [mode, setMode] = useState(0); // 0: both, 1: factors of 12, 2: factors of 18
  const tap = Gesture.Tap().onEnd(() => runOnJS(setMode)((mode + 1) % 3));
  const cx = W / 2;
  const r = 65;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={cx} y={22} fill={colors.text2} fontSize={12} textAnchor="middle">
            {mode === 0 ? 'GCF = 6 · LCM = 36' : mode === 1 ? 'Factors of 12' : 'Factors of 18'}
          </SvgText>
          {/* Left circle: 12 */}
          <Circle cx={cx - 35} cy={H / 2 + 5} r={r} fill={mode !== 2 ? accent + '22' : 'transparent'} stroke={accent} strokeWidth={2} />
          <SvgText x={cx - 80} y={H / 2 - 20} fill={accent} fontSize={11} textAnchor="middle">12</SvgText>
          <SvgText x={cx - 80} y={H / 2} fill={colors.text2} fontSize={10} textAnchor="middle">4</SvgText>
          {/* Right circle: 18 */}
          <Circle cx={cx + 35} cy={H / 2 + 5} r={r} fill={mode !== 1 ? accent + '22' : 'transparent'} stroke={accent} strokeWidth={2} />
          <SvgText x={cx + 80} y={H / 2 - 20} fill={accent} fontSize={11} textAnchor="middle">18</SvgText>
          <SvgText x={cx + 80} y={H / 2} fill={colors.text2} fontSize={10} textAnchor="middle">9</SvgText>
          {/* Overlap: GCF */}
          <SvgText x={cx} y={H / 2 - 10} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">6</SvgText>
          <SvgText x={cx} y={H / 2 + 8} fill={colors.text3} fontSize={10} textAnchor="middle">(GCF)</SvgText>
          <SvgText x={cx} y={H - 10} fill={colors.text3} fontSize={11} textAnchor="middle">tap to highlight</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}
