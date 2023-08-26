import Popup from './Popup';
import {popupPictureImage, popupPictureCaption} from '../utils/constants';

//дочерний класс для попапа с картинкой
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  //метод открытия попапа
  open(name, link) {
    popupPictureImage.src = link;
    popupPictureImage.alt = name;
    popupPictureCaption.textContent = name;

    super.open();
  }
  
  //метод закрытия попапа
  close() {
    super.close();

    popupPictureImage.src = '';
    popupPictureImage.alt = '';
    popupPictureCaption.textContent = '';
  }
}