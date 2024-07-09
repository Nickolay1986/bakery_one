import { textContent } from "./modules/module-content.js";
(function () {
    const sectionClass = 'offers'
    const blockClass = 'content';
    // Функция для установки контента на основе выбранного языка
    function setContentByLanguage() {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        let url;

        if (selectedLanguage === 'ru') {
            url = '../text/offers.txt';
        } else {
            url = '../text/offers_kz.txt';
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