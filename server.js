const app = require('./src/app');

const server = app.listen(3000, () => {
  const port = server.address().port;

  console.log('Server now running on port: ', port);
});