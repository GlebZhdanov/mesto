import { initialCards } from './cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js'
import { PopupWithImage } from '../components/PopupWithImage.js';

const title = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupEdit = document.querySelector('.popup_edit-profile');
const popupCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image-card');

const popupEditForm = popupEdit.querySelector('.popup__form');
const popupCardForm = popupCard.querySelector('.popup__form');

const openPopupButton = document.querySelector('.profile__edit-button');
const openPopupCardButton = document.querySelector('.profile__button');

const closePopupEdit = popupEdit.querySelector('.popup__buttom-close');
const closePopupCard = popupCard.querySelector('.popup__buttom-close');
const closePopupImage = popupImage.querySelector('.popup__buttom-close');

const formEdit = popupEdit.querySelector('.popup__form');
const formCard = popupCard.querySelector('.popup__form');

const popupItem = document.querySelector('.popup__item_title_active');
const popupItemSubtitle = document.querySelector('.popup__item_subtitle_active');

const popupImagePlace = popupImage.querySelector('.popup__place')
const popupImageOpen = popupImage.querySelector('.popup__image')

const cardNameInput = popupCard.querySelector('.popup__item_title_card');
const cardLinkInput = popupCard.querySelector('.popup__item_url_card');

const listCard = document.querySelector('.elements');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__buttom',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

const popupOpen = new Popup(popupEdit);
const popupOpenCard = new Popup(popupCard);
const popupOpenImage = new PopupWithImage(popupImage)


// cardImage.addEventListener('click', () => {
//   popupOpenImage.open()
// });

openPopupButton.addEventListener('click', () => {
  popupOpen.open()
});

openPopupCardButton.addEventListener('click', () => {
  popupOpenCard.open()
});

const popupClose = new Popup(popupEdit);
const popupCloseCard = new Popup(popupCard);

popupClose.setEventListeners(closePopupEdit);
popupCloseCard.setEventListeners(closePopupCard);

// cardImage.addEventListener('click', () => {
//   openPopup(popupImage)
//   popupImagePlace.textContent = cardTitle.textContent;
//   popupImageOpen.src = cardImage.src;

// });

// _openImagePopup() {
//   popupImagePlace.textContent = this._name;
//   popupImageOpen.src = this._link;
//   popupImageOpen.alt = this._name;
//   // openPopup(popupImage);
// }

const validatorEditProfile = new FormValidator(validationConfig, popupEditForm);
const validatorAddCard = new FormValidator(validationConfig, popupCardForm);

// взять методы из кода попапа
// openPopupButton.addEventListener('click', () => {
//   openPopup(popupEdit)
//   validatorEditProfile.resetForm();
//   validatorEditProfile.activationButton();
//   popupItem.value = title.textContent;
//   popupItemSubtitle.value = profileSubtitle.textContent;
// });

// openPopupCardButton.addEventListener('click', () => {
//   openPopup(popupCard)
//   validatorAddCard.disabledButton();
//   validatorAddCard.resetForm();
// });


const pasteCard = (data) => {
  listCard.prepend(data);
}

formEdit.addEventListener ('submit',
  function(event) {
    event.preventDefault();
    title.textContent = popupItem.value;
    profileSubtitle.textContent =  popupItemSubtitle.value;
    closePopup(popupEdit);
}
);

const createCard = (data, cardSelector) => {
  const card = new Card(data, cardSelector).generateCard();
  return card
}

formCard.addEventListener ('submit',
  function(event,) {
    event.preventDefault();
    const card = createCard({name: cardNameInput.value, link: cardLinkInput.value}, '.template-card');
    pasteCard(card)
    closePopup(popupCard);
    cardNameInput.value = "";
    cardLinkInput.value = "";
    validatorAddCard.disabledButton();
}
);

initialCards.forEach((data) => {
  const card = createCard(data, '.template-card');
  pasteCard(card);
})

const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
}

enableValidation(validationConfig)
