export default class Card {
  constructor(data, cardTemplate) {
    this._title = data.title;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
  }
  //получаем template со структурой карточки
  _getTemplate() {
    const cardNew = document.querySelector(this._cardTemplate).content.querySelector(".photo-grid__item").cloneNode(true);
    return cardNew;
  }
  //создаем карточку
  createCard() {
    this._card = this._getTemplate();
    const place = this._card.querySelector(".photo-grid__place");
    place.textContent = this._title;
    place.alt = this._title;
    this._card.querySelector(".photo-grid__image").src = this._link;
    this._addListenersToCardButtons();
    return this._card;
  }
  //ставим карточке лайк
  _likeCard(likeButton) {
    likeButton.classList.toggle("photo-grid__like-button_active");
  }
  //удаляем карточку
  _deleteCard() {
    this._card.remove();
  }
  //добавляем карточке слушатели
  _addListenersToCardButtons() {
    const likeButton = this._card.querySelector(".photo-grid__like-button");
    const deleteButton = this._card.querySelector(".photo-grid__trash-button");
    likeButton.addEventListener("click", () => {
      this._likeCard(likeButton);
    });
    deleteButton.addEventListener("click", () => {
      this._deleteCard(deleteButton);
    });
  }
}
