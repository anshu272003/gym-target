const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Workout = require('./models/Workout');
const Diet = require('./models/Diet');
const Progress = require('./models/Progress');

dotenv.config();

const workoutData = [
  {
    day: 'Monday',
    focus: 'Chest + Triceps',
    exercises: [
      { name: 'Flat Bench Press', sets: 4, reps: '8', muscleGroup: 'Chest' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10', muscleGroup: 'Chest' },
      { name: 'Cable Flyes', sets: 3, reps: '12', muscleGroup: 'Chest' },
      { name: 'Chest Dips', sets: 3, reps: '10', muscleGroup: 'Chest' },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12', muscleGroup: 'Triceps' },
      { name: 'Overhead Tricep Extension', sets: 3, reps: '10', muscleGroup: 'Triceps' }
    ],
    isRestDay: false,
    notes: 'Focus on progressive overload. Increase weight when you can do all reps with good form.'
  },
  {
    day: 'Tuesday',
    focus: 'Back + Biceps',
    exercises: [
      { name: 'Deadlifts', sets: 4, reps: '6', muscleGroup: 'Back' },
      { name: 'Lat Pulldowns', sets: 3, reps: '10', muscleGroup: 'Back' },
      { name: 'Seated Cable Rows', sets: 3, reps: '10', muscleGroup: 'Back' },
      { name: 'Barbell Rows', sets: 3, reps: '8', muscleGroup: 'Back' },
      { name: 'Barbell Curls', sets: 3, reps: '10', muscleGroup: 'Biceps' },
      { name: 'Hammer Curls', sets: 3, reps: '12', muscleGroup: 'Biceps' }
    ],
    isRestDay: false,
    notes: 'Use straps for deadlifts if grip is an issue. Focus on mind-muscle connection for back.'
  },
  {
    day: 'Wednesday',
    focus: 'Legs',
    exercises: [
      { name: 'Barbell Squats', sets: 4, reps: '8', muscleGroup: 'Legs' },
      { name: 'Leg Press', sets: 3, reps: '10', muscleGroup: 'Legs' },
      { name: 'Romanian Deadlifts', sets: 3, reps: '10', muscleGroup: 'Legs' },
      { name: 'Leg Curls', sets: 3, reps: '12', muscleGroup: 'Legs' },
      { name: 'Leg Extensions', sets: 3, reps: '12', muscleGroup: 'Legs' },
      { name: 'Standing Calf Raises', sets: 4, reps: '15', muscleGroup: 'Calves' }
    ],
    isRestDay: false,
    notes: 'Never skip leg day! Go deep on squats for maximum glute and quad activation.'
  },
  {
    day: 'Thursday',
    focus: 'Shoulders + Abs',
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: '8', muscleGroup: 'Shoulders' },
      { name: 'Lateral Raises', sets: 3, reps: '15', muscleGroup: 'Shoulders' },
      { name: 'Front Raises', sets: 3, reps: '12', muscleGroup: 'Shoulders' },
      { name: 'Face Pulls', sets: 3, reps: '15', muscleGroup: 'Shoulders' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '12', muscleGroup: 'Abs' },
      { name: 'Cable Crunches', sets: 3, reps: '15', muscleGroup: 'Abs' }
    ],
    isRestDay: false,
    notes: 'Use lighter weight for lateral raises. Focus on form over ego lifting.'
  },
  {
    day: 'Friday',
    focus: 'Chest + Biceps',
    exercises: [
      { name: 'Incline Bench Press', sets: 4, reps: '8', muscleGroup: 'Chest' },
      { name: 'Dumbbell Flyes', sets: 3, reps: '12', muscleGroup: 'Chest' },
      { name: 'Push-ups (3 sets to failure)', sets: 3, reps: '15+', muscleGroup: 'Chest' },
      { name: 'Preacher Curls', sets: 3, reps: '10', muscleGroup: 'Biceps' },
      { name: 'Concentration Curls', sets: 3, reps: '12', muscleGroup: 'Biceps' },
      { name: 'Cable Curls', sets: 3, reps: '12', muscleGroup: 'Biceps' }
    ],
    isRestDay: false,
    notes: 'Second chest day focuses on upper chest. Squeeze at the top of curls.'
  },
  {
    day: 'Saturday',
    focus: 'Back + Triceps',
    exercises: [
      { name: 'Pull-ups', sets: 3, reps: 'Max', muscleGroup: 'Back' },
      { name: 'Bent Over Rows', sets: 4, reps: '8', muscleGroup: 'Back' },
      { name: 'T-Bar Rows', sets: 3, reps: '10', muscleGroup: 'Back' },
      { name: 'Close Grip Bench Press', sets: 3, reps: '10', muscleGroup: 'Triceps' },
      { name: 'Skull Crushers', sets: 3, reps: '10', muscleGroup: 'Triceps' },
      { name: 'Tricep Kickbacks', sets: 3, reps: '12', muscleGroup: 'Triceps' }
    ],
    isRestDay: false,
    notes: 'Use assisted pull-ups if needed. Progressively reduce assistance over weeks.'
  },
  {
    day: 'Sunday',
    focus: 'Rest & Recovery',
    exercises: [],
    isRestDay: true,
    notes: 'Active recovery day. Light walking, stretching, foam rolling. Focus on sleep and nutrition.'
  }
];

const dietData = [
  // ── MONDAY (Veg Day, Office Day) ──
  {
    day: 'Monday',
    isVegDay: true,
    isOffDay: false,
    notes: '🌿 Pure Veg Day — no non-veg today. Focus on paneer, dal, soya & legumes for protein.',
    meals: [
      { mealTime: '6:30 AM', mealName: 'Pre-Workout Fuel', icon: '🌅', calories: '330', protein: '12', order: 1,
        foods: [{ name: '2 Whole Wheat Bread + 2 tbsp Peanut Butter', isVeg: true }, { name: '1 Banana', isVeg: true }, { name: '1 Glass Warm Water + Honey', isVeg: true }], vegAlternative: [] },
      { mealTime: '8:30 AM', mealName: 'Post-Workout Breakfast', icon: '🍳', calories: '550', protein: '24', order: 2,
        foods: [{ name: 'Poha / Upma (1.5 cups)', isVeg: true }, { name: 'Paneer Bhurji (100g)', isVeg: true }, { name: '1 Banana', isVeg: true }, { name: '1 Glass Orange Juice', isVeg: true }], vegAlternative: [] },
      { mealTime: '11:00 AM', mealName: 'Office Snack', icon: '🥜', calories: '280', protein: '10', order: 3,
        foods: [{ name: 'Handful of Almonds + Walnuts (20g)', isVeg: true }, { name: '1 Apple or Banana', isVeg: true }, { name: 'Green Tea', isVeg: true }], vegAlternative: [] },
      { mealTime: '2:00 PM', mealName: 'Lunch', icon: '🍛', calories: '680', protein: '30', order: 4,
        foods: [{ name: '2 Chapati + Rice (1 cup)', isVeg: true }, { name: 'Rajma / Chole (1 bowl)', isVeg: true }, { name: 'Dal Tadka (1 bowl)', isVeg: true }, { name: 'Paneer Sabzi (100g)', isVeg: true }, { name: 'Mixed Salad + Curd', isVeg: true }], vegAlternative: [] },
      { mealTime: '5:00 PM', mealName: 'Evening Snack', icon: '🥤', calories: '320', protein: '28', order: 5,
        foods: [{ name: 'Whey Protein Shake (1 scoop)', isVeg: true }, { name: 'Roasted Chana (1 cup)', isVeg: true }, { name: '1 Fruit (Apple/Guava)', isVeg: true }], vegAlternative: [] },
      { mealTime: '8:30 PM', mealName: 'Dinner', icon: '🍽️', calories: '580', protein: '22', order: 6,
        foods: [{ name: '2 Chapati', isVeg: true }, { name: 'Palak Paneer / Matar Paneer (150g)', isVeg: true }, { name: 'Dal (1 bowl)', isVeg: true }, { name: 'Curd (1 bowl)', isVeg: true }, { name: 'Seasonal Sabzi', isVeg: true }], vegAlternative: [] },
      { mealTime: '10:30 PM', mealName: 'Before Sleep', icon: '🌙', calories: '220', protein: '10', order: 7,
        foods: [{ name: '1 Glass Warm Milk + Turmeric', isVeg: true }, { name: '5 Soaked Almonds', isVeg: true }, { name: '1 tbsp Honey', isVeg: true }], vegAlternative: [] }
    ]
  },

  // ── TUESDAY (Non-Veg Allowed, Office Day) ──
  {
    day: 'Tuesday',
    isVegDay: false,
    isOffDay: false,
    notes: '💪 Back + Biceps day — extra protein focus. Eat eggs & chicken generously.',
    meals: [
      { mealTime: '6:30 AM', mealName: 'Pre-Workout Fuel', icon: '🌅', calories: '330', protein: '14', order: 1,
        foods: [{ name: '2 Whole Wheat Bread + Peanut Butter', isVeg: true }, { name: '1 Banana', isVeg: true }], vegAlternative: [] },
      { mealTime: '8:30 AM', mealName: 'Post-Workout Breakfast', icon: '🍳', calories: '615', protein: '28', order: 2,
        foods: [{ name: 'Poha (1.5 cups)', isVeg: true }, { name: '3 Boiled Eggs', isVeg: false }, { name: '1 Banana', isVeg: true }, { name: '1 Glass Orange Juice', isVeg: true }],
        vegAlternative: [{ name: 'Poha (1.5 cups)', isVeg: true }, { name: 'Paneer Bhurji (100g)', isVeg: true }, { name: '1 Banana', isVeg: true }, { name: 'OJ', isVeg: true }] },
      { mealTime: '11:00 AM', mealName: 'Office Snack', icon: '🥜', calories: '280', protein: '8', order: 3,
        foods: [{ name: 'Almonds (15-20)', isVeg: true }, { name: '1 Banana or Apple', isVeg: true }, { name: 'Green Tea', isVeg: true }], vegAlternative: [] },
      { mealTime: '2:00 PM', mealName: 'Lunch', icon: '🍛', calories: '700', protein: '38', order: 4,
        foods: [{ name: '2 Chapati + Rice (1 cup)', isVeg: true }, { name: 'Chicken Curry (150g)', isVeg: false }, { name: 'Dal (1 bowl)', isVeg: true }, { name: 'Mixed Salad', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati + Rice', isVeg: true }, { name: 'Paneer Curry (150g)', isVeg: true }, { name: 'Rajma (1 bowl)', isVeg: true }, { name: 'Mixed Salad', isVeg: true }] },
      { mealTime: '5:00 PM', mealName: 'Evening Snack', icon: '🥤', calories: '380', protein: '32', order: 5,
        foods: [{ name: 'Whey Protein Shake (1 scoop)', isVeg: true }, { name: '2 Boiled Eggs', isVeg: false }, { name: '1 Apple', isVeg: true }],
        vegAlternative: [{ name: 'Whey Protein Shake', isVeg: true }, { name: 'Roasted Chana (1 cup)', isVeg: true }, { name: '1 Apple', isVeg: true }] },
      { mealTime: '8:30 PM', mealName: 'Dinner', icon: '🍽️', calories: '600', protein: '28', order: 6,
        foods: [{ name: '2 Chapati', isVeg: true }, { name: 'Egg Curry (2 eggs)', isVeg: false }, { name: 'Dal (1 bowl)', isVeg: true }, { name: 'Curd (1 bowl)', isVeg: true }, { name: 'Seasonal Sabzi', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati', isVeg: true }, { name: 'Paneer Tikka (100g)', isVeg: true }, { name: 'Dal (1 bowl)', isVeg: true }, { name: 'Curd', isVeg: true }, { name: 'Sabzi', isVeg: true }] },
      { mealTime: '10:30 PM', mealName: 'Before Sleep', icon: '🌙', calories: '220', protein: '10', order: 7,
        foods: [{ name: '1 Glass Warm Milk', isVeg: true }, { name: '5 Soaked Almonds', isVeg: true }, { name: '1 tbsp Honey', isVeg: true }], vegAlternative: [] }
    ]
  },

  // ── WEDNESDAY (Non-Veg Allowed, Office Day) ──
  {
    day: 'Wednesday',
    isVegDay: false,
    isOffDay: false,
    notes: '🦵 Leg day — eat heavy carbs for energy. Don\'t skip post-workout meal!',
    meals: [
      { mealTime: '6:30 AM', mealName: 'Pre-Workout Fuel', icon: '🌅', calories: '350', protein: '14', order: 1,
        foods: [{ name: 'Oats with Banana & Honey (1 bowl)', isVeg: true }, { name: '1 Glass Warm Water', isVeg: true }], vegAlternative: [] },
      { mealTime: '8:30 AM', mealName: 'Post-Workout Breakfast', icon: '🍳', calories: '620', protein: '30', order: 2,
        foods: [{ name: 'Aloo Paratha (2) + Curd', isVeg: true }, { name: '3 Boiled Eggs', isVeg: false }, { name: '1 Banana', isVeg: true }],
        vegAlternative: [{ name: 'Aloo Paratha (2) + Curd', isVeg: true }, { name: 'Soya Chunk Bhurji (1 cup)', isVeg: true }, { name: '1 Banana', isVeg: true }] },
      { mealTime: '11:00 AM', mealName: 'Office Snack', icon: '🥜', calories: '300', protein: '10', order: 3,
        foods: [{ name: 'Trail Mix (Almonds, Cashews, Raisins)', isVeg: true }, { name: '1 Banana', isVeg: true }, { name: 'Black Coffee / Green Tea', isVeg: true }], vegAlternative: [] },
      { mealTime: '2:00 PM', mealName: 'Lunch', icon: '🍛', calories: '720', protein: '36', order: 4,
        foods: [{ name: '2 Chapati + Extra Rice (1.5 cups)', isVeg: true }, { name: 'Chicken Biryani / Curry (150g)', isVeg: false }, { name: 'Dal + Salad', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati + Extra Rice', isVeg: true }, { name: 'Veg Biryani + Soya Curry', isVeg: true }, { name: 'Dal + Salad', isVeg: true }] },
      { mealTime: '5:00 PM', mealName: 'Evening Snack', icon: '🥤', calories: '350', protein: '30', order: 5,
        foods: [{ name: 'Whey Protein Shake', isVeg: true }, { name: '1 Apple', isVeg: true }, { name: '2 Boiled Eggs', isVeg: false }],
        vegAlternative: [{ name: 'Whey Protein Shake', isVeg: true }, { name: '1 Apple', isVeg: true }, { name: 'Peanut Chikki (1 pc)', isVeg: true }] },
      { mealTime: '8:30 PM', mealName: 'Dinner', icon: '🍽️', calories: '600', protein: '26', order: 6,
        foods: [{ name: '2 Chapati + Rice', isVeg: true }, { name: 'Fish Curry / Egg Bhurji', isVeg: false }, { name: 'Dal + Curd', isVeg: true }, { name: 'Sabzi', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati + Rice', isVeg: true }, { name: 'Paneer Bhurji (100g)', isVeg: true }, { name: 'Dal + Curd', isVeg: true }, { name: 'Sabzi', isVeg: true }] },
      { mealTime: '10:30 PM', mealName: 'Before Sleep', icon: '🌙', calories: '220', protein: '10', order: 7,
        foods: [{ name: '1 Glass Warm Milk + Turmeric', isVeg: true }, { name: '5 Almonds', isVeg: true }], vegAlternative: [] }
    ]
  },

  // ── THURSDAY (Non-Veg Allowed, Office Day) ──
  {
    day: 'Thursday',
    isVegDay: false,
    isOffDay: false,
    notes: '🏋️ Shoulders + Abs — moderate calorie day. Keep protein high.',
    meals: [
      { mealTime: '6:30 AM', mealName: 'Pre-Workout Fuel', icon: '🌅', calories: '320', protein: '13', order: 1,
        foods: [{ name: '2 Wheat Bread + Peanut Butter', isVeg: true }, { name: '1 Banana', isVeg: true }], vegAlternative: [] },
      { mealTime: '8:30 AM', mealName: 'Post-Workout Breakfast', icon: '🍳', calories: '580', protein: '26', order: 2,
        foods: [{ name: 'Idli (4) + Sambar + Chutney', isVeg: true }, { name: '2 Boiled Eggs', isVeg: false }, { name: '1 Glass Milk', isVeg: true }],
        vegAlternative: [{ name: 'Idli (4) + Sambar + Chutney', isVeg: true }, { name: 'Sprouts Bowl (1 cup)', isVeg: true }, { name: '1 Glass Milk', isVeg: true }] },
      { mealTime: '11:00 AM', mealName: 'Office Snack', icon: '🥜', calories: '270', protein: '9', order: 3,
        foods: [{ name: 'Mixed Nuts (20g)', isVeg: true }, { name: '1 Orange / Guava', isVeg: true }, { name: 'Green Tea', isVeg: true }], vegAlternative: [] },
      { mealTime: '2:00 PM', mealName: 'Lunch', icon: '🍛', calories: '680', protein: '35', order: 4,
        foods: [{ name: '2 Chapati + Rice', isVeg: true }, { name: 'Keema / Chicken Curry (150g)', isVeg: false }, { name: 'Dal + Salad', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati + Rice', isVeg: true }, { name: 'Chole / Rajma (1 bowl)', isVeg: true }, { name: 'Paneer Sabzi', isVeg: true }, { name: 'Dal + Salad', isVeg: true }] },
      { mealTime: '5:00 PM', mealName: 'Evening Snack', icon: '🥤', calories: '350', protein: '30', order: 5,
        foods: [{ name: 'Whey Protein Shake', isVeg: true }, { name: '2 Boiled Eggs', isVeg: false }, { name: '1 Fruit', isVeg: true }],
        vegAlternative: [{ name: 'Whey Protein Shake', isVeg: true }, { name: 'Roasted Makhana (1 cup)', isVeg: true }, { name: '1 Fruit', isVeg: true }] },
      { mealTime: '8:30 PM', mealName: 'Dinner', icon: '🍽️', calories: '570', protein: '25', order: 6,
        foods: [{ name: '2 Chapati', isVeg: true }, { name: 'Egg Bhurji (3 eggs)', isVeg: false }, { name: 'Dal + Curd', isVeg: true }, { name: 'Sabzi', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati', isVeg: true }, { name: 'Tofu Stir Fry (150g)', isVeg: true }, { name: 'Dal + Curd', isVeg: true }, { name: 'Sabzi', isVeg: true }] },
      { mealTime: '10:30 PM', mealName: 'Before Sleep', icon: '🌙', calories: '220', protein: '10', order: 7,
        foods: [{ name: '1 Glass Warm Milk', isVeg: true }, { name: '5 Almonds + 1 tbsp Honey', isVeg: true }], vegAlternative: [] }
    ]
  },

  // ── FRIDAY (Non-Veg Allowed, Office Day) ──
  {
    day: 'Friday',
    isVegDay: false,
    isOffDay: false,
    notes: '🔥 Second chest day — eat well for recovery. Treat yourself a little!',
    meals: [
      { mealTime: '6:30 AM', mealName: 'Pre-Workout Fuel', icon: '🌅', calories: '340', protein: '14', order: 1,
        foods: [{ name: 'Oats + Banana + Peanut Butter', isVeg: true }, { name: '1 Glass Warm Water', isVeg: true }], vegAlternative: [] },
      { mealTime: '8:30 AM', mealName: 'Post-Workout Breakfast', icon: '🍳', calories: '600', protein: '28', order: 2,
        foods: [{ name: 'Moong Dal Cheela (3) + Chutney', isVeg: true }, { name: '3 Boiled Eggs', isVeg: false }, { name: '1 Glass Juice', isVeg: true }],
        vegAlternative: [{ name: 'Moong Dal Cheela (3) + Chutney', isVeg: true }, { name: 'Paneer Sandwich', isVeg: true }, { name: '1 Glass Juice', isVeg: true }] },
      { mealTime: '11:00 AM', mealName: 'Office Snack', icon: '🥜', calories: '280', protein: '8', order: 3,
        foods: [{ name: 'Almonds + Dates (3-4)', isVeg: true }, { name: '1 Banana', isVeg: true }, { name: 'Black Coffee', isVeg: true }], vegAlternative: [] },
      { mealTime: '2:00 PM', mealName: 'Lunch', icon: '🍛', calories: '700', protein: '36', order: 4,
        foods: [{ name: '2 Chapati + Rice', isVeg: true }, { name: 'Butter Chicken / Mutton (150g)', isVeg: false }, { name: 'Dal + Raita', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati + Rice', isVeg: true }, { name: 'Shahi Paneer (150g)', isVeg: true }, { name: 'Dal + Raita', isVeg: true }] },
      { mealTime: '5:00 PM', mealName: 'Evening Snack', icon: '🥤', calories: '360', protein: '30', order: 5,
        foods: [{ name: 'Whey Protein Shake', isVeg: true }, { name: '2 Egg Whites', isVeg: false }, { name: '1 Apple', isVeg: true }],
        vegAlternative: [{ name: 'Whey Protein Shake', isVeg: true }, { name: 'Roasted Chana', isVeg: true }, { name: '1 Apple', isVeg: true }] },
      { mealTime: '8:30 PM', mealName: 'Dinner', icon: '🍽️', calories: '580', protein: '26', order: 6,
        foods: [{ name: '2 Chapati', isVeg: true }, { name: 'Chicken Tikka (100g)', isVeg: false }, { name: 'Dal + Curd', isVeg: true }, { name: 'Sabzi', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati', isVeg: true }, { name: 'Paneer Tikka (100g)', isVeg: true }, { name: 'Dal + Curd', isVeg: true }, { name: 'Sabzi', isVeg: true }] },
      { mealTime: '10:30 PM', mealName: 'Before Sleep', icon: '🌙', calories: '220', protein: '10', order: 7,
        foods: [{ name: '1 Glass Warm Milk + Honey', isVeg: true }, { name: '5 Almonds', isVeg: true }], vegAlternative: [] }
    ]
  },

  // ── SATURDAY (Veg Day, OFF Day — no office) ──
  {
    day: 'Saturday',
    isVegDay: true,
    isOffDay: true,
    notes: '🌿 Pure Veg Day • 🏠 No office — relaxed meal timings. Sleep in, train later!',
    meals: [
      { mealTime: '8:00 AM', mealName: 'Morning Fuel', icon: '🌅', calories: '360', protein: '15', order: 1,
        foods: [{ name: 'Oats + Banana + Dry Fruits + Honey', isVeg: true }, { name: '1 Glass Warm Milk', isVeg: true }], vegAlternative: [] },
      { mealTime: '10:00 AM', mealName: 'Post-Workout Brunch', icon: '🍳', calories: '620', protein: '26', order: 2,
        foods: [{ name: 'Stuffed Paratha (2) — Paneer/Aloo + Curd', isVeg: true }, { name: 'Sprouts Salad (1 bowl)', isVeg: true }, { name: '1 Glass Lassi', isVeg: true }], vegAlternative: [] },
      { mealTime: '12:30 PM', mealName: 'Mid-Day Snack', icon: '🥜', calories: '300', protein: '12', order: 3,
        foods: [{ name: 'Fruit Bowl (Banana, Apple, Papaya)', isVeg: true }, { name: 'Handful of Dry Fruits', isVeg: true }, { name: 'Green Tea', isVeg: true }], vegAlternative: [] },
      { mealTime: '3:00 PM', mealName: 'Lunch', icon: '🍛', calories: '700', protein: '30', order: 4,
        foods: [{ name: '2 Chapati + Rice (1.5 cups)', isVeg: true }, { name: 'Rajma / Chole (1 big bowl)', isVeg: true }, { name: 'Paneer Curry (100g)', isVeg: true }, { name: 'Salad + Curd', isVeg: true }], vegAlternative: [] },
      { mealTime: '5:30 PM', mealName: 'Evening Snack', icon: '🥤', calories: '340', protein: '28', order: 5,
        foods: [{ name: 'Whey Protein Shake', isVeg: true }, { name: 'Roasted Chana + Makhana', isVeg: true }, { name: '1 Fruit', isVeg: true }], vegAlternative: [] },
      { mealTime: '8:30 PM', mealName: 'Dinner', icon: '🍽️', calories: '600', protein: '24', order: 6,
        foods: [{ name: '2 Chapati', isVeg: true }, { name: 'Dal Makhani (1 bowl)', isVeg: true }, { name: 'Mixed Sabzi', isVeg: true }, { name: 'Curd + Papad', isVeg: true }], vegAlternative: [] },
      { mealTime: '10:30 PM', mealName: 'Before Sleep', icon: '🌙', calories: '220', protein: '10', order: 7,
        foods: [{ name: '1 Glass Warm Haldi Milk', isVeg: true }, { name: '5 Almonds + 2 Dates', isVeg: true }], vegAlternative: [] }
    ]
  },

  // ── SUNDAY (Non-Veg Allowed, OFF Day — no office, Rest Day) ──
  {
    day: 'Sunday',
    isVegDay: false,
    isOffDay: true,
    notes: '🧘 Rest & Recovery Day • 🏠 No office — enjoy your meals. Light walk or stretching only.',
    meals: [
      { mealTime: '9:00 AM', mealName: 'Lazy Morning Breakfast', icon: '🌅', calories: '500', protein: '22', order: 1,
        foods: [{ name: 'Aloo/Gobhi Paratha (2) + Curd + Pickle', isVeg: true }, { name: '3 Boiled Eggs or Omelette', isVeg: false }, { name: '1 Glass Chai / Juice', isVeg: true }],
        vegAlternative: [{ name: 'Aloo/Gobhi Paratha (2) + Curd + Pickle', isVeg: true }, { name: 'Paneer Bhurji (100g)', isVeg: true }, { name: '1 Glass Chai / Juice', isVeg: true }] },
      { mealTime: '11:30 AM', mealName: 'Mid-Morning Snack', icon: '🥜', calories: '300', protein: '10', order: 2,
        foods: [{ name: 'Fruit Chaat / Smoothie Bowl', isVeg: true }, { name: 'Mixed Dry Fruits (handful)', isVeg: true }], vegAlternative: [] },
      { mealTime: '2:00 PM', mealName: 'Sunday Special Lunch', icon: '🍛', calories: '800', protein: '40', order: 3,
        foods: [{ name: 'Rice + Chapati (2)', isVeg: true }, { name: 'Chicken Biryani / Mutton Curry', isVeg: false }, { name: 'Raita + Salad', isVeg: true }, { name: 'Papad', isVeg: true }],
        vegAlternative: [{ name: 'Rice + Chapati (2)', isVeg: true }, { name: 'Veg Biryani + Paneer Butter Masala', isVeg: true }, { name: 'Raita + Salad', isVeg: true }, { name: 'Papad', isVeg: true }] },
      { mealTime: '5:00 PM', mealName: 'Evening Snack', icon: '🥤', calories: '340', protein: '28', order: 4,
        foods: [{ name: 'Whey Protein Shake', isVeg: true }, { name: '2 Boiled Eggs', isVeg: false }, { name: '1 Apple / Banana', isVeg: true }],
        vegAlternative: [{ name: 'Whey Protein Shake', isVeg: true }, { name: 'Peanut Butter Toast (2)', isVeg: true }, { name: '1 Apple / Banana', isVeg: true }] },
      { mealTime: '8:00 PM', mealName: 'Light Dinner', icon: '🍽️', calories: '520', protein: '24', order: 5,
        foods: [{ name: '2 Chapati / Dosa (2)', isVeg: true }, { name: 'Egg Curry / Bhurji', isVeg: false }, { name: 'Dal + Curd', isVeg: true }],
        vegAlternative: [{ name: '2 Chapati / Dosa (2)', isVeg: true }, { name: 'Paneer / Soya Curry', isVeg: true }, { name: 'Dal + Curd', isVeg: true }] },
      { mealTime: '10:30 PM', mealName: 'Before Sleep', icon: '🌙', calories: '220', protein: '10', order: 6,
        foods: [{ name: '1 Glass Warm Milk + Honey', isVeg: true }, { name: '5 Almonds', isVeg: true }], vegAlternative: [] }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (workouts + diet only, preserve user progress!)
    await Workout.deleteMany({});
    await Diet.deleteMany({});
    await Progress.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed workouts
    await Workout.insertMany(workoutData);
    console.log('💪 Workout data seeded');

    // Seed diet
    await Diet.insertMany(dietData);
    console.log('🍽️  Diet data seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Progress tracking is empty — log your first weigh-in from the app!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
