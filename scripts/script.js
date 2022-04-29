const initialCards = [
  //массив с данными начальных карточек
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//переменные для работы попапа c редактированием данных пользователя
const popupUser = document.querySelector("#edit_user");
const popupOpenButtonUser = document.querySelector(".user__edit-button");
const popupCloseButtonUser = popupUser.querySelector(".popup__close-button");
let userName = document.querySelector(".user__name");
let userStatus = document.querySelector(".user__status");
let newUserName = document.querySelector(".popup__input_name");
let newUserStatus = document.querySelector(".popup__input_status");
let userSubmit = popupUser.querySelector(".popup__form");

//переменные для работы попапа c добавлением карточки
const popupOpenButtonPlace = document.querySelector(".user__add-button");
const popupCard = document.querySelector("#add_card");
const popupCloseButtonPlace = popupCard.querySelector(".popup__close-button");
let cardContainer = document.querySelector(".photo-grid");
let cardTemplate = document.querySelector("#card-template").content;
let newPlaceTitle = document.querySelector(".popup__input_title");
let newPlaceImage = document.querySelector(".popup__input_image");
let cardSubmit = popupCard.querySelector(".popup__form");

const popupImage = document.querySelector("#view-image");

function openPopupUser() {
  //функция открытия попапа c редактированием данных пользователя
  popupUser.classList.add("popup_open");
  newUserStatus.value = userStatus.textContent; //считывание данных о статусе
  newUserName.value = userName.textContent; //считывание данных об имени
}
function closePopupUser() {
  //функция закрытия попапа с редактированием
  popupUser.classList.remove("popup_open");
}
function saveUserDataEdit(event) {
  evt.preventDefault(); //отмена стандартной отправки
  userName.textContent = newUserName.value; //присваивание нового имени
  userStatus.textContent = newUserStatus.value; //присваивание нового статуса
  closePopupUser(); //вызов закрытия попапа
}
function openClosePopupPlace() {
  //функция открытия и закрытия попапа c добавлением новой карточки
  popupCard.classList.toggle("popup_open");
}
function openClosePopupImage(cardNew) {
  cardNew
    .querySelector(".photo-grid__image")
    .addEventListener("click", function (evt) {
      popupImage.classList.add("popup_open");
      popupImage.querySelector(".popup__text").textContent = evt.target.alt;
      popupImage.querySelector(".popup__image").alt = evt.target.alt;
      popupImage.querySelector(".popup__image").src = evt.target.src;
      popupImage
        .querySelector(".popup__close-button")
        .addEventListener("click", function (evt) {
          popupImage.classList.remove("popup_open");
        });
    });
}
function createCard(cardTitle, cardLink) {
  //создание новой карточки
  const cardNew = cardTemplate.cloneNode(true); //копируем template со структурой карточки
  // указываем откуда брать данные для подстановки
  cardNew.querySelector(".photo-grid__place").textContent = cardTitle;
  cardNew.querySelector(".photo-grid__image").alt = cardTitle;
  cardNew.querySelector(".photo-grid__image").src = cardLink;
  // функция для работы лайка (prettier зачем-то решил, что данный фрагмент кода должен выглядить именно так)
  cardNew
    .querySelector(".photo-grid__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("photo-grid__like-button_active");
    });
  // функция для работы удаления
  cardNew
    .querySelector(".photo-grid__trash-button")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove(evt);
    });
  openClosePopupImage(cardNew);
  cardContainer.prepend(cardNew); //добавляем получившуюся карточку в начало контейнера
  newPlaceTitle.value = ""; //"обнуляем" значения полей с данными
  newPlaceImage.value = "";
  openClosePopupPlace(); //закрываем попап
}
function addCard(evt) {
  //добавление новой карточки
  evt.preventDefault(); //отмена стандартной отправки
  cardTitle = newPlaceTitle.value; //название новой карточки
  cardLink = newPlaceImage.value; //ссылка на изображение новой карточки
  createCard(cardTitle, cardLink);
}
//вывод массива с начальными карточками
initialCards.forEach(function (item) {
  //для каждого элемента массива вызываем функцию создания карточки, которой передаем соответствущие названия и ссылки
  cardTitle = item.name;
  cardLink = item.link;
  createCard(cardTitle, cardLink);
});

popupCloseButtonUser.addEventListener("click", closePopupUser); //закрытие попапа c редактированием данных пользователя
popupCloseButtonPlace.addEventListener("click", openClosePopupPlace); //закрытие попапа c добавлением новой карточки
popupOpenButtonUser.addEventListener("click", openPopupUser); //открытие попапа c редактированием данных пользователя
popupOpenButtonPlace.addEventListener("click", openClosePopupPlace); //открытие попапа c добавлением новой карточки
userSubmit.addEventListener("submit", saveUserDataEdit); //сохранение данных попапа c редактированием данных пользователя
cardSubmit.addEventListener("submit", addCard); //сохранение попапа c добавлением новой карточки
