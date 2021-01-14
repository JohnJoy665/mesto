export default class Card {

    // конструктор - принимает из массива имя, ссылку и селектор
    constructor(name, link, cardSelector, openGalaryModal) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._openGalaryModal = openGalaryModal;
    }

    // создает шаблон карточки
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content.querySelector('.places__card')
        .cloneNode(true);
        return cardElement
    }

    // наполняет шаблон данными. Навешивает слушателей
    generateCard() {
        this._element = this._getTemplate();
        this._elementPicture = this._element.querySelector('.places__picture');
        this._elementPicture.src = this._link;
        this._element.querySelector('.places__title').textContent = this._name;
        this._elementPicture.alt = this._name;
        this._setListeners();
        return this._element
    }

    _setListeners() {
        this._element.querySelector('.places__del-button').addEventListener('click', () => this._handleDelete());
        this._element.querySelector('.places__like').addEventListener('click', () => this._handleLike());
        this._elementPicture.addEventListener('click', () => this._openGalary());
    }

    _openGalary() {
        this._openGalaryModal(this._element)
    }

    _handleDelete() {
        this._element.remove();
    }

    _handleLike() {
        this._element.querySelector('.places__like').classList.toggle('places__like_is-active');
    }
}