export const validationConfig = {
formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_state_disactive',
    inputErrorClass: 'popup__input_active_disactive',
    errorClass: 'popup__input-error_active'
}

export const keyEscape = 27;

export const placesCards = document.querySelector('.places__cards');
//-------------------------ПРОФАЙЛ НА ГЛАВНОЙ СТРАНИЦЕ---------------------------------------
export const profile = document.querySelector('.profile');
export const profileInfo = profile.querySelector('.profile__info');
export const profileInfoTitle = profileInfo.querySelector('.profile__title');
export const profileInfoJob = profileInfo.querySelector('.profile__job');
export const profileEditButton = profile.querySelector('.profile__edit-button');
export const profileAddButton = profile.querySelector('.profile__add-button');
export const profileAvatar = profile.querySelector('.profile__avatar');

//-----------------------ПОПАП РЕДАКТИРОВАНИЯ ПРОФАЙЛА---------------------------------------
export const popupProfile = document.querySelector('.popup_profile');
export const popupProfileForm = popupProfile.querySelector('.popup__form')
export const popupProfileInputName = popupProfile.querySelector('.popup__input_name');
export const popupProfileInputJob = popupProfile.querySelector('.popup__input_job');
//-----------------------ПОПАП ДОБАВЛЕНИЯ КАРТИНОК---------------------------------------
export const popupAddCard = document.querySelector('.popup_add-card');
export const popupAddCardForm = popupAddCard.querySelector('.popup__form')
export const popupAddCardInputTitle = popupAddCardForm.querySelector('.popup__input_title')
export const popupAddCardInputLink = popupAddCardForm.querySelector('.popup__input_link')
//------------------------ПОПАП ГАЛЕРЕИ----------------------------------------
export const popupGalary = document.querySelector('.popup_galary');
export const popupGalaryFullSizeImg = popupGalary.querySelector('.popup__full-size-img');
export const popupGalaryTitleGalary = popupGalary.querySelector('.popup__title_galary');
//-----------------------ПОПАП подтверждения удаления---------------------------------------
export const popupDelCard = document.querySelector('.popup_del-card');
export const popupDelCardForm = popupDelCard.querySelector('.popup__form');
//------------------------ПОПАП ИЗМЕНЕНИЯ АВАТАРКИ-----------------------------
export const popupEditAvatar = document.querySelector('.popup_edit-avatar');
export const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form');

