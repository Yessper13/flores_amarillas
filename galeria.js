function changeImage(src, isVideo = false) {
    const mainImage = document.getElementById('displayed-image');
    const mainVideo = document.getElementById('displayed-video');
    if (isVideo) {
        mainImage.style.display = 'none';
        mainVideo.style.display = 'block';
        mainVideo.src = src;
        mainVideo.load();
        mainVideo.play();
    } else {
        mainImage.style.display = 'block';
        mainVideo.style.display = 'none';
        mainImage.src = src;
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
    }
}

// Agrega miniatura de video al carrusel al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const videoThumb = document.createElement('img');
    videoThumb.src = 'img/video-thumb.jpg'; // Usa una imagen representativa del video
    videoThumb.alt = 'Video';
    videoThumb.style.objectFit = 'cover';
    videoThumb.onclick = function() {
        changeImage('img/2025-04-16-093718035.mp4', true);
    };
    sidebar.appendChild(videoThumb);
});

// Video controles responsivos
const video = document.getElementById('miVideo');
if (window.innerWidth > 768) {
    video.setAttribute('controls', 'controls');
}

document.querySelector('.add-image-icon').addEventListener('click', function() {
    document.getElementById('addImageInput').click();
});

document.getElementById('addImageInput').addEventListener('change', addImage);