//блок функций по созданию карточек с фотографиями

//импортируем необходимые функции и переменные
import { openPopup } from "./modal.js";
import { addLike, removeLike } from "./api.js";
import {
  content,
  pictureTitle,
  pictureLink,
  pictureTemplate,
  popupPictureForm,
  popupDeletePictureForm,
  popupPictureImage,
  popupPictureCaption,
  photoGrid,
  cardToDelete,
} from './index.js';

//экспортируем необходимые функции и переменные
export {
  addPictureToTop,
  addPictureToBottom,
  activateDeleteButton,
  showLikes,
  content,
  pictureTitle,
  pictureLink
};

//функция добавления блока в DOM для новой фотографии и подключения к ней необходимых event и fetch
function createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
//создаём необходимые переменные
  const pictureCard = pictureTemplate.querySelector('.photo-grid__photo-card').cloneNode(true);
  const pictureElement = pictureCard.querySelector('.photo-grid__photo');
  const likeButtonElement = pictureCard.querySelector('.photo-grid__like-button');
  const likesCounter = pictureCard.querySelector('.photo-grid__likes-count');
  const deleteButtonElement = pictureCard.querySelector('.photo-grid__delete-button');
  const captionTextButtonElement = pictureCard.querySelector('.photo-grid__caption-text');

  //задаём параметры переменным для заполнения карточки
  pictureElement.src = pictureLink;
  pictureElement.alt = pictureTitle;
  captionTextButtonElement.textContent = pictureTitle;

  //добавляем event по клику на фотокарточку, открывающий модальное окно с фотографией
  pictureElement.addEventListener('click', function(evt) {
    popupPictureImage.src = pictureLink;
    popupPictureImage.alt = pictureTitle;
    popupPictureCaption.textContent = pictureTitle;
    openPopup(popupPictureForm);
  });

  //запускаем функции проверки, сколько лайков у карточки, и есть ли свой лайк, подключаем функцию активации лайка и функцию активации кнопки удаления карточки
  showLikes(usersList, likesCounter);
  checkMyLike(usersList, personalId, likeButtonElement);
  activateLikeButton(likesCounter, likeButtonElement, pictureId);
  activateDeleteButton(cardId, personalId, pictureId, deleteButtonElement);

  //возвращаем готовую карточку
  return pictureCard;
}


// функция по добавлению карточки в начало Грида (для добавления карточки через форму, чтобы новая карточка была сверху)
function addPictureToTop(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
  //вызываем функцию создания фотокарточки
  const pictureCard = createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList);
  //добавляем фото в начало грид-блока
  photoGrid.prepend(pictureCard);
}

// функция по добавлению карточки в конец Грида (для предзагрузки карточек с сервера, чтобы свежие были вверху)
function addPictureToBottom(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
  //вызываем функцию создания фотокарточки
  const pictureCard = createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList);
  //добавляем фото в конец грид-блока
  photoGrid.append(pictureCard);
}

//функция добавления кнопки удаления на свою карточку и работы этой кнопки
function activateDeleteButton(cardId, personalId, pictureId, deleteButtonElement) {
  if(cardId === personalId) {
    deleteButtonElement.classList.add('photo-grid__delete-button_active');
    deleteButtonElement.addEventListener('click', (evt) => {
      openPopup(popupDeletePictureForm);
      cardToDelete.domElement = deleteButtonElement.closest('.photo-grid__photo-card');
      cardToDelete.id = pictureId;
    });
  }
}

//функция отображения на карточке количества лайков
function showLikes(usersList, likesCounter) {
  const likesNumber = usersList.length;
  likesCounter.textContent = likesNumber;
}

//функция проверки, есть ли собственный лайк на карточке
function checkMyLike(usersList, personalId, likeButtonElement) {
  const usersArray = Array.from(usersList);
  const hasMyLike = usersArray.some((user) => {
    return user._id === personalId;
  });
  if (hasMyLike) {
    likeButtonElement.classList.add('photo-grid__like-button_active');
  } else {
    likeButtonElement.classList.remove('photo-grid__like-button_active');
  }
}

//функция, подключающая на лайк слушатель, который отправляет запрос на сервер и меняет статус кнопки лайка
function activateLikeButton(likesCounter, likeButtonElement, pictureId) {
  likeButtonElement.addEventListener('click', function(evt) {
    if (likeButtonElement.classList.contains('photo-grid__like-button_active')) {
      removeLike(pictureId)
        .then((updatedCard) => {
          showLikes(updatedCard.likes, likesCounter);
          likeButtonElement.classList.toggle('photo-grid__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addLike(pictureId)
        .then((updatedCard) => {
          showLikes(updatedCard.likes, likesCounter);
          likeButtonElement.classList.toggle('photo-grid__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
