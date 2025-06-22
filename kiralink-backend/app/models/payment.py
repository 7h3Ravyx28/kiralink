from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum

from ..database import Base

class PaymentStatus(enum.Enum):
    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
    FAILURE = "FAILURE"

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="TRY")
    status = Column(SQLAlchemyEnum(PaymentStatus), default=PaymentStatus.PENDING)
    transaction_id = Column(String, unique=True, nullable=True) # From payment provider
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    user = relationship("User") 