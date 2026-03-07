import { GiMuscleUp } from 'react-icons/gi';
import { FaGithub, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
      <div className="container-main" style={{ padding: '2rem 1.5rem' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GiMuscleUp style={{ color: '#39ff14', fontSize: '1.25rem' }} />
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff' }}>
              Lean<span style={{ color: '#39ff14' }}>Bulk</span> Roadmap
            </span>
          </div>

          <p style={{ color: '#6b7280', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Built with <FaHeart style={{ color: '#ef4444', fontSize: '10px' }} /> for the 63 → 70 kg journey
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#6b7280', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#39ff14')}
              onMouseLeave={(e) => (e.target.style.color = '#6b7280')}
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
