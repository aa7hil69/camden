// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    "h-[64px]", "w-[64px]",
    "h-[70px]", "w-[70px]",
    "h-[80px]", "w-[80px]",
  ],
  theme: {
    extend: {
      fontFamily: {
        teko: ['Teko', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        centerGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        centerGrow: 'centerGrow 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
