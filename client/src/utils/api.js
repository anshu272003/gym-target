import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
});

// Progress
export const getProgress = () => API.get('/progress');
export const addProgress = (data) => API.post('/progress', data);
export const updateProgress = (id, data) => API.put(`/progress/${id}`, data);
export const deleteProgress = (id) => API.delete(`/progress/${id}`);

// Diet
export const getDiet = () => API.get('/diet');
export const addDiet = (data) => API.post('/diet', data);
export const updateDiet = (id, data) => API.put(`/diet/${id}`, data);

// Workouts
export const getWorkouts = () => API.get('/workouts');
export const addWorkout = (data) => API.post('/workouts', data);
export const updateWorkout = (id, data) => API.put(`/workouts/${id}`, data);

export default API;
