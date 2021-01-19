import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
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
        this._handleFormSubmit(this._getInputValues());
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
}

