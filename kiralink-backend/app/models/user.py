from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime, timedelta, timezone
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    # To be added later
    # has_free_trial = Column(Boolean, default=True)
    
    # Subscription fields
    subscription_end_date = Column(DateTime, default=lambda: datetime.now(timezone.utc) + timedelta(days=30))
    is_in_trial = Column(Boolean, default=True)
    is_subscribed = Column(Boolean, default=False) 