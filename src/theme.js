import { Platform } from 'react-native';

const theme = {
  colors: {
    barBackground: '#24292e',
    barText: '#ffffff',
    containerBackground: '#ffffff',
    delete: '#d73a4a',
    error: '#d73a4a',
    primary: '#0366d6',
    textPrimary: '#24292e',
    textSecondary: '#586069',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'sans-serif',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
