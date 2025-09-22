from supabase import create_client
from fastapi import Depends
from app.core.config import get_settings

def get_supabase_client():
    
    """
    Create and return a Supabase client using settings from the configuration.
    """
    
    settings = get_settings()
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

async def get_user_by_token(token: str, supabase=Depends(get_supabase_client)):

    """
    Retrieve a user from Supabase using the provided authentication token.
    """

    try:
        response = supabase.auth.api.get_user(token)
        return response.user
    except Exception as e:
        return None