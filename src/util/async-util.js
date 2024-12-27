module.exports = {
  wait,
};

async function wait(timeout) {
  if (typeof timeout !== 'number' || timeout < 0) {
    throw new Error(`Wrong timeout: ${timeout}`);
  }
  return new Promise(res => {
    setTimeout(res, timeout);
  });
}
