const { expect } = require('chai');
const User = require('../src/models/User');

describe('Deletion', () => {
  let user;

  beforeEach(done => {
    user = new User({ name: 'Joe' });

    user.save()
      .then(() => done());
  });

  const assert = (operation, done) => {
    operation
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user).to.be.null;

        done();
      });
  };

  it('should delete a user by removing their record', done => {
    assert(user.remove(), done);
  });
});
