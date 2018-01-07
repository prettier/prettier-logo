import "./style.styl";

const logo = document.getElementById("logo");
const button = document.getElementById("animate");

button.addEventListener("click", () => logo.classList.toggle("initial"));
