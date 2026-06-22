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
const desktopQuery = window.matchMedia("(min-width: 981px)");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const interactiveSelector = "button, input, textarea, select, [contenteditable='true'], .project-chip";
const orbitSlots = {
  sidebar: { left: 0, top: 126 },
  visual: { left: 292, top: 0 },
  "resume-pill": { left: 725, top: 96 },
  clock: { left: 725, top: 180 },
  greeting: { left: 330, top: 196 },
  calendar: { left: 725, top: 342 },
  panel: { left: 84, top: 590 },
  portfolio: { left: 410, top: 520 },
  "governance-link": { left: 700, top: 596 },
  "contact-heart": { left: 700, top: 684 },
};

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

function getWidgetPosition(widget) {
  return {
    left: parseFloat(widget.style.left || widget.offsetLeft),
    top: parseFloat(widget.style.top || widget.offsetTop),
  };
}

function placeWidget(widget, left, top) {
  widget.style.left = `${left}px`;
  widget.style.top = `${top}px`;
}

function settleWidget(widget, left, top, duration = 360) {
  widget.classList.add("is-settling");
  placeWidget(widget, left, top);

  window.setTimeout(() => {
    widget.classList.remove("is-settling");
  }, duration);
}

function restoreOrbitLayout() {
  if (!desktopQuery.matches) {
    return;
  }

  draggableWidgets.forEach((widget) => {
    const slot = orbitSlots[widget.dataset.widgetId];
    if (!slot) {
      return;
    }

    placeWidget(widget, slot.left, slot.top);
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

function getWidgetBox(widget) {
  const { left, top } = getWidgetPosition(widget);

  return {
    left,
    top,
    right: left + widget.offsetWidth,
    bottom: top + widget.offsetHeight,
    centerX: left + widget.offsetWidth / 2,
    centerY: top + widget.offsetHeight / 2,
    width: widget.offsetWidth,
    height: widget.offsetHeight,
  };
}

function getBoxAt(widget, left, top) {
  return {
    left,
    top,
    right: left + widget.offsetWidth,
    bottom: top + widget.offsetHeight,
  };
}

function boxesOverlap(firstBox, secondBox, gap = 18) {
  return !(
    firstBox.right + gap <= secondBox.left ||
    firstBox.left >= secondBox.right + gap ||
    firstBox.bottom + gap <= secondBox.top ||
    firstBox.top >= secondBox.bottom + gap
  );
}

function canPlaceWidget(widget, left, top) {
  const candidateBox = getBoxAt(widget, left, top);

  return [...draggableWidgets].every((otherWidget) => {
    if (otherWidget === widget) {
      return true;
    }

    return !boxesOverlap(candidateBox, getWidgetBox(otherWidget));
  });
}

function settleToOrbit(widget, duration = 360) {
  const slot = orbitSlots[widget.dataset.widgetId];
  if (!slot) {
    return;
  }

  settleWidget(widget, slot.left, slot.top, duration);
}

function settleOrbitLayout(activeWidget) {
  draggableWidgets.forEach((widget) => {
    if (widget === activeWidget) {
      return;
    }

    settleToOrbit(widget, 260);
  });
}

function shouldStartDrag(event, widget) {
  if (!desktopQuery.matches || event.button !== 0 || widget.dataset.widgetId === "greeting") {
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
        lastSafeLeft: parseFloat(widget.style.left || widget.offsetLeft),
        lastSafeTop: parseFloat(widget.style.top || widget.offsetTop),
      };

      widget.classList.remove("is-settling");
      widget.classList.add("is-dragging");
      clusterWrap.classList.add("is-rearranging");
      settleOrbitLayout(widget);
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

    const next = clampToCluster(activeDrag.left + deltaX, activeDrag.top + deltaY, activeDrag.widget);

    if (canPlaceWidget(activeDrag.widget, next.left, next.top)) {
      activeDrag.lastSafeLeft = next.left;
      activeDrag.lastSafeTop = next.top;
      placeWidget(activeDrag.widget, next.left, next.top);
      return;
    }

    placeWidget(activeDrag.widget, activeDrag.lastSafeLeft, activeDrag.lastSafeTop);
  });

  function finishDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
      return;
    }

    const { widget } = activeDrag;
    widget.classList.remove("is-dragging");
    settleToOrbit(widget);
    settleOrbitLayout(widget);
    clusterWrap.classList.remove("is-rearranging");
    activeDrag = null;
  }

  window.addEventListener("pointerup", finishDrag);
  window.addEventListener("pointercancel", finishDrag);
}

function startOrbitalMotion() {
  if (!desktopQuery.matches || motionQuery.matches) {
    return;
  }

  const greeting = document.querySelector('[data-widget-id="greeting"]');
  const orbitingWidgets = [...draggableWidgets].filter((widget) => widget !== greeting);
  const seeds = new Map(
    orbitingWidgets.map((widget, index) => [
      widget,
      {
        speed: 0.00022 + (index % 4) * 0.000035,
        phase: index * 1.2,
        radiusX: 4 + (index % 3) * 1.4,
        radiusY: 3 + (index % 4) * 1.1,
      },
    ]),
  );

  function orbit(timestamp) {
    const isRearranging = clusterWrap.classList.contains("is-rearranging");

    orbitingWidgets.forEach((widget) => {
      if (isRearranging || widget.classList.contains("is-dragging") || widget.classList.contains("is-settling")) {
        widget.style.setProperty("--orbit-x", "0px");
        widget.style.setProperty("--orbit-y", "0px");
        return;
      }

      const seed = seeds.get(widget);
      const angle = timestamp * seed.speed + seed.phase;
      widget.style.setProperty("--orbit-x", `${Math.cos(angle) * seed.radiusX}px`);
      widget.style.setProperty("--orbit-y", `${Math.sin(angle) * seed.radiusY}px`);
    });

    window.requestAnimationFrame(orbit);
  }

  window.requestAnimationFrame(orbit);
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
restoreOrbitLayout();
setupDraggableWidgets();
startOrbitalMotion();
updateDateTime();
window.setInterval(updateDateTime, 30_000);
