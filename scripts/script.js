const popupCloseButton = document.querySelector(".popup__close-button");
const popupOpenButton = document.querySelector(".user__edit-button");
const popup = document.querySelector(".popup");
const userEditSaveButton = document.querySelector(".edit__save-button");
let userName = document.querySelector(".user__name");
let userStatus = document.querySelector(".user__status");
let newUserName = document.getElementById("input_user_name");
let newUserStatus = document.getElementById("input_user_status");

function userDataEditSave(event) {
  event.preventDefault();
  userName.textContent = newUserName.value;
  userStatus.textContent = newUserStatus.value;
  closePopup();
}
function closePopup() {
  popup.classList.remove("popup_open");
}
function openPopup() {
  popup.classList.add("popup_open");
  newUserStatus.value = userStatus.textContent;
  newUserName.value = userName.textContent;
}

popupCloseButton.addEventListener("click", closePopup);
popupOpenButton.addEventListener("click", openPopup);

userEditSaveButton.addEventListener("click", userDataEditSave);
