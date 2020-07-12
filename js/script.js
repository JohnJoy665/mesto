const openModalButton = document.querySelector('.profile__edit-button');
const closeModalButton = document.querySelector('.popup__close-button');
const modal = document.querySelector('.popup');
let personName = document.querySelector('.profile__title');
let personJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input-namme');
let jobInput = formElement.querySelector('.popup__input-job');


function toggleModal() {
    nameInput.value = personName.textContent;
    jobInput.value = personJob.textContent;
    modal.classList.toggle('popup_is-open')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    personName.textContent = nameInput.value;
    personJob.textContent = jobInput.value;
    modal.classList.toggle('popup_is-open')
}

openModalButton.addEventListener('click', toggleModal)
closeModalButton.addEventListener('click', toggleModal);
formElement.addEventListener('submit', formSubmitHandler);


