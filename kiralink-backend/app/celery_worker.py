from celery import Celery
from celery.schedules import crontab
from sqlalchemy.orm import Session
from datetime import date, timedelta

from .database import SessionLocal
from . import models
from .services import reminder_service
from .logger import app_logger
from .config import settings

celery_app = Celery(
    "kiralink_worker",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND
)

celery_app.conf.timezone = 'UTC'

@celery_app.task(
    name="check_and_send_reminders_task",
    autoretry_for=(Exception,),
    retry_kwargs={'max_retries': 3, 'countdown': 60}
)
def check_and_send_reminders_task():
    """
    Celery task to check all properties and send reminders if they are due.
    """
    db: Session = SessionLocal()
    today = date.today()
    app_logger.info(f"Running daily reminder check via Celery...")

    try:
        properties = db.query(models.Property).all()
        for prop in properties:
            if prop.tenant:
                due_day = prop.due_date.day
                current_month_due_date = date(today.year, today.month, due_day)

                payment_record = db.query(models.RentPayment).filter(
                    models.RentPayment.property_id == prop.id,
                    models.RentPayment.payment_date == current_month_due_date
                ).first()
                is_paid = payment_record.is_paid if payment_record else False

                if not is_paid:
                    if current_month_due_date == today + timedelta(days=3):
                        reminder_service.send_rent_reminder(prop.tenant, prop, "friendly")
                    elif current_month_due_date == today:
                        reminder_service.send_rent_reminder(prop.tenant, prop, "due date")
                    elif today > current_month_due_date:
                        reminder_service.send_rent_reminder(prop.tenant, prop, "overdue")
    finally:
        db.close()

# Configure Celery Beat schedule
celery_app.conf.beat_schedule = {
    'run-daily-reminder-check': {
        'task': 'check_and_send_reminders_task',
        'schedule': crontab(hour=8, minute=0),  # Run daily at 8:00 AM UTC
    },
} 