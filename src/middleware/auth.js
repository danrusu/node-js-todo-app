const { getUsername } = require('../session');

module.exports = { authMiddleware };

async function authMiddleware(req, res, next) {
  const isAuthRequest = req.url.startsWith('/login');
  const isUserAuthenticated = await isAuthenticated(req);

  if (isAuthRequest || isUserAuthenticated) {
    // allow access
    return next();
  }

  denyAccess(req, res);
}

async function isAuthenticated(req) {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return false;
  }
  const sessionId = cookie.split('=')?.[1];
  const username = await getUsername(sessionId);
  return username != undefined;
}

function denyAccess(req, res) {
  const isApiRequest = req.url.includes('/api');
  if (isApiRequest) {
    res.send('401', 'Not authenticated');
  } else {
    res.redirect('/login');
  }
}
