import {keyEscape} from '../utils/constants.js'

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button')
    }

    open() {
        this._popupElement.classList.add('popup_visible')
        this._setEventListeners()
    }

    close() {
        console.log('я тут')
        this._popupElement.classList.remove('popup_visible')
        // document.removeEventListener('keydown', this._checkPressEsc.bind(this)) - не могу найти тот объект, с которого необходимо убирать слушателя!!!
    }

    _checkPressEsc(evt) {
        if (evt.keyCode === keyEscape) {
            this.close()
        }
    }

    _checkOverlay(evt) {
        if (evt.target.classList.contains('popup_visible')) {
            this.close()
        }
    }

    _setEventListeners() {
        document.addEventListener('mousedown', this._checkOverlay.bind(this))
        document.addEventListener('keydown', this._checkPressEsc.bind(this))
        this._closeButton.addEventListener('click', () => {
            this.close()
        })
    }


}
