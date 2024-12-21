let userName = document.querySelector(".user-name");
let email = document.querySelector(".e-mail");
let password = document.querySelector(".password");
let signUp = document.querySelector(".sign-up");
let alertMsg = document.querySelector(".alert-msg");
let closeBtn = document.querySelector(".btn-close");

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  if (userName.value === "" || email.value === "" || password.value === "") {
    alertMsg.innerHTML = "please fill all data";
  } else if(password.value.length < 8){
  alertMsg.innerHTML="Password must be at least 8 characters"
  } else {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    setTimeout(() => {
      window.location = "login.html";
    }, 1000);
  }
});
