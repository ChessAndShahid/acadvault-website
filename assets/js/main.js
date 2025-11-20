// main.js - tiny helpers
document.addEventListener('DOMContentLoaded', ()=>{

  // Simple contact form validation
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      if(!name || !email || !msg){
        alert('Please fill all fields.');
        return;
      }
      // Here you would call your backend or Firebase function.
      alert('Message submitted (demo).');
      form.reset();
    });
  }

});
