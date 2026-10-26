(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("main section[id]");

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach((section) => activeObserver.observe(section));

  const roles = ["数据分析", "RPA 自动化", "Power BI 可视化", "ERP 信息系统"];
  const typedText = document.getElementById("typed-text");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex += 1;
      typedText.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1400);
        return;
      }
      setTimeout(type, 80);
    } else {
      charIndex -= 1;
      typedText.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(type, 40);
    }
  }

  type();
})();
