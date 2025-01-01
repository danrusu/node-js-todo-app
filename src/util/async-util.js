module.exports = {
  wait,
};

async function wait(timeout) {
  const timeoutNr = parseInt(timeout);
  if (isNaN(timeoutNr) || timeout < 0) {
    throw new Error(`Wrong timeout: ${timeout}`);
  }
  return new Promise(res => {
    setTimeout(res, timeout);
  });
}
