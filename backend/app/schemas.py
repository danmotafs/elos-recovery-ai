from pydantic import BaseModel


class CasoGlosa(BaseModel):
    hospital: str
    convenio: str
    cid: str
    procedimento: str
    valor_glosado: float
    motivo: str