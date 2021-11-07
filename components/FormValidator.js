export class FormValidator {
  constructor(config, formElement) {
    this._formElement= formElement;
    this._config = config;
    this._inputList = formElement.querySelectorAll(config.inputSelector);
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
      button.classList.remove(this._config.inactiveButtonClass)
      button.disabled = false;
    } else {
      button.classList.add(this._config.inactiveButtonClass)
      button.disabled = true;
    }
  }

  _setEventListener (formElement, config) {
    const inputList = formElement.querySelectorAll(this._config.inputSelector);
    const submitButton = formElement.querySelector(this._config.submitButtonSelector);
    Array.from(this._inputList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isFormValid = formElement.checkValidity();
        this._checkInputValidity(formElement, inputElement, config);
        this._toggleButtonState(submitButton, isFormValid, config);
      })
    })

    this._formElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
    })
  }

  disabledButton() {
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    submitButton.classList.add(this._config.inactiveButtonClass)
    submitButton.disabled = true;
  }

  activationButton() {
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
      submitButton.classList.remove(this._config.inactiveButtonClass)
      submitButton.disabled = false;
  }

  enableValidation() {
    const forms = this._formElement;
    this._setEventListener(forms, this._config)
  }

  resetForm() {
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideError(errorElement, inputElement)
      inputElement.value = "";
    })
  }
}





