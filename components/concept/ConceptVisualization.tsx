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
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import type { VisualizationType } from '../../types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

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
      {/* Points */}
      {[[-2, -2], [0, 0], [2, 2]].map(([x, y]) => (
        <Circle key={`${x}${y}`} cx={cx + x * scale} cy={cy - y * scale} r={5} fill={accent} />
      ))}
    </Svg>
  );
}

// ── Triangle ─────────────────────────────────────────────────────────────────
function TriangleViz({ accent }: { accent: string }) {
  const ax = 60, ay = H - 40;
  const bx = W - 60, by = H - 40;
  const cx2 = W / 2, cy2 = 40;

  return (
    <Svg width={W} height={H}>
      {/* Triangle */}
      <Path
        d={`M${ax},${ay} L${bx},${by} L${cx2},${cy2} Z`}
        fill={accent + '15'}
        stroke={accent}
        strokeWidth={2.5}
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

  return (
    <Svg width={W} height={H}>
      <Circle cx={cx} cy={cy} r={r} fill={accent + '15'} stroke={accent} strokeWidth={2} />
      {/* Radius */}
      <Line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={colors.blue} strokeWidth={2} strokeDasharray="4 3" />
      <SvgText x={cx + r / 2} y={cy - 8} fill={colors.blue} fontSize={13} textAnchor="middle">r</SvgText>
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
      <SvgText x={cx} y={H - 10} fill={colors.text2} fontSize={12} textAnchor="middle">y = x²</SvgText>
    </Svg>
  );
}

// ── Unit Circle ───────────────────────────────────────────────────────────────
function UnitCircleViz({ accent }: { accent: string }) {
  const cx = W / 2;
  const cy = H / 2;
  const r = 80;
  const angle = Math.PI / 4; // 45°
  const px = cx + r * Math.cos(angle);
  const py = cy - r * Math.sin(angle);

  return (
    <Svg width={W} height={H}>
      {/* Axes */}
      <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.text3} strokeWidth={1} />
      <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.text3} strokeWidth={1} />
      {/* Unit circle */}
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.border2} strokeWidth={1.5} />
      {/* Radius to point */}
      <Line x1={cx} y1={cy} x2={px} y2={py} stroke={accent} strokeWidth={2} />
      {/* sin (vertical) */}
      <Line x1={px} y1={py} x2={px} y2={cy} stroke={colors.blue} strokeWidth={1.5} strokeDasharray="4 3" />
      {/* cos (horizontal) */}
      <Line x1={cx} y1={cy} x2={px} y2={cy} stroke={colors.green} strokeWidth={1.5} strokeDasharray="4 3" />
      {/* Point */}
      <Circle cx={px} cy={py} r={5} fill={accent} />
      {/* Labels */}
      <SvgText x={px + 8} y={cy - 8} fill={colors.blue} fontSize={11}>sin θ</SvgText>
      <SvgText x={cx + (px - cx) / 2} y={cy + 16} fill={colors.green} fontSize={11} textAnchor="middle">cos θ</SvgText>
      <SvgText x={cx + 20} y={cy - 16} fill={colors.text3} fontSize={11}>θ = 45°</SvgText>
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

  // Tangent at x=1: slope=1, passes through (1, 0.5)
  const tx = 1;
  const ty = 0.5;
  const slope = tx;
  const t1x = cx + 0 * scale; const t1y = cy - (ty - slope * tx) * scale;
  const t2x = cx + 2 * scale; const t2y = cy - (ty + slope * (2 - tx)) * scale;

  return (
    <Svg width={W} height={H}>
      <Line x1={20} y1={cy} x2={W - 20} y2={cy} stroke={colors.text3} strokeWidth={1} />
      <Line x1={cx} y1={20} x2={cx} y2={H - 20} stroke={colors.text3} strokeWidth={1} />
      <Path d={curve} fill="none" stroke={accent} strokeWidth={2.5} />
      {/* Tangent line */}
      <Line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke={colors.rose} strokeWidth={2} strokeDasharray="5 3" />
      {/* Touch point */}
      <Circle cx={cx + tx * scale} cy={cy - ty * scale} r={5} fill={accent} />
      <SvgText x={t2x + 5} y={t2y} fill={colors.rose} fontSize={11}>f'(x)</SvgText>
      <SvgText x={cx} y={H - 10} fill={colors.text2} fontSize={11} textAnchor="middle">tangent = instantaneous rate of change</SvgText>
    </Svg>
  );
}

// ── Riemann Sum ───────────────────────────────────────────────────────────────
function RiemannSumViz({ accent }: { accent: string }) {
  const ox = 30;
  const oy = H - 30;
  const gw = W - 60;
  const gh = H - 60;
  const n = 6;
  const rects: React.ReactNode[] = [];

  for (let i = 0; i < n; i++) {
    const x = i / n;
    const xMid = x + 0.5 / n;
    const y = xMid * xMid; // f(x)=x²
    const rectW = gw / n;
    const rectH = y * gh;
    rects.push(
      <Rect
        key={i}
        x={ox + i * rectW + 1}
        y={oy - rectH}
        width={rectW - 2}
        height={rectH}
        fill={accent + '55'}
        stroke={accent}
        strokeWidth={1}
      />,
    );
  }

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
      {rects}
      <Path d={curve} fill="none" stroke={accent} strokeWidth={2.5} />
      <SvgText x={ox + gw / 2} y={H - 8} fill={colors.text2} fontSize={11} textAnchor="middle">
        Area ≈ Σ f(xᵢ)·Δx
      </SvgText>
    </Svg>
  );
}

// ── Generic ───────────────────────────────────────────────────────────────────
function GenericViz({ accent, label }: { accent: string; label: string }) {
  return (
    <Svg width={W} height={H}>
      <Circle cx={W / 2} cy={H / 2} r={60} fill={accent + '15'} stroke={accent} strokeWidth={1.5} strokeDasharray="6 4" />
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
