export const title = ('.profile__title');
export const profileSubtitle = ('.profile__subtitle');
const cardTemplate = document.querySelector('.template-card').content;
const cardElement = cardTemplate.querySelector('.elements__group').cloneNode(true);
export const cardDeleteButton = cardElement.querySelector('.elements__button-delete')

export const popupEdit = '.popup_edit-profile';
export const popupCard = '.popup_add-card';
export const popupImage = '.popup_image-card';
export const popupCardDelete = '.popup_delete-card';
export const PopupAvatar = '.popup__avatar-profile';


export const popupEditForm = document.querySelector('.popup__form-profile');
export const popupCardForm = document.querySelector('.popup__form-card');
export const popupAvatarForm = document.querySelector('.popup_form-avatar');
export const avatarImage = '.profile__image';

export const openPopupButton = document.querySelector('.profile__edit-button');
export const openPopupCardButton = document.querySelector('.profile__button');
export const openPopupAvatar = document.querySelector('.profile__edit-avatar');


export const popupItem = document.querySelector('.popup__item_title_active');
export const popupItemSubtitle = document.querySelector('.popup__item_subtitle_active');

export const cardNameInput = document.querySelector('.popup__item_title_card');
export const cardLinkInput = document.querySelector('.popup__item_url_card');

export const cardAvatarInput = document.querySelector('.popup__item_url_avatar');

export const listCard = ('.elements');

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


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__buttom',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};
