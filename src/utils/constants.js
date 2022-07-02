// массив с данными начальных карточек
export const initialCards = [
  // {
  //   title: "Архыз",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  // },
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

export const selectors = {
  openPopupClass: "popup_open",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  closeButtonClass: "popup__close-button",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error-text-visible",
  fields: ".popup__set",
};

export const popups = {
  user: "#edit_user",
  image: "#view-image",
  card: "#add_card",
};

export const cardSelectors = {
  template: "#card-template",
  container: ".photo-grid",
  card: ".photo-grid__item",
  place: ".photo-grid__place",
  image: ".photo-grid__image",
  likeButton: ".photo-grid__like-button",
  likeActive: "photo-grid__like-button_active",
  deleteButton: ".photo-grid__trash-button",
  popupText: ".popup__text",
  popupImage: ".popup__image",
  addButton: ".user__add-button",
};

export const userSelectors = {
  openButton: ".user__edit-button",
  inputName: ".popup__input_name",
  inputStatus: ".popup__input_status",
  name: ".user__name",
  status: ".user__status",
};
