//Validacion de usuario. Los usuarios no pueden tener espacios en blanco.
function validarUsuario() {
    //variable de loguin usuario
    let usuario = prompt("Ingresa tu nombre de usuario:");
    //se crea variable para analizar espacios en blanco y tabulaciones.
    const expresionRegular = /\s/;

    // En el ciclo se utilisa el metodo test para analizar espacios en blanco y tabulacion, tambien se toma en cuanta que el clietne no ingrese datos en la validacion.
    while (expresionRegular.test(usuario) || usuario === "") {
        //Si se detecta que el usuario ingresado es invalido , se vuelve a solictar ingresarlo
        alert("Has ingresado un usuario no valido. Por favor, intentalo nuevamente.");
        usuario = prompt("Ingresa tu nombre de usuario:");
    }
    //Si el usuario es correcto se emite la alerta de bienvenido
    alert("Bienvenido: " + usuario);
}

// se llama a la funcion de validacion.
validarUsuario();
//Se solicita al usuario que defina la sucursal donde quiere hacer el turno
let sucursal = prompt("Por favor, selecciona una sucursal:\n1. Villa Maria \n2. Cordoba \n3. Alta Gracia ");

while (sucursal !== "1" && sucursal !== "2" && sucursal !== "3") {
    //Si el usuario ingresa un valor diferente a 1, 2 o 3 se indica que no es valido y se vuelve a solictar la sucursal.
    alert("Has ingresado una sucursal no válida. Por favor, selecciona una sucursal válida.");
    sucursal = prompt("Por favor, selecciona una sucursal:\n1. Villa Maria\n2. Cordoba\n3. Alta Gracia");
}
//se crea una variable para alojar el nombre de la sucursal
let nombreSucursal;
switch (sucursal) {
    //se usa un condicional para definir la variable y mostrar por pantalla el resultado de la elección
    case "1":
        nombreSucursal = "Villa Maria";
        alert("Has seleccionado la sucursal " + nombreSucursal);
        break;
    case "2":
        nombreSucursal = "Cordoba";
        alert("Has seleccionado la sucursal " + nombreSucursal);
        break;
    default:
        nombreSucursal = "Alta Gracia";
        alert("Has seleccionado la sucursal " + nombreSucursal);
}

function programarTurno() {
    let dia;
    let mes;
    let hora;

    while (true) {
        const today = new Date(); // Obtener la fecha actual
        dia = parseInt(prompt("Por favor, ingresa el dia del turno:"));
        mes = parseInt(prompt("Por favor, ingresa el mes del turno:"));
        hora = parseInt(prompt("Por favor, ingresa la hora del turno (de 8 a 12):"));
        
        // Validar hora, dia y  mes.  
        const turnoDate = new Date(today.getFullYear(), mes - 1, dia, hora);
        if (turnoDate > today && dia >= 1 && dia <= 31 && mes >= 1 && mes <= 12 && hora >= 8 && hora <= 12) {
            break; // Salir del bucle si la fecha es válida
        }

        alert("La fecha ingresada no es valida. Por favor, intenta nuevamente.");
    }
    
// Mostrar todos los servicios y obtener los seleccionados por el usuario
const serviciosSeleccionados = [];
let total = 0;

let mensaje = 'Elige los servicios que deseas agregar al turno:\n\n';
for (const servicio of servicios) {
    mensaje += `${servicio.id}. ${servicio.nombre} - Precio: $${servicio.precio}\n`;
}

while (true) {
    const seleccion = prompt(`${mensaje}\nIngresa el ID del servicio que deseas agregar (o "0" para finalizar):`);

    if (seleccion === '0') {
        break;
    }

    const servicioElegido = servicios.find(servicio => servicio.id === parseInt(seleccion));

    if (servicioElegido) {
        serviciosSeleccionados.push(servicioElegido);
        total += servicioElegido.precio;
    } else {
        alert('ID invalido. Por favor, ingresa un ID valido.');
    }
}

// Mostrar los servicios seleccionados y el valor total
mensaje = 'Se realizaran los siguientes servicios:\n\n';
for (const servicio of serviciosSeleccionados) {
    mensaje += `${servicio.nombre} - Precio: $${servicio.precio}\n`;
}
mensaje += `\nValor total: $${total}\n\n Ante cualquier duda o consulta , no dude en contactarnos`;


    alert("Has programado un turno para el dia " + dia + " del mes " + mes + " del año 2023 a las " + hora + " horas , en la sucursal " + nombreSucursal + `\n\n ${mensaje} \n`);
}
programarTurno();
