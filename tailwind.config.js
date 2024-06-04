/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: true,
  prefix: 'tw-',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      pre: ['Pretendard'],
    },
    extend: {},
  },
  plugins: [],
};
