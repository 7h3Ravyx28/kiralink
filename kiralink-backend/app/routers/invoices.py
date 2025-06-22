from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.responses import StreamingResponse, FileResponse
import os

from .. import schemas, models
from ..services import invoicing_service, auth_service
from ..database import get_db

router = APIRouter()

@router.post("/billing-info", response_model=schemas.BillingInfo)
def update_billing_info(
    info: schemas.BillingInfoCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    return invoicing_service.update_or_create_billing_info(db=db, user=current_user, info=info)

@router.get("/billing-info", response_model=schemas.BillingInfo)
def get_billing_info(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    billing_info = invoicing_service.get_billing_info(db=db, user=current_user)
    if not billing_info:
        raise HTTPException(status_code=404, detail="Billing information not found.")
    return billing_info

@router.get("/download/{payment_id}", response_class=FileResponse)
def download_invoice(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_active_subscriber)
):
    payment = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    
    if not payment or payment.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Invoice not found or access denied.")
        
    if payment.status != models.PaymentStatus.SUCCESS or not payment.transaction_id:
        raise HTTPException(status_code=400, detail="Invoice not available for this transaction.")

    invoice_filename = f"invoice_{current_user.id}_{payment.transaction_id}.pdf"
    invoice_path = os.path.join("static/invoices", invoice_filename)
    
    if not os.path.exists(invoice_path):
        raise HTTPException(status_code=404, detail="Invoice file not found.")
        
    return FileResponse(invoice_path, media_type='application/pdf', filename=invoice_filename) 