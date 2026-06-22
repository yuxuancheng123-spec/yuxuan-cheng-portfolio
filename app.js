const projects = {
  "ai-actor": {
    kicker: "Featured project",
    title: "AI Actor Compliance Workspace",
    copy:
      "A product-style compliance review workspace for synthetic media platforms. It turns structured intake into a risk decision, controls, jurisdiction requirements, and evidence checklist.",
    meta: [
      ["Role", "AI compliance analyst"],
      ["Format", "Interactive demo"],
      ["Focus", "Deepfake governance"],
      ["Status", "Built"],
    ],
    primary: "../ai-generated-actor-compliance/web/index.html",
    primaryLabel: "Open project",
    secondary: "https://github.com/yuxuancheng123-spec/ai-generated-actor-compliance",
    secondaryLabel: "View repo",
  },
  privacy: {
    kicker: "Planned case study",
    title: "Data Flow Review System",
    copy:
      "A privacy engineering case page for mapping personal data flows, legal bases, retention controls, and risk ownership across product workflows.",
    meta: [
      ["Role", "Privacy analyst"],
      ["Format", "Case study"],
      ["Focus", "Data mapping"],
      ["Status", "Planned"],
    ],
    primary: "#contact",
    primaryLabel: "Discuss scope",
    secondary: "#about",
    secondaryLabel: "About me",
  },
  "hr-audit": {
    kicker: "Responsible AI audit",
    title: "Hiring AI Risk Audit",
    copy:
      "A governance artifact set for reviewing HR AI systems across bias, transparency, explainability, human oversight, and accountability gaps.",
    meta: [
      ["Role", "AI risk reviewer"],
      ["Format", "Audit pack"],
      ["Focus", "HR AI"],
      ["Status", "Draft"],
    ],
    primary: "#contact",
    primaryLabel: "Request preview",
    secondary: "#work",
    secondaryLabel: "Back to work",
  },
  about: {
    kicker: "Profile",
    title: "About Yuxuan",
    copy:
      "I am building a portfolio around AI responsibility, privacy engineering, and practical compliance systems for products that affect people and identity.",
    meta: [
      ["Interests", "AI governance"],
      ["Methods", "Risk controls"],
      ["Outputs", "Reports + demos"],
      ["Audience", "Reviewers"],
    ],
    primary: "#about",
    primaryLabel: "Read profile",
    secondary: "#contact",
    secondaryLabel: "Contact",
  },
};

const cards = document.querySelectorAll("[data-project]");
const detailKicker = document.querySelector("#detail-kicker");
const detailTitle = document.querySelector("#detail-title");
const detailCopy = document.querySelector("#detail-copy");
const detailMeta = document.querySelector("#detail-meta");
const detailPrimary = document.querySelector("#detail-primary");
const detailSecondary = document.querySelector("#detail-secondary");

function renderMeta(items) {
  detailMeta.replaceChildren();
  items.forEach(([label, value]) => {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    wrapper.append(term, description);
    detailMeta.append(wrapper);
  });
}

function selectProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  cards.forEach((card) => {
    card.classList.toggle("active", card.dataset.project === projectId);
  });

  detailKicker.textContent = project.kicker;
  detailTitle.textContent = project.title;
  detailCopy.textContent = project.copy;
  renderMeta(project.meta);
  detailPrimary.href = project.primary;
  detailPrimary.textContent = project.primaryLabel;
  detailSecondary.href = project.secondary;
  detailSecondary.textContent = project.secondaryLabel;
}

cards.forEach((card) => {
  card.addEventListener("click", () => selectProject(card.dataset.project));
});

selectProject("ai-actor");
