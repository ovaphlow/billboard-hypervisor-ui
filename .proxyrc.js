const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/miscellaneous/favorite', {
      target: 'http://localhost:8421/',
    }),
  );
  app.use(
    createProxyMiddleware('/api/miscellaneous/feedback', {
      target: 'http://localhost:8421/',
    }),
  );
  app.use(
    createProxyMiddleware('/api/miscellaneous/journal', {
      target: 'http://localhost:8421/',
    }),
  );
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8080/',
    }),
  );
};
