const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(
  //   createProxyMiddleware('/api/miscellaneous', {
  //     target: 'http://localhost:8421/',
  //   }),
  // );
  // app.use(
  //   createProxyMiddleware('/api', {
  //     target: 'http://localhost:8081/',
  //   }),
  // );
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8421/',
    }),
  );
};
