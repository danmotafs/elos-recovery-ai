import json
from pathlib import Path


BASE_PATH = Path(__file__).resolve().parents[2] / "data" / "glosas_conhecimento.json"


def carregar_base_conhecimento():
    with open(BASE_PATH, "r", encoding="utf-8") as arquivo:
        return json.load(arquivo)


def analisar_glosa(dados):
    base_conhecimento = carregar_base_conhecimento()

    texto_analise = (
        f"{dados.motivo} "
        f"{dados.cid} "
        f"{dados.procedimento}"
    ).lower()

    for regra in base_conhecimento:
        palavras_chave = regra.get("palavras_chave", [])

        for palavra in palavras_chave:
            if palavra.lower() in texto_analise:
                return {
                    "categoria": regra["categoria"],
                    "prioridade": regra["prioridade"],
                    "chance_recuperacao": regra["chance_recuperacao"],
                    "recomendacao": regra["recomendacao"],
                    "fonte": "Base de Conhecimento de Glosas",
                    "evidencia": palavra,
                }

    return {
        "categoria": "Outros",
        "prioridade": "Média",
        "chance_recuperacao": 60,
        "recomendacao": (
            "Realizar análise técnica individualizada considerando contrato, "
            "prontuário e justificativas assistenciais."
        ),
        "fonte": "Regra padrão",
        "evidencia": "Nenhuma palavra-chave identificada",
    }