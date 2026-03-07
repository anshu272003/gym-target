# 🏋️ Lean Bulk Roadmap — 63 kg → 70 kg

A **full-stack MERN** fitness roadmap website for tracking a lean bulking journey. Built with React + Vite + Tailwind CSS v4 on the frontend and Express + MongoDB on the backend.

---

## 🗂 Folder Structure

```
gym/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── progressController.js
│   │   ├── workoutController.js
│   │   └── dietController.js
│   ├── models/
│   │   ├── Progress.js
│   │   ├── Workout.js
│   │   └── Diet.js
│   ├── routes/
│   │   ├── progressRoutes.js
│   │   ├── workoutRoutes.js
│   │   └── dietRoutes.js
│   ├── seed.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── client/               ← Vite + React + Tailwind v4
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── MealCard.jsx
│   │   │   ├── ExerciseCard.jsx
│   │   │   ├── BMICalculator.jsx
│   │   │   ├── CalorieCalculator.jsx
│   │   │   └── MotivationalQuotes.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DietPlan.jsx
│   │   │   ├── WorkoutPlan.jsx
│   │   │   └── ProgressTracker.jsx
│   │   ├── hooks/useApi.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
```

---

## 🚀 How to Run

### Prerequisites
- Node.js v18+
- MongoDB running locally (or MongoDB Atlas URI)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file (already included):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-roadmap
NODE_ENV=development
```

Seed the database with sample data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` and proxies API requests to `http://localhost:5000`.

---

## 📡 API Routes

| Method | Route              | Description               |
|--------|--------------------|---------------------------|
| GET    | /api/progress      | Get all progress entries   |
| POST   | /api/progress      | Add a new progress entry   |
| PUT    | /api/progress/:id  | Update a progress entry    |
| DELETE | /api/progress/:id  | Delete a progress entry    |
| GET    | /api/diet          | Get all diet meals         |
| POST   | /api/diet          | Add a new diet meal        |
| PUT    | /api/diet/:id      | Update a diet meal         |
| GET    | /api/workouts      | Get all workouts           |
| POST   | /api/workouts      | Add a new workout          |
| PUT    | /api/workouts/:id  | Update a workout           |

---

## 🌐 Deployment

| Service  | Platform       |
|----------|----------------|
| Frontend | Vercel         |
| Backend  | Render         |
| Database | MongoDB Atlas  |

For production, update the `baseURL` in `client/src/utils/api.js` to your Render backend URL, and remove the Vite proxy config.

---

## ✨ Features

- 🎯 **Landing Page** — Hero section, overview cards, transformation timeline
- 📊 **Dashboard** — Weight/calorie/protein charts, progress bar, macro pie chart
- 🍛 **Diet Plan** — 7 daily meals with veg & non-veg options
- 💪 **Workout Plan** — 6-day split with exercise cards
- 📈 **Progress Tracker** — Log daily weight/calories/protein, graphs, estimator
- 🧮 **BMI Calculator** & **Daily Calorie Calculator**
- 💬 **Motivational Quotes** — Auto-rotating quotes carousel
- 🌙 **Dark neon-green fitness theme** with smooth Framer Motion animations
