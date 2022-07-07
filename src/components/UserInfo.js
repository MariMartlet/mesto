export default class UserInfo {
  constructor(userNameSelector, userStatusSelector, userAvatarSelector) {
    this._name = document.querySelector(userNameSelector);
    this._status = document.querySelector(userStatusSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      status: this._status.textContent,
    };
    return data;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._status.textContent = data.about;
  }
}
