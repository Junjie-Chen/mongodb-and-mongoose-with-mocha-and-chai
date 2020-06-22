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
});
