const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

const serveFileFromRoot = (res, relativePath) =>
  res.sendFile(path.join(__dirname, relativePath));

// static files
const [serveHome, serveCss, serveMainJs, serveTodoClientJs, serveFavicon] = [
  'index.html',
  'main.css',
  'main.js',
  'todo-http-client.js',
  'favicon.ico',
].map(filePath => (_, res) => serveFileFromRoot(res, `html/${filePath}`));

// routes
app.get('/api/health-check', (_, res) => {
  res.send({ status: 'healthy' });
});
app.get('/', serveHome);
app.get('/css', serveCss);
app.get('/main', serveMainJs);
app.get('/todo-http-client', serveTodoClientJs);
app.get('/favicon', serveFavicon);

const {
  getAll,
  getTodo,
  deleteTodo,
  createTodo,
  updateTodo,
} = require('./dataController');

app.get('/api/todo', getAll);
app.get('/api/todo/:id', getTodo);
app.post('/api/todo', createTodo);
app.put('/api/todo/:id', updateTodo);
app.delete('/api/todo', deleteTodo);

module.exports = { app };
