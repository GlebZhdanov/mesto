export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._linkHandleEscClose = this._handleEscClose.bind(this)
    this._linkHandleClickClose = this._handleClickClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._linkHandleEscClose);
  }

  close() {
    document.removeEventListener('keydown', this._linkHandleEscClose)
    this._popup.classList.remove('popup_opened');

  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__buttom-close')) {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._linkHandleClickClose)
  }
}
