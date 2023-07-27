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
        primary: '#FF9900',
        primaryLight: '#FFA31B',
        primarySuperLight: '#FFAF39',
        secondary: '#B5CEFF',
        secondaryLight: '#D3E2FF',
        secondarySuperLight: '#F2F6FF',
        tertiary: '#FDFAF6',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(0px)' },
          '70%': { transform: 'translateY(-2.5px)' },
          '80%': { transform: 'translateY(0px)' },
          '90%': { transform: 'translateY(-1px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        shake: 'shake 3s ease-in-out',
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
        popupBg: '100',
        popup: '101',
        overlay: '102',
        headerFooter: '103',
        nav: '104',
        sideMenu: '105',
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
        '1/3': '33.333333%',
      },
      minHeight: {
        300: '300px',
        500: '500px',
        600: '600px',
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
      padding: {
        full: '100%',
        double: '200%',
      },
      boxShadow: {
        innerXl: 'inset 0 0 20px 0 rgba(0, 0, 0, 0.25)',
        inner3xl: 'inset 2px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        glow: '0 0 10px 5px rgba(255,215,0, 0.6)', // Change color and size as needed
      },
    },
  },
  plugins: [],
}
