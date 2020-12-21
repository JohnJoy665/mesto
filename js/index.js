import Card from './Card.js';
import FormValidator from './FormValidator.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_state_disactive',
    inputErrorClass: 'popup__input_active_disactive',
    errorClass: 'popup__input-error_active'
}

const keyEscape = 27;

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddForm = popupAddCard.querySelector('.popup__form')
const popupAddInputTitle = popupAddForm.querySelector('.popup__input_title')
const popupAddInputLink = popupAddForm.querySelector('.popup__input_link')
const popupFormProfile = document.querySelector('.popup_profile');
const profileInfo = document.querySelector('.profile__info');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__job');
const popupCloseButton = document.querySelectorAll('.popup__close-button')
const popupProfileForm = popupFormProfile.querySelector('.popup__form')
const plascesCards = document.querySelector('.places__cards');
const popupGalary = document.querySelector('.popup_galary');
const fullSizeImg = popupGalary.querySelector('.popup__full-size-img');
const titleGalary = popupGalary.querySelector('.popup__title_galary');
const popupInputName = popup.querySelector('.popup__input_name');
const popupInputJob = popup.querySelector('.popup__input_job');
const popupFormProf = document.querySelector('.popup__form_profile')
const popupFormAdd = document.querySelector('.popup__form_add')





function createCard(name, link, cardSelector, openGalaryModal) {
    return new Card(name, link, cardSelector, openGalaryModal)
}

//1 проверяет, кликнул ли человек esc
// если да - закрываем
function closeOnEsc(evt) {
    const modal = document.querySelector('.popup_visible')

    if (evt.keyCode === keyEscape) {
        closeModal(modal);

    }
}

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
function openModal(modal) {
    modal.classList.add('popup_visible');
    setOverlayListener(modal);
    setEscListener(modal);
}

function closeModal(modal) {
    modal.classList.remove('popup_visible')
    document.removeEventListener("keydown", closeOnEsc);
    modal.removeEventListener('mousedown', checkOverlay)
}

// 6 Открытие попапа для изменения профиля
function openProfileModal() {
    validateProfileForm.resertForm()
    popupInputName.value = profileTitle.textContent
    popupInputJob.value = profileJob.textContent
    openModal(popupFormProfile)
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
    profileTitle.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closeModal(evt.target.parentElement.parentElement)
}

// 11 добавление карточки в начало контейнера
// отправляет классу значения инпутов и селектор
// подставляет сформированный экземпляр класса в конец контейнера
// обнуляет значения в инпутах для послед. открытий
// закрывает инпут
function addCardToStart(evt) {
    evt.preventDefault();
    const newCard = createCard(popupAddInputTitle.value, popupAddInputLink.value, '#card', openGalaryModal)
    plascesCards.prepend(newCard.generateCard());
    popupAddInputTitle.value = ''
    popupAddInputLink.value = ''
    closeModal(evt.target.parentElement.parentElement)
}

const openGalaryModal = (element) => {
    openModal(popupGalary)
    fullSizeImg.src = element.querySelector('.places__picture').getAttribute('src')
    fullSizeImg.alt = element.querySelector('.places__title').textContent
    titleGalary.textContent = element.querySelector('.places__title').textContent
}

popupAddForm.addEventListener('submit', addCardToStart)
popupProfileForm.addEventListener('submit', submitEditUserProfileForm);
profileEditButton.addEventListener('click', openProfileModal);
profileAddButton.addEventListener('click', openAddCardModal);
popupCloseButton.forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.popup')))
})

// Отрисовка всех карточек в классе
initialCards.forEach((item) => {
    const newCard = createCard(item.name, item.link, '#card', openGalaryModal)
    let nextCard = newCard.generateCard();
    plascesCards.append(nextCard);
})


const validateProfileForm = new FormValidator(validationConfig, popupFormProf);
validateProfileForm.enableValidation()
const validateAddForm = new FormValidator(validationConfig, popupFormAdd);
validateAddForm.enableValidation()



