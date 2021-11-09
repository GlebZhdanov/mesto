export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._listenerBind = this._handleEscClose.bind(this)
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._listenerBind);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._listenerBind);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners(item) {
    item.addEventListener('click', () => {
      this.close()
    })
    document.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close()
    }
    })

  }

}
