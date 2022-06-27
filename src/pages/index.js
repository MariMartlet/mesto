// импорт классов
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { selectors, popups, initialCards, userSelectors, cardSelectors } from "../utils/constants.js";

// переменные для работы попапа c редактированием данных пользователя
const popupUserOpenButton = document.querySelector(userSelectors.openButton);
const newUserName = document.querySelector(userSelectors.inputName);
const newUserStatus = document.querySelector(userSelectors.inputStatus);
const popupUserForm = document.querySelector(popups.user).querySelector(selectors.formSelector);

// переменные для работы попапа c добавлением карточки
const popupCardOpenButton = document.querySelector(cardSelectors.addButton);
const cardContainer = document.querySelector(cardSelectors.container);
const popupCardForm = document.querySelector(popups.card).querySelector(selectors.formSelector);

//создание новых экземпляров классов
const profileValidation = new FormValidator(selectors, popupUserForm);
const createCardValidation = new FormValidator(selectors, popupCardForm);
profileValidation.enableValidation();
createCardValidation.enableValidation();

const popupWithUserForm = new PopupWithForm(popups.user, {
  formSubmitHandler: (data) => {
    userInfo.setUserInfo({ name: data.UserPopupName, status: data.UserPopupStatus });
    popupWithUserForm.close();
  },
});
popupWithUserForm.setEventListeners();

const popupWithImage = new PopupWithImage(popups.image);
popupWithImage.setEventListeners();

const section = new Section(
  {
    items: initialCards, 
    renderer: renderCard, 
  },
  cardContainer
);
function createNewCard(data) {
  const newCard = new Card(data, cardSelectors.template, handleCardClick);
  const card = newCard.createCard(data);
  return card;
}
const renderCard = (data) => {
  section.addItem(createNewCard(data));
} 
const popupWithCardForm = new PopupWithForm(popups.card, {
  formSubmitHandler: (data) => {
    renderCard({ link: data.UserPopupImage, title: data.UserPopupTitle });
    popupWithCardForm.close();
  },
});
popupWithCardForm.setEventListeners();
const userInfo = new UserInfo(userSelectors.name, userSelectors.status);

function readUserData() {
  const data = userInfo.getUserInfo();
  newUserStatus.value = data.status;
  newUserName.value = data.name;
  profileValidation.toggleButtonState();
  popupWithUserForm.open();
}

function addCard() {
  popupWithCardForm.open(popups.card);
}

function handleCardClick(data) {
  popupWithImage.open(data);
}

function renderInitialCards() {
  section.renderItems(initialCards);
}

popupUserOpenButton.addEventListener("click", readUserData);
popupCardOpenButton.addEventListener("click", () => {
  addCard();
  createCardValidation.toggleButtonState();
});
renderInitialCards();
