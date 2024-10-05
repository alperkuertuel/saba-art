module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "font-color": "var(--font-color)",
        "secondary-color": "var(--secondary-color)",
        "tertiary-color": "var(--tertiary-color)",
        "box-color": "var(--box-color)",
        "box-shadow": "var(--box-shadow)",
        "cool-brown": "var(--cool-brown)",
        "highlight-color": "var(--highlight-color)",
      },
    },
  },
  plugins: [],
};
