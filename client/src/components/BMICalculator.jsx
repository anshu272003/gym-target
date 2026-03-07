import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator } from 'react-icons/fa';

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

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return;
    const bmi = (w / (h * h)).toFixed(1);
    let category = '';
    let color = '';
    if (bmi < 18.5) { category = 'Underweight'; color = '#60a5fa'; }
    else if (bmi < 25) { category = 'Normal'; color = '#39ff14'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#fbbf24'; }
    else { category = 'Obese'; color = '#f87171'; }
    setResult({ bmi, category, color });
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
        <FaCalculator style={{ color: '#39ff14' }} /> BMI Calculator
      </h3>

      <div className="grid grid-cols-2 gap-3" style={{ marginBottom: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="63" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" style={inputStyle} />
        </div>
      </div>

      <button onClick={calculate} className="btn-neon" style={{ width: '100%', padding: '0.625rem', fontSize: '0.875rem', fontWeight: 700 }}>
        Calculate BMI
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
        >
          <p style={{ fontSize: '1.875rem', fontWeight: 800, color: '#fff' }}>{result.bmi}</p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '0.25rem', color: result.color }}>{result.category}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
