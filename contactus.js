const btn = document.getElementById('button');
const form = document.getElementById('contact-form');

document.getElementById('contact-form')

 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_gqaevvt';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      //alert('Enviado!');
      Swal.fire({
        title: 'Enviado!',
        icon: 'success',
        timer: 2010, // 20 segundos
        showConfirmButton: false,
        timerProgressBar: true,
        willClose: () => {
          console.log('El mensaje ha desaparecido');
          form.reset(); 
        }
      });
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});