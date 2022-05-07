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
const popupUserOpenButton = document.querySelector(".user__edit-button");
const popupUserCloseButton = popupUser.querySelector(".popup__close-button");
const overlayPopupUser = popupUser.querySelector(".popup__overlay");
const userName = document.querySelector(".user__name");
const userStatus = document.querySelector(".user__status");
const newUserName = document.querySelector(".popup__input_name");
const newUserStatus = document.querySelector(".popup__input_status");
const popupUserForm = popupUser.querySelector(".popup__form");

//переменные для работы попапа c добавлением карточки
const popupCardOpenButton = document.querySelector(".user__add-button");
const popupCard = document.querySelector("#add_card");
const popupCardCloseButton = popupCard.querySelector(".popup__close-button");
const overlayPopupCard = popupCard.querySelector(".popup__overlay");
const popupCardSaveButton = popupCard.querySelector(".popup__save-button");
const cardContainer = document.querySelector(".photo-grid");
const cardTemplate = document.querySelector("#card-template").content;
const newCardTitle = document.querySelector(".popup__input_title");
const newCardImage = document.querySelector(".popup__input_image");
const popupCardForm = popupCard.querySelector(".popup__form");

// переменные для работы попапа с изображением
const popupImage = document.querySelector("#view-image");
const popupImageText = popupImage.querySelector(".popup__text");
const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");
const overlayPopupImage = popupImage.querySelector(".popup__overlay");

function openPopup(popup) {
  popup.classList.add("popup_open");
}
function closePopup(popup) {
  popup.classList.remove("popup_open");
}

function saveUserData(evt) {
  evt.preventDefault();
  userName.textContent = newUserName.value; //присваивание нового имени
  userStatus.textContent = newUserStatus.value; //присваивание нового статуса
  closePopup(popupUser);
}

// убираем слушатели
function removeEventListenersOnPopupClose(popup, closeElement) {
  closeElement.removeEventListener("click", function () {
    closePopup(popup);
    removeEventListenersOnPopup(popup);
  });
}
function removeEventListenersOnPopup(popup) {
  if (popup === popupCard) {
    popupCardForm.removeEventListener("submit", addCard);
    popupCardSaveButton.classList.add("popup__save-button_disabled");
    popupCardSaveButton.disabled = true;
  } else if (popup === popupUser) {
    popupUserForm.removeEventListener("submit", saveUserData);
  } else if (popup === popupImage) {
  }
  document.removeEventListener("keydown", closePopup(popup));
}

// добавляем слушатели
function addEventListenersOnPopupClose(popup, closeElement) {
  closeElement.addEventListener("click", function () {
    closePopup(popup);
    removeEventListenersOnPopupClose(popup, closeElement);
  });
}
function addEventListenersOnPopup(popup, cardImage) {
  if (popup === popupCard) {
    popupCardForm.addEventListener("submit", addCard);
    popupCardSaveButton.classList.add("popup__save-button_disabled");
    popupCardSaveButton.disabled = true;
    addEventListenersOnPopupClose(popup, popupCardCloseButton);
    addEventListenersOnPopupClose(popup, overlayPopupCard);
  } else if (popup === popupUser) {
    popupUserForm.addEventListener("submit", saveUserData);
    addEventListenersOnPopupClose(popup, popupUserCloseButton);
    addEventListenersOnPopupClose(popup, overlayPopupUser);
  } else if (popup === popupImage) {
    cardImage.addEventListener("click", readImageData);
    addEventListenersOnPopupClose(popup, popupImageCloseButton);
    addEventListenersOnPopupClose(popup, overlayPopupImage);
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup(popup);
      removeEventListenersOnPopup(popup);
    }
  });
}

function readUserData() {
  newUserStatus.value = userStatus.textContent; //считывание данных о статусе
  newUserName.value = userName.textContent; //считывание данных об имени
  openPopup(popupUser);
  addEventListenersOnPopup(popupUser);
}
function readImageData(evt) {
  evt.preventDefault(); // отмена стандартной обработки
  popupImageText.textContent = evt.target.alt;
  popupImageImage.alt = evt.target.alt;
  popupImageImage.src = evt.target.src;
  openPopup(popupImage);
  addEventListenersOnPopup(popupImage, popupImageImage);
}

function likeCard(cardNew) {
  cardNew.querySelector(".photo-grid__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("photo-grid__like-button_active");
  });
}
function deleteCard(cardNew) {
  cardNew.querySelector(".photo-grid__trash-button").addEventListener("click", function (evt) {
    evt.target.parentElement.remove(evt);
  });
}

function createCard(item) {
  //создание новой карточки
  const cardNew = cardTemplate.cloneNode(true); //копируем template со структурой карточки
  const cardTitle = cardNew.querySelector(".photo-grid__place");
  const cardImage = cardNew.querySelector(".photo-grid__image");
  // указываем откуда брать данные для подстановки
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;
  likeCard(cardNew);
  deleteCard(cardNew);
  addEventListenersOnPopup(popupImage, cardImage);
  return cardNew;
}

function addCard(evt) {
  //добавление новой карточки
  evt.preventDefault(); //отмена стандартной отправки
  cardContainer.prepend(createCard({ name: newCardTitle.value, link: newCardImage.value }));
  closePopup(popupCard);
  //"обнуляем" значения формы
  popupCardForm.reset();
}

//вывод массива с начальными карточками
initialCards.map((item) => cardContainer.prepend(createCard(item)));

popupUserOpenButton.addEventListener("click", () => readUserData(popupUser)); //чтение данных и открытие попапа c редактированием данных пользователя
popupCardOpenButton.addEventListener("click", function () {
  addEventListenersOnPopup(popupCard);
  openPopup(popupCard);
}); //открытие попапа c добавлением новой карточки
