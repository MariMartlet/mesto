import { cardSelectors } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupText = this._popup.querySelector(cardSelectors.popupText);
    this._popupImage = this._popup.querySelector(cardSelectors.popupImage);
  }

  open(data) {
    this._popupText.textContent = data.title;
    this._popupImage.alt = data.title;
    this._popupImage.src = data.link;
    super.open();
  }
}
