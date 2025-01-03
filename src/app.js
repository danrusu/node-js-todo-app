const express = require('express');
const { resolve } = require('path');
const { readFile, writeFile } = require('node:fs/promises');
const app = express();

const { basicAuth } = require('./middleware/basic-auth.js');
const {
  getAll,
  getTodo,
  deleteTodo,
  createTodo,
  updateTodo,
} = require('./controller/todo-controller.js');
const { delay } = require('./controller/misc-controler.js');
const { serveFileFromHtml } = require('./util/response-util.js');

// middlewares
app.use(express.json());
app.use(express.static('src/html/public'));
app.use(basicAuth);

// routes
app.get('/', serveHome);

app.get('/login', login);
app.post('/login', authenticate);

app.get('/api/health-check', isHealthy);
app.get('/api/todo', getAll);
app.get('/api/todo/:id', getTodo);
app.post('/api/todo', createTodo);
app.put('/api/todo/:id', updateTodo);
app.delete('/api/todo', deleteTodo);

app.get('/api/delay/:duration', delay);

// ********** functions
function isHealthy(_, res) {
  res.send({ status: 'healthy' });
}

function serveHome(_, res) {
  serveFileFromHtml(res, 'index.html');
}

function login(_, res) {
  serveFileFromHtml(res, 'login.html');
}

async function authenticate(req, res) {
  const sessionId = crypto.randomUUID();
  const { username, password } = req.body;
  // validate password
  await saveSession(username, sessionId);
  res.set('sessionId', sessionId).send({ authenticated: true });
}

async function saveSession(username, sessionId) {
  const sessionFile = resolve(__dirname, '..', 'data', 'session.json');
  const sessions = JSON.parse((await readFile(sessionFile)).toString('utf8'));
  sessions[username] = sessionId;
  await writeFile(sessionFile, JSON.stringify(sessions, null, 2), 'utf8');
}

module.exports = { app };
