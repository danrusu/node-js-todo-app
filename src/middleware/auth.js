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
  const sessionId = req.cookies?.['session-id']; // using cookie-parser middleware
  if (!sessionId) {
    return false;
  }
  const username = await getUsername(sessionId);
  return username != undefined;
}

function denyAccess(req, res) {
  const isApiRequest = req.url.includes('/api');
  if (isApiRequest) {
    res.status(401).send('Not authenticated');
  } else {
    res.redirect('/login');
  }
}
