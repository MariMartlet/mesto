import { selectors } from "../utils/constants";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  
  }

  open() {
    this._popup.classList.add(selectors.openPopupClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(selectors.openPopupClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains(selectors.openPopupClass) || evt.target.classList.contains(selectors.closeButtonClass)) {
        this.close();
      }
    });
  }
}
