const imageContainers = document.querySelectorAll('.gallery .image-container');

imageContainers.forEach(img => {
    img.addEventListener('mouseover', () => { img.classList.add('image-hovered'); });
});

imageContainers.forEach(img => {
    img.addEventListener('mouseout', () => { img.classList.remove('image-hovered'); });
});
