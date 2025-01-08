# node-js-todo-app

Dummy TODO web app - starts a [WEB SERVER](http://localhost:1112/) on port 1112

- Install dependencies

```bash
npm install
```

- Run web server

```bash
npm start
# or
npm run dev # run server in dev mode
```

- Tests

  - API

    ```bash
    #bash terminal
    ./test_api_postman.sh
    ```

  - PERFORMANCE (using [k6](https://grafana.com/docs/k6/latest/using-k6))

    ```bash
    npm run test:performance:todos
    # or
    docker run -e DOCKER=true --network="host" --rm -i grafana/k6 run - < test/performance/get-todos.k6.js
    ```
