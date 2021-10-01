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
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
