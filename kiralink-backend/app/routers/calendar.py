from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date

from .. import schemas, models
from ..services import calendar_service, property_service, auth_service
from ..database import get_db

router = APIRouter()

@router.get("/{property_id}", response_model=schemas.CalendarView)
def get_calendar(
    property_id: int,
    month: int = Query(..., ge=1, le=12),
    year: int = Query(..., ge=2000, le=2100),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_active_subscriber)
):
    # Verify property belongs to the current user
    db_property = property_service.get_property(db, property_id=property_id, owner_id=current_user.id)
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
        
    statuses = calendar_service.get_calendar_view(db, property_id=property_id, month=month, year=year)
    return schemas.CalendarView(property_id=property_id, rent_statuses=statuses)

@router.post("/mark-paid", response_model=schemas.RentPaymentStatus)
def mark_as_paid(
    request: schemas.MarkAsPaidRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_active_subscriber)
):
    # Verify property belongs to the current user
    db_property = property_service.get_property(db, property_id=request.property_id, owner_id=current_user.id)
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")

    payment = calendar_service.mark_rent_as_paid(db, property_id=request.property_id, payment_date=request.payment_date)
    return schemas.RentPaymentStatus(date=payment.payment_date, status="Paid") 