import { getDate, getTime } from "./utils/date.js";
import { _fetch } from "../js/utils/fetch.js";
import currentDir from "../js/utils/currentDir.js";

const overlay = document.querySelector(".overlay");
const input_overlay = document.querySelector(".input-form");
const form = document.querySelector(".input-form form");
const success = document.querySelector(".success");
const player = document.querySelector(".success lottie-player");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  player.play();

  const payload = sanitizeFormData({
    firstName: form["first-name"].value,
    lastName: form["last-name"].value,
    course: form["select-course"].value,
    year: form["select-year"].value,
    timeIn: getTime(),
    date: getDate(),
  });

  _fetch("POST", `${currentDir}/php/attendance/add.php`, payload).then(
    (res) => {
      console.log(res.code === "201" ? "Success" : "Something went wrong");
    }
  );

  playAnim();
  form.reset();
});

function sanitizeFormData(data) {
  return {
    firstName: pascalCase(data.firstName.trim()),
    lastName: pascalCase(data.lastName.trim()),
    course: data.course.trim(),
    year: data.year.trim(),
    timeIn: data.timeIn,
    date: data.date,
  };
}

function pascalCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function playAnim() {
  player.play();
  input_overlay.style.display = "none";
  success.style.display = "flex";
  document.querySelector(".message").textContent = "Time-in Successful";
  form["submit"].disabled = true;
  setTimeout(() => {
    player.pause();
  }, 3950);
  setTimeout(() => {
    overlay.style.display = "none";
    success.style.display = "none";
    input_overlay.style.display = "none";
    form["submit"].disabled = false;
    player.stop();
  }, 5000);
}
