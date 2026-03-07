const Progress = require('../models/Progress');

// @desc    Get all progress entries
// @route   GET /api/progress
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find().sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new progress entry (weekly weigh-in)
// @route   POST /api/progress
const addProgress = async (req, res) => {
  try {
    const { weight, calories, protein, date, notes } = req.body;

    const entryDate = date ? new Date(date) : new Date();

    // Auto-calculate week number from start date
    const startDate = new Date('2026-03-07'); // Journey start (first Saturday)
    const diffMs = entryDate - startDate;
    const weekNum = Math.max(1, Math.ceil(diffMs / (7 * 24 * 60 * 60 * 1000)));

    const progress = new Progress({
      weight,
      calories: calories || null,
      protein: protein || null,
      date: entryDate,
      notes: notes || '',
      week: weekNum
    });

    const savedProgress = await progress.save();
    res.status(201).json(savedProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update progress entry
// @route   PUT /api/progress/:id
const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    const updated = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete progress entry
// @route   DELETE /api/progress/:id
const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    await progress.deleteOne();
    res.json({ message: 'Progress entry removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProgress, addProgress, updateProgress, deleteProgress };
