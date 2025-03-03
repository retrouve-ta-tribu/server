import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
});

messageSchema.index({ groupId: 1, timestamp: -1 });
messageSchema.index({ senderId: 1 });

export const Message = mongoose.model('Message', messageSchema);