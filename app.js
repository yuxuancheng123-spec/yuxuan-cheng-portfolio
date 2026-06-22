const menuItems = document.querySelectorAll("[data-panel]");
const panelViews = document.querySelectorAll("[data-panel-view]");
const stackToggle = document.querySelector(".stack-toggle");
const projectStack = document.querySelector(".project-stack");
const clock = document.querySelector("#clock");
const dateLabel = document.querySelector("#date-label");
const personalNote = document.querySelector("#personal-note");
const noteSave = document.querySelector(".note-save");
const complianceLinks = document.querySelectorAll("[data-compliance-link]");
const clusterWrap = document.querySelector(".cluster-wrap");
const draggableWidgets = document.querySelectorAll("[data-draggable-widget]");

const onlineComplianceUrl = "https://yuxuancheng123-spec.github.io/ai-generated-actor-compliance/web/";
const localComplianceUrl = "http://127.0.0.1:8010/ai-generated-actor-compliance/web/index.html";
const defaultNote = personalNote.textContent.trim();
const noteStorageKey = "kenny-portfolio-personal-note";
const widgetPositionKey = "kenny-portfolio-widget-positions";
const desktopQuery = window.matchMedia("(min-width: 981px)");
const interactiveSelector = "button, input, textarea, select, [contenteditable='true'], .project-chip, .note-link";

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

function getScale() {
  const rect = clusterWrap.getBoundingClientRect();
  return rect.width / clusterWrap.offsetWidth || 1;
}

function getStoredWidgetPositions() {
  try {
    return JSON.parse(window.localStorage.getItem(widgetPositionKey)) || {};
  } catch {
    return {};
  }
}

function saveWidgetPositions() {
  if (!desktopQuery.matches) {
    return;
  }

  const positions = {};
  draggableWidgets.forEach((widget) => {
    positions[widget.dataset.widgetId] = {
      left: Math.round(parseFloat(widget.style.left || widget.offsetLeft)),
      top: Math.round(parseFloat(widget.style.top || widget.offsetTop)),
    };
  });

  window.localStorage.setItem(widgetPositionKey, JSON.stringify(positions));
}

function restoreWidgetPositions() {
  if (!desktopQuery.matches) {
    return;
  }

  const positions = getStoredWidgetPositions();
  draggableWidgets.forEach((widget) => {
    const saved = positions[widget.dataset.widgetId];
    if (!saved) {
      return;
    }

    const next = clampToCluster(saved.left, saved.top, widget);
    widget.style.left = `${next.left}px`;
    widget.style.top = `${next.top}px`;
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function clampToCluster(left, top, widget) {
  const wrapWidth = clusterWrap.offsetWidth;
  const wrapHeight = clusterWrap.offsetHeight;
  const widgetWidth = widget.offsetWidth;
  const widgetHeight = widget.offsetHeight;
  const edgePadding = 4;
  const centerX = wrapWidth / 2;
  const centerY = wrapHeight / 2;
  const radiusX = wrapWidth * 0.5;
  const radiusY = wrapHeight * 0.5;

  let widgetCenterX = left + widgetWidth / 2;
  let widgetCenterY = top + widgetHeight / 2;
  let dx = widgetCenterX - centerX;
  let dy = widgetCenterY - centerY;
  const distance = Math.sqrt((dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY));

  if (distance > 1) {
    dx /= distance;
    dy /= distance;
    widgetCenterX = centerX + dx;
    widgetCenterY = centerY + dy;
  }

  const minLeft = edgePadding - widgetWidth * 0.15;
  const maxLeft = wrapWidth - widgetWidth - edgePadding + widgetWidth * 0.15;
  const minTop = edgePadding - widgetHeight * 0.15;
  const maxTop = wrapHeight - widgetHeight - edgePadding + widgetHeight * 0.15;

  return {
    left: clamp(widgetCenterX - widgetWidth / 2, minLeft, maxLeft),
    top: clamp(widgetCenterY - widgetHeight / 2, minTop, maxTop),
  };
}

function shouldStartDrag(event, widget) {
  if (!desktopQuery.matches || event.button !== 0) {
    return false;
  }

  const interactiveTarget = event.target.closest(interactiveSelector);
  if (!interactiveTarget) {
    return true;
  }

  return interactiveTarget === widget;
}

function setupDraggableWidgets() {
  let activeDrag = null;

  draggableWidgets.forEach((widget) => {
    widget.addEventListener("pointerdown", (event) => {
      if (!shouldStartDrag(event, widget)) {
        return;
      }

      const scale = getScale();
      activeDrag = {
        widget,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        left: parseFloat(widget.style.left || widget.offsetLeft),
        top: parseFloat(widget.style.top || widget.offsetTop),
        moved: false,
      };

      widget.classList.remove("is-settling");
      widget.classList.add("is-dragging");
      widget.setPointerCapture(event.pointerId);
      activeDrag.scale = scale;
    });

    widget.addEventListener("click", (event) => {
      if (widget.dataset.suppressClick === "true") {
        event.preventDefault();
        event.stopPropagation();
        delete widget.dataset.suppressClick;
      }
    });
  });

  window.addEventListener("pointermove", (event) => {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
      return;
    }

    const deltaX = (event.clientX - activeDrag.startX) / activeDrag.scale;
    const deltaY = (event.clientY - activeDrag.startY) / activeDrag.scale;

    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
      activeDrag.moved = true;
      activeDrag.widget.dataset.suppressClick = "true";
    }

    activeDrag.widget.style.left = `${activeDrag.left + deltaX}px`;
    activeDrag.widget.style.top = `${activeDrag.top + deltaY}px`;
  });

  function finishDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
      return;
    }

    const { widget } = activeDrag;
    const settled = clampToCluster(parseFloat(widget.style.left), parseFloat(widget.style.top), widget);
    widget.classList.remove("is-dragging");
    widget.classList.add("is-settling");
    widget.style.left = `${settled.left}px`;
    widget.style.top = `${settled.top}px`;

    window.setTimeout(() => {
      widget.classList.remove("is-settling");
    }, 430);

    saveWidgetPositions();
    activeDrag = null;
  }

  window.addEventListener("pointerup", finishDrag);
  window.addEventListener("pointercancel", finishDrag);
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
restoreWidgetPositions();
setupDraggableWidgets();
updateDateTime();
window.setInterval(updateDateTime, 30_000);
