"""
here we handle authentication and user extraction from token with middleware
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.supabase import get_supabase_client
from app.schemas.users import UserResponse
import logging

logger = logging.getLogger(__name__)
security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    supabase = Depends(get_supabase_client)):
    """
    extreact user from token
    """
    token = credentials.credentials
    try:
        logger.debug(f"Extracting user from token: {token:.10}...")  # Log only the first 10 characters for security
        auth_response = supabase.auth.get_user(token)
        
        if not auth_response or not auth_response.user:
            logger.error("Invalid token or user not found")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user_id = auth_response.user.id
        logger.debug(f"User ID extracted: {user_id}")
        
        # Fetch user profile from the database
        profile_response = supabase.table("profiles").select("*").eq("id", user_id).execute()
        
        if not profile_response.data:
            logger.error(f"User profile not found for user ID: {user_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found",
            )
        
        profile = profile_response.data[0]
        
        user_data = UserResponse(
            id=user_id,
            username=profile.get("username"),
            email=auth_response.user.email,
            full_name=profile.get("full_name"),
            created_at=profile.get("created_at"),
            updated_at=profile.get("updated_at")
        )
        
        return user_data
    
    
    except Exception as e:
        logger.exception(f"Authentication error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication error: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )