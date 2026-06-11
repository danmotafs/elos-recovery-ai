from io import BytesIO
from pathlib import Path
from typing import Any, Dict

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    Image,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


def _project_root() -> Path:
    return Path(__file__).resolve().parents[3]


def _brand_image_path() -> Path:
    return _project_root() / "frontend" / "public" / "brand" / "banner-elos.png"


def gerar_pdf_recurso(
    dados_glosa: Dict[str, Any],
    recurso: Dict[str, Any],
) -> bytes:
    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=1.5 * cm,
        bottomMargin=1.5 * cm,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "ElosTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=16,
        leading=20,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#005CA9"),
        spaceAfter=12,
    )

    subtitle_style = ParagraphStyle(
        "ElosSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#555555"),
        spaceAfter=16,
    )

    body_style = ParagraphStyle(
        "ElosBody",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1F2937"),
        spaceAfter=8,
    )

    section_style = ParagraphStyle(
        "ElosSection",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#005CA9"),
        spaceBefore=10,
        spaceAfter=6,
    )

    story = []

    logo_path = _brand_image_path()
    if logo_path.exists():
        story.append(Image(str(logo_path), width=11 * cm, height=2.75 * cm))
        story.append(Spacer(1, 0.2 * cm))

    story.append(Paragraph(recurso.get("titulo", "RECURSO ADMINISTRATIVO DE GLOSA"), title_style))
    story.append(
        Paragraph(
            "ELOS Consultoria e Gestão Financeira Hospitalar<br/>"
            "Recuperação de Receitas Orientada por Dados",
            subtitle_style,
        )
    )

    dados_table = Table(
        [
            ["Hospital", dados_glosa.get("hospital", "-")],
            ["Convênio", dados_glosa.get("convenio", "-")],
            ["CID", dados_glosa.get("cid", "-")],
            ["Procedimento", dados_glosa.get("procedimento", "-")],
            ["Valor glosado", recurso.get("valor_glosado_formatado", "-")],
            ["Data de emissão", recurso.get("data_emissao", "-")],
        ],
        colWidths=[4 * cm, 11 * cm],
    )

    dados_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#005CA9")),
                ("TEXTCOLOR", (0, 0), (0, -1), colors.white),
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#D1D5DB")),
                ("BACKGROUND", (1, 0), (1, -1), colors.HexColor("#F9FAFB")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )

    story.append(dados_table)
    story.append(Spacer(1, 0.5 * cm))

    documento = recurso.get("documento", "")

    for bloco in documento.split("\n\n"):
        texto = bloco.strip()

        if not texto:
            continue

        if texto[:2].isdigit() and "." in texto[:4]:
            story.append(Paragraph(texto.replace("\n", "<br/>"), section_style))
        else:
            story.append(Paragraph(texto.replace("\n", "<br/>"), body_style))

    story.append(Spacer(1, 0.6 * cm))

    rodape = Paragraph(
        "Documento gerado automaticamente pela plataforma ELOS Consultoria e Gestão Financeira Hospitalar. "
        "A validação final deve ser realizada por curadoria técnica especializada antes do envio à operadora.",
        ParagraphStyle(
            "ElosFooter",
            parent=styles["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8,
            leading=11,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#6B7280"),
        ),
    )

    story.append(rodape)

    doc.build(story)

    pdf = buffer.getvalue()
    buffer.close()

    return pdf