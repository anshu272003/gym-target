import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { GiMuscleUp } from 'react-icons/gi';

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/diet', label: 'Diet Plan' },
  { to: '/workout', label: 'Workout' },
  { to: '/progress', label: 'Progress' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="container-main">
        <div className="flex items-center justify-between" style={{ height: '4rem' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <GiMuscleUp style={{ color: '#39ff14', fontSize: '1.5rem' }} />
            <span style={{ fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.02em', color: '#fff' }}>
              Lean<span style={{ color: '#39ff14' }}>Bulk</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: pathname === l.to ? '#39ff14' : '#9ca3af',
                  background: pathname === l.to ? 'rgba(57,255,20,0.1)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== l.to) { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,0.05)'; }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== l.to) { e.target.style.color = '#9ca3af'; e.target.style.background = 'transparent'; }
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{ color: '#d1d5db', background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer' }}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden"
            style={{ overflow: 'hidden', background: '#111111', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.625rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: pathname === l.to ? '#39ff14' : '#9ca3af',
                    background: pathname === l.to ? 'rgba(57,255,20,0.1)' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
