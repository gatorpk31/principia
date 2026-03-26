import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Circle,
  Line,
  Rect,
  Text as SvgText,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import type { VisualizationType } from '../../types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const W = Dimensions.get('window').width - 40;
const H = 220;

interface ConceptVisualizationProps {
  type: VisualizationType;
  accentColor: string;
  label: string;
  tierId: number;
}

// ── Number Line ──────────────────────────────────────────────────────────────
function NumberLineViz({ accent }: { accent: string }) {
  const dotX = useSharedValue(W / 2);

  useEffect(() => {
    dotX.value = withRepeat(
      withTiming(W * 0.75, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const animProps = useAnimatedProps(() => ({ cx: dotX.value }));

  return (
    <Svg width={W} height={H}>
      {/* Axis */}
      <Line x1={20} y1={H / 2} x2={W - 20} y2={H / 2} stroke={colors.border2} strokeWidth={2} />
      {/* Tick marks */}
      {[-3, -2, -1, 0, 1, 2, 3].map((n) => {
        const x = W / 2 + n * (W / 8);
        return (
          <G key={n}>
            <Line x1={x} y1={H / 2 - 8} x2={x} y2={H / 2 + 8} stroke={colors.text3} strokeWidth={1.5} />
            <SvgText x={x} y={H / 2 + 24} fill={colors.text2} fontSize={12} textAnchor="middle">{n}</SvgText>
          </G>
        );
      })}
      {/* Animated dot */}
      <AnimatedCircle animatedProps={animProps} cy={H / 2} r={10} fill={accent} opacity={0.9} />
    </Svg>
  );
}

// ── Fraction Bar ─────────────────────────────────────────────────────────────
function FractionBarViz({ accent }: { accent: string }) {
  const fill = useSharedValue(0.5);

  useEffect(() => {
    fill.value = withRepeat(
      withTiming(0.75, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, []);

  const barW = W - 60;
  const barH = 48;
  const barY = H / 2 - barH / 2;

  return (
    <Svg width={W} height={H}>
      {/* Track */}
      <Rect x={30} y={barY} width={barW} height={barH} rx={8} fill={colors.surface2} />
      {/* Filled portion — static approximation for SVG */}
      <Rect x={30} y={barY} width={barW * 0.75} height={barH} rx={8} fill={accent + 'cc'} />
      {/* Dividers */}
      {[1, 2, 3].map((i) => (
        <Line key={i} x1={30 + barW * (i / 4)} y1={barY} x2={30 + barW * (i / 4)} y2={barY + barH} stroke={colors.bg} strokeWidth={2} />
      ))}
      <SvgText x={W / 2} y={barY - 12} fill={colors.text2} fontSize={12} textAnchor="middle">3 out of 4 — ¾</SvgText>
      <SvgText x={30 + barW * 0.375} y={barY + barH / 2 + 5} fill={colors.bg} fontSize={14} fontWeight="bold" textAnchor="middle">¾ filled</SvgText>
    </Svg>
  );
}

// ── Coordinate Plane ─────────────────────────────────────────────────────────
function CoordinatePlaneViz({ accent }: { accent: string }) {
  const cx = W / 2;
  const cy = H / 2;
  const scale = 32;

  // Animate a dot tracing along y = x
  const progress = useSharedValue(-2);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(2, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const dotProps = useAnimatedProps(() => ({
    cx: cx + progress.value * scale,
    cy: cy - progress.value * scale,
  }));

  return (
    <Svg width={W} height={H}>
      {/* Grid */}
      {[-3, -2, -1, 1, 2, 3].map((n) => (
        <G key={n}>
          <Line x1={cx + n * scale} y1={20} x2={cx + n * scale} y2={H - 20} stroke={colors.border} strokeWidth={0.8} />
          <Line x1={20} y1={cy + n * scale} x2={W - 20} y2={cy + n * scale} stroke={colors.border} strokeWidth={0.8} />
        </G>
      ))}
      {/* Axes */}
      <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.text3} strokeWidth={1.5} />
      <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.text3} strokeWidth={1.5} />
      {/* Axis labels */}
      <SvgText x={W - 15} y={cy + 5} fill={colors.text3} fontSize={12}>x</SvgText>
      <SvgText x={cx + 5} y={25} fill={colors.text3} fontSize={12}>y</SvgText>
      {/* Line y = x */}
      <Line x1={20} y1={H - 20} x2={W - 20} y2={20} stroke={accent} strokeWidth={2} opacity={0.8} />
      {/* Static points */}
      {[[-2, -2], [0, 0], [2, 2]].map(([x, y]) => (
        <Circle key={`${x}${y}`} cx={cx + x * scale} cy={cy - y * scale} r={5} fill={accent} />
      ))}
      {/* Animated tracer dot */}
      <AnimatedCircle animatedProps={dotProps} r={8} fill={accent} opacity={0.7} />
    </Svg>
  );
}

// ── Triangle ─────────────────────────────────────────────────────────────────
function TriangleViz({ accent }: { accent: string }) {
  const ax = 60, ay = H - 40;
  const bx = W - 60, by = H - 40;
  const cx2 = W / 2, cy2 = 40;

  // Animate hypotenuse stroke width pulsing
  const pulse = useSharedValue(2.5);
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(4.5, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const hypProps = useAnimatedProps(() => ({
    strokeWidth: pulse.value,
    opacity: interpolate(pulse.value, [2.5, 4.5], [0.6, 1]),
  }));

  return (
    <Svg width={W} height={H}>
      {/* Triangle fill */}
      <Path
        d={`M${ax},${ay} L${bx},${by} L${cx2},${cy2} Z`}
        fill={accent + '15'}
        stroke={accent}
        strokeWidth={2.5}
      />
      {/* Animated hypotenuse highlight */}
      <AnimatedLine
        x1={bx} y1={by} x2={cx2} y2={cy2}
        stroke={accent}
        animatedProps={hypProps}
      />
      {/* Right angle box */}
      <Rect x={ax} y={ay - 16} width={16} height={16} fill="none" stroke={colors.text3} strokeWidth={1.5} />
      {/* Labels */}
      <SvgText x={(ax + bx) / 2} y={ay + 20} fill={colors.text2} fontSize={13} textAnchor="middle">a</SvgText>
      <SvgText x={(ax + cx2) / 2 - 16} y={(ay + cy2) / 2} fill={colors.text2} fontSize={13} textAnchor="middle">b</SvgText>
      <SvgText x={(bx + cx2) / 2 + 16} y={(by + cy2) / 2} fill={accent} fontSize={13} textAnchor="middle">c</SvgText>
      <SvgText x={W / 2} y={H / 2 + 10} fill={accent} fontSize={15} textAnchor="middle" fontWeight="bold">a² + b² = c²</SvgText>
    </Svg>
  );
}

// ── Circle ───────────────────────────────────────────────────────────────────
function CircleViz({ accent }: { accent: string }) {
  const r = 70;
  const cx = W / 2;
  const cy = H / 2;

  // Animate the radius rotating around the center
  const angle = useSharedValue(0);
  useEffect(() => {
    angle.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 6000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const radiusEndProps = useAnimatedProps(() => ({
    x2: cx + r * Math.cos(angle.value),
    y2: cy - r * Math.sin(angle.value),
  }));

  const tipProps = useAnimatedProps(() => ({
    cx: cx + r * Math.cos(angle.value),
    cy: cy - r * Math.sin(angle.value),
  }));

  return (
    <Svg width={W} height={H}>
      <Circle cx={cx} cy={cy} r={r} fill={accent + '15'} stroke={accent} strokeWidth={2} />
      {/* Animated radius */}
      <AnimatedLine x1={cx} y1={cy} stroke={colors.blue} strokeWidth={2} strokeDasharray="4 3" animatedProps={radiusEndProps} />
      {/* Animated tip dot */}
      <AnimatedCircle r={5} fill={colors.blue} animatedProps={tipProps} />
      {/* Center dot */}
      <Circle cx={cx} cy={cy} r={4} fill={accent} />
      {/* Labels */}
      <SvgText x={cx} y={cy + r + 20} fill={colors.text2} fontSize={12} textAnchor="middle">
        Area = πr²  |  C = 2πr
      </SvgText>
    </Svg>
  );
}

// ── Parabola ─────────────────────────────────────────────────────────────────
function ParabolaViz({ accent }: { accent: string }) {
  const cx = W / 2;
  const cy = H / 2 + 20;
  const scale = 12;
  const points: string[] = [];
  for (let x = -5; x <= 5; x += 0.2) {
    const px = cx + x * scale * 2;
    const py = cy - x * x * scale * 0.5;
    points.push(`${px},${py}`);
  }
  const d = 'M' + points.join(' L');

  // Animate a dot tracing along the parabola
  const xVal = useSharedValue(-3);
  useEffect(() => {
    xVal.value = withRepeat(
      withTiming(3, { duration: 3500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const tracerProps = useAnimatedProps(() => ({
    cx: cx + xVal.value * scale * 2,
    cy: cy - xVal.value * xVal.value * scale * 0.5,
  }));

  return (
    <Svg width={W} height={H}>
      {/* Axes */}
      <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.text3} strokeWidth={1} />
      <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.text3} strokeWidth={1} />
      {/* Parabola */}
      <Path d={d} fill="none" stroke={accent} strokeWidth={2.5} />
      {/* Vertex */}
      <Circle cx={cx} cy={cy} r={5} fill={accent} />
      <SvgText x={cx + 8} y={cy - 8} fill={accent} fontSize={12}>vertex</SvgText>
      {/* Animated tracer */}
      <AnimatedCircle animatedProps={tracerProps} r={7} fill={accent} opacity={0.8} />
      <SvgText x={cx} y={H - 10} fill={colors.text2} fontSize={12} textAnchor="middle">y = x²</SvgText>
    </Svg>
  );
}

// ── Unit Circle ───────────────────────────────────────────────────────────────
function UnitCircleViz({ accent }: { accent: string }) {
  const cx = W / 2;
  const cy = H / 2;
  const r = 80;

  // Animate angle sweeping from 0 to 90 degrees
  const theta = useSharedValue(0.1);
  useEffect(() => {
    theta.value = withRepeat(
      withTiming(Math.PI / 2, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const radiusProps = useAnimatedProps(() => ({
    x2: cx + r * Math.cos(theta.value),
    y2: cy - r * Math.sin(theta.value),
  }));

  const pointProps = useAnimatedProps(() => ({
    cx: cx + r * Math.cos(theta.value),
    cy: cy - r * Math.sin(theta.value),
  }));

  // sin line (vertical): from point to x-axis
  const sinLineProps = useAnimatedProps(() => ({
    x1: cx + r * Math.cos(theta.value),
    y1: cy - r * Math.sin(theta.value),
    x2: cx + r * Math.cos(theta.value),
    y2: cy,
  }));

  // cos line (horizontal): from center to point's x
  const cosLineProps = useAnimatedProps(() => ({
    x2: cx + r * Math.cos(theta.value),
  }));

  return (
    <Svg width={W} height={H}>
      {/* Axes */}
      <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.text3} strokeWidth={1} />
      <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.text3} strokeWidth={1} />
      {/* Unit circle */}
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.border2} strokeWidth={1.5} />
      {/* Animated radius to point */}
      <AnimatedLine x1={cx} y1={cy} stroke={accent} strokeWidth={2} animatedProps={radiusProps} />
      {/* Animated sin (vertical) */}
      <AnimatedLine stroke={colors.blue} strokeWidth={1.5} strokeDasharray="4 3" animatedProps={sinLineProps} />
      {/* Animated cos (horizontal) */}
      <AnimatedLine x1={cx} y1={cy} y2={cy} stroke={colors.green} strokeWidth={1.5} strokeDasharray="4 3" animatedProps={cosLineProps} />
      {/* Animated point */}
      <AnimatedCircle r={5} fill={accent} animatedProps={pointProps} />
      {/* Labels */}
      <SvgText x={W - 40} y={cy - 50} fill={colors.blue} fontSize={11}>sin θ</SvgText>
      <SvgText x={cx + 30} y={cy + 16} fill={colors.green} fontSize={11}>cos θ</SvgText>
    </Svg>
  );
}

// ── Secant/Tangent (Derivative) ───────────────────────────────────────────────
function SecantTangentViz({ accent }: { accent: string }) {
  const cx = W / 2;
  const cy = H / 2 + 30;
  const scale = 28;

  // f(x) = x²/2
  const fPoints: string[] = [];
  for (let x = -3; x <= 3; x += 0.15) {
    fPoints.push(`${cx + x * scale},${cy - (x * x * 0.5) * scale}`);
  }
  const curve = 'M' + fPoints.join(' L');

  // Animate the tangent point sliding along the curve
  const tX = useSharedValue(-1);
  useEffect(() => {
    tX.value = withRepeat(
      withTiming(2, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  // Touch point on curve: f(x) = x²/2, f'(x) = x (slope)
  const touchProps = useAnimatedProps(() => ({
    cx: cx + tX.value * scale,
    cy: cy - (tX.value * tX.value * 0.5) * scale,
  }));

  // Tangent line endpoints: y - f(a) = f'(a)(x - a)
  const tangentProps = useAnimatedProps(() => {
    const a = tX.value;
    const fa = a * a * 0.5;
    const slope = a; // f'(x) = x
    // Two points on tangent: at x = a-1.5 and x = a+1.5
    const x1 = a - 1.5;
    const x2 = a + 1.5;
    return {
      x1: cx + x1 * scale,
      y1: cy - (fa + slope * (x1 - a)) * scale,
      x2: cx + x2 * scale,
      y2: cy - (fa + slope * (x2 - a)) * scale,
    };
  });

  return (
    <Svg width={W} height={H}>
      <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.text3} strokeWidth={1} />
      <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.text3} strokeWidth={1} />
      <Path d={curve} fill="none" stroke={accent} strokeWidth={2.5} />
      {/* Animated tangent line */}
      <AnimatedLine stroke={colors.rose} strokeWidth={2} strokeDasharray="5 3" animatedProps={tangentProps} />
      {/* Animated touch point */}
      <AnimatedCircle r={5} fill={accent} animatedProps={touchProps} />
      <SvgText x={W - 30} y={30} fill={colors.rose} fontSize={11}>f'(x)</SvgText>
      <SvgText x={cx} y={H - 10} fill={colors.text2} fontSize={11} textAnchor="middle">tangent = instantaneous rate of change</SvgText>
    </Svg>
  );
}

// ── Riemann Sum ───────────────────────────────────────────────────────────────
function RiemannBar({ index, ox, oy, gw, gh, n, accent }: {
  index: number; ox: number; oy: number; gw: number; gh: number; n: number; accent: string;
}) {
  const x = index / n;
  const xMid = x + 0.5 / n;
  const y = xMid * xMid; // f(x)=x²
  const rectW = gw / n;
  const fullH = y * gh;

  // Staggered grow animation for each bar
  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withDelay(
      index * 200,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1200, easing: Easing.out(Easing.quad) }),
          withTiming(1, { duration: 2000 }), // hold
          withTiming(0, { duration: 800, easing: Easing.in(Easing.quad) }),
          withTiming(0, { duration: 400 }), // pause before restart
        ),
        -1,
        false,
      ),
    );
  }, []);

  const barProps = useAnimatedProps(() => {
    const h = fullH * scale.value;
    return {
      y: oy - h,
      height: Math.max(0, h),
    };
  });

  return (
    <AnimatedRect
      x={ox + index * rectW + 1}
      width={rectW - 2}
      fill={accent + '55'}
      stroke={accent}
      strokeWidth={1}
      animatedProps={barProps}
    />
  );
}

function RiemannSumViz({ accent }: { accent: string }) {
  const ox = 30;
  const oy = H - 30;
  const gw = W - 60;
  const gh = H - 60;
  const n = 6;

  // Curve
  const points: string[] = [];
  for (let x = 0; x <= 1; x += 0.02) {
    points.push(`${ox + x * gw},${oy - x * x * gh}`);
  }
  const curve = 'M' + points.join(' L');

  return (
    <Svg width={W} height={H}>
      <Line x1={ox} y1={20} x2={ox} y2={oy} stroke={colors.text3} strokeWidth={1.5} />
      <Line x1={ox} y1={oy} x2={ox + gw} y2={oy} stroke={colors.text3} strokeWidth={1.5} />
      {Array.from({ length: n }, (_, i) => (
        <RiemannBar key={i} index={i} ox={ox} oy={oy} gw={gw} gh={gh} n={n} accent={accent} />
      ))}
      <Path d={curve} fill="none" stroke={accent} strokeWidth={2.5} />
      <SvgText x={ox + gw / 2} y={H - 8} fill={colors.text2} fontSize={11} textAnchor="middle">
        Area ≈ Σ f(xᵢ)·Δx
      </SvgText>
    </Svg>
  );
}

// ── Generic ───────────────────────────────────────────────────────────────────
function GenericViz({ accent, label }: { accent: string; label: string }) {
  // Subtle breathing pulse on the circle
  const radius = useSharedValue(55);
  useEffect(() => {
    radius.value = withRepeat(
      withTiming(65, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const circleProps = useAnimatedProps(() => ({
    r: radius.value,
    opacity: interpolate(radius.value, [55, 65], [0.5, 0.9]),
  }));

  return (
    <Svg width={W} height={H}>
      <AnimatedCircle cx={W / 2} cy={H / 2} fill={accent + '15'} stroke={accent} strokeWidth={1.5} strokeDasharray="6 4" animatedProps={circleProps} />
      <SvgText x={W / 2} y={H / 2 + 5} fill={accent} fontSize={14} textAnchor="middle">{label}</SvgText>
    </Svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function ConceptVisualization({
  type,
  accentColor,
  label,
}: ConceptVisualizationProps) {
  const renderViz = () => {
    switch (type) {
      case 'number-line':
        return <NumberLineViz accent={accentColor} />;
      case 'fraction-bar':
        return <FractionBarViz accent={accentColor} />;
      case 'coordinate-plane':
        return <CoordinatePlaneViz accent={accentColor} />;
      case 'triangle':
        return <TriangleViz accent={accentColor} />;
      case 'circle':
        return <CircleViz accent={accentColor} />;
      case 'parabola':
        return <ParabolaViz accent={accentColor} />;
      case 'unit-circle':
        return <UnitCircleViz accent={accentColor} />;
      case 'secant-tangent':
        return <SecantTangentViz accent={accentColor} />;
      case 'riemann-sum':
        return <RiemannSumViz accent={accentColor} />;
      default:
        return <GenericViz accent={accentColor} label={label} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderViz()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    height: H,
  },
});
