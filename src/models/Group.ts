import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: String,
    required: true
  }]
}, { timestamps: true });

groupSchema.index({ name: 1 });
groupSchema.index({ members: 1 });

export const Group = mongoose.model('Group', groupSchema);