const runtimeCaching = require('next-pwa/cache');

module.exports = {
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
};
