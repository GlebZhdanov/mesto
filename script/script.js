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


//Реализация редактирования профиля
chekPopup = (popup) => {
    popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', () => {
  chekPopup(popupEdit)
  popupItem.value = title.textContent;
  popupItemSubtitle.value = profileSubtitle.textContent;
});

closePopupEdit.addEventListener('click', () => {
  chekPopup(popupEdit)
});

openPopupCardButton.addEventListener('click', () => {
  chekPopup(popupCard)
});

closePopupCard.addEventListener('click', () => {
  chekPopup(popupCard)
});

closePopupImage.addEventListener('click', () => {
  chekPopup(popupImage)
});


//Реализация sumbit
formEdit.addEventListener ('submit',
  function(event) {
    event.preventDefault();
    title.textContent = popupItem.value;
    profileSubtitle.textContent =  popupItemSubtitle.value;
    chekPopup (popupEdit);
}
);

formCard.addEventListener ('submit',
  function(event) {
    event.preventDefault();
    renderCard({name: popupItemAdd.value, link: popupItemUrlAdd.value});
    chekPopup (popupCard);
    popupItemAdd.value = "";
    popupItemUrlAdd.value = "";
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
    chekPopup(popupImage)
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
