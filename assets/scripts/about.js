import { textContent } from "./modules/module-content.js";
(function () {
    const sectionClass = 'about'
    const blockClass = 'content';
    // Функция для установки контента на основе выбранного языка
    function setContentByLanguage() {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        let url;

        if (selectedLanguage === 'ru') {
            url = '../text/about.txt';
        } else {
            url = '../text/about_kz.txt';
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