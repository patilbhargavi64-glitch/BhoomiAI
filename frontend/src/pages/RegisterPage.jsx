import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

export default function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm_password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ full_name: form.full_name, email: form.email, password: form.password, role: 'viewer' }),
      });
      setSuccess('Account created successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 800);
    } catch (registrationError) {
      setError(registrationError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="card w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-2 text-slate-600">Register for land record digitization and verification workflows.</p>

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium">Full name</label>
            <input name="full_name" value={form.full_name} onChange={updateField} required className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input name="email" type="email" value={form.email} onChange={updateField} required className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2.5">
              <option>Government Officer</option>
              <option>Verifier</option>
              <option>Data Entry Operator</option>
              <option>Viewer</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Department</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">State</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">District</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input name="password" type="password" value={form.password} onChange={updateField} minLength={6} required className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Confirm password</label>
            <input name="confirm_password" type="password" value={form.confirm_password} onChange={updateField} minLength={6} required className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
          </div>
          <div className="md:col-span-2">
            {error && <p role="alert" className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
            {success && <p role="status" className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? 'Creating account...' : 'Create account'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
