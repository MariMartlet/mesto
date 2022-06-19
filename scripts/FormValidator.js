export default class FormValidator {
  constructor(formObject) {
    this._formObject = formObject;
  }
  // показываем сообщение об ошибке
  _showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass, ...rest }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  // скрываем сообщение об ошибке
  _hideInputError = (formElement, inputElement, { inputErrorClass, errorClass, ...rest }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };
  // проверяем валидность поля
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  // переключаем состояние кнопки
  _toggleButtonState = (inputList, buttonElement, { inactiveButtonClass, ...rest }) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };
  // показываем или прячем ошибку в зависимости от валидности поля
  _checkInputValidity = (formElement, inputElement, { ...rest }) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
      this._hideInputError(formElement, inputElement, rest);
    }
  };

  _setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement, rest);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, rest);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(inputList, buttonElement, rest);
      });
    });
  };

  enableValidation({ formSelector, fields, ...rest }) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => evt.preventDefault());
      const fieldsetList = Array.from(formElement.querySelectorAll(fields));
      fieldsetList.forEach((fieldSet) => this._setEventListeners(fieldSet, rest));
    });
  }
}
