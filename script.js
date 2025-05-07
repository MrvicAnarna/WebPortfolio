document.addEventListener('DOMContentLoaded', function() {
  // Sticky Header
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    header.classList.toggle('sticky', window.scrollY > 0);
  });
  
  // Active Navigation Link
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Scroll Reveal Animation
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  // Skill Bar Animation
  const skillBars = document.querySelectorAll('.fill');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute('data-percent');
        entry.target.style.width = percent;
        entry.target.style.animation = `fillAnimation 1.5s ease-out forwards`;
      }
    });
  }, {
    threshold: 0.5
  });
  
  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form Submission
  const contactForm = document.querySelector('form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
  
  // Mobile Menu Toggle (for future mobile menu implementation)
  const menuToggle = document.createElement('div');
  menuToggle.classList.add('menu-toggle');
  menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
  header.appendChild(menuToggle);
  
  menuToggle.addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') ? 
      '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const nav = document.querySelector('nav');
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
      }
    });
  });
  
  // Dynamic Year in Footer
  const yearSpan = document.createElement('span');
  yearSpan.textContent = new Date().getFullYear();
  const footerText = document.querySelector('footer p');
  if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', yearSpan.outerHTML);
  }
});