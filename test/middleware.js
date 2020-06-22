const { expect } = require('chai');
const User = require('../src/models/User');
const BlogPost = require('../src/models/BlogPost');

describe('Middleware', () => {
  let user, blogPost;

  beforeEach(done => {
    user = new User({ name: 'Joe' });

    blogPost = new BlogPost({
      title: 'JavaScript is great!',
      content: 'Yes, it is!'
    });

    user.blogPosts.push(blogPost);

    Promise.all([
      user.save(),
      blogPost.save()
    ])
      .then(() => done());
  });

  it('should delete associated blog posts before deleting a user', done => {
    user.remove()
      .then(() => BlogPost.estimatedDocumentCount())
      .then(count => {
        expect(count).to.equal(0);

        done();
      });
  });
});
