import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._fullSizeImg = this._popupElement.querySelector('.popup__full-size-img')
    }

    open(nameCard, linkCard) {
        super.open()
        this._fullSizeImg.src = linkCard
        this._fullSizeImg.alt = nameCard
        this._popupElement.querySelector('.popup__title_galary').textContent = nameCard
    }
}
