let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__buttom-close');
let popup = document.querySelector('.popup');
let title = document.querySelector('.profile__title');
let popupItem = document.querySelector('.popup__item_title_active');
let popupItemSubtitle = document.querySelector('.popup__item_subtitle_active');
let profileSubtitle = document.querySelector('.profile__subtitle');
let form = document.querySelector('.popup__form')

function chekPopup () {
  if (!popup.classList.contains('popup_opened')) {
    popupItem.value = title.textContent;
    popupItemSubtitle.value = profileSubtitle.textContent;

  }
    popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', chekPopup);
closePopupButton.addEventListener('click', chekPopup);

form.addEventListener ('submit',
  function(event) {
    event.preventDefault();
    title.textContent = popupItem.value;
    profileSubtitle.textContent =  popupItemSubtitle.value;
    chekPopup ();
}
);

