export class UserInfo {
  constructor({ nameSelector, infoSelector, userAvatar }) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(userAvatar)
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name
    this._userInfo.textContent = data.about
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar
  }
}
