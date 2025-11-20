// main.js - helpers: contact form, reveal on scroll, accessible nav focus
document.addEventListener('DOMContentLoaded', ()=>{

  // 1) Contact form (demo behaviour)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(!name || !email || !message){
        alert('Please fill all fields.');
        return;
      }
      // TODO: Hook this to Firebase Function / Email service in Phase 3
      alert('Message submitted (demo).');
      form.reset();
    });
  }

  // 2) IntersectionObserver reveal for .reveal elements
  const reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    const obs = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(el => obs.observe(el));
  }

  // 3) Keyboard-accessible mobile nav: focus trap hint
  const nav = document.getElementById('navMain') || document.getElementById('nav') || document.getElementById('nav2');
  if(nav){
    // Ensure navbar toggler has aria-expanded toggled automatically (Bootstrap does this)
    // Provide visible focus outline for keyboard users (CSS handles it)
    // Close mobile menu on link click for better UX:
    nav.querySelectorAll('a.nav-link').forEach(a=>{
      a.addEventListener('click', ()=> {
        const bsCollapse = bootstrap.Collapse.getInstance(nav) || new bootstrap.Collapse(nav, {toggle:false});
        if(window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none'){
          bsCollapse.hide();
        }
      });
    });
  }

  // 4) Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // 5) Small accessibility: ensure login button is focusable with space/enter
  const loginBtn = document.getElementById('loginBtn');
  if(loginBtn){
    loginBtn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); loginBtn.click(); }
    });
  }

});
