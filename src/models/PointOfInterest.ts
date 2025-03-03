import mongoose from 'mongoose';

const pointOfInterestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v: number[]) {
          return v.length === 2;
        },
        message: 'Coordinates must be an array of two numbers [longitude, latitude]'
      }
    }
  }
});

pointOfInterestSchema.index({ location: '2dsphere' });
pointOfInterestSchema.index({ name: 1 });

export const PointOfInterest = mongoose.model('PointOfInterest', pointOfInterestSchema);