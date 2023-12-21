const imageContainers = document.querySelectorAll('.gallery .image-container');
const imageModal = document.querySelector('#image-dialog'); 
const imgElement = imageModal.querySelector('img');
const loadingIcon = imageModal.querySelector('svg');

function setLoadingIcon() {
    loadingIcon.style.display = 'block';
}

function hideLoadingIcon() {
    loadingIcon.style.display = 'none';
}

function displayImage(e) {
    imgElement.removeAttribute('src');
    setLoadingIcon();

    const imageThumbnail = e.target.querySelector('img');
    const imageSrc = imageThumbnail.dataset.highres;
    imgElement.setAttribute('src', imageSrc);

    imageModal.showModal();
}

imgElement.addEventListener('load', hideLoadingIcon);

imageContainers.forEach(img => {
    img.addEventListener('mouseover', () => { img.classList.add('image-hovered'); });
    img.addEventListener('mouseout', () => { img.classList.remove('image-hovered'); });
    img.addEventListener('click', displayImage);
});

// close modal
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) imageModal.close();
});
