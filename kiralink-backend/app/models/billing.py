from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base
from .user import User

class BillingInfo(Base):
    __tablename__ = "billing_info"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    turkish_id_or_tax_number = Column(String, nullable=False)
    email = Column(String, nullable=False)
    address = Column(String, nullable=False)

    user = relationship("User", back_populates="billing_info")

User.billing_info = relationship("BillingInfo", uselist=False, back_populates="user") 