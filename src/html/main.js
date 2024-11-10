const API_URL = 'http://localhost:1112/api/todo';

const prettify = json => JSON.stringify(json, null, 2);
const logJson = json => console.log(prettify(json));

const selectById = id => document.getElementById(id);
const selectAll = cssSelector =>
  [].slice.call(document.querySelectorAll(cssSelector));
const setText = (id, text) => (selectById(id).innerHTML = text);

selectById('todoId').value = 0;

const todoApiFetch = async (urlPath, options) => {
  const response = await fetch(`${API_URL}${urlPath || ''}`, options);
  return await response.json();
};

const createTodoHtml = todoJson => {
  const todoClass = `priority-${todoJson.priority}-todo`;

  const div = (content, className) => {
    const divClass = className ? ` class="${className}"` : '';
    return `<div${divClass}>${content}</div>`;
  };

  const { name, description, id, date, time } = todoJson;
  const dateTimeDiv = (date, time) => {
    if (!date || (!date && !time)) {
      return div('');
    }
    if (!time) {
      return div(date);
    }
    return div(`${date}&nbsp; &nbsp;${time}`);
  };
  const todoInfoDiv =
    div(name, 'name') +
    div(description) +
    div(`ID: ${id}`) +
    dateTimeDiv(date, time);

  return div(todoInfoDiv, todoClass);
};

const isTodoValid = () => {
  if (selectById('todoName').value === '') {
    alert('Name is mandatory.');
    return false;
  }
  return true;
};

const getTodoJson = () => {
  const todoJson = selectAll('#form input, #form select').reduce(
    (acc, input) => {
      // id = todoName => key = name
      const key = input.id.replace('todo', '').toLowerCase();
      acc[key] = ['id', 'priority'].includes(key)
        ? parseInt(input.value)
        : input.value;

      return acc;
    },
    {},
  );
  return JSON.stringify(todoJson);
};

const resetTodos = () => (selectById('todos').innerHTML = '');

const actions = {
  getAllTodos: async () => {
    const responseJson = await todoApiFetch();
    resetTodos();

    responseJson
      .map(createTodoHtml)
      .forEach(todoHtml => (todos.innerHTML = todos.innerHTML + todoHtml));
    return responseJson;
  },

  getTodo: async todoId => {
    const responseJson = await todoApiFetch(`/${todoId}`);
    return responseJson;
  },

  createTodo: async todoJson => {
    if (!isTodoValid()) {
      return;
    }
    //console.log('body:  ' + getTodoJson());
    const responseJson = await todoApiFetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: getTodoJson(),
    });
    actions.getAllTodos();
    return responseJson;
  },

  updateTodo: async todoId => {
    if (!isTodoValid()) {
      return;
    }
    const responseJson = await todoApiFetch(`/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: getTodoJson(),
    });
    actions.getAllTodos();
    return responseJson;
  },

  deleteTodo: async todoId => {
    const responseJson = await todoApiFetch(`/${todoId}`, {
      method: 'DELETE',
    });
    actions.getAllTodos();
    return responseJson;
  },

  deleteAllTodos: async () => {
    const responseJson = await todoApiFetch('/all', { method: 'DELETE' });
    resetTodos();
    return responseJson;
  },
};

const addTodoActionToButton = buttonElement => {
  console.log(todo[button.id]);
  buttonElement.addEventListener('click', todo[button.id]);
};

const getTodoJsonBody = () => JSON.parse(selectById('todoBody').value);
const getTodoId = () => selectById('todoId').value;

const buttonsClickEventHandlers = {
  getAllTodos: actions.getAllTodos,
  getTodo: () => actions.getTodo(getTodoId()),
  createTodo: () => actions.createTodo(getTodoJson()),
  updateTodo: () => actions.updateTodo(getTodoId(), getTodoJson()),
  deleteTodo: () => actions.deleteTodo(getTodoId()),
  deleteAllTodos: actions.deleteAllTodos,
};

const bindButtonsActionClickHandlers = () =>
  selectAll('#actions button').forEach(button =>
    button.addEventListener('click', buttonsClickEventHandlers[button.id]),
  );

bindButtonsActionClickHandlers();
