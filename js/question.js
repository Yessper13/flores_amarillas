const preguntas = [
  "¿Cuál es tu recuerdo favorito conmigo?",
  "¿Qué es lo que más te gusta de nuestra relación?",
  "¿Dónde te gustaría viajar conmigo?",
  "¿Qué canción describe mejor nuestra historia?",
  "¿Qué harías si tuviéramos un día entero juntos sin distracciones?"
];

let preguntaActual = "";

function unirseSesion() {
  const codigo = document.getElementById('codigo').value.trim();
  if (codigo) {
    mostrarPregunta();
  } else {
    alert("Ingresa un código de sesión");
  }
}

function mostrarPregunta() {
  document.getElementById('codigo-section').style.display = 'none';
  document.getElementById('pregunta-section').style.display = 'block';

  const randomIndex = Math.floor(Math.random() * preguntas.length);
  preguntaActual = preguntas[randomIndex];
  document.getElementById('pregunta').textContent = preguntaActual;
}

function enviarRespuesta() {
  const respuesta = document.getElementById('respuesta').value.trim();
  if (respuesta) {
    document.getElementById('pregunta-section').style.display = 'none';
    document.getElementById('resultado-section').style.display = 'block';
    document.getElementById('resultado').textContent =
      `Guardada tu respuesta: "${respuesta}". Esperando respuesta de tu pareja...`;
    
    // Aquí deberías guardar la respuesta en el servidor usando el código de sesión
  }
}
