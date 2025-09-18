# main.py

from fastapi import FastAPI

app = FastAPI(title="Code Review Assistant API")

@app.get("/")
def read_root():
    return {"message": "Hello from the API inside a Docker container!"}
