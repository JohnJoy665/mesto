export default class Card {

    constructor(initialCards, cardTemplate) {
        this._initialCards = initialCards;
        this._cardTemplate = cardTemplate;
    }

    createCard() {
        const newCard = this._cardTemplate.cloneNode(true);
        newCard.querySelector('.places__picture').src = this._initialCards.link;
        newCard.querySelector('.places__title').textContent = this._initialCards.name;
        newCard.querySelector('.places__picture').alt = this._initialCards.name;
        newCard.querySelector('.places__del-button').addEventListener('click', this.handleDelete);
        newCard.querySelector('.places__like').addEventListener('click', this.handleLike);
        newCard.querySelector('.places__picture').addEventListener('click', this.openGalaryModal);
        return newCard
    }

    addCardToEnd() {
        let container = document.querySelector('.places__cards')
        container.append(this.createCard());
        return container
    }

    openGalaryModal(evt) {
        let popupGalary = document.querySelector('.popup_galary');
        console.log('вот евт - ' + evt.target)
        popupGalary.classList.add('popup_visible'); // вместо модал - evt
        popupGalary.querySelector('.popup__full-size-img').src = evt.target.getAttribute('src')
        popupGalary.querySelector('.popup__title_galary').textContent = evt.target.parentElement.querySelector('.places__title').textContent
    }

    handleDelete(evt) {
        console.log('handleDelete')
        evt.target.parentNode.remove();
    }
    handleLike(evt) {
        console.log('handleLike')
        evt.target.classList.toggle('places__like_is-active');
    }
}