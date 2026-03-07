import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDumbbell, FaUtensils, FaFireAlt, FaDrumstickBite, FaArrowRight } from 'react-icons/fa';
import { TIMELINE_PHASES } from '../utils/constants';
import MotivationalQuotes from '../components/MotivationalQuotes';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const overviewCards = [
  { icon: <FaDumbbell />, title: 'Workout Plan', desc: '6-day push/pull split with progressive overload', color: '#f87171', bg: 'rgba(239,68,68,0.1)' },
  { icon: <FaUtensils />, title: 'Diet Plan', desc: '7-meal daily schedule — veg & non-veg options', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
  { icon: <FaFireAlt />, title: 'Daily Calories', desc: '2,700 – 2,800 kcal caloric surplus', color: '#fb923c', bg: 'rgba(251,146,60,0.1)' },
  { icon: <FaDrumstickBite />, title: 'Protein Intake', desc: '120 – 130 g protein every single day', color: '#39ff14', bg: 'rgba(57,255,20,0.1)' },
];

export default function Landing() {
  return (
    <div className="bg-mesh">
      {/* ── Hero ── */}
      <section className="relative flex items-center" style={{ minHeight: '90vh' }}>
        {/* Animated background circles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="animate-pulse" style={{ position: 'absolute', top: '-6rem', left: '-6rem', width: '24rem', height: '24rem', background: 'rgba(57,255,20,0.05)', borderRadius: '50%', filter: 'blur(60px)' }} />
          <div className="animate-pulse" style={{ position: 'absolute', bottom: '-8rem', right: '-8rem', width: '30rem', height: '30rem', background: 'rgba(57,255,20,0.03)', borderRadius: '50%', filter: 'blur(60px)', animationDelay: '1s' }} />
        </div>

        <div className="container-main" style={{ paddingTop: '5rem', paddingBottom: '5rem', width: '100%' }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.7 }}>
              <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#39ff14', background: 'rgba(57,255,20,0.1)', padding: '0.25rem 0.75rem', borderRadius: '9999px', marginBottom: '1.5rem' }}>
                Lean Bulking Roadmap
              </span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.1 }}>
                <span className="text-gradient">63 kg</span>
                <span style={{ color: '#6b7280', margin: '0 0.75rem' }}>→</span>
                <span className="text-gradient">70 kg</span>
              </h1>
              <p style={{ color: '#9ca3af', marginTop: '1.25rem', fontSize: '1.125rem', maxWidth: '28rem', lineHeight: 1.7 }}>
                A structured 3–4 month transformation plan with personalized diet, workout routines, and progress tracking.
              </p>
              <div className="flex flex-wrap gap-3" style={{ marginTop: '2rem' }}>
                <Link to="/dashboard" className="btn-neon">
                  Start My Journey <FaArrowRight style={{ fontSize: '0.8rem' }} />
                </Link>
                <Link to="/workout" className="btn-outline">
                  View Workout Plan
                </Link>
              </div>
            </motion.div>

            {/* Right — animated fitness illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div style={{ position: 'relative', width: '20rem', height: '20rem' }}>
                {/* Glowing rings */}
                <div className="animate-pulse" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(57,255,20,0.2)' }} />
                <div className="animate-ping" style={{ position: 'absolute', inset: '1rem', borderRadius: '50%', border: '1px solid rgba(57,255,20,0.1)', animationDuration: '3s' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="animate-float" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '5rem' }}>🏋️</p>
                    <p className="neon-text" style={{ color: '#39ff14', fontWeight: 900, fontSize: '1.5rem', marginTop: '0.5rem' }}>BULK MODE</p>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>63 → 70 kg</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Overview Cards ── */}
      <section className="container-main" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {overviewCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -6 }}
              className="glass-card"
              style={{ padding: '1.5rem', cursor: 'default' }}
            >
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1rem', color: card.color }}>
                {card.icon}
              </div>
              <h3 style={{ fontWeight: 700, color: '#fff' }}>{card.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.25rem' }}>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Transformation Timeline ── */}
      <section className="container-main" style={{ maxWidth: '56rem', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: '1.875rem', fontWeight: 900, textAlign: 'center', marginBottom: '3rem' }}
        >
          Your <span className="text-gradient">Transformation</span> Timeline
        </motion.h2>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div className="hidden md:block" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, rgba(57,255,20,0.6), rgba(57,255,20,0.1), transparent)' }} />
          <div className="md:hidden" style={{ position: 'absolute', left: '1.5rem', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, rgba(57,255,20,0.6), rgba(57,255,20,0.1), transparent)' }} />

          {TIMELINE_PHASES.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{ position: 'relative', marginBottom: '2.5rem', paddingLeft: '3.5rem' }}
              className={`md:pl-0 md:flex md:items-center md:gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Circle dot — mobile */}
              <div className="md:hidden" style={{ position: 'absolute', left: '0.75rem', top: '1.25rem', width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: '#39ff14', border: '4px solid #0a0a0a', zIndex: 10 }} />
              {/* Circle dot — desktop */}
              <div className="hidden md:block" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: '#39ff14', border: '4px solid #0a0a0a', zIndex: 10 }} />

              {/* Card */}
              <div style={{ flex: 1 }} className={i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}>
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{phase.icon}</span>
                    <span style={{ color: '#39ff14', fontWeight: 700, fontSize: '0.875rem' }}>{phase.month}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '1.125rem' }}>{phase.title}</h3>
                  <p style={{ color: 'rgba(57,255,20,0.8)', fontSize: '0.875rem', fontWeight: 600, marginTop: '0.25rem' }}>{phase.weightRange}</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>{phase.description}</p>
                </div>
              </div>

              {/* Spacer for alternation */}
              <div className="hidden md:block" style={{ flex: 1 }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Motivational Quotes ── */}
      <section className="container-main" style={{ maxWidth: '42rem', paddingBottom: '5rem' }}>
        <MotivationalQuotes />
      </section>
    </div>
  );
}
