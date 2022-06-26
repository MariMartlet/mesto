import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageText = this._popupSelector.querySelector(".popup__text");
    this._popupImageImage = this._popupSelector.querySelector(".popup__image");
  }
  open(data) {
    this._popupImageText.textContent = data.title;
    this._popupImageImage.alt = data.title;
    this._popupImageImage.src = data.link;
    super.open();
  }
}
