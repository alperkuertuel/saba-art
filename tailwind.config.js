module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'font-color': 'var(--font-color)',
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'tertiary-color': 'var(--tertiary-color)',
        'cool-color': 'var(--cool-color)',
        'highlight-color': 'var(--highlight-color)',
        'box-color': 'var(--box-color)',
        'box-style': 'var(--box-style)',
      },
    },
  },
  plugins: [],
};
