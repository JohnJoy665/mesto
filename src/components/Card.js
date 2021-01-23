export default class Card {

    // конструктор - принимает из массива имя, ссылку и селектор
    constructor({ userId, data, handleOpenCard, addLike, removeLike, handleDelButton}, cardSelector) {
        this._userId = userId;
        this._name = data.name;
        this._link = data.link;
        this._createdAt = data.createdAt;
        this._likes = data.likes; // массив тех, кто лайкнул карточку
        this._owner = data.owner;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handleOpenCard = handleOpenCard;
        this._data = data;
        this._likeIndex = this._likes.length;
        this._addLike = addLike;
        this._removeLike = removeLike;
        this._handleDelButton = handleDelButton;
    }

    // создает шаблон карточки
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
            .content.querySelector('.places__card')
            .cloneNode(true);
        return cardElement
    }

    _toggleDelButton() {
        this._cardDeletButton = this._element.querySelector('.places__del-button')
        if (this._owner._id === this._userId) {
            this._cardDeletButton.classList.add('places__del-button_is-visible')
        }
    }

    //при отрисовке всех карточек
    _renderLikes(likes) {
        if (likes.some((element) => {
            return element._id === this._userId
        })) {
            this._element.querySelector('.places__like').classList.add('places__like_is-active')
        }
    }

    _indexLikes(index) {
        this._element.querySelector('.places__like-index').textContent = index
    }


    // наполняет шаблон данными. Навешивает слушателей
    generateCard() {
        this._element = this._getTemplate();
        this._toggleDelButton()
        this._indexLikes(this._likeIndex)
        this._renderLikes(this._likes)
        this._elementPicture = this._element.querySelector('.places__picture');
        this._elementPicture.src = this._link;
        this._element.querySelector('.places__title').textContent = this._name;
        this._elementPicture.alt = this._name;

        this._setListeners();
        return this._element
    }

    _setListeners() {
        this._element.querySelector('.places__del-button').addEventListener('click', () => this._handleDelete());
        this._elementPicture.addEventListener('click', () => this._handleOpenCard(this._name, this._link));
        this._element.querySelector('.places__like').addEventListener('click', () => this._handleLike());
    }

    _handleLike() {
        this._checkLike(this._data.likes)
       
    }

    _checkLike(likes) {
        if (likes.some((element) => {
            return element._id === this._userId
        })) {
            this._removeLike(this._id)

        } else {
            this._addLike(this._id)
            
        }
    }

    setLike(data) {
        this._indexLikes(data.likes.length)
        this._element.querySelector('.places__like').classList.add('places__like_is-active')
        this._data = data
    }

    unSetLike(data) {
        this._indexLikes(data.likes.length)
        this._element.querySelector('.places__like').classList.remove('places__like_is-active')
        this._data = data
    }

    _handleDelete() {
        this._handleDelButton(this._id, this._element)
    }

}
