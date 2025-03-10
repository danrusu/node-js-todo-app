const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middleware/auth-middleware.js');

const {
  authenticate,
  logout,
  delay,
  isHealthy,
  username,
  getAllTodos,
  getTodo,
  deleteTodo,
  createTodo,
  updateTodo,
} = require('./controller');

const { serveFileFromHtml } = require('./util/response-util.js');

// middlewares
app.use(express.static('src/html/public'));
app.use(cookieParser());
app.use(express.json());
app.use(authMiddleware);

// routes
app.get('/', serveFileFromHtml('index.html'));

app.get('/login', serveFileFromHtml('login.html'));
app.post('/login', authenticate);

app.get('/logout', logout);

app.get('/api/health-check', isHealthy);
app.get('/api/username', username);

app.get('/api/todo', getAllTodos);
app.get('/api/todo/:id', getTodo);
app.post('/api/todo', createTodo);
app.put('/api/todo/:id', updateTodo);
app.delete('/api/todo', deleteTodo);

app.get('/api/delay/:duration', delay);

module.exports = { app };
