from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    property_name = Column(String, index=True)
    rent_amount = Column(Float)
    due_date = Column(Date)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="properties")
    tenant = relationship("Tenant", uselist=False, back_populates="property")

class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    tenant_name = Column(String, index=True)
    tenant_email = Column(String, unique=True, index=True)
    tenant_phone = Column(String)
    property_id = Column(Integer, ForeignKey("properties.id"))

    property = relationship("Property", back_populates="tenant")

# Add the back-population to the User model
from .user import User
User.properties = relationship("Property", order_by=Property.id, back_populates="owner") 