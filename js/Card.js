export default class Card {

    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content.querySelector('.places__card')
        .cloneNode(true);
        return cardElement
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.places__picture').src = this._link;
        this._element.querySelector('.places__title').textContent = this._name;
        this._element.querySelector('.places__picture').alt = this._name;
        this._element.querySelector('.places__del-button').addEventListener('click', this._handleDelete);
        this._element.querySelector('.places__like').addEventListener('click', this._handleLike);
        this._element.querySelector('.places__picture').addEventListener('click', this._openGalaryModal);
        console.log(this._element)
        return this._element
    }

    _openGalaryModal(evt) {
        let popupGalary = document.querySelector('.popup_galary');
        popupGalary.classList.add('popup_visible');
        popupGalary.querySelector('.popup__full-size-img').src = evt.target.getAttribute('src')
        popupGalary.querySelector('.popup__title_galary').textContent = evt.target.parentElement.querySelector('.places__title').textContent
    }

    _handleDelete(evt) {
        evt.target.parentNode.remove();
    }
    _handleLike(evt) {
        evt.target.classList.toggle('places__like_is-active');
    }
}