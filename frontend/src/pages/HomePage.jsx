import { Link } from 'react-router-dom';

const stats = [
  { label: 'Records processed', value: '12.8K' },
  { label: 'Verification pending', value: '1,240' },
  { label: 'OCR confidence', value: '92.4%' },
  { label: 'AI validation', value: '89.7%' }
];

const features = [
  'AI-assisted OCR and document preprocessing',
  'Structured land record extraction',
  'Confidence-based verification workflow',
  'Multilingual support for Indian documents',
  'Role-based access and audit logging',
  'GIS-ready record mapping interface'
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 font-bold text-white">B</div>
            <div>
              <div className="text-lg font-bold text-slate-900">Bhoomi AI</div>
              <div className="text-xs text-slate-500">Land Record Intelligence</div>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Create Account</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="badge bg-green-100 text-green-800">DEMO PLATFORM • NOT OFFICIAL GOVERNMENT DATA</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">Intelligent Land Record Digitization and Validation System</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              A secure, AI-assisted prototype that digitizes historical land records, extracts structured field data, validates conflicts, and routes uncertain records for human verification.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/login" className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800">Login</Link>
              <Link to="/register" className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:border-slate-400">Create Account</Link>
              <Link to="/admin" className="rounded-lg border border-slate-300 bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">Explore Demo</Link>
            </div>
          </div>

          <div className="card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">AI workflow</div>
              <ol className="mt-4 space-y-2 text-sm text-slate-700">
                <li>1. Upload scanned land record</li>
                <li>2. Preprocess and OCR the document</li>
                <li>3. Extract fields such as owner, survey number, and area</li>
                <li>4. Validate conflicts and queue low-confidence entries</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-bold text-slate-900">Why this solution matters</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature} className="card p-5">
                  <div className="mb-3 h-2 w-12 rounded-full bg-green-700" />
                  <p className="text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
