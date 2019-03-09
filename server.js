const app = require('./src/app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true }).then(() => {
  const server = app.listen(3000, () => {
    const port = server.address().port;
  
    console.log('Server now running on port: ', port);
  });
})
.catch(error => console.error(error));