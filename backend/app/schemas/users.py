from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    """Schema for creating a new user."""
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str
    

    
class UserUpdate(BaseModel):
    """Schema for updating user details."""
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=6)
    
class UserResponse(BaseModel):
    """Schema for user response."""
    id: str
    username: str
    email: EmailStr
    created_at: datetime
    updated_at: Optional[datetime] = None
    
class TokenResponse(BaseModel):
    """Schema for token response"""
    access_token: str
    token_type: str = "bearer"
    refresh_token: Optional[str] = None
    user : UserResponse