from pydantic import BaseModel, EmailStr

class BillingInfoBase(BaseModel):
    name: str
    surname: str
    turkish_id_or_tax_number: str
    email: EmailStr
    address: str

class BillingInfoCreate(BillingInfoBase):
    pass

class BillingInfo(BillingInfoBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True 