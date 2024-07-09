import { textContent } from "./modules/module-content.js";
import { textReader } from "./modules/module-textReader.js";
import { createElWithClass } from "./modules/module-createElWithClass.js";

(function () {
    const sectionClass = 'intro'
    const blockClass = 'content';
    // Функция для установки контента на основе выбранного языка
    function setContentByLanguage() {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        let url;

        if (selectedLanguage === 'ru') {
            url = './assets/text/index_text.txt';
        } else {
            url = './assets/text/index_text_kz.txt';
        }

        textContent(url, blockClass, sectionClass);
    }

    // Устанавливаем контент при загрузке страницы
    setContentByLanguage();

    // Обработчик события languageChanged
    window.addEventListener('languageChanged', function(event) {
        setContentByLanguage(); // Обновляем контент при изменении языка
    });
})();
(function () {
    const main = document.querySelector('.main');
    const location = createElWithClass('section', 'location');
    const wrapper = createElWithClass('div', 'wrapper');
    const locationContent = createElWithClass('div', 'location__content');
    const locTitle = createElWithClass('h2', 'location__title');
    const mapCont = createElWithClass('div', 'map__container');
    const ymapsText = createElWithClass('div', 'ymaps__text');
    const ymapsBlock = createElWithClass('div', 'ymaps__block');
    ymapsBlock.id = 'ymap';
    mapCont.appendChild(ymapsText);
    mapCont.appendChild(ymapsBlock);
    locationContent.appendChild(locTitle);
    locationContent.appendChild(mapCont);
    wrapper.appendChild(locationContent);
    location.appendChild(wrapper);
    main.append(location);

    
})();

(function () {
    const section = 'location'
    const blockClass = 'ymaps__text'
    const block = 'div';
    // Функция для установки контента на основе выбранного языка
    function setContentByLanguage() {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        let url;
        const vipeText = document.querySelector('.' + blockClass);
        vipeText.innerHTML = '';
        if (selectedLanguage === 'ru') {
            url = './assets/text/location.txt';
        } else {
            url = './assets/text/location_kz.txt';
        }

        textReader(url, block, blockClass, section).then(divElement => {
            const locContent = document.querySelector('.' + blockClass);
            if (locContent) {
                // Если контент уже существует, заменяем его новым блоком
                locContent.replaceWith(divElement);
            } else {
                // Если контент еще не существует, добавляем его в конец страницы
                document.body.appendChild(divElement);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    // Устанавливаем контент при загрузке страницы
    setContentByLanguage();
 
    // Обработчик события languageChanged
    window.addEventListener('languageChanged', function(event) {
        setContentByLanguage(); // Обновляем контент при изменении языка
    });
})();