import { data } from "browserslist";
import { Popup } from "./Popup";

export class Card {
  constructor( {data, handleCardClick, handleDeleteCard, handleLikeClick}, cardSelector){
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._userIdCurrent = data.currentUser;
    this._owner = data.owner
    this._cardSelector = cardSelector;
    this._handleDeleteCard = handleDeleteCard
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__group')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._likeCounter = this._element.querySelector('.elements__count-likes')
    const cardImage = this._element.querySelector('.elements__image');
    this._likeCounter.textContent = this._likes.length
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._deleteButtomCard()
    this._setEventListeners();
    this._updateLikes()
    return this._element;
}

  _setEventListeners() {
    this._element.querySelector('.elements__vector').addEventListener('click', () => this._handleLikeClick(this));
    this._element.querySelector('.elements__button-delete').addEventListener('click', () => this._handleDeleteCard(this));
    this._element.querySelector('.elements__image').addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
    });
  }

  isLiked() {
   return this._likes.some(user => user._id === this._userIdCurrent)
  }

  setLikes(dataLikes) {
    this._likes = dataLikes;
    this._updateLikes()
  }

  _updateLikes() {
    if(this.isLiked()){
      this._element.querySelector('.elements__vector').classList.add('elements__vector-active');
    } else {
      this._element.querySelector('.elements__vector').classList.remove('elements__vector-active');
    }
  }

  getLikes(data) {
    this._likeCounter.textContent = data.length
  }

  _deleteButtomCard() {
    if (this._userIdCurrent !== this._owner._id) {
      this._element.querySelector('.elements__button-delete').classList.add('elements__button-delete_none');
    }
  }

  deleteCard() {
    this._element.remove()
  }
}
