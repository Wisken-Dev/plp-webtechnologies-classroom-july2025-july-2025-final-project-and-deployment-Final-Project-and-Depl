// Duma Rides — main UI behavior (mobile nav, form validation, reveal, scroll top)
document.addEventListener('DOMContentLoaded', () => {
  // Footer years
  const years = new Date().getFullYear();
  ['year','year2','year3','year4','year5'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = years;
  });

  // Mobile nav toggle
  const navToggleButtons = document.querySelectorAll('#navToggle');
  navToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.getElementById('primaryNav');
      if (!nav) return;
      const open = nav.style.display === 'block';
      nav.style.display = open ? '' : 'block';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  // Close mobile nav on link click (improves UX)
  document.querySelectorAll('.primary-nav a').forEach(a => {
    a.addEventListener('click', () => {
      const nav = document.getElementById('primaryNav');
      if (nav && window.innerWidth < 760) nav.style.display = '';
    });
  });

  // Simple form validation for contact page
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Let Netlify handle the submission if present; we just validate client-side
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!name.value.trim() || name.value.trim().length < 2) {
        e.preventDefault();
        formStatus.textContent = 'Please enter a valid name (2+ characters).';
        name.focus();
        return false;
      }
      if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        e.preventDefault();
        formStatus.textContent = 'Please enter a valid email address.';
        email.focus();
        return false;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        e.preventDefault();
        formStatus.textContent = 'Message must be at least 10 characters.';
        message.focus();
        return false;
      }

      // show a friendly message — Netlify will handle actual submission
      formStatus.textContent = 'Sending…';
      // fallback: allow default submission to proceed (Netlify)
      return true;
    });
  }

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));

  // Scroll-to-top
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
