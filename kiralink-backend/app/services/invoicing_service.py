from sqlalchemy.orm import Session
from jinja2 import Environment, FileSystemLoader
from xhtml2pdf import pisa
import os
from datetime import date

from .. import models, schemas
from ..logger import app_logger
from . import notification_service

def update_or_create_billing_info(db: Session, user: models.User, info: schemas.BillingInfoCreate):
    billing_info = user.billing_info
    if billing_info:
        # Update existing info
        for key, value in info.model_dump().items():
            setattr(billing_info, key, value)
    else:
        # Create new info
        billing_info = models.BillingInfo(**info.model_dump(), user_id=user.id)
        db.add(billing_info)
    
    db.commit()
    db.refresh(billing_info)
    return billing_info

def get_billing_info(db: Session, user: models.User):
    return user.billing_info

def generate_and_store_invoice(db: Session, user: models.User, payment: models.Payment):
    if not user.billing_info:
        app_logger.warning(f"Cannot generate invoice for user {user.id}: no billing info found.")
        notification_service.send_email(
            to_email=user.email,
            subject="Action Required: Update Your Billing Information",
            html_content="<p>Dear user, we tried to generate an invoice for your recent payment, but your billing information is missing. Please log in and update it in your profile. Thank you!</p>"
        )
        return None

    template_vars = {
        "invoice_number": f"INV-{payment.id}-{payment.created_at.year}",
        "creation_date": date.today().strftime("%B %d, %Y"),
        "due_date": date.today().strftime("%B %d, %Y"),
        "user": user,
        "transaction_id": payment.transaction_id,
        "amount": payment.amount
    }
    
    env = Environment(loader=FileSystemLoader("app/templates"))
    template = env.get_template("invoice.html")
    html_out = template.render(template_vars)

    invoice_filename = f"invoice_{user.id}_{payment.transaction_id}.pdf"
    invoice_path = os.path.join("static/invoices", invoice_filename)
    
    try:
        with open(invoice_path, "wb") as pdf_file:
            pisa_status = pisa.CreatePDF(html_out.encode('utf-8'), dest=pdf_file, encoding='utf-8')

        if pisa_status.err:
            app_logger.error(f"Error generating PDF for invoice {invoice_filename}: {pisa_status.err}")
            return None
        
        app_logger.info(f"Successfully generated and saved invoice: {invoice_path}")
        email_invoice(user=user, payment=payment, invoice_path=invoice_path)
        return invoice_path
    except Exception as e:
        app_logger.error(f"An exception occurred while generating invoice PDF: {e}")
        return None

def email_invoice(user: models.User, payment: models.Payment, invoice_path: str):
    subject = f"Your KiraLink Invoice (INV-{payment.id})"
    body = f"""
    <p>Dear {user.first_name},</p>
    <p>Thank you for your subscription payment of ₺{payment.amount}. Your invoice is attached.</p>
    <p>You can also access past invoices from your dashboard.</p>
    <p>Best regards,<br>The KiraLink Team</p>
    """
    notification_service.send_email(
        to_email=user.email,
        subject=subject,
        html_content=body,
        attachment_path=invoice_path
    ) 