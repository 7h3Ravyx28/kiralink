from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models
from ..services import property_service, auth_service
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Property, status_code=status.HTTP_201_CREATED)
def create_property(
    property: schemas.PropertyCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth_service.get_current_active_subscriber)
):
    return property_service.create_property(db=db, property=property, owner_id=current_user.id)

@router.get("/", response_model=List[schemas.Property])
def read_properties(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth_service.get_current_active_subscriber)
):
    properties = property_service.get_properties(db, owner_id=current_user.id, skip=skip, limit=limit)
    return properties

@router.get("/{property_id}", response_model=schemas.Property)
def read_property(
    property_id: int, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth_service.get_current_active_subscriber)
):
    db_property = property_service.get_property(db, property_id=property_id, owner_id=current_user.id)
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    return db_property

@router.put("/{property_id}", response_model=schemas.Property)
def update_property(
    property_id: int, 
    property_update: schemas.PropertyCreate,
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth_service.get_current_active_subscriber)
):
    db_property = property_service.get_property(db, property_id=property_id, owner_id=current_user.id)
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_service.update_property(db=db, db_property=db_property, property_update=property_update)

@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_active_subscriber)
):
    db_property = property_service.get_property(db, property_id=property_id, owner_id=current_user.id)
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    property_service.delete_property(db=db, db_property=db_property)
    return 