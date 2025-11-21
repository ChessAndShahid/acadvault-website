// main.js - AcadVault helpers (contact form, reveal, counters, nav UX, theme)
document.addEventListener('DOMContentLoaded', ()=>{

  /* -------------------------
     1) Contact form (demo)
     ------------------------- */
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
      // Placeholder for backend integration (Firebase Function or Email API)
      alert('Message submitted (demo).');
      form.reset();
    });
  }

  /* -------------------------
     2) Reveal on scroll (IntersectionObserver)
     ------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    const observer = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(el => observer.observe(el));
  }

  /* -------------------------
     3) Navbar: close mobile menu on link click
     ------------------------- */
  const nav = document.getElementById('navMain');
  if(nav){
    nav.querySelectorAll('a.nav-link').forEach(a=>{
      a.addEventListener('click', ()=> {
        const bs = bootstrap.Collapse.getInstance(nav) || new bootstrap.Collapse(nav, {toggle:false});
        // only hide on small screens (when toggler visible)
        const toggler = document.querySelector('.navbar-toggler');
        if(toggler && window.getComputedStyle(toggler).display !== 'none'){
          bs.hide();
        }
      });
    });
  }

  /* -------------------------
     4) Smooth scrolling for internal links
     ------------------------- */
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

  /* -------------------------
     5) Keyboard accessible login button
     ------------------------- */
  const loginBtn = document.getElementById('loginBtn');
  if(loginBtn){
    loginBtn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); loginBtn.click(); }
    });
  }

  /* -------------------------
     6) Counters (animate when in view) - improved
     ------------------------- */
  function runCounters(){
    document.querySelectorAll('.stat-num').forEach(el=>{
      const raw = el.getAttribute('data-target') || '0';
      const target = Number(raw);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1600;
      if(target <= 0){
        el.textContent = '0' + suffix;
        return;
      }
      let start = 0;
      const stepTime = Math.max(20, Math.floor(duration / Math.max(1, target)));
      const inc = Math.max(1, Math.ceil(target / (duration / stepTime)));
      const timer = setInterval(()=>{
        start += inc;
        if(start >= target){
          el.textContent = String(target) + suffix;
          clearInterval(timer);
        } else {
          el.textContent = String(start) + suffix;
        }
      }, stepTime);
    });
  }

  const statCards = document.querySelectorAll('.stat-card');
  if(statCards.length){
    const obsStats = new IntersectionObserver((entries, o)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          runCounters();
          o.unobserve(e.target);
        }
      });
    }, {threshold:0.2});
    statCards.forEach(card => obsStats.observe(card));
  }

  /* -------------------------
     7) Theme toggle + persistence (accessible)
     ------------------------- */
  (function(){
    const toggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('acadvault-theme');
    if(saved === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');

    function applyIcon(){
      const isDark = root.getAttribute('data-theme') === 'dark';
      if(toggle){
        toggle.textContent = isDark ? '☀️' : '🌙';
        toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        toggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      }
    }
    applyIcon();

    if(toggle){
      // ensure it's a real button
      toggle.setAttribute('type', 'button');
      toggle.addEventListener('click', ()=>{
        const isDark = root.getAttribute('data-theme') === 'dark';
        if(isDark){
          root.removeAttribute('data-theme');
          localStorage.setItem('acadvault-theme', 'light');
        } else {
          root.setAttribute('data-theme', 'dark');
          localStorage.setItem('acadvault-theme', 'dark');
        }
        applyIcon();
      });
    }
  })();

  /* -------------------------
     8) Fill current year in footer (small safe enhancement)
     ------------------------- */
  (function(){
    try{
      const el = document.getElementById('siteYear');
      if(el) el.textContent = new Date().getFullYear();
    }catch(e){}
  })();

}); // DOMContentLoaded end

// --- non-invasive helpers (append at end of file) ---
(function(){
  'use strict';

  /* 1) Auto-fill footer year if #siteYear exists */
  try{
    const y = document.getElementById('siteYear');
    if(y) y.textContent = new Date().getFullYear();
  }catch(e){}

  /* 2) Auto-mark active nav link (safe: only adds active if matched) */
  try{
    const navLinks = document.querySelectorAll('a.nav-link');
    const current = location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(a=>{
      const href = a.getAttribute('href') ? a.getAttribute('href').split('/').pop() : '';
      if(href === current){
        a.classList.add('active');
        a.setAttribute('aria-current','page');
      }
    });
  }catch(e){}

})();
