export default class FormValidator {
  constructor() {
    
  }
}

/*
//блок функций по валидации форм

//экспортируем необходимые функции и переменные
export { enableValidation, reloadValidation };

//функция, которая показывает текст ошибки и подсвечивает поле с ошибкой
const showInputError = (formElement, inputElement, errorMessage, formSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formSelectors.errorClass);
};

//функция, которая показывает текст ошибки и подсвечивает поле с ошибкой
const hideInputError = (formElement, inputElement, formSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSelectors.inputErrorClass);
  errorElement.classList.remove(formSelectors.errorClass);
  errorElement.textContent = '';
};

//функция проверки поля на валидность
const checkInputValidity = (formElement, inputElement, formSelectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors);
  } else {
    hideInputError(formElement, inputElement, formSelectors);
  }
};

//функция установки слушателей на инпут, вызывающая проверку валидности поля и изменение статуса кнопки
const setEventListeners = (formElement, formSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formSelectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, formSelectors);
      toggleButtonState(inputList, buttonElement, formSelectors);
    });
  });
};

//основная функция, запускающая валидацию
const enableValidation = formSelectors => {
  const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, formSelectors);
  });
};

//проверка, есть ли в списке полей невалидное поле
const hasInvalidInput = inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция сброса ошибок валидации и проверка активности кнопки (используется при открытии попапа с данными пользователя и с загрузкой фото)
const reloadValidation = (formElement, formSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  inputList.forEach(inputElement => {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement, formSelectors);
  });
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formSelectors);
}

//функция управления состоянием кнопки сабмита формы
const toggleButtonState = (inputList, buttonElement, formSelectors) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(formSelectors.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(formSelectors.inactiveButtonClass);
  }
};

*/