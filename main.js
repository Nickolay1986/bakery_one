(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuClose = document.querySelector('.header__nav-close');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header__nav_active')
    });
    menuClose.addEventListener('click', () => {
        menu.classList.remove('header__nav_active')
    })
}());
