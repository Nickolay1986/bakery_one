import { createElWithClass } from "./modules/module-createElWithClass.js";

(function () {
    const langs = ['ru', 'kz'];

    function createLanguageSelect(languages) {
        const selectElement = document.createElement('select');
        selectElement.classList.add('select__element');
        selectElement.id = 'languageSelect';
    
        languages.forEach(lang => {
            const option = document.createElement('option');
            option.classList.add('select__lang--option');
            option.value = lang;
            option.textContent = lang;
            selectElement.appendChild(option);
        });
    
        return selectElement;
    }

    const headerWrapper = document.querySelector('.header__wrapper');
    const langOptions = createLanguageSelect(langs);
    const logoLangs = document.querySelector('.logo__langs');
    logoLangs.append(langOptions);
    const languageSelect = document.getElementById('languageSelect');
    const scriptUrl = new URL(import.meta.url);
    const jsonUrl = new URL('../data/nav.json', scriptUrl).href;

    function createNavElement() {
        const nav = createElWithClass('nav', 'header__nav');
        headerWrapper.appendChild(nav);
        return nav;
    }

    function createListElement(parent) {
        const list = createElWithClass('ul', 'header__list');
        parent.appendChild(list);
        return list;
    }

    function createListItem(obj, selectedLanguage) {
        const listItem = createElWithClass('li', 'header__item');
        const path = window.location.pathname;
        let url = '';
        // Проверка путей, включая вариант для GitHub Pages
        const isRootPath = path === '/' || path.endsWith('/index.html') || path.endsWith('/bakery_one/') || path.endsWith('/bakery_one/index.html');
        
        if (isRootPath) {
            url = './assets/html/' + obj.url;
        } else {
            url = './' + obj.url;
        }
        
        const link = createElWithClass('a', 'header__link');
        link.href = url;

        if (selectedLanguage === 'kz') {
            link.textContent = obj.nameKZ;
        } else {
            link.textContent = obj.name;
        }
        listItem.appendChild(link);
        return listItem;
    }

    function updateListItems(list, data, selectedLanguage) {
        list.innerHTML = '';
        data.forEach(obj => {
            const listItem = createListItem(obj, selectedLanguage);
            list.appendChild(listItem);
        });
    }

    function handleLanguageChange(event) {
        const selectedLanguage = event.target.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        /*пользовательское событие*/
        const languageChangeEvent = new CustomEvent('languageChanged', { detail: selectedLanguage });
        window.dispatchEvent(languageChangeEvent);
        /*пользовательское событие*/

        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => updateListItems(headerList, data, selectedLanguage))
            .catch(error => {
                console.error('Ошибка при загрузке файла products.json:', error);
            });
    }
    
    const nav = createNavElement();
    const headerList = createListElement(nav);

    languageSelect.addEventListener('change', handleLanguageChange);

    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
        languageSelect.value = selectedLanguage;
    }
    languageSelect.dispatchEvent(new Event('change'));
})();

(function () {
    const body = document.querySelector('body');
    
    const burgerItem = document.querySelector('.header__burger-btn');
    const header = document.querySelector('.header');
    const menuClose = document.querySelector('.header__nav-close');
    burgerItem.addEventListener('click', () => {
        header.classList.toggle('open');
        if (body.style.overflow === 'hidden') {
            body.style.overflow = ''; // Убираем свойство, если оно есть
        } else {
            body.style.overflow = 'hidden'; // Добавляем свойство, если его нет
        }
    });
}());

(function () {
    const header = document.querySelector('.header');
    let prevScrollPos = window.pageYOffset;

    window.onscroll = () => {
        const currentScrollPos = window.pageYOffset;

        if (currentScrollPos > prevScrollPos) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        prevScrollPos = currentScrollPos;
    };
}());