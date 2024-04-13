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
  blogId: {
    type: Types.ObjectId,
    required: true,
  },
});

export const Comment = new mongoose.model('comment', commentSchema);
