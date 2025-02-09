const postgres = require('postgres');

(async () => {
  const sql = postgres('', {
    host: '127.0.0.1',
    port: 5432,
    database: 'todo',
    user: 'postgres',
    password: 'Tester4l!fe',
  });

  const todos = await sql`select * from todo;`;
  console.log(todos);
})().catch(console.error);
