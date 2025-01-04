const { authenticate, username } = require('./auth-controller');
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
  username,
  delay,
  isHealthy,
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
