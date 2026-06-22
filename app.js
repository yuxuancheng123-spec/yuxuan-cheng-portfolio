const menuItems = document.querySelectorAll("[data-panel]");
const panelViews = document.querySelectorAll("[data-panel-view]");
const stackToggle = document.querySelector(".stack-toggle");
const projectStack = document.querySelector(".project-stack");
const clock = document.querySelector("#clock");
const dateLabel = document.querySelector("#date-label");

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

menuItems.forEach((item) => {
  item.addEventListener("click", () => activatePanel(item.dataset.panel));
});

stackToggle.addEventListener("click", () => {
  const isScattered = projectStack.classList.toggle("is-scattered");
  stackToggle.textContent = isScattered ? "Hide links" : "Show links";
  stackToggle.setAttribute("aria-expanded", String(isScattered));
});

updateDateTime();
window.setInterval(updateDateTime, 30_000);
