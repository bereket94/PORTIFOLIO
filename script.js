// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuButton.innerHTML = isOpen ? "<i class='bx bx-x'></i>" : "<i class='bx bx-menu'></i>";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.innerHTML = "<i class='bx bx-menu'></i>";
    });
  });
}

// Rotating hero role
const roleElement = document.querySelector(".rotating-role");
const roles = ["web", "full-stack applications", "systems", "secure technology"];
let roleIndex = 0;
if (roleElement) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleElement.textContent = roles[roleIndex];
  }, 2400);
}

// Reveal sections as they enter the viewport
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}

document.getElementById("year").textContent = new Date().getFullYear();

// EmailJS contact form. Existing service, template and public key retained.
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = document.getElementById("submitBtn");
    const status = document.getElementById("formStatus");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2 || message.length < 10) {
      status.textContent = "Please enter your name and a message of at least 10 characters.";
      return;
    }

    if (!window.emailjs) {
      status.textContent = "Email service could not load. Please email me directly.";
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";
    status.textContent = "";

    try {
      emailjs.init("uFpy6pfQtriOZP9tE");
      await emailjs.send("service_eo9srqj", "template_rqamna1", {
        from_name: name,
        from_email: email,
        message
      });
      status.textContent = "Thanks! Your message has been sent successfully.";
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      status.textContent = "Message could not be sent. Please email bereketasfaw94@gmail.com directly.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = "Send message <i class='bx bx-send'></i>";
    }
  });
}
