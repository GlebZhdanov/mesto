export class FormValidator {
  constructor(config, formElement) {
    this._formElement= formElement;
    this._config = config;
    this._inputList = formElement.querySelectorAll(config.inputSelector);
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }
  _showError(errorElement, inputElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideError(errorElement, inputElement) {
    errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity (formElement, inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (isInputNotValid ) {
      this._showError(errorElement, inputElement)
    } else {
      this._hideError(errorElement, inputElement)
    }
  }
  _toggleButtonState(button, isActive) {
    if (isActive) {
      this.activateButton();
    } else {
      this.disableButton();
    }
  }

  _setEventListener (formElement, config) {
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    Array.from(this._inputList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isFormValid = this._formElement.checkValidity();
        this._checkInputValidity(formElement, inputElement, config);
        this._toggleButtonState(submitButton, isFormValid, config);
      })
    })
  }

  disableButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass)
    this._submitButton.disabled = true;
  }

  activateButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass)
    this._submitButton.disabled = false;
  }

  enableValidation() {
    const forms = this._formElement;
    this._setEventListener()
  }

  resetForm() {
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideError(errorElement, inputElement)
    })
  }
}





