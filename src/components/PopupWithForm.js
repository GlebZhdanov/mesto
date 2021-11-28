import { Popup } from './Popup.js';

export class PopupWithForm extends Popup{
  constructor({popupSelector, formSubmit}) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
    this._clickFormSubmit = this._submitClick.bind(this);
    this._inputList = this._form.querySelectorAll('.popup__item');
    this._sumbitButton = this._popup.querySelector('.popup__buttom');
  }

  _getInputValues() {
    const formData = {}
    this._inputList.forEach(input => {
      formData[input.name] = input.value
    })
    return formData
  }

  _submitClick(evt) {
    evt.preventDefault()
    this._formSubmit(this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._clickFormSubmit)
}

  isLoading(boolean) {
    if (boolean === true) {
      this._sumbitButton.textContent = 'Сохранение...'
    } else {
      this._sumbitButton.textContent = 'Сохранить'
    }
  }

  close() {
    this._form.reset()
    super.close()
  }
}
