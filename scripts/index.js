// импорт классов
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// массив с данными начальных карточек
const initialCards = [
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

// переменные для работы попапа c редактированием данных пользователя
const popupUser = document.querySelector("#edit_user");
const popupUserOpenButton = document.querySelector(".user__edit-button");
const userName = document.querySelector(".user__name");
const userStatus = document.querySelector(".user__status");
const newUserName = document.querySelector(".popup__input_name");
const newUserStatus = document.querySelector(".popup__input_status");
const popupUserForm = popupUser.querySelector(".popup__form");

// переменные для работы попапа c добавлением карточки
const popupCardOpenButton = document.querySelector(".user__add-button");
const popupCard = document.querySelector("#add_card");
const cardContainer = document.querySelector(".photo-grid");
const newCardTitle = document.querySelector(".popup__input_title");
const newCardImage = document.querySelector(".popup__input_image");
const popupCardForm = popupCard.querySelector(".popup__form");

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error-text-visible",
  fields: ".popup__set",
};

const profileValidation = new FormValidator(selectors, popupUserForm);
const createCardValidation = new FormValidator(selectors, popupCardForm);
profileValidation.enableValidation();
createCardValidation.enableValidation();

export function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscClose);
}
function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscClose);
}

function readUserData() {
  newUserStatus.value = userStatus.textContent;
  newUserName.value = userName.textContent;
  profileValidation.toggleButtonState();
  openPopup(popupUser);
}
function saveUserData(evt) {
  evt.preventDefault();
  userName.textContent = newUserName.value;
  userStatus.textContent = newUserStatus.value;
  closePopup(popupUser);
}

//добавление новой карточки
function addCard(evt) {
  evt.preventDefault();
  const title = newCardTitle.value;
  const link = newCardImage.value;
  const data = { title, link };
  getCard(data);
  closePopup(popupCard);
  popupCardForm.reset();
}
function createNewCard(data) {
  const newCard = new Card(data, "#card-template");
  return newCard.createCard();
}
function getCard(data) {
  const newCard = createNewCard(data);
  cardContainer.prepend(newCard);
}

export function addCloseListeners(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_open") || evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
}
function handleEscClose(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_open");
    closePopup(popup);
  }
}

// вывод массива с начальными карточками
initialCards.map((card) => getCard(card));

popupUserOpenButton.addEventListener("click", readUserData);
popupCardOpenButton.addEventListener("click", () => {
  createCardValidation.toggleButtonState();
  openPopup(popupCard);
});
addCloseListeners(popupUser);
addCloseListeners(popupCard);
popupUserForm.addEventListener("submit", saveUserData);
popupCardForm.addEventListener("submit", addCard);
