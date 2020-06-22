const { expect } = require('chai');
const User = require('../src/models/User');

describe('Subdocument', () => {
  it('should create a list of subdocuments', done => {
    const user = new User({
      name: 'Joe',
      posts: [{ title: 'JavaScript is great!' }]
    });

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user.posts[0].title).to.equal('JavaScript is great!');

        done();
      });
  });
});
