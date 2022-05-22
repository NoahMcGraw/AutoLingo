module.exports = {
  purge: {
    enabled: true,
    content: ["./dist/**/*.html"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
