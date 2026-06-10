from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import CasoGlosa
from app.services.glosa_engine import analisar_glosa

app = FastAPI(
    title="Elos Recovery AI",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Elos Recovery AI API"
    }

@app.get("/health")
def health():
    return {
        "status": "ok"
    }

@app.post("/api/glosa/analisar")
def analisar(caso: CasoGlosa):

    resultado = analisar_glosa(caso)

    return resultado