const postgres = require('postgres');

const selectAllTodo = async (_req, res) => {
  try {
    const sql = postgres('', {
      host: 'todo-postgres-dev2.cr2kagkkunsn.eu-central-1.rds.amazonaws.com',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'Tester4l!fe',
    });

    const todos = await sql`select * from todo;`;
    res.send(JSON.stringify(todos));
  } catch (err) {
    console.error('DB error: ' + err);
    res.status(400).send({ err: err.message });
  }
};

module.exports = {
  selectAllTodo,
};
