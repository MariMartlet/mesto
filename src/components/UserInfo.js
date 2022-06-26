export default class UserInfo {
  constructor(userNameSelector, userStatusSelector) {
    this._name = document.querySelector(userNameSelector);
    this._status = document.querySelector(userStatusSelector);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      status: this._status.textContent,
    };
    return data;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._status.textContent = data.status;
  }
}
