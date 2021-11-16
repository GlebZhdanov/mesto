export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._userName = nameSelector;
    this._userInfo = infoSelector;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }

  setUserInfo({ 'text' : name, 'subtitle' : info }) {
    this._userName.textContent = name
    this._userInfo.textContent = info
  }
}
