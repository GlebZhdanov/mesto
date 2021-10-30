import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { closePopup, openPopup, closeByEscape } from './utils.js';
import { FormValidator } from './FormValidator.js';

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

const validatorEditProfile = new FormValidator(validationConfig, popupEditForm)
const validatorAddCard = new FormValidator(validationConfig, popupCardForm)

openPopupButton.addEventListener('click', () => {
  openPopup(popupEdit)
  validatorEditProfile.resetForm();
  popupItem.value = title.textContent;
  popupItemSubtitle.value = profileSubtitle.textContent;
});

closePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit)
});

openPopupCardButton.addEventListener('click', () => {
  openPopup(popupCard)
  validatorAddCard.disabledButton();
  validatorAddCard.resetForm();
});

closePopupCard.addEventListener('click', () => {
  closePopup(popupCard)
});

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage)
});

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
  return card;
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

const closeByOverlayClick = () => {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target)
  }
  })
}

closeByOverlayClick()

const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
}

enableValidation(validationConfig)
