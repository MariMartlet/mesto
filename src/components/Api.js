export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  _getData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ой, ошибка:${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._getData(res);
    });
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getData(res);
    });
  }

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.UserPopupName,
        about: data.UserPopupStatus,
      }),
    }).then((res) => {
      return this._getData(res);
    });
  }

  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.userAvatar,
      }),
    }).then((res) => {
      return this._getData(res);
    });
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.UserPopupTitle,
        link: data.UserPopupImage,
      }),
    }).then((res) => {
      return this._getData(res);
    });
  }

  likeCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getData(res);
    });
  }

  dislikeCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getData(res);
    });
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        name: data.UserPopupTitle,
        link: data.UserPopupImage,
      }),
    }).then((res) => {
      return this._getData(res);
    });
  }
}
