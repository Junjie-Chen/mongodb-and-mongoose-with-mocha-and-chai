const User = require('../src/models/User');
const BlogPost = require('../src/models/BlogPost');
const Comment = require('../src/models/Comment');

describe('Association', () => {
  let user, blogPost, comment;

  beforeEach(done => {
    user = new User({ name: 'Joe' });

    blogPost = new BlogPost({
      title: 'JavaScript is great!',
      content: 'Yes, it is!'
    });

    comment = new Comment({ content: 'Congratulations on the great post!' });

    user.blogPosts.push(blogPost);

    blogPost.comments.push(comment);

    comment.user = user;

    Promise.all([
      user.save(),
      blogPost.save(),
      comment.save()
    ])
      .then(() => done());
  });
});
