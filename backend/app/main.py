from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from io import BytesIO

from app.schemas import CasoGlosa
from app.services.glosa_engine import analisar_glosa
from app.services.recurso_generator import gerar_recurso_administrativo
from app.services.pdf_generator import gerar_pdf_recurso

app = FastAPI(
    title="ELOS Consultoria e Gestão Financeira Hospitalar",
    version="0.3.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://elos-recovery-ai-frontend-7klx4tcxr.vercel.app",
"https://elos-recovery-ai-frontend.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "ELOS Consultoria e Gestão Financeira Hospitalar API"
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


@app.post("/api/glosa/gerar-recurso")
def gerar_recurso(caso: CasoGlosa):

    analise = analisar_glosa(caso)

    recurso = gerar_recurso_administrativo(
        dados_glosa=caso.model_dump(),
        analise=analise
    )

    return recurso


@app.post("/api/glosa/gerar-pdf")
def gerar_pdf(caso: CasoGlosa):

    analise = analisar_glosa(caso)

    recurso = gerar_recurso_administrativo(
        dados_glosa=caso.model_dump(),
        analise=analise
    )

    pdf_bytes = gerar_pdf_recurso(
        dados_glosa=caso.model_dump(),
        recurso=recurso
    )

    return StreamingResponse(
        BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            'attachment; filename="ELOS_Recurso_Administrativo.pdf"'
        }
    )