import { _fetch } from "../utils/fetch.js";
import currentDir from "../utils/currentDir.js";

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const usernameError = document.querySelector(".usernameError");
const passwordError = document.querySelector(".passwordError");
const login = document.querySelector("#submit");

login.addEventListener("click", (e) => {
  usernameError.textContent = "";
  passwordError.textContent = "";

  e.preventDefault();
  console.log("Woo");

  _fetch("POST", `${currentDir}/php/auth/login.php`, {
    username: username.value,
    password: password.value,
  }).then((res) => {
    checkCredentials(res)
      .then(() => {
        location.href = `${currentDir}`;
      })
      .catch(() => {});
  });
});

function checkCredentials(res) {
  return new Promise((resolve, reject) => {
    if (res.error === "Invalid Username") {
      usernameError.textContent = "Invalid username";
      reject();
    }
    if (res.error === "Invalid Password") {
      passwordError.textContent = "Invalid password";
      reject();
    }
    resolve();
  });
}
