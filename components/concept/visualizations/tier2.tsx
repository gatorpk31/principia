import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText, Path, G } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '../../../constants/theme';
import { W, H, AnimatedCircle, AnimatedLine, AnimatedRect, type VizProps } from './shared';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── 1. Proportional Line: drag point along y = 2x ──────────────────────────
export function ProportionalLineViz({ accent }: VizProps) {
  const margin = 40;
  const graphW = W - margin * 2;
  const graphH = H - 60;
  const maxX = 5;
  const maxY = 10;

  const dotPx = useSharedValue(graphW * 0.4);
  const startPx = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startPx.value = dotPx.value; })
    .onUpdate(e => {
      dotPx.value = clamp(startPx.value + e.translationX, 0, graphW);
    });

  const dotXProps = useAnimatedProps(() => ({
    cx: margin + dotPx.value,
    cy: 10 + graphH - (dotPx.value / graphW) * maxX * 2 * (graphH / maxY),
  }));

  const lineToPointProps = useAnimatedProps(() => ({
    x2: String(margin + dotPx.value),
    y2: String(10 + graphH - (dotPx.value / graphW) * maxX * 2 * (graphH / maxY)),
  }));

  // Vertical dashed guide
  const vertGuideProps = useAnimatedProps(() => ({
    x1: margin + dotPx.value,
    x2: margin + dotPx.value,
    y1: 10 + graphH,
    y2: 10 + graphH - (dotPx.value / graphW) * maxX * 2 * (graphH / maxY),
  }));

  // Horizontal dashed guide
  const horizGuideProps = useAnimatedProps(() => ({
    x1: margin,
    x2: margin + dotPx.value,
    y1: 10 + graphH - (dotPx.value / graphW) * maxX * 2 * (graphH / maxY),
    y2: 10 + graphH - (dotPx.value / graphW) * maxX * 2 * (graphH / maxY),
  }));

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          {/* Y-axis */}
          <Line x1={margin} y1={10} x2={margin} y2={10 + graphH} stroke={colors.border2} strokeWidth={1.5} />
          {/* X-axis */}
          <Line x1={margin} y1={10 + graphH} x2={margin + graphW} y2={10 + graphH} stroke={colors.border2} strokeWidth={1.5} />

          {/* Tick marks on X-axis */}
          {[1, 2, 3, 4, 5].map(n => {
            const x = margin + (n / maxX) * graphW;
            return (
              <G key={`x${n}`}>
                <Line x1={x} y1={10 + graphH - 4} x2={x} y2={10 + graphH + 4} stroke={colors.text3} strokeWidth={1} />
                <SvgText x={x} y={10 + graphH + 16} fill={colors.text3} fontSize={9} textAnchor="middle">{n}</SvgText>
              </G>
            );
          })}

          {/* Tick marks on Y-axis */}
          {[2, 4, 6, 8, 10].map(n => {
            const y = 10 + graphH - (n / maxY) * graphH;
            return (
              <G key={`y${n}`}>
                <Line x1={margin - 4} y1={y} x2={margin + 4} y2={y} stroke={colors.text3} strokeWidth={1} />
                <SvgText x={margin - 10} y={y + 4} fill={colors.text3} fontSize={9} textAnchor="end">{n}</SvgText>
              </G>
            );
          })}

          {/* The y = 2x line (full) */}
          <Line
            x1={margin}
            y1={10 + graphH}
            x2={margin + graphW}
            y2={10 + graphH - maxX * 2 * (graphH / maxY)}
            stroke={accent + '44'}
            strokeWidth={2}
          />

          {/* Colored line from origin to point */}
          <AnimatedLine
            x1={String(margin)}
            y1={String(10 + graphH)}
            stroke={accent}
            strokeWidth={2.5}
            animatedProps={lineToPointProps}
          />

          {/* Vertical guide */}
          <AnimatedLine stroke={accent + '55'} strokeWidth={1} strokeDasharray="4,3" animatedProps={vertGuideProps} />
          {/* Horizontal guide */}
          <AnimatedLine stroke={accent + '55'} strokeWidth={1} strokeDasharray="4,3" animatedProps={horizGuideProps} />

          {/* Draggable point */}
          <AnimatedCircle r={10} fill={accent} animatedProps={dotXProps} />

          {/* Labels */}
          <SvgText x={margin + graphW - 4} y={10 + graphH - maxX * 2 * (graphH / maxY) - 6} fill={accent} fontSize={11} textAnchor="end">y = 2x</SvgText>
          <SvgText x={margin + graphW / 2} y={10} fill={colors.text2} fontSize={12} fontWeight="bold" textAnchor="middle">k = 2 (constant of proportionality)</SvgText>
          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">drag point along the line</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 2. Balance Scale: tap to add weights ────────────────────────────────────
export function BalanceScaleViz({ accent }: VizProps) {
  const [leftW, setLeftW] = useState(0);
  const [rightW, setRightW] = useState(0);

  const diff = leftW - rightW;
  const maxTilt = 15;
  const tiltDeg = clamp(diff * 3, -maxTilt, maxTilt);
  const tiltRad = (tiltDeg * Math.PI) / 180;

  const pivotX = W / 2;
  const pivotY = 70;
  const beamLen = W * 0.35;

  const leftPanX = pivotX - beamLen * Math.cos(tiltRad);
  const leftPanY = pivotY - beamLen * Math.sin(tiltRad);
  const rightPanX = pivotX + beamLen * Math.cos(tiltRad);
  const rightPanY = pivotY + beamLen * Math.sin(tiltRad);

  const tapLeft = Gesture.Tap().onEnd(() => runOnJS(setLeftW)(leftW < 5 ? leftW + 1 : 0));
  const tapRight = Gesture.Tap().onEnd(() => runOnJS(setRightW)(rightW < 5 ? rightW + 1 : 0));
  const composed = Gesture.Exclusive(tapLeft, tapRight);

  // We use a single tap and determine side from tap position
  const [lastTapSide, setLastTapSide] = useState<'left' | 'right'>('left');
  const singleTap = Gesture.Tap().onEnd((e) => {
    if (e.x < W / 2) {
      runOnJS(setLeftW)(leftW < 5 ? leftW + 1 : 0);
    } else {
      runOnJS(setRightW)(rightW < 5 ? rightW + 1 : 0);
    }
  });

  return (
    <GestureDetector gesture={singleTap}>
      <View>
        <Svg width={W} height={H}>
          {/* Fulcrum triangle */}
          <Path
            d={`M${pivotX},${pivotY} L${pivotX - 15},${pivotY + 25} L${pivotX + 15},${pivotY + 25} Z`}
            fill={colors.surface2}
            stroke={colors.border2}
            strokeWidth={1.5}
          />
          {/* Stand */}
          <Line x1={pivotX} y1={pivotY + 25} x2={pivotX} y2={H - 30} stroke={colors.border2} strokeWidth={3} />
          <Rect x={pivotX - 30} y={H - 32} width={60} height={6} rx={3} fill={colors.border2} />

          {/* Beam */}
          <Line x1={leftPanX} y1={leftPanY} x2={rightPanX} y2={rightPanY} stroke={colors.text2} strokeWidth={3} />

          {/* Left pan */}
          <Line x1={leftPanX} y1={leftPanY} x2={leftPanX} y2={leftPanY + 20} stroke={colors.text3} strokeWidth={1.5} />
          <Path
            d={`M${leftPanX - 35},${leftPanY + 20} Q${leftPanX - 35},${leftPanY + 35} ${leftPanX},${leftPanY + 35} Q${leftPanX + 35},${leftPanY + 35} ${leftPanX + 35},${leftPanY + 20} Z`}
            fill={colors.surface2}
            stroke={colors.border}
            strokeWidth={1}
          />
          {/* Left weights */}
          {Array.from({ length: leftW }, (_, i) => (
            <Rect
              key={`lw${i}`}
              x={leftPanX - 10 + (i % 3 - 1) * 14}
              y={leftPanY + 18 - Math.floor(i / 3) * 12}
              width={12}
              height={10}
              rx={2}
              fill={accent}
            />
          ))}
          <SvgText x={leftPanX} y={leftPanY + 52} fill={colors.text2} fontSize={13} fontWeight="bold" textAnchor="middle">{leftW}</SvgText>

          {/* Right pan */}
          <Line x1={rightPanX} y1={rightPanY} x2={rightPanX} y2={rightPanY + 20} stroke={colors.text3} strokeWidth={1.5} />
          <Path
            d={`M${rightPanX - 35},${rightPanY + 20} Q${rightPanX - 35},${rightPanY + 35} ${rightPanX},${rightPanY + 35} Q${rightPanX + 35},${rightPanY + 35} ${rightPanX + 35},${rightPanY + 20} Z`}
            fill={colors.surface2}
            stroke={colors.border}
            strokeWidth={1}
          />
          {/* Right weights */}
          {Array.from({ length: rightW }, (_, i) => (
            <Rect
              key={`rw${i}`}
              x={rightPanX - 10 + (i % 3 - 1) * 14}
              y={rightPanY + 18 - Math.floor(i / 3) * 12}
              width={12}
              height={10}
              rx={2}
              fill={accent}
            />
          ))}
          <SvgText x={rightPanX} y={rightPanY + 52} fill={colors.text2} fontSize={13} fontWeight="bold" textAnchor="middle">{rightW}</SvgText>

          {/* Balance indicator */}
          <SvgText x={pivotX} y={28} fill={diff === 0 ? colors.green : colors.rose} fontSize={13} fontWeight="bold" textAnchor="middle">
            {diff === 0 ? 'Balanced!' : diff > 0 ? 'Left heavier' : 'Right heavier'}
          </SvgText>

          <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={11} textAnchor="middle">tap left or right to add weights (resets at 5)</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 3. Two-Step Balance: solve 2x + 3 = 7 step by step ─────────────────────
export function TwoStepBalanceViz({ accent }: VizProps) {
  const [step, setStep] = useState(0);
  // Step 0: 2x + 3 = 7
  // Step 1: 2x = 4 (subtract 3)
  // Step 2: x = 2 (divide by 2)

  const tap = Gesture.Tap().onEnd(() => runOnJS(setStep)((step + 1) % 3));

  const pivotX = W / 2;
  const beamY = 65;
  const panW = 80;
  const panH = 50;

  const equations = [
    { left: '2x + 3', right: '7', note: 'tap to subtract 3 from both sides' },
    { left: '2x', right: '4', note: 'tap to divide both sides by 2' },
    { left: 'x', right: '2', note: 'solved! tap to restart' },
  ];
  const eq = equations[step];

  const operations = ['', '- 3', '÷ 2'];
  const op = operations[step];

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          {/* Title equation */}
          <SvgText x={pivotX} y={22} fill={colors.text2} fontSize={13} textAnchor="middle">2x + 3 = 7</SvgText>

          {/* Beam */}
          <Line x1={pivotX - 100} y1={beamY} x2={pivotX + 100} y2={beamY} stroke={colors.text2} strokeWidth={3} />

          {/* Fulcrum */}
          <Path
            d={`M${pivotX},${beamY} L${pivotX - 12},${beamY + 18} L${pivotX + 12},${beamY + 18} Z`}
            fill={colors.surface2}
            stroke={colors.border2}
            strokeWidth={1.5}
          />

          {/* Left pan area */}
          <Rect x={pivotX - 100 - 10} y={beamY - panH - 5} width={panW + 20} height={panH} rx={8} fill={colors.surface2} stroke={accent + '66'} strokeWidth={1.5} />
          <SvgText x={pivotX - 70} y={beamY - panH / 2 + 2} fill={accent} fontSize={18} fontWeight="bold" textAnchor="middle">{eq.left}</SvgText>

          {/* Right pan area */}
          <Rect x={pivotX + 100 - panW - 10} y={beamY - panH - 5} width={panW + 20} height={panH} rx={8} fill={colors.surface2} stroke={accent + '66'} strokeWidth={1.5} />
          <SvgText x={pivotX + 70} y={beamY - panH / 2 + 2} fill={accent} fontSize={18} fontWeight="bold" textAnchor="middle">{eq.right}</SvgText>

          {/* Equals sign */}
          <SvgText x={pivotX} y={beamY - panH / 2 + 2} fill={colors.text3} fontSize={20} textAnchor="middle">=</SvgText>

          {/* Operation arrow */}
          {op !== '' && (
            <>
              <SvgText x={pivotX - 70} y={beamY + 50} fill={colors.rose} fontSize={14} fontWeight="bold" textAnchor="middle">{op}</SvgText>
              <SvgText x={pivotX + 70} y={beamY + 50} fill={colors.rose} fontSize={14} fontWeight="bold" textAnchor="middle">{op}</SvgText>
              <SvgText x={pivotX} y={beamY + 50} fill={colors.text3} fontSize={11} textAnchor="middle">both sides</SvgText>
            </>
          )}

          {/* Step indicator */}
          {[0, 1, 2].map(i => (
            <Circle key={i} cx={pivotX - 12 + i * 12} cy={beamY + 75} r={4} fill={i <= step ? accent : colors.surface2} stroke={accent} strokeWidth={1} />
          ))}
          <SvgText x={pivotX} y={beamY + 92} fill={step === 2 ? colors.green : colors.text2} fontSize={12} fontWeight="bold" textAnchor="middle">
            {step === 2 ? 'x = 2 ✓' : `Step ${step + 1} of 3`}
          </SvgText>

          <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={11} textAnchor="middle">{eq.note}</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 4. Inequality Ray: pan to shade a ray on number line ────────────────────
export function InequalityRayViz({ accent }: VizProps) {
  const [closed, setClosed] = useState(true);

  const left = 40;
  const right = W - 40;
  const cy = H / 2;
  const range = 10; // -5 to 5
  const step = (right - left) / range;

  const boundaryPx = useSharedValue(left + 7 * step); // start at x = 2
  const startPx = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startPx.value = boundaryPx.value; })
    .onUpdate(e => {
      const raw = startPx.value + e.translationX;
      // Snap to integer positions
      const snapped = left + Math.round((raw - left) / step) * step;
      boundaryPx.value = clamp(snapped, left, right);
    });

  const tapToggle = Gesture.Tap().onEnd(() => runOnJS(setClosed)(!closed));
  const gesture = Gesture.Race(pan, tapToggle);

  // Shade ray to the right from boundary
  const rayProps = useAnimatedProps(() => ({
    x: boundaryPx.value,
    width: Math.max(0, right - boundaryPx.value),
  }));

  const circleProps = useAnimatedProps(() => ({
    cx: boundaryPx.value,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={cy - 50} fill={colors.text2} fontSize={13} textAnchor="middle">Inequality on a Number Line</SvgText>

          {/* Number line */}
          <Line x1={left} y1={cy} x2={right} y2={cy} stroke={colors.border2} strokeWidth={2} />

          {/* Tick marks */}
          {Array.from({ length: 11 }, (_, i) => {
            const n = i - 5;
            const x = left + i * step;
            return (
              <G key={n}>
                <Line x1={x} y1={cy - 8} x2={x} y2={cy + 8} stroke={n === 0 ? colors.text2 : colors.text3} strokeWidth={n === 0 ? 2 : 1} />
                <SvgText x={x} y={cy + 24} fill={colors.text2} fontSize={10} textAnchor="middle">{n}</SvgText>
              </G>
            );
          })}

          {/* Shaded ray (to the right) */}
          <AnimatedRect y={cy - 6} height={12} rx={2} fill={accent + '44'} animatedProps={rayProps} />

          {/* Arrow at right end */}
          <Path d={`M${right - 2},${cy - 8} L${right + 8},${cy} L${right - 2},${cy + 8}`} fill={accent + '66'} />

          {/* Boundary circle (open or closed) */}
          <AnimatedCircle
            cy={cy}
            r={8}
            fill={closed ? accent : colors.bg}
            stroke={accent}
            strokeWidth={2.5}
            animatedProps={circleProps}
          />

          {/* Symbol display */}
          <SvgText x={W / 2} y={cy + 50} fill={accent} fontSize={15} fontWeight="bold" textAnchor="middle">
            {closed ? 'x ≥ boundary' : 'x > boundary'}
          </SvgText>
          <SvgText x={W / 2} y={cy + 68} fill={colors.text3} fontSize={11} textAnchor="middle">
            {closed ? '● closed = includes point' : '○ open = excludes point'}
          </SvgText>

          <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={11} textAnchor="middle">drag boundary point · tap to toggle open/closed</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 5. Variable Box: tap to guess what x holds ──────────────────────────────
export function VariableBoxViz({ accent }: VizProps) {
  const [guessIdx, setGuessIdx] = useState(-1);
  const guesses = [5, 6, 7, 8];
  const answer = 7;
  const current = guessIdx >= 0 ? guesses[guessIdx] : null;
  const isCorrect = current === answer;

  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(setGuessIdx)(guessIdx < guesses.length - 1 ? guessIdx + 1 : -1);
  });

  const cx = W / 2;
  const boxY = 50;
  const boxSize = 60;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          {/* Equation */}
          <SvgText x={cx} y={28} fill={colors.text2} fontSize={16} fontWeight="bold" textAnchor="middle">x + 5 = 12</SvgText>

          {/* Mystery box */}
          <Rect
            x={cx - boxSize * 1.5 - 10}
            y={boxY}
            width={boxSize}
            height={boxSize}
            rx={10}
            fill={isCorrect ? colors.green + '33' : colors.surface2}
            stroke={isCorrect ? colors.green : accent}
            strokeWidth={2}
          />
          {current !== null ? (
            <SvgText
              x={cx - boxSize * 1.5 - 10 + boxSize / 2}
              y={boxY + boxSize / 2 + 8}
              fill={isCorrect ? colors.green : accent}
              fontSize={24}
              fontWeight="bold"
              textAnchor="middle"
            >
              {current}
            </SvgText>
          ) : (
            <SvgText
              x={cx - boxSize * 1.5 - 10 + boxSize / 2}
              y={boxY + boxSize / 2 + 8}
              fill={accent}
              fontSize={24}
              fontWeight="bold"
              textAnchor="middle"
            >
              x
            </SvgText>
          )}

          {/* Plus sign */}
          <SvgText x={cx - boxSize / 2 + 10} y={boxY + boxSize / 2 + 8} fill={colors.text2} fontSize={22} textAnchor="middle">+</SvgText>

          {/* 5 box */}
          <Rect x={cx - 15} y={boxY} width={boxSize} height={boxSize} rx={10} fill={colors.surface2} stroke={colors.border} strokeWidth={1.5} />
          <SvgText x={cx - 15 + boxSize / 2} y={boxY + boxSize / 2 + 8} fill={colors.text2} fontSize={24} fontWeight="bold" textAnchor="middle">5</SvgText>

          {/* Equals */}
          <SvgText x={cx + boxSize + 5} y={boxY + boxSize / 2 + 8} fill={colors.text2} fontSize={22} textAnchor="middle">=</SvgText>

          {/* 12 box */}
          <Rect x={cx + boxSize + 25} y={boxY} width={boxSize} height={boxSize} rx={10} fill={colors.surface2} stroke={colors.border} strokeWidth={1.5} />
          <SvgText x={cx + boxSize + 25 + boxSize / 2} y={boxY + boxSize / 2 + 8} fill={colors.text2} fontSize={24} fontWeight="bold" textAnchor="middle">12</SvgText>

          {/* Result */}
          {current !== null && (
            <>
              <SvgText x={cx} y={boxY + boxSize + 30} fill={isCorrect ? colors.green : colors.rose} fontSize={14} fontWeight="bold" textAnchor="middle">
                {current} + 5 = {current + 5} {isCorrect ? '✓' : '✗'}
              </SvgText>
              {isCorrect && (
                <SvgText x={cx} y={boxY + boxSize + 48} fill={colors.green} fontSize={13} textAnchor="middle">x = 7 is correct!</SvgText>
              )}
            </>
          )}

          <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={11} textAnchor="middle">tap to try the next guess</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 6. Area Rectangle: drag corner to resize ────────────────────────────────
export function AreaRectangleViz({ accent }: VizProps) {
  const rectX = 50;
  const rectY = 30;
  const minSize = 40;
  const maxW = W - 100;
  const maxH = H - 70;

  const cornerX = useSharedValue(rectX + 160);
  const cornerY = useSharedValue(rectY + 120);
  const startCX = useSharedValue(0);
  const startCY = useSharedValue(0);

  const [dims, setDims] = useState({ w: 160, h: 120 });

  const updateDims = (w: number, h: number) => {
    setDims({ w: Math.round(w / 20), h: Math.round(h / 20) });
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      startCX.value = cornerX.value;
      startCY.value = cornerY.value;
    })
    .onUpdate(e => {
      cornerX.value = clamp(startCX.value + e.translationX, rectX + minSize, rectX + maxW);
      cornerY.value = clamp(startCY.value + e.translationY, rectY + minSize, rectY + maxH);
      runOnJS(updateDims)(cornerX.value - rectX, cornerY.value - rectY);
    });

  const rectProps = useAnimatedProps(() => ({
    width: cornerX.value - rectX,
    height: cornerY.value - rectY,
  }));

  const handleProps = useAnimatedProps(() => ({
    cx: cornerX.value,
    cy: cornerY.value,
  }));

  // Grid spacing
  const gridStep = 20;
  const gridLinesH = Math.floor(maxH / gridStep);
  const gridLinesW = Math.floor(maxW / gridStep);

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          {/* Grid lines (background) */}
          {Array.from({ length: gridLinesW + 1 }, (_, i) => (
            <Line key={`gv${i}`} x1={rectX + i * gridStep} y1={rectY} x2={rectX + i * gridStep} y2={rectY + maxH} stroke={colors.border + '44'} strokeWidth={0.5} />
          ))}
          {Array.from({ length: gridLinesH + 1 }, (_, i) => (
            <Line key={`gh${i}`} x1={rectX} y1={rectY + i * gridStep} x2={rectX + maxW} y2={rectY + i * gridStep} stroke={colors.border + '44'} strokeWidth={0.5} />
          ))}

          {/* Main rectangle */}
          <AnimatedRect x={rectX} y={rectY} rx={4} fill={accent + '22'} stroke={accent} strokeWidth={2} animatedProps={rectProps} />

          {/* Width label (top) */}
          <SvgText x={rectX + (dims.w * 20) / 2} y={rectY - 8} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">{dims.w}</SvgText>

          {/* Height label (left) */}
          <SvgText x={rectX - 10} y={rectY + (dims.h * 20) / 2 + 4} fill={accent} fontSize={13} fontWeight="bold" textAnchor="middle">{dims.h}</SvgText>

          {/* Area label (center) */}
          <SvgText x={rectX + (dims.w * 20) / 2} y={rectY + (dims.h * 20) / 2 + 6} fill={colors.text2} fontSize={14} fontWeight="bold" textAnchor="middle">
            {dims.w} × {dims.h} = {dims.w * dims.h}
          </SvgText>

          {/* Drag handle */}
          <AnimatedCircle r={10} fill={accent} stroke={colors.bg} strokeWidth={2} animatedProps={handleProps} />

          <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={11} textAnchor="middle">drag corner to resize rectangle</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 7. Coordinate Plot: tap to plot points ──────────────────────────────────
export function CoordinatePlotViz({ accent }: VizProps) {
  const [plotted, setPlotted] = useState(0);
  const points = [
    { x: 1, y: 2 },
    { x: 3, y: 4 },
    { x: 2, y: 5 },
    { x: -1, y: 3 },
  ];

  const tap = Gesture.Tap().onEnd(() => runOnJS(setPlotted)(plotted < points.length ? plotted + 1 : 0));

  const margin = 40;
  const graphW = W - margin * 2;
  const graphH = H - 55;
  const originX = margin + graphW / 2;
  const originY = 15 + graphH / 2;
  const scaleX = graphW / 10; // -5 to 5
  const scaleY = graphH / 10;

  const toSvgX = (x: number) => originX + x * scaleX;
  const toSvgY = (y: number) => originY - y * scaleY;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          {/* Grid */}
          {Array.from({ length: 11 }, (_, i) => {
            const n = i - 5;
            const x = toSvgX(n);
            const y = toSvgY(n);
            return (
              <G key={`g${i}`}>
                <Line x1={x} y1={15} x2={x} y2={15 + graphH} stroke={colors.border + '33'} strokeWidth={0.5} />
                <Line x1={margin} y1={y} x2={margin + graphW} y2={y} stroke={colors.border + '33'} strokeWidth={0.5} />
              </G>
            );
          })}

          {/* X-axis */}
          <Line x1={margin} y1={originY} x2={margin + graphW} y2={originY} stroke={colors.border2} strokeWidth={1.5} />
          {/* Y-axis */}
          <Line x1={originX} y1={15} x2={originX} y2={15 + graphH} stroke={colors.border2} strokeWidth={1.5} />

          {/* Axis labels */}
          {[-4, -2, 0, 2, 4].map(n => (
            <G key={`ax${n}`}>
              <SvgText x={toSvgX(n)} y={originY + 14} fill={colors.text3} fontSize={9} textAnchor="middle">{n}</SvgText>
              {n !== 0 && <SvgText x={originX - 10} y={toSvgY(n) + 3} fill={colors.text3} fontSize={9} textAnchor="end">{n}</SvgText>}
            </G>
          ))}

          <SvgText x={margin + graphW - 4} y={originY - 4} fill={colors.text3} fontSize={9}>x</SvgText>
          <SvgText x={originX + 8} y={20} fill={colors.text3} fontSize={9}>y</SvgText>

          {/* Plotted points */}
          {points.slice(0, plotted).map((p, i) => (
            <G key={`p${i}`}>
              {/* Dashed guides */}
              <Line x1={toSvgX(p.x)} y1={originY} x2={toSvgX(p.x)} y2={toSvgY(p.y)} stroke={accent + '33'} strokeWidth={1} strokeDasharray="3,2" />
              <Line x1={originX} y1={toSvgY(p.y)} x2={toSvgX(p.x)} y2={toSvgY(p.y)} stroke={accent + '33'} strokeWidth={1} strokeDasharray="3,2" />
              <Circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r={6} fill={accent} />
              <SvgText x={toSvgX(p.x) + 10} y={toSvgY(p.y) - 6} fill={accent} fontSize={10} fontWeight="bold">({p.x},{p.y})</SvgText>
            </G>
          ))}

          {/* Counter */}
          <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={11} textAnchor="middle">
            {plotted < points.length ? `tap to plot point ${plotted + 1} of ${points.length}` : 'tap to reset'}
          </SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 8. Bar Chart: tap bars to see percentages ───────────────────────────────
export function BarChartViz({ accent }: VizProps) {
  const [selected, setSelected] = useState(-1);
  const labels = ['A', 'B', 'C', 'D'];
  const values = [35, 55, 20, 40];
  const total = values.reduce((a, b) => a + b, 0);
  const maxVal = Math.max(...values);

  const barW = (W - 80) / 4;
  const chartH = H - 70;
  const baseY = H - 40;
  const chartX = 50;

  const tap = Gesture.Tap().onEnd((e) => {
    const idx = Math.floor((e.x - chartX) / barW);
    if (idx >= 0 && idx < 4) {
      runOnJS(setSelected)(idx === selected ? -1 : idx);
    }
  });

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={18} fill={colors.text2} fontSize={12} textAnchor="middle">Distribution</SvgText>

          {/* Y axis */}
          <Line x1={chartX - 5} y1={baseY - chartH} x2={chartX - 5} y2={baseY} stroke={colors.border2} strokeWidth={1} />
          {/* Base line */}
          <Line x1={chartX - 5} y1={baseY} x2={chartX + barW * 4 + 5} y2={baseY} stroke={colors.border2} strokeWidth={1} />

          {/* Y ticks */}
          {[0, 25, 50, 75, 100].map(pct => {
            const y = baseY - (pct / 100) * chartH;
            return (
              <G key={pct}>
                <Line x1={chartX - 8} y1={y} x2={chartX - 2} y2={y} stroke={colors.text3} strokeWidth={1} />
                <SvgText x={chartX - 12} y={y + 3} fill={colors.text3} fontSize={8} textAnchor="end">{pct}%</SvgText>
              </G>
            );
          })}

          {/* Bars */}
          {values.map((v, i) => {
            const barH = (v / maxVal) * chartH;
            const x = chartX + i * barW + 6;
            const isSel = selected === i;
            const pct = ((v / total) * 100).toFixed(1);
            return (
              <G key={i}>
                <Rect
                  x={x}
                  y={baseY - barH}
                  width={barW - 12}
                  height={barH}
                  rx={4}
                  fill={isSel ? accent : accent + '66'}
                  stroke={isSel ? accent : 'transparent'}
                  strokeWidth={isSel ? 2 : 0}
                />
                <SvgText x={x + (barW - 12) / 2} y={baseY + 14} fill={colors.text2} fontSize={12} fontWeight="bold" textAnchor="middle">{labels[i]}</SvgText>
                {isSel && (
                  <>
                    <Rect x={x + (barW - 12) / 2 - 22} y={baseY - barH - 22} width={44} height={18} rx={4} fill={accent} />
                    <SvgText x={x + (barW - 12) / 2} y={baseY - barH - 9} fill={colors.bg} fontSize={11} fontWeight="bold" textAnchor="middle">{pct}%</SvgText>
                  </>
                )}
              </G>
            );
          })}

          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap a bar to see its percentage</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 9. Unit Rate Compare: tap to toggle between rate comparisons ────────────
export function UnitRateCompareViz({ accent }: VizProps) {
  const [showSecond, setShowSecond] = useState(false);

  const tap = Gesture.Tap().onEnd(() => runOnJS(setShowSecond)(!showSecond));

  const tapeY = 50;
  const tapeH = 40;
  const tapeW = W - 80;
  const cx = W / 2;

  const product1 = { qty: 3, price: 6, rate: 2.0 };
  const product2 = { qty: 5, price: 8, rate: 1.6 };
  const highlighted = showSecond ? product2 : product1;
  const other = showSecond ? product1 : product2;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={cx} y={22} fill={colors.text2} fontSize={13} fontWeight="bold" textAnchor="middle">Unit Rate Comparison</SvgText>

          {/* Product 1 tape */}
          <SvgText x={40} y={tapeY - 5} fill={!showSecond ? accent : colors.text3} fontSize={11} fontWeight="bold">
            {product1.qty} for ${product1.price}
          </SvgText>
          <Rect x={40} y={tapeY} width={tapeW} height={tapeH} rx={6} fill={colors.surface2} stroke={!showSecond ? accent : colors.border} strokeWidth={!showSecond ? 2 : 1} />
          {Array.from({ length: product1.qty }, (_, i) => {
            const segW = tapeW / product1.qty;
            return (
              <G key={`p1${i}`}>
                <Rect x={40 + i * segW + 1} y={tapeY + 1} width={segW - 2} height={tapeH - 2} rx={4} fill={!showSecond ? accent + '55' : colors.surface2} />
                {i > 0 && <Line x1={40 + i * segW} y1={tapeY} x2={40 + i * segW} y2={tapeY + tapeH} stroke={!showSecond ? accent + '33' : colors.border} strokeWidth={1} />}
                <SvgText x={40 + i * segW + segW / 2} y={tapeY + tapeH / 2 + 5} fill={!showSecond ? accent : colors.text3} fontSize={12} fontWeight="bold" textAnchor="middle">${product1.rate.toFixed(2)}</SvgText>
              </G>
            );
          })}

          {/* Product 2 tape */}
          <SvgText x={40} y={tapeY + tapeH + 28} fill={showSecond ? accent : colors.text3} fontSize={11} fontWeight="bold">
            {product2.qty} for ${product2.price}
          </SvgText>
          <Rect x={40} y={tapeY + tapeH + 32} width={tapeW} height={tapeH} rx={6} fill={colors.surface2} stroke={showSecond ? accent : colors.border} strokeWidth={showSecond ? 2 : 1} />
          {Array.from({ length: product2.qty }, (_, i) => {
            const segW = tapeW / product2.qty;
            return (
              <G key={`p2${i}`}>
                <Rect x={40 + i * segW + 1} y={tapeY + tapeH + 33} width={segW - 2} height={tapeH - 2} rx={4} fill={showSecond ? accent + '55' : colors.surface2} />
                {i > 0 && <Line x1={40 + i * segW} y1={tapeY + tapeH + 32} x2={40 + i * segW} y2={tapeY + 2 * tapeH + 32} stroke={showSecond ? accent + '33' : colors.border} strokeWidth={1} />}
                <SvgText x={40 + i * segW + segW / 2} y={tapeY + tapeH + 32 + tapeH / 2 + 5} fill={showSecond ? accent : colors.text3} fontSize={12} fontWeight="bold" textAnchor="middle">${product2.rate.toFixed(2)}</SvgText>
              </G>
            );
          })}

          {/* Comparison result */}
          <SvgText x={cx} y={tapeY + 2 * tapeH + 62} fill={accent} fontSize={14} fontWeight="bold" textAnchor="middle">
            Unit rate: ${highlighted.rate.toFixed(2)}/each
          </SvgText>
          <SvgText x={cx} y={tapeY + 2 * tapeH + 80} fill={colors.green} fontSize={12} textAnchor="middle">
            {product2.rate < product1.rate ? '5 for $8 is the better deal!' : '3 for $6 is the better deal!'}
          </SvgText>

          <SvgText x={W / 2} y={H - 4} fill={colors.text3} fontSize={11} textAnchor="middle">tap to switch highlighted product</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 10. Scale Drawing: pan to scale a shape ─────────────────────────────────
export function ScaleDrawingViz({ accent }: VizProps) {
  const baseW = 40;
  const baseH = 30;
  const sliderLeft = 60;
  const sliderRight = W - 60;
  const sliderY = H - 30;

  const sliderX = useSharedValue(sliderLeft + (sliderRight - sliderLeft) * 0.25);
  const startSX = useSharedValue(0);

  const [scaleFactor, setScaleFactor] = useState(1.5);

  const updateScale = (px: number) => {
    const t = (px - sliderLeft) / (sliderRight - sliderLeft);
    setScaleFactor(Math.round((1 + t * 2) * 10) / 10);
  };

  const pan = Gesture.Pan()
    .onBegin(() => { startSX.value = sliderX.value; })
    .onUpdate(e => {
      sliderX.value = clamp(startSX.value + e.translationX, sliderLeft, sliderRight);
      runOnJS(updateScale)(sliderX.value);
    });

  const thumbProps = useAnimatedProps(() => ({
    cx: sliderX.value,
  }));

  const cx = W / 2;
  const shapeY = 40;

  // Original (on the left)
  const origX = 50;
  const origY = shapeY + 20;

  // Scaled (on the right, centered)
  const scaledW = baseW * scaleFactor;
  const scaledH = baseH * scaleFactor;
  const scaledX = cx + 30;
  const scaledY = shapeY + 20;

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={cx} y={18} fill={colors.text2} fontSize={13} fontWeight="bold" textAnchor="middle">Scale Drawing</SvgText>

          {/* Original rectangle */}
          <SvgText x={origX + baseW / 2} y={origY - 6} fill={colors.text3} fontSize={10} textAnchor="middle">Original</SvgText>
          <Rect x={origX} y={origY} width={baseW} height={baseH} rx={3} fill={accent + '33'} stroke={accent} strokeWidth={1.5} />
          <SvgText x={origX + baseW / 2} y={origY + baseH + 14} fill={colors.text3} fontSize={9} textAnchor="middle">{baseW}×{baseH}</SvgText>

          {/* Arrow */}
          <SvgText x={cx} y={origY + baseH / 2 + 5} fill={colors.text3} fontSize={18} textAnchor="middle">→</SvgText>
          <SvgText x={cx} y={origY + baseH / 2 + 20} fill={accent} fontSize={11} fontWeight="bold" textAnchor="middle">×{scaleFactor.toFixed(1)}</SvgText>

          {/* Scaled rectangle */}
          <SvgText x={scaledX + scaledW / 2} y={scaledY - 6} fill={accent} fontSize={10} fontWeight="bold" textAnchor="middle">Scaled</SvgText>
          <Rect x={scaledX} y={scaledY} width={scaledW} height={scaledH} rx={3} fill={accent + '22'} stroke={accent} strokeWidth={2} />
          <SvgText x={scaledX + scaledW / 2} y={scaledY + scaledH + 14} fill={accent} fontSize={10} textAnchor="middle">
            {Math.round(baseW * scaleFactor)}×{Math.round(baseH * scaleFactor)}
          </SvgText>

          {/* Scale factor slider */}
          <SvgText x={sliderLeft - 8} y={sliderY + 4} fill={colors.text3} fontSize={10} textAnchor="end">1×</SvgText>
          <Line x1={sliderLeft} y1={sliderY} x2={sliderRight} y2={sliderY} stroke={colors.border2} strokeWidth={3} />
          <SvgText x={sliderRight + 8} y={sliderY + 4} fill={colors.text3} fontSize={10}>3×</SvgText>

          {/* Slider tick marks */}
          {[1.0, 1.5, 2.0, 2.5, 3.0].map(v => {
            const t = (v - 1) / 2;
            const x = sliderLeft + t * (sliderRight - sliderLeft);
            return <Line key={v} x1={x} y1={sliderY - 4} x2={x} y2={sliderY + 4} stroke={colors.text3} strokeWidth={1} />;
          })}

          <AnimatedCircle cy={sliderY} r={10} fill={accent} stroke={colors.bg} strokeWidth={2} animatedProps={thumbProps} />

          <SvgText x={cx} y={sliderY + 20} fill={colors.text3} fontSize={11} textAnchor="middle">drag to change scale factor</SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 11. Interest Growth: pan time slider, watch money grow ──────────────────
export function InterestGrowthViz({ accent }: VizProps) {
  const principal = 100;
  const rate = 0.10;

  const sliderLeft = 50;
  const sliderRight = W - 50;
  const sliderY = H - 30;

  const sliderX = useSharedValue(sliderLeft);
  const startSX = useSharedValue(0);

  const [years, setYears] = useState(0);

  const updateYears = (px: number) => {
    const t = (px - sliderLeft) / (sliderRight - sliderLeft);
    setYears(Math.round(t * 5));
  };

  const pan = Gesture.Pan()
    .onBegin(() => { startSX.value = sliderX.value; })
    .onUpdate(e => {
      const raw = clamp(startSX.value + e.translationX, sliderLeft, sliderRight);
      // Snap to year positions
      const step = (sliderRight - sliderLeft) / 5;
      sliderX.value = sliderLeft + Math.round((raw - sliderLeft) / step) * step;
      runOnJS(updateYears)(sliderX.value);
    });

  const thumbProps = useAnimatedProps(() => ({
    cx: sliderX.value,
  }));

  const amount = principal + principal * rate * years;
  const interest = principal * rate * years;

  const barX = 50;
  const barMaxH = H - 85;
  const barW = W - 100;
  const maxAmount = principal + principal * rate * 5; // $150

  const principalH = (principal / maxAmount) * barMaxH;
  const interestH = (interest / maxAmount) * barMaxH;
  const totalH = principalH + interestH;
  const barBaseY = H - 55;

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={18} fill={colors.text2} fontSize={12} fontWeight="bold" textAnchor="middle">Simple Interest: P=$100, r=10%</SvgText>

          {/* Money bar */}
          {/* Principal portion */}
          <Rect
            x={barX}
            y={barBaseY - principalH}
            width={barW}
            height={principalH}
            rx={0}
            fill={accent + '55'}
          />
          <SvgText x={barX + barW / 2} y={barBaseY - principalH / 2 + 5} fill={colors.text2} fontSize={12} fontWeight="bold" textAnchor="middle">
            Principal: ${principal}
          </SvgText>

          {/* Interest portion (stacked on top) */}
          {interestH > 0 && (
            <>
              <Rect
                x={barX}
                y={barBaseY - totalH}
                width={barW}
                height={interestH}
                rx={0}
                fill={colors.green + '66'}
              />
              {interestH > 18 && (
                <SvgText x={barX + barW / 2} y={barBaseY - principalH - interestH / 2 + 5} fill={colors.green} fontSize={12} fontWeight="bold" textAnchor="middle">
                  Interest: ${interest}
                </SvgText>
              )}
            </>
          )}

          {/* Outline */}
          <Rect x={barX} y={barBaseY - totalH} width={barW} height={totalH} rx={4} fill="transparent" stroke={accent} strokeWidth={1.5} />

          {/* Total label */}
          <SvgText x={barX + barW + 4} y={barBaseY - totalH + 4} fill={accent} fontSize={13} fontWeight="bold">
            ${amount}
          </SvgText>

          {/* Year slider */}
          <Line x1={sliderLeft} y1={sliderY} x2={sliderRight} y2={sliderY} stroke={colors.border2} strokeWidth={3} />
          {[0, 1, 2, 3, 4, 5].map(y => {
            const x = sliderLeft + (y / 5) * (sliderRight - sliderLeft);
            return (
              <G key={y}>
                <Line x1={x} y1={sliderY - 5} x2={x} y2={sliderY + 5} stroke={colors.text3} strokeWidth={1.5} />
                <SvgText x={x} y={sliderY + 16} fill={colors.text3} fontSize={9} textAnchor="middle">Yr {y}</SvgText>
              </G>
            );
          })}

          <AnimatedCircle cy={sliderY} r={10} fill={accent} stroke={colors.bg} strokeWidth={2} animatedProps={thumbProps} />
        </Svg>
      </View>
    </GestureDetector>
  );
}

// ── 12. Absolute Value Fold: tap to fold number line at zero ────────────────
export function AbsoluteValueFoldViz({ accent }: VizProps) {
  const [folded, setFolded] = useState(false);
  const [pointVal, setPointVal] = useState(-3);

  const tap = Gesture.Tap().onEnd(() => {
    if (folded) {
      // Unfold and pick a new value
      runOnJS(setFolded)(false);
      const nextVals = [-4, -2, -1, -3, -5];
      const idx = nextVals.indexOf(pointVal);
      runOnJS(setPointVal)(nextVals[(idx + 1) % nextVals.length]);
    } else {
      runOnJS(setFolded)(true);
    }
  });

  const left = 40;
  const right = W - 40;
  const cy = H / 2 - 10;
  const range = 10; // -5 to 5
  const step = (right - left) / range;
  const zeroX = left + 5 * step;

  const pointX = left + (pointVal + 5) * step;
  const absVal = Math.abs(pointVal);
  const foldedX = zeroX + absVal * step;

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Svg width={W} height={H}>
          <SvgText x={W / 2} y={22} fill={colors.text2} fontSize={13} fontWeight="bold" textAnchor="middle">Absolute Value: Distance from 0</SvgText>

          {/* Number line */}
          <Line x1={left} y1={cy} x2={right} y2={cy} stroke={colors.border2} strokeWidth={2} />

          {/* Tick marks */}
          {Array.from({ length: 11 }, (_, i) => {
            const n = i - 5;
            const x = left + i * step;
            const isNeg = n < 0;
            // When folded, dim the negative side
            const opacity = folded && isNeg ? 0.2 : 1;
            return (
              <G key={n} opacity={opacity}>
                <Line x1={x} y1={cy - 8} x2={x} y2={cy + 8} stroke={n === 0 ? colors.text2 : colors.text3} strokeWidth={n === 0 ? 2.5 : 1} />
                <SvgText x={x} y={cy + 24} fill={n === 0 ? colors.text2 : colors.text3} fontSize={10} textAnchor="middle">{n}</SvgText>
              </G>
            );
          })}

          {/* Zero label */}
          <SvgText x={zeroX} y={cy - 16} fill={accent} fontSize={11} fontWeight="bold" textAnchor="middle">0</SvgText>

          {/* When not folded: show point at its original position */}
          {!folded && (
            <>
              <Circle cx={pointX} cy={cy} r={9} fill={accent} />
              <SvgText x={pointX} y={cy - 16} fill={accent} fontSize={12} fontWeight="bold" textAnchor="middle">{pointVal}</SvgText>

              {/* Distance bracket */}
              <Line x1={pointX} y1={cy + 35} x2={zeroX} y2={cy + 35} stroke={accent + '66'} strokeWidth={2} />
              <Line x1={pointX} y1={cy + 30} x2={pointX} y2={cy + 40} stroke={accent + '66'} strokeWidth={1.5} />
              <Line x1={zeroX} y1={cy + 30} x2={zeroX} y2={cy + 40} stroke={accent + '66'} strokeWidth={1.5} />
              <SvgText x={(pointX + zeroX) / 2} y={cy + 52} fill={colors.text3} fontSize={10} textAnchor="middle">distance = ?</SvgText>
            </>
          )}

          {/* When folded: show the "fold" and point on positive side */}
          {folded && (
            <>
              {/* Fold arc from negative to positive */}
              <Path
                d={`M${pointX},${cy} Q${(pointX + zeroX) / 2},${cy - 55} ${zeroX},${cy - 2}`}
                fill="transparent"
                stroke={accent + '55'}
                strokeWidth={1.5}
                strokeDasharray="4,3"
              />
              <Path
                d={`M${zeroX},${cy - 2} Q${(zeroX + foldedX) / 2},${cy - 55} ${foldedX},${cy}`}
                fill="transparent"
                stroke={accent + '55'}
                strokeWidth={1.5}
                strokeDasharray="4,3"
              />

              {/* Original position (ghost) */}
              <Circle cx={pointX} cy={cy} r={9} fill={accent + '33'} stroke={accent + '44'} strokeWidth={1} />

              {/* Folded position */}
              <Circle cx={foldedX} cy={cy} r={9} fill={accent} stroke={colors.bg} strokeWidth={2} />
              <SvgText x={foldedX} y={cy - 16} fill={accent} fontSize={12} fontWeight="bold" textAnchor="middle">{absVal}</SvgText>

              {/* Distance bracket */}
              <Line x1={zeroX} y1={cy + 35} x2={foldedX} y2={cy + 35} stroke={accent} strokeWidth={2} />
              <Line x1={zeroX} y1={cy + 30} x2={zeroX} y2={cy + 40} stroke={accent} strokeWidth={1.5} />
              <Line x1={foldedX} y1={cy + 30} x2={foldedX} y2={cy + 40} stroke={accent} strokeWidth={1.5} />
              <SvgText x={(zeroX + foldedX) / 2} y={cy + 52} fill={accent} fontSize={11} fontWeight="bold" textAnchor="middle">|{pointVal}| = {absVal}</SvgText>

              {/* Fold label */}
              <SvgText x={zeroX} y={cy - 55} fill={colors.text2} fontSize={11} textAnchor="middle">fold!</SvgText>
            </>
          )}

          <SvgText x={W / 2} y={H - 6} fill={colors.text3} fontSize={11} textAnchor="middle">
            {folded ? 'tap to unfold and try another value' : 'tap to fold the number line at zero'}
          </SvgText>
        </Svg>
      </View>
    </GestureDetector>
  );
}
