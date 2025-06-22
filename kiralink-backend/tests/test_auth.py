from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

def test_register_user(client: TestClient):
    response = client.post(
        "/auth/register",
        json={
            "first_name": "Test",
            "last_name": "User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "password": "testpassword"
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "hashed_password" not in data

def test_login_user(client: TestClient, db_session: Session):
    # First, register a user to have someone to log in with
    client.post(
        "/auth/register",
        json={
            "first_name": "Test",
            "last_name": "User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "password": "testpassword"
        },
    )
    
    # Now, test login
    response = client.post(
        "/auth/login",
        data={"username": "test@example.com", "password": "testpassword"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer" 