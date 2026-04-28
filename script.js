const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const messageForm = document.getElementById('messageForm');
const revealTargets = document.querySelectorAll(
  '.eyebrow, .intro, .subtitle, .description, .cta-buttons, .social-links, .hero-stats, .profile-image, .section-title, .skill-category, .highlight-card, .project-card, .training-card, .contact-item'
);
const statNumbers = document.querySelectorAll('.stat-card strong[data-count]');
const tickerTrack = document.querySelector('.ticker-track');

if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

const animateCount = (element) => {
  const target = Number(element.dataset.count || '0');
  const label = element.textContent.includes('+') ? '+' : '';
  const duration = 1200;
  const start = performance.now();

  const step = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = `${value}${progress === 1 ? label : ''}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
  statNumbers.forEach((element) => {
    const target = element.dataset.count || element.textContent;
    element.textContent = element.textContent.includes('+') ? `${target}+` : target;
  });
} else {
  revealTargets.forEach((element) => element.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

statNumbers.forEach((element) => animateCount(element));

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

if (messageForm) {
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageForm.reset();
    alert('Thanks for your message. Please contact me directly at soumaypandey1@gmail.com.');
  });
}