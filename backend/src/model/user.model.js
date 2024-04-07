import mongoose, { Types } from 'mongoose';

export const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  followers: {
    type: [Types.ObjectId],
  },
  following: {
    type: [Types.ObjectId],
  },
});

export const User = mongoose.model('user', userSchema);
