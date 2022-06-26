export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._title = data.title;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    return document.querySelector(this._cardTemplate).content.querySelector(".photo-grid__item").cloneNode(true);
  };

  createCard = () => {
    this._card = this._getTemplate();
    const place = this._card.querySelector(".photo-grid__place");
    const image = this._card.querySelector(".photo-grid__image");
    place.textContent = this._title;
    image.alt = this._title;
    image.src = this._link;
    this._addListenerToButtons();
    return this._card;
  };

  _likeCardHandler = () => {
    this.likeButton.classList.toggle("photo-grid__like-button_active");
  };

  _deleteCardHandler = () => {
    this._card.remove();
  };

  _addListenerToButtons = () => {
    this.likeButton = this._card.querySelector(".photo-grid__like-button");
    this.likeButton.addEventListener("click", this._likeCardHandler);
    const deleteButton = this._card.querySelector(".photo-grid__trash-button");
    deleteButton.addEventListener("click", this._deleteCardHandler);
    const image = this._card.querySelector(".photo-grid__image");
    image.addEventListener("click", this._handleCardClick);
  };
}
