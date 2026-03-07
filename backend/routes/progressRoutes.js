const express = require('express');
const router = express.Router();
const {
  getProgress,
  addProgress,
  updateProgress,
  deleteProgress
} = require('../controllers/progressController');

router.route('/').get(getProgress).post(addProgress);
router.route('/:id').put(updateProgress).delete(deleteProgress);

module.exports = router;
