/**
 * Shared utilities, animated components, and constants for all visualizations.
 */
import { Dimensions } from 'react-native';
import { Circle, Line, Rect } from 'react-native-svg';
import Animated from 'react-native-reanimated';

export const W = Dimensions.get('window').width - 40;
export const H = 220;

export const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export const AnimatedLine = Animated.createAnimatedComponent(Line);
export const AnimatedRect = Animated.createAnimatedComponent(Rect);

export interface VizProps {
  accent: string;
}
