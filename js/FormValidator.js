// const validate = new FormValidator(params, '.popup__submit-button');
export default class FormValidator {
    constructor(params, formSelector) {
        this._inputSelector = params.inputSelector;//'.popup__input',
        this._submitButtonSelector = params.submitButtonSelector; //'.popup__submit-button',
        this._inactiveButtonClass = params.inactiveButtonClass; //'popup__submit-button_state_disactive',
        this._inputErrorClass = params.inputErrorClass; //'popup__input_active_disactive',
        this._errorClass = params.errorClass; //'popup__input-error_active'
        this._formSelector = formSelector;
    }

    resetValidation () {
        console.log('сброс инпутов и кнопки')
        console.log(this._inputSelector);
        console.log(this._errorClass)
        console.log(this._submitButtonSelector)
    }

    _toggleSubmitButton(formElement, inputList) {
        const buttonElement = formElement.querySelector(this._submitButtonSelector)
        const hasInvalidInput = inputList.some(
            (elem) => !elem.validity.valid
        )

        if (hasInvalidInput) {
            buttonElement.classList.add(this._inactiveButtonClass)
            buttonElement.setAttribute("disabled", "true");
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass)
            buttonElement.removeAttribute("disabled", "true");
        }

    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElem = formElement.querySelector(`#${inputElement.id}-error`)
        errorElem.textContent = errorMessage;
        errorElem.classList.add(this._errorClass)
        inputElement.classList.add(this._inputErrorClass)
    };
    _hideInputError(formElement, inputElement) {
        const errorElem = formElement.querySelector(`#${inputElement.id}-error`)
        errorElem.textContent = "";
        errorElem.classList.remove(this._errorClass)
        inputElement.classList.remove(this._inputErrorClass)
    };

    // принимаем инпут
    // проверяем признак валидации:
    // если валидна - передаем инпут
    // если не валидна - передаем инпут и сообщение
    _checkInputValidity(formElement, inputElement) {
        const isInputNotValid = !inputElement.validity.valid;
        // console.log('чекнули инпуты')
        // console.log(formElement)
        // console.log(inputElement)
        // console.log(isInputNotValid)
        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(formElement, inputElement, errorMessage)
        } else {
            this._hideInputError(formElement, inputElement)
        }
    }

    // принимаем форму
    // находим все инпуты
    // создаем из них массив и в каждом проставляем слушателя на ввод
    // вызываем функцию проверки валидации (при каждом вводе) и передаем ей инпут, по которому кликаем
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (event) => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleSubmitButton(formElement, inputList);
            })
        })
        // console.log('вот тут сейчас')
        this._toggleSubmitButton(formElement, inputList);
        // this._checkInputValidity(formElement, inputElement);
    }

    // находим форму по селектору
    // получаем дом элемент
    // вызываем слушателя события и передаем ему форму
    enableValidation () {
        // console.log('провели валидацию')
        const domElement = document.querySelector(this._formSelector);
        domElement.addEventListener('submit', (event) => {
            event.preventDefault()
        });
        this._setEventListeners(domElement)
    }

}