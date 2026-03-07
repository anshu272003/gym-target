export const CURRENT_WEIGHT = 63;
export const TARGET_WEIGHT = 70;
export const DAILY_CALORIES_MIN = 2700;
export const DAILY_CALORIES_MAX = 2800;
export const DAILY_PROTEIN_MIN = 120;
export const DAILY_PROTEIN_MAX = 130;
export const TRANSFORMATION_MONTHS = '3–4';

export const TIMELINE_PHASES = [
  {
    month: 'Month 1',
    title: 'Foundation Phase',
    weightRange: '63 → 64.5 kg',
    description: 'Master form on compound lifts. Establish calorie surplus. Build consistent eating habits.',
    color: 'from-emerald-500 to-green-400',
    icon: '🏗️'
  },
  {
    month: 'Month 2',
    title: 'Growth Phase',
    weightRange: '64.5 → 66.5 kg',
    description: 'Progressive overload on all lifts. Increase training volume. Track macros consistently.',
    color: 'from-green-400 to-lime-400',
    icon: '📈'
  },
  {
    month: 'Month 3',
    title: 'Acceleration Phase',
    weightRange: '66.5 → 68.5 kg',
    description: 'Advanced training techniques. Mid-month deload week. Refine nutrition timing.',
    color: 'from-lime-400 to-yellow-400',
    icon: '🚀'
  },
  {
    month: 'Month 4',
    title: 'Final Push',
    weightRange: '68.5 → 70 kg',
    description: 'Peak performance training. Fine-tune diet for final gains. Reach target weight!',
    color: 'from-yellow-400 to-neon-green',
    icon: '🏆'
  }
];

export const MOTIVATIONAL_QUOTES = [
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { text: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Unknown" },
  { text: "Success isn't always about greatness. It's about consistency.", author: "Dwayne Johnson" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "No citizen has a right to be an amateur in the matter of physical training.", author: "Socrates" },
  { text: "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character.", author: "Arnold Schwarzenegger" },
  { text: "Strength does not come from the physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "The clock is ticking. Are you becoming the person you want to be?", author: "Greg Plitt" },
  { text: "What hurts today makes you stronger tomorrow.", author: "Jay Cutler" },
  { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" }
];

export const CALORIE_DISTRIBUTION = {
  labels: ['Protein (30%)', 'Carbs (45%)', 'Fats (25%)'],
  values: [30, 45, 25],
  colors: ['#39ff14', '#00bfff', '#ff6b35']
};

export const MUSCLE_GROUP_COLORS = {
  Chest:     'bg-red-500/20 text-red-400 border border-red-500/30',
  Back:      'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  Legs:      'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  Shoulders: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  Biceps:    'bg-pink-500/20 text-pink-400 border border-pink-500/30',
  Triceps:   'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  Abs:       'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Calves:    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
};

export const DAY_COLORS = {
  Monday:    'border-red-500/40',
  Tuesday:   'border-blue-500/40',
  Wednesday: 'border-purple-500/40',
  Thursday:  'border-orange-500/40',
  Friday:    'border-pink-500/40',
  Saturday:  'border-cyan-500/40',
  Sunday:    'border-green-500/40'
};

// Sample fallback data (used when backend is unreachable) — day-wise structure
export const FALLBACK_DIET = [
  { _id:'1', day:'Monday', isVegDay:true, isOffDay:false, notes:'Pure veg day. Focus on paneer, dal, soya for protein.', meals:[
    { mealTime:'6:30 AM', mealName:'Pre-Workout Fuel', icon:'🌅', calories:'330', protein:'14', foods:[{name:'2 Whole Wheat Bread Slices'},{name:'2 tbsp Peanut Butter'},{name:'1 Banana'}], vegAlternative:[], order:1 },
    { mealTime:'8:30 AM', mealName:'Post-Workout Breakfast', icon:'🍳', calories:'550', protein:'25', foods:[{name:'Poha (1.5 cups)'},{name:'Paneer Bhurji (100g)'},{name:'1 Banana'},{name:'1 Glass Orange Juice'}], vegAlternative:[], order:2 },
    { mealTime:'11:00 AM', mealName:'Office Snack', icon:'🥜', calories:'280', protein:'8', foods:[{name:'Handful of Almonds (15-20)'},{name:'1 Banana or Apple'},{name:'Green Tea'}], vegAlternative:[], order:3 },
    { mealTime:'2:00 PM', mealName:'Lunch', icon:'🍛', calories:'650', protein:'30', foods:[{name:'2 Chapati'},{name:'Rice (1 cup)'},{name:'Dal (1 bowl)'},{name:'Paneer Curry (150g)'},{name:'Rajma (1 bowl)'},{name:'Mixed Salad'}], vegAlternative:[], order:4 },
    { mealTime:'5:00 PM', mealName:'Evening Snack', icon:'🥤', calories:'320', protein:'28', foods:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Apple'},{name:'Roasted Chana (1 cup)'}], vegAlternative:[], order:5 },
    { mealTime:'8:30 PM', mealName:'Dinner', icon:'🍽️', calories:'550', protein:'22', foods:[{name:'2 Chapati'},{name:'Soya Chunk Curry (1 bowl)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], vegAlternative:[], order:6 },
    { mealTime:'10:30 PM', mealName:'Before Sleep', icon:'🌙', calories:'220', protein:'10', foods:[{name:'1 Glass Warm Milk'},{name:'5 Soaked Almonds'},{name:'1 tbsp Honey'}], vegAlternative:[], order:7 },
  ]},
  { _id:'2', day:'Tuesday', isVegDay:false, isOffDay:false, notes:'Non-veg day. Chicken & eggs for high protein.', meals:[
    { mealTime:'6:30 AM', mealName:'Pre-Workout Fuel', icon:'🌅', calories:'330', protein:'14', foods:[{name:'2 Whole Wheat Bread Slices'},{name:'2 tbsp Peanut Butter'},{name:'1 Banana'}], vegAlternative:[], order:1 },
    { mealTime:'8:30 AM', mealName:'Post-Workout Breakfast', icon:'🍳', calories:'600', protein:'30', foods:[{name:'Poha (1.5 cups)'},{name:'3 Boiled Eggs'},{name:'1 Banana'},{name:'1 Glass Orange Juice'}], vegAlternative:[{name:'Poha (1.5 cups)'},{name:'Paneer Bhurji (100g)'},{name:'1 Banana'},{name:'1 Glass Orange Juice'}], order:2 },
    { mealTime:'11:00 AM', mealName:'Office Snack', icon:'🥜', calories:'280', protein:'8', foods:[{name:'Handful of Almonds (15-20)'},{name:'1 Banana or Apple'},{name:'Green Tea'}], vegAlternative:[], order:3 },
    { mealTime:'2:00 PM', mealName:'Lunch', icon:'🍛', calories:'650', protein:'35', foods:[{name:'2 Chapati'},{name:'Rice (1 cup)'},{name:'Dal (1 bowl)'},{name:'Chicken Curry (150g)'},{name:'Mixed Salad'}], vegAlternative:[{name:'2 Chapati'},{name:'Rice (1 cup)'},{name:'Dal (1 bowl)'},{name:'Paneer Curry (150g)'},{name:'Mixed Salad'}], order:4 },
    { mealTime:'5:00 PM', mealName:'Evening Snack', icon:'🥤', calories:'350', protein:'30', foods:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Apple'},{name:'2 Boiled Eggs'}], vegAlternative:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Apple'},{name:'Roasted Chana (1 cup)'}], order:5 },
    { mealTime:'8:30 PM', mealName:'Dinner', icon:'🍽️', calories:'550', protein:'25', foods:[{name:'2 Chapati'},{name:'Egg Curry (2 eggs)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], vegAlternative:[{name:'2 Chapati'},{name:'Paneer Tikka (100g)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], order:6 },
    { mealTime:'10:30 PM', mealName:'Before Sleep', icon:'🌙', calories:'220', protein:'10', foods:[{name:'1 Glass Warm Milk'},{name:'5 Soaked Almonds'},{name:'1 tbsp Honey'}], vegAlternative:[], order:7 },
  ]},
  { _id:'3', day:'Wednesday', isVegDay:false, isOffDay:false, notes:'Non-veg day. Swap chicken with fish for variety.', meals:[
    { mealTime:'6:30 AM', mealName:'Pre-Workout Fuel', icon:'🌅', calories:'330', protein:'14', foods:[{name:'2 Whole Wheat Bread Slices'},{name:'2 tbsp Peanut Butter'},{name:'1 Banana'}], vegAlternative:[], order:1 },
    { mealTime:'8:30 AM', mealName:'Post-Workout Breakfast', icon:'🍳', calories:'600', protein:'30', foods:[{name:'Upma (1.5 cups)'},{name:'3 Boiled Eggs'},{name:'1 Banana'},{name:'1 Glass Milk'}], vegAlternative:[{name:'Upma (1.5 cups)'},{name:'Paneer Bhurji (100g)'},{name:'1 Banana'},{name:'1 Glass Milk'}], order:2 },
    { mealTime:'11:00 AM', mealName:'Office Snack', icon:'🥜', calories:'280', protein:'8', foods:[{name:'Mixed Nuts (15-20)'},{name:'1 Apple'},{name:'Green Tea'}], vegAlternative:[], order:3 },
    { mealTime:'2:00 PM', mealName:'Lunch', icon:'🍛', calories:'650', protein:'35', foods:[{name:'2 Chapati'},{name:'Rice (1 cup)'},{name:'Dal (1 bowl)'},{name:'Fish Curry (150g)'},{name:'Mixed Salad'}], vegAlternative:[{name:'2 Chapati'},{name:'Rice (1 cup)'},{name:'Dal (1 bowl)'},{name:'Chole (1 bowl)'},{name:'Mixed Salad'}], order:4 },
    { mealTime:'5:00 PM', mealName:'Evening Snack', icon:'🥤', calories:'350', protein:'30', foods:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Apple'},{name:'2 Boiled Eggs'}], vegAlternative:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Apple'},{name:'Peanut Butter Toast'}], order:5 },
    { mealTime:'8:30 PM', mealName:'Dinner', icon:'🍽️', calories:'550', protein:'25', foods:[{name:'2 Chapati'},{name:'Chicken Tikka (100g)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], vegAlternative:[{name:'2 Chapati'},{name:'Paneer Tikka (100g)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], order:6 },
    { mealTime:'10:30 PM', mealName:'Before Sleep', icon:'🌙', calories:'220', protein:'10', foods:[{name:'1 Glass Warm Milk'},{name:'5 Soaked Almonds'},{name:'1 tbsp Honey'}], vegAlternative:[], order:7 },
  ]},
  { _id:'4', day:'Thursday', isVegDay:false, isOffDay:false, notes:'Non-veg day. Heavy leg day — eat extra carbs.', meals:[
    { mealTime:'6:30 AM', mealName:'Pre-Workout Fuel', icon:'🌅', calories:'330', protein:'14', foods:[{name:'Oats with Milk (1 bowl)'},{name:'1 Banana'},{name:'5 Almonds'}], vegAlternative:[], order:1 },
    { mealTime:'8:30 AM', mealName:'Post-Workout Breakfast', icon:'🍳', calories:'600', protein:'30', foods:[{name:'Paratha (2)'},{name:'3 Boiled Eggs'},{name:'Curd (1 bowl)'},{name:'1 Glass Orange Juice'}], vegAlternative:[{name:'Paratha (2)'},{name:'Paneer Bhurji (100g)'},{name:'Curd (1 bowl)'},{name:'1 Glass Orange Juice'}], order:2 },
    { mealTime:'11:00 AM', mealName:'Office Snack', icon:'🥜', calories:'280', protein:'8', foods:[{name:'Trail Mix (handful)'},{name:'1 Banana'},{name:'Green Tea'}], vegAlternative:[], order:3 },
    { mealTime:'2:00 PM', mealName:'Lunch', icon:'🍛', calories:'680', protein:'35', foods:[{name:'2 Chapati'},{name:'Rice (1.5 cups)'},{name:'Dal (1 bowl)'},{name:'Chicken Curry (150g)'},{name:'Mixed Salad'}], vegAlternative:[{name:'2 Chapati'},{name:'Rice (1.5 cups)'},{name:'Dal (1 bowl)'},{name:'Rajma (1 bowl)'},{name:'Mixed Salad'}], order:4 },
    { mealTime:'5:00 PM', mealName:'Evening Snack', icon:'🥤', calories:'350', protein:'30', foods:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Banana'},{name:'2 Boiled Eggs'}], vegAlternative:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Banana'},{name:'Sprouts (1 cup)'}], order:5 },
    { mealTime:'8:30 PM', mealName:'Dinner', icon:'🍽️', calories:'550', protein:'25', foods:[{name:'2 Chapati'},{name:'Egg Bhurji (3 eggs)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], vegAlternative:[{name:'2 Chapati'},{name:'Soya Chunk Curry'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], order:6 },
    { mealTime:'10:30 PM', mealName:'Before Sleep', icon:'🌙', calories:'220', protein:'10', foods:[{name:'1 Glass Warm Milk'},{name:'5 Soaked Almonds'},{name:'1 tbsp Honey'}], vegAlternative:[], order:7 },
  ]},
  { _id:'5', day:'Friday', isVegDay:false, isOffDay:false, notes:'Non-veg day. Light cardio — keep protein high.', meals:[
    { mealTime:'6:30 AM', mealName:'Pre-Workout Fuel', icon:'🌅', calories:'330', protein:'14', foods:[{name:'2 Whole Wheat Bread Slices'},{name:'2 tbsp Peanut Butter'},{name:'1 Banana'}], vegAlternative:[], order:1 },
    { mealTime:'8:30 AM', mealName:'Post-Workout Breakfast', icon:'🍳', calories:'600', protein:'30', foods:[{name:'Poha (1.5 cups)'},{name:'3 Boiled Eggs'},{name:'1 Banana'},{name:'1 Glass Milk'}], vegAlternative:[{name:'Poha (1.5 cups)'},{name:'Paneer Bhurji (100g)'},{name:'1 Banana'},{name:'1 Glass Milk'}], order:2 },
    { mealTime:'11:00 AM', mealName:'Office Snack', icon:'🥜', calories:'280', protein:'8', foods:[{name:'Almonds (15-20)'},{name:'1 Apple'},{name:'Green Tea'}], vegAlternative:[], order:3 },
    { mealTime:'2:00 PM', mealName:'Lunch', icon:'🍛', calories:'650', protein:'35', foods:[{name:'2 Chapati'},{name:'Rice (1 cup)'},{name:'Dal (1 bowl)'},{name:'Chicken Curry (150g)'},{name:'Mixed Salad'}], vegAlternative:[{name:'2 Chapati'},{name:'Rice (1 cup)'},{name:'Dal (1 bowl)'},{name:'Paneer Butter Masala (150g)'},{name:'Mixed Salad'}], order:4 },
    { mealTime:'5:00 PM', mealName:'Evening Snack', icon:'🥤', calories:'350', protein:'30', foods:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Apple'},{name:'2 Boiled Eggs'}], vegAlternative:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Apple'},{name:'Roasted Chana (1 cup)'}], order:5 },
    { mealTime:'8:30 PM', mealName:'Dinner', icon:'🍽️', calories:'550', protein:'25', foods:[{name:'2 Chapati'},{name:'Egg Curry (2 eggs)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], vegAlternative:[{name:'2 Chapati'},{name:'Paneer Tikka (100g)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], order:6 },
    { mealTime:'10:30 PM', mealName:'Before Sleep', icon:'🌙', calories:'220', protein:'10', foods:[{name:'1 Glass Warm Milk'},{name:'5 Soaked Almonds'},{name:'1 tbsp Honey'}], vegAlternative:[], order:7 },
  ]},
  { _id:'6', day:'Saturday', isVegDay:true, isOffDay:true, notes:'Veg day + day off. Relaxed timings. Sleep in and recover!', meals:[
    { mealTime:'8:00 AM', mealName:'Morning Fuel', icon:'🌅', calories:'350', protein:'15', foods:[{name:'Oats with Milk & Banana'},{name:'5 Almonds'},{name:'Green Tea'}], vegAlternative:[], order:1 },
    { mealTime:'10:00 AM', mealName:'Brunch', icon:'🍳', calories:'550', protein:'22', foods:[{name:'Aloo Paratha (2)'},{name:'Curd (1 bowl)'},{name:'Paneer Bhurji (100g)'},{name:'1 Glass Orange Juice'}], vegAlternative:[], order:2 },
    { mealTime:'12:30 PM', mealName:'Midday Snack', icon:'🥜', calories:'280', protein:'8', foods:[{name:'Sprouts Chaat (1 bowl)'},{name:'1 Banana'},{name:'Buttermilk'}], vegAlternative:[], order:3 },
    { mealTime:'3:00 PM', mealName:'Lunch', icon:'🍛', calories:'650', protein:'28', foods:[{name:'2 Chapati'},{name:'Rice (1 cup)'},{name:'Dal Tadka (1 bowl)'},{name:'Paneer Curry (150g)'},{name:'Mixed Salad'}], vegAlternative:[], order:4 },
    { mealTime:'6:00 PM', mealName:'Evening Snack', icon:'🥤', calories:'320', protein:'28', foods:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Apple'},{name:'Peanut Butter Toast'}], vegAlternative:[], order:5 },
    { mealTime:'9:00 PM', mealName:'Dinner', icon:'🍽️', calories:'550', protein:'22', foods:[{name:'2 Chapati'},{name:'Chole (1 bowl)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], vegAlternative:[], order:6 },
    { mealTime:'11:00 PM', mealName:'Before Sleep', icon:'🌙', calories:'220', protein:'10', foods:[{name:'1 Glass Warm Milk'},{name:'5 Soaked Almonds'},{name:'1 tbsp Honey'}], vegAlternative:[], order:7 },
  ]},
  { _id:'7', day:'Sunday', isVegDay:false, isOffDay:true, notes:'Day off + rest day. Non-veg allowed. Sleep well, recover fully!', meals:[
    { mealTime:'9:00 AM', mealName:'Late Breakfast', icon:'🌅', calories:'400', protein:'18', foods:[{name:'Omelette (3 eggs)'},{name:'2 Toast Slices'},{name:'1 Banana'},{name:'1 Glass Juice'}], vegAlternative:[{name:'Besan Chilla (2)'},{name:'2 Toast Slices'},{name:'1 Banana'},{name:'1 Glass Juice'}], order:1 },
    { mealTime:'12:00 PM', mealName:'Brunch', icon:'🍳', calories:'600', protein:'30', foods:[{name:'Chicken Biryani (1.5 cups)'},{name:'Raita (1 bowl)'},{name:'Mixed Salad'}], vegAlternative:[{name:'Veg Biryani (1.5 cups)'},{name:'Raita (1 bowl)'},{name:'Mixed Salad'}], order:2 },
    { mealTime:'3:00 PM', mealName:'Afternoon Snack', icon:'🥜', calories:'280', protein:'8', foods:[{name:'Mixed Nuts (handful)'},{name:'1 Apple'},{name:'Green Tea'}], vegAlternative:[], order:3 },
    { mealTime:'6:00 PM', mealName:'Evening Snack', icon:'🥤', calories:'350', protein:'30', foods:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Banana'},{name:'2 Boiled Eggs'}], vegAlternative:[{name:'Whey Protein Shake (1 scoop)'},{name:'1 Banana'},{name:'Roasted Chana (1 cup)'}], order:4 },
    { mealTime:'9:00 PM', mealName:'Dinner', icon:'🍽️', calories:'600', protein:'30', foods:[{name:'2 Chapati'},{name:'Chicken Curry (150g)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], vegAlternative:[{name:'2 Chapati'},{name:'Paneer Butter Masala (150g)'},{name:'Dal (1 bowl)'},{name:'Curd (1 bowl)'},{name:'Sabzi (seasonal)'}], order:5 },
    { mealTime:'11:00 PM', mealName:'Before Sleep', icon:'🌙', calories:'220', protein:'10', foods:[{name:'1 Glass Warm Milk'},{name:'5 Soaked Almonds'},{name:'1 tbsp Honey'}], vegAlternative:[], order:6 },
  ]},
];

export const FALLBACK_WORKOUTS = [
  { _id:'1', day:'Monday', focus:'Chest + Triceps', isRestDay:false, exercises:[{name:'Flat Bench Press',sets:4,reps:'8',muscleGroup:'Chest'},{name:'Incline Dumbbell Press',sets:3,reps:'10',muscleGroup:'Chest'},{name:'Cable Flyes',sets:3,reps:'12',muscleGroup:'Chest'},{name:'Chest Dips',sets:3,reps:'10',muscleGroup:'Chest'},{name:'Tricep Pushdowns',sets:3,reps:'12',muscleGroup:'Triceps'},{name:'Overhead Tricep Extension',sets:3,reps:'10',muscleGroup:'Triceps'}] },
  { _id:'2', day:'Tuesday', focus:'Back + Biceps', isRestDay:false, exercises:[{name:'Deadlifts',sets:4,reps:'6',muscleGroup:'Back'},{name:'Lat Pulldowns',sets:3,reps:'10',muscleGroup:'Back'},{name:'Seated Cable Rows',sets:3,reps:'10',muscleGroup:'Back'},{name:'Barbell Rows',sets:3,reps:'8',muscleGroup:'Back'},{name:'Barbell Curls',sets:3,reps:'10',muscleGroup:'Biceps'},{name:'Hammer Curls',sets:3,reps:'12',muscleGroup:'Biceps'}] },
  { _id:'3', day:'Wednesday', focus:'Legs', isRestDay:false, exercises:[{name:'Barbell Squats',sets:4,reps:'8',muscleGroup:'Legs'},{name:'Leg Press',sets:3,reps:'10',muscleGroup:'Legs'},{name:'Romanian Deadlifts',sets:3,reps:'10',muscleGroup:'Legs'},{name:'Leg Curls',sets:3,reps:'12',muscleGroup:'Legs'},{name:'Leg Extensions',sets:3,reps:'12',muscleGroup:'Legs'},{name:'Standing Calf Raises',sets:4,reps:'15',muscleGroup:'Calves'}] },
  { _id:'4', day:'Thursday', focus:'Shoulders + Abs', isRestDay:false, exercises:[{name:'Overhead Press',sets:4,reps:'8',muscleGroup:'Shoulders'},{name:'Lateral Raises',sets:3,reps:'15',muscleGroup:'Shoulders'},{name:'Front Raises',sets:3,reps:'12',muscleGroup:'Shoulders'},{name:'Face Pulls',sets:3,reps:'15',muscleGroup:'Shoulders'},{name:'Hanging Leg Raises',sets:3,reps:'12',muscleGroup:'Abs'},{name:'Cable Crunches',sets:3,reps:'15',muscleGroup:'Abs'}] },
  { _id:'5', day:'Friday', focus:'Chest + Biceps', isRestDay:false, exercises:[{name:'Incline Bench Press',sets:4,reps:'8',muscleGroup:'Chest'},{name:'Dumbbell Flyes',sets:3,reps:'12',muscleGroup:'Chest'},{name:'Push-ups (to failure)',sets:3,reps:'15+',muscleGroup:'Chest'},{name:'Preacher Curls',sets:3,reps:'10',muscleGroup:'Biceps'},{name:'Concentration Curls',sets:3,reps:'12',muscleGroup:'Biceps'},{name:'Cable Curls',sets:3,reps:'12',muscleGroup:'Biceps'}] },
  { _id:'6', day:'Saturday', focus:'Back + Triceps', isRestDay:false, exercises:[{name:'Pull-ups',sets:3,reps:'Max',muscleGroup:'Back'},{name:'Bent Over Rows',sets:4,reps:'8',muscleGroup:'Back'},{name:'T-Bar Rows',sets:3,reps:'10',muscleGroup:'Back'},{name:'Close Grip Bench Press',sets:3,reps:'10',muscleGroup:'Triceps'},{name:'Skull Crushers',sets:3,reps:'10',muscleGroup:'Triceps'},{name:'Tricep Kickbacks',sets:3,reps:'12',muscleGroup:'Triceps'}] },
  { _id:'7', day:'Sunday', focus:'Rest & Recovery', isRestDay:true, exercises:[] },
];
