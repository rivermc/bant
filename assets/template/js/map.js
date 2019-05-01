var Map;
var myPlacemark;

function initShip(coords, address, address2) {

    Map = new ymaps.Map("map", {
        center: coords,
        controls: ['typeSelector', 'fullscreenControl'],
        zoom: 10
    });
    cityGeocode(address, 0);
    cityGeocode(address2, 1);
    
}

function addPlacemark(coords, count, address) {
    myPlacemark = new ymaps.Placemark(coords, {
        hintContent: address,
        balloonContent: address
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '/assets/template/images/elements/map-icon-' + count + '.svg',
        // Размеры метки.
        iconImageSize: [25, 33],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-12, -33]
    });

    Map.geoObjects.add(myPlacemark);
    
}

function cityGeocode(address, count) {
    ymaps.geocode(address, { //геокодирование адреса
        results: 1
    }).then(function (res) {
        // Выбираем первый результат геокодирования.
        var firstGeoObject = res.geoObjects.get(0);
        // Координаты геообъекта.
        var coords = firstGeoObject.geometry.getCoordinates();
        //routeCreate(coords); // вызов функции построения маршрута
        addPlacemark(coords, count, address);
    });    
}

if (typeof ymaps != 'undefined') {
    var adrs =  $('.contacs_address');
    ymaps.ready(function(){initShip([59.91502533444242,30.29787776978886], adrs.first().data('address'), adrs.last().data('address'))});
}

