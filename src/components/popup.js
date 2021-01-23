import {keyEscape} from '../utils/constants.js'

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button')
        this._checkOverlay = this._checkOverlay.bind(this)
        this._checkPressEsc = this._checkPressEsc.bind(this)
    }

    open() {
        this._popupElement.classList.add('popup_visible')
        document.addEventListener('keydown', this._checkPressEsc)
    }
    
    close() {
        this._popupElement.classList.remove('popup_visible')
        document.removeEventListener('keydown', this._checkPressEsc)
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
        this._popupElement.addEventListener('mousedown', this._checkOverlay)
        this._closeButton.addEventListener('click', () => {
            this.close()
        })
    }
}
