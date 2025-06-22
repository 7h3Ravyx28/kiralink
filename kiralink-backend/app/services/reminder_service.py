from .. import models
from . import notification_service
from ..logger import app_logger

def send_rent_reminder(tenant: models.Tenant, property: models.Property, reminder_type: str):
    """
    Sends email and SMS rent reminders using the notification service.
    """
    email_subject = f"Rent Reminder for {property.property_name}"
    
    email_body = f"""
    <p>Dear {tenant.tenant_name},</p>
    <p>This is a {reminder_type} reminder that your rent of ₺{property.rent_amount} for the property "{property.property_name}" is due on {property.due_date}.</p>
    <p>Thank you,</p>
    <p>The KiraLink Team</p>
    """
    
    sms_body = f"KiraLink Reminder: Rent for {property.property_name} (₺{property.rent_amount}) is due on {property.due_date}."

    app_logger.info(f"Sending {reminder_type} reminder for property {property.id} to tenant {tenant.id}")
    
    # Send Email via notification service
    notification_service.send_email(
        to_email=tenant.tenant_email,
        subject=email_subject,
        html_content=email_body
    )

    # Send SMS via notification service
    notification_service.send_sms(
        to_phone=tenant.tenant_phone,
        body=sms_body
    ) 