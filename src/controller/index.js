const { authenticate, username, logout } = require('./auth-controller');
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('./todo-controller');
const { delay, isHealthy } = require('./misc-controler');

module.exports = {
  authenticate,
  logout,
  username,
  delay,
  isHealthy,
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
