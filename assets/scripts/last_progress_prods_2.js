(function() {
    const scriptUrl = new URL(document.currentScript.src);
    const jsonUrl = new URL('../data/products.json', scriptUrl).href;
    const cyrillicToLatinMap = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'yo',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'y',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'ts',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sch',
        'ъ': '',
        'ы': 'y',
        'ь': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya'
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
        }
    }
    fetchData(jsonUrl).then(data => {
        const state = {
            checkedTypes: [], // Выбранные типы
            sortOrder: '', // Порядок сортировки (asc или desc)
        };
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        // const types = [...new Set(data.map(obj => obj.type))];
        const types = [...new Set(data.map(obj => {
            if (selectedLanguage === 'kz') {
                return obj.typeKZ;
            } else {
                return obj.type;
            }
        }))];
        const filterDiv = document.querySelector('.cards__filter');
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

        function createFilterElement(type, handleFilterChange) {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = type;
            checkbox.addEventListener('change', handleFilterChange);
            const span = document.createElement('span');
            span.classList.add('span__check')
            span.textContent = type;
            label.appendChild(checkbox);
            label.appendChild(span);
            return label;
        }
        types.forEach(type => {
            const filterElement = createFilterElement(type, handleFilterChange);
            filterDiv.appendChild(filterElement);
        });
        // Определение функции filterAndSortCards
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
        const cardsDiv = document.querySelector('.cards');
        cardsDiv.innerHTML = '';
        /*модальное окно*/
        function createModal() {
            const sectionElement = document.createElement('section');
            sectionElement.classList.add('modal');
          
            const modalWrapperDiv = document.createElement('div');
            modalWrapperDiv.classList.add('modal__wrapper');
          
            const modalPicDiv = document.createElement('div');
            modalPicDiv.classList.add('modal__pic');
          
            const img = document.createElement('img');
            img.classList.add('img');
            modalPicDiv.appendChild(img);
          
            const modalContentDiv = document.createElement('div');
            modalContentDiv.classList.add('modal__content');
          
            const modalTextDiv = document.createElement('div');
            modalTextDiv.classList.add('modal__text');
          
            const modalTitleH3 = document.createElement('h3');
            modalTitleH3.classList.add('modal__title');
            modalTextDiv.appendChild(modalTitleH3);
          
            const modalDescriptionP = document.createElement('p');
            modalDescriptionP.classList.add('modal__description');
            modalTextDiv.appendChild(modalDescriptionP);
          
            const modalFooterDiv = document.createElement('div');
            modalFooterDiv.classList.add('modal__footer');
          
            const modalPriceP = document.createElement('p');
            modalPriceP.classList.add('modal__price');
            modalFooterDiv.appendChild(modalPriceP);
          
            const modalCostP = document.createElement('p');
            modalCostP.classList.add('modal__cost');
            modalFooterDiv.appendChild(modalCostP);
          
            const modalCloseBtn = document.createElement('div');
            modalCloseBtn.classList.add('modal-close-btn');
          
            modalContentDiv.appendChild(modalTextDiv);
            modalContentDiv.appendChild(modalFooterDiv);
            modalContentDiv.appendChild(modalCloseBtn);
          
            modalWrapperDiv.appendChild(modalPicDiv);
            modalWrapperDiv.appendChild(modalContentDiv);
          
            sectionElement.appendChild(modalWrapperDiv);
          
            return sectionElement;
        }
        const main = document.querySelector('.main');
        main.append(createModal());

        /* функция создания карточки продукта */
        function createCard(obj, selectedLanguage) {
            const {
                src,
                name,
                description,
                nameKZ,
                descriptionKZ,
                price
            } = obj;
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            const cardPicDiv = document.createElement('div');
            cardPicDiv.classList.add('card__pic');
            const img = document.createElement('img');
            img.src = src;
            img.alt = convertToLatin(name);
            img.classList.add('img');
            const titleP = document.createElement('p');
            titleP.classList.add('card__title');
            titleP.textContent = selectedLanguage === 'kz' ? nameKZ : name;
            const descriptionP = document.createElement('p');
            descriptionP.classList.add('card__description');
            descriptionP.textContent = selectedLanguage === 'kz' ? descriptionKZ : description;
            const footerDiv = document.createElement('div');
            footerDiv.classList.add('card__footer');
            const priceP = document.createElement('p');
            priceP.classList.add('card__price');
            priceP.textContent = selectedLanguage === 'kz' ? 'Бағасы: ' : 'Цена: ';
            const costP = document.createElement('p');
            costP.classList.add('card__cost');
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
        };

        function sortCardsByPrice(cards) {
            const sortedCards = [...cards];
            sortedCards.sort((a, b) => {
                const priceA = a.price;
                const priceB = b.price;
                return state.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            });
            return sortedCards;
        };
        const sortByPrice = document.querySelector('.sort__price select');
        const sortByPriceOptions = sortByPrice.options;
        sortByPrice.addEventListener('change', () => {
            state.sortOrder = sortByPrice.value;
            filterAndSortCards();
        });

        function updateSort(options, selectedLanguage) {
            if (selectedLanguage === 'ru') {
                options[0].textContent = 'Сортировка по цене: ';
                options[1].textContent = 'сначала дешевле';
                options[2].textContent = 'сначала дороже';
            }
            if (selectedLanguage === 'kz') {
                options[0].textContent = 'бағасы бойынша сұрыптау';
                options[1].textContent = 'алдымен арзанырақ';
                options[2].textContent = 'басында қымбатырақ';
            }
        }
        updateSort(sortByPriceOptions, selectedLanguage)
        const cards = data.map(obj => createCard(obj, selectedLanguage));
        renderCards(cards);

        function updateTypes(selectedLanguage) {
            const types = [...new Set(data.map(obj => {
                if (selectedLanguage === 'kz') {
                    return obj.typeKZ;
                } else {
                    return obj.type;
                }
            }))];
            // Очистка и пересоздание фильтров
            filterDiv.innerHTML = '';
            types.forEach(type => {
                const filterElement = createFilterElement(type, handleFilterChange);
                filterDiv.appendChild(filterElement);
            });
            // Перефильтровка и сортировка карточек
            filterAndSortCards();
        }
        window.addEventListener('languageChanged', function(event) {
            const selectedLanguage = event.detail; // Получите выбранный язык из деталей события
            updateSort(sortByPriceOptions, selectedLanguage)
            updateTypes(selectedLanguage);
            const cards = data.map(obj => createCard(obj, selectedLanguage));
            renderCards(cards);
        });
    }).catch(error => {
        console.error('Ошибка при загрузке файла products.json:', error);
    });
}());