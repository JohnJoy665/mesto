console.log('валидейт подключен')

const toggleSubmitButton = (formElement, inputList, params) => {
    buttonElement = formElement.querySelector(params.submitButtonSelector)
    const hasInvalidInput = inputList.some(
        (elem) => !elem.validity.valid
    )
    // console.log(hasInvalidInput)
    if (hasInvalidInput) {
        buttonElement.classList.add(params.inactiveButtonClass)
        buttonElement.setAttribute("disabled", "true");
    } else {
        buttonElement.classList.remove(params.inactiveButtonClass)
        buttonElement.removeAttribute("disabled", "true");
    }
    
}

const showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElem = formElement.querySelector(`#${inputElement.id}-error`)
    errorElem.textContent = errorMessage;
    errorElem.classList.add(params.errorClass)
    inputElement.classList.add(params.inputErrorClass)
};
const hideInputError = (formElement, inputElement, params) => {
    const errorElem = formElement.querySelector(`#${inputElement.id}-error`)
    errorElem.textContent = "";
    errorElem.classList.remove(params.errorClass)
    inputElement.classList.remove(params.inputErrorClass)
};

// принимаем инпут
// проверяем признак валидации:
// если валидна - передаем инпут
// если не валидна - передаем инпут и сообщение
const checkInputValidity = (formElement, inputElement, params) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, params)
    } else {
        hideInputError(formElement, inputElement, params)
    }
}

// принимаем форму
// находим все инпуты
// создаем из них массив и в каждом проставляем слушателя на ввод
// вызываем функцию проверки валидации (при каждом вводе) и передаем ей инпут, по которому кликаем
const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (event) => {
            checkInputValidity(formElement, inputElement, params);
            toggleSubmitButton(formElement, inputList, params);
        })
    })
    toggleSubmitButton(formElement, inputList, params);
}

// находим все формы
// создаем из них массив и в каждой форме отменяем сабмит
// вызываем слушателя события и передаем ему форму
const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault()
        });
        setEventListeners(formElement, params)
    });
}


enableValidation(params)
// console.log(params);
