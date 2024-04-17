$(document).ready(function() {
    $('#miFormulario').submit(function(event) {
        // Lógica de validación
        if (!validarFormulario()) {
            // Muestra mensajes de error al usuario
            alert('Por favor, complete todos los campos requeridos correctamente.');
            event.preventDefault(); // Evita que el formulario se envíe si la validación no pasa
        }else{
            alert('Formulario enviado.');
        }
        // Si la validación pasa, el formulario se enviará normalmente
    });

    function validarFormulario() {
        var nombre = $('#nombre').val();
        var correo = $('#email').val();
        var mensaje = $('#mensaje').val();
        // Verifica que los campos no estén vacíos
        if (nombre === '' || correo === '' || mensaje === '') {
            return false;
        }
        // Verifica el formato del correo electrónico utilizando una expresión regular simple
        var correoValido = /\S+@\S+\.\S+/;
        if (!correoValido.test(correo)) {
            return false;
        }
        if ($('#mensaje').val().length === 0 || $('#mensaje').val().length < 10) {
            return false;
        }
        return true;
    }
});
