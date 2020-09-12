const openProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = document.querySelector('.popup-profile__close-button');
const modalProfile = document.querySelector('.popup-profile');
const plascesCards = document.querySelector('.places__cards')
const cardTemplate = document.querySelector('#card').content;
const openPopupAddButton = document.querySelector('.profile__add-button');
const closePopupAddButton = document.querySelector('.popup-add__close-button');
const modalAddCard = document.querySelector('.popup-add');
const formAddCardElement = modalAddCard.querySelector('.popup-add__form');
const addButton = formAddCardElement.querySelector('.popup-add__submit-button')
const titleInput = formAddCardElement.querySelector('.popup-add__input_title');
const linkInput = formAddCardElement.querySelector('.popup-add__input_link');
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


// Открытие/закрыти/редактирование профиля
let personName = document.querySelector('.profile__title');
let personJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup-profile__form');
let nameInput = formElement.querySelector('.popup-profile__input_name');
let jobInput = formElement.querySelector('.popup-profile__input_job');


function toggleModal() {
  if (!modalProfile.classList.contains('popup-profile_is-open')) {
    nameInput.value = personName.textContent;
    jobInput.value = personJob.textContent;
  }
  modalProfile.classList.toggle('popup-profile_is-open');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  personName.textContent = nameInput.value;
  personJob.textContent = jobInput.value;
  modalProfile.classList.toggle('popup-profile_is-open');
}

openProfileButton.addEventListener('click', toggleModal);
closeProfileButton.addEventListener('click', toggleModal);
formElement.addEventListener('submit', formSubmitHandler);




// открытие/закрытие попапа для карточек
function toggleCards() {
  modalAddCard.classList.toggle('popup-add_is-open');
}
openPopupAddButton.addEventListener('click', toggleCards);
closePopupAddButton.addEventListener('click', toggleCards);



// Отрисовка карточек
function render() {
  plascesCards.innerHTML = '';
  initialCards.forEach(renderItem);
}

// отрисовка одной карточки
function renderItem(item) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.places__picture').src = item.link;
  newCard.querySelector('.places__title').textContent = item.name;
  plascesCards.append(newCard);
}

function handleSubmit(evt) {
  evt.preventDefault();
  let newCardValues = {
    name: titleInput.value,
    link: linkInput.value
  }
  initialCards.unshift(newCardValues);
  toggleCards();
  render();
}

formAddCardElement.addEventListener('submit', handleSubmit);
render();












/*
// открытие/закрытие попапа для карточек
function toggleCards() {
  modalAddCard.classList.toggle('popup-add_is-open');
}
openPopupAddButton.addEventListener('click', toggleCards);
closePopupAddButton.addEventListener('click', toggleCards);


// создание 6 карточек в начале загрузки и добавление по одной впоследствии/удаление карточки
let formAddCardElement = document.querySelector('.popup-add__form');
let titleInput = formAddCardElement.querySelector('.popup-add__input_title');
let linkInput = formAddCardElement.querySelector('.popup-add__input_link');

function createCards(check) {
  check.forEach(function (item) {
    let newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.places__picture').src = item.link;
    newCard.querySelector('.places__title').textContent = item.name;
    if (check.length > 1) {
      plascesCards.append(newCard);
    } else {
      console.log(plascesCards)
      plascesCards.prepend(newCard);
    }
    plascesCards.querySelectorAll('.places__del-button').forEach((listenCards) => listenCards.addEventListener('click', function (evt) {
      evt.target.parentElement.remove()
      console.log(evt.target)
    }))
    plascesCards.querySelectorAll('.places__like').forEach((listenCards) => listenCards.addEventListener('click', function (evt) {
      evt.target.classList.toggle('places__like_is-active');
    }))
  })
}

function formSubmitAddCard(evt) {
  evt.preventDefault();
  let newCardValues = [{
    name: titleInput.value,
    link: linkInput.value
  }]
  createCards(newCardValues);
  modalAddCard.classList.toggle('popup-add_is-open');
}

formAddCardElement.addEventListener('submit', formSubmitAddCard);
createCards(initialCards);

*/
