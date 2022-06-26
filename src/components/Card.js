import { cardSelectors } from "../utils/constants";

export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._title = data.title;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    return document.querySelector(this._cardTemplate).content.querySelector(cardSelectors.card).cloneNode(true);
  };

  createCard = () => {
    this._card = this._getTemplate();
    const place = this._card.querySelector(cardSelectors.place);
    this.image = this._card.querySelector(cardSelectors.image);
    place.textContent = this._title;
    this.image.alt = this._title;
    this.image.src = this._link;
    this._addListenerToButtons();
    return this._card;
  };

  _likeCardHandler = () => {
    this.likeButton.classList.toggle(cardSelectors.likeActive);
  };

  _deleteCardHandler = () => {
    this._card.remove();
  };

  _addListenerToButtons = () => {
    this.likeButton = this._card.querySelector(cardSelectors.likeButton);
    this.likeButton.addEventListener("click", this._likeCardHandler);
    const deleteButton = this._card.querySelector(cardSelectors.deleteButton);
    deleteButton.addEventListener("click", this._deleteCardHandler);
    this.image.addEventListener("click", () => this._handleCardClick({ title: this._title, link: this._link }));
  };
}
