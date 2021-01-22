export default class Section {
    constructor({data, renderer}, cardSelector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._cardSelector = cardSelector
    }

    addItem(elem) {
        this._cardSelector.append(elem)
    }

    addItemToStart(elem) {
        this._cardSelector.prepend(elem)
    }

    renderCards(cardList) {
        cardList.forEach(element => {
            this._renderer(element)
        });
    }
}
