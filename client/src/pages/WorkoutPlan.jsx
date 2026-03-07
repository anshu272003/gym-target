import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarDay, FaBed } from 'react-icons/fa';
import { GiMuscleUp } from 'react-icons/gi';
import ExerciseCard from '../components/ExerciseCard';
import useApi from '../hooks/useApi';
import { getWorkouts } from '../utils/api';
import { FALLBACK_WORKOUTS } from '../utils/constants';

export default function WorkoutPlan() {
  const { data: workouts, loading, error } = useApi(getWorkouts);
  const [activeDay, setActiveDay] = useState(null);

  const days = workouts && workouts.length > 0 ? workouts : (error ? FALLBACK_WORKOUTS : []);

  if (days.length > 0 && activeDay === null) {
    const todayIdx = new Date().getDay();
    const dayMap = [6, 0, 1, 2, 3, 4, 5];
    const idx = dayMap[todayIdx];
    if (idx < days.length) setActiveDay(idx);
    else setActiveDay(0);
  }

  const selected = activeDay !== null ? days[activeDay] : null;

  return (
    <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2.5rem 1rem' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#fff' }}>Weekly <span className="text-gradient">Workout Plan</span></h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>6-day split for maximum muscle growth • Tap a day to see exercises</p>
      </motion.div>

      {loading && !error ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#6b7280' }}>
          <div style={{ width: '2rem', height: '2rem', border: '2px solid #39ff14', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 0.75rem', animation: 'spin 1s linear infinite' }} />
          Loading workouts...
        </div>
      ) : (
        <>
          {/* Day selector */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: '2rem' }}>
            {days.map((w, i) => (
              <motion.button
                key={w.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setActiveDay(i)}
                style={{
                  padding: '0.625rem 1rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: activeDay === i ? '1px solid rgba(57,255,20,0.4)' : '1px solid rgba(255,255,255,0.05)',
                  background: activeDay === i ? 'rgba(57,255,20,0.1)' : '#1a1a1a',
                  color: activeDay === i ? '#39ff14' : '#9ca3af',
                  boxShadow: activeDay === i ? '0 0 15px rgba(57,255,20,0.15)' : 'none',
                }}
              >
                {w.day.slice(0, 3)}
                {w.isRestDay && <span style={{ marginLeft: '0.375rem', fontSize: '10px' }}>😴</span>}
              </motion.button>
            ))}
          </div>

          {/* Selected day content */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {/* Day header */}
                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="flex items-center gap-4">
                    <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: 'rgba(57,255,20,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {selected.isRestDay ? (
                        <FaBed style={{ color: '#4ade80', fontSize: '1.5rem' }} />
                      ) : (
                        <GiMuscleUp style={{ color: '#39ff14', fontSize: '1.5rem' }} />
                      )}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>{selected.day}</h2>
                      <p style={{ color: '#39ff14', fontWeight: 600, fontSize: '0.875rem' }}>{selected.focus}</p>
                    </div>
                    {!selected.isRestDay && (
                      <div className="hidden sm:block" style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>{selected.exercises.length}</p>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>exercises</p>
                      </div>
                    )}
                  </div>

                  {selected.notes && (
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem', padding: '0.75rem', background: 'rgba(26,26,26,0.5)', borderRadius: '0.5rem', borderLeft: '2px solid rgba(57,255,20,0.4)' }}>
                      💡 {selected.notes}
                    </p>
                  )}
                </div>

                {/* Rest day */}
                {selected.isRestDay ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card"
                    style={{ padding: '3rem', textAlign: 'center' }}
                  >
                    <p style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>🧘</p>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Rest & Recovery Day</h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem', maxWidth: '24rem', marginInline: 'auto' }}>
                      Take it easy. Focus on stretching, foam rolling, hydration, and getting 7–8 hours of sleep.
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-3">
                    {selected.exercises.map((ex, i) => (
                      <ExerciseCard key={i} exercise={ex} index={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Weekly overview table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card"
        style={{ padding: '1.5rem', marginTop: '2.5rem', overflowX: 'auto' }}
      >
        <h3 className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.125rem', color: '#fff', marginBottom: '1rem' }}>
          <FaCalendarDay style={{ color: '#39ff14' }} /> Weekly Overview
        </h3>
        <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#6b7280', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ paddingBottom: '0.75rem', paddingRight: '1rem', fontWeight: 500 }}>Day</th>
              <th style={{ paddingBottom: '0.75rem', paddingRight: '1rem', fontWeight: 500 }}>Focus</th>
              <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'center' }}>Exercises</th>
            </tr>
          </thead>
          <tbody>
            {days.map((w) => (
              <tr key={w.day} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '0.75rem 1rem 0.75rem 0', fontWeight: 600, color: '#fff' }}>{w.day}</td>
                <td style={{ padding: '0.75rem 1rem 0.75rem 0', color: '#9ca3af' }}>{w.focus}</td>
                <td style={{ padding: '0.75rem 0', textAlign: 'center' }}>
                  {w.isRestDay ? (
                    <span style={{ color: '#4ade80', fontSize: '0.75rem' }}>Rest 😴</span>
                  ) : (
                    <span style={{ color: '#39ff14', fontWeight: 700 }}>{w.exercises.length}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
