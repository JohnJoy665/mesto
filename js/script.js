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
  setListeners();
}

// отрисовка каждой карточки
function renderItem(item, index) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.places__picture').src = item.link;
  newCard.querySelector('.places__title').textContent = item.name;
  newCard.querySelector('.places__picture').alt = item.name;
  newCard.querySelector('.places__card').setAttribute('id', index);
  initialCards[index].like == true ? newCard.querySelector('.places__like').classList.add('places__like_is-active') : '';
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

function handleDelete(evt) {
  index = evt.target.parentNode.getAttribute('id');
  initialCards.splice(index, 1);
  render();
}

function handleLike(evt) {
  index = evt.target.parentNode.getAttribute('id');
  evt.target.classList.toggle('places__like_is-active');
  initialCards[index].like = true;
}

let popupGalary = document.querySelector('.popup-galary');
let galaryContainer = popupGalary.querySelector('.popup-galary__container');
let galaryCloseButton = galaryContainer.querySelector('.popup-galary__close-button');
let galaryImg = galaryContainer.querySelector('.popup-galary__full-size-img');
let galaryTitle = galaryContainer.querySelector('.popup-galary__title-img');


function handleOpenImg(evt) {
  toggleImg();
  index = evt.target.parentNode.getAttribute('id');
  galaryImg.src = initialCards[index].link;
  galaryTitle.innerHTML = initialCards[index].name;
}

// открытие/закрытие u галереи
function toggleImg() {
  popupGalary.classList.toggle('popup-galary_is-open');
}
galaryCloseButton.addEventListener('click', toggleImg);




function setListeners() {
  formAddCardElement.addEventListener('submit', handleSubmit)
  document.querySelectorAll('.places__del-button').forEach((btn) => {
    btn.addEventListener('click', handleDelete)
  })
  document.querySelectorAll('.places__like').forEach((btn) => {
    btn.addEventListener('click', handleLike)
  })
  document.querySelectorAll('.places__picture').forEach((card) => {
    card.addEventListener('click', handleOpenImg)
  })
}


render();
