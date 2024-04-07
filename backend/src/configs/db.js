import mongoose from 'mongoose';

export const connectToDb = async (URL) => {
  return await mongoose.connect(URL);
};
