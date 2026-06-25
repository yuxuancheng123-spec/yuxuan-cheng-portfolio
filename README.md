# Yuxuan Cheng Portfolio

Personal portfolio homepage for Yuxuan Cheng, focused on AI governance, privacy engineering, synthetic media compliance, face identity research, and digital asset work.

The site uses a dark evidence-lab interface: a cinematic AI governance command center with compliance-flow visuals, glass panels, audit-style project cards, and direct links to the AI Actor Compliance Workspace, GitHub projects, privacy engineering artifacts, and an updated English resume PDF.

## Quick Links

| Link | URL |
|---|---|
| Portfolio homepage | <https://yuxuancheng123-spec.github.io/yuxuan-cheng-portfolio/> |
| Portfolio repository | <https://github.com/yuxuancheng123-spec/yuxuan-cheng-portfolio> |
| GitHub profile | <https://github.com/yuxuancheng123-spec> |
| AI Actor Compliance Workspace | <https://yuxuancheng123-spec.github.io/ai-generated-actor-compliance/web/> |
| Chinese compliance demo | <https://yuxuancheng123-spec.github.io/ai-generated-actor-compliance/web/demo.zh.html> |
| Compliance repository | <https://github.com/yuxuancheng123-spec/ai-generated-actor-compliance> |
| Resume PDF | <https://yuxuancheng123-spec.github.io/yuxuan-cheng-portfolio/assets/Kenny_Cheng_Resume.pdf> |

If a GitHub Pages link does not open, check that the target repository is public and GitHub Pages is enabled.

## Project Links

| Project | Description | Link |
|---|---|---|
| AI Actor Compliance Workspace | Synthetic media compliance intake and generated report workflow | <https://yuxuancheng123-spec.github.io/ai-generated-actor-compliance/web/> |
| AI Actor Compliance Repository | Full compliance case study, frameworks, reports, and risk scoring demo | <https://github.com/yuxuancheng123-spec/ai-generated-actor-compliance> |
| Yuxuan Cheng Portfolio Repository | Source code for this portfolio homepage | <https://github.com/yuxuancheng123-spec/yuxuan-cheng-portfolio> |

## Local Preview

Run a local server from the parent folder so portfolio links can resolve to the compliance project:

```bash
cd "/Users/miine/Documents/Compliance Assessment"
python3 -m http.server 8010
```

Then open:

| Local page | URL |
|---|---|
| Portfolio homepage | <http://127.0.0.1:8010/yuxuan-cheng-portfolio/> |
| English compliance demo | <http://127.0.0.1:8010/ai-generated-actor-compliance/web/> |
| Chinese compliance demo | <http://127.0.0.1:8010/ai-generated-actor-compliance/web/demo.zh.html> |

## Structure

```text
yuxuan-cheng-portfolio/
├── index.html
├── styles.css
├── app.js
├── assets/
│   ├── Kenny_Cheng_Resume.pdf
│   └── ai-identity-visual.png
├── scripts/
│   └── generate_resume.py
└── docs/
    └── portfolio-gallery-plan.md
```

## Link Behavior

When previewing from `file://`, `127.0.0.1`, or `localhost`, compliance links are rewritten to the local compliance demo:

```text
http://127.0.0.1:8010/ai-generated-actor-compliance/web/index.html
```

When deployed on GitHub Pages, those same links point to:

```text
https://yuxuancheng123-spec.github.io/ai-generated-actor-compliance/web/
```
