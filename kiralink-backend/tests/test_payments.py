from fastapi.testclient import TestClient
from unittest.mock import patch
from sqlalchemy.orm import Session
from app.models.user import User

def get_auth_header(client: TestClient) -> dict:
    """Helper function to register and login a user to get auth headers."""
    client.post(
        "/auth/register",
        json={"first_name": "Payer", "last_name": "Test", "email": "payer@test.com", "phone": "5555555555", "password": "password123"}
    )
    login_res = client.post(
        "/auth/login",
        data={"username": "payer@test.com", "password": "password123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    access_token = login_res.json()["access_token"]
    return {"Authorization": f"Bearer {access_token}"}

@patch('iyzipay.CheckoutFormInitialize.create')
def test_create_payment_success(mock_iyzico_create, client: TestClient, db_session: Session):
    # Mock the Iyzico API response
    mock_iyzico_create.return_value.status_code = 200
    mock_iyzico_create.return_value.body = {"status": "success", "token": "mock_token", "checkoutFormContent": "<p>iyzico form</p>"}
    
    headers = get_auth_header(client)
    
    response = client.post(
        "/subscriptions/create-payment",
        headers=headers,
        json={"amount": 99.99}
    )
    
    assert response.status_code == 200
    assert "iyzico form" in response.text
    mock_iyzico_create.assert_called_once()

@patch('iyzipay.CheckoutForm.retrieve')
@patch('app.services.invoicing_service.generate_and_store_invoice')
def test_iyzico_callback_success(mock_generate_invoice, mock_iyzico_retrieve, client: TestClient, db_session: Session):
    # 1. Create a user and a pending payment first
    headers = get_auth_header(client)
    with patch('iyzipay.CheckoutFormInitialize.create') as mock_iyzico_create:
        mock_iyzico_create.return_value.status_code = 200
        mock_iyzico_create.return_value.body = {"status": "success", "token": "mock_token", "checkoutFormContent": "<p>form</p>"}
        client.post("/subscriptions/create-payment", headers=headers, json={"amount": 99.99})

    # Mock the callback retrieval from Iyzico
    mock_iyzico_retrieve.return_value.body = {
        "status": "success",
        "data": {
            "paymentStatus": "SUCCESS",
            "basketId": "1", # Corresponds to the first payment created in the test DB
            "paymentId": "real_payment_id_123"
        }
    }
    
    # 2. Simulate the callback from Iyzico
    response = client.post("/subscriptions/iyzico-callback", data={"token": "mock_token"})
    
    assert response.status_code == 200
    assert response.json() == {"status": "callback received"}
    
    # 3. Verify invoice was generated and subscription was updated
    mock_generate_invoice.assert_called_once()
    user = db_session.query(User).filter(User.email == "payer@test.com").first()
    assert user.is_subscribed is True
