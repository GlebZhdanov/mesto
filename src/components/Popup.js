export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._linkHandleEscClose = this._handleEscClose.bind(this)
    this._linkHandleClickClose = this._handleClickClose.bind(this)
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._linkHandleEscClose);
    this.setEventListeners()
  }

  close() {
    document.removeEventListener('keydown', this._linkHandleEscClose)
    document.removeEventListener('click', this._linkHandleClickClose)
    this._popupSelector.classList.remove('popup_opened');

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
    document.addEventListener('mousedown', this._linkHandleClickClose)
  }
}
