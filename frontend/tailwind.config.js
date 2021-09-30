module.exports = {
  purge: [
    './src/**/*.js'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'admin-table': 'repeat(3, 3fr) 2fr',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
