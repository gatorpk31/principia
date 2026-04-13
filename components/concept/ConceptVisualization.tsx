import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import type { VisualizationType } from '../../types';
import { H } from './visualizations/shared';

// ── Tier imports ────────────────────────────────────────────────────────────
import {
  FractionBarViz,
  FractionEquivalenceViz,
  FractionArithmeticViz,
  FractionMultiplyViz,
  RatioTapeViz,
  PercentFillViz,
  NegativeNumberLineViz,
  PemdasBuilderViz,
  FractionOrderingViz,
  MixedNumbersViz,
  DecimalSliderViz,
  FactorTreeViz,
  VennGcfLcmViz,
} from './visualizations/tier1';

import {
  ProportionalLineViz,
  BalanceScaleViz,
  TwoStepBalanceViz,
  InequalityRayViz,
  VariableBoxViz,
  AreaRectangleViz,
  CoordinatePlotViz,
  BarChartViz,
  UnitRateCompareViz,
  ScaleDrawingViz,
  InterestGrowthViz,
  AbsoluteValueFoldViz,
} from './visualizations/tier2';

import {
  SlopeRiseRunViz,
  SlopeInterceptLineViz,
  SystemIntersectionViz,
  EliminationCancelViz,
  GraphLineDrawViz,
  InequalityShadeViz,
  AbsoluteValueVViz,
  ExponentTowerViz,
  MultiStepBalanceViz,
  SequenceDotsViz,
  FunctionMachineViz,
  DomainRangeBoxViz,
} from './visualizations/tier3';

import {
  ParallelAnglesViz,
  TriangleCongruenceViz,
  PythagoreanSquaresViz,
  CoordinateGeometryViz,
  ProofChainViz,
  CirclePartsViz,
  Cube3dViz,
  VolumeFillViz,
  TriangleTransformViz,
  TriangleInequalityViz,
  MidsegmentDrawViz,
} from './visualizations/tier4';

import {
  ParabolaViz,
  QuadraticDiscriminantViz,
  ExponentialCurveViz,
  LogMirrorViz,
  PolynomialRootsViz,
  ComplexPlaneViz,
  CompleteSquareViz,
  PolyDivisionViz,
  RationalAsymptotesViz,
  SeriesSumViz,
  ConicSlicerViz,
} from './visualizations/tier5';

import {
  UnitCircleViz,
  SineWaveViz,
  TrigIdentityPuzzleViz,
  InverseTrigArcViz,
  FunctionTransformViz,
  LimitApproachViz,
  LawOfSinesTriViz,
  LawOfCosinesTriViz,
  PolarGraphViz,
  VectorAdditionViz,
  ParametricTraceViz,
} from './visualizations/tier6';

import {
  LimitTableViz,
  SecantTangentViz,
  DerivativeSlopeViz,
  OptimizationBoxViz,
  RiemannSumViz,
  FtcAreaViz,
  USubChainViz,
  ContinuityTestViz,
  MvtSecantViz,
  LhopitalZoomViz,
  RelatedRatesConeViz,
  ImplicitCurveViz,
} from './visualizations/tier7';

import {
  IbpProductViz,
  SequenceConvergeViz,
  ConvergenceMeterViz,
  TaylorApproxViz,
  EpsilonDeltaBandViz,
  InductionDominoesViz,
  TrigSubTriangleViz,
  ImproperIntegralViz,
  ContradictionForkViz,
  PartialFractionSplitViz,
  PowerSeriesRadiusViz,
} from './visualizations/tier8';

// ── Lookup table ────────────────────────────────────────────────────────────
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type VizComponent = React.FC<{ accent: string }>;

const VIZ_MAP: Record<string, VizComponent> = {
  // Tier 1
  'fraction-bar': FractionBarViz,
  'fraction-equivalence': FractionEquivalenceViz,
  'fraction-arithmetic': FractionArithmeticViz,
  'fraction-multiply': FractionMultiplyViz,
  'ratio-tape': RatioTapeViz,
  'percent-fill': PercentFillViz,
  'negative-number-line': NegativeNumberLineViz,
  'pemdas-builder': PemdasBuilderViz,
  'fraction-ordering': FractionOrderingViz,
  'mixed-numbers': MixedNumbersViz,
  'decimal-slider': DecimalSliderViz,
  'factor-tree': FactorTreeViz,
  'venn-gcf-lcm': VennGcfLcmViz,
  // Tier 2
  'proportional-line': ProportionalLineViz,
  'balance-scale': BalanceScaleViz,
  'two-step-balance': TwoStepBalanceViz,
  'inequality-ray': InequalityRayViz,
  'variable-box': VariableBoxViz,
  'area-rectangle': AreaRectangleViz,
  'coordinate-plot': CoordinatePlotViz,
  'bar-chart': BarChartViz,
  'unit-rate-compare': UnitRateCompareViz,
  'scale-drawing': ScaleDrawingViz,
  'interest-growth': InterestGrowthViz,
  'absolute-value-fold': AbsoluteValueFoldViz,
  // Tier 3
  'slope-rise-run': SlopeRiseRunViz,
  'slope-intercept-line': SlopeInterceptLineViz,
  'system-intersection': SystemIntersectionViz,
  'elimination-cancel': EliminationCancelViz,
  'graph-line-draw': GraphLineDrawViz,
  'inequality-shade': InequalityShadeViz,
  'absolute-value-v': AbsoluteValueVViz,
  'exponent-tower': ExponentTowerViz,
  'multi-step-balance': MultiStepBalanceViz,
  'sequence-dots': SequenceDotsViz,
  'function-machine': FunctionMachineViz,
  'domain-range-box': DomainRangeBoxViz,
  // Tier 4
  'parallel-angles': ParallelAnglesViz,
  'triangle-congruence': TriangleCongruenceViz,
  'pythagorean-squares': PythagoreanSquaresViz,
  'coordinate-geometry': CoordinateGeometryViz,
  'proof-chain': ProofChainViz,
  'circle-parts': CirclePartsViz,
  'cube-3d': Cube3dViz,
  'volume-fill': VolumeFillViz,
  'triangle-transform': TriangleTransformViz,
  'triangle-inequality': TriangleInequalityViz,
  'midsegment-draw': MidsegmentDrawViz,
  // Tier 5
  'parabola': ParabolaViz,
  'quadratic-discriminant': QuadraticDiscriminantViz,
  'exponential-curve': ExponentialCurveViz,
  'log-mirror': LogMirrorViz,
  'polynomial-roots': PolynomialRootsViz,
  'complex-plane': ComplexPlaneViz,
  'complete-square': CompleteSquareViz,
  'poly-division': PolyDivisionViz,
  'rational-asymptotes': RationalAsymptotesViz,
  'series-sum': SeriesSumViz,
  'conic-slicer': ConicSlicerViz,
  // Tier 6
  'unit-circle': UnitCircleViz,
  'sine-wave': SineWaveViz,
  'trig-identity-puzzle': TrigIdentityPuzzleViz,
  'inverse-trig-arc': InverseTrigArcViz,
  'function-transform': FunctionTransformViz,
  'limit-approach': LimitApproachViz,
  'law-of-sines-tri': LawOfSinesTriViz,
  'law-of-cosines-tri': LawOfCosinesTriViz,
  'polar-graph': PolarGraphViz,
  'vector-addition': VectorAdditionViz,
  'parametric-trace': ParametricTraceViz,
  // Tier 7
  'limit-table': LimitTableViz,
  'secant-tangent': SecantTangentViz,
  'derivative-slope': DerivativeSlopeViz,
  'optimization-box': OptimizationBoxViz,
  'riemann-sum': RiemannSumViz,
  'ftc-area': FtcAreaViz,
  'u-sub-chain': USubChainViz,
  'continuity-test': ContinuityTestViz,
  'mvt-secant': MvtSecantViz,
  'lhopital-zoom': LhopitalZoomViz,
  'related-rates-cone': RelatedRatesConeViz,
  'implicit-curve': ImplicitCurveViz,
  // Tier 8
  'ibp-product': IbpProductViz,
  'sequence-converge': SequenceConvergeViz,
  'convergence-meter': ConvergenceMeterViz,
  'taylor-approx': TaylorApproxViz,
  'epsilon-delta-band': EpsilonDeltaBandViz,
  'induction-dominoes': InductionDominoesViz,
  'trig-sub-triangle': TrigSubTriangleViz,
  'improper-integral': ImproperIntegralViz,
  'contradiction-fork': ContradictionForkViz,
  'partial-fraction-split': PartialFractionSplitViz,
  'power-series-radius': PowerSeriesRadiusViz,
};

// ── Generic fallback (breathing circle) ─────────────────────────────────────
function GenericViz({ accent, label }: { accent: string; label: string }) {
  const r = useSharedValue(30);

  useEffect(() => {
    r.value = withRepeat(
      withTiming(44, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const circleProps = useAnimatedProps(() => ({ r: r.value }));
  const W2 = 200;

  return (
    <Svg width={W2} height={H}>
      <AnimatedCircle
        cx={W2 / 2}
        cy={H / 2}
        fill={accent + '15'}
        stroke={accent}
        strokeWidth={1.5}
        strokeDasharray="6 4"
        animatedProps={circleProps}
      />
      <SvgText
        x={W2 / 2}
        y={H / 2 + 5}
        fill={accent}
        fontSize={14}
        textAnchor="middle"
      >
        {label}
      </SvgText>
    </Svg>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
interface ConceptVisualizationProps {
  type: VisualizationType;
  accentColor: string;
  label: string;
  tierId: number;
}

export function ConceptVisualization({
  type,
  accentColor,
  label,
}: ConceptVisualizationProps) {
  const Viz = VIZ_MAP[type];

  return (
    <View style={styles.container}>
      {Viz ? <Viz accent={accentColor} /> : <GenericViz accent={accentColor} label={label} />}
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
