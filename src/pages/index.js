//импортируем классы и константы
import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  apiOptions,
  formSelectors,
  userDataSelectors,
  photoGridSelector,
  cardTemplateSelector,
  popupPicture,
  popupAddCard,
  popupEditUserdata,
  popupEditAvatar,
  popupDeleteCard,
  addPictureForm,
  userDataForm,
  userAvatarForm,
  profileEditButton,
  addPictureButton,
  avatarEditButton,
  usernameInput,
  userOccupationInput,
  storage
} from '../utils/constants.js';


//создаём экземпляр класса Api
export const api = new Api(apiOptions);

//создаём экземпляр класса FormValidator для формы добавления карточки и включаем валидацию
const cardFormValidator = new FormValidator(formSelectors, addPictureForm);
cardFormValidator.enableValidation();

//создаём экземпляр класса FormValidator для формы изменения данных пользователя и включаем валидацию
const userFormValidator = new FormValidator(formSelectors, userDataForm);
userFormValidator.enableValidation();

//создаём экземпляр класса FormValidator для формы изменения аватара и включаем валидацию
const avatarFormValidator = new FormValidator(formSelectors, userAvatarForm);
avatarFormValidator.enableValidation();

//создаём экземпляр класса popupAddCardForm для создания новой карточки и подключаем слушатели
const popupAddCardForm = new PopupWithForm({
  popup: popupAddCard,
  submitter: data => {  
  popupAddCardForm.renderLoading(true, addPictureForm);
  api.postNewCard(data)
    .then((item) => {
      const card = new Card({
        item,
        cardTemplateSelector,
        handleCardClick: (name, link) => {
          popupWithImage.open(name, link);
        },
        onLikePress: (id, condition) => {
          api.changeLike(id, condition)
            .then((likedCard) => {
              card.updateLikes(likedCard);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        deletePopupOpen: () => {
          popupDeleteCardForm.open();
        }
      });
      const cardElement = card.generate();
      initialCardList.addItemToTop(cardElement);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupAddCardForm.renderLoading(false, addPictureForm);
      popupAddCardForm.close();
    });
  }
});
popupAddCardForm.setEventListeners();

//создаём экземпляр класса popupEditUserdataForm для создания обновления информации пользователя и подключаем слушатели
const popupEditUserdataForm = new PopupWithForm({
  popup: popupEditUserdata,
  submitter: data => {
    popupEditUserdataForm.renderLoading(true, userDataForm);
    api.patchProfileData(data)
      .then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditUserdataForm.renderLoading(false, userDataForm);
        popupEditUserdataForm.close();
      });
  }
});
popupEditUserdataForm.setEventListeners();

//создаём экземпляр класса popupEditAvatarForm для создания обновления информации пользователя и подключаем слушатели
const popupEditAvatarForm = new PopupWithForm({
  popup: popupEditAvatar,
  submitter: data => {
    popupEditAvatarForm.renderLoading(true, userAvatarForm);
    api.patchAvatar(data)
      .then((userData) => {
        userInfo.setUserAvatar(userData.avatar); 
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatarForm.renderLoading(false, userAvatarForm);
        popupEditAvatarForm.close();
      });
  }
});
popupEditAvatarForm.setEventListeners();

//создаём экземпляр класса popupWithImage для отображения полноразмерных фото и подключаем слушатели
const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();

//создаём экземпляр класса popupDeleteCardForm для удаления карточки и подключаем слушатели
const popupDeleteCardForm = new PopupWithForm({
  popup: popupDeleteCard,
  submitter: () => {
    return api.deleteCard(storage.cardToDelete.id)
    .then(() => {
      storage.cardToDelete.element.remove();
      popupDeleteCardForm.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }
});
popupDeleteCardForm.setEventListeners();

//создаём экземпляр класса Section для загрузки на сайт карточек с фотографиями
const initialCardList = new Section({
  renderer: item => {
    const card = new Card({
      item,
      cardTemplateSelector,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      onLikePress: (id, condition) => {
        api.changeLike(id, condition)
          .then((likedCard) => {
            card.updateLikes(likedCard);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      deletePopupOpen: () => {
        popupDeleteCardForm.open();
      }
    });
    const cardElement = card.generate();
    initialCardList.addItemToBottom(cardElement);
  }
}, photoGridSelector);

//создаём экземпляр класса с данными пользователя
const userInfo = new UserInfo(userDataSelectors);

//добавляем event открытия модального окна к кнопке редактирования данных пользователя и сброс проверки валидации
profileEditButton.addEventListener('click', () => {
  popupEditUserdataForm.autofill({usernameInput, userOccupationInput}, userInfo.getUserInfo());
  userFormValidator.reloadValidation();
  popupEditUserdataForm.open();
});

//добавляем event открытия модального окна к кнопке добавления новой фотографии и сброс проверки валидации
addPictureButton.addEventListener('click', function() {
  cardFormValidator.reloadValidation();
  popupAddCardForm.open();
});

//добавляем event открытия модального окна к кнопке изменения аватара и сброс проверки валидации
avatarEditButton.addEventListener('click', function() {
  avatarFormValidator.reloadValidation();
  popupEditAvatarForm.open();
});

//промис, при исполнении которого загружается информация на сайт и отрисовывается DOM при загрузке
Promise.all([
  api.getInitialUserData(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    storage.userID = userData._id;
    userInfo.setUserAvatar(userData.avatar);
    initialCardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  })