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

  it('should add a subdocument', done => {
    const user = new User({
      name: 'Joe',
      posts: []
    });

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts.push({ title: 'JavaScript is great!' });

        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user.posts[0].title).to.equal('JavaScript is great!');

        done();
      });
  });

  it('should delete a subdocument', done => {
    const user = new User({
      name: 'Joe',
      posts: [{ title: 'JavaScript is great!' }]
    });

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        const post = user.posts[0];

        post.remove();

        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user.posts).to.have.lengthOf(0);

        done();
      });
  });
});
