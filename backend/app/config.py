from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    app_name: str = Field(default="Bhoomi AI")
    secret_key: str = Field(default="change-me-in-production")
    algorithm: str = Field(default="HS256")
    access_token_expire_minutes: int = Field(default=480)
    database_url: str = Field(default="sqlite:///./land_records.db")
    upload_dir: str = Field(default="uploads")
    allowed_origins: str = Field(default="http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174")
    demo_admin_email: str = Field(default="admin@bhoomi.local")
    demo_admin_password: str = Field(default="admin123")

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
