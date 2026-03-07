import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Tooltip, Legend, Filler
} from 'chart.js';
import { FaPlus, FaTrash, FaCalendarCheck } from 'react-icons/fa';
import useApi from '../hooks/useApi';
import { getProgress, addProgress, deleteProgress } from '../utils/api';
import { CURRENT_WEIGHT, TARGET_WEIGHT } from '../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

// Get next Saturday date string (YYYY-MM-DD)
function getNextSaturday() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun ... 6=Sat
  const diff = day === 6 ? 0 : (6 - day);
  const sat = new Date(now);
  sat.setDate(now.getDate() + diff);
  return sat.toISOString().split('T')[0];
}

// Check if today is Saturday
function isTodaySaturday() {
  return new Date().getDay() === 6;
}

const defaultForm = {
  weight: '',
  calories: '',
  protein: '',
  notes: '',
  date: getNextSaturday(),
};

const lineOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1a1a',
      titleColor: '#39ff14',
      bodyColor: '#ccc',
      borderColor: '#39ff14',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 10,
    },
  },
  scales: {
    x: { ticks: { color: '#555', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.03)' } },
    y: { ticks: { color: '#555', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.03)' } },
  },
};

const inputStyle = {
  width: '100%',
  background: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  padding: '0.625rem 0.75rem',
  fontSize: '0.875rem',
  color: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function ProgressTracker() {
  const { data: progress, loading, refetch } = useApi(getProgress);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const sorted = useMemo(() => {
    if (!progress) return [];
    return [...progress].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [progress]);

  // Week labels
  const labels = sorted.map((p) => {
    const d = new Date(p.date);
    const weekLabel = p.week ? `Wk ${p.week}` : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    return weekLabel;
  });

  const weightData = {
    labels,
    datasets: [{
      label: 'Weight (kg)',
      data: sorted.map((p) => p.weight),
      borderColor: '#39ff14',
      backgroundColor: 'rgba(57,255,20,0.08)',
      fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: '#39ff14',
      pointHoverRadius: 8,
    }],
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.weight) return;
    try {
      setSubmitting(true);
      await addProgress({
        weight: parseFloat(form.weight),
        calories: form.calories ? parseInt(form.calories) : null,
        protein: form.protein ? parseInt(form.protein) : null,
        date: form.date,
        notes: form.notes,
      });
      setForm({ ...defaultForm, date: getNextSaturday() });
      refetch();
    } catch (err) {
      console.error('Failed to log progress', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try { await deleteProgress(id); refetch(); } catch (err) { console.error('Failed to delete', err); }
  };

  const latest = sorted.length ? sorted[sorted.length - 1] : null;
  const currentWeight = latest?.weight ?? CURRENT_WEIGHT;
  const remaining = TARGET_WEIGHT - currentWeight;
  const weeksLeft = remaining > 0 ? Math.ceil(remaining / 0.4) : 0;
  const gained = (currentWeight - CURRENT_WEIGHT).toFixed(1);
  const progressPct = Math.min(100, Math.max(0, Math.round(((currentWeight - CURRENT_WEIGHT) / (TARGET_WEIGHT - CURRENT_WEIGHT)) * 100)));
  const totalWeeksLogged = sorted.length;

  // Weekly change
  const weeklyChange = sorted.length >= 2
    ? (sorted[sorted.length - 1].weight - sorted[sorted.length - 2].weight).toFixed(1)
    : null;

  return (
    <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2.5rem 1rem' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#fff' }}>Weekly <span className="text-gradient">Weigh-In</span></h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Log your weight every Saturday to track your bulking journey — 63 kg → 70 kg
        </p>
      </motion.div>

      {/* Saturday reminder banner */}
      {isTodaySaturday() && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', borderLeft: '3px solid #39ff14', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <span style={{ fontSize: '1.5rem' }}>📅</span>
          <div>
            <p style={{ color: '#39ff14', fontWeight: 700, fontSize: '0.875rem' }}>It&apos;s Saturday — Weigh-in day!</p>
            <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Step on the scale and log your weight below.</p>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6" style={{ marginBottom: '2rem' }}>
        {/* ── Weekly Weigh-in form ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card lg:col-span-1"
          style={{ padding: '1.5rem' }}
        >
          <h3 className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.125rem', color: '#fff', marginBottom: '0.25rem' }}>
            <FaCalendarCheck style={{ color: '#39ff14', fontSize: '1rem' }} /> Saturday Weigh-In
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.75rem', marginBottom: '1rem' }}>Weight is required • calories &amp; protein are optional</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Date (Saturday)</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#39ff14', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>Weight (kg) *</label>
              <input type="number" step="0.1" name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 63.5" style={{ ...inputStyle, borderColor: 'rgba(57,255,20,0.3)' }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Avg Calories</label>
                <input type="number" name="calories" value={form.calories} onChange={handleChange} placeholder="optional" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Avg Protein (g)</label>
                <input type="number" name="protein" value={form.protein} onChange={handleChange} placeholder="optional" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows="2" placeholder="How was your week? Any PRs?" style={{ ...inputStyle, resize: 'vertical', minHeight: '3rem' }} />
            </div>
          </div>
          <button type="submit" disabled={submitting} className="btn-neon" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', fontSize: '0.875rem', fontWeight: 700, opacity: submitting ? 0.5 : 1 }}>
            {submitting ? 'Logging...' : '✅ Log This Week'}
          </button>
        </motion.form>

        {/* ── Stats + Estimator ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card lg:col-span-2"
          style={{ padding: '1.5rem' }}
        >
          <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#fff', marginBottom: '1rem' }}>📈 Journey Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ marginBottom: '1.25rem' }}>
            {[
              { val: `${currentWeight} kg`, label: 'Current', color: '#fff' },
              { val: `+${gained} kg`, label: 'Gained', color: parseFloat(gained) > 0 ? '#39ff14' : '#6b7280' },
              { val: `${remaining > 0 ? remaining.toFixed(1) : '0'} kg`, label: 'Remaining', color: '#fb923c' },
              { val: `${totalWeeksLogged}`, label: 'Weeks Logged', color: '#60a5fa' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '0.875rem 0.5rem', background: 'rgba(26,26,26,0.5)', borderRadius: '0.75rem' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 900, color: item.color }}>{item.val}</p>
                <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
              </div>
            ))}
          </div>

          {weeklyChange !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem 0.75rem', background: 'rgba(26,26,26,0.5)', borderRadius: '0.5rem', fontSize: '0.8rem', flexWrap: 'wrap' }}>
              <span>{parseFloat(weeklyChange) >= 0 ? '📈' : '📉'}</span>
              <span style={{ color: '#9ca3af' }}>Last week:</span>
              <span style={{ color: parseFloat(weeklyChange) >= 0 ? '#39ff14' : '#f87171', fontWeight: 700 }}>
                {parseFloat(weeklyChange) >= 0 ? '+' : ''}{weeklyChange} kg
              </span>
              <span style={{ color: '#6b7280' }}>
                {parseFloat(weeklyChange) >= 0.3 && parseFloat(weeklyChange) <= 0.5 ? '(ideal pace 🎯)' :
                 parseFloat(weeklyChange) > 0.5 ? '(fast — watch fat gain)' :
                 parseFloat(weeklyChange) >= 0 ? '(slow — eat more!)' : '(dip — stay consistent)'}
              </span>
            </div>
          )}

          {/* Progress bar */}
          <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <span style={{ color: '#9ca3af' }}>Progress to 70 kg</span>
            <span style={{ color: '#39ff14', fontWeight: 700 }}>{progressPct}%</span>
          </div>
          <div style={{ width: '100%', height: '0.75rem', background: '#1a1a1a', borderRadius: '9999px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1.2 }}
              style={{ height: '100%', background: 'linear-gradient(to right, #39ff14, #34d399)', borderRadius: '9999px' }}
            />
          </div>
          <div className="flex justify-between" style={{ marginTop: '0.375rem', fontSize: '0.7rem', color: '#6b7280' }}>
            <span>{CURRENT_WEIGHT} kg (start)</span>
            <span>~{weeksLeft} weeks left</span>
            <span>{TARGET_WEIGHT} kg 🏆</span>
          </div>
        </motion.div>
      </div>

      {/* ── Weight Chart ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card"
        style={{ padding: '1.25rem', marginBottom: '2rem' }}
      >
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '0.75rem' }}>⚖️ Weekly Weight Chart</h3>
        <div style={{ height: '16rem' }}>
          {sorted.length > 0 ? (
            <Line data={weightData} options={{
              ...lineOpts,
              scales: {
                ...lineOpts.scales,
                y: {
                  ...lineOpts.scales.y,
                  suggestedMin: CURRENT_WEIGHT - 1,
                  suggestedMax: TARGET_WEIGHT + 1,
                },
              },
            }} />
          ) : (
            <div className="flex flex-col items-center justify-center" style={{ height: '100%', gap: '0.75rem' }}>
              <span style={{ fontSize: '3rem' }}>📊</span>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center' }}>
                {loading ? 'Loading...' : 'No weigh-ins yet. Log your first Saturday weigh-in above!'}
              </p>
              <p style={{ color: '#4b5563', fontSize: '0.75rem' }}>Your weight journey chart will appear here</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Weekly Log Table ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card"
        style={{ padding: '1.5rem', overflowX: 'auto' }}
      >
        <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#fff', marginBottom: '1rem' }}>📋 Weekly Log</h3>
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
            <span style={{ fontSize: '2.5rem' }}>🏋️</span>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.75rem' }}>
              {loading ? 'Loading entries...' : 'Your weekly weigh-in history will appear here.'}
            </p>
            <p style={{ color: '#4b5563', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Step on the scale every Saturday and log it above!
            </p>
          </div>
        ) : (
          <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#6b7280', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ paddingBottom: '0.75rem', paddingRight: '1rem', fontWeight: 500 }}>Week</th>
                <th style={{ paddingBottom: '0.75rem', paddingRight: '1rem', fontWeight: 500 }}>Date</th>
                <th style={{ paddingBottom: '0.75rem', paddingRight: '1rem', fontWeight: 500 }}>Weight</th>
                <th style={{ paddingBottom: '0.75rem', paddingRight: '1rem', fontWeight: 500 }}>Change</th>
                <th style={{ paddingBottom: '0.75rem', paddingRight: '1rem', fontWeight: 500 }}>Notes</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {[...sorted].reverse().map((entry, idx) => {
                const reversedIdx = sorted.length - 1 - idx;
                const prev = reversedIdx > 0 ? sorted[reversedIdx - 1] : null;
                const change = prev ? (entry.weight - prev.weight).toFixed(1) : null;
                return (
                  <tr key={entry._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '0.75rem 1rem 0.75rem 0' }}>
                      <span style={{ background: 'rgba(57,255,20,0.1)', color: '#39ff14', padding: '0.15rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                        {entry.week ? `W${entry.week}` : `#${reversedIdx + 1}`}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem 0.75rem 0', color: '#d1d5db' }}>
                      {new Date(entry.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </td>
                    <td style={{ padding: '0.75rem 1rem 0.75rem 0', fontWeight: 700, color: '#39ff14', fontSize: '0.95rem' }}>{entry.weight} kg</td>
                    <td style={{ padding: '0.75rem 1rem 0.75rem 0' }}>
                      {change !== null ? (
                        <span style={{ color: parseFloat(change) >= 0 ? '#39ff14' : '#f87171', fontWeight: 600 }}>
                          {parseFloat(change) >= 0 ? '+' : ''}{change} kg
                        </span>
                      ) : (
                        <span style={{ color: '#4b5563' }}>start</span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem 1rem 0.75rem 0', color: '#9ca3af', fontSize: '0.8rem', maxWidth: '12rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {entry.notes || '—'}
                    </td>
                    <td style={{ padding: '0.75rem 0', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        title="Delete"
                        style={{ color: '#4b5563', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card"
        style={{ padding: '1.25rem', marginTop: '1.5rem' }}
      >
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#39ff14', marginBottom: '0.5rem' }}>💡 Weigh-In Tips</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8rem', color: '#9ca3af' }}>
          {[
            'Weigh yourself every Saturday morning, right after waking up, before eating.',
            'Use the same scale every time for consistency.',
            'Aim for 0.3 – 0.5 kg gain per week for a clean lean bulk.',
            'If gaining too fast (>0.5 kg/week), slightly reduce calories. Too slow? Eat more!',
            'Weight can fluctuate due to water — trust the weekly trend, not daily numbers.',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#39ff14', marginTop: '0.4rem', flexShrink: 0 }} />
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
