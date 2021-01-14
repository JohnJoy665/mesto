import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'

import {
    validationConfig,
    keyEscape,
    initialCards,
    popupCloseButton,
    placesCards,
    profileInfoTitle,
    profileInfoJob,
    profileEditButton,
    profileAddButton,
    popupProfile,
    popupProfileForm,
    popupProfileInputName,
    popupProfileInputJob,
    popupAddCard,
    popupAddCardForm,
    popupAddCardInputTitle,
    popupAddCardInputLink,
    popupGalary,
    popupGalaryFullSizeImg,
    popupGalaryTitleGalary
} from '../utils/constants.js'




//1 проверяет, кликнул ли человек esc
// если да - закрываем
// function closeOnEsc(evt) {
//     const modal = document.querySelector('.popup_visible')

//     if (evt.keyCode === keyEscape) {
//         closeModal(modal);

//     }
// }

//2 навешивает слушатель на кнопку
const setEscListener = () => {
    document.addEventListener("keydown", closeOnEsc);
}

//3 проверяет, кликнул ли человек по попапу или мимо
// если мимо - закрываем
function checkOverlay(evt) {
    // console.log(evt.target)
    if (evt.target.classList.contains('popup_visible')) {
        closeModal(evt.target)
    }
}

//4 Ищем оверлей
// вешаем обработчик на область
const setOverlayListener = (modal) => {
    modal.addEventListener('mousedown', checkOverlay)
}

//5 Открываем ПопАп
// function openModal(modal) {
//     modal.classList.add('popup_visible');
//     setOverlayListener(modal);
//     setEscListener(modal);
// }

function closeModal(modal) {
    modal.classList.remove('popup_visible')
    document.removeEventListener("keydown", closeOnEsc);
    modal.removeEventListener('mousedown', checkOverlay)
}

// 6 Открытие попапа для изменения профиля
function openProfileModal() {
    validateProfileForm.resertForm()
    popupProfileInputName.value = profileInfoTitle.textContent
    popupProfileInputJob.value = profileInfoJob.textContent
    openModal(popupProfile)
}

// 7 Открытие попапа для добавление карточек
function openAddCardModal() {
    validateAddForm.resertForm()
    openModal(popupAddCard)
}

// 8 изменение информации в профайле
// закрытие карточки по нажатию на сабмит
function submitEditUserProfileForm(evt) {
    evt.preventDefault();
    profileInfoTitle.textContent = popupProfileInputName.value;
    profileInfoJob.textContent = popupProfileInputJob.value;
    closeModal(evt.target.parentElement.parentElement)
}

// 11 добавление карточки в начало контейнера
// отправляет классу значения инпутов и селектор
// подставляет сформированный экземпляр класса в конец контейнера
// обнуляет значения в инпутах для послед. открытий
// закрывает инпут
// function addCardToStart(evt) {
//     evt.preventDefault();
//     const newCard = createCard(popupAddCardInputTitle.value, popupAddCardInputLink.value, '#card', openGalaryModal)
//     placesCards.prepend(newCard.generateCard());
//     popupAddCardInputTitle.value = ''
//     popupAddCardInputLink.value = ''
//     closeModal(evt.target.parentElement.parentElement)
// }

const openGalaryModal = (element) => {
    openModal(popupGalary)
    popupGalaryFullSizeImg.src = element.querySelector('.places__picture').getAttribute('src')
    popupGalaryFullSizeImg.alt = element.querySelector('.places__title').textContent
    popupGalaryTitleGalary.textContent = element.querySelector('.places__title').textContent
}

// popupAddCardForm.addEventListener('submit', addCardToStart)
popupProfileForm.addEventListener('submit', submitEditUserProfileForm);
profileEditButton.addEventListener('click', openProfileModal);
profileAddButton.addEventListener('click', openAddCardModal);
popupCloseButton.forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.popup')))
})

// Отрисовка всех карточек в классе
// initialCards.forEach((item) => {
//     const newCard = createCard(item.name, item.link, '#card', openGalaryModal)
//     let nextCard = newCard.generateCard();
//     placesCards.append(nextCard);
// })


const validateProfileForm = new FormValidator(validationConfig, popupProfileForm);
validateProfileForm.enableValidation()
const validateAddForm = new FormValidator(validationConfig, popupAddCardForm);
validateAddForm.enableValidation()



// function createCard(name, link, cardSelector, openGalaryModal) {
//     return new Card(name, link, cardSelector, openGalaryModal)
// }


// добавление всех карточек из массива на страницу
const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const cardElem = new Card(item.name, item.link, '#card', openGalaryModal)
        const newCard = cardElem.generateCard();
        cardList.addItem(newCard)
    }
}, placesCards)

cardList.renderCards()



const openTest = new Popup(popupAddCard);

openTest.open()


// popupProfile
// popupAddCard
// popupGalary