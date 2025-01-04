const { saveSession } = require('../session');

module.exports = { authenticate };

async function authenticate(req, res) {
  const sessionId = crypto.randomUUID();
  const { username, password } = req.body;
  // validate password
  await saveSession(username, sessionId);
  res
    .set('Set-Cookie', `session-id=${sessionId}`)
    .send({ authenticated: true });
}
