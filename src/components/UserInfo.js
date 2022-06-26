export default class UserInfo {
  constructor({ userName, userStatus }) {
    this._name = userName;
    this._status = userStatus;
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
