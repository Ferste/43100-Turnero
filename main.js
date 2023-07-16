// Funcion para mostrar un mensaje de usuario valido
function mostrarMensajeExito(mensaje) {
    Swal.fire({
        icon: 'success',
        title: '¡Felicitaciones!',
        text: mensaje,
    });
}

// Funcion para mostrar un mensaje de error
function mostrarMensajeError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: mensaje,
    });
}

// Funcion para cargar los servicios desde el archivo JSON 
function cargarServicios() {
    fetch('servicios.json')
        .then(response => response.json())
        .then(data => {
            const serviciosList = document.getElementById('serviciosList');
            serviciosList.innerHTML = '';
            data.forEach(servicio => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                const div = document.createElement('div');
                div.classList.add('form-check');
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = 'servicio';
                input.value = servicio.id;
                input.dataset.precio = servicio.precio;
                input.classList.add('form-check-input');
                const label = document.createElement('label');
                label.classList.add('form-check-label');
                label.textContent = servicio.nombre;
                div.appendChild(input);
                div.appendChild(label);
                li.appendChild(div);
                serviciosList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar los servicios:', error);
        });
}

// Funcion para validar el usuario
function validarUsuario() {
    const usuarioInput = document.getElementById('usuario');
    const usuario = usuarioInput.value.trim();

    const patenteInput = document.getElementById('patente');
    const patente = patenteInput.value.trim();

    if (usuario === '' || patente === '') {
        mostrarMensajeError('Debes ingresar un nombre de usuario y una patente válidos.');
        return false;
    }

    // Validar la patente con las expresiones regulares, la ñ no esta incluida en argetina para las patentes antiguas
    const regexPatente1 = /^[A-Za-zÑñ]{3}\d{3}$/;
    const regexPatente2 = /^[A-Za-z]{2}\d{3}[A-Za-z]{2}$/;
    if (!regexPatente1.test(patente) && !regexPatente2.test(patente)) {
        mostrarMensajeError('La patente ingresada no es válida.');
        return false;
    }

    localStorage.setItem('usuario', usuario);
    localStorage.setItem('patente', patente);

    mostrarMensajeExito('¡Bienvenido, ' + usuario + '!');
    document.getElementById('turnoSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'none';
    return true;
}

// Evento submit del formulario de inicio de sesión
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario
    //aplicacion de ternario 
    validarUsuario() ? (
            mostrarMensajeExito('Usuario válido. Acceso permitido.'),
            loginForm.style.display = 'none',
            cargarServicios()
        )
        : null;
});

// Función para programar un turno
function programarTurno() {
    const diaInput = document.getElementById('dia');
    const mesInput = document.getElementById('mes');
    const horaInput = document.getElementById('hora');

    const dia = parseInt(diaInput.value);
    const mes = parseInt(mesInput.value);
    const hora = parseInt(horaInput.value);

    if (isNaN(dia) || isNaN(mes) || isNaN(hora) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || hora < 8 || hora > 12) {
        mostrarMensajeError('La fecha y hora ingresadas no son válidas.');
        return;
    }

    const fechaTurno = new Date(2023, mes - 1, dia, hora, 0, 0); // Crear objeto Date con la fecha seleccionada
    const fechaActual = new Date(); // Obtener la fecha actual

    if (fechaTurno < fechaActual) {
        mostrarMensajeError('No se puede programar un turno en una fecha anterior a la actual.');
        return;
    }

    const serviciosSeleccionados = Array.from(document.querySelectorAll('input[name="servicio"]:checked'));
    const total = serviciosSeleccionados.reduce((sum, servicio) => sum + parseInt(servicio.dataset.precio), 0);

    if (serviciosSeleccionados.length === 0) {
        mostrarMensajeError('Debes seleccionar al menos un servicio.');
        return;
    }

    let mensaje = 'Se realizarán los siguientes servicios:\n\n';
    serviciosSeleccionados.forEach(servicio => {
        const nombreServicio = servicio.parentNode.textContent.trim();
        mensaje += `${nombreServicio}\n`;
    });
    mensaje += `\nValor total: $${total}`;

    // Obtener la sucursal seleccionada
    const sucursalSelect = document.getElementById('sucursal');
    const sucursal = sucursalSelect.options[sucursalSelect.selectedIndex].text;

    // Obtener la fecha y hora del turno
    const fechaHoraTurno = `${dia}/${mes}/2023, a las ${hora}:00 hs`;

    // Guardar los datos del turno
    const turno = {
        sucursal: sucursal,
        fechaHora: fechaHoraTurno,
        servicios: serviciosSeleccionados.map(servicio => servicio.value)
    };
    localStorage.setItem('turno', JSON.stringify(turno));

    // Mostrar mensaje de confirmación
    const mensajeConfirmacion = `Se generó un turno en la sucursal ${sucursal} para la fecha ${fechaHoraTurno}. ${mensaje}`;
    mostrarMensajeExito(mensajeConfirmacion);
    document.getElementById('turnoSection').style.display = 'block';
}

// Restablecer la página después de programar el turno
function restablecerPagina() {
    // Mostrar el formulario de inicio de sesión y ocultar el formulario de turno
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('turnoSection').style.display = 'none';

    // Restablecer los valores de los campos de usuario y patente
    document.getElementById('usuario').value = '';
    document.getElementById('patente').value = '';

    // Eliminar el turno almacenado en el local storage
    localStorage.removeItem('turno');
}

// Evento submit del formulario de programación de turno
const turnoForm = document.getElementById('turnoForm');
turnoForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    programarTurno();
    restablecerPagina();
});