const API_BASE_URL = `${location.origin}/api`;

class TodoHttpClient {
  async getAllTodos() {
    const responseJson = await todoApiFetch('');
    resetTodos();

    responseJson
      .map(createTodoHtml)
      .forEach(todoHtml => (todos.innerHTML = todos.innerHTML + todoHtml));
    return responseJson;
  }

  async getTodo(todoId) {
    const responseJson = await todoApiFetch(`/${todoId}`);
    return responseJson;
  }

  async createTodo(todoJson) {
    if (!isTodoValid()) {
      return;
    }
    const responseJson = await todoApiFetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: todoJson,
    });
    this.getAllTodos();
    return responseJson;
  }

  async updateTodo(todoId) {
    if (!isTodoValid()) {
      return;
    }
    const responseJson = await todoApiFetch(`/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: getTodoJson(),
    });
    this.getAllTodos();
    return responseJson;
  }

  async deleteTodo(todoId) {
    const responseJson = await todoApiFetch(`?id=${todoId}`, {
      method: 'DELETE',
    });
    this.getAllTodos();
    return responseJson;
  }

  async deleteAllTodos() {
    const responseJson = await todoApiFetch('?id=all', { method: 'DELETE' });
    resetTodos();
    return responseJson;
  }
}

async function todoApiFetch(urlPath, options) {
  const response = await fetch(`${API_BASE_URL}/todo${urlPath || ''}`, options);
  return await response.json();
}

const todoHttpClient = new TodoHttpClient();
