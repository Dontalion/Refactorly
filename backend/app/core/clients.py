from openai import OpenAI
from supabase import create_client
from config import get_settings

settings = get_settings()

def get_supabase_client():
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_openai_client():
    return OpenAI(
        api_key=settings.OPENAI_API_KEY,
        base_url=settings.OPENAI_BASE_URL
    )