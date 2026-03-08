const { GoogleGenerativeAI } = require('@google/generative-ai');
const AiDietSession = require('../models/AiDietSession');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getTodayString() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getMidnightTonight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  return midnight;
}

function buildPrompt(breakfast, lunch, snack) {
  return `You are a professional sports nutritionist.

User profile:
- Weight: 63 kg
- Target weight: 70 kg
- Goal: Lean bulking
- Daily calorie target: 2700–2800 kcal
- Daily protein target: 120 g

The user has eaten the following meals today:

Breakfast: ${breakfast || 'Nothing'}
Lunch: ${lunch || 'Nothing'}
Snack: ${snack || 'Nothing'}

Instructions:
1. Estimate the total calories and protein consumed from the meals listed above.
2. Calculate the remaining calories and protein needed to reach the daily targets.
3. Suggest remaining meals for the rest of the day so the user reaches approximately 2700–2800 kcal and 120 g protein total.
4. Use common Indian foods the user would realistically eat.

You MUST respond with ONLY valid JSON in exactly this format, no markdown, no explanation:
{
  "caloriesConsumed": <number>,
  "proteinConsumed": <number>,
  "remainingCalories": <number>,
  "remainingProtein": <number>,
  "suggestedMeals": [
    {
      "meal": "<meal name, e.g. Dinner>",
      "foods": ["<food item 1>", "<food item 2>"],
      "calories": <number>,
      "protein": <number>
    }
  ]
}`;
}

// @desc    Generate or regenerate AI diet plan
// @route   POST /api/ai-diet-adjust
const generateAiDiet = async (req, res) => {
  try {
    const { breakfast, lunch, snack } = req.body;

    if (!breakfast && !lunch && !snack) {
      return res.status(400).json({ message: 'Please enter at least one meal.' });
    }

    const prompt = buildPrompt(breakfast, lunch, snack);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Strip markdown code fences if Gemini wraps the JSON
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (parseErr) {
      console.error('Gemini response parse error:', text);
      return res.status(500).json({ message: 'AI returned an invalid response. Please try again.' });
    }

    const today = getTodayString();
    const expiresAt = getMidnightTonight();

    // Upsert — one session per day
    const session = await AiDietSession.findOneAndUpdate(
      { date: today },
      {
        date: today,
        mealsEaten: { breakfast: breakfast || '', lunch: lunch || '', snack: snack || '' },
        result: {
          caloriesConsumed: parsed.caloriesConsumed || 0,
          proteinConsumed: parsed.proteinConsumed || 0,
          remainingCalories: parsed.remainingCalories || 0,
          remainingProtein: parsed.remainingProtein || 0,
          suggestedMeals: parsed.suggestedMeals || []
        },
        expiresAt
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json(session);
  } catch (error) {
    console.error('AI Diet error:', error);
    return res.status(500).json({ message: error.message || 'Something went wrong with AI generation.' });
  }
};

// @desc    Get today's active AI diet session
// @route   GET /api/ai-diet-adjust
const getAiDietSession = async (req, res) => {
  try {
    const today = getTodayString();
    const session = await AiDietSession.findOne({ date: today });
    return res.json(session); // null if none exists
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { generateAiDiet, getAiDietSession };
