import { selectors } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._popupForm = this._popup.querySelector(selectors.formSelector);
    this._submitPopup = this._submitPopup.bind(this);
    this._inputsList = Array.from(this._popupForm.querySelectorAll(selectors.inputSelector));
    this._saveButton = null;
    this._saveButtonText = "";
  }

  _getInputValues = () => {
    const data = {};
    this._inputsList.forEach((input) => (data[input.name] = input.value));
    return data;
  };

  visibleLoading = (popupSelector) => {
    this._saveButton = document.querySelector(popupSelector).querySelector(selectors.submitButtonSelector);
    this._saveButtonText = this._saveButton.textContent;
    this._saveButton.textContent = "Сохранение...";
  };
  hiddenLoading = () => {
    this._saveButton.textContent = this._saveButtonText;
  };
  _submitPopup = (evt) => {
    evt.preventDefault();
    this._formSubmitHandler(this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._submitPopup);
  }

  open() {
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
