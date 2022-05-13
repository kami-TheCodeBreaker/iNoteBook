module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],

  plugins: [require("tw-elements/dist/plugin")],
  theme: {
    extend: {
      fontSize: {
        "nav-link": "1.6rem",
      },
      spacing: {
        "note-w": "20rem",
      },
      screens: {},
    },
  },
};
