// импорт классов
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  //массив с данными начальных карточек
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//переменные для работы попапа c редактированием данных пользователя
const popupUser = document.querySelector("#edit_user");
const popupUserOpenButton = document.querySelector(".user__edit-button");
const userName = document.querySelector(".user__name");
const userStatus = document.querySelector(".user__status");
const newUserName = document.querySelector(".popup__input_name");
const newUserStatus = document.querySelector(".popup__input_status");
const popupUserForm = popupUser.querySelector(".popup__form");

//переменные для работы попапа c добавлением карточки
const popupCardOpenButton = document.querySelector(".user__add-button");
const popupCard = document.querySelector("#add_card");
const popupCardSaveButton = popupCard.querySelector(".popup__save-button");
const cardContainer = document.querySelector(".photo-grid");
const newCardTitle = document.querySelector(".popup__input_title");
const newCardImage = document.querySelector(".popup__input_image");
const popupCardForm = popupCard.querySelector(".popup__form");

// переменные для работы попапа с изображением
const popupImage = document.querySelector("#view-image");
const popupImageText = popupImage.querySelector(".popup__text");
const popupImageImage = popupImage.querySelector(".popup__image");

const formObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error-text-visible",
  fields: ".popup__set",
};

const formValidator = new FormValidator(formObject);

function handleEscClose(event) {
  if (event.key === "Escape") {
    popup = document.querySelector(".popup_open");
    closePopup(popup);
  }
}
function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscClose);
}
function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscClose);
}
function addCloseListeners(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_open") || evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
}
function saveUserData(evt) {
  evt.preventDefault();
  userName.textContent = newUserName.value; //присваивание нового имени
  userStatus.textContent = newUserStatus.value; //присваивание нового статуса
  closePopup(popupUser);
}

function readUserData() {
  newUserStatus.value = userStatus.textContent; //считывание данных о статусе
  newUserName.value = userName.textContent; //считывание данных об имени
  formValidator.enableValidation(formObject, popupUser);
  openPopup(popupUser);
}
function readImageData(evt) {
  if (evt.target.classList.contains("photo-grid__image")) {
    popupImageText.textContent = evt.target.alt;
    popupImageImage.alt = evt.target.alt;
    popupImageImage.src = evt.target.src;
    addCloseListeners(popupImage);
    openPopup(popupImage);
  }
}
//добавление новой карточки
function addCard(evt) {
  evt.preventDefault();
  const title = newCardTitle.value;
  const link = newCardImage.value;
  const data = { title, link };
  getCard(data);
  closePopup(popupCard);
  //"обнуляем" значения формы
  popupCardForm.reset();
  popupCardSaveButton.classList.add("popup__save-button_disabled");
  popupCardSaveButton.disabled = true;
}
function createNewCard(card, cardContainer) {
  const cardNew = card.createCard();
  cardContainer.prepend(cardNew);
}
const getCard = (data) => {
  const card = new Card(data, "#card-template");
  createNewCard(card, cardContainer);
};

//вывод массива с начальными карточками
initialCards.map((card) => getCard(card));

popupUserOpenButton.addEventListener("click", () => readUserData(popupUser)); //чтение данных и открытие попапа c редактированием данных пользователя
popupCardOpenButton.addEventListener("click", () => {
  formValidator.enableValidation(formObject, popupCard);
  openPopup(popupCard);
}); //открытие попапа c добавлением новой карточки
addCloseListeners(popupUser);
addCloseListeners(popupCard);
addCloseListeners(popupImage);
popupUserForm.addEventListener("submit", saveUserData);
popupCardForm.addEventListener("submit", addCard);
cardContainer.addEventListener("click", readImageData);
