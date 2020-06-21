const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = require('../schema/post');

const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  likes: Number,
  posts: [postSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]
});

userSchema.virtual('postCount')
  .get(function() {
    return this.posts.length;
  });

userSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('BlogPost');

  BlogPost.deleteMany({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('User', userSchema);
