from typing import Union
from fastapi import FastAPI, Query
from gemini_api import text_only
import uvicorn


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Fast API is running!"}

@app.get("/test")
def test():
    return {"message": "This is a test route!"}

@app.get("/api/gemini/")
def gemini(prompt: str = Query(..., min_length=1, title="User Prompt")):
    response = text_only(prompt)
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)
