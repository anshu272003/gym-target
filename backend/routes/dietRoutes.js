const express = require('express');
const router = express.Router();
const {
  getDiet,
  addDiet,
  updateDiet
} = require('../controllers/dietController');

router.route('/').get(getDiet).post(addDiet);
router.route('/:id').put(updateDiet);

module.exports = router;
