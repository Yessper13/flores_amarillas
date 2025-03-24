function actualizarDias() {
    const fechaInicio = new Date("2023-12-24"); // Fecha de inicio
    const fechaActual = new Date(); // Fecha actual
    const diferenciaTiempo = fechaActual - fechaInicio;
    const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertir a días
    
    document.getElementById("tiempo").textContent = `Han pasado ${diasTranscurridos} días desde que te conoci y no me arrepiento de haber recibido ese alfajor`;
}

actualizarDias(); // Ejecutar al cargar la página
setInterval(actualizarDias, 1000 * 60 * 60 * 24); // Actualizar cada 24 horas
