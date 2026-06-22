const menuItems = document.querySelectorAll("[data-panel]");
const panelViews = document.querySelectorAll("[data-panel-view]");
const stackToggle = document.querySelector(".stack-toggle");
const projectStack = document.querySelector(".project-stack");
const clock = document.querySelector("#clock");
const dateLabel = document.querySelector("#date-label");
const personalNote = document.querySelector("#personal-note");
const noteSave = document.querySelector(".note-save");
const complianceLinks = document.querySelectorAll("[data-compliance-link]");

const onlineComplianceUrl = "https://yuxuancheng123-spec.github.io/ai-generated-actor-compliance/web/";
const localComplianceUrl = "http://127.0.0.1:8010/ai-generated-actor-compliance/web/index.html";
const defaultNote = personalNote.textContent.trim();
const noteStorageKey = "kenny-portfolio-personal-note";

function activatePanel(panelName) {
  menuItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.panel === panelName);
  });

  panelViews.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panelView === panelName);
  });
}

function updateDateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const month = now.getMonth() + 1;
  const day = now.getDate();

  clock.textContent = `${hours}:${minutes}`;
  dateLabel.textContent = `${now.getFullYear()} / ${month} / ${day}`;
}

function resolveComplianceLinks() {
  const isLocalPreview =
    window.location.protocol === "file:" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";

  complianceLinks.forEach((link) => {
    link.href = isLocalPreview ? localComplianceUrl : onlineComplianceUrl;
  });
}

function restorePersonalNote() {
  const savedNote = window.localStorage.getItem(noteStorageKey);
  personalNote.textContent = savedNote || defaultNote;
}

function savePersonalNote() {
  const note = personalNote.textContent.replace(/\s+/g, " ").trim();
  personalNote.textContent = note || defaultNote;
  window.localStorage.setItem(noteStorageKey, personalNote.textContent);
  noteSave.textContent = "Saved";
  noteSave.classList.add("is-saved");
  window.setTimeout(() => {
    noteSave.textContent = "Save";
    noteSave.classList.remove("is-saved");
  }, 1200);
}

menuItems.forEach((item) => {
  item.addEventListener("click", () => activatePanel(item.dataset.panel));
});

stackToggle.addEventListener("click", () => {
  const isScattered = projectStack.classList.toggle("is-scattered");
  stackToggle.textContent = isScattered ? "Hide links" : "Show links";
  stackToggle.setAttribute("aria-expanded", String(isScattered));
});

noteSave.addEventListener("click", savePersonalNote);
personalNote.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    savePersonalNote();
  }
});

resolveComplianceLinks();
restorePersonalNote();
updateDateTime();
window.setInterval(updateDateTime, 30_000);
