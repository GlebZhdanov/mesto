import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._modalImage = this._popupSelector.querySelector('.popup__image')
    this._modalCaption = this._popupSelector.querySelector('.popup__place')
  }

  open(data) {
    super.open()
    this._modalImage.src = data.link
    this._modalCaption.textContent = data.name
  }
}
