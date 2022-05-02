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
const userName = document.querySelector(".user__name");
const userStatus = document.querySelector(".user__status");
const newUserName = document.querySelector(".popup__input_name");
const newUserStatus = document.querySelector(".popup__input_status");
const userSubmit = popupUser.querySelector(".popup__form");

//переменные для работы попапа c добавлением карточки
const popupOpenButtonPlace = document.querySelector(".user__add-button");
const popupCard = document.querySelector("#add_card");
const popupCloseButtonPlace = popupCard.querySelector(".popup__close-button");
const cardContainer = document.querySelector(".photo-grid");
const cardTemplate = document.querySelector("#card-template").content;
const newPlaceTitle = document.querySelector(".popup__input_title");
const newPlaceImage = document.querySelector(".popup__input_image");
const cardSubmit = popupCard.querySelector(".popup__form");

// переменные для работы попапа с изображением
const popupImage = document.querySelector("#view-image");
const popupImageText = popupImage.querySelector(".popup__text");
const popupImageImage = popupImage.querySelector(".popup__image");
const popupCloseButtonImage = popupImage.querySelector(".popup__close-button");

function openPopup(PopupType) {
  //функция открытия попапа
  PopupType.classList.add("popup_open");
}
function closePopup(PopupType) {
  //функция закрытия попапа
  PopupType.classList.remove("popup_open");
}
function readUserData() {
  newUserStatus.value = userStatus.textContent; //считывание данных о статусе
  newUserName.value = userName.textContent; //считывание данных об имени
  openPopup(popupUser);
}
function saveUserDataEdit(evt) {
  evt.preventDefault(); //отмена стандартной отправки
  userName.textContent = newUserName.value; //присваивание нового имени
  userStatus.textContent = newUserStatus.value; //присваивание нового статуса
  closePopup(popupUser); //вызов закрытия попапа
}
function readPlaceData(evt) {
  evt.preventDefault(); // отмена стандартной обработки
  popupImageText.textContent = evt.target.alt;
  popupImageImage.alt = evt.target.alt;
  popupImageImage.src = evt.target.src;
  openPopup(popupImage);
}

function createCard(item) {
  //создание новой карточки
  const cardNew = cardTemplate.cloneNode(true); //копируем template со структурой карточки
  const placeTitle = cardNew.querySelector(".photo-grid__place");
  const placeImage = cardNew.querySelector(".photo-grid__image");
  // указываем откуда брать данные для подстановки
  placeTitle.textContent = item.name;
  placeImage.alt = item.name;
  placeImage.src = item.link;
  // слушатель для работы лайка (prettier зачем-то решил, что данный фрагмент кода должен выглядить именно так)
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
  placeImage.addEventListener("click", readPlaceData);
  return cardNew;
}
function addCard(evt) {
  //добавление новой карточки
  evt.preventDefault(); //отмена стандартной отправки
  cardContainer.prepend(
    createCard({ name: newPlaceTitle.value, link: newPlaceImage.value })
  );
  closePopup(popupCard);
  //"обнуляем" значения формы
  cardSubmit.reset();
}
//вывод массива с начальными карточками
initialCards.map((item) => cardContainer.prepend(createCard(item)));

popupCloseButtonUser.addEventListener("click", () => closePopup(popupUser)); //закрытие попапа c редактированием данных пользователя
popupCloseButtonPlace.addEventListener("click", () => closePopup(popupCard)); //закрытие попапа c добавлением новой карточки
popupOpenButtonUser.addEventListener("click", readUserData); //чтение данных и открытие попапа c редактированием данных пользователя
popupOpenButtonPlace.addEventListener("click", () => openPopup(popupCard)); //открытие попапа c добавлением новой карточки
popupCloseButtonImage.addEventListener("click", () => closePopup(popupImage)); //закрытие попапа c изображением
userSubmit.addEventListener("submit", saveUserDataEdit); //сохранение данных попапа c редактированием данных пользователя
cardSubmit.addEventListener("submit", addCard); //сохранение попапа c добавлением новой карточки
