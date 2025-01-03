const express = require('express');
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
app.use(express.static('src/html'));
app.use(basicAuth);

// routes
app.get('/login', login);
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

function login(_, res) {
  serveFileFromHtml(res, 'login.html');
}

module.exports = { app };
