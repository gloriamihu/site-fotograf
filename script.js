document.addEventListener("DOMContentLoaded", () => {
  // Mark JS as enabled (so CSS reveal only applies when JS works)
  document.documentElement.classList.add("js");

  // ===== Topbar: appear on scroll =====
  const topbar = document.getElementById("topbar");
  const onScroll = () => {
    if (!topbar) return;
    if (window.scrollY > 10) topbar.classList.add("show");
    else topbar.classList.remove("show");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Smooth scroll to portfolio (button) =====
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

  // ===== Scroll reveal + stagger =====
  const revealEls = document.querySelectorAll(".featured, .panel, .shot");

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

  // ============================================================
  // ===== Success Modal + GUARANTEED toast on close =====
  // ============================================================

  const form = document.getElementById("contactForm");
  const modal = document.getElementById("successModal");
  const toast = document.getElementById("toast");
  const closeBtn = document.getElementById("closeSuccess");

  let toastTimer = null;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;

    // reset (so it can replay even if already shown)
    toast.classList.remove("show");
    // force reflow
    void toast.offsetHeight;

    toast.classList.add("show");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1600);
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // ✅ Guaranteed toast (single source of truth)
    showToast("Mesaj trimis ✓");
  };

  // 1) If redirected back with ?success=true -> reset form + open modal + clean URL
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "true") {
    if (form) form.reset();
    openModal();

    // keep user at contact section + remove query param
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + "#contact",
    );
  }

  // 2) If user hits Back and browser restores from bfcache -> clear form
  window.addEventListener("pageshow", (e) => {
    if (e.persisted && form) form.reset();
  });

  // 3) Close modal: OK button
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // 4) Close modal: X button or backdrop click
  if (modal) {
    modal.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.dataset && t.dataset.close === "true") closeModal();
    });
  }

  // 5) Close modal: ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
});
