from pydantic import BaseModel
from datetime import date

class RentPaymentStatus(BaseModel):
    date: date
    status: str # "Paid", "Overdue", "Upcoming"

class CalendarView(BaseModel):
    property_id: int
    rent_statuses: list[RentPaymentStatus]

class MarkAsPaidRequest(BaseModel):
    property_id: int
    payment_date: date 