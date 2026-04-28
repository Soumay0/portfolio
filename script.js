const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const messageForm = document.getElementById('messageForm');

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