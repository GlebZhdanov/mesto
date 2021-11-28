export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

_chekRes(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(console.log(`Ошибка: ${res.status}`))
}

getAllCards() {
  return fetch(`${this._url}/cards`, {
    method: "GET",
    headers: this._headers
  })
  .then(res => {
    return this._chekRes(res)
  })
}

getUserInfo() {
  return fetch(`${this._url}/users/me`, {
    method: "GET",
    headers: this._headers
  })
    .then((res) => {
      return this._chekRes(res)
    })
}

patchUserInfo(data) {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(data)
  })
    .then((res) => {
      return this._chekRes(res)
    })
}

uploadAvatar(data) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(data)
  })
    .then((res) => {
      return this._chekRes(res)
    })
}

postNewCard(data) {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(data)
  })
    .then((res) => {
      return this._chekRes(res)
    })
}

putCardLike(id) {
  return fetch(`${this._url}/cards/likes/${id}`, {
    method: 'PUT',
    headers: this._headers,
  })
    .then((res) => {
      return this._chekRes(res)
    });
}

deleteCardLike(id) {
  return fetch(`${this._url}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: this._headers,
  })
    .then((res) => {
      return this._chekRes(res)
    });
}

deleteCard(data) {
  return fetch(`${this._url}/cards/${data._id}`, {
    method: 'DELETE',
    headers: this._headers
  })
    .then((res) => {
      return this._chekRes(res)
    })
}
}
