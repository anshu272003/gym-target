import { motion } from 'framer-motion';
import { FaLeaf, FaDrumstickBite } from 'react-icons/fa';
import { IoFlame } from 'react-icons/io5';
import { GiMeat } from 'react-icons/gi';

export default function MealCard({ meal, index, isVegDay = false }) {
  const hasVegAlt = meal.vegAlternative && meal.vegAlternative.length > 0;

  // On veg days: show veg alternative if it exists, otherwise show main foods
  // On non-veg days: show main foods, and veg alt as a switchable option
  const primaryFoods = isVegDay && hasVegAlt ? meal.vegAlternative : meal.foods;
  const secondaryFoods = isVegDay ? null : (hasVegAlt ? meal.vegAlternative : null);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card"
      style={{ overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{ background: isVegDay ? 'linear-gradient(to right, rgba(74,222,128,0.08), transparent)' : 'linear-gradient(to right, rgba(57,255,20,0.1), transparent)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '1.5rem' }}>{meal.icon}</span>
          <div>
            <p style={{ color: '#39ff14', fontWeight: 700, fontSize: '0.875rem' }}>{meal.mealTime}</p>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{meal.mealName}</p>
          </div>
        </div>
        <div className="flex gap-3" style={{ fontSize: '0.75rem' }}>
          <span className="flex items-center gap-1" style={{ color: '#fb923c' }}>
            <IoFlame /> {meal.calories} kcal
          </span>
          <span className="flex items-center gap-1" style={{ color: '#39ff14' }}>
            <GiMeat /> {meal.protein}g
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem' }}>
        {/* Primary foods */}
        <div style={{ marginBottom: secondaryFoods ? '0.75rem' : 0 }}>
          {isVegDay && hasVegAlt ? (
            <p className="flex items-center gap-1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4ade80', marginBottom: '0.5rem' }}>
              <FaLeaf style={{ color: '#4ade80' }} /> Veg Day Menu
            </p>
          ) : hasVegAlt ? (
            <p className="flex items-center gap-1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '0.5rem' }}>
              <FaDrumstickBite style={{ color: '#f87171' }} /> Non-Veg Option
            </p>
          ) : null}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {primaryFoods.map((f, i) => (
              <li key={i} className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isVegDay ? 'rgba(74,222,128,0.6)' : 'rgba(57,255,20,0.6)', flexShrink: 0 }} />
                {f.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Veg alternative (only on non-veg days) */}
        {secondaryFoods && (
          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="flex items-center gap-1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '0.5rem' }}>
              <FaLeaf style={{ color: '#4ade80' }} /> Veg Alternative
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {secondaryFoods.map((f, i) => (
                <li key={i} className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(74,222,128,0.6)', flexShrink: 0 }} />
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
