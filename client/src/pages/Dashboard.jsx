import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Tooltip, Legend, Filler
} from 'chart.js';
import { FaWeight, FaBullseye, FaFireAlt } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';
import MetricCard from '../components/MetricCard';
import BMICalculator from '../components/BMICalculator';
import CalorieCalculator from '../components/CalorieCalculator';
import useApi from '../hooks/useApi';
import { getProgress } from '../utils/api';
import { CURRENT_WEIGHT, TARGET_WEIGHT, CALORIE_DISTRIBUTION } from '../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

const chartOpts = (title) => ({
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
});

export default function Dashboard() {
  const { data: progress, loading } = useApi(getProgress);

  const sorted = useMemo(() => {
    if (!progress) return [];
    return [...progress].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [progress]);

  const latest = sorted.length ? sorted[sorted.length - 1] : null;
  const currentWeight = latest?.weight ?? CURRENT_WEIGHT;
  const progressPct = Math.min(100, Math.round(((currentWeight - CURRENT_WEIGHT) / (TARGET_WEIGHT - CURRENT_WEIGHT)) * 100));

  const labels = sorted.map((p) => new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));

  const weightChart = {
    labels,
    datasets: [{
      label: 'Weight (kg)',
      data: sorted.map((p) => p.weight),
      borderColor: '#39ff14',
      backgroundColor: 'rgba(57,255,20,0.08)',
      fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#39ff14',
    }],
  };

  const calorieChart = {
    labels,
    datasets: [{
      label: 'Calories',
      data: sorted.map((p) => p.calories),
      borderColor: '#00bfff',
      backgroundColor: 'rgba(0,191,255,0.08)',
      fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#00bfff',
    }],
  };

  const pieData = {
    labels: CALORIE_DISTRIBUTION.labels,
    datasets: [{
      data: CALORIE_DISTRIBUTION.values,
      backgroundColor: CALORIE_DISTRIBUTION.colors,
      borderWidth: 0, hoverOffset: 8,
    }],
  };

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2.5rem 1rem' }}>
      {/* Title */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#fff' }}>Your <span className="text-gradient">Dashboard</span></h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Track your lean bulking progress at a glance</p>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '2rem' }}>
        <MetricCard icon="⚖️" label="Current Weight" value={`${currentWeight} kg`} delay={0} />
        <MetricCard icon="🎯" label="Target Weight" value={`${TARGET_WEIGHT} kg`} delay={0.1} />
        <MetricCard icon="🔥" label="Daily Calories" value="2,700–2,800" sub="kcal" delay={0.2} />
        <MetricCard icon="🥩" label="Daily Protein" value="120–130 g" delay={0.3} />
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
        style={{ padding: '1.5rem', marginBottom: '2rem' }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff' }}>Weight Journey</h3>
          <span style={{ color: '#39ff14', fontSize: '0.875rem', fontWeight: 700 }}>{progressPct}%</span>
        </div>
        <div style={{ width: '100%', height: '1rem', background: '#1a1a1a', borderRadius: '9999px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(to right, #39ff14, #34d399)', borderRadius: '9999px', position: 'relative' }}
          >
            <span style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '9px', fontWeight: 700, color: '#000' }}>
              {currentWeight} kg
            </span>
          </motion.div>
        </div>
        <div className="flex justify-between" style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
          <span>{CURRENT_WEIGHT} kg</span>
          <span>{TARGET_WEIGHT} kg</span>
        </div>
      </motion.div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6" style={{ marginBottom: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card lg:col-span-2"
          style={{ padding: '1.25rem' }}
        >
          <h3 className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff', marginBottom: '1rem' }}>
            <FaWeight style={{ color: '#39ff14' }} /> Weight Progress
          </h3>
          <div style={{ height: '16rem' }}>
            {sorted.length > 0 ? (
              <Line data={weightChart} options={chartOpts('Weight')} />
            ) : (
              <div className="flex items-center justify-center" style={{ height: '100%', color: '#4b5563', fontSize: '0.875rem' }}>
                {loading ? 'Loading...' : 'No progress data yet. Start logging!'}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card"
          style={{ padding: '1.25rem' }}
        >
          <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff', marginBottom: '1rem' }}>Macro Split</h3>
          <div className="flex items-center justify-center" style={{ height: '14rem' }}>
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { color: '#888', font: { size: 11 }, padding: 12 } },
                  tooltip: { backgroundColor: '#1a1a1a', borderColor: '#39ff14', borderWidth: 1 }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Calorie intake chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card"
        style={{ padding: '1.25rem', marginBottom: '2rem' }}
      >
        <h3 className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff', marginBottom: '1rem' }}>
          <FaFireAlt style={{ color: '#fb923c' }} /> Calorie Intake Trend
        </h3>
        <div style={{ height: '16rem' }}>
          {sorted.length > 0 ? (
            <Line data={calorieChart} options={chartOpts('Calories')} />
          ) : (
            <div className="flex items-center justify-center" style={{ height: '100%', color: '#4b5563', fontSize: '0.875rem' }}>
              {loading ? 'Loading...' : 'No data available'}
            </div>
          )}
        </div>
      </motion.div>

      {/* Calculators */}
      <div className="grid md:grid-cols-2 gap-6">
        <BMICalculator />
        <CalorieCalculator />
      </div>
    </div>
  );
}
