const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/**/*.js'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily:{
      'display': ["Montserrat",...defaultTheme.fontFamily.sans]
    },
    extend: {
      gridTemplateColumns: {
        'admin-table': 'repeat(3, 3fr) 2fr',
      },
      padding: {
        '1/3': '33.33333%',
        '9/16': '56.25%',
        '2/3': '66.66667%',
        'full': '100%'
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
