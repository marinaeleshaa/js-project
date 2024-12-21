let links = document.querySelector(".login-signUp");
let userIn = document.querySelectorAll(".after-login");
let logoutBtn = document.querySelector(".logout-btn");
let userName = document.getElementById("user-name");

if (localStorage.getItem("userName")) {
  links.remove();
  userIn.forEach((e)=>{
    e.classList.remove("user-out")
    e.classList.add("user-in")
  })
  userName.innerHTML = `welcome , ${localStorage.getItem("userName")}`;
}

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1000);
});

