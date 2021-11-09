import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    // this._modalImage = this._popupSelector.querySelector('.elements__image')
    // this._modalCaption = this._popupSelector.querySelector('.elements__title')
  }

  open() {
    super.open()
    // this._modalImage.src = data.link
    // this._modalCaption.textContent = data.name
    // this._modalImage.alt = `Фотография места. Название: ${data.name}`
  }
}
