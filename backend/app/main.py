from fastapi import FastAPI

from app.schemas import CasoGlosa
from app.services.glosa_engine import analisar_glosa

app = FastAPI(
    title="Elos Recovery AI",
    version="0.1.0"
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