module.exports = {
  content: ["../index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          950: '#0a0a0b',
          900: '#0f0f11',
          850: '#151517',
          800: '#1b1b1e',
          700: '#242428',
          600: '#3a3a40',
          400: '#8a8a92',
          200: '#d4d4d9',
          50:  '#fafafa',
        },
        accent: '#c9a463',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
}
