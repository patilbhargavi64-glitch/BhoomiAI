export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl card p-8">
        <h1 className="text-3xl font-bold text-slate-900">About the platform</h1>
        <p className="mt-4 text-slate-700">
          The Intelligent Land Record Digitization and Validation System is designed to support historical land records that are often stored as scanned files, handwritten ledgers, PDF extracts, and state-specific government formats with varying quality.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Core challenge</h2>
            <p className="mt-3 text-slate-700">
              Land records are dispersed across formats, languages, and states. Many records are incomplete, handwritten, or suffer from poor scan quality. Manual data entry is slow and error-prone.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Our approach</h2>
            <p className="mt-3 text-slate-700">
              We combine OCR, computer vision, rule-based field extraction, validation logic, and a human-in-the-loop verification workflow to make digitization safer and more transparent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
