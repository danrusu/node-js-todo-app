const API_BASE_URL = 'http://localhost:1112/api';

const prettify = json => JSON.stringify(json, null, 2);
const logJson = json => console.log(prettify(json));

const selectById = id => document.getElementById(id);
const selectAll = cssSelector =>
  [].slice.call(document.querySelectorAll(cssSelector));
const setText = (id, text) => (selectById(id).innerHTML = text);

selectById('todoId').value = 0;

const todoApiFetch = async (urlPath, options) => {
  const response = await fetch(`${API_BASE_URL}/todo${urlPath || ''}`, options);
  return await response.json();
};

const actions = {
  getAllTodos: async () => {
    const responseJson = await todoApiFetch('');
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

const todoInfoAlert = async id => {
  const { name, priority, description, date, time } = await actions.getTodo(id);
  const info = {
    TODO: name,
    Priority: priority,
    Description: description,
    Date: date,
    Time: time,
  };
  alert(
    Object.entries(info)
      .filter(([_, v]) => v !== '')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
  );
};

// todo component
const tag = tagName => (content, tagAttributes) => {
  const attributes = Object.entries(tagAttributes || {})
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
  return `<${tagName} ${attributes}>${content}</${tagName}>`;
};

const [div, span] = ['div', 'span'].map(tag);

const createTodoHtml = todoJson => {
  const todoClass = `priority-${todoJson.priority}-todo`;
  const { name, description, id, date, time } = todoJson;
  const dateTimeDiv = (date, time) => {
    if (!date || (!date && !time)) {
      return div('');
    }
    if (!time) {
      return div(date, { onclick: `todoInfoAlert(${id})` });
    }
    return div(`${date}&nbsp; &nbsp;${time}`, {
      onclick: `todoInfoAlert(${id})`,
    });
  };
  const todoInfoDiv =
    span('x', {
      class: 'delete',
      onclick: `actions.deleteTodo(${id})`,
    }) +
    div(name, { class: 'name', onclick: `todoInfoAlert(${id})` }) +
    div(description, { onclick: `todoInfoAlert(${id})` }) +
    div(`ID: ${id}`, { onclick: `todoInfoAlert(${id})` }) +
    dateTimeDiv(date, time);

  return div(todoInfoDiv, {
    class: todoClass,
  });
};

const isTodoValid = () => {
  if (selectById('todoName').value.length < 5) {
    alert('Name should have at least 5 characters.');
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

const addTodoActionToButton = buttonElement => {
  console.log(todo[button.id]);
  buttonElement.addEventListener('click', todo[button.id]);
};

const getTodoJsonBody = () => JSON.parse(selectById('todoBody').value);
const getTodoId = () => selectById('todoId').value;

const buttonsClickEventHandlers = {
  createTodo: () => actions.createTodo(getTodoJson()),
  updateTodo: () => actions.updateTodo(getTodoId(), getTodoJson()),
  deleteAllTodos: actions.deleteAllTodos,
};

const bindButtonsActionClickHandlers = () =>
  selectAll('#actions button').forEach(button =>
    button.addEventListener('click', buttonsClickEventHandlers[button.id]),
  );

bindButtonsActionClickHandlers();
