import './index.css'


import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

import {
    validationConfig,
    initialCards,
    placesCards,
    profileInfoTitle,
    profileInfoJob,
    profileEditButton,
    profileAddButton,
    popupProfileForm,
    popupProfileInputName,
    popupProfileInputJob,
    popupAddCardForm,
} from '../utils/constants.js'



const validateProfileForm = new FormValidator(validationConfig, popupProfileForm);
validateProfileForm.enableValidation()
const validateAddForm = new FormValidator(validationConfig, popupAddCardForm);
validateAddForm.enableValidation()


// добавление всех карточек из массива на страницу
const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const cardElem = new Card({
            data: item,
            handleOpenCard: (itemCard) => {
                const popupWithImg = new PopupWithImage(itemCard.src, itemCard.alt, '.popup_galary');
                popupWithImg._setEventListeners()
                popupWithImg.open()
            }
        }, '#card')
        const newCard = cardElem.generateCard();
        cardList.addItem(newCard)
    }
}, placesCards)
cardList.renderCards()



// добавление каждой отдельной карточки
const newPopupAddCard = new PopupWithForm({
    handleFormSubmit: (item) => { // здесь хранятся данные карточки для создания
        const newCardPlace = new Section({ // здесь создается новый экземпляр для вставки карточки в верстку
            data:[], // пустой массив
            renderer: () => { // пустая ф-ия
            }
        }, placesCards);
        const newElemCard = new Card({ // вот тут я создаю новую карточку
            data: {name: item['input-title'], link: item['input-link']},
            handleOpenCard: (itemCard) => {
                const popupWithImg = new PopupWithImage(itemCard.src, itemCard.alt, '.popup_galary');
                popupWithImg._setEventListeners()
                popupWithImg.open()
            }
        }, '#card')
        const newCardToStart = newElemCard.generateCard()
        newCardPlace.addItemToStart(newCardToStart)
    }
}, '.popup_add-card')


newPopupAddCard._setEventListeners()
function openPopupAddCard() {
    newPopupAddCard.open()
    validateAddForm.enableValidation()
}


// Обновление инфы о пользователе
const newUserInfo = new UserInfo({
    personInformation: {
        name: profileInfoTitle,
        profession: profileInfoJob
    }
})

const newPopupEditPerson = new PopupWithForm({
    handleFormSubmit: (item) => {
        newUserInfo.setUserInfo(item)
    }
}, '.popup_profile')
newPopupEditPerson._setEventListeners()

function openPopupProfile() {
    const userInfo = newUserInfo.getUserInfo()
    popupProfileInputName.value = userInfo.name
    popupProfileInputJob.value = userInfo.prof
    validateProfileForm.enableValidation()
    newPopupEditPerson.open()
}


profileAddButton.addEventListener('click', openPopupAddCard);
profileEditButton.addEventListener('click', openPopupProfile);
