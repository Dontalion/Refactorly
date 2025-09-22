from fastapi import APIRouter, Depends, HTTPException, status, Request
from app.schemas.users import UserCreate, UserLogin, UserResponse, TokenResponse
from app.core.supabase import get_supabase_client
from app.core.auth import get_current_user
import logging

router = APIRouter(prefix="/auth", tags=["authentication"])
logger = logging.getLogger(__name__)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserCreate, supabase = Depends(get_supabase_client)):
    """Register a new user."""
    try:
        # Check if username already exists
        username_exists = supabase.table("profiles").select("username").eq("username", user_data.username).execute()
        if username_exists.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Username already exists."
            )
    
        auth_response = supabase.auth.sign_up({
        "email": user_data.email,
        "password": user_data.password,
        "options": {
            "data": {
                "username": user_data.username,
                "full_name": user_data.full_name if hasattr(user_data, 'full_name') else None
                }
            }
        })
    
        if not auth_response.user:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Failed to create user."
            )
    
        user_id = auth_response.user.id
        
        # Fetch the created profile
        profile_data = supabase.table("profiles").select("*").eq("id", user_id).execute()
        
        
        # Return the user profile
        if profile_data.data and len(profile_data.data) > 0:
            profile = profile_data.data[0]
            return UserResponse(
                id=user_id,
                email=user_data.email,
                username=profile.get("username"),
                full_name=profile.get("full_name"),
                created_at=profile.get("created_at"),
                updated_at=profile.get("updated_at")
            )
            
        else:
            # Profile not found, return minimal info
            return UserResponse(
                id=user_id,
                email=user_data.email,
                username=user_data.username,
                full_name=user_data.full_name,
                created_at=None,
                updated_at=None
            )

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.exception(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during registration."
        )

@router.post("/login", response_model=TokenResponse)
async def login_user(login_data: UserLogin, request: Request, supabase = Depends(get_supabase_client)):
    """ 
    Login an existing user with email/username and return an access token.
    """
    try:
        # If username is provided, fetch the corresponding email    
        email = login_data.email
        
        # check is email or username
        if "@" not in login_data.email:
            #fetch user by username
            username_search = supabase.rpc(
                "get_user_by_username_or_email",
                {"search_term": login_data.email}
            ).execute()
            
            if not username_search.data:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid username or password."
                )
            
            # get email from the result
            email = username_search.data[0]["email"]
          
        # login with email-based login    
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": login_data.password
        })
        
        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email/username or password."
            )
        user_id = auth_response.user.id
        profile = supabase.table("profiles").select("*").eq("id", user_id).execute()
        
        if not profile.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found."
            )
        
        user_profile = profile.data[0]
        
        #return response
        return TokenResponse(
            access_token=auth_response.session.access_token,
            refresh_token=auth_response.session.refresh_token,
            user=UserResponse(
                id=user_profile["id"],
                email=auth_response.user.email,
                username=user_profile["username"],
                created_at=user_profile["created_at"],
                updated_at=user_profile["updated_at"]
            )
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.exception(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login error: {str(e)}"
        )

@router.post("/refresh_token", response_model=TokenResponse)
async def refresh_token(refresh_token: str,
                        supabase = Depends(get_supabase_client)):
    """Refresh the access token using the refresh token."""
    try:
        auth_response = supabase.auth.refresh_session(refresh_token)
        
        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token."
            )
        
        # Fetch user profile
        user_id = auth_response.user.id
        profile = supabase.table("profiles").select("*").eq("id", user_id).execute()
        
        if not profile.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found."
            )
        
        user_profile = profile.data[0]
        
        # Return new tokens and user info
        return TokenResponse(
            access_token=auth_response.session.access_token,
            refresh_token=auth_response.session.refresh_token,
            user=UserResponse(
                id=user_profile["id"],
                email=auth_response.user.email,
                username=user_profile["username"],
                created_at=user_profile["created_at"],
                updated_at=user_profile["updated_at"]
            )
        )
    except Exception as e:
        logger.exception(f"Token refresh error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Token refresh error: {str(e)}"
        )

@router.post("/logout")
async def logout(supabase = Depends(get_supabase_client), current_user = Depends(get_current_user)):
    """ Logout the current user by invalidating their session."""
    try:
        supabase.auth.sign_out()
        return {"message": "user logged out successfully."}
    except Exception as e:
        logger.exception(f"Logout error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Logout error: {str(e)}"
        )