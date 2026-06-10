def analisar_glosa(dados):
    motivo = dados.motivo.lower()

    if "document" in motivo:
        categoria = "Documentação"
        chance = 82
        prioridade = "Alta"

    elif "cid" in motivo:
        categoria = "Codificação"
        chance = 74
        prioridade = "Média"

    else:
        categoria = "Outros"
        chance = 60
        prioridade = "Média"

    return {
        "categoria": categoria,
        "prioridade": prioridade,
        "chance_recuperacao": chance,
        "recomendacao": "Revisar documentação assistencial e reenviar recurso."
    }