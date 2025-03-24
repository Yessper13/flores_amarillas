function calcularTiempo() {
    const fechaInicio = new Date(2023, 11, 24); // 24 de diciembre de 2023 (mes 11 porque enero es 0)
    const fechaActual = new Date();
    
    let anios = fechaActual.getFullYear() - fechaInicio.getFullYear();
    let meses = fechaActual.getMonth() - fechaInicio.getMonth();
    
    if (meses < 0) {
        anios--;
        meses += 12;
    }
    
    document.getElementById("time").textContent = `${anios} años y ${meses} meses`;
}

calcularTiempo();