const Diet = require('../models/Diet');

// @desc    Get all day-wise diet plans
// @route   GET /api/diet
const getDiet = async (req, res) => {
  try {
    const diet = await Diet.find().sort({ _id: 1 });
    res.json(diet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new day diet plan
// @route   POST /api/diet
const addDiet = async (req, res) => {
  try {
    const diet = new Diet(req.body);
    const saved = await diet.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a day diet plan
// @route   PUT /api/diet/:id
const updateDiet = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);
    if (!diet) return res.status(404).json({ message: 'Diet day not found' });

    const updated = await Diet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getDiet, addDiet, updateDiet };
