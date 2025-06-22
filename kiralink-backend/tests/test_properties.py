from fastapi.testclient import TestClient

def test_read_properties_unauthenticated(client: TestClient):
    response = client.get("/properties/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}

def test_create_property_unauthenticated(client: TestClient):
    response = client.post(
        "/properties/",
        json={
            "property_name": "Test Property",
            "rent_amount": 1000,
            "due_date": "2024-01-15",
            "description": "A test property",
            "tenant": {
                "tenant_name": "Test Tenant",
                "tenant_email": "tenant@example.com",
                "tenant_phone": "5551234567"
            }
        }
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}