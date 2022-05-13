module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'nav-link': '1.6rem',
      }
      ,spacing: {
        'note-w': '20rem',
      },  screens: {
        'mobile': '140px',
        // => @media (min-width: 640px) { ... }
      },
    },
  },
  plugins: [],
};
