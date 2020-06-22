const User = require('../src/models/User');

describe('Update', () => {
  let user;

  beforeEach(done => {
    user = new User({
      name: 'Joe',
      likes: 0
    });

    user.save()
      .then(() => done());
  });
});
