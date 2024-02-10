const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: '#f7184e',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['Trash', ...defaultTheme.fontFamily.sans],
        serif: ['Trash', ...defaultTheme.fontFamily.serif],
        heading: ['Concert One', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        fadein: 'fadein 1s forwards',
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        noise:
          "url('https://webflow-files-prod.global.ssl.fastly.net/647d7a596d3b30dafe7f7d07/647d7b5e1383c7b582a4ff02_grain-tile_500x500.webp')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
