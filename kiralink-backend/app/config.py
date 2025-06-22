from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    LOG_LEVEL: str = "INFO"
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    BASE_URL: str = "http://localhost:8000"

    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"

    # Email settings for SendGrid
    MAIL_FROM: str = "noreply@kiralink.com"
    SENDGRID_API_KEY: str = "your_sendgrid_api_key"

    # Twilio settings
    TWILIO_ACCOUNT_SID: str = "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    TWILIO_AUTH_TOKEN: str = "your_auth_token"
    TWILIO_PHONE_NUMBER: str = "+15017122661"

    # Iyzico settings
    IYZICO_API_KEY: str = "your_iyzico_api_key"
    IYZICO_SECRET_KEY: str = "your_iyzico_secret_key"
    IYZICO_BASE_URL: str = "https://sandbox-api.iyzipay.com"

    # Sentry
    SENTRY_DSN: str | None = None

    class Config:
        env_file = ".env"

settings = Settings()
