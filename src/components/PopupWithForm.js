import { Popup } from './Popup.js';

export class PopupWithForm extends Popup{
  constructor({popupSelector, formSubmit}) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
    this._clickFormSubmit = this._submitClick.bind(this);
    this._inputList = this._form.querySelectorAll('.popup__item')
  }

  _getInputValues() {
    this._formData = {}
    this._inputList.forEach(input => {
      this._formData[input.name] = input.value
    })
    console.log(this._formData)
    return this._formData
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
    super.close()
  }
}
