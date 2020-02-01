'use strict';

var numberOfObjects = 8;
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay

var getRandomBetween = function (max, min) {
  return Math.round(Math.random() * (max - min)) + min;
};

var createSimilarAds = function () {
  var similarAds = [];
  for (var i = 0; i < numberOfObjects; i++) {
    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      }, // где {{xx}} это число от 1 до 8 с ведущим нулём.
      // Например, 01, 02 и т. д. Адреса изображений не повторяются

      offer: {
        title: '', // строка, заголовок предложения
        address: '600, 350', // строка, адрес предложения. Для простоты пусть пока представляет собой
        // запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        price: Math.round(getRandomBetween(1000000, 0) / 1000) * 1000, // число, стоимость
        type: '', // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        rooms: '', // число, количество комнат
        guests: '', // число, количество гостей, которое можно разместить
        checkin: '', // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        checkout: '', // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        // массив строк случайной длины из ниже предложенных:
        description: '', // строка с описанием
        photos: [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ], // массив строк случайной длины, содержащий адреса фотографий
      },

      location: {
        x: getRandomBetween(0, MAP_WIDTH), // случайное число, координата x метки на карте
        y: getRandomBetween(630, 130), // случайное число, координата y метки на карте
      }
    };
  }
  return similarAds;
};

var ads = createSimilarAds();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var userPinPattern = document.querySelector('#pin').content.querySelector('.map__pin');
var userPinImg = userPinPattern.querySelector('img');

for (var i = 0; i < 8; i++) {
  userPinPattern.style.left = ads[i].location.x - PIN_WIDTH / 2 + 'px';
  userPinPattern.style.top = ads[i].location.y + 'px';

  userPinImg.src = ads[i].author.avatar;
  userPinImg.alt = 'Заголовок объявления';

  var userPinList = document.querySelector('.map__pins');
  var userPinElement = userPinPattern.cloneNode(true);
  userPinList.appendChild(userPinElement);
}
// включить notice
document.querySelector('.ad-form').classList.remove('ad-form--disabled');
