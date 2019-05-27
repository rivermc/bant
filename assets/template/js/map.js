var Map;
var myPlacemark;
var myMap;

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


function init_shipmap() {
    myMap = new ymaps.Map("shipping_map", {
        center: [59.876228064261454,30.323988999999944],
        zoom: 9,
        controls: ['typeSelector', 'fullscreenControl'],
    });

    // Создаем многоугольник, используя вспомогательный класс Polygon.
    var myPolygon = new ymaps.Polygon([
            // Указываем координаты вершин многоугольника.
            [[60.150205609400416,29.93260106054682],[60.09744386732256,29.947707261718698],[60.08921361350956,29.924361314453083],[60.07411945791292,29.94358738867183],[60.05489868512722,29.940840806640583],[59.97308498458923,29.777419175781194],[59.930378823550015,29.642836656249933],[59.848255752198,29.590651597656194],[59.76315801693379,29.60575779882807],[59.675063978343275,29.74583348242182],[59.63962209383271,30.04383763281244],[59.64101267974218,30.53410252539058],[59.69381211771327,30.738722886718705],[59.89727805602149,30.994155015624944],[60.10430083692445,30.70851048437495],[60.17494816229888,30.100716511320975],[60.15304805701637,29.948281208586618]]
        ],
        // Описываем свойства геообъекта.
        {
            // Содержимое балуна.
            balloonContent: "Рыбные места"
        }, {
            // Описываем опции геообъекта.
            // Фоновое изображение.
            // Убираем видимость обводки.
            stroke: false,
            fillColor: '#ff005d33'
        }
    );
    var myPolygon2 = new ymaps.Polygon([
            // Указываем координаты вершин многоугольника.
            [[59.990289594847916,30.378920640624955],[59.98684939049458,30.267684068359333],[59.968266085867924,30.201766099609316],[59.91107406740828,30.196272935546823],[59.88830756436384,30.211379136718698],[59.87174027078696,30.258071031249948],[59.86000009087763,30.361067857421833],[59.86345351663038,30.468184556640562],[59.902107314181656,30.49702366796869],[59.942094071704645,30.484664048828062],[59.97583832514271,30.498396958984312],[59.9834088273174,30.453078355468687],[59.9834088273174,30.39265355078121]]
        ],
        // Описываем свойства геообъекта.
        {
            // Содержимое балуна.
            balloonContent: "Рыбные места"
        }, {
            // Описываем опции геообъекта.
            // Фоновое изображение.
            // Убираем видимость обводки.
            stroke: false,
            fillColor: '#19c10a33'
        }
    );

    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myPolygon);
    myMap.geoObjects.add(myPolygon2);
}

if (typeof ymaps != 'undefined') {
    var adrs =  $('.contacs_address');
    ymaps.ready(function() {
        if ($('#map').length) {
            initShip([59.91502533444242,30.29787776978886], adrs.first().data('address'), adrs.last().data('address'));
        }
        else if ($('#shipping_map').length) {
            init_shipmap();
        }
    });
}
