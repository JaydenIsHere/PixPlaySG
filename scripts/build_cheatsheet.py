import os

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image
)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
LOGO_PATH = os.path.join(REPO_ROOT, "src", "images", "plogo.png")
OUTPUT_PATH = os.path.join(REPO_ROOT, "public", "downloads", "strategic-script-system-cheatsheet.pdf")

RED = colors.HexColor("#D6193D")
DARK = colors.HexColor("#1a1a1a")
GRAY = colors.HexColor("#666666")
LIGHTGRAY = colors.HexColor("#f2f2f2")
BORDER = colors.HexColor("#dddddd")

styles = {
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=23, textColor=DARK, leading=25, spaceAfter=3),
    "subtitle": ParagraphStyle("subtitle", fontName="Helvetica", fontSize=10.5, textColor=GRAY, leading=13),
    "sectionHeader": ParagraphStyle("sectionHeader", fontName="Helvetica-Bold", fontSize=13.5, textColor=RED, spaceBefore=14, spaceAfter=8),
    "stageName": ParagraphStyle("stageName", fontName="Helvetica-Bold", fontSize=15, textColor=RED, alignment=TA_CENTER, leading=17),
    "stageDesc": ParagraphStyle("stageDesc", fontName="Helvetica", fontSize=9.6, textColor=DARK, alignment=TA_CENTER, leading=12.2, spaceAfter=6),
    "stageRatio": ParagraphStyle("stageRatio", fontName="Helvetica-Bold", fontSize=9.3, textColor=DARK, alignment=TA_CENTER, leading=12.5),
    "stageExtra": ParagraphStyle("stageExtra", fontName="Helvetica", fontSize=8.5, textColor=GRAY, alignment=TA_CENTER, leading=11.5, spaceBefore=5),
    "catHeader": ParagraphStyle("catHeader", fontName="Helvetica-Bold", fontSize=10, textColor=colors.white, leading=13),
    "catItem": ParagraphStyle("catItem", fontName="Helvetica", fontSize=9.4, textColor=DARK, leading=14, spaceAfter=1),
    "footer": ParagraphStyle("footer", fontName="Helvetica", fontSize=8.5, textColor=GRAY, alignment=TA_CENTER),
    "howtoHeader": ParagraphStyle("howtoHeader", fontName="Helvetica-Bold", fontSize=9.8, textColor=DARK, leading=13),
    "howtoBody": ParagraphStyle("howtoBody", fontName="Helvetica", fontSize=8.9, textColor=GRAY, leading=12.5),
}

STAGES = [
    ("TOFU", "Reach new people who may not know your business yet.",
     "Service 40% &middot; Product 70%",
     "Formats: Short-Form Video, Listicles &amp; Carousels, Memes/Skits, Tier Lists<br/>Angles: Harsh Truths, Counterintuitive Mistakes, Fast Lessons, Stereotypes"),
    ("MOFU", "Build interest, trust, and understanding.",
     "Service 40% &middot; Product 20%",
     "Hooks organized by consumer psychology (see below)<br/>Frameworks: Pain&rarr;Cause&rarr;Solution, Mistake&rarr;Consequence&rarr;Correction, Myth&rarr;Truth&rarr;Example, 3-Step Tutorial, Before&rarr;After&rarr;How, Story&rarr;Lesson&rarr;Application"),
    ("BOFU", "Help the right people make a buying decision.",
     "Service 20% &middot; Product 10%",
     "Hooks organized by consumer psychology (see below)<br/>Frameworks: Pain&rarr;Solution&rarr;Proof&rarr;CTA, Objection&rarr;Reframe&rarr;Evidence&rarr;CTA, Case Study, Product Demo, Comparison, FAQ"),
]

CATEGORIES = [
    ("Trust, Risk Mitigation &amp; Authority", [
        "Loss Aversion", "Social Proof &amp; Herd Mentality", "The Authority Bias*",
        "De-risking &amp; Zero-Risk Bias", "The Paradox of Choice",
    ]),
    ("Desire, Curiosity &amp; Attention Triggers", [
        "The Curiosity Gap", "Scarcity &amp; FOMO", "Visual Temptation&dagger;",
        "Peak-End Rule", "The Decoy Effect",
    ]),
    ("Identity, Ego &amp; Relatability", [
        "Self-Affirmation &amp; Identity Alignment", "The “Us vs. Them” Dynamic",
        "Labor Illusion &amp; Perceived Effort", "The Endowment Effect",
        "Empathy &amp; “I See You” Validation",
    ]),
    ("Friction Reduction &amp; Decision Drivers", [
        "The Reciprocation Principle", "The IKEA Effect", "Anchoring Effect",
        "Cognitive Ease", "Status &amp; Prestige Seeking",
    ]),
    ("Behavioral Loops &amp; Action Triggers", [
        "The Commitment &amp; Consistency Principle", "The Pratfall Effect",
        "Immediate Gratification", "The Spotlight Effect", "Hyperbolic Discounting",
    ]),
    ("Product-Specific: Sensory &amp; Value&dagger;", [
        "Aesthetic-Usability Effect", "Price-Quality Heuristic",
        "Unboxing &amp; Anticipation-Reward", "Bandwagon Effect",
    ]),
]


def cat_block(title, items):
    header = Table(
        [[Paragraph(title, styles["catHeader"])]],
        colWidths=[85 * mm],
    )
    header.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), DARK),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
    ]))
    body_html = "".join(f"&bull; {i}<br/>" for i in items)
    body = Paragraph(body_html, styles["catItem"])
    block = Table(
        [[header], [Paragraph("", styles["catItem"])], [body]],
        colWidths=[85 * mm],
    )
    block.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 1), (-1, 1), 0),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 0),
        ("TOPPADDING", (0, 2), (-1, 2), 5),
        ("BOTTOMPADDING", (0, 2), (-1, 2), 8),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("LEFTPADDING", (0, 2), (-1, 2), 6),
        ("RIGHTPADDING", (0, 2), (-1, 2), 6),
    ]))
    return block


def build():
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        topMargin=14 * mm,
        bottomMargin=10 * mm,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
    )
    story = []

    logo = Image(LOGO_PATH, width=15 * mm, height=15 * mm)
    header_text = [
        Paragraph("Strategic Script System", styles["title"]),
        Paragraph("Quick Reference &mdash; funnel stages, ratios, and hook psychology at a glance", styles["subtitle"]),
    ]
    header_table = Table([[header_text, logo]], colWidths=[159 * mm, 15 * mm])
    header_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.6, color=RED, spaceAfter=14))

    # Stage band
    stage_cells = []
    for name, desc, ratio, extra in STAGES:
        cell = [
            Paragraph(name, styles["stageName"]),
            Paragraph(desc, styles["stageDesc"]),
            Paragraph(ratio, styles["stageRatio"]),
            Paragraph(extra, styles["stageExtra"]),
        ]
        stage_cells.append(cell)

    stage_table = Table([stage_cells], colWidths=[59 * mm, 59 * mm, 59 * mm])
    stage_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (0, 0), 0.7, BORDER),
        ("BOX", (1, 0), (1, 0), 0.7, BORDER),
        ("BOX", (2, 0), (2, 0), 0.7, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(stage_table)

    story.append(Paragraph("Hook Psychology &mdash; grouped by category", styles["sectionHeader"]))

    rows = []
    for i in range(0, len(CATEGORIES), 2):
        left = cat_block(*CATEGORIES[i])
        right = cat_block(*CATEGORIES[i + 1]) if i + 1 < len(CATEGORIES) else Paragraph("", styles["catItem"])
        rows.append([left, right])

    cat_table = Table(rows, colWidths=[87 * mm, 87 * mm], hAlign="LEFT")
    cat_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(cat_table)

    story.append(Paragraph("* service-only &nbsp;&nbsp; &dagger; product-only &nbsp;&nbsp; all others apply to both business types", styles["footer"]))
    story.append(Spacer(1, 8))

    howto = Table(
        [[
            Paragraph("How this all fits together", styles["howtoHeader"]),
            "",
        ]],
        colWidths=[174 * mm],
    )
    story.append(HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceBefore=2, spaceAfter=6))
    story.append(Paragraph(
        "<b>Step 1</b> sets your brand identity once &nbsp;&rarr;&nbsp; "
        "<b>Step 2</b> turns two 9-square grids into 64 topics tailored to your business &nbsp;&rarr;&nbsp; "
        "<b>Step 3</b> picks a topic&rsquo;s stage, hook, framework, and CTA into one ready AI prompt &nbsp;&rarr;&nbsp; "
        "<b>Bonus</b> spreads it all into a ratio-correct 60-day calendar.",
        styles["howtoBody"],
    ))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceAfter=6))
    story.append(Paragraph("Strategic Script System &middot; pixplaysg.com", styles["footer"]))

    doc.build(story)


if __name__ == "__main__":
    build()
