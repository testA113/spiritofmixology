const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: '#ff812e',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['Trash', ...defaultTheme.fontFamily.sans],
        serif: ['Trash', ...defaultTheme.fontFamily.serif],
        heading: ['Concert One', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        jiggle1: 'jiggle1 0.33s infinite',
        jiggle2: 'jiggle2 0.4s infinite',
        marquee: 'marquee 20s linear infinite',
        'merquee-reverse': 'merquee-reverse 20s linear infinite',
      },
      keyframes: {
        jiggle1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(5px, 0) rotate(-4deg)' },
          '50%': { transform: 'translate(0, -5px) rotate(3deg)' },
          '75%': { transform: 'translate(-5px, 0) rotate(6deg)' },
        },
        jiggle2: {
          '0%, 100%': { transform: 'translate(0, 3) rotate(0deg)' },
          '25%': { transform: 'translate(-5px, 3px) rotate(3deg)' },
          '50%': { transform: 'translate(2px, -5px) rotate(-2deg)' },
          '75%': { transform: 'translate(5px, -2px) rotate(4deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(calc(-100% - 2rem))' },
        },
        'merquee-reverse': {
          '0%': { transform: 'translateX(calc(-100% - 2rem))' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      scale: {
        '-100': '-1',
      },
      backgroundImage: {
        noise:
          "url('https://webflow-files-prod.global.ssl.fastly.net/647d7a596d3b30dafe7f7d07/647d7b5e1383c7b582a4ff02_grain-tile_500x500.webp')",
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
