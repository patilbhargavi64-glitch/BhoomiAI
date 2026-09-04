import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { apiRequest, clearAuth } from './api';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AdminRoute() {
  const [state, setState] = useState('checking');

  useEffect(() => {
    if (!localStorage.getItem('bhoomi_token')) {
      setState('unauthorized');
      return;
    }
    apiRequest('/auth/admin-check')
      .then(() => setState('authorized'))
      .catch(() => {
        clearAuth();
        setState('unauthorized');
      });
  }, []);

  if (state === 'checking') {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">Checking access...</div>;
  }
  return state === 'authorized' ? <AdminDashboardPage /> : <Navigate to="/login" replace />;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="card max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800">Back to home</Link>
      </div>
    </div>
  );
}

export default App;
