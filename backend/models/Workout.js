const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: String,
    required: true
  },
  muscleGroup: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  }
});

const workoutSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  focus: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema],
  isRestDay: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
