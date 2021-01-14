import {keyEscape} from '../utils/constants.js'

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this._closeButton = this._popupSelector.querySelector('.popup__close-button')
    }

    open() {
        this._popupSelector.classList.add('popup_visible')
        this._setEventListeners()
    }

    close() {
        console.log('я тут')
        this._popupSelector.classList.remove('popup_visible')
    }

    _checkPressEsc(evt) {
        if (evt.keyCode === keyEscape) {
            this.close()
        }
    }

    _setEventListeners() {
        document.addEventListener('keydown', this._checkPressEsc.bind(this))
        this._closeButton.addEventListener('click', () => {
            this.close.bind(this)
        })
    }


}
