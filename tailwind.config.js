module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /bg-(red|green|blue)-/,
    },
    {
      pattern: /text-(primary|primaryLight|primarySuperLight|secondary|secondaryLight|secondarySuperLight|tertiary)/,
    },
  ],
  theme: {
    fontFamily: {
      sans: ['Cairo', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#E29A2E',
        primaryLight: '#E4A548',
        primarySuperLight: '#E5AD5A',
        secondary: '#B5CEFF',
        secondaryLight: '#BFD5FF',
        secondarySuperLight: '#C9DBFF',
        tertiary: '#FDFAF6',
      },
      translate: {
        '100vw': '100vw',
      },
      scale: {
        flip: '-1',
      },
      zIndex: {
        200: '200',
        1000: '1000',
      },
      width: {
        225: '225px',
        300: '300px',
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
        225: '225px',
        300: '300px',
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
      minHeight: {
        300: '300px',
        '20vw': '20vw',
      },
      maxHeight: {
        300: '300px',
        500: '500px',
      },
      fontWeight: {
        extraLight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
        extraBold: '800',
        black: '900',
      },
    },
  },
  plugins: [],
}
