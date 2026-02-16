document.addEventListener("DOMContentLoaded", () => {
  // Topbar apare la scroll
  const topbar = document.getElementById("topbar");
  function onScroll() {
    if (!topbar) return;
    if (window.scrollY > 10) topbar.classList.add("show");
    else topbar.classList.remove("show");
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Scroll smooth către portofoliu
  const btn = document.getElementById("scrollBtn");
  const target = document.getElementById("portfolio");
  if (btn && target) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Back to top (buton colț dreapta jos)
  const back = document.getElementById("backToTop");
  function handleBackToTop() {
    if (!back) return;
    if (window.scrollY > 400) back.classList.add("show");
    else back.classList.remove("show");
  }
  window.addEventListener("scroll", handleBackToTop);
  handleBackToTop();
  if (back) {
    back.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // An în footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
