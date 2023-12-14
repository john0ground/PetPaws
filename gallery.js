const imageContainers = document.querySelectorAll('.gallery .image-container');
const imageModal = document.querySelector('#image-dialog'); 
const imgElement = imageModal.querySelector('img');

function displayImage(e) {
    imgElement.removeAttribute('src');

    const imageThumbnail = e.target.querySelector('img');
    const imageSrc = imageThumbnail.dataset.highres;
    imgElement.setAttribute('src', imageSrc);

    imageModal.showModal();
}

function setLoadingIcon() {}

function hideLoadingIcon() {}

imgElement.addEventListener('load', () => console.log('loaded'));

imageContainers.forEach(img => {
    img.addEventListener('mouseover', () => { img.classList.add('image-hovered'); });
    img.addEventListener('mouseout', () => { img.classList.remove('image-hovered'); });
    img.addEventListener('click', displayImage);
});

// close modal
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) imageModal.close();
});
