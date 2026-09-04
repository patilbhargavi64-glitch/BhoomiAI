import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../api';

const stats = [
  { label: 'Total Documents', value: '1,248', tone: 'bg-sky-100 text-sky-700' },
  { label: 'Processed', value: '964', tone: 'bg-emerald-100 text-emerald-700' },
  { label: 'Verified', value: '681', tone: 'bg-violet-100 text-violet-700' },
  { label: 'Pending', value: '287', tone: 'bg-amber-100 text-amber-700' },
  { label: 'Flagged', value: '94', tone: 'bg-rose-100 text-rose-700' },
  { label: 'Duplicate', value: '38', tone: 'bg-indigo-100 text-indigo-700' },
];

const chartData = [
  { name: 'Jan', processed: 120, verified: 70, pending: 30 },
  { name: 'Feb', processed: 180, verified: 110, pending: 40 },
  { name: 'Mar', processed: 260, verified: 170, pending: 55 },
  { name: 'Apr', processed: 210, verified: 140, pending: 48 },
  { name: 'May', processed: 330, verified: 220, pending: 60 },
  { name: 'Jun', processed: 280, verified: 200, pending: 52 }
];

const navItems = ['Dashboard', 'Users', 'Land Records', 'Documents', 'OCR Processing', 'Validation', 'Verification Queue', 'Analytics', 'Reports', 'Audit Logs', 'System Settings'];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  function handleLogout() {
    clearAuth();
    navigate('/login');
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-72 bg-slate-900 p-5 text-white">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 font-bold">B</div>
          <div>
            <div className="font-bold">Bhoomi AI</div>
            <div className="text-xs text-slate-400">Admin Console</div>
          </div>
        </div>
        <nav className="space-y-2 text-sm">
          {navItems.map((item) => (
            <button key={item} className="block w-full rounded-lg px-3 py-2 text-left text-slate-200 hover:bg-slate-800">{item}</button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600">DEMO DATA — NOT OFFICIAL GOVERNMENT RECORDS</p>
          </div>
          <button onClick={handleLogout} className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700">Logout</button>
        </header>

        <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-4">
              <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${stat.tone}`}>{stat.label}</div>
              <div className="mt-4 text-3xl font-bold text-slate-900">{stat.value}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="card p-5">
            <h2 className="text-lg font-semibold text-slate-900">Documents processed over time</h2>
            <div className="mt-5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="processed" fill="#166534" />
                  <Bar dataKey="verified" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-lg font-semibold text-slate-900">Verification overview</h2>
            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm"><span>Verified</span><span>68%</span></div>
                <div className="h-2 rounded-full bg-slate-200"><div className="h-2 w-[68%] rounded-full bg-emerald-600" /></div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm"><span>Pending</span><span>24%</span></div>
                <div className="h-2 rounded-full bg-slate-200"><div className="h-2 w-[24%] rounded-full bg-amber-500" /></div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm"><span>Flagged</span><span>8%</span></div>
                <div className="h-2 rounded-full bg-slate-200"><div className="h-2 w-[8%] rounded-full bg-rose-500" /></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
