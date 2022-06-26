export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._button = this._popupSelector.querySelector(".popup__close-button");
  }
  open() {
    this._popupSelector.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupSelector.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._button.addEventListener("click", this.close);
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_open") || evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}
