import { model, Schema } from 'mongoose';

const postSchema = new Schema({
  userId: {
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

const postModel = model('Post', postSchema);

export default postModel;
