class TodoHttpClient {
  apiBaseUrl;

  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async request(urlPath, options) {
    const response = await fetch(
      `${this.apiBaseUrl}/todo${urlPath || ''}`,
      options,
    );
    return await response.json();
  }

  async getAllTodos() {
    const responseJson = await this.request('');
    return responseJson;
  }

  async getTodo(todoId) {
    const responseJson = await this.request(`/${todoId}`);
    return responseJson;
  }

  async createTodo(todoJson) {
    const responseJson = await this.request('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: todoJson,
    });
    return responseJson;
  }

  async updateTodo(todoId) {
    const responseJson = await this.request(`/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: getTodoJson(),
    });
    return responseJson;
  }

  async deleteTodo(todoId) {
    const responseJson = await this.request(`?id=${todoId}`, {
      method: 'DELETE',
    });
    return responseJson;
  }

  async deleteAllTodos() {
    const responseJson = await this.request('?id=all', {
      method: 'DELETE',
    });
    return responseJson;
  }
}
