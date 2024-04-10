import mongoose, { Types } from 'mongoose';

export const commentSchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: [Types.ObjectId],
  },
});

export const Blogs = new mongoose.model('comment', commentSchema);
