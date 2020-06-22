const { expect } = require('chai');
const User = require('../src/models/User');

describe('Creation', () => {
  it('should save a user', done => {
    const user = new User({ name: 'Joe' });

    user.save()
      .then(() => {
        expect(user.isNew).to.be.false;

        done();
      });
  });
});
