const express = require('express');
const router = express.Router();
const {
  generateAiDiet,
  getAiDietSession
} = require('../controllers/aiDietController');

router.route('/').get(getAiDietSession).post(generateAiDiet);

module.exports = router;
