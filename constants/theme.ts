export const colors = {
  bg: '#0e0d0c',
  surface: '#161513',
  surface2: '#1e1c19',
  surface3: '#252320',
  border: '#2c2924',
  border2: '#353028',
  gold: '#c9a96e',
  goldDim: 'rgba(201,169,110,0.15)',
  blue: '#5ba8d4',
  blueDim: 'rgba(91,168,212,0.12)',
  green: '#6bbda0',
  greenDim: 'rgba(107,189,160,0.12)',
  rose: '#d47878',
  roseDim: 'rgba(212,120,120,0.12)',
  text: '#e8e3d9',
  text2: '#9a9288',
  text3: '#5a5450',
  // Tier accent colors
  tier1: '#6bbda0',
  tier2: '#6bbda0',
  tier3: '#5ba8d4',
  tier4: '#5ba8d4',
  tier5: '#c9a96e',
  tier6: '#c9a96e',
  tier7: '#d47878',
  tier8: '#d47878',
} as const;

export const typography = {
  serif: 'PlayfairDisplay-Bold',
  serifItalic: 'PlayfairDisplay-Italic',
  body: 'Lora-Regular',
  bodyMedium: 'Lora-Medium',
  mono: 'JetBrainsMono-Regular',
  monoBold: 'JetBrainsMono-Bold',
} as const;

export const fontSizes = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 30,
  xxxl: 36,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

export const tierColor = (tierId: number): string => {
  const key = `tier${tierId}` as keyof typeof colors;
  return colors[key] ?? colors.gold;
};
