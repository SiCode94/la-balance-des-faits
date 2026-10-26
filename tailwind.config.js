/** Thème Tailwind. Après avoir ajouté des classes dans le HTML ou le JS : npm run css */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: { extend: { colors: {
    ink:   { 950: '#0E1013', 900: '#14161A', 800: '#1C2026', 700: '#262B33', 600: '#3A414B' },
    brass: { 300: '#E6CC7A', 400: '#D9B44A', 500: '#C9A227' },
  } } },
};
