from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    """
    store url and key's
    """
    
    #supabase key's
    SUPABASE_URL: str
    SUPABASE_KEY: str
    
    #openai key's
    OPENAI_API_KEY: str
    OPENAI_BASE_URL: str
    
    #redis key's
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_PASSWORD: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )
        
@lru_cache
def get_settings():
    return Settings()

