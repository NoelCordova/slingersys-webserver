const { PORT } = require('./config');
const app = require('./app');

// Run server
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Server now running on port: ', PORT));
