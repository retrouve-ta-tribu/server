import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  friends: [{
    type: String
  }]
}, { timestamps: true });

userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);