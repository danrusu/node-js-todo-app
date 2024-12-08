class TodoHttpClient {
  apiBaseUrl;

  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async getAllTodos() {
    const responseJson = await this.fetch('');
    resetTodos();

    responseJson
      .map(createTodoHtml)
      .forEach(todoHtml => (todos.innerHTML = todos.innerHTML + todoHtml));
    return responseJson;
  }

  async getTodo(todoId) {
    const responseJson = await this.fetch(`/${todoId}`);
    return responseJson;
  }

  async createTodo(todoJson) {
    const responseJson = await this.fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: todoJson,
    });
    this.getAllTodos();
    return responseJson;
  }

  async updateTodo(todoId) {
    const responseJson = await this.fetch(`/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: getTodoJson(),
    });
    this.getAllTodos();
    return responseJson;
  }

  async deleteTodo(todoId) {
    const responseJson = await this.fetch(`?id=${todoId}`, {
      method: 'DELETE',
    });
    this.getAllTodos();
    return responseJson;
  }

  async deleteAllTodos() {
    const responseJson = await this.fetch('?id=all', {
      method: 'DELETE',
    });
    this.resetTodos();
    return responseJson;
  }

  async fetch(urlPath, options) {
    const response = await fetch(
      `${this.apiBaseUrl}/todo${urlPath || ''}`,
      options,
    );
    return await response.json();
  }
}
