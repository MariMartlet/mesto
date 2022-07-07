// импорт классов
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import { selectors, popups, initialCards, userSelectors, cardSelectors } from "../utils/constants.js";

// переменные для работы попапа c редактированием данных пользователя
const popupUserOpenButton = document.querySelector(userSelectors.openButtonEditName);
const newUserName = document.querySelector(userSelectors.inputName);
const newUserStatus = document.querySelector(userSelectors.inputStatus);
const popupUserForm = document.querySelector(popups.user).querySelector(selectors.formSelector);

// переменные для работы попапа c добавлением карточки
const popupCardOpenButton = document.querySelector(cardSelectors.addButton);
const cardContainer = document.querySelector(cardSelectors.container);
const popupCardForm = document.querySelector(popups.card).querySelector(selectors.formSelector);

const popupAvatarUpdateForm = document.querySelector(popups.avatar).querySelector(selectors.formSelector);
const popupAvatarOpenButton = document.querySelector(userSelectors.openButtonEditAvatar);

//создание новых экземпляров классов
const profileValidation = new FormValidator(selectors, popupUserForm);
const createCardValidation = new FormValidator(selectors, popupCardForm);
const avatarUpdateValidation = new FormValidator(selectors, popupAvatarUpdateForm);
profileValidation.enableValidation();
createCardValidation.enableValidation();
avatarUpdateValidation.enableValidation();

let myId = "";
let saveButton = null;
let saveButtonText = "";

const url = "https://mesto.nomoreparties.co/v1/cohort-43";
const headers = {
  authorization: "fd1b0b94-1577-4543-a3a2-5b3c2006aaab",
  "Content-Type": "application/json",
};

const api = new Api({ url, headers });

function getAllData() {
  api
    .getAllData()
    .then((data) => {
      const [userData, cards] = data;
      myId = userData._id;
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData);
      section.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });
}

function visibleLoading(popupSelector) {
  saveButton = document.querySelector(popupSelector).querySelector(selectors.submitButtonSelector);
  saveButtonText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
}
function hiddenLoading() {
  saveButton.textContent = saveButtonText;
}

const popupWithUserForm = new PopupWithForm(popups.user, {
  formSubmitHandler: (data) => {
    visibleLoading(popups.user);
    api
      .updateUserInfo(data)
      .then((_data) => {
        userInfo.setUserInfo(_data);
        popupWithUserForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hiddenLoading();
      });
  },
});
popupWithUserForm.setEventListeners();

const popupWithUserAvatar = new PopupWithForm(popups.avatar, {
  formSubmitHandler: (data) => {
    visibleLoading(popups.avatar);
    api
      .updateUserAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupWithUserAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hiddenLoading();
      });
  },
});
popupWithUserAvatar.setEventListeners();

const popupWithCardForm = new PopupWithForm(popups.card, {
  formSubmitHandler: (data) => {
    visibleLoading(popups.card);
    api
      .addCard(data)
      .then((_data) => {
        renderCard(_data);
        popupWithCardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hiddenLoading();
      });
  },
});
popupWithCardForm.setEventListeners();

const popupWithImage = new PopupWithImage(popups.image);
popupWithImage.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardContainer
);

const userInfo = new UserInfo(userSelectors.name, userSelectors.status, userSelectors.avatar);
function readUserData() {
  const data = userInfo.getUserInfo();
  newUserStatus.value = data.status;
  newUserName.value = data.name;
  profileValidation.toggleButtonState();
  popupWithUserForm.open();
}

function createNewCard(data) {
  const newCard = new Card(data, myId, cardSelectors.template, {
    handleCardClick,
    likeCardClick: () => {
      api
        .likeCard(data)
        .then((data) => {
          newCard.checkLikeCounter(data.likes.length);
          newCard.likeCardHandler();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dislikeCardClick: () => {
      api
        .dislikeCard(data)
        .then((data) => {
          newCard.checkLikeCounter(data.likes.length);
          newCard.dislikeCardHandler();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCardClick: () => {
      const popupWithConfirmation = new PopupWithConfirmation(popups.confirm, {
        confirmSubmitHandler: (data) => {
          visibleLoading(popups.confirm);
          api
            .deleteCard(data)
            .then((data) => {
              newCard.deleteCardHandler(data);
              popupWithConfirmation.close();
            })
            .catch((err) => {
              alert(err);
            })
            .finally(() => {
              hiddenLoading(popups.confirm);
            });
        },
      });
      popupWithConfirmation.setEventListeners();
      popupWithConfirmation.open(data);
    },
  });
  const card = newCard.createCard(data);
  return card;
}
function renderCard(data) {
  section.addItem(createNewCard(data));
}
function addCard() {
  popupWithCardForm.open(popups.card);
}
function handleCardClick(data) {
  popupWithImage.open(data);
}
function openAvatarPopup() {
  popupWithUserAvatar.open(popups.avatar);
}

popupUserOpenButton.addEventListener("click", readUserData);
popupCardOpenButton.addEventListener("click", () => {
  addCard();
  createCardValidation.toggleButtonState();
});

popupAvatarOpenButton.addEventListener("click", openAvatarPopup);

getAllData();
