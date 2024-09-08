const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword.addEventListener('click', function (e) {
      // alternar el tipo de atributo
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      // alternar el icono del ojo
      this.classList.toggle('fa-eye-slash');
    });

    password.onblur = function() {
      if(password.value.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
      }
    }

    // Obtén una referencia al servicio de autenticación
var auth = firebase.auth();

// Cuando se envía el formulario
document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtén el correo electrónico ingresado por el usuario
  var email = document.getElementById('email').value;

  // Envía el correo de reestablecimiento de contraseña
  auth.sendPasswordResetEmail(email).then(function() {
    // Muestra un mensaje de éxito
    document.getElementById('success-message').textContent = 'Se ha enviado un correo de reestablecimiento de contraseña a ' + email + '.';
  }).catch(function(error) {
    // Muestra un mensaje de error
    document.getElementById('error-message').textContent = 'Error: ' + error.message;
  });
});
