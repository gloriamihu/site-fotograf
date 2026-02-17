document.addEventListener("DOMContentLoaded", () => {
  // Topbar appear on scroll
  const topbar = document.getElementById("topbar");

  const onScroll = () => {
    if (!topbar) return;
    if (window.scrollY > 10) topbar.classList.add("show");
    else topbar.classList.remove("show");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Smooth scroll to portfolio
  const btn = document.getElementById("scrollBtn");
  const target = document.getElementById("portfolio");

  if (btn && target) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Back to top
  const back = document.getElementById("backToTop");

  const handleBackToTop = () => {
    if (!back) return;
    if (window.scrollY > 400) back.classList.add("show");
    else back.classList.remove("show");
  };

  window.addEventListener("scroll", handleBackToTop, { passive: true });
  handleBackToTop();

  if (back) {
    back.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
