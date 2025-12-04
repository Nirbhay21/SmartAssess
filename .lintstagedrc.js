const path = require('path');

const buildEslintCommand = (filenames) => {
  return `eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`;
};

const buildPrettierCommand = (filenames) => {
  return `prettier --write ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`;
};

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],
  '*.{json,css,scss,md,mjs}': [buildPrettierCommand],
};
