const faqRows = document.querySelectorAll('.faq-row');

function toggleFaq() {
    if (this.hasAttribute('data-active')) {
        this.removeAttribute('data-active');
    } else {
        this.setAttribute('data-active', '');
    }
}

faqRows.forEach(faq => {
    faq.addEventListener('click', toggleFaq);
});