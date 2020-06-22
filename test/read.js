const { expect } = require('chai');
const User = require('../src/models/User');

describe('Read', () => {
  let userOne, userTwo, userThree, userFour;

  beforeEach(done => {
    userOne = new User({ name: 'Alex' });
    userTwo = new User({ name: 'Joe' });
    userThree = new User({ name: 'Maria' });
    userFour = new User({ name: 'Zach' });

    Promise.all([
      userOne.save(),
      userTwo.save(),
      userThree.save(),
      userFour.save()
    ])
      .then(() => done());
  });

  it('should find a list of users', done => {
    User.find({ name: 'Joe' })
      .then(users => {
        expect(users[0]._id).to.deep.equal(userTwo._id);

        done();
      });
  });

  it('should find a user', done => {
    User.findOne({ _id: userTwo._id })
      .then(user => {
        expect(user.name).to.equal('Joe');

        done();
      });
  });
});
