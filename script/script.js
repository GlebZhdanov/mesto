import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { closePopup, openPopup, closeByEscape } from './utils.js';

const title = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupEdit = document.querySelector('.popup_edit-profile');
const popupCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image-card');

const openPopupButton = document.querySelector('.profile__edit-button');
const openPopupCardButton = document.querySelector('.profile__button');

const closePopupEdit = popupEdit.querySelector('.popup__buttom-close');
const closePopupCard = popupCard.querySelector('.popup__buttom-close');
const closePopupImage = popupImage.querySelector('.popup__buttom-close');

const formEdit = popupEdit.querySelector('.popup__form');
const formCard = popupCard.querySelector('.popup__form');

const popupItem = document.querySelector('.popup__item_title_active');
const popupItemSubtitle = document.querySelector('.popup__item_subtitle_active');

const popupItemAdd = popupCard.querySelector('.popup__item_title_card');
const popupItemUrlAdd = popupCard.querySelector('.popup__item_url_card');
const popupButton = popupCard.querySelector('.popup__buttom_card');

const listCard = document.querySelector('.elements')


openPopupButton.addEventListener('click', () => {
  openPopup(popupEdit)
  popupItem.value = title.textContent;
  popupItemSubtitle.value = profileSubtitle.textContent;
});

closePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit)
});

openPopupCardButton.addEventListener('click', () => {
  openPopup(popupCard)
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

const disabledButton = () => {
popupButton.classList.add('popup__button_disabled')
popupButton.disabled = true;
}

formCard.addEventListener ('submit',
  function(event,) {
    event.preventDefault();
    const card = new Card({name: popupItemAdd.value, link: popupItemUrlAdd.value}, '.template-card');
    pasteCard(card.generateCard())
    closePopup(popupCard);
    popupItemAdd.value = "";
    popupItemUrlAdd.value = "";
    disabledButton()
}
);

initialCards.forEach((data) => {
  const card = new Card (data, '.template-card');
  const CardElement = card.generateCard();
  pasteCard(CardElement);
})

const closePopupClick = () => {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target)
  }
  })
}

closePopupClick()

const chekInput = () => {
  if (popupItemAdd.value === "") {
    disabledButton()
  }
}

chekInput()
