const { Opacity } = require('@mui/icons-material');

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: false,
  prefix: 'tw-',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      pre: ['Pretendard'],
    },
    extend: {
      gridTemplateRows: {
        'table-layout': 'repeat(6, minmax(0, 40px))'
      },
      keyframes: {
        blink: {
          '0%, 100%': { Opacity: 1},
          '50%': {Opacity: 0.5},
        },
      },
      animation: {
        blink: 'blink 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
