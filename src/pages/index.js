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
      console.error(err);
    });
}

const popupWithUserForm = new PopupWithForm(popups.user, {
  formSubmitHandler: (data) => {
    popupWithUserForm.visibleLoading(popups.user);
    api
      .updateUserInfo(data)
      .then((_data) => {
        userInfo.setUserInfo(_data);
        popupWithUserForm.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupWithUserForm.hiddenLoading();
      });
  },
});
popupWithUserForm.setEventListeners();

const popupWithUserAvatar = new PopupWithForm(popups.avatar, {
  formSubmitHandler: (data) => {
    popupWithUserAvatar.visibleLoading(popups.avatar);
    api
      .updateUserAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupWithUserAvatar.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupWithUserAvatar.hiddenLoading();
      });
  },
});
popupWithUserAvatar.setEventListeners();

const popupWithCardForm = new PopupWithForm(popups.card, {
  formSubmitHandler: (data) => {
    popupWithCardForm.visibleLoading(popups.card);
    api
      .addCard(data)
      .then((_data) => {
        renderCard(_data);
        popupWithCardForm.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupWithCardForm.hiddenLoading();
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
          console.error(err);
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
          console.error(err);
        });
    },
    deleteCardClick: (data) => {
      popupWithConfirmation.open(data, newCard);
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

const popupWithConfirmation = new PopupWithConfirmation(popups.confirm, deleteCardClick);
popupWithConfirmation.setEventListeners();

function deleteCardClick(data, card) {
  popupWithConfirmation.visibleLoading(popups.confirm);
  api
    .deleteCard(data)
    .then(() => {
      card.deleteCardHandler();
      popupWithConfirmation.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupWithConfirmation.hiddenLoading(popups.confirm);
    });
}

popupUserOpenButton.addEventListener("click", readUserData);
popupCardOpenButton.addEventListener("click", () => {
  createCardValidation.toggleButtonState();
  addCard();
});

popupAvatarOpenButton.addEventListener("click", () => {
  avatarUpdateValidation.toggleButtonState();
  popupWithUserAvatar.open(popups.avatar);
});

getAllData();
