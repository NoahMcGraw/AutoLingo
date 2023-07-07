module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
      colors: {
        primary: '#152D5A',
        primaryLight: '#1f4283',
        secondary: '#5ec64f',
        secondaryLight: '#7edc6c',
        tertiary: '#fafdf6',
      },
      translate: {
        '100vw': '100vw',
      },
      zIndex: {
        200: '200',
        1000: '1000',
      },
      width: {
        500: '500px',
        '10v': '10vw',
        '20v': '20vw',
        '30v': '30vw',
        '40v': '40vw',
        '50v': '50vw',
        '60v': '60vw',
        '70v': '70vw',
        '80v': '80vw',
        '90v': '90vw',
        '100v': '100vw',
      },
      height: {
        '10v': '10vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh',
      },
      minWidth: {
        100: '100px',
      },
    },
  },
  plugins: [],
}
