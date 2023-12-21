const faqRows = document.querySelectorAll('.faq-row');

function toggleFaq() {
    const question = this.querySelector('.question h3');

    if (this.hasAttribute('data-active')) {
        this.removeAttribute('data-active');
        question.setAttribute('data-expanded', 'false');
    } else {
        this.setAttribute('data-active', '');
        question.setAttribute('data-expanded', 'true');
    }
}

faqRows.forEach(faq => {
    faq.addEventListener('click', toggleFaq);
});

// accessibility
const questions = document.querySelectorAll('.faq-row .question h3');

questions.forEach(question => question.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        const faqRow = question.closest('.faq-row');
        faqRow.click();
    }
}));