//блок функций по работе модальных окон

//импортируем необходимые функции и переменные
import { fillInputField } from './utils.js';
import { hideInputError, toggleButtonState } from './validate.js';
import { page, popups, usernameInput, userOccupationInput, profileUsername, profileOccupation } from './index.js';

//экспортируем необходимые функции и переменные
export { openPopup, closePopup };

//Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.addEventListener('keydown', checkIfEsc);
  popup.addEventListener('click', checkIfClickOnOverlay);
  fillInputField(usernameInput, userOccupationInput, profileUsername, profileOccupation);
  const inputList = Array.from(popup.querySelectorAll('.popup__item'));
  inputList.forEach(inputElement => {
    inputElement.setCustomValidity("");
    hideInputError(popup.querySelector('.popup__form'), inputElement, {
      inputErrorClass: 'popup__item_type_error',
      errorClass: 'popup__input-error_active'
    });
  });
 toggleButtonState(inputList, popup.querySelector('.popup__submit-button'), {
    inactiveButtonClass: 'popup__submit-button_inactive'
  });
}

//Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', checkIfEsc);
  popup.removeEventListener('click', checkIfClickOnOverlay);
}

//функция добавления event закрытия модального окна по нажатию на оверлей
function checkIfClickOnOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

//функция добавляет event закрытия модального окна по клавише esc
function checkIfEsc(evt) {
  if (evt.key === "Escape") {
    popups.forEach(popup => {
      closePopup(popup);
    });
  }
}