const express = require('express');
const app = express();
const path = require('path');

const { basicAuth } = require('./middleware/basic-auth.js');
const {
  getAll,
  getTodo,
  deleteTodo,
  createTodo,
  updateTodo,
} = require('./controller/todo-controller.js');

// middlewares
app.use(express.json());
app.use(express.static('src/html'));
app.use(basicAuth);

// routes
// app.get('/', serveHome);

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

module.exports = { app };
