const { app } = require('./app');

const port = process.env.PORT || 1112;

app.listen(port, notifyServerStart);

function notifyServerStart() {
  console.log(`server listening at http://localhost:${port}/`);
}
