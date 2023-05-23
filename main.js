//Validacion de usuario. Los usuarios no pueden tener espacios en blanco.
function validarUsuario() {
    //variable de loguin usuario
    let usuario = prompt("Ingresa tu nombre de usuario:");
    //se crea variable para analizar espacios en blanco y tabulaciones.
    let expresionRegular = /\s/;

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
        alert("Has seleccionado la sucursal " +nombreSucursal );
        break;
    case "2":
        nombreSucursal = "Cordoba";
        alert("Has seleccionado la sucursal " +nombreSucursal );
        break;
    default:
        nombreSucursal = "Alta Gracia";
        alert("Has seleccionado la sucursal " +nombreSucursal );
}
//se harcodean los dias disponibles por falta de APi calendar , se agregara en futuras actualizaciones
function programarTurno() {
    let dia;
    let mes;
    let hora;
    
    while (true) {
        dia = parseInt(prompt("Por favor, ingresa el día del turno:"));
        mes = parseInt(prompt("Por favor, ingresa el mes del turno:"));
        hora = parseInt(prompt("Por favor, ingresa la hora del turno (de 8 a 12):"));
    // Validar hora, día y  mes.  
        if (dia >= 1 && dia <= 31 && mes >= 5 && mes <= 12 && hora >= 8 && hora <= 12) {
            break; // Salir del bucle si la fecha es valida
    }

    alert("La fecha ingresada no es valida. Por favor, intenta nuevamente.");
    }

    alert("Has programado un turno para el día " + dia + " del mes " + mes + " del año 2023 a las " + hora + " horas , en la sucursal "+ nombreSucursal);
}
programarTurno();

