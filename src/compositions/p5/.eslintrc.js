module.exports = {
  plugins: ['p5js'],
  env: {
    browser: true,
    es6: true,
    'p5js/p5': true,
  },
  extends: ['eslint:recommended', 'plugin:p5js/p5'],
};
