import { createElWithClass } from "./module-createElWithClass.js";
const existingHeader = document.querySelector('header');
if (existingHeader) {
    existingHeader.remove();
}
const header = createElWithClass('header', 'header');
const wrapper = createElWithClass('div', 'wrapper');
const headerWrapper = createElWithClass('div', 'header__wrapper');
const logoLangs = createElWithClass('div', 'logo__langs');
const headerLogo = createElWithClass('div', 'header__logo');
const logoLink = createElWithClass('a', 'header__logo-link');
logoLink.href = '/';
const logoImg = createElWithClass('img', 'header__logo-pic');
let logoUrl;
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    logoUrl = './assets/img/logo.png';
} else {
    logoUrl = '../img/logo.png';
}
logoImg.src = logoUrl;
logoImg.alt = 'logo';
const burgerBtn = createElWithClass('div', 'header__burger-btn');
for (let i = 0; i < 3; i += 1){
    const span = createElWithClass('span')
    burgerBtn.appendChild(span)
}

// Добавляем элементы в дерево DOM
logoLink.appendChild(logoImg);
headerLogo.appendChild(logoLink);
logoLangs.appendChild(headerLogo);
headerWrapper.appendChild(logoLangs);
headerWrapper.appendChild(burgerBtn);
wrapper.appendChild(headerWrapper);
header.appendChild(wrapper);

document.body.insertBefore(header, document.body.firstChild);