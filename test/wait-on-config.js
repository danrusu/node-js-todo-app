const authorization = require('./auth').getAuthorization();

module.exports = {
  resources: ['http://localhost:1112/api/health-check'],
  headers: {
    authorization,
  },
  delay: 500, // initial delay in ms, default 0
  interval: 500, // poll interval in ms, default 250ms
  timeout: 10_000, // timeout in ms, default Infinity
};
