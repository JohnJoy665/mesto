import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(imgLink, imgName, popupSelector) {
        super(popupSelector)
        this._imgLink = imgLink
        this._imgName = imgName
    }


    open() {
        super.open()
        this._popupElement.querySelector('.popup__full-size-img').src = this._imgLink
        this._popupElement.querySelector('.popup__full-size-img').alt = this._imgName
        this._popupElement.querySelector('.popup__title_galary').textContent = this._imgName
    }


}



// export const popupGalaryFullSizeImg = popupGalary.querySelector('.popup__full-size-img');
// export const popupGalaryTitleGalary = popupGalary.querySelector('.popup__title_galary');