import { createElWithClass } from "./modules/module-createElWithClass.js";
(function () {
    // const scriptUrl = new URL(document.currentScript.src);
    // const jsonUrl = new URL('../data/products.json', scriptUrl).href;
    const jsonUrl = '../data/products.json';
    const cyrillicToLatinMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    function convertToLatin(text) {
        const lowercaseText = text.toLowerCase();
        let latinText = '';
        for (let i = 0; i < lowercaseText.length; i++) {
            const char = lowercaseText[i];
            const latinChar = cyrillicToLatinMap[char] || char;
            latinText += latinChar;
        }
        return latinText;
    }

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            return null;
        }
    }

    // Основная функция инициализации приложения
    async function initApp() {
        const state = {
            checkedTypes: [], // Выбранные типы
            sortOrder: '', // Порядок сортировки (asc или desc)
        };

        const data = await fetchData(jsonUrl);
        if (!data) return;

        const selectedLanguage = localStorage.getItem('selectedLanguage');
        const types = [...new Set(data.map(obj => selectedLanguage === 'kz' ? obj.typeKZ : obj.type))];
        const filterDiv = document.querySelector('.checkbox__labels');
        if (!filterDiv) {
            console.error('Не удалось найти элемент .cards__filter');
            return;
        }

        // Определение функции handleFilterChange
        function handleFilterChange() {
            state.checkedTypes = Array.from(filterDiv.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
            filterAndSortCards();
        }

        filterDiv.innerHTML = '';
        types.forEach(type => {
            const filterElement = createFilterElement(type, handleFilterChange);
            filterDiv.appendChild(filterElement);
        });

        const cardsDiv = document.querySelector('.cards');
        cardsDiv.innerHTML = '';

        const sortByPrice = document.querySelector('.sort__price select');
        const sortByPriceOptions = sortByPrice.options;
        sortByPrice.addEventListener('change', () => {
            state.sortOrder = sortByPrice.value;
            filterAndSortCards();
        });

        function updateSort(options, selectedLanguage) {
            options[0].textContent = selectedLanguage === 'kz' ? 'бағасы бойынша сұрыптау' : 'Сортировка по цене: ';
            options[1].textContent = selectedLanguage === 'kz' ? 'алдымен арзанырақ' : 'сначала дешевле';
            options[2].textContent = selectedLanguage === 'kz' ? 'басында қымбатырақ' : 'сначала дороже';
        }

        updateSort(sortByPriceOptions, selectedLanguage);

        const modal = createModal();
        document.body.appendChild(modal);

        function createModal() {
            const sectionElement = createElWithClass('section', 'modal')
          
            const modalWrapperDiv = createElWithClass('div', 'modal__wrapper');
          
            const modalPicDiv = createElWithClass('div' ,'modal__pic');
          
            const img = createElWithClass('img', 'img');
            modalPicDiv.appendChild(img);
          
            const modalContentDiv = createElWithClass('div', 'modal__content');
          
            const modalTextDiv = createElWithClass('div', 'modal__text');
          
            const modalTitleH3 = createElWithClass('h3', 'modal__title');
            modalTextDiv.appendChild(modalTitleH3);
          
            const modalDescriptionP = createElWithClass('p', 'modal__description');
            modalTextDiv.appendChild(modalDescriptionP);
          
            const modalFooterDiv = createElWithClass('div', 'modal__footer');
          
            const modalPriceP = createElWithClass('p', 'modal__price');
            modalFooterDiv.appendChild(modalPriceP);
          
            const modalCostP = createElWithClass('p', 'modal__cost');
            modalFooterDiv.appendChild(modalCostP);
          
            const modalCloseBtn = createElWithClass('div', 'modal-close-btn');
          
            modalContentDiv.appendChild(modalTextDiv);
            modalContentDiv.appendChild(modalFooterDiv);
            modalContentDiv.appendChild(modalCloseBtn);
          
            modalWrapperDiv.appendChild(modalPicDiv);
            modalWrapperDiv.appendChild(modalContentDiv);
          
            sectionElement.appendChild(modalWrapperDiv);
          
            return sectionElement;
        }

        function createFilterElement(type, handleFilterChange) {
            const label = createElWithClass('label', 'checkbox__label');
            const checkbox = createElWithClass('input', 'checkbox');
            checkbox.type = 'checkbox';
            checkbox.value = type;
            checkbox.addEventListener('change', handleFilterChange);
            const span = createElWithClass('span', 'span__check');
            span.textContent = type;
            label.appendChild(checkbox);
            label.appendChild(span);
            return label;
        }

        function filterAndSortCards() {
            const selectedLanguage = localStorage.getItem('selectedLanguage');
            let filteredData = data;
            if (state.checkedTypes.length > 0) {
                const key = selectedLanguage === 'kz' ? 'typeKZ' : 'type';
                filteredData = data.filter(obj => state.checkedTypes.includes(obj[key]));
            }
            const sortedData = state.sortOrder === 'asc' || state.sortOrder === 'desc' ? sortCardsByPrice(filteredData) : filteredData;
            const cards = sortedData.map(obj => createCard(obj, selectedLanguage));
            renderCards(cards);
        }

        function createCard(obj, selectedLanguage) {
            const {
                src,
                name,
                description,
                nameKZ,
                descriptionKZ,
                price
            } = obj;
            const cardDiv = createElWithClass('div', 'card');
            const cardPicDiv = createElWithClass('div', 'card__pic');
            const img = createElWithClass('img', 'img');
            img.src = src;
            img.alt = convertToLatin(name);
            const titleP = createElWithClass('h3', 'card__title');
            titleP.textContent = selectedLanguage === 'kz' ? nameKZ : name;
            const descriptionP = createElWithClass('p', 'card__description');
            descriptionP.textContent = selectedLanguage === 'kz' ? descriptionKZ : description;
            const footerDiv = createElWithClass('div', 'card__footer');
            const priceP = createElWithClass('p', 'card__price');
            priceP.textContent = selectedLanguage === 'kz' ? 'Бағасы: ' : 'Цена: ';
            const costP = createElWithClass('p', 'card__cost');
            costP.textContent = price + 'тг.';
            cardPicDiv.appendChild(img);
            footerDiv.appendChild(priceP);
            footerDiv.appendChild(costP);
            cardDiv.appendChild(cardPicDiv);
            cardDiv.appendChild(titleP);
            cardDiv.appendChild(descriptionP);
            cardDiv.appendChild(footerDiv);
            cardDiv.addEventListener('click', () => {
                const body = document.querySelector('body');
                body.style.overflow = 'hidden';
                const modal = document.querySelector('.modal')
                const modalTitle = document.querySelector('.modal__title');
                const modalDescription = document.querySelector('.modal__description');
                const modalPriceP = document.querySelector('.modal__price');
                const modalCost = document.querySelector('.modal__cost');
                const modalPic = document.querySelector('.modal__pic img');
                modalTitle.textContent = selectedLanguage === 'kz' ? nameKZ : name;
                modalDescription.textContent = selectedLanguage === 'kz' ? descriptionKZ : description;
                modalPriceP.textContent = selectedLanguage === 'kz' ? 'Бағасы' : 'Цена';
                modalCost.textContent = price + 'тг.';
                modalPic.src = src;
                modalPic.alt = convertToLatin(name);
                modal.classList.add('modal-open');
                modal.style.opacity = 1;
                const closeBtn = document.querySelector('.modal-close-btn');
                closeBtn.textContent = selectedLanguage === 'kz' ? 'ЖАБЫҚ' : 'ЗАКРЫТЬ';

                // const closeModal = () => {
                //     modal.classList.remove('modal-open');
                //     closeBtn.removeEventListener('click', closeModal);
                // };
                
                // closeBtn.addEventListener('click', closeModal);

                const closeModal = event => {
                    const target = event.target;

                    if (target === modal || target === closeBtn) {                        
                        modal.style.opacity = 0;
                        setTimeout(() => {
                           modal.classList.remove('modal-open');                            
                        }, 300)
                        body.style.overflow = '';
                        modal.removeEventListener('click', closeModal);
                    }
                    // 
                }
                modal.addEventListener('click', closeModal);
            });
            return cardDiv;
        }

        function renderCards(cards) {
            cardsDiv.innerHTML = '';
            cards.forEach(card => cardsDiv.appendChild(card));
        }

        function sortCardsByPrice(cards) {
            const sortedCards = [...cards];
            sortedCards.sort((a, b) => {
                const priceA = a.price;
                const priceB = b.price;
                return state.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            });
            return sortedCards;
        }

        // Загрузка карточек при запуске приложения
        const cards = data.map(obj => createCard(obj, selectedLanguage));
        renderCards(cards);

        window.addEventListener('languageChanged', function(event) {
            const selectedLanguage = event.detail;
            updateSort(sortByPriceOptions, selectedLanguage);
            const types = [...new Set(data.map(obj => selectedLanguage === 'kz' ? obj.typeKZ : obj.type))];
            filterDiv.innerHTML = '';
            types.forEach(type => {
                const filterElement = createFilterElement(type, handleFilterChange);
                filterDiv.appendChild(filterElement);
            });
            filterAndSortCards();
            const cards = data.map(obj => createCard(obj, selectedLanguage));
            renderCards(cards);
        });
    }

    // Запуск инициализации приложения
    initApp().catch(error => {
        console.error('Ошибка при загрузке файла products.json:', error);
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const filterMenu = document.querySelector('.filter__menu');
    const filterAndSort = document.querySelector('.filter_sort');

    filterMenu.addEventListener('mouseover', function() {
        filterAndSort.style.display = 'block';
    });

    filterMenu.addEventListener('mouseout', function() {
        filterAndSort.style.display = 'none';
    });
});