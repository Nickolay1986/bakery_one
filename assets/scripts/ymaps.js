import { textContent } from "./modules/module-content.js";

function init() {
    const center = [42.894779247002795, 71.3444179450015];
    let map = new ymaps.Map('ymap', {
        center: center,
        zoom: 17
    });

    let placemark = new ymaps.Placemark(center, {
        balloonContentHeader: 'Настоящая Пекарня<br><br> У нас всегда самая свежая выпечка!',
        balloonContentBody: 'Адрес: мкр."Каратау" дом 30 <br> тлф: +777222773',
        // balloonContentFooter: 'Всегда свежая выпечка',
    }, {
        iconLayout: 'default#image',
        iconImageHref: '../assets/img/placemark.png',
        iconImageSize: [80, 80],
        iconImageOffset: [-80, -65]
    });

    let placemarkBakery = new ymaps.Placemark(center, {
        balloonContent: `
        
        <div class="balloon">
            <div class="balloon__header">
                <div class="balloon_logo">
                    <img src="./assets/img/favicon.png" alt="logo" class="header__logo-pic">
                </div>
                <div class="balloon_title">Настоящая пекарня</div>
            </div>
            <div class="balloon__address">Адрес: г.Тараз мкр."Каратау" дом 30</div>
            <div class="balloon__contacts">
                <a href="tel:+77008008101">тлф: +77008008101</a>
            </div>
        </div>
        
        `
    }, {
        iconLayout: 'default#image',
        iconImageHref: '../assets/img/placemark.png',
        iconImageSize: [80, 80],
        iconImageOffset: [-80, -65]
    });

    let placemarkBakery2 = new ymaps.Placemark(center, {
        balloonContent: `
        
        <div class="balloon">
            <div class="balloon__header">
                <div class="balloon_logo">
                    <img src="./assets/img/favicon.png" alt="logo" class="header__logo-pic">
                </div>
                <div class="balloon_title">Настоящая пекарня</div>
            </div>
            <div class="balloon__address">Адрес: г.Тараз мкр."Каратау" дом 30</div>
            <div class="balloon__contacts">
                тлф: <a href="tel:+77008008101">+77008008101</a>
            </div>
        </div>
        
        `
    }, {
        iconLayout: 'default#image',
        iconImageHref: '../assets/img/placemark_bakery002.png',
        iconImageSize: [80, 80],
        iconImageOffset: [-45, -65]
    });

    map.controls.remove('geolocationControl'); //убрать геолокацию
    map.controls.remove('searchControl');      //убрать поиск 
    map.controls.remove('trafficControl');     //убрать контроль трафика 
    map.controls.remove('typeSelector');       //убрать тип 
    map.controls.remove('zoomControl');        //убрать зум
    map.controls.remove('rulerControl');       //убрать уонтроль правил 
    map.behaviors.disable(['scrollZoom']);     //откл скрол карты 
    map.behaviors.disable(['drag']);
    // map.geoObjects.add(placemark);
    map.geoObjects.add(placemarkBakery2);
    // placemarkBakery2.balloon.open();

    // Функция, которая включает scrollZoom и drag при клике на карту
    function enableBehaviors() {
        map.behaviors.enable(['scrollZoom', 'drag']);
    }

    // Функция, которая выключает scrollZoom и drag при клике вне карты
    function disableBehaviors() {
        map.behaviors.disable(['scrollZoom', 'drag']);
    }

    // Обработчик события клика на карту
    map.events.add('click', function (event) {
        enableBehaviors();

        // Обработчик события клика вне области карты
        const handleOutsideClick = function(event) {
            if (!event.target.closest('#ymap')) {
                disableBehaviors();
                document.removeEventListener('click', handleOutsideClick);
            }
        };

        document.addEventListener('click', handleOutsideClick);
    });
}

ymaps.ready(init);

