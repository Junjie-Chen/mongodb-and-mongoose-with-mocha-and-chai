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
});
