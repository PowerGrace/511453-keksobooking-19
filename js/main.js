'use strict';

var NUMBER_OF_OBJECTS = 8;
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// включить notice
document.querySelector('.ad-form').classList.remove('ad-form--disabled');


var userPinPattern = document.querySelector('#pin').content.querySelector('.map__pin');

var userPinList = document.querySelector('.map__pins');

var userPinImg = userPinPattern.querySelector('img');

var cardTemplate = document.querySelector('#card');

var filtersContanier = document.querySelector('.map__filters-container');

// var card = cardTemplate.querySelector('.map__card');

// случайное число

var getRandomBetween = function (max, min) {
  return Math.round(Math.random() * (max - min)) + min;
};

// Случайный элемент массива

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// случайная длина массива

var getRandomLength = function (array) {
  var lengthArray = Math.floor(Math.random() * array.length);
  var newArray = [];

  for (var i = 0; i < lengthArray; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};

// функция для выбора типа жилья

function getAdType(ad) {
  switch (ad.offer.type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return '';
  }
}

var createSimilarAds = function () {
  var similarAds = [];

  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {

    var positionX = getRandomBetween(0, MAP_WIDTH);
    var positionY = getRandomBetween(630, 130);

    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'Заголовок ' + (i + 1),
        address: positionX + ', ' + positionY,
        price: getRandomBetween(100, 100000),
        type: getRandomItem(TYPE_OF_HOUSING),
        rooms: getRandomBetween(1, 10),
        guests: getRandomBetween(1, 20),
        checkin: getRandomItem(CHECKIN_TIME),
        checkout: getRandomItem(CHECKOUT_TIME),
        features: getRandomLength(FEATURES),
        description: 'Панорамный вид из окна',
        photos: getRandomLength(PHOTOS),
      },

      location: {
        x: positionX,
        y: positionY,
      }
    };
  }
  return similarAds;
};

var ads = createSimilarAds();

for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
  userPinPattern.style.left = ads[i].location.x - PIN_WIDTH / 2 + 'px';
  userPinPattern.style.top = ads[i].location.y + 'px';

  userPinImg.src = ads[i].author.avatar;
  userPinImg.alt = 'Заголовок объявления';

  var userPinElement = userPinPattern.cloneNode(true);
  userPinList.appendChild(userPinElement);
}

function createPhotos(photos, template) {
  var fragment = new DocumentFragment();
  photos.forEach(function (src) {
    var img = template.cloneNode(true);
    img.src = src;
    fragment.appendChild(img);
  });
  return fragment;
}

function createFeatures(features) {
  var fragment = new DocumentFragment();
  features.forEach(function (feature) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + feature);
    fragment.appendChild(li);
  });
  return fragment;
}

var createCard = function (template, cardData) {

  var card = template.content.cloneNode(true);

  card.querySelector('.popup__title').textContent = cardData.title;
  card.querySelector('.popup__text--address').textContent = cardData.offer.address;
  card.querySelector('.popup__type').textContent = getAdType(cardData);
  card.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
  card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  card.querySelector('.popup__description').textContent = cardData.offer.description;
  card.querySelector('.popup__avatar').src = cardData.author.avatar;

  var popupFeatures = card.querySelector('.popup__features');
  popupFeatures.innerText = '';
  popupFeatures.appendChild(createFeatures(cardData.offer.features));

  var popupPhotos = card.querySelector('.popup__photos');
  var photoTemplate = popupPhotos.querySelector('img').cloneNode(true);
  popupPhotos.innerText = '';
  popupPhotos.appendChild(createPhotos(cardData.offer.photos, photoTemplate));

  return card;

};

var showCard = function () {
  var card = createCard(cardTemplate, ads[0]);

  map.appendChild(card);
  map.insertBefore(card, filtersContanier);

};

showCard();


