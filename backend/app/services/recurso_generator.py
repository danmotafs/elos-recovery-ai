from datetime import datetime
from typing import Dict, Any


def formatar_moeda(valor: float) -> str:
    try:
        return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    except Exception:
        return "R$ 0,00"


def formatar_chance(chance_raw: Any) -> str:
    if isinstance(chance_raw, (int, float)):
        return f"{chance_raw}%"

    if chance_raw is None:
        return "Não estimada"

    chance_texto = str(chance_raw).strip()

    if chance_texto.isdigit():
        return f"{chance_texto}%"

    return chance_texto


def gerar_recurso_administrativo(
    dados_glosa: Dict[str, Any],
    analise: Dict[str, Any],
) -> Dict[str, Any]:
    hospital = dados_glosa.get("hospital", "Hospital não informado")
    convenio = dados_glosa.get("convenio", "Convênio não informado")
    cid = dados_glosa.get("cid", "CID não informado")
    procedimento = dados_glosa.get("procedimento", "Procedimento não informado")
    motivo = dados_glosa.get("motivo", "Motivo não informado")
    valor = dados_glosa.get("valor_glosado", 0)

    categoria = analise.get("categoria", "Não classificada")
    prioridade = analise.get("prioridade", "Não definida")
    chance = formatar_chance(analise.get("chance_recuperacao"))
    recomendacao = analise.get("recomendacao", "Recomenda-se revisão técnica da glosa.")
    evidencia = analise.get("evidencia", "Evidência não localizada na base de conhecimento.")
    fonte = analise.get("fonte", "Base interna de conhecimento ELOS.")
    data_emissao = datetime.now().strftime("%d/%m/%Y")

    documento = f"""
RECURSO ADMINISTRATIVO DE CONTESTAÇÃO DE GLOSA

ELOS Consultoria e Gestão Financeira Hospitalar
Recuperação de Receitas Orientada por Dados

Data de emissão: {data_emissao}

À Operadora / Convênio: {convenio}

Hospital: {hospital}
CID informado: {cid}
Procedimento: {procedimento}
Valor glosado: {formatar_moeda(valor)}
Motivo da glosa: {motivo}

1. SÍNTESE DA GLOSA

O presente recurso administrativo tem por finalidade solicitar a reconsideração da glosa aplicada ao procedimento acima identificado, classificada tecnicamente na categoria "{categoria}", com prioridade "{prioridade}" e chance estimada de recuperação de "{chance}".

2. FUNDAMENTAÇÃO TÉCNICA

A análise realizada pela ELOS Consultoria e Gestão Financeira Hospitalar identificou elementos técnicos que justificam a revisão da glosa.

Evidência localizada:
{evidencia}

Fonte de apoio:
{fonte}

3. JUSTIFICATIVA ASSISTENCIAL E OPERACIONAL

O procedimento informado está relacionado ao atendimento assistencial prestado ao paciente, devendo ser analisado considerando a indicação clínica, a conformidade documental, a compatibilidade entre CID, procedimento, autorização e os registros hospitalares disponíveis.

A glosa apresentada deve ser reavaliada à luz da documentação assistencial e administrativa vinculada ao caso, especialmente quando houver comprovação da realização do serviço, pertinência técnica do procedimento e aderência às regras contratuais aplicáveis.

4. ARGUMENTO PARA RECONSIDERAÇÃO

Com base na análise técnica, recomenda-se:

{recomendacao}

Dessa forma, entende-se que há fundamento para reanálise da cobrança, considerando o potencial de recuperação identificado e a necessidade de revisão criteriosa da negativa aplicada.

5. PEDIDO

Diante do exposto, solicita-se a reconsideração da glosa e a reavaliação do valor glosado de {formatar_moeda(valor)}, com a consequente liberação do pagamento, caso confirmada a conformidade técnica, assistencial e documental do atendimento.

6. ASSINATURA INSTITUCIONAL

ELOS Consultoria e Gestão Financeira Hospitalar
Curadoria técnica em auditoria, faturamento hospitalar e recuperação de receitas.
""".strip()

    return {
        "titulo": "RECURSO ADMINISTRATIVO DE CONTESTAÇÃO DE GLOSA",
        "documento": documento,
        "categoria": categoria,
        "prioridade": prioridade,
        "chance_recuperacao": chance,
        "valor_glosado_formatado": formatar_moeda(valor),
        "data_emissao": data_emissao,
    }