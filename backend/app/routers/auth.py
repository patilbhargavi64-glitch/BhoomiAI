from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.auth.security import create_access_token, get_password_hash, verify_password
from app.database import get_db
from app.models.user import User
from app.schemas.user import TokenResponse, UserCreate, UserLogin, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    from app.auth.security import decode_access_token

    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    subject = payload.get("sub")
    if isinstance(subject, dict):
        user_id = subject.get("user_id")
    else:
        user_id = subject

    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token payload missing user identifier")

    try:
        user = db.query(User).filter(User.id == int(user_id)).first()
    except (TypeError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/register", response_model=UserResponse)
def register_user(payload: UserCreate, db: Session = Depends(get_db)):
    allowed_registration_roles = {"viewer", "operator", "verifier", "officer", "data_entry_operator", "government_officer"}
    if payload.role not in allowed_registration_roles:
        raise HTTPException(status_code=400, detail="New accounts cannot be created with administrator privileges.")

    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists.")

    user = User(
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        hashed_password=get_password_hash(payload.password),
        role=payload.role,
        department=payload.department,
        state=payload.state,
        district=payload.district,
        is_approved=payload.role in {"viewer", "data_entry_operator", "government_officer", "verifier"},
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=TokenResponse)
def login_user(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account is inactive")
    if not user.is_approved and user.role not in {"viewer", "data_entry_operator", "government_officer", "verifier"}:
        raise HTTPException(status_code=403, detail="Account is pending approval")

    token = create_access_token(str(user.id))
    return TokenResponse(access_token=token, role=user.role, user_id=user.id, full_name=user.full_name)


@router.get("/me")
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "full_name": current_user.full_name, "email": current_user.email, "role": current_user.role}


@router.get("/admin-check")
def admin_check(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to access this page.")
    return {"authorized": True}
