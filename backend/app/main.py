from fastapi import FastAPI
from typing import Dict

app = FastAPI()

@app.get("/")
def read_root() -> Dict[str, str]:
    return {"message": "Hello from FastAPI backend!"}