import default function openPopup from "./index.js";

export const popupImage = document.querySelector("#view-image");
const popupImageText = popupImage.querySelector(".popup__text");
const popupImageImage = popupImage.querySelector(".popup__image");

export default class Card {
  constructor(data, cardTemplate) {
    this._title = data.title;
    this._link = data.link;
    this._cardTemplate = cardTemplate
  }

  _getTemplate = () => {
    return document.querySelector(this._cardTemplate).content.querySelector(".photo-grid__item").cloneNode(true);
  };

  createCard = () => {
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector(".photo-grid__like-button");
    const place = this._card.querySelector(".photo-grid__place");
    const image = this._card.querySelector(".photo-grid__image");
    place.textContent = this._title;
    image.alt = this._title;
    image.src = this._link;
    // ничего страшного, спасибо вам за честность) я потом подправлю, сейчас просто с рабочего компьютера и
    // нет возможности проверить, все ли правильно исправлю, так как редактирую прямо в гите))
    // зато вы быстро проверяете)) до этого пришлось сменить группу, так как работу проверяли неделю)
    this._addListenerToLike();
    this._addListenerToDelete();
    this._addListenerToOpen();
    return this._card;
  };

  _likeCardHandler = () => {
    this._likeButton.classList.toggle("photo-grid__like-button_active");
  };

  _deleteCardHandler = () => {
    this._card.remove();
  };

  _openImagePopup = () => {
    popupImageText.textContent = this._title;
    popupImageImage.alt = this._title;
    popupImageImage.src = this._link;
    openPopup(popupImage);
  };

  _addListenerToLike = () => {
    this._likeButton.addEventListener("click", this._likeCardHandler);
  };

  _addListenerToDelete = () => {
    const deleteButton = this._card.querySelector(".photo-grid__trash-button");
    deleteButton.addEventListener("click", this._deleteCardHandler);
  };

  _addListenerToOpen = () => {
    const image = this._card.querySelector(".photo-grid__image");
    image.addEventListener("click", this._openImagePopup);
  };
}
