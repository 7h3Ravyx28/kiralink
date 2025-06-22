from fastapi import APIRouter, Depends, Request, Form
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
import json

from .. import schemas, models
from ..services import payment_service, auth_service
from ..database import get_db
from ..main import limiter

router = APIRouter()

@router.post("/create-payment", response_class=HTMLResponse)
@limiter.limit("5/minute")
def create_payment(
    request: Request,
    payment_request: schemas.payment.PaymentRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    payment_form_html = payment_service.create_payment_form(db=db, user=current_user, payment_req=payment_request)
    # The response is a script that redirects the user to the payment page.
    return HTMLResponse(content=payment_form_html)

@router.post("/iyzico-callback")
async def iyzico_callback(request: Request, db: Session = Depends(get_db)):
    form = await request.form()
    token = form.get("token")
    # This should be handled in a background task in a real high-load application
    payment_service.handle_payment_callback(db=db, token=token)
    return {"status": "callback received"}