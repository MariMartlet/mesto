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

function saveUserData(evt) {
  evt.preventDefault();
  userName.textContent = newUserName.value; //присваивание нового имени
  userStatus.textContent = newUserStatus.value; //присваивание нового статуса
  closePopup(popupUser);
}

function readUserData() {
  newUserStatus.value = userStatus.textContent; //считывание данных о статусе
  newUserName.value = userName.textContent; //считывание данных об имени
  openPopup(popupUser);
}
function readImageData(evt) {
  evt.preventDefault(); // отмена стандартной обработки
  popupImageText.textContent = evt.target.alt;
  popupImageImage.alt = evt.target.alt;
  popupImageImage.src = evt.target.src;
  openPopup(popupImage);
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

function createCard(card) {
  //создание новой карточки
  const cardNew = cardTemplate.cloneNode(true); //копируем template со структурой карточки
  const cardTitle = cardNew.querySelector(".photo-grid__place");
  const cardImage = cardNew.querySelector(".photo-grid__image");
  // указываем откуда брать данные для подстановки
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;
  likeCard(cardNew);
  deleteCard(cardNew);
  cardImage.addEventListener("click", readImageData);
  return cardNew;
}

function addCard(evt) {
  //добавление новой карточки
  evt.preventDefault(); //отмена стандартной отправки
  cardContainer.prepend(createCard({ name: newCardTitle.value, link: newCardImage.value }));
  closePopup(popupCard);
  //"обнуляем" значения формы
  popupCardForm.reset();
  popupCardSaveButton.classList.add("popup__save-button_disabled");
  popupCardSaveButton.disabled = true;
}

//вывод массива с начальными карточками
initialCards.map((card) => cardContainer.prepend(createCard(card)));

popupUserOpenButton.addEventListener("click", () => readUserData(popupUser)); //чтение данных и открытие попапа c редактированием данных пользователя
popupCardOpenButton.addEventListener("click", () => openPopup(popupCard)); //открытие попапа c добавлением новой карточки
popupUserCloseButton.addEventListener("click", () => closePopup(popupUser));
overlayPopupUser.addEventListener("click", () => closePopup(popupUser));
popupCardCloseButton.addEventListener("click", () => closePopup(popupCard));
overlayPopupCard.addEventListener("click", () => closePopup(popupCard));
popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));
overlayPopupImage.addEventListener("click", () => closePopup(popupImage));
popupUserForm.addEventListener("submit", saveUserData);
popupCardForm.addEventListener("submit", addCard);
