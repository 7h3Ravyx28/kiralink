from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class TenantBase(BaseModel):
    tenant_name: str
    tenant_email: EmailStr
    tenant_phone: str

class TenantCreate(TenantBase):
    pass

class Tenant(TenantBase):
    id: int
    property_id: int

    class Config:
        from_attributes = True

class PropertyBase(BaseModel):
    property_name: str
    rent_amount: float
    due_date: date
    description: Optional[str] = None

class PropertyCreate(PropertyBase):
    tenant: TenantCreate

class Property(PropertyBase):
    id: int
    owner_id: int
    tenant: Optional[Tenant] = None

    class Config:
        from_attributes = True 