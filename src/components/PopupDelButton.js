import Popup from './Popup.js';

export default class PopupDelButton extends Popup {
    constructor({handleFormSubmit, dataCard}, popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._dataCard = dataCard;
    }

    _getInputValues() {
        const inputValuesList = this._popupElement.querySelectorAll('.popup__input');
        const valuesList = {}
        inputValuesList.forEach((item) => {
            valuesList[item.name] = item.value
        })
        return valuesList
    }

    _handlerSubmitButton(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._dataCard);
        this.close()
    }

    setEventListeners() {
        super._setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {this._handlerSubmitButton(evt)})
    }

    close() {
        super.close()
        this._popupForm.reset()
    }

    del(cardElem) {
        cardElem.remove()
    }
}