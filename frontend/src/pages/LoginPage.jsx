import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem('bhoomi_token', data.access_token);
      localStorage.setItem('bhoomi_user', JSON.stringify(data));
      navigate(data.role === 'admin' ? '/admin' : '/');
    } catch (loginError) {
      setError(loginError.message || 'Unable to connect to the backend.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Login</h1>
          <p className="mt-2 text-sm text-slate-600">Access Bhoomi AI dashboard</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email / Username</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-0 focus:border-green-600" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 outline-none focus:border-green-600" />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute inset-y-0 right-3 text-sm text-slate-500">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" /> Remember me</label>
            <a href="#" className="text-green-700">Forgot password?</a>
          </div>

          <button type="submit" disabled={isSubmitting} className="block w-full rounded-lg bg-green-700 px-4 py-3 text-center font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Need an account? <Link to="/register" className="font-semibold text-green-700">Create account</Link>
        </p>
      </div>
    </div>
  );
}
