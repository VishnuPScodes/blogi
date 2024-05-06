import mongoose, { Types } from 'mongoose';

export const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
    },
    viewers: {
      type: [Types.ObjectId],
    },
    likes: {
      type: [Types.ObjectId],
    },
    comments: {
      type: [Types.ObjectId],
    },
  },
  {
    timestamps: true,
  }
);

export const Blogs = new mongoose.model('blog', blogSchema);
