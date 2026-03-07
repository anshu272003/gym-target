const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isVeg: { type: Boolean, default: true }
});

const mealSchema = new mongoose.Schema({
  mealTime: { type: String, required: true },
  mealName: { type: String, required: true },
  foods: [foodItemSchema],
  vegAlternative: [foodItemSchema],
  calories: { type: String, required: true },
  protein: { type: String, required: true },
  icon: { type: String, default: '🍽️' },
  order: { type: Number, default: 0 }
});

const dietSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  isVegDay: { type: Boolean, default: false },
  isOffDay: { type: Boolean, default: false },
  notes: { type: String, default: '' },
  meals: [mealSchema]
}, { timestamps: true });

module.exports = mongoose.model('Diet', dietSchema);
