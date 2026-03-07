import { motion } from 'framer-motion';
import { GiWeightLiftingUp } from 'react-icons/gi';

const muscleColors = {
  Chest: { bg: 'rgba(239,68,68,0.15)', text: '#f87171', border: 'rgba(239,68,68,0.3)' },
  Back: { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
  Shoulders: { bg: 'rgba(168,85,247,0.15)', text: '#a78bfa', border: 'rgba(168,85,247,0.3)' },
  Biceps: { bg: 'rgba(251,146,60,0.15)', text: '#fb923c', border: 'rgba(251,146,60,0.3)' },
  Triceps: { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  Legs: { bg: 'rgba(57,255,20,0.15)', text: '#39ff14', border: 'rgba(57,255,20,0.3)' },
  Core: { bg: 'rgba(236,72,153,0.15)', text: '#ec4899', border: 'rgba(236,72,153,0.3)' },
  Cardio: { bg: 'rgba(34,211,238,0.15)', text: '#22d3ee', border: 'rgba(34,211,238,0.3)' },
};

const fallback = { bg: 'rgba(107,114,128,0.15)', text: '#9ca3af', border: 'rgba(107,114,128,0.3)' };

export default function ExerciseCard({ exercise, index }) {
  const c = muscleColors[exercise.muscleGroup] || fallback;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ scale: 1.04, y: -3 }}
      className="glass-card"
      style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
    >
      {/* Icon */}
      <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', background: 'rgba(57,255,20,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <GiWeightLiftingUp style={{ color: '#39ff14', fontSize: '1.125rem' }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{exercise.name}</p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
          {exercise.sets} sets × {exercise.reps} reps
        </p>
      </div>

      {/* Muscle tag */}
      <span style={{ fontSize: '10px', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontWeight: 500, background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
        {exercise.muscleGroup}
      </span>
    </motion.div>
  );
}
