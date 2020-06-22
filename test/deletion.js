const User = require('../src/models/User');

describe('Deletion', () => {
  let user;

  beforeEach(done => {
    user = new User({ name: 'Joe' });

    user.save()
      .then(() => done());
  });
});
