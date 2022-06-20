export default class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._submitButton = form.querySelector(selectors.submitButtonSelector);
  }

  enableValidation = () => {
    this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
    this._inputList.map((input) => this._setEventListeners(input));
  };

  toggleButtonState = () => {
    const isInvalid = this._hasInvalidInput();
    if (isInvalid) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._selectors.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((input) => !input.validity.valid);
  };

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
    this.toggleButtonState();
  };

  _showInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._selectors.errorClass);
  };

  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = undefined;
  };

  _setEventListeners = (input) => {
    input.addEventListener("input", () => {
      this._checkInputValidity(input);
    });
  };
}
