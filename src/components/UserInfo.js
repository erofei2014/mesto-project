//класс с данными пользователя
export default class UserInfo {
  constructor(userDataSelectors) {
    this._userName = document.querySelector(userDataSelectors.userNameSelector);
    this._userOccupation = document.querySelector(userDataSelectors.userOccupationSelector);
    this._userAvatar = document.querySelector(userDataSelectors.userAvatarSelector);
  }

  //метод получения данных пользователя из DOM
  getUserInfo() {
    const userData = { name: this._userName.textContent, about: this._userOccupation.textContent };
    return userData;
  }

  //метод обновления данных пользователя, полученнных извне
  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userOccupation.textContent = userInfo.about;
  }

  //метод обновления аватара, по сслыке, полученной извне
  setUserAvatar(userAvatarLink) {
    this._userAvatar.style.background = `center / cover no-repeat url('${userAvatarLink}')`;
  }
}