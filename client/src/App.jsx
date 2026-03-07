import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import DietPlan from './pages/DietPlan'
import WorkoutPlan from './pages/WorkoutPlan'
import ProgressTracker from './pages/ProgressTracker'

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a', color: '#fff' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diet" element={<DietPlan />} />
          <Route path="/workout" element={<WorkoutPlan />} />
          <Route path="/progress" element={<ProgressTracker />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
