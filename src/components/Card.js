import { cardSelectors } from "../utils/constants.js";

export default class Card {
  constructor(data, myId, cardTemplate, { handleCardClick, likeCardClick, dislikeCardClick, deleteCardClick }) {
    this._title = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._likeCardClick = likeCardClick;
    this._dislikeCardClick = dislikeCardClick;
    this._deleteCardClick = deleteCardClick;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._likes = data.likes;
  }

  _getTemplate = () => {
    return document.querySelector(this._cardTemplate).content.querySelector(cardSelectors.card).cloneNode(true);
  };

  createCard = () => {
    this._card = this._getTemplate();
    this._place = this._card.querySelector(cardSelectors.place);
    this._image = this._card.querySelector(cardSelectors.image);
    this._place.textContent = this._title;
    this._image.alt = this._title;
    this._image.src = this._link;
    this._likeButton = this._card.querySelector(cardSelectors.likeButton);
    if (this._likes.find((item) => item._id === this._myId)) {
      this.likeCardHandler();
    }
    this._likeCounter = this._card.querySelector(cardSelectors.likeCounter);
    this.checkLikeCounter(this._likes.length);
    this._deleteButton = this._card.querySelector(cardSelectors.deleteButton);
    if (this._ownerId != this._myId) {
      this._card.querySelector(cardSelectors.deleteButton).classList.add(cardSelectors.deleteDisabled);
    }
    this._addListenerToButtons();
    return this._card;
  };

  likeCardHandler = () => {
    this._likeButton.classList.add(cardSelectors.likeActive);
  };

  dislikeCardHandler = () => {
    this._likeButton.classList.remove(cardSelectors.likeActive);
  };

  _checkLikeEnabled = (evt) => {
    if (evt.target.classList.contains(cardSelectors.likeActive)) {
      this._dislikeCardClick();
    } else {
      this._likeCardClick();
    }
  };

  checkLikeCounter(likesLength) {
    this._likeCounter.textContent = likesLength || "";
  }

  checkLike(data) {
    this.checkLikeCounter(data.likes.length);
    data.likes.forEach((card) => {
      if (card._id === this._myId) {
        this.likeCard(card);
      }
    });
  }

  deleteCardHandler = () => {
    this._card.remove();
  };

  _addListenerToButtons = () => {
    this._likeButton.addEventListener("click", this._checkLikeEnabled);
    this._deleteButton.addEventListener("click", this._deleteCardClick);
    this._image.addEventListener("click", () => this._handleCardClick({ title: this._title, link: this._link }));
  };
}
