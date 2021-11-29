import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import { UserInfo} from '../components/UserInfo.js'
import { Section } from '../components/Section.js';
import '../pages/index.css';
import {
  title,
  profileSubtitle,
  popupEdit,
  popupCard,
  popupImage,
  PopupAvatar,
  openPopupAvatar,
  popupEditForm,
  popupCardForm,
  popupAvatarForm,
  avatarImage,
  popupCardDelete,
  openPopupButton,
  openPopupCardButton,
  popupItem,
  popupItemSubtitle,
  listCard,
  validationConfig
  } from '../utils/constants.js';

const validatorEditProfile = new FormValidator(validationConfig, popupEditForm);
const validatorAddCard = new FormValidator(validationConfig, popupCardForm);
const validatorAddAvatar = new FormValidator(validationConfig, popupAvatarForm);
const cardDelete = new PopupWithSubmit(popupCardDelete);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: 'b725fbaf-4205-4fab-8325-c71ecb1c6595',
    'Content-Type' : 'application/json'
  }
})

let userId

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([data, dataCards]) => {
  dataProfil.setUserInfo(data);
  userId = data._id;
  list.renderItems(dataCards)
  })
  .catch(err => {
    console.log(`Ошибка получения данных: ${err}`)
  });

const popupOpenImage = new PopupWithImage(popupImage);
popupOpenImage.setEventListeners()

const dataProfil = new UserInfo({
  nameSelector: title,
  infoSelector: profileSubtitle,
  userAvatar: avatarImage,
})
const editProfile = new PopupWithForm({
  popupSelector : popupEdit,
  formSubmit : (data) => {
    editProfile.renderLoading(true)
    api.patchUserInfo(data)
    .then((data) => {
      dataProfil.setUserInfo(data)
      editProfile.close()
    })
    .catch(err => console.log(`Ошибка обновления данных: ${err}`))
    .finally(() => {
      editProfile.renderLoading(false)
    })
  },
  })
editProfile.setEventListeners()

const editAvatar = new PopupWithForm({
  popupSelector : PopupAvatar,
  formSubmit : (data) => {
    editAvatar.renderLoading(true)
    api.uploadAvatar(data)
      .then((data) => {
        dataProfil.setUserInfo(data);
        editAvatar.close();
      })
    .catch(err => console.log(`Ошибка аватара: ${err}`))
    .finally(() => {
      editAvatar.renderLoading(false)
    })
  },
})
editAvatar.setEventListeners()

const popupAvatarEdit = () => {
  editAvatar.open();
  validatorAddAvatar.resetForm();
  validatorAddAvatar.disableButton();
}

openPopupAvatar.addEventListener('click', popupAvatarEdit)

const openPopupEdit = () => {
  const dataEditProfile = dataProfil.getUserInfo()
  validatorEditProfile.resetForm();
  validatorEditProfile.activateButton();
  popupItem.value = dataEditProfile.name
  popupItemSubtitle.value = dataEditProfile.about
  editProfile.open()
}

openPopupButton.addEventListener('click', openPopupEdit)

// Код для карточек
const list = new Section({
  renderer: (dataCards) => {
  const element = createCard(dataCards)
  list.addItem(element)
  }
}, listCard)

const createCard = (data) => {
  const card = new Card({
    data:{...data, currentUser : userId},
    handleCardClick: () => {
      popupOpenImage.open(data)
    },
    handleDeleteCard: () => {
      cardDelete.setSubmitAction(() => {
        api.deleteCard(data)
        .then(() => {
          card.deleteCard()
          cardDelete.close()
        })
        .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
      })
      cardDelete.open()
    },
    handleLikeClick: (data) => {
      if(card.isLiked()){
        api.deleteCardLike(data.id)
        .then(dataLikes => {
          card.updateLikes(dataLikes.likes)
        })
        .catch(err => console.log(`Ошибка удаления лайка: ${err}`))
      } else {
        api.putCardLike(data.id)
        .then(dataLikes => {
          card.updateLikes(dataLikes.likes)
        })
        .catch(err => console.log(`Ошибка установки лайка: ${err}`))
      }
    }
  }, '.template-card');
  const cardElement = card.generateCard();
  return cardElement;
}
cardDelete.setEventListeners()

const cardItem = new PopupWithForm({
  popupSelector : popupCard,
    formSubmit: (item) => {
      cardItem.renderLoading(true)
      api.postNewCard(item)
      .then((res => {
        const addCard = createCard(res);
        list.addItem(addCard);
        cardItem.close()}))
        .catch(err => console.log(`Ошибка создания карточки: ${err}`))
        .finally(() => {
          cardItem.renderLoading(false)
        })
   },
})

cardItem.setEventListeners()

openPopupCardButton.addEventListener('click', () => {
  cardItem.open();
  validatorAddCard.resetForm()
  validatorAddCard.disableButton();
})


const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
  validatorAddAvatar.enableValidation()
}

enableValidation(validationConfig)



