import { motion } from 'framer-motion';

export default function MetricCard({ icon, label, value, sub, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="glass-card"
      style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'default' }}
    >
      <div className="flex items-center justify-between">
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        {sub && <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>{sub}</span>}
      </div>
      <p style={{ color: '#9ca3af', fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#39ff14' }}>{value}</p>
    </motion.div>
  );
}
