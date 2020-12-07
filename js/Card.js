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

    handleDelete(evt) {
        console.log('handleDelete')
        evt.target.parentNode.remove();
    }
    handleLike(evt) {
        console.log('handleLike')
        evt.target.classList.toggle('places__like_is-active');
    }
    openGalaryModal() {
        console.log('openGalaryModal')
    }
}

