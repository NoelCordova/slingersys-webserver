/* eslint-disable no-console */

const { PORT } = require('./config');
const { dbConnection } = require('./services/database');
const app = require('./app');

async function main() {
  try {
    await dbConnection();
    app.listen(PORT, () => console.log('Server now running on port: ', PORT));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
