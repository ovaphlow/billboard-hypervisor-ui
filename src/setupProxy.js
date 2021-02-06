// eslint-disable-next-line
const proxy = require('http-proxy-middleware');

// eslint-disable-next-line
module.exports = (app) => {
  app.use(
    proxy('/api', {
      target: 'http://127.0.0.1:5000',
    }),
  );
};
