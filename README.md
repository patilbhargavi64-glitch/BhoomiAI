# Intelligent Land Record Digitization and Validation System

A modular SIH-ready prototype for land record digitization, OCR, extraction, validation, human verification, and dashboard analytics.

## Project structure

- backend/: FastAPI application and AI services
- frontend/: React + Vite + Tailwind frontend
- datasets/: demo datasets and labelled evaluation files
- docs/: design and API documentation
- tests/: backend/frontend test files

## Backend setup

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend setup

> Node.js and npm must be installed first.

```bash
cd frontend
npm install
npm run dev
```

The frontend uses `VITE_API_URL` from `frontend/.env` when it exists, and otherwise uses `http://localhost:8000`.

The backend creates the SQLite database at `backend/land_records.db` and creates missing tables when it starts. Existing data is preserved.

## Demo credentials

- Admin: admin@bhoomi.local / admin123
- Verifier: verifier@bhoomi.local / verifier123
- Viewer: viewer@bhoomi.local / viewer123

The demo admin email and password are configured by `DEMO_ADMIN_EMAIL` and `DEMO_ADMIN_PASSWORD` in `backend/.env`. They are development credentials only.

## Important notes

- Demo data is synthetic and should not be treated as official government data.
- Real GIS, OCR, and government APIs are represented as prototype integrations only.
