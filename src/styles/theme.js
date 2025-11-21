const COLORS = {
  primary: '#151F36',
  secondary: '#FF8A00',
  accent: '#FF8A00',

  // Base colors
  white: '#FFFFFF',
  lightGrey: '#E8ECF4',
  darkGrey: '#4A5568',
  black: '#000000',

  // Status
  error: '#E50A62',
  success: '#007a43',
  errorBackground: '#E50A620D',
  warning: '#FF644E',
  purple: '#873CFF',
};

const RADIUS = {
  text: 8,
  box: 16,
  button: 30,
  graphics: 50,
};

const SPACING = {
  xxs: 6,
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xlg: 36,
  xxlg: 48,
  xxxlg: 70,
};

const FONT_SIZE = {
  text: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
  },
  heading: {
    xxs: 14,
    xs: 16,
    sm: 18,
    md: 20,
    lg: 24,
    xlg: 36,
    xxlg: 120,
  },
};

const FONTS = {
  regular: 'Poppins',
  bold: 'Poppins_bold',
};

const DELIVERY_COLORS_BY_STATUS = {
  DELIVERED: '#FF8A00',
  ONSITE: '#0A1A44',
  TRANSIT: '#FF8A00',
  PRODUCTION: '#A8A8A8',
  NO_STATUS: '#E8ECF4',
};

export { COLORS, SPACING, RADIUS, FONT_SIZE, FONTS, DELIVERY_COLORS_BY_STATUS };
