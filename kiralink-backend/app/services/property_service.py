from sqlalchemy.orm import Session
from .. import models, schemas

def create_property(db: Session, property_data: schemas.PropertyCreate, owner_id: int):
    # Create Property instance
    db_property = models.Property(
        property_name=property_data.property_name,
        rent_amount=property_data.rent_amount,
        due_date=property_data.due_date,
        description=property_data.description,
        owner_id=owner_id
    )
    db.add(db_property)
    db.commit()
    db.refresh(db_property)

    # Create the Tenant and associate it with the new property
    tenant_data = property_data.tenant
    db_tenant = models.Tenant(
        **tenant_data.model_dump(),
        property_id=db_property.id
    )
    db.add(db_tenant)
    db.commit()
    db.refresh(db_property) # Refresh property to load the tenant relationship
    return db_property

def get_properties(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Property).filter(models.Property.owner_id == owner_id).offset(skip).limit(limit).all()

def get_property(db: Session, property_id: int, owner_id: int):
    return db.query(models.Property).filter(models.Property.id == property_id, models.Property.owner_id == owner_id).first()

def update_property(db: Session, db_property: models.Property, property_update: schemas.PropertyCreate):
    # Update property fields
    db_property.property_name = property_update.property_name
    db_property.rent_amount = property_update.rent_amount
    db_property.due_date = property_update.due_date
    db_property.description = property_update.description

    # Update tenant fields
    if db_property.tenant and property_update.tenant:
        tenant_data = property_update.tenant.model_dump()
        for key, value in tenant_data.items():
            setattr(db_property.tenant, key, value)
    
    db.commit()
    db.refresh(db_property)
    return db_property

def delete_property(db: Session, db_property: models.Property):
    if db_property.tenant:
        db.delete(db_property.tenant)
    db.delete(db_property)
    db.commit() 