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
  isPremiemUser: {
    type: Boolean,
    default: false,
  },
});

//hashing to protect the passwords
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  } else {
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;

    return next();
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model('user', userSchema);
