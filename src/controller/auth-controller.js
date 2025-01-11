const { saveSession, getUsername, removeSession } = require('../session');

const VALID_CREDENTIALS = {
  tester: '123',
  dev: '321',
};

module.exports = { authenticate, username, logout };

async function authenticate(req, res) {
  const { username, password } = req.body;
  if (areValidCredentials(username, password)) {
    const sessionId = crypto.randomUUID();
    await saveSession(username, sessionId);
    res
      .set('Set-Cookie', `session-id=${sessionId}`)
      .send({ authenticated: true });
    return;
  }
  res.status(401).send({ error: 'wrong credentials' });
}

async function username(req, res) {
  const sessionId = req.headers.cookie.split('=')[1];
  const username = await getUsername(sessionId);
  res.send({ username });
}

function areValidCredentials(username, password) {
  return VALID_CREDENTIALS[username] === password;
}

async function logout(req, res){
  removeSession(req.query.username);
  res.redirect('/');
}
