// раскомментировать перед npm dev следующую строчку
import './index.css'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDelButton from '../components/PopupDelButton.js';

import {
    validationConfig,
    placesCards,
    profileInfoTitle,
    profileInfoJob,
    profileEditButton,
    profileAddButton,
    popupProfileForm,
    popupProfileInputName,
    popupProfileInputJob,
    popupAddCardForm,
    profileAvatar,
    popupAddCard,
    popupEditAvatarForm,
    popupEditAvatar,
    popupDelCard,
    popupProfile
} from '../utils/constants.js';


//функция UX ожидания
function toggleButtonText(popupElement, text) {
    const buttonElement = popupElement.querySelector('.popup__submit-button')
    buttonElement.innerHTML = text
}


const api = new Api('d260083a-2447-4463-a104-c47bc15c894a', 'cohort-19', 'mesto.nomoreparties.co/v1')


const validateProfileForm = new FormValidator(validationConfig, popupProfileForm);
validateProfileForm.enableValidation();
const validateAddForm = new FormValidator(validationConfig, popupAddCardForm);
validateAddForm.enableValidation();
const validateEditAvatar = new FormValidator(validationConfig, popupEditAvatarForm);
validateEditAvatar.enableValidation();


const popupWithImg = new PopupWithImage('.popup_galary');
popupWithImg._setEventListeners();

const popupDelButton = new PopupDelButton({
    handleFormSubmit: (item) => {
        popupDelButton.setSubmitAction(item)
    }
}, '.popup_del-card')


// наполнение карточки
function createCard(cardItems) {
    const userId = (newUserInfo.getUserInfo()).id;
    const cardElem = new Card({
        userId: userId,
        data: cardItems,
        handleOpenCard: (nameCard, linkCard) => {
            popupWithImg.open(nameCard, linkCard)
        },
        addLike: (cardId) => {
            api.likeCard(cardId)
                .then((data) => {
                    cardElem.setLike(data)
                })
                .catch((err) => { console.log(`Ошибка ${err}`) })
        },
        removeLike: (cardId) => {
            api.unLikeCard(cardId)
                .then((data) => {
                    cardElem.unSetLike(data)
                })
                .catch((err) => { console.log(`Ошибка ${err}`) })
        },
        handleDelButton: (cardId, cardElement) => {
            popupDelButton.setSubmitAction(() => {
                toggleButtonText(popupDelCard, 'Сохранение...')
                api.deleteCard(cardId)
                    .then(() => {
                        popupDelButton.del(cardElement)
                        popupDelButton.close()
                        toggleButtonText(popupDelCard, 'Да')
                    })
                    .catch((err) => { console.log(`Ошибка ${err}`) })
            })
            popupDelButton.setEventListeners()
            popupDelButton.open()
        }
    }, '#card');
    return cardElem
}


// добавляем все карточки
const cardList = new Section({
    data: [],
    renderer: (item) => { // сюда приходят карты со всеми параметрами
        const cardElem = createCard(item) // та самая функция!!!!!!!!!!!!!!!!!!!!!
        const newCard = cardElem.generateCard();
        cardList.addItem(newCard);
    }
}, placesCards);


// запрос всех карт при загрузке страницы и отрисовка
api.getCardsList()
    .then((initialCards) => {
        cardList.renderCards(initialCards);
    })
    .catch((err) => { console.log(`Ошибка ${err}`) })


// добавление каждой отдельной карточки
const newPopupAddCard = new PopupWithForm({
    handleFormSubmit: (item) => { // здесь хранятся данные карточки для создания
        toggleButtonText(popupAddCard, 'Сохранение...')
        api.sendNewCard({ name: item['input-title'], link: item['input-link'] })
            .then((data) => {
                const newElemCard = createCard(data)
                const newCardToStart = newElemCard.generateCard();
                cardList.addItemToStart(newCardToStart);
                newPopupAddCard.close()
                toggleButtonText(popupAddCard, 'Сохранить')
            })
            .catch((err) => { console.log(`Ошибка ${err}`) })
    }
}, '.popup_add-card');
newPopupAddCard.setEventListeners();


// меняем аватарку
function openEditAvatar() {
    const newAvatar = new PopupWithForm({
        handleFormSubmit: (item) => {
            toggleButtonText(popupEditAvatar, 'Сохранение...')
            api.newAvatar(item['input-link'])
                .then((data) => {
                    newUserInfo.setUserInfo(data.name, data.about, data.avatar, data._id)
                    newAvatar.close()
                    toggleButtonText(popupEditAvatar, 'Сохранить')
                })
                .catch((err) => { console.log(`Ошибка ${err}`) })
        }
    }, '.popup_edit-avatar')
    newAvatar.setEventListeners();
    validateEditAvatar.resetForm();
    newAvatar.open();
}


// кликаем по открытию попапа с карточками
function openPopupAddCard() {
    validateAddForm.resetForm();
    newPopupAddCard.open();
};


// загрузка изначальных значений на страницу
const newUserInfo = new UserInfo({
    personInformation: {
        name: profileInfoTitle,
        profession: profileInfoJob,
        avatar: profileAvatar
    }
});


// Обновление данных о пользователе
const newPopupEditPerson = new PopupWithForm({
    handleFormSubmit: (item) => {
        if (newUserInfo.getUserInfo().name === item['input-name'] && newUserInfo.getUserInfo().job === item['input-job']) {
            newPopupEditPerson.close()
            return
        } else {
            toggleButtonText(popupProfile, 'Сохранение...')
            api.sendUserInfo(item)
                .then((data) => {
                    newUserInfo.setUserInfo(data.name, data.about, data.avatar, data._id)
                    newPopupEditPerson.close()
                    toggleButtonText(popupProfile, 'Сохранить')
                    // console.log(data)
                })
                .catch((err) => { console.log(`Ошибка ${err}`) })
        }
    }
}, '.popup_profile');
newPopupEditPerson.setEventListeners();


//открываем окно с попапом для обновления профайла
function openPopupProfile() {
    const userInfo = newUserInfo.getUserInfo();
    popupProfileInputName.value = userInfo.name;
    popupProfileInputJob.value = userInfo.job;
    validateProfileForm.resetForm();
    newPopupEditPerson.open()
};


// загрузка профиля
api.getUserInfo()
    .then((data) => {
        newUserInfo.setUserInfo(data.name, data.about, data.avatar, data._id)
    })
    .catch((err) => { console.log(`Ошибка ${err}`) })


//слушатель на кнопки
profileAddButton.addEventListener('click', openPopupAddCard);
profileEditButton.addEventListener('click', openPopupProfile);
//слушатель на аватар
profileAvatar.addEventListener('click', openEditAvatar);



















    // const popupDelButton = new PopupDelButton({
            //     handleFormSubmit: (item) => {
            //         toggleButtonText(popupDelCard, 'Сохранение...')
            //         api.deleteCard(item)
            //             .then((data) => {
            //                 popupDelButton.del(cardElement)
            //                 popupDelButton.close()
            //                 toggleButtonText(popupDelCard, 'Да')
            //             })
            //             .catch((err) => { console.log(`Ошибка ${err}`) })
            //     },
            //     dataCard: cardId
            // }, '.popup_del-card');