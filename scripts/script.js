const popupCloseButton = document.querySelector(".popup__close-button");
const popupOpenButton = document.querySelector(".user__edit-button");
const popup = document.querySelector(".popup");
let userName = document.querySelector(".user__name");
let userStatus = document.querySelector(".user__status");
let newUserName = document.getElementById("input_user_name");
let newUserStatus = document.getElementById("input_user_status");
let authorInfo= document.querySelector(".popup__form");

function saveUserDataEdit(event) {
  event.preventDefault(); //отмена стандартной отправки
  userName.textContent = newUserName.value; //присваивание нового имени
  userStatus.textContent = newUserStatus.value; //присваивание нового статуса
  closePopup(); //вызов закрытия попапа
}
function closePopup() { //функция закрытия попапа
  popup.classList.remove("popup_open"); 
}
function openPopup() {  //функция открытия попапа
  popup.classList.add("popup_open");
  newUserStatus.value = userStatus.textContent; //считывание данных о статусе
  newUserName.value = userName.textContent; //считывание данных об имени
}

popupCloseButton.addEventListener("click", closePopup); //закрытие попапа по клику
popupOpenButton.addEventListener("click", openPopup); //открытие попапа по клику
authorInfo.addEventListener("submit", saveUserDataEdit); //сохранение данных при отправке формы
