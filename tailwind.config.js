module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue)-/,
    },
    {
      pattern: /group-hover:text-(red|green|blue)-/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
