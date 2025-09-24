document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const addMediaInput = document.getElementById('add-media-input');

    let mediaItems = [
        { type: 'image', src: 'img/imagen1.jpg' },
        { type: 'image', src: 'img/imagen2.jpg' },
        { type: 'image', src: 'img/imagen3.jpg' },
        { type: 'image', src: 'img/imagen4.jpg' },
        { type: 'image', src: 'img/imagen5.jpg' },
        { type: 'image', src: 'img/imagen6.jpg' },
        { type: 'image', src: 'img/imagen7.jpg' },
        { type: 'image', src: 'img/imagen8.jpg' },
        { type: 'image', src: 'img/imagen9.jpg' },
        { type: 'image', src: 'img/imagen10.jpg' },
        { type: 'video', src: 'img/2025-04-16-093718035.mp4', thumbnail: 'img/video-thumb.png' }
    ];

    let currentIndex = 0;

    function createGalleryItem(item, index) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item';
        itemDiv.dataset.index = index;

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = `Imagen ${index + 1}`;
            itemDiv.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = true;
            video.loop = true;
            video.setAttribute('playsinline', '');
            // Opcional: mostrar un thumbnail y reproducir al pasar el mouse
            if(item.thumbnail) {
                video.poster = item.thumbnail;
            }
            itemDiv.appendChild(video);

            const videoIndicator = document.createElement('div');
            videoIndicator.className = 'video-indicator';
            itemDiv.appendChild(videoIndicator);

            itemDiv.addEventListener('mouseenter', () => video.play());
            itemDiv.addEventListener('mouseleave', () => video.pause());
        }

        itemDiv.addEventListener('click', () => openLightbox(index));
        return itemDiv;
    }

    function renderGallery() {
        galleryGrid.innerHTML = '';
        mediaItems.forEach((item, index) => {
            galleryGrid.appendChild(createGalleryItem(item, index));
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        const item = mediaItems[currentIndex];

        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'none';
        lightboxImg.classList.remove('active');
        lightboxVideo.classList.remove('active');


        if (item.type === 'image') {
            lightboxImg.src = item.src;
            lightboxImg.style.display = 'block';
            lightboxImg.classList.add('active');
        } else if (item.type === 'video') {
            lightboxVideo.src = item.src;
            lightboxVideo.style.display = 'block';
            lightboxVideo.classList.add('active');
            lightboxVideo.play();
        }
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
        lightboxImg.src = "";
        lightboxVideo.src = "";
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        openLightbox(currentIndex);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        openLightbox(currentIndex);
    }

    function handleNewMedia(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newItem = {
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    src: e.target.result
                };
                if (newItem.type === 'video') {
                    // Para videos locales, el thumbnail es más complejo.
                    // Por simplicidad, no se genera uno automáticamente.
                }
                mediaItems.push(newItem);
                renderGallery();
            };
            reader.readAsDataURL(file);
        }
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    addMediaInput.addEventListener('change', handleNewMedia);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });

    // Initial Render
    renderGallery();
});
