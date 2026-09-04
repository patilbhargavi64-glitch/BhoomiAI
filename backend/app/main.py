from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.auth.security import get_password_hash
from app.config import get_settings
from app.database import Base, SessionLocal, engine
from app.models.user import User  # noqa: F401
from app.routers.auth import router as auth_router

settings = get_settings()
Base.metadata.create_all(bind=engine)


def seed_demo_users() -> None:
    db: Session = SessionLocal()
    try:
        demo_users = [
            {
                "full_name": "System Administrator",
                "email": settings.demo_admin_email,
                "phone": "9999999999",
                "password": settings.demo_admin_password,
                "role": "admin",
                "department": "Administration",
                "state": "Maharashtra",
                "district": "Pune",
                "is_approved": True,
            },
            {
                "full_name": "Verification Officer",
                "email": "verifier@bhoomi.local",
                "phone": "8888888888",
                "password": "verifier123",
                "role": "verifier",
                "department": "Survey",
                "state": "Maharashtra",
                "district": "Nashik",
                "is_approved": True,
            },
            {
                "full_name": "Viewer User",
                "email": "viewer@bhoomi.local",
                "phone": "7777777777",
                "password": "viewer123",
                "role": "viewer",
                "department": "Monitoring",
                "state": "Maharashtra",
                "district": "Nagpur",
                "is_approved": True,
            },
        ]
        for item in demo_users:
            existing = db.query(User).filter(User.email == item["email"]).first()
            if not existing:
                user = User(
                    full_name=item["full_name"],
                    email=item["email"],
                    phone=item["phone"],
                    hashed_password=get_password_hash(item["password"]),
                    role=item["role"],
                    department=item["department"],
                    state=item["state"],
                    district=item["district"],
                    is_active=True,
                    is_approved=item["is_approved"],
                )
                db.add(user)
        db.commit()
    finally:
        db.close()


seed_demo_users()

app = FastAPI(title=settings.app_name, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": settings.app_name}


@app.get("/")
def root():
    return {"message": "Bhoomi AI platform is live", "status": "ok"}
