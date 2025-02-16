const port = process.env.PORT || 1112;

module.exports = {
  resources: [`http://localhost:${port}/api/health-check`],
  delay: 500, // initial delay in ms, default 0
  interval: 500, // poll interval in ms, default 250ms
  timeout: 10_000, // timeout in ms, default Infinity
};
