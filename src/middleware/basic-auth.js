module.exports = { basicAuth };

function basicAuth(req, res, next) {
  if (req.url.startsWith('/login')) {
    next();
    return;
  }
  const auth = { username: 'tester', password: '123' }; // this should not be in the code :)

  const { username, password } = parseBasicAuthenticationHeader(req);

  if (!username || !password) {
    denyAccess(req, res);
    return;
  }

  // Verify login and password are set and correct
  if (validCredentials({ username, password }, auth)) {
    // access granted
    return next();
  }

  denyAccess(req, res);
}

function parseBasicAuthenticationHeader(req) {
  // Authorization: 'Basic base64('username:password')
  const [authorizationType, base64Authorization] = (
    req.headers.authorization || ''
  ).split(' ');

  if (authorizationType !== 'Basic') {
    return {};
  }

  const decodedAuthorization = Buffer.from(
    base64Authorization,
    'base64',
  ).toString();

  const [username, password] = decodedAuthorization.split(':');

  return { username, password };
}

function validCredentials(auth, expectedAuth) {
  return (
    auth.username === expectedAuth.username &&
    auth.password === expectedAuth.password
  );
}

function denyAccess(req, res) {
  if (req.url.includes('/api')) {
    res.send('401', 'Not authenticated');
  } else {
    res.redirect('/login');
  }
}
