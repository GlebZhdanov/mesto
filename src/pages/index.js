import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo} from '../components/UserInfo.js'
import { Section } from '../components/Section.js';
import '../pages/index.css';
import { title,
  profileSubtitle,
   popupEdit,
   popupCard,
   popupImage,
   popupEditForm,
   popupCardForm,
   openPopupButton,
   openPopupCardButton,
   popupItem,
   popupItemSubtitle,
   cardNameInput,
   cardLinkInput,
   listCard,
   initialCards,
   validationConfig
  } from '../utils/constants.js';

const validatorEditProfile = new FormValidator(validationConfig, popupEditForm);
const validatorAddCard = new FormValidator(validationConfig, popupCardForm);

const popupOpenImage = new PopupWithImage(popupImage);

const editProfile = new PopupWithForm({
  popupSelector : popupEdit,
  formSubmit : (inputValues) => {
  dataProfil.setUserInfo(inputValues)
  editProfile.close()
  },
  })

const dataProfil = new UserInfo({
  nameSelector: title,
  infoSelector: profileSubtitle,
})

openPopupButton.addEventListener('click', () => {
  const dataEditProfile = dataProfil.getUserInfo()
  validatorEditProfile.resetForm();
  validatorEditProfile.activateButton();
  popupItem.value = dataEditProfile.name
  popupItemSubtitle.value = dataEditProfile.info
  editProfile.open()
  editProfile.setEventListeners()
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

const cardItem = new PopupWithForm({
  popupSelector : popupCard,
    formSubmit: (data) => {
      const addCard = createCard(data);
      list.addItem(addCard);
      cardItem.close()
   },
})

openPopupCardButton.addEventListener('click', () => {
  cardItem.open();
  validatorAddCard.resetForm()
  cardItem.setEventListeners()
  validatorAddCard.disableButton();
})


const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
}

enableValidation(validationConfig)
