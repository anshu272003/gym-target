const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [30, 'Weight must be at least 30 kg'],
    max: [200, 'Weight must be less than 200 kg']
  },
  calories: {
    type: Number,
    default: null,
    min: [0, 'Calories cannot be negative']
  },
  protein: {
    type: Number,
    default: null,
    min: [0, 'Protein cannot be negative']
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  },
  week: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

progressSchema.index({ date: -1 });

module.exports = mongoose.model('Progress', progressSchema);
