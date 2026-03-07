import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoFlame } from 'react-icons/io5';

const inputStyle = {
  width: '100%',
  background: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem',
  fontSize: '0.875rem',
  color: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const act = parseFloat(activity);
    if (!a || !w || !h) return;
    const bmr = 10 * w + 6.25 * h - 5 * a + 5;
    const tdee = Math.round(bmr * act);
    const surplus = tdee + 300;
    setResult({ bmr: Math.round(bmr), tdee, surplus });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card"
      style={{ padding: '1.5rem' }}
    >
      <h3 className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.125rem', color: '#fff', marginBottom: '1rem' }}>
        <IoFlame style={{ color: '#fb923c' }} /> Daily Calorie Calculator
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="22" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="63" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Light (1-3 days/week)</option>
            <option value="1.55">Moderate (3-5 days/week)</option>
            <option value="1.725">Active (6-7 days/week)</option>
            <option value="1.9">Very Active (2x/day)</option>
          </select>
        </div>
      </div>

      <button onClick={calculate} className="btn-neon" style={{ width: '100%', padding: '0.625rem', fontSize: '0.875rem', fontWeight: 700 }}>
        Calculate
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="grid grid-cols-3 gap-2"
          style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
        >
          <div>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{result.bmr}</p>
            <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase' }}>BMR</p>
          </div>
          <div>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#60a5fa' }}>{result.tdee}</p>
            <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase' }}>TDEE</p>
          </div>
          <div>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#39ff14' }}>{result.surplus}</p>
            <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase' }}>Bulk Target</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
