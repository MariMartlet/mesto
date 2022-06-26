// импорт классов
import "./index.css";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import { selectors, initialCards as items } from "./utils/constants.js";

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
const popupImage = document.querySelector("#view-image");
const popupCardForm = popupCard.querySelector(".popup__form");

//создание новых экземпляров классов
const profileValidation = new FormValidator(selectors, popupUserForm);
const createCardValidation = new FormValidator(selectors, popupCardForm);
profileValidation.enableValidation();
createCardValidation.enableValidation();

const popupWithUserForm = new PopupWithForm(popupUser, {
  formSubmitHandler: (data) => {
    userInfo.setUserInfo({ name: data.UserPopupName, status: data.UserPopupStatus });
    popupWithUserForm.close();
  },
});
popupWithUserForm.setEventListeners();

const popupWithCardForm = new PopupWithForm(popupCard, {
  formSubmitHandler: (data) => {
    section._renderer({ link: data.UserPopupImage, title: data.UserPopupTitle });
    popupWithCardForm.close();
  },
});
popupWithCardForm.setEventListeners();

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const section = new Section(
  {
    items,
    renderer: (data) => {
      const newCard = new Card(data, "#card-template", handleCardClick);
      const card = newCard.createCard(data);
      section.addItem(card);
    },
  },
  cardContainer
);
const userInfo = new UserInfo({ userName, userStatus });

function readUserData() {
  const data = userInfo.getUserInfo();
  newUserStatus.value = data.status;
  newUserName.value = data.name;
  profileValidation.toggleButtonState();
  popupWithUserForm.open();
}

const addCard = () => {
  popupWithCardForm.open(popupCard);
};

function handleCardClick(evt) {
  const data = {
    link: evt.target.src,
    title: evt.target.alt,
  };
  popupWithImage.open(data);
}

const renderInitialCards = () => {
  section.renderItems(items);
};

popupUserOpenButton.addEventListener("click", readUserData);
popupCardOpenButton.addEventListener("click", () => {
  addCard();
  createCardValidation.toggleButtonState();
});
renderInitialCards();
