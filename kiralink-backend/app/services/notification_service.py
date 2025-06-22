from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition
from twilio.rest import Client
import base64

from ..config import settings
from ..logger import app_logger

def send_email(to_email: str, subject: str, html_content: str, attachment_path: str = None):
    """
    Sends an email using SendGrid.
    """
    if not settings.SENDGRID_API_KEY or settings.SENDGRID_API_KEY == "your_sendgrid_api_key":
        app_logger.warning("SendGrid API Key not configured. Skipping email send.")
        return False

    message = Mail(
        from_email=settings.MAIL_FROM,
        to_emails=to_email,
        subject=subject,
        html_content=html_content)
    
    if attachment_path:
        with open(attachment_path, 'rb') as f:
            data = f.read()
        encoded_file = base64.b64encode(data).decode()
        attachedFile = Attachment(
            FileContent(encoded_file),
            FileName(attachment_path.split('/')[-1]),
            FileType('application/pdf'),
            Disposition('attachment')
        )
        message.attachment = attachedFile

    try:
        sendgrid_client = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sendgrid_client.send(message)
        app_logger.info(f"Email sent to {to_email}. Status code: {response.status_code}")
        return True
    except Exception as e:
        app_logger.error(f"Failed to send email to {to_email}: {e}")
        return False

def send_sms(to_phone: str, body: str):
    """
    Sends an SMS using Twilio.
    """
    if not settings.TWILIO_ACCOUNT_SID or settings.TWILIO_ACCOUNT_SID == "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx":
        app_logger.warning("Twilio credentials not configured. Skipping SMS send.")
        return False
        
    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=body,
            from_=settings.TWILIO_PHONE_NUMBER,
            to=to_phone
        )
        app_logger.info(f"SMS sent to {to_phone}. SID: {message.sid}")
        return True
    except Exception as e:
        app_logger.error(f"Failed to send SMS to {to_phone}: {e}")
        return False 