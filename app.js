(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const glow = document.getElementById("cursorGlow");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  if (window.matchMedia("(pointer: fine)").matches && glow) {
    document.body.classList.add("has-pointer");
    let mx = 0, my = 0, gx = 0, gy = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });
    const tick = () => {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glow.style.left = gx + "px";
      glow.style.top = gy + "px";
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const need = form.need.value;
      const message = form.message.value.trim();
      const subject = encodeURIComponent(`Web Devs enquiry — ${need} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService: ${need}\n\n${message}\n\n— sent from webdevs site`
      );
      window.location.href = `mailto:chennurisuryateja0@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || typeof gsap === "undefined") {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const heroLines = document.querySelectorAll(".hero-title .line > span");
  gsap.set(heroLines, { yPercent: 110 });
  gsap.set(".hero .eyebrow, .hero-lead, .hero-actions, .hero-stats, .scroll-hint", { opacity: 0, y: 24 });

  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .to(heroLines, { yPercent: 0, duration: 1, stagger: 0.12 })
    .to(".hero .eyebrow", { opacity: 1, y: 0, duration: 0.6 }, "-=0.7")
    .to(".hero-lead", { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
    .to(".hero-actions", { opacity: 1, y: 0, duration: 0.65 }, "-=0.4")
    .to(".hero-stats", { opacity: 1, y: 0, duration: 0.65 }, "-=0.35")
    .to(".scroll-hint", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  gsap.utils.toArray("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.55, ease: "power3.out" });
    });
  });

  gsap.to(".orb-1", {
    y: 40,
    x: 20,
    scrollTrigger: { trigger: ".hero", scrub: 1, start: "top top", end: "bottom top" },
  });
  gsap.to(".orb-2", {
    y: -50,
    scrollTrigger: { trigger: ".hero", scrub: 1.2, start: "top top", end: "bottom top" },
  });
})();
