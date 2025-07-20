from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your domain when deploying
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    message = data.get("message", "")

    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "phi3:mini",
        "prompt": message,
        "stream": False
    })

@app.get("/")
async def root():
    return {"message": "Economics Chatbot backend is running!"}


    result = response.json()
    return {"response": result["response"]}
