
export default class FormValidator {
    constructor(params, formElement) {
        this._inputSelector = params.inputSelector;//'.popup__input',
        this._submitButtonSelector = params.submitButtonSelector; //'.popup__submit-button',
        this._inactiveButtonClass = params.inactiveButtonClass; //'popup__submit-button_state_disactive',
        this._inputErrorClass = params.inputErrorClass; //'popup__input_active_disactive',
        this._errorClass = params.errorClass; //'popup__input-error_active'
        this._formElement = formElement; // popupProfile.querySelector('.popup__form')
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._arrInputList = Array.from(this._inputList);
    };


    resetForm() {
        this._arrInputList.forEach(input => {
            this._hideInputError(input)
            this._toggleSubmitButton()
        });
    };


    _checkInput() {
        return this._arrInputList.some(
            (elem) => !elem.validity.valid
        );
    };


    _toggleSubmitButton() {
        if (this._checkInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass)
            this._submitButton.setAttribute("disabled", "true");
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass)
            this._submitButton.removeAttribute("disabled", "true");
        };
    };


    _showInputError(inputElement, errorMessage) {
        const errorElem = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElem.textContent = errorMessage;
        errorElem.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    };


    _hideInputError(inputElement) {
        const errorElem = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElem.textContent = "";
        errorElem.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    };


    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid;
        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage)
        } else {
            this._hideInputError(inputElement)
        };
    };


    _setEventListeners() {
        this._arrInputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleSubmitButton();
            })
        })
        this._toggleSubmitButton();
    };


    enableValidation() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        this._setEventListeners();
    };
};

