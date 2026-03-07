const Workout = require('../models/Workout');

// @desc    Get all workouts
// @route   GET /api/workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({
      day: 1
    });

    // Sort by day order
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const sorted = workouts.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new workout
// @route   POST /api/workouts
const addWorkout = async (req, res) => {
  try {
    const { day, focus, exercises, isRestDay, notes } = req.body;

    const workout = new Workout({
      day,
      focus,
      exercises,
      isRestDay,
      notes
    });

    const saved = await workout.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update workout
// @route   PUT /api/workouts/:id
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    const updated = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getWorkouts, addWorkout, updateWorkout };
