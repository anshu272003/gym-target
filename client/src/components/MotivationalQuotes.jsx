import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { MOTIVATIONAL_QUOTES } from '../utils/constants';

export default function MotivationalQuotes() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const quote = MOTIVATIONAL_QUOTES[idx];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden', minHeight: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <FaQuoteLeft style={{ color: 'rgba(57,255,20,0.2)', fontSize: '1.75rem', position: 'absolute', top: '1rem', left: '1rem' }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <p style={{ color: '#e5e7eb', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '32rem', margin: '0 auto' }}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <p style={{ color: '#39ff14', fontSize: '0.75rem', marginTop: '0.75rem', fontWeight: 600 }}>— {quote.author}</p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-1.5" style={{ marginTop: '1rem' }}>
        {MOTIVATIONAL_QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? '1rem' : '0.375rem',
              height: '0.375rem',
              borderRadius: '9999px',
              background: i === idx ? '#39ff14' : '#4b5563',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
