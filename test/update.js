const { expect } = require('chai');
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

  const assert = (operation, done) => {
    operation
      .then(() => User.find({}))
      .then(users => {
        expect(users).to.have.lengthOf(1);
        expect(users[0].name).to.equal('Joane');

        done();
      });
  };

  it('should update a user by setting their properties', done => {
    user.set('name', 'Joane');

    assert(user.save(), done);
  });

  it('should update a list of users', done => {
    assert(User.updateMany({ name: 'Joe' }, { name: 'Joane' }), done);
  });

  it('should update a user', done => {
    assert(User.updateOne({ name: 'Joe' }, { name: 'Joane' }), done);
  });
});
