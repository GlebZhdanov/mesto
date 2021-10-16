//Переменные на popup профиля

const title = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Переменные на действие попапов

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

const popupImagePlace = popupImage.querySelector('.popup__place')
const popupImageOpen = popupImage.querySelector('.popup__image')

// Инпуты двух форм
const popupItem = document.querySelector('.popup__item_title_active');
const popupItemSubtitle = document.querySelector('.popup__item_subtitle_active');

const popupItemAdd = popupCard.querySelector('.popup__item_title_card');
const popupItemUrlAdd = popupCard.querySelector('.popup__item_url_card');
const popupButton = popupCard.querySelector('.popup__buttom_card');

// Закрытие и открытие попапа

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

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


//Реализация sumbit
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
    renderCard({name: popupItemAdd.value, link: popupItemUrlAdd.value});
    closePopup(popupCard);
    popupItemAdd.value = "";
    popupItemUrlAdd.value = "";
    disabledButton()
}
);

//Добавление карточки
const cardTemplate = document.querySelector('.template-card').content;
const listCard = document.querySelector('.elements')

function renderCard(data) {
// Вставить карточку в DOM
  listCard.prepend(createCard(data));
}

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.elements__group').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image')
  const cardTitle = cardElement.querySelector('.elements__title')
  const cardLikeButton = cardElement.querySelector('.elements__vector')
  const cardDeleteButton = cardElement.querySelector('.elements__button-delete')

// Функции лайка, удаление и открытия карточки
function cardlike () {
  cardLikeButton.classList.toggle('elements__vector-active')
}
  cardLikeButton.addEventListener('click', cardlike);

function cardDelete (event) {
  event.target.closest('.elements__group').remove();
}
  cardDeleteButton.addEventListener('click', cardDelete)

  cardImage.addEventListener('click', () => {
    openPopup(popupImage)
    popupImagePlace.textContent = cardTitle.textContent;
    popupImageOpen.src = cardImage.src;
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  return cardElement;
}

initialCards.forEach((data) => {
  renderCard(data)
})

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

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
