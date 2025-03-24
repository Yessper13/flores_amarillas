function actualizarDias() {
    const fechaInicio = new Date("2023-12-24"); // Fecha de inicio
    const fechaActual = new Date(); // Fecha actual
    const diferenciaTiempo = fechaActual - fechaInicio;
    const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertir a días
    
    document.getElementById("tiempo").textContent = `24/12/2023 => ${diasTranscurridos} dias despues`;
}

actualizarDias(); // Ejecutar al cargar la página
setInterval(actualizarDias, 1000 * 60 * 60 * 24); // Actualizar cada 24 horas


