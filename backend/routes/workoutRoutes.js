const express = require('express');
const router = express.Router();
const {
  getWorkouts,
  addWorkout,
  updateWorkout
} = require('../controllers/workoutController');

router.route('/').get(getWorkouts).post(addWorkout);
router.route('/:id').put(updateWorkout);

module.exports = router;
