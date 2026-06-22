from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle


OUTPUT = "assets/Kenny_Cheng_Resume.pdf"


def style(name, **kwargs):
    base = {
        "fontName": "Times-Roman",
        "fontSize": 9.35,
        "leading": 10.35,
        "spaceAfter": 0,
        "spaceBefore": 0,
        "textColor": colors.black,
    }
    base.update(kwargs)
    return ParagraphStyle(name, **base)


STYLES = {
    "name": style("name", fontName="Times-Bold", fontSize=20, leading=23, alignment=TA_CENTER),
    "contact": style("contact", fontSize=10.2, leading=12.2, alignment=TA_CENTER),
    "section": style("section", fontName="Times-Bold", fontSize=12, leading=13.2),
    "body": style("body"),
    "body_r": style("body_r", alignment=TA_RIGHT),
    "bold": style("bold", fontName="Times-Bold"),
    "italic": style("italic", fontName="Times-Italic"),
    "bullet": style("bullet", leftIndent=7, firstLineIndent=-7),
    "note": style("note", fontName="Times-Italic"),
}


def p(text, key="body"):
    return Paragraph(text, STYLES[key])


def section(title):
    line = Table([[p(title, "section")]], colWidths=[177 * mm])
    line.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, 0), (-1, -1), 0.6, colors.black),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return line


def two_col(left, right, left_style="bold", right_style="body_r"):
    table = Table([[p(left, left_style), p(right, right_style)]], colWidths=[128 * mm, 49 * mm])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


def bullet(text):
    return p(f"&bull;&nbsp; {text}", "bullet")


def entry(org, location, role, date, bullets):
    flow = [
        two_col(org, location),
        two_col(f"<i>{role}</i>", date, "body", "body_r"),
    ]
    flow.extend(bullet(item) for item in bullets)
    flow.append(Spacer(1, 3.5))
    return flow


def build():
    doc = BaseDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=17 * mm,
        rightMargin=17 * mm,
        topMargin=15 * mm,
        bottomMargin=14 * mm,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame])])

    flow = [
        p("KENNY CHENG", "name"),
        p("(+852) 9148 5140 &nbsp;&nbsp; — &nbsp;&nbsp; u3663763@connect.hku.hk", "contact"),
        Spacer(1, 8),
        section("EDUCATION"),
        two_col("The University of Hong Kong", "Hong Kong"),
        two_col("<i>Master of Arts in AI, Ethics and Society</i>", "Sep 2025 – Jun 2026 (Expected)", "body", "body_r"),
        bullet("<b>CGPA:</b> 3.53/4.30"),
        two_col("Lingnan University", "Hong Kong"),
        two_col("<i>Bachelor of Social Science in Business Psychology</i>", "Sep 2021 – Aug 2025", "body", "body_r"),
        bullet("<b>Honors:</b> Dean's List (2023, 2024, 2025)"),
        section("PUBLICATIONS & WORKING PAPERS"),
        p("Wang, H.<super>*</super>, Cheng, Y.<super>*</super>, van Gool, P., &amp; Zhang, Z. (Revise &amp; Resubmit)."),
        p("Navigating Diversity: The Role of Network Crafting in Resource Enrichment Across Work and Home."),
        p("<i>Career Development International.</i>"),
        p("<i>* Co-first authors</i>"),
        section("RESEARCH EXPERIENCE"),
    ]

    flow += entry(
        "The Chinese University of Hong Kong",
        "Shenzhen, China",
        "Research Assistant (Organizational Behaviour)",
        "Jan 2026 – Present",
        [
            "Supervisor: Prof. Xuan LIU",
            "Identified and evaluated psychological scales, including construct validation and adaptation for bilingual contexts.",
            "Cleaned and structured large-scale labor market data (Revelio dataset), including variable construction and merging across sources.",
            "Designed and refined bilingual (Chinese/English) Qualtrics surveys, including item wording and survey flow.",
            "Screened and synthesized literature on AI and job search / career behavior to support theory development.",
        ],
    )
    flow += entry(
        "The Chinese University of Hong Kong",
        "Hong Kong",
        "Research Assistant (Industrial and Organizational Psychology)",
        "Jun 2024 – Aug 2024",
        [
            "Supervisor: Prof. Julian Pfrombeck",
            "Designed and distributed bilingual surveys to 200+ older adults in Hong Kong using community-based sampling.",
            "Supported a four-wave longitudinal study, including participant tracking and data quality checks.",
            "Conducted preliminary data cleaning and descriptive analyses to prepare datasets for hypothesis testing.",
            "Assisted in literature review and early-stage theory development on digital adaptation and aging.",
        ],
    )
    flow += [
        section("RESEARCH PROJECTS & CONFERENCE PRESENTATIONS"),
    ]
    flow += entry(
        "Lingnan University",
        "Hong Kong",
        "Undergraduate Thesis",
        "Jan 2025 – May 2025",
        [
            "<b>Project:</b> From Awareness to Action: Positive AI Awareness in Shaping Occupational Opportunities",
            "Investigated the psychological impact of AI by designing and distributing surveys to assess AI awareness, perceived career opportunities, and job crafting behaviors among undergraduate and early-career cohorts.",
            "Applied regression-based statistical analyses to examine how positive AI awareness predicts career adaptability and psychological well-being in the modern workforce.",
        ],
    )
    flow += entry(
        "The University of Hong Kong",
        "Hong Kong",
        "Capstone Project",
        "Sep 2025 – Present",
        [
            "Conducting an interdisciplinary capstone project on AI governance, responsibility gaps, and human-AI interaction in organizational and media contexts.",
            "Examining institutional accountability and ethical implications of AI-assisted decision-making through legal, organizational, and psychological perspectives.",
            "Integrating policy analysis and empirical literature to develop governance-oriented frameworks for responsible AI implementation.",
        ],
    )
    flow += entry(
        "Chinese Association of Social Psychology",
        "China",
        "Conference Presentation (First Author)",
        "Jun 2024 – Jul 2024",
        [
            "<b>Presentation:</b> Enhancing Creativity in Diverse Workgroups: The Role of Network Crafting",
            "Presented empirical findings on how network crafting facilitates creativity in diverse teams to an audience of scholars and practitioners.",
            "Engaged in academic discussions with senior scholars regarding the study's methodological design and theoretical implications.",
        ],
    )

    flow.append(PageBreak())
    flow += [section("PROFESSIONAL EXPERIENCE")]
    flow += entry(
        "FaceMarket",
        "Hong Kong",
        "Researcher",
        "Jun 2026 – Present",
        [
            "Conduct research on face identity, likeness rights, digital assets, and AI-generated actor markets to support product and compliance strategy.",
            "Analyze emerging use cases involving synthetic media, digital replicas, virtual performers, and commercialized face or voice assets.",
            "Review platform risks related to consent, provenance, identity misuse, deepfake abuse, and secondary commercialization of digital likeness.",
            "Synthesize findings into English research briefs, competitor notes, and governance recommendations for synthetic media products.",
        ],
    )
    flow += entry(
        "Best Top Consulting Pte Ltd",
        "Remote / Singapore",
        "AI Product Development Intern",
        "May 2025 – Aug 2025",
        [
            "Revised AI prompt design based on a 16-dimension psychological assessment framework (BPRA), improving user completion rates by approximately 40%.",
            "Assisted in building AI-based assessment pipelines by integrating the SkillsFuture framework with internal models, covering 1,800+ job records.",
            "Worked with engineering teams to test prompt performance and iterate on system responses based on user feedback and behavioral patterns.",
            "Documented prompt design principles and workflow processes to support internal knowledge sharing and future model refinement.",
        ],
    )
    flow += entry(
        "Shenzhen Bao'an District HR Bureau, Vocational Training Center",
        "Shenzhen, China",
        "Training Assistant",
        "Jun 2023 – Aug 2023",
        [
            "Supported the design and delivery of five adult vocational training programs, contributing to course structure and instructional materials.",
            "Assisted in administering pre- and post-training evaluations and organizing feedback data for course improvement.",
            "Coordinated training logistics, including participant scheduling, attendance tracking, and communication with instructors.",
            "Summarized training outcomes and participant feedback to support internal reporting and program review.",
        ],
    )
    flow += [
        section("SKILLS & INTERESTS"),
        bullet("<b>Technical:</b> SPSS, Mplus, Python, Qualtrics"),
        bullet("<b>Research Interests:</b> AI Governance, Synthetic Media, Face Identity, Digital Assets, Organizational Behavior"),
        bullet("<b>Languages:</b> Mandarin (Native), English (Proficient)"),
    ]
    doc.build(flow)


if __name__ == "__main__":
    build()
