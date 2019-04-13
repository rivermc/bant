var Map;
var myPlacemark;

function initShip(coords, address, address2) {

    Map = new ymaps.Map("map", {
        center: coords,
        controls: ['typeSelector', 'fullscreenControl'],
        zoom: 10
    });
    cityGeocode(address);
    cityGeocode(address2);
    
}

function addPlacemark(coords) {
    myPlacemark = new ymaps.Placemark(coords, {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '/assets/template/images/elements/map-icon.png',
        // Размеры метки.
        iconImageSize: [25, 33],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-12, -33]
    });

    Map.geoObjects.add(myPlacemark);
    
}

function cityGeocode(address) {
    ymaps.geocode(address, { //геокодирование адреса
        results: 1
    }).then(function (res) {
        // Выбираем первый результат геокодирования.
        var firstGeoObject = res.geoObjects.get(0);
        // Координаты геообъекта.
        coords = firstGeoObject.geometry.getCoordinates();
        //routeCreate(coords); // вызов функции построения маршрута
        addPlacemark(coords);
    });    
}
console.log(typeof ymaps != 'undefined');
if (typeof ymaps != 'undefined') {
    ymaps.ready(function(){initShip([59.91502533444242,30.29787776978886], $('.contacs_address').first().data('address'), $('.contacs_address').last().data('address'))});
}

