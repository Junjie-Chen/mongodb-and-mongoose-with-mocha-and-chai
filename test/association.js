const { expect } = require('chai');
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

  it('should associate a user with a blog post', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        expect(user.blogPosts[0].title).to.equal('JavaScript is great!');

        done();
      });
  });

  it('should associate a user, a blog post and a comment with each other', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User'
          }
        }
      })
      .then(user => {
        expect(user.name).to.equal('Joe');
        expect(user.blogPosts[0].title).to.equal('JavaScript is great!');
        expect(user.blogPosts[0].comments[0].content).to.equal('Congratulations on the great post!');
        expect(user.blogPosts[0].comments[0].user.name).to.equal('Joe');

        done();
      });
  });
});
