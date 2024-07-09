(function () {
    // Получаем элемент <select> по его идентификатору
    const languageSelect = document.getElementById('languageSelect');
    // Добавляем обработчик события изменения выбранной опции
    languageSelect.addEventListener('change', function() {
        // Сохраняем выбранный язык в локальное хранилище
        localStorage.setItem('selectedLanguage', languageSelect.value);
    });
    // Проверяем, есть ли сохраненное значение выбранного языка в локальном хранилище
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    // Если есть сохраненное значение, устанавливаем его как выбранную опцию
    if (selectedLanguage) {
        languageSelect.value = selectedLanguage;
    }
    const scriptUrl = new URL(document.currentScript.src);
    const jsonUrl = new URL('../data/nav.json', scriptUrl).href;
    const headerWrapper = document.querySelector('.header__wrapper')
    const nav = document.createElement('nav');
    nav.classList.add('header__nav');
    headerWrapper.appendChild(nav)
    const headerList = document.createElement('ul');
    headerList.classList.add('header__list');
    nav.appendChild(headerList);
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            languageSelect.addEventListener('change', function() {
                const selectedLanguage = languageSelect.value;
                headerList.innerHTML = ''; // Очищаем список перед добавлением новых элементов

                data.forEach(obj => {
                    const headerItem = document.createElement('li');
                    headerItem.classList.add('header__item');
                    headerList.appendChild(headerItem);
                    let url = '';
                    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                        url = './assets/html/' + obj.url;
                    } else {
                        url = './' + obj.url;
                    }
                    const headerLink = document.createElement('a');
                    headerLink.classList.add('header__link');
                    headerLink.href = url;

                    if (selectedLanguage === 'kz') {
                        headerLink.textContent = obj.nameKZ;
                    } else {
                        headerLink.textContent = obj.name;
                    }

                    headerItem.appendChild(headerLink);
                });
            });
            
            // Вызываем событие change, чтобы установить начальное значение
            languageSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => {
            console.error('Ошибка при загрузке файла products.json:', error);
        });
})();    