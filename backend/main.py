from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx  
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
async def say_hello():
    return {"message": "Hello from FastAPI backend!"}


class TTSRequest(BaseModel):
    text: str

MURF_API_KEY = os.getenv("MURF_API_KEY")

@app.post("/api/generate")
async def generate_tts(request_data: TTSRequest):
    headers = {
        "api-key": MURF_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "voice_id": "bn-IN-arnab",
        "style":"Conversational",
        "multiNativeLocale":"en-IN",
        "text": request_data.text
    }

    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.murf.ai/v1/speech/generate", headers=headers, json=payload)

    if response.status_code != 200:
        print("Murf error:", response.status_code, response.text)
        raise HTTPException(status_code=500, detail="Failed to generate TTS")

    data = response.json()
    return {"audio_url": data.get("audioFile")}