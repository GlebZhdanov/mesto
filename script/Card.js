import { closePopup, openPopup, closeByEscape } from './utils.js';
export class Card {
  constructor(data, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__group')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;

    const cardImage = this._element.querySelector('.elements__image');

    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
}

  _setEventListeners() {

    this._element.querySelector('.elements__vector').addEventListener('click', (evt) => {evt.target.classList.toggle('elements__vector-active');
    });

    this._element.querySelector('.elements__button-delete').addEventListener('click', (evt) => {evt.target.closest('.elements__group').remove()
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
    this._cardOpenPopup(this._name, this._link);
    });
  }

_cardOpenPopup() {
  const popupImage = document.querySelector('.popup_image-card');
  const popupImagePlace = popupImage.querySelector('.popup__place')
  const popupImageOpen = popupImage.querySelector('.popup__image')

  popupImagePlace.textContent = this._name;
  popupImageOpen.src = this._link;
  openPopup(popupImage);
}
}
