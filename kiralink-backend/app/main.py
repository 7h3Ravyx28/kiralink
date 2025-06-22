from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import sentry_sdk

from .database import engine, Base
from .routers import auth, properties, calendar, subscriptions, invoices
from .models import user, property, rent_payment, billing, payment
from .logger import app_logger
from .config import settings

if settings.SENTRY_DSN:
    sentry_sdk.init(
        dsn=settings.SENTRY_DSN,
        traces_sample_rate=1.0,
        profiles_sample_rate=1.0,
        enable_tracing=True
    )

limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    app_logger.info("Starting up...")
    yield
    app_logger.info("Shutting down...")

app = FastAPI(
    title="KiraLink API",
    description="Backend for KiraLink, a SaaS platform for homeowners to track rental payments.",
    version="0.1.0",
    lifespan=lifespan
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
    # Add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

Base.metadata.create_all(bind=engine)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    app_logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    app_logger.info(f"Response: {response.status_code}")
    return response

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(properties.router, prefix="/properties", tags=["Properties"])
app.include_router(calendar.router, prefix="/calendar", tags=["Calendar"])
app.include_router(subscriptions.router, prefix="/subscriptions", tags=["Subscriptions"])
app.include_router(invoices.router, prefix="/invoices", tags=["Invoices"])

@app.get("/")
def read_root():
    return {"message": "Welcome to KiraLink API"}

# At a later stage, we will include routers
# from .routers import reminders
#
# app.include_router(reminders.router, prefix="/reminders", tags=["Reminders"])
