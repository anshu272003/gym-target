const mongoose = require('mongoose');

const suggestedMealSchema = new mongoose.Schema({
  meal: { type: String, required: true },
  foods: [String],
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 }
}, { _id: false });

const aiDietSessionSchema = new mongoose.Schema({
  date: { type: String, required: true },          // YYYY-MM-DD
  mealsEaten: {
    breakfast: { type: String, default: '' },
    lunch: { type: String, default: '' },
    snack: { type: String, default: '' }
  },
  result: {
    caloriesConsumed: { type: Number, default: 0 },
    proteinConsumed: { type: Number, default: 0 },
    remainingCalories: { type: Number, default: 0 },
    remainingProtein: { type: Number, default: 0 },
    suggestedMeals: [suggestedMealSchema]
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

// TTL index — MongoDB automatically deletes docs once expiresAt is reached
aiDietSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('AiDietSession', aiDietSessionSchema);
