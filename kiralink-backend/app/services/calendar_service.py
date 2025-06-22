from sqlalchemy.orm import Session
from datetime import date, timedelta
from .. import models, schemas

def get_calendar_view(db: Session, property_id: int, month: int, year: int) -> list[schemas.RentPaymentStatus]:
    prop = db.query(models.Property).filter(models.Property.id == property_id).first()
    if not prop:
        return []

    statuses = []
    today = date.today()
    
    # For now, let's just show one status for the property's due date this month
    due_date_this_month = date(year, month, prop.due_date.day)

    # Check payment status
    payment_record = db.query(models.RentPayment).filter(
        models.RentPayment.property_id == property_id,
        models.RentPayment.payment_date == due_date_this_month
    ).first()

    status = "Upcoming"
    if payment_record and payment_record.is_paid:
        status = "Paid"
    elif today > due_date_this_month:
        status = "Overdue"
    
    statuses.append(schemas.RentPaymentStatus(date=due_date_this_month, status=status))
    
    return statuses

def mark_rent_as_paid(db: Session, property_id: int, payment_date: date):
    # Find existing record or create a new one
    payment_record = db.query(models.RentPayment).filter(
        models.RentPayment.property_id == property_id,
        models.RentPayment.payment_date == payment_date
    ).first()

    if payment_record:
        payment_record.is_paid = True
    else:
        payment_record = models.RentPayment(
            property_id=property_id,
            payment_date=payment_date,
            is_paid=True
        )
        db.add(payment_record)
    
    db.commit()
    db.refresh(payment_record)
    return payment_record 