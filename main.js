// Funcion para mostrar un mensaje de usuario valido
function mostrarMensajeExito(mensaje) {
    const mensajeElement = document.createElement('p');
    mensajeElement.textContent = mensaje;
    mensajeElement.classList.add('text-success');
    document.body.appendChild(mensajeElement);
}

// Funcion para mostrar un mensaje de error
function mostrarMensajeError(mensaje) {
    const mensajeElement = document.createElement('p');
    mensajeElement.textContent = mensaje;
    mensajeElement.classList.add('text-danger');
    document.body.appendChild(mensajeElement);
}

// Funcion para validar el usuario
function validarUsuario() {
    const usuarioInput = document.getElementById('usuario');
    const usuario = usuarioInput.value.trim();

    if (usuario === '') {
        mostrarMensajeError('Debes ingresar un nombre de usuario valido.');
        return false;
    }
    localStorage.setItem('usuario', usuario);

    mostrarMensajeExito('¡Bienvenido, ' + usuario + '!');
    return true;
}

// Evento submit del formulario de inicio de sesion
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envio del formulario

    if (validarUsuario()) {
            mostrarMensajeExito('Usuario valido. Acceso permitido.');

    // Ocultar formulario de inicio de sesion
    loginForm.style.display = 'none';
    }
});

// Funcin para programar un turno
function programarTurno() {
    const diaInput = document.getElementById('dia');
    const mesInput = document.getElementById('mes');
    const horaInput = document.getElementById('hora');

    const dia = parseInt(diaInput.value);
    const mes = parseInt(mesInput.value);
    const hora = parseInt(horaInput.value);

    if (isNaN(dia) || isNaN(mes) || isNaN(hora) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || hora < 8 || hora > 12) {
        mostrarMensajeError('La fecha y hora ingresadas no son validas.');
        return;
    }

    const serviciosSeleccionados = Array.from(document.querySelectorAll('input[name="servicio"]:checked'));
    const total = serviciosSeleccionados.reduce((sum, servicio) => sum + parseInt(servicio.dataset.precio), 0);

    if (serviciosSeleccionados.length === 0) {
        mostrarMensajeError('Debes seleccionar al menos un servicio.');
        return;
    }
    
    let mensaje = 'Se realizaran los siguientes servicios:\n\n';
    serviciosSeleccionados.forEach(servicio => {
        const nombreServicio = servicio.parentNode.textContent.trim();
        mensaje += `${nombreServicio}\n`;
    });
    mensaje += `\nValor total: $${total}`;
    //mostrarMensajeExito(mensaje);

    // Obtener la sucursal seleccionada
    const sucursalSelect = document.getElementById('sucursal');
    const sucursal = sucursalSelect.options[sucursalSelect.selectedIndex].text;

    // Obtener la fecha y hora del turno
    const fechaHoraTurno = `${dia}/${mes} de 2023, ${hora}:00 hs`;

    // Guardar los datos del turno en el almacenamiento local
    const turno = {
        sucursal: sucursal,
        fechaHora: fechaHoraTurno,
        servicios: serviciosSeleccionados.map(servicio => servicio.value)
    };
    localStorage.setItem('turno', JSON.stringify(turno));

    // Mostrar mensaje 
    const mensajeConfirmacion = `Se genero un turno en la sucursal ${sucursal} para el ${fechaHoraTurno}. Servicios seleccionados: ${mensaje}`;
    mostrarMensajeExito(mensajeConfirmacion);
}

// Evento submit del formulario de programacion de turno
const turnoForm = document.getElementById('turnoForm');
turnoForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    programarTurno();
});