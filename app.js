document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const photoInput = document.getElementById('photo-input');
    const gallery = document.getElementById('gallery');

    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result;

        const photoData = {
            src: imgSrc
        };

        // Retrieve existing gallery data or initialize an empty array
        let galleryData = JSON.parse(localStorage.getItem('galleryData')) || [];
        galleryData.push(photoData);
        localStorage.setItem('galleryData', JSON.stringify(galleryData));

        renderGallery();
    };

    reader.readAsDataURL(file);

    photoInput.value = ''; // Clear the input field
});

function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    // Retrieve gallery data from local storage
    let galleryData = JSON.parse(localStorage.getItem('galleryData')) || [];
    galleryData.forEach(data => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = data.src;
        galleryItem.appendChild(img);

        gallery.appendChild(galleryItem);
    });
}

// Load gallery from local storage on page load
renderGallery();