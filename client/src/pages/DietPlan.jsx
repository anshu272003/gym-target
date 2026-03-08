import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoFlame, IoSparkles } from 'react-icons/io5';
import { GiMeat } from 'react-icons/gi';
import { FaLeaf, FaBriefcase, FaHome, FaClipboardList } from 'react-icons/fa';
import MealCard from '../components/MealCard';
import AiDietPlanner from '../components/AiDietPlanner';
import useApi from '../hooks/useApi';
import { getDiet } from '../utils/api';
import { FALLBACK_DIET } from '../utils/constants';

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getTodayIndex() {
  const jsDay = new Date().getDay(); // 0=Sun
  return jsDay === 0 ? 6 : jsDay - 1; // convert to Mon=0 … Sun=6
}

const TABS = [
  { id: 'standard', label: 'Standard Diet Plan', icon: <FaClipboardList /> },
  { id: 'ai',       label: 'AI Diet Planner',    icon: <IoSparkles /> },
];

export default function DietPlan() {
  const { data: diet, loading, error } = useApi(getDiet);
  const [activeDay, setActiveDay] = useState(getTodayIndex());
  const [activeTab, setActiveTab] = useState('standard');

  const days = diet && diet.length > 0 ? diet : (error ? FALLBACK_DIET : []);
  const selected = days.length > 0 ? days[activeDay] : null;

  // Calculate totals for selected day
  const totalCalories = selected ? selected.meals.reduce((sum, m) => {
    const cal = m.calories.toString().includes('-') ? parseInt(m.calories.split('-')[1]) : parseInt(m.calories);
    return sum + (cal || 0);
  }, 0) : 0;

  const totalProtein = selected ? selected.meals.reduce((sum, m) => sum + (parseInt(m.protein) || 0), 0) : 0;

  const isToday = activeDay === getTodayIndex();

  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2.5rem 1rem' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#fff' }}>
          Day-wise <span className="text-gradient">Diet Plan</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Tap a day to see what to eat • Today is highlighted
        </p>
      </motion.div>

      {/* ── Tab Switcher ── */}
      <div className="flex gap-2" style={{ marginBottom: '1.5rem' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: isActive ? '1px solid rgba(57,255,20,0.5)' : '1px solid rgba(255,255,255,0.08)',
                background: isActive ? 'rgba(57,255,20,0.12)' : '#1a1a1a',
                color: isActive ? '#39ff14' : '#6b7280',
                boxShadow: isActive ? '0 0 20px rgba(57,255,20,0.12)' : 'none',
                transition: 'all 0.25s',
              }}
            >
              {tab.icon} {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'standard' ? (
          <motion.div
            key="standard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {loading && !error ? (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: '#6b7280' }}>
                <div style={{ width: '2rem', height: '2rem', border: '2px solid #39ff14', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 0.75rem', animation: 'spin 1s linear infinite' }} />
                Loading diet plan...
              </div>
            ) : (
              <>
                {/* Day selector tabs */}
                <div className="flex flex-wrap gap-2" style={{ marginBottom: '1.5rem' }}>
                  {days.map((d, i) => {
                    const isCurrent = i === activeDay;
                    const isDayToday = i === getTodayIndex();
                    return (
                      <motion.button
                        key={d.day}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setActiveDay(i)}
                        style={{
                          padding: '0.5rem 0.875rem',
                          borderRadius: '0.75rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          border: isCurrent ? '1px solid rgba(57,255,20,0.4)' : isDayToday ? '1px solid rgba(57,255,20,0.2)' : '1px solid rgba(255,255,255,0.05)',
                          background: isCurrent ? 'rgba(57,255,20,0.1)' : '#1a1a1a',
                          color: isCurrent ? '#39ff14' : '#9ca3af',
                          boxShadow: isCurrent ? '0 0 15px rgba(57,255,20,0.15)' : 'none',
                          display: 'flex', alignItems: 'center', gap: '0.375rem',
                        }}
                      >
                        {d.day.slice(0, 3)}
                        {d.isVegDay && <FaLeaf style={{ color: '#4ade80', fontSize: '0.65rem' }} />}
                        {isDayToday && !isCurrent && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#39ff14' }} />}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Selected day content */}
                <AnimatePresence mode="wait">
                  {selected && (
                    <motion.div
                      key={selected.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Day header card */}
                      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
                        <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: selected.notes ? '0.75rem' : 0 }}>
                          {/* Day name + badges */}
                          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>
                            {selected.day}
                            {isToday && <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#39ff14', background: 'rgba(57,255,20,0.1)', padding: '0.15rem 0.5rem', borderRadius: '9999px', marginLeft: '0.5rem', verticalAlign: 'middle' }}>TODAY</span>}
                          </h2>

                          <div className="flex items-center gap-2" style={{ marginLeft: 'auto' }}>
                            {selected.isVegDay && (
                              <span className="flex items-center gap-1" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                                <FaLeaf /> Pure Veg
                              </span>
                            )}
                            {selected.isOffDay ? (
                              <span className="flex items-center gap-1" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#60a5fa', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                                <FaHome /> Day Off
                              </span>
                            ) : (
                              <span className="flex items-center gap-1" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#fb923c', background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.2)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                                <FaBriefcase /> Office Day
                              </span>
                            )}
                          </div>
                        </div>

                        {selected.notes && (
                          <p style={{ color: '#9ca3af', fontSize: '0.85rem', padding: '0.6rem 0.75rem', background: 'rgba(26,26,26,0.5)', borderRadius: '0.5rem', borderLeft: '2px solid rgba(57,255,20,0.4)' }}>
                            {selected.notes}
                          </p>
                        )}
                      </div>

                      {/* Daily totals */}
                      <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ color: '#9ca3af', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meals</p>
                          <p style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', marginTop: '0.15rem' }}>{selected.meals.length}</p>
                        </div>
                        <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.1)' }} className="hidden sm:block" />
                        <div style={{ textAlign: 'center' }}>
                          <p className="flex items-center justify-center gap-1" style={{ color: '#9ca3af', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <IoFlame style={{ color: '#fb923c' }} /> Calories
                          </p>
                          <p style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fb923c', marginTop: '0.15rem' }}>~{totalCalories} kcal</p>
                        </div>
                        <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.1)' }} className="hidden sm:block" />
                        <div style={{ textAlign: 'center' }}>
                          <p className="flex items-center justify-center gap-1" style={{ color: '#9ca3af', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <GiMeat style={{ color: '#39ff14' }} /> Protein
                          </p>
                          <p style={{ fontSize: '1.25rem', fontWeight: 900, color: '#39ff14', marginTop: '0.15rem' }}>~{totalProtein} g</p>
                        </div>
                      </div>

                      {/* Meal cards */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {selected.meals
                          .sort((a, b) => (a.order || 0) - (b.order || 0))
                          .map((meal, i) => (
                            <MealCard key={meal._id || i} meal={meal} index={i} isVegDay={selected.isVegDay} />
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        ) : (
          /* ── AI Diet Planner Tab ── */
          <motion.div
            key="ai"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AiDietPlanner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card"
        style={{ padding: '1.5rem', marginTop: '2.5rem' }}
      >
        <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#39ff14', marginBottom: '0.75rem' }}>💡 Nutrition Tips</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
          {[
            'Drink at least 3–4 liters of water daily. Stay hydrated!',
            'Consume protein within 30 minutes post-workout for optimal muscle recovery.',
            "Don't skip the before-sleep meal — casein protein aids overnight recovery.",
            'Monday & Saturday are pure veg — focus on paneer, dal, soya & legumes.',
            'Weekend meals have relaxed timings since there\'s no office rush.',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#39ff14', marginTop: '0.375rem', flexShrink: 0 }} />
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
