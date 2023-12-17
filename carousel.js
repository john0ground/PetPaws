const carousel = document.querySelector('.reviews .carousel');
const buttons = carousel.querySelectorAll('.carousel-btn');
const cardContainer = carousel.querySelector('.card-container');
const cardList = cardContainer.querySelector('ul');

let activeCardIndex = 0;

function moveCard(e) {
    const numOfCards = cardList.childElementCount;
    const containerWidth = cardContainer.getBoundingClientRect().width;
    const direction = e.target.dataset.direction;

    direction === 'right'? activeCardIndex += 1 : activeCardIndex -= 1;

    if (activeCardIndex < 0) activeCardIndex = numOfCards - 1;
    if (activeCardIndex >= numOfCards) activeCardIndex = 0;

    const offset = containerWidth * activeCardIndex;
    cardList.style.left = `-${offset}px`;
}

buttons.forEach(btn => btn.addEventListener('click', moveCard));
