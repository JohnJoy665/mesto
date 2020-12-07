import Card from './Card.js';


const params = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_state_disactive',
    inputErrorClass: 'popup__input_active_disactive',
    errorClass: 'popup__input-error_active'
}

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

  // console.log(initialCards);



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
const cardTemplate = document.querySelector('#card').content;
const plascesCards = document.querySelector('.places__cards');
const popupGalary = document.querySelector('.popup_galary');
const popupInputName = popup.querySelector('.popup__input_name');
const popupInputJob = popup.querySelector('.popup__input_job');


//1 проверяет, кликнул ли человек esc
// если да - закрываем
function clodeOnEsc(evt) {
    const modal = document.querySelector('.popup_visible')
    if (evt.keyCode == 27) {
        closeModal(modal);
        
    }
}

//2 навешивает слушатель на кнопку
function setEscListener() {
    addEventListener("keydown", clodeOnEsc);
}

//3 проверяет, кликнул ли человек по попапу или мимо
// если мимо - закрываем
function checkOverlay(evt) {
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
    setEscListener();
}

function closeModal(modal) {
    modal.classList.remove('popup_visible')
    removeEventListener("keydown", clodeOnEsc);
}

// 6 Вписывание при открытие в инпуты текста из карточки
function openProfileModal() {
    popupInputName.value = profileTitle.textContent
    popupInputJob.value = profileJob.textContent
    openModal(popupFormProfile)
}

// 7 Открытие карточки для добавления картинок
function openAddCardModal() {
    openModal(popupAddCard)
}


// 8 изменение информации в профайле
// закрытие карточки по нажатию на сабмит
function submitformHandler(evt) {
    evt.preventDefault(); //- перенес в validate.js
    profileTitle.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closeModal(evt.target.parentElement.parentElement)
}


// 9 создание карточки
// создает шаблон и записывает с помощью name и link соответствующие параметры в шаблон
// слушает, не кликнули ли по удалению
// слушает, не кликнули ли по лайку
// слушает, не кликнули ли по картинке
// возвращает шаблон в createCard
// function createCard(name, link) {
//     const newCard = cardTemplate.cloneNode(true);
//     newCard.querySelector('.places__picture').src = link;
//     newCard.querySelector('.places__title').textContent = name;
//     newCard.querySelector('.places__picture').alt = name;
//     newCard.querySelector('.places__del-button').addEventListener('click', handleDelete);
//     newCard.querySelector('.places__like').addEventListener('click', handleLike);
//     newCard.querySelector('.places__picture').addEventListener('click', openGalaryModal);
//     return newCard;
// }

// 10 добавление карточки в конец контейнера (при первой отрисовки всех карточек из массива) 
// принимает контейнер и созданную карточку
// ставит карточку в конец контейнера
function addCardToEnd(container, cardElement) {
    container.append(cardElement);
}

// 11 добавление карточки в начало контейнера
// создает cardElement через ф-ию
// создает карточку в начале элемента
// обнуляет значения в инпутах для послед. открытий
// закрывает инпут
function addCardToStart(evt) {
    evt.preventDefault(); //- перенес в validate.js
    // cardElement = createCard(popupAddInputTitle.value, popupAddInputLink.value)
    plascesCards.prepend(cardElement);
    popupAddInputTitle.value = ''
    popupAddInputLink.value = ''
    closeModal(evt.target.parentElement.parentElement)
}

// 12 Отрисовка всех карточек
// берет массив и раскладывает на элементы
// вызывает функцию добавления карточек в конец массива. Передает этой функции контейнер и вызывает функцию создания карточки, передав ей имя и ссылку элемента массива
initialCards.forEach(element => {
    // addCardToEnd(plascesCards, createCard(element.name, element.link))
})

// 13 Удаление карточки
// определяет родительский элемент для кнопки удаления (карточка), удаляеит его
function handleDelete(evt) {
    evt.target.parentNode.remove();
}

// 14 Проставление лайка
// меняет класс у лайка
function handleLike(evt) {
    evt.target.classList.toggle('places__like_is-active');
}

// 15 Открывает галерею
// Подставляет значения из попапа в открывшееся окно
function openGalaryModal(evt) {
    openModal(popupGalary)
    popupGalary.querySelector('.popup__full-size-img').src = evt.target.getAttribute('src')
    popupGalary.querySelector('.popup__title_galary').textContent = evt.target.parentElement.querySelector('.places__title').textContent
}

popupAddForm.addEventListener('submit', addCardToStart)
popupProfileForm.addEventListener('submit', submitformHandler);
profileEditButton.addEventListener('click', openProfileModal);
profileAddButton.addEventListener('click', openAddCardModal);
popupCloseButton.forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.popup')))
})


initialCards.forEach((item) => {
    const newCard = new Card(item, cardTemplate)
    let testCardd = newCard.createCard();
    console.log(testCardd)
})