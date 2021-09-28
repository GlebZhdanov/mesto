//Переменные на popup профиля

let title = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

// Переменные на действие попапов
let popup = document.querySelector('.popup')

let popupEdit = document.querySelector('.popup_edit-profile');
let popupCard = document.querySelector('.popup_add-card');
let popupImage = document.querySelector('.popup_image-card');

let openPopupButton = document.querySelector('.profile__edit-button');
let openPopupCardButton = document.querySelector('.profile__button');

let closePopupEdit = popupEdit.querySelector('.popup__buttom-close');
let closePopupCard = popupCard.querySelector('.popup__buttom-close');
let closePopupImage = popupImage.querySelector('.popup__buttom-close');

let formEdit = popupEdit.querySelector('.popup__form');
let formCard = popupCard.querySelector('.popup__form');

let popupImagePlace = popupImage.querySelector('.popup__place')
let popupImageOpen = popupImage.querySelector('.popup__image')

// Инпуты двух форм
let popupItem = document.querySelector('.popup__item_title_active');
let popupItemSubtitle = document.querySelector('.popup__item_subtitle_active');

let popupItemAdd = popupCard.querySelector('.popup__item_title_card');
let popupItemUrlAdd = popupCard.querySelector('.popup__item_url_card');


//Реализация редактирования профиля
chekPopup = (popup) => {
  if (!popup.classList.contains('popup_opened')) {
  }
    popup.classList.toggle('popup_opened');
}
popupItem.value = title.textContent;
popupItemSubtitle.value = profileSubtitle.textContent;

openPopupButton.addEventListener('click', () => {
  chekPopup(popupEdit)
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
    renderCard({name: popupItemAdd.value, link: popupItemUrlAdd.value})
    chekPopup (popupCard);
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
  return cardElement;
}

initialCards.forEach((data) => {
  renderCard(data)
})
// Реализация закрытия popup на клавишу Esc и на клик
document.addEventListener('keydown', function (evt){
  if (evt.key === 'Escape'){
    popupEdit.classList.remove('popup_opened');
    popupCard.classList.remove('popup_opened');
    popupImage.classList.remove('popup_opened');
  }
})

document.addEventListener('click', function(event){
  if (event.target.classList.contains('popup')){
    popupEdit.classList.remove('popup_opened');
    popupCard.classList.remove('popup_opened');
    popupImage.classList.remove('popup_opened');
  }
})
