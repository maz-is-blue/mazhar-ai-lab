from pydantic import BaseModel

class IDFields(BaseModel):
    name: str
    id_number: str
    date_of_birth: str
    expiry_date: str
