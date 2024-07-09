import { textContent } from "./modules/module-content.js";
(function () {
    const sectionClass = 'buy'
    const blockClass = 'content';
    // Функция для установки контента на основе выбранного языка
    function setContentByLanguage() {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        let url;

        if (selectedLanguage === 'ru') {
            url = '../text/buy.txt';
        } else {
            url = '../text/buy_kz.txt';
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