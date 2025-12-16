module.exports = {
  '*.{js,jsx,ts,tsx,mjs}': ['eslint --fix --no-warn-ignored'],
  '**/*.ts?(x)': () => 'npm run check-types',
};
