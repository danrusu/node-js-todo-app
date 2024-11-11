const { writeFile, readFile } = require('fs').promises;

const TODO_DATA_FILE = 'data/todo-data.json';

const read = async () => {
  const todo = await readFile(TODO_DATA_FILE, 'utf8');
  return JSON.parse(todo);
};

const write = async todoContent => {
  await writeFile(TODO_DATA_FILE, JSON.stringify(todoContent, null, 2));
};

const search = async todoId => {
  const todo = await read();
  const todoIndex = todo.findIndex(t => t.id == todoId);
  return todoIndex;
};

const getAll = async (_, res) => {
  res.send(await read());
};

const getTodo = async (req, res) => {
  const todos = await read();
  const todoIndex = await search(req.params.id);
  if (todoIndex == -1) {
    res.sendStatus(404);
    return;
  }
  res.send(todos[todoIndex]);
};

const createTodo = async (req, res) => {
  const todos = await read();
  const todo = req.body;
  const greatestId = todos.map(t => t.id).sort((id1, id2) => id2 - id1)[0] || 0;
  const id = greatestId + 1;
  todos.push({ ...req.body, id });
  write(todos);
  res.status(201).send({ status: `created todo ${todo.is}`, created: todo });
};

const updateTodo = async (req, res) => {
  const todos = await read();
  const id = req.params.id;

  const todoIndex = await search(id);
  if (todoIndex == -1) {
    res.status(404).send({ status: `todo with id ${id} was not found` });
    return;
  }

  const newTodo = req.body;
  todos[todoIndex] = newTodo;
  write(todos);
  res.send({ status: `updated todo ${id}`, updated: newTodo });
};

const deleteTodo = async (req, res) => {
  const todos = await read();
  const { id } = req.query;
  if (id == 'all') {
    write([]);
    res.send({ status: 'deleted all', deleted: todos });
    return;
  }
  const todoIndex = await search(id);
  if (todoIndex == -1) {
    res.status(404).send({ status: `todo with id ${id} was not found` });
    return;
  }
  const todo = todos[todoIndex];
  todos.splice(todoIndex, 1);
  write(todos);
  res.send({ status: 'deleted', deleted: todo });
};

module.exports = { getAll, getTodo, createTodo, updateTodo, deleteTodo };
