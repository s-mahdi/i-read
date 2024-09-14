const path = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.ts'),
    },
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
    autoprefixer: {},
  },
};
