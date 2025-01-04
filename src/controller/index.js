const { authenticate } = require('./auth-controller');
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
  delay,
  isHealthy,
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
