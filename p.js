/* ============================
   PORTFOLIO SCRIPT
   ============================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ─── 1. CUSTOM CURSOR ─── */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top  = mouseY + "px";
    });

    // Smooth follower animation
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + "px";
      follower.style.top  = followerY + "px";
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Enlarge on interactive elements
    document.querySelectorAll("a, button, .skill-card, .project-card, .tl-card").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(2)";
        cursor.style.background = "#ff6fa3";
        follower.style.transform = "translate(-50%, -50%) scale(1.5)";
        follower.style.opacity = "0.3";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.background = "#ff2d78";
        follower.style.transform = "translate(-50%, -50%) scale(1)";
        follower.style.opacity = "0.7";
      });
    });
  }


  /* ─── 2. NAVBAR SCROLL EFFECT ─── */
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    highlightNav();
  });


  /* ─── 3. HAMBURGER MENU ─── */
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close menu when link clicked
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    }
  });


  /* ─── 4. ACTIVE NAV HIGHLIGHT ON SCROLL ─── */
  function highlightNav() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute("id");
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  }


  /* ─── 5. SCROLL REVEAL ANIMATION ─── */
  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─── 6. SKILL BAR ANIMATION ─── */
  const skillBars = document.querySelectorAll(".skill-fill");

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute("data-width");
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 300);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => barObserver.observe(bar));


  /* ─── 7. CONTACT FORM ─── */
  const form    = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = form.querySelector("button[type='submit']");
      btn.textContent = "Sending...";
      btn.disabled = true;
      btn.style.opacity = "0.7";

      // Simulate sending (replace with real API call)
      setTimeout(() => {
        form.reset();
        btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
        btn.disabled = false;
        btn.style.opacity = "1";

        success.classList.add("visible");
        setTimeout(() => success.classList.remove("visible"), 5000);
      }, 1800);
    });
  }


  /* ─── 8. SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });


  /* ─── 9. HERO TYPING EFFECT ─── */
  const greeting = document.querySelector(".hero-greeting");
  if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = "";
    greeting.style.opacity = "1";
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        greeting.textContent += text[i++];
        setTimeout(typeChar, 60);
      }
    }
    setTimeout(typeChar, 500);
  }


  /* ─── 10. TILT EFFECT on Project Cards ─── */
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect   = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) *  6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.5s ease";
    });
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.05s linear, border-color 0.35s, box-shadow 0.35s";
    });
  });


  /* ─── 11. STAT COUNTER ANIMATION ─── */
  const statNums = document.querySelectorAll(".stat-num");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const raw = el.textContent.replace(/[^0-9]/g, "");
        const end = parseInt(raw, 10);
        if (isNaN(end)) return;

        const suffix = el.innerHTML.replace(raw, "").replace(/[0-9]/g, "");
        let start = 0;
        const duration = 1200;
        const step = Math.ceil(duration / end);

        const counter = setInterval(() => {
          start += 1;
          el.innerHTML = start + suffix;
          if (start >= end) {
            el.innerHTML = end + suffix;
            clearInterval(counter);
          }
        }, step);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));


  /* ─── 12. BACKGROUND PARTICLE DOTS on Hero ─── */
  function createParticles() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    for (let i = 0; i < 18; i++) {
      const dot = document.createElement("span");
      dot.classList.add("hero-particle");
      const size    = Math.random() * 4 + 2;
      const x       = Math.random() * 100;
      const y       = Math.random() * 100;
      const delay   = Math.random() * 6;
      const dur     = Math.random() * 8 + 5;

      Object.assign(dot.style, {
        position:        "absolute",
        width:           size + "px",
        height:          size + "px",
        borderRadius:    "50%",
        background:      "rgba(255, 45, 120, 0.4)",
        left:            x + "%",
        top:             y + "%",
        pointerEvents:   "none",
        animation:       `floatParticle ${dur}s ${delay}s ease-in-out infinite`,
        zIndex:          "0",
      });
      hero.appendChild(dot);
    }

    // Inject keyframes if not already present
    if (!document.getElementById("particle-style")) {
      const style = document.createElement("style");
      style.id = "particle-style";
      style.textContent = `
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50%       { transform: translateY(-30px) scale(1.3); opacity: 0.15; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createParticles();

}); // end DOMContentLoaded