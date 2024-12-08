const express = require('express');
const app = express();
const path = require('path');

const {
  getAll,
  getTodo,
  deleteTodo,
  createTodo,
  updateTodo,
} = require('./dataController');

// middlewares
app.use(express.json());
app.use(express.static('src/html'));
app.use(basicAuthenticationMidleware);

// routes
app.get('/', serveHome);

app.get('/api/health-check', isHealthy);
app.get('/api/todo', getAll);
app.get('/api/todo/:id', getTodo);
app.post('/api/todo', createTodo);
app.put('/api/todo/:id', updateTodo);
app.delete('/api/todo', deleteTodo);

// ********** functions
function serveHome(_, res) {
  serveFileFromRoot(res, 'index.html');
}

function serveFileFromRoot(res, relativePath) {
  res.sendFile(path.join(__dirname, relativePath));
}

function isHealthy(_, res) {
  res.send({ status: 'healthy' });
}

function basicAuthenticationMidleware(req, res, next) {
  const auth = { username: 'tester', password: '12345' }; // this should not be in the code :)

  const validCredentials = (username, password) =>
    username === auth.username && password === auth.password;

  const { username, password } = parseBasicAuthenticationHeader(req);

  if (!username || !password) {
    denyAccess(res);
    return;
  }

  // Verify login and password are set and correct
  if (validCredentials(username, password)) {
    // access granted
    return next();
  }

  denyAccess(res);
}

function denyAccess(res) {
  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');
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

module.exports = { app };
