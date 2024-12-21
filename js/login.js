let userName = document.querySelector(".user-name");
let password = document.querySelector(".password");
let LoginBtn = document.querySelector(".Login");
let alertMsg = document.querySelector(".alert-msg");
let closeBtn = document.querySelector(".btn-close");

LoginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const storedUserName = localStorage.getItem("userName");
  const storedPassword = localStorage.getItem("password");

  if (userName.value === "" || password.value === "") {
    alertMsg.innerHTML = "Please fill all data";
  } else if (!storedUserName || !storedPassword) {
    alertMsg.innerHTML = "You don't have an account";
  } else if (
    userName.value.trim() === storedUserName.trim() &&
    password.value === storedPassword
  ) {
    setTimeout(() => (window.location = "index.html"), 1000);
  } else {
    alertMsg.innerHTML = "Username or password is incorrect";
  }
});
