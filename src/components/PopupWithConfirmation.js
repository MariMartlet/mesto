import { selectors } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { confirmSubmitHandler }) {
    super(popupSelector);
    this._confirmSubmitHandler = confirmSubmitHandler;
    this._submit = this._submit.bind(this);
    this._form = this._popup.querySelector(selectors.formSelector);
  }

  open(data) {
    super.open();
    this._data = data;
  }

  _submit(evt) {
    evt.preventDefault();
    this._confirmSubmitHandler(this._data);
    this._form.removeEventListener("submit", this._submit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }

  close() {
    super.close();
  }
}
