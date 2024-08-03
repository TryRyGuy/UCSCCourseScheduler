/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        topNavBlue: '#01589D',
        topNavYellow: '#F1AF13',
        LogButtonBlue: '#162DA3',
        sideNavGrey1: "#D2C4AE",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      scale: ['hover', 'focus'],
      visibility: ['hover'],
      textColor: ['hover'],
      padding: ['hover'],
      transitionProperty: ['hover'],
    },
  },
  plugins: [],
}


