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
      }
    },
  },
  plugins: [],
};
