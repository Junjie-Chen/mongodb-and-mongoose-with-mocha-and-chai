const mongoose = require('mongoose');

let connection;

before(done => {
  mongoose.connect('mongodb://localhost/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  connection = mongoose.connection;

  connection.once('open', () => done())
    .on('error', console.error.bind(console, 'connection error:'));
});
