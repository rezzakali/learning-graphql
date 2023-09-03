import { model, Schema } from 'mongoose';

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
});

const Post = model('Post', postSchema);

export default Post;
