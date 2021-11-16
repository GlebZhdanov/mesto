import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo} from '../components/UserInfo.js'
import { Section } from '../components/Section.js';
import '../pages/index.css';

const title = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupEdit = document.querySelector('.popup_edit-profile');
const popupCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image-card');

const popupEditForm = popupEdit.querySelector('.popup__form');
const popupCardForm = popupCard.querySelector('.popup__form');

const openPopupButton = document.querySelector('.profile__edit-button');
const openPopupCardButton = document.querySelector('.profile__button');

const popupItem = document.querySelector('.popup__item_title_active');
const popupItemSubtitle = document.querySelector('.popup__item_subtitle_active');

const cardNameInput = popupCard.querySelector('.popup__item_title_card');
const cardLinkInput = popupCard.querySelector('.popup__item_url_card');

const listCard = document.querySelector('.elements');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.reverse()


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__buttom',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

const validatorEditProfile = new FormValidator(validationConfig, popupEditForm);
const validatorAddCard = new FormValidator(validationConfig, popupCardForm);

const popupOpenImage = new PopupWithImage(popupImage);

const editProfile = new PopupWithForm(popupEdit, (inputValues) => {
  dataProfil.setUserInfo(inputValues);
  editProfile.close();
})

const dataProfil = new UserInfo({
  nameSelector: title,
  infoSelector: profileSubtitle,
})

openPopupButton.addEventListener('click', () => {
  const dataEditProfile = dataProfil.getUserInfo()
  validatorEditProfile.resetForm();
  validatorEditProfile.activationButton();
  popupItem.value = dataEditProfile.name
  popupItemSubtitle.value = dataEditProfile.info
  editProfile.open()
})

const createCard = (item) => {
  const card = new Card({
    data:item,
    handleCardClick: () => {
      popupOpenImage.open(item)
    }
  }, '.template-card');

const cardElement = card.generateCard();
return cardElement;
}

const list = new Section({
  items : initialCards, renderer: (item) => {
    const element = createCard(item)
    list.addItem(element)
  }
}, listCard)
list.renderItems()


const cardItem = new PopupWithForm(popupCard, () => {
  const listItem = {
  name : cardNameInput.value,
  link : cardLinkInput.value,
  }
  const addCard = createCard(listItem);
  list.addItem(addCard);
  cardItem.close()
})

openPopupCardButton.addEventListener('click', () => {
  cardItem.open();
  validatorAddCard.disabledButton();
})


const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
}

enableValidation(validationConfig)
