import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: String,
    required: true
  }],
  pointsOfInterest: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PointOfInterest'
  }]
}, { timestamps: true });

groupSchema.index({ name: 1 });
groupSchema.index({ members: 1 });

export const Group = mongoose.model('Group', groupSchema);