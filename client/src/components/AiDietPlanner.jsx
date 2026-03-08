import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoFlame, IoSparkles, IoRefresh, IoCreate, IoFastFood } from 'react-icons/io5';
import { GiMeat } from 'react-icons/gi';
import { FaUtensils } from 'react-icons/fa';
import { generateAiDiet, getAiDietSession } from '../utils/api';

const CALORIE_GOAL = 2750; // midpoint of 2700-2800
const PROTEIN_GOAL = 120;

const mealFields = [
  { key: 'breakfast', label: 'Breakfast', icon: '🌅', placeholder: 'e.g. 2 bread slices with butter and tea' },
  { key: 'lunch',     label: 'Lunch',     icon: '☀️', placeholder: 'e.g. 2 chapati with dal' },
  { key: 'snack',     label: 'Snack',     icon: '🍌', placeholder: 'e.g. Banana and buttermilk' },
];

function ProgressBar({ consumed, goal, label, color, unit }) {
  const pct = Math.min((consumed / goal) * 100, 100);
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div className="flex items-center justify-between" style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.35rem' }}>
        <span>{label}</span>
        <span style={{ color }}>{consumed} / {goal} {unit}</span>
      </div>
      <div style={{ height: '10px', background: '#1a1a1a', borderRadius: '999px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: '999px', background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 12px ${color}66` }}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card"
      style={{ padding: '1.25rem', textAlign: 'center', flex: '1 1 140px', minWidth: '140px' }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>{icon}</div>
      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 900, color }}>{value}<span style={{ fontSize: '0.75rem', fontWeight: 600, marginLeft: '0.2rem' }}>{unit}</span></p>
    </motion.div>
  );
}

function SuggestedMealCard({ meal, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
      className="glass-card"
      style={{ overflow: 'hidden' }}
    >
      <div style={{ background: 'linear-gradient(to right, rgba(57,255,20,0.1), transparent)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <FaUtensils style={{ color: '#39ff14' }} />
          <p style={{ color: '#fff', fontWeight: 700 }}>{meal.meal}</p>
        </div>
        <div className="flex gap-3" style={{ fontSize: '0.75rem' }}>
          <span className="flex items-center gap-1" style={{ color: '#fb923c' }}><IoFlame /> {meal.calories} kcal</span>
          <span className="flex items-center gap-1" style={{ color: '#39ff14' }}><GiMeat /> {meal.protein}g</span>
        </div>
      </div>
      <div style={{ padding: '1rem 1.25rem' }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {meal.foods.map((food, i) => (
            <li key={i} className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(57,255,20,0.6)', flexShrink: 0 }} />
              {food}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function AiDietPlanner() {
  const [meals, setMeals] = useState({ breakfast: '', lunch: '', snack: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Load existing session on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await getAiDietSession();
        if (res.data) {
          setMeals(res.data.mealsEaten || { breakfast: '', lunch: '', snack: '' });
          setResult(res.data.result);
        }
      } catch {
        // no session — that's fine
      } finally {
        setInitialLoad(false);
      }
    })();
  }, []);

  const handleChange = (key, value) => {
    setMeals(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!meals.breakfast && !meals.lunch && !meals.snack) {
      setError('Please enter at least one meal.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await generateAiDiet(meals);
      setResult(res.data.result);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const hasResult = result && result.suggestedMeals && result.suggestedMeals.length > 0;

  if (initialLoad) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
        <div style={{ width: '2rem', height: '2rem', border: '2px solid #39ff14', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 0.75rem', animation: 'spin 1s linear infinite' }} />
        Loading AI session...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Meal Input Cards */}
      <AnimatePresence mode="wait">
        {(!hasResult || isEditing) && (
          <motion.div
            key="inputs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <h3 className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '0.25rem' }}>
                <IoFastFood style={{ color: '#39ff14' }} /> What did you eat today?
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '1rem' }}>
                Describe your meals in plain language. The AI will estimate calories & protein.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mealFields.map((field) => (
                  <div key={field.key}>
                    <label className="flex items-center gap-2" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9ca3af', marginBottom: '0.35rem' }}>
                      <span>{field.icon}</span> {field.label}
                    </label>
                    <textarea
                      className="input-dark"
                      rows={2}
                      placeholder={field.placeholder}
                      value={meals[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      style={{ resize: 'vertical', minHeight: '2.5rem' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center' }}>
                {error}
              </motion.p>
            )}

            <div className="flex flex-wrap gap-3" style={{ justifyContent: 'center' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={loading}
                className="btn-neon"
                style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? (
                  <>
                    <div style={{ width: '1rem', height: '1rem', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Generating...
                  </>
                ) : isEditing ? (
                  <><IoRefresh /> Regenerate Plan</>
                ) : (
                  <><IoSparkles /> Generate AI Plan</>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card"
            style={{ padding: '3rem', textAlign: 'center' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: '3rem', height: '3rem', border: '3px solid rgba(57,255,20,0.2)', borderTopColor: '#39ff14', borderRadius: '50%', margin: '0 auto 1rem' }}
            />
            <p style={{ color: '#39ff14', fontWeight: 700, fontSize: '1.1rem' }}>AI is analyzing your meals...</p>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.35rem' }}>Estimating nutrition & generating adjusted plan</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {hasResult && !loading && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Progress Bars */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: '1rem' }}>📊 Daily Progress</h3>
              <ProgressBar consumed={result.caloriesConsumed} goal={CALORIE_GOAL} label="Calories" color="#fb923c" unit="kcal" />
              <ProgressBar consumed={result.proteinConsumed} goal={PROTEIN_GOAL} label="Protein" color="#39ff14" unit="g" />
            </motion.div>

            {/* Stat Cards */}
            <div className="flex flex-wrap gap-3">
              <StatCard label="Calories Consumed" value={result.caloriesConsumed} unit="kcal" icon={<IoFlame style={{ color: '#fb923c' }} />} color="#fb923c" delay={0.15} />
              <StatCard label="Protein Consumed" value={result.proteinConsumed} unit="g" icon={<GiMeat style={{ color: '#39ff14' }} />} color="#39ff14" delay={0.25} />
              <StatCard label="Remaining Calories" value={result.remainingCalories} unit="kcal" icon={<IoFlame style={{ color: '#60a5fa' }} />} color="#60a5fa" delay={0.35} />
              <StatCard label="Remaining Protein" value={result.remainingProtein} unit="g" icon={<GiMeat style={{ color: '#a78bfa' }} />} color="#a78bfa" delay={0.45} />
            </div>

            {/* Suggested Meals */}
            <div>
              <h3 className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem' }}>
                <IoSparkles style={{ color: '#39ff14' }} /> AI Suggested Meals
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.suggestedMeals.map((meal, i) => (
                  <SuggestedMealCard key={i} meal={meal} index={i} />
                ))}
              </div>
            </div>

            {/* Edit / Regenerate Button */}
            {!isEditing && (
              <div className="flex flex-wrap gap-3" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEdit}
                  className="btn-outline"
                  style={{ fontSize: '0.85rem' }}
                >
                  <IoCreate style={{ fontSize: '1.1rem' }} /> Edit Meals & Regenerate
                </motion.button>
              </div>
            )}

            {/* Valid today notice */}
            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#4b5563' }}>
              ⏰ This AI plan is valid for today only. It expires at midnight.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
