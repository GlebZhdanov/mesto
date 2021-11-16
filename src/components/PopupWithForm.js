import { Popup } from './Popup.js';

export class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmit) {
    super(popupSelector)
    this._form = this._popupSelector.querySelector('.popup__form');
    this._formSubmit = formSubmit;
    this._clickFormSubmit = this._submitClick.bind(this);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__item')
    this._formItem = {}
    this._inputList.forEach(input => {
      this._formItem[input.name] = input.value
    })
    return this._formItem
  }

  _submitClick(evt) {
    evt.preventDefault()
    this._formSubmit(this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._clickFormSubmit)
  }

  close() {
    this._form.reset()
    this._form.removeEventListener('submit', this._clickFormSubmit)
    super.close()
  }
}
