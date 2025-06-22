from sqlalchemy import Column, Integer, Date, Boolean, ForeignKey, UniqueConstraint
from ..database import Base

class RentPayment(Base):
    __tablename__ = "rent_payments"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    payment_date = Column(Date, nullable=False) # Represents the month/year of payment
    is_paid = Column(Boolean, default=False)
    
    __table_args__ = (UniqueConstraint('property_id', 'payment_date', name='_property_payment_uc'),) 