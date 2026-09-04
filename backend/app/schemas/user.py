from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str | None = None
    role: str = "viewer"
    department: str | None = None
    state: str | None = None
    district: str | None = None


class UserCreate(UserBase):
    password: str = Field(min_length=6)


class UserLogin(BaseModel):
    email: str = Field(min_length=3)
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: int
    full_name: str


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_approved: bool
