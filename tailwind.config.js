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
    extend: {
      translate: {
        '100vw': '100vw'
      },
      zIndex: {
        '1000': '1000'
      },
      width: {
        '500': '500px'
      }
    },
  },
  plugins: [],
}
