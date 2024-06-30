const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  swcMinify: true,
  compiler: {
    emotion: true
  },
});
