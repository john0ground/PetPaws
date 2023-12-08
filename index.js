'use strict';
const header = document.querySelector('header');
const btnToggleNav = document.querySelector('.btn-toggle-nav');
const btnNavBars = btnToggleNav.querySelectorAll('.bar');
const nav = document.querySelector('#nav-main');
const navLinks = document.querySelectorAll('#nav-main > ul > li > a');
const dropdownLinks = document.querySelectorAll('.dropdown-link');
const btnDropdownArrows = document.querySelectorAll('.btn-dropdown-arrow');
const lastNavLink = document.querySelector('#nav-main .link-last');
const lastDropDownLinks = document.querySelectorAll('.dropdown-last');

// ==================================  NAV BAR ACCESSIBILITY  ======================================

let displayNav = false;
let mobileScreen = false;

// remove focus states if nav-bar is hidden.
function toggleNavFocus(state) {
    if (state === true) {
        navLinks.forEach(link => link.removeAttribute('tabindex'));
        btnDropdownArrows.forEach(btn => btn.removeAttribute('tabindex'));
    } else {
        navLinks.forEach(link => link.setAttribute('tabindex', '-1'));
        btnDropdownArrows.forEach(btn => btn.setAttribute('tabindex', '-1'));
    }
}

function toggleNavBar(e) {
    if (e.type === 'click' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();

        displayNav = !displayNav;

        if (displayNav) {
            btnToggleNav.setAttribute('aria-label', 'close navigation links');
            btnNavBars.forEach(bar => bar.setAttribute('data-bar-open', ''));
        } else {
            btnToggleNav.setAttribute('aria-label', 'open navigation links');
            btnNavBars.forEach(bar => bar.removeAttribute('data-bar-open'));
        }

        nav.setAttribute('data-display', displayNav.toString());
        toggleNavFocus(displayNav);
    }
}

btnToggleNav.addEventListener('click', toggleNavBar);
btnToggleNav.addEventListener('keydown', toggleNavBar);

//  trap focus if nav bar is displayed.
lastNavLink.addEventListener('keydown', (e) => {
    if (e.key === "Tab" && mobileScreen) {
        e.preventDefault();
        btnToggleNav.focus();
    } 
});

// ==================================  NAV DROPDOWNS ACCESSIBILITY  ======================================
function toggleDropDownBar(dropDownElem, state) {
    const dropdownBar = dropDownElem;
    
    if (mobileScreen === false) dropdownBar.setAttribute('data-screen', 'desktop');

    state === 'true'? 
    dropdownBar.setAttribute('data-visible', 'false'):
    dropdownBar.setAttribute('data-visible', 'true');

    const subLinks = dropdownBar.querySelectorAll('ul li a');
    state === 'true'? 
    subLinks.forEach(link => link.setAttribute('tabindex', '-1')):
    subLinks.forEach(link => link.removeAttribute('tabindex'));
}

function toggleDropdownBtn(e) {
    if (e.type === 'click' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();

        const state = e.target.dataset.extend;
        const navSibling = e.target.parentNode.querySelector('a');
        
        if (state === 'true') {
            e.target.setAttribute('data-extend', 'false');
            e.target.setAttribute('aria-label', `Extend ${navSibling.textContent} Dropdown Links`);
            e.target.classList.remove('dropdown-extend');
        } else {
            e.target.setAttribute('data-extend', 'true');
            e.target.setAttribute('aria-label', `Close ${navSibling.textContent} Dropdown Links`);
            e.target.classList.add('dropdown-extend');
        }

        toggleDropDownBar(e.target.nextElementSibling, state);
    }
}

btnDropdownArrows.forEach(btn => btn.addEventListener('click', toggleDropdownBtn));
btnDropdownArrows.forEach(btn => btn.addEventListener('keydown', toggleDropdownBtn));

// ============= dropdown when hovered =================
function hoverDropdownLink(e, state) {
    if (mobileScreen) return;
    e.stopPropagation();
    toggleDropDownBar(e.target.lastElementChild, state);
}

dropdownLinks.forEach(link => link.addEventListener('mouseenter',(e) => hoverDropdownLink(e,'false')));
dropdownLinks.forEach(link => link.addEventListener('mouseleave',(e) => hoverDropdownLink(e,'true')));

// ============= dropdown when focused =================
function focusDropdownLink(parentLi, state) {
    if (mobileScreen) return;    
    toggleDropDownBar(parentLi.lastElementChild, state);
}

navLinks.forEach(link => link.addEventListener('focus', (e) => {
    const parentLi = e.target.parentNode;
    if (parentLi.classList.contains('dropdown-link')) {
        focusDropdownLink(parentLi, 'false');
    }
}));

navLinks.forEach(link => link.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {

        const parentLi = e.target.parentNode;
        if (parentLi.classList.contains('dropdown-link')) {
        focusDropdownLink(parentLi, 'true');
        }
    }
}));

lastDropDownLinks.forEach(link => link.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const parentLi = e.target.closest('.dropdown-link');
        focusDropdownLink(parentLi, 'true');
    }
}));

// ==================================  HEADER TRANSITIONS  ======================================
function toggleHeaderBackground() {
    window.scrollY === 0? 
    header.setAttribute('data-origin', ''):
    header.removeAttribute('data-origin');
}

let lastScrollPos = 0;
function toggleHeaderPosition() {
    const currentScrollPos = window.scrollY;
    
    currentScrollPos > lastScrollPos?
    header.setAttribute('data-hide', ''):
    header.removeAttribute('data-hide');

    lastScrollPos = currentScrollPos;
}

window.addEventListener('scroll', toggleHeaderBackground);
window.addEventListener('scroll', toggleHeaderPosition);

// ========================= INITIALIZE ================================
(function init() {
    if (document.documentElement.clientWidth <= 900) {
        toggleNavFocus(false);
        mobileScreen = true;
    } else {
        nav.setAttribute('data-display', 'true');
        btnDropdownArrows.forEach(btn => btn.style.display = 'none');
        btnToggleNav.setAttribute('aria-label', 'close navigation links');
        btnNavBars.forEach(bar => bar.setAttribute('data-bar-open', ''));

        displayNav = true;
    }
})();

window.onload = () => {
    const main = document.querySelector('main');
    main.classList.add('main-loaded');
}
