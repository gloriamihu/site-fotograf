document.addEventListener("DOMContentLoaded", () => {
  // Mark JS enabled (CSS reveal runs only when JS works)
  document.documentElement.classList.add("js");

  // ===== Topbar appear on scroll =====
  const topbar = document.getElementById("topbar");
  const onScroll = () => {
    if (!topbar) return;
    if (window.scrollY > 10) topbar.classList.add("show");
    else topbar.classList.remove("show");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Smooth scroll to portfolio (hero button) =====
  const btn = document.getElementById("scrollBtn");
  const target = document.getElementById("portfolio");
  if (btn && target) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ===== Back to top =====
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

  // ===== Footer year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Success modal + toast + form reset (Formspree) =====
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("successModal");
  const closeBtn = document.getElementById("closeSuccess");
  const toast = document.getElementById("toast");

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 1600);
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus(); // accessibility + premium feel
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    showToast("Mesaj trimis ✓");
  };

  // Set a flag on submit so we can show modal even if ?success=true is missing
  if (form) {
    form.addEventListener("submit", () => {
      localStorage.setItem("formSuccess", "1");
    });
  }

  // Close modal: OK button
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close modal: X or backdrop click (elements with data-close="true")
  if (modal) {
    modal.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.dataset && t.dataset.close === "true") closeModal();
    });
  }

  // Close modal: ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Show modal on redirect (?success=true) OR local flag
  const params = new URLSearchParams(window.location.search);
  const fromSuccessParam = params.get("success") === "true";
  const fromLocalFlag = localStorage.getItem("formSuccess") === "1";

  if (fromSuccessParam || fromLocalFlag) {
    if (form) form.reset();
    openModal();
    localStorage.removeItem("formSuccess");

    // clean URL + jump to contact
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + "#contact",
    );
  }

  // If user hits Back and Safari restores from bfcache, clear form
  window.addEventListener("pageshow", (e) => {
    if (e.persisted && form) form.reset();
  });

  // ===== Scroll reveal + stagger (featured, panels, shots) =====
  const revealEls = document.querySelectorAll(".featured, .panel, .shot");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealEls.forEach((el, i) => {
      el.classList.add("reveal-init");

      // stagger only for gallery shots
      if (el.classList.contains("shot")) {
        const delay = (i % 6) * 70; // 0, 70, 140...
        el.style.setProperty("--d", `${delay}ms`);
      }

      io.observe(el);
    });
  }
});
