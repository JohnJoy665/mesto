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
        return newCard
    }
}

