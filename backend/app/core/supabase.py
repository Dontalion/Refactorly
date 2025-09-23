from supabase import create_client
from app.core.config import get_settings

def get_supabase_client():
    
    """
    Create and return a Supabase client using settings from the configuration.
    """
    
    settings = get_settings()
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

