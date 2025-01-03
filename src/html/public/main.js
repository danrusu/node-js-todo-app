// ********* MAIN *********

// needs todoHttpClient (todo-http-client.js)

const todoHttpClient = new TodoHttpClient(`${location.origin}/api`);
setAllTodos();

selectById('todoId').value = 0;

bindButtonsActionClickHandlers();

// ******************

// functions (hoisted)
function bindButtonsActionClickHandlers() {
  const buttonsClickEventHandlers = {
    createTodo: async () => {
      if (!isTodoValid()) {
        return;
      }
      const { id, ...body } = JSON.parse(getTodoJson());
      await todoHttpClient.createTodo(JSON.stringify(body));
      await setAllTodos();
    },
    updateTodo: async () => {
      if (!isTodoValid()) {
        return;
      }
      await todoHttpClient.updateTodo(getTodoId(), getTodoJson());
      await setAllTodos();
    },
    deleteAllTodos: async () => {
      await todoHttpClient.deleteAllTodos();
      await resetTodos();
    },
  };

  selectAll('#actions button').forEach(button =>
    button.addEventListener('click', buttonsClickEventHandlers[button.id]),
  );
}

async function setForm(id) {
  const { name, priority, description, date, time } =
    await todoHttpClient.getTodo(id);
  setInputValue('todoName', name);
  setInputValue('todoDescription', description);
  setInputValue('todoDate', date);
  setInputValue('todoTime', time);
  setInputValue('todoPriority', priority);
  setInputValue('todoId', id);
}

// todo component
function tag(tagName) {
  return function (content, tagAttributes) {
    const attributes = Object.entries(tagAttributes || {})
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    return `<${tagName} ${attributes}>${content}</${tagName}>`;
  };
}

const [div, span] = ['div', 'span'].map(tag); // functions to create div and span

function createTodoHtml(todoJson) {
  const todoClass = `priority-${todoJson.priority}-todo`;
  const { name, description, id, date, time } = todoJson;
  const dateTimeDiv = (date, time) => {
    if (!date || (!date && !time)) {
      return div('');
    }
    if (!time) {
      return div(date, { onclick: `setForm(${id})` });
    }
    return div(`${date}&nbsp; &nbsp;${time}`, {
      onclick: `setForm(${id})`,
    });
  };
  const todoInfoDiv =
    span(id, {
      class: 'todo-id',
      title: 'Unique id',
    }) +
    span('x', {
      class: 'delete',
      title: 'Delete',
      onclick: `(async () => { await todoHttpClient.deleteTodo(${id}); setAllTodos(); })()`,
    }) +
    div(name, { class: 'name', onclick: `setForm(${id})` }) +
    div(description, { onclick: `setForm(${id})` }) +
    dateTimeDiv(date, time);

  return div(todoInfoDiv, {
    class: todoClass,
  });
}

function isTodoValid() {
  if (selectById('todoName').value.length < 3) {
    alert('Name should have at least 3 characters.');
    return false;
  }
  return true;
}

function getTodoJson() {
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
}

function resetTodos() {
  selectById('todos').innerHTML = '';
}

async function setAllTodos() {
  const todos = selectById('todos');
  resetTodos();
  const todosJson = await todoHttpClient.getAllTodos();
  const todosHtml = todosJson.map(createTodoHtml);

  todosHtml.forEach(todoHtml => {
    todos.innerHTML = todos.innerHTML + todoHtml;
  });
}

function addTodoActionToButton(buttonElement) {
  console.log(todo[button.id]);
  buttonElement.addEventListener('click', todo[button.id]);
}

function getTodoJsonBody() {
  return JSON.parse(selectById('todoBody').value);
}

function getTodoId() {
  return selectById('todoId').value;
}

// utilities

function prettify(json) {
  return JSON.stringify(json, null, 2);
}

function logJson(json) {
  console.log(prettify(json));
}

function selectById(id) {
  return document.getElementById(id);
}

function selectAll(cssSelector) {
  return [].slice.call(document.querySelectorAll(cssSelector));
}

function setText(id, text) {
  selectById(id).innerHTML = text;
}

function setInputValue(id, value) {
  selectById(id).value = value;
}
