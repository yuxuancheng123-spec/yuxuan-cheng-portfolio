const navLinks = document.querySelectorAll(".nav-links a");
const sections = [...document.querySelectorAll("main section[id]")];

function setActiveNav() {
  const current = sections
    .map((section) => ({
      id: section.id,
      top: Math.abs(section.getBoundingClientRect().top - 120),
    }))
    .sort((first, second) => first.top - second.top)[0];

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current?.id}`);
  });
}

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();
