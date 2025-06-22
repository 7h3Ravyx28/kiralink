import iyzipay
from sqlalchemy.orm import Session
import uuid
import json
from datetime import datetime, timedelta, timezone

from .. import schemas, models
from ..config import settings
from ..logger import app_logger
from . import invoicing_service

iyzico_options = {
    'api_key': settings.IYZICO_API_KEY,
    'secret_key': settings.IYZICO_SECRET_KEY,
    'base_url': settings.IYZICO_BASE_URL
}

def create_payment_form(db: Session, user: models.User, payment_req: schemas.PaymentRequest):
    # 1. Create a payment record in our database
    db_payment = models.Payment(
        user_id=user.id,
        amount=payment_req.amount,
        currency=payment_req.currency,
        status=models.PaymentStatus.PENDING
    )
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    
    conversation_id = str(uuid.uuid4())

    # 2. Create the payment request for Iyzico
    request = {
        "locale": iyzipay.Locale.TR.value,
        "conversationId": conversation_id,
        "price": str(payment_req.amount),
        "paidPrice": str(payment_req.amount),
        "currency": iyzipay.Currency.TRY.value,
        "basketId": str(db_payment.id),
        "paymentGroup": iyzipay.PaymentGroup.PRODUCT.value,
        "callbackUrl": f"{settings.BASE_URL}/subscriptions/iyzico-callback",
        "enabledInstallments": ["1"],
        "buyer": {
            'id': str(user.id),
            'name': user.first_name,
            'surname': user.last_name,
            'gsmNumber': user.phone,
            'email': user.email,
            'identityNumber': '74300864791', # Dummy ID, should be collected from user
            'lastLoginDate': '2023-03-05 12:43:35', # Dummy
            'registrationDate': '2023-01-01 10:12:23', # Dummy
            'registrationAddress': 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1', # Dummy
            'ip': '85.34.78.112', # Dummy
            'city': 'Istanbul', # Dummy
            'country': 'Turkey', # Dummy
            'zipCode': '34732' # Dummy
        },
        "shippingAddress": { # Dummy
            'contactName': f"{user.first_name} {user.last_name}",
            'city': 'Istanbul',
            'country': 'Turkey',
            'address': 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            'zipCode': '34732'
        },
        "billingAddress": { # Dummy
            'contactName': f"{user.first_name} {user.last_name}",
            'city': 'Istanbul',
            'country': 'Turkey',
            'address': 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            'zipCode': '34732'
        },
        "basketItems": [
            {
                'id': 'SUB01',
                'name': 'KiraLink Pro Subscription',
                'category1': 'SaaS',
                'itemType': iyzipay.BasketItemType.VIRTUAL.value,
                'price': str(payment_req.amount)
            }
        ]
    }
    
    # 3. Make the API call to Iyzico
    app_logger.info(f"Creating Iyzico payment form for payment ID: {db_payment.id}")
    checkout_form_initialize = iyzipay.CheckoutFormInitialize().create(request, iyzico_options)
    
    # Log the response from Iyzico
    response_json = checkout_form_initialize.read().decode('utf-8')
    app_logger.info(f"Iyzico response: {response_json}")

    return checkout_form_initialize.body


def handle_payment_callback(db: Session, token: str):
    # 1. Get payment details from Iyzico
    request = {
        'locale': iyzipay.Locale.TR.value,
        'conversationId': str(uuid.uuid4()),
        'token': token,
    }
    
    app_logger.info(f"Handling Iyzico callback for token: {token}")
    result = iyzipay.CheckoutForm().retrieve(request, iyzico_options)
    app_logger.info(f"Iyzico retrieve response: {result.read().decode('utf-8')}")

    result_body = result.body.get("data") if result.body.get("status") == "success" else result.body

    # 2. Update our database
    payment_status = result_body.get("paymentStatus")
    basket_id = result_body.get("basketId")
    transaction_id = result_body.get("paymentId")
    
    db_payment = db.query(models.Payment).filter(models.Payment.id == int(basket_id)).first()
    if not db_payment:
        app_logger.error(f"Payment with basketId {basket_id} not found in DB.")
        return

    db_payment.transaction_id = transaction_id

    if payment_status == "SUCCESS":
        db_payment.status = models.PaymentStatus.SUCCESS
        user = db_payment.user
        
        # 3. Update subscription
        user.is_subscribed = True
        user.is_in_trial = False
        current_end_date = user.subscription_end_date or datetime.now(timezone.utc)
        new_end_date = max(datetime.now(timezone.utc), current_end_date) + timedelta(days=30)
        user.subscription_end_date = new_end_date
        
        db.commit()
        db.refresh(user)
        app_logger.info(f"Subscription for user {user.id} updated successfully.")
        
        # 4. Generate and send invoice
        invoicing_service.generate_and_store_invoice(db=db, user=user, payment=db_payment)
        
    else:
        db_payment.status = models.PaymentStatus.FAILURE
        app_logger.error(f"Payment failed for basketId {basket_id}. Status: {payment_status}")
    
    db.commit() 