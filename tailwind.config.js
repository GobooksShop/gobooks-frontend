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
        'table-layout': 'repeat(6, minmax(0, 40px))',
        'table-layout-5': 'repeat(5, minmax(0, 40px))',
        'table-layout-4': 'repeat(4, minmax(0, 40px))',
        'table-layout-3': 'repeat(3, minmax(0, 40px))',
        'table-layout-2': 'repeat(2, minmax(0, 40px))',
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
