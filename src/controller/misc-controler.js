const { wait } = require('../util/response-util');

module.exports = {
  delay,
  isHealthy,
};

async function delay(req, res) {
  try {
    if (req.method !== 'HEAD') {
      const delay = req.params.duration;
      await wait(delay);
    }
    res.send({ delayed: delay });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
}

function isHealthy(_, res) {
  res.send({ status: 'healthy' });
}
