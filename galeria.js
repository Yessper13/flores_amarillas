document.addEventListener('DOMContentLoaded', function() {
    // Miniatura de video en el carrusel
    const sidebar = document.querySelector('.sidebar');
    const videoThumb = document.createElement('img');
    videoThumb.src = 'img/video-thumb.png';
    videoThumb.alt = 'Video';
    videoThumb.style.objectFit = 'cover';
    videoThumb.onclick = function() {
        changeImage('img/2025-04-16-093718035.mp4', true);
    };
    sidebar.appendChild(videoThumb);

    // Solo un listener para agregar imagen
    document.getElementById('addImageInput').addEventListener('change', addImage);
});

function changeImage(src, isVideo = false) {
    const mainImage = document.getElementById('displayed-image');
    const mainVideo = document.getElementById('displayed-video');
    const videoControls = document.getElementById('video-controls');
    if (isVideo) {
        mainImage.style.display = 'none';
        mainVideo.style.display = 'block';
        mainVideo.src = src;
        mainVideo.load();
        mainVideo.play();
        videoControls.style.display = 'flex';
    } else {
        mainImage.style.display = 'block';
        mainVideo.style.display = 'none';
        mainImage.src = src;
        videoControls.style.display = 'none';
    }
}

// Permite agregar imágenes al carrusel
function addImage() {
    const input = document.getElementById('addImageInput');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const sidebar = document.querySelector('.sidebar');
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Nueva imagen';
            img.onclick = function() { changeImage(img.src); };
            sidebar.appendChild(img);
            changeImage(img.src);
        };
        reader.readAsDataURL(input.files[0]);
        input.value = ""; // Limpia el input para permitir agregar la misma imagen de nuevo si se desea
    }
}

// Video controles responsivos
const video = document.getElementById('miVideo');
if (window.innerWidth > 768) {
    video.setAttribute('controls', 'controls');
}

// Video control logic
const mainVideo = document.getElementById('displayed-video');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = document.getElementById('play-pause-icon');
const muteBtn = document.getElementById('mute-btn');
const muteIcon = document.getElementById('mute-icon');

playPauseBtn.addEventListener('click', function() {
    if (mainVideo.paused) {
        mainVideo.play();
        playPauseIcon.src = 'img/pause.png';
    } else {
        mainVideo.pause();
        playPauseIcon.src = 'img/play.png';
    }
});

mainVideo.addEventListener('play', function() {
    playPauseIcon.src = 'img/pause.png';
});
mainVideo.addEventListener('pause', function() {
    playPauseIcon.src = 'img/play.png';
});

muteBtn.addEventListener('click', function() {
    mainVideo.muted = !mainVideo.muted;
    muteIcon.src = mainVideo.muted ? 'img/mute.png' : 'img/volumen.png';
});