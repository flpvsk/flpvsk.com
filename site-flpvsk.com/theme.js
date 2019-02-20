const serif = 'georgia, times, serif';
const mono = '"Roboto Mono", monospace';
const sansSerif =
  '"Roboto Condensed", roboto, -apple-system, ubuntu, arial, sans-serif';

export default {
  breakpoints: ['26.25rem', '50rem', '62.5rem'],
  space: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
  minHeights: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80],

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

  fontSizes: [
    '1.062em',
    '1.188em',
    '1.312em',
    '1.5em',
    '2em',
    '3em',
    '4em',
    '5em',
    '9.25em',
  ],

  textStyles: {
    h1: {
      fontFamily: serif,
      // fontSize: 148,
      lineHeight: 1.08,
      letterSpacing: 'normal',
      fontWeight: 'normal',
    },

    h2: {
      fontFamily: serif,
      // fontSize: 80,
      lineHeight: 'auto',
      letterSpacing: '-0.004375em',
      fontWeight: 'normal',
    },

    h3: {
      fontFamily: serif,
      // fontSize: 64,
      lineHeight: 'auto',
      letterSpacing: '-0.004375em',
      fontWeight: 'normal',
    },

    h4: {
      fontFamily: serif,
      // fontSize: 32,
      lineHeight: 'auto',
      letterSpacing: '0.004em',
      fontWeight: 'normal',
    },

    body: {
      fontFamily: serif,
      // fontSize: 21,
      lineHeight: '1.5em',
      letterSpacing: '-0.001em',
      fontWeight: 'normal',
    },

    bodyLarge: {
      fontFamily: serif,
      // fontSize: 24,
      lineHeight: '1.5em',
      letterSpacing: '-0.001em',
      fontWeight: 'normal',
    },

    caption: {
      fontFamily: sansSerif,
      // fontSize: 16,
      lineHeight: 'normal',
      letterSpacing: 'normal',
      fontWeight: 'normal',
    },

    captionLarge: {
      fontFamily: sansSerif,
      // fontSize: 24,
      lineHeight: 'normal',
      letterSpacing: 'normal',
      fontWeight: 'normal',
    },

    code: {
      fontFamily: mono,
      // fontSize: 21,
      lineHeight: '1.5em',
      fontWeight: 'normal',
    },
  },
};
