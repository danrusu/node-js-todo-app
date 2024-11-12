const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

const serveFileFromRoot = (res, relativePath) =>
  res.sendFile(path.join(__dirname, relativePath));

// static files
const [serveHome, serveCss, serveJs, serveFavicon] = [
  'index.html',
  'main.css',
  'main.js',
  'favicon.ico',
].map(filePath => (_, res) => serveFileFromRoot(res, `html/${filePath}`));

// routes
app.get('/api/health-check', (_, res) => {
  res.send({ status: 'healthy' });
});
app.get('/', serveHome);
app.get('/css', serveCss);
app.get('/js', serveJs);
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

const notifyServerStart = () =>
  console.log(`server listening at http://localhost:${port}/`);

const port = process.env.PORT || 1112;
app.listen(port, notifyServerStart);
