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

setUserInfo({ name, about, avatar}) {
    this._userName.textContent = name
    this._userInfo.textContent = about
    this._userAvatar.src = avatar
  }

}
