import { _fetch } from "../utils/fetch.js";
import currentDir from "../utils/currentDir.js";

const logout = document.querySelector(".logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  _fetch("GET", `${currentDir}/php/auth/logout.php`).then((res) => {
    if (res.message === "Logged Out") {
      location.href = `${currentDir}/login.html`;
    }
  });
});
