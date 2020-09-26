// console.log(initialCards);

const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddForm = popupAddCard.querySelector('.popup__form')
const popupAddInputTitle = popupAddForm.querySelector('.popup-add__input_title')
const popupAddInputLink = popupAddForm.querySelector('.popup-add__input_link')
const popupFormProfile = document.querySelector('.popup_profile');
const profileInfo = document.querySelector('.profile__info');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const popupProfileInputName = popup.querySelector('.popup-profile__input_name');
const popupProfileInputJob = popup.querySelector('.popup-profile__input_job');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__job');
const popupCloseButton = document.querySelectorAll('.popup__close-button')
const popupProfileForm = popupFormProfile.querySelector('.popup__form')
const cardTemplate = document.querySelector('#card').content;
const plascesCards = document.querySelector('.places__cards');
const popupGalary = document.querySelector('.popup_galary');

// Открытие/закрытие попапов (присваивает, убирает 'popup_visible)
function toggleModal(modal) {
    modal.classList.toggle('popup_visible')
}

// Вписывание при открытие в инпуты текста из карточки
function openProfileModal() {
    if (!popupFormProfile.classList.contains('popup_visible')) {
        popupProfileInputName.value = profileTitle.textContent
        popupProfileInputJob.value = profileJob.textContent
    }
    toggleModal(popupFormProfile)
}

// Открытие карточки для добавления картинок
function openAddCardModal() {
    toggleModal(popupAddCard)
}

// Поиск модала, для закрытия нужного окна
function closePopup(btn) {
    popupModal = btn.target.parentElement.parentElement
    toggleModal(popupModal)
}


// изменение информации в профайле
// закрытие карточки по нажатию на сабмит
function submitformHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupProfileInputName.value;
    profileJob.textContent = popupProfileInputJob.value;
    toggleModal(evt.target.parentElement.parentElement)
}


// создание карточки
// создает шаблон и записывает с помощью name и link соответствующие параметры в шаблон
// слушает, не кликнули ли по удалению
// слушает, не кликнули ли по лайку
// слушает, не кликнули ли по картинке
// возвращает шаблон в createCard
function createCard(name, link) {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.places__picture').src = link;
    newCard.querySelector('.places__title').textContent = name;
    newCard.querySelector('.places__picture').alt = name;
    newCard.querySelector('.places__del-button').addEventListener('click', handleDelete);
    newCard.querySelector('.places__like').addEventListener('click', handleLike);
    newCard.querySelector('.places__picture').addEventListener('click', openGalaryModal);
    return newCard;
}

// добавление карточки в конец контейнера (при первой отрисовки всех карточек из массива) 
// принимает контейнер и созданную карточку
// ставит карточку в конец контейнера
function addCardToEnd(container, cardElement) {
    container.append(cardElement);
}

// добавление карточки в начало контейнера
// создает cardElement через ф-ию
// создает карточку вначале элемента
// обнуляет значения в инпутах для послед. открытий
// закрывает инпут
function addCardToStart(evt) {
    evt.preventDefault();
    cardElement = createCard(popupAddInputTitle.value, popupAddInputLink.value)
    plascesCards.prepend(cardElement);
    popupAddInputTitle.value = ''
    popupAddInputLink.value = ''
    toggleModal(evt.target.parentElement.parentElement)
}

// Отрисовка всех карточек
// берет массив и раскладывает на элементы
// вызывает функцию добавления карточек в конец массива. Передает этой функции контейнер и вызывает функцию создания карточки, передав ей имя и ссылку элемента массива
initialCards.forEach(element => {
    addCardToEnd(plascesCards, createCard(element.name, element.link))
})

// Удаление карточки
// определяет родительский элемент для кнопки удаления (карточка), удаляеит его
function handleDelete(evt) {
    evt.target.parentNode.remove();
}

// Проставление лайка
// меняет класс у лайка
function handleLike(evt) {
    evt.target.classList.toggle('places__like_is-active');
}

// Открывает галерею
// Подставляет значения из попапа в открывшееся окно
function openGalaryModal(evt) {
    toggleModal(popupGalary)
    popupGalary.querySelector('.popup-galary__full-size-img').src = evt.target.getAttribute('src')
    popupGalary.querySelector('.popup__title_galary').textContent = evt.target.parentElement.querySelector('.places__title').textContent
}

popupAddForm.addEventListener('submit', addCardToStart)
popupProfileForm.addEventListener('submit', submitformHandler);
profileEditButton.addEventListener('click', openProfileModal);
profileAddButton.addEventListener('click', openAddCardModal);
popupCloseButton.forEach(btn => {
    btn.addEventListener('click', closePopup.bind(btn))
});
