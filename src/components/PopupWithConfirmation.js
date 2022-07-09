import { selectors } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmSubmitHandler) {
    super(popupSelector);
    this._confirmSubmitHandler = confirmSubmitHandler;
    this._form = this._popup.querySelector(selectors.formSelector);
    this._saveButton = this._popup.querySelector(selectors.submitButtonSelector);
    this._saveButtonText = "";
  }

  open(data, card) {
    super.open();
    this._data = data;
    this._card = card;
  }

  visibleLoading = () => {
    this._saveButtonText = this._saveButton.textContent;
    this._saveButton.textContent = "Удаление...";
  };
  hiddenLoading = () => {
    this._saveButton.textContent = this._saveButtonText;
  };

  _submit = (evt) => {
    evt.preventDefault();
    this._confirmSubmitHandler(this._data, this._card);
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }

  close() {
    super.close();
  }
}
