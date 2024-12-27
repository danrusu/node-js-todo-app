const { wait } = require('../util/async-util');

module.exports = {
  delay,
};

async function delay(req, res) {
  try {
    const delay = req.params.duration;
    await wait(delay);
    res.send({ delayed: delay });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
}
