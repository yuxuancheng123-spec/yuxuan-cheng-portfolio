# Floating Portfolio Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved centered floating widget homepage and updated Kenny Cheng resume PDF.

**Architecture:** Keep the portfolio as a static HTML/CSS/JS site. Add generated assets under `assets/` and keep resume generation support under `scripts/`.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, ReportLab PDF generation, Poppler rendering for PDF QA, in-app browser verification.

## Global Constraints

- Do not touch the AI compliance demo repo unless needed for links.
- Keep the homepage English-first and visually light.
- Preserve the original resume's academic CV style and two-page feel.
- Avoid heavy dependencies.

---

### Task 1: Resume Asset

**Files:**
- Create: `scripts/generate_resume.py`
- Create: `assets/Kenny_Cheng_Resume.pdf`
- Create: `tmp/resume_render/updated-1.png`, `tmp/resume_render/updated-2.png`

**Steps:**
- [ ] Extract original resume text and preserve section order.
- [ ] Generate a two-page A4 PDF with ReportLab.
- [ ] Add FaceMarket Researcher under Professional Experience.
- [ ] Render the PDF to PNG for visual QA.

### Task 2: Homepage Redesign

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

**Steps:**
- [ ] Replace the current grid homepage with the centered floating widget layout.
- [ ] Add resume, project, profile, and contact panel switching.
- [ ] Add scatter/collect project stack interaction.
- [ ] Add links to the compliance demo, GitHub repo, and resume PDF.

### Task 3: Verification and Commit

**Steps:**
- [ ] Run `node --check app.js`.
- [ ] Run `rg` checks for stale placeholder language.
- [ ] Run browser desktop and mobile checks for overflow and core interactions.
- [ ] Commit the changes.
