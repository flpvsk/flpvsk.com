const serif = 'georgia, times, serif';
const mono = '"Roboto Mono", monospace';
const sansSerif =
  '"Roboto Condensed", roboto, -apple-system, ubuntu, arial, sans-serif';

export default {
  breakpoints: [420, 800, 1200],
  space: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72],

  fonts: {
    serif,
    sansSerif,
    mono,
  },

  colors: {
    black: '#050505',
    primary: '#F6E452',
    secondary: '#FF9F9F',
    secondaryDark: '#FF6B6B',
    blacks: [
      '#111',
      '#333',
      '#999',
      '#eee',
    ],
  },

  fontSize: [
    148,
    80,
    64,
  ],

  textStyles: {
    h1: {
      fontFamily: serif,
      fontSize: 148,
      lineHeight: 1.08,
      letterSpacing: 'normal',
      fontWeight: 'normal',
    },

    h2: {
      fontFamily: serif,
      fontSize: 80,
      lineHeight: 'auto',
      letterSpacing: '-0.35px',
      fontWeight: 'normal',
    },

    h3: {
      fontFamily: serif,
      fontSize: 64,
      lineHeight: 'auto',
      letterSpacing: '-0.28px',
      fontWeight: 'normal',
    },

    h4: {
      fontFamily: serif,
      fontSize: 32,
      lineHeight: 'auto',
      letterSpacing: '0.13px',
      fontWeight: 'normal',
    },

    body: {
      fontFamily: serif,
      fontSize: 21,
      lineHeight: '1.5em',
      letterSpacing: '-0.03px',
      fontWeight: 'normal',
    },

    bodyLarge: {
      fontFamily: serif,
      fontSize: 24,
      lineHeight: '1.5em',
      letterSpacing: '-0.06px',
      fontWeight: 'normal',
    },

    caption: {

    },

    captionLarge: {

    },

    code: {
      fontFamily: mono,
      fontSize: 21,
      lineHeight: '1.5em',
      fontWeight: 'normal',
    },
  },
};
