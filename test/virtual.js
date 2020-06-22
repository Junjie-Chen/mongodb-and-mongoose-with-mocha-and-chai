const { expect } = require('chai');
const User = require('../src/models/User');

describe('Virtual', () => {
  it('should derive the number of posts', done => {
    const user = new User({
      name: 'Joe',
      posts: [{ title: 'JavaScript is great!' }]
    });

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user.postCount).to.equal(1);

        done();
      });
  });
});
