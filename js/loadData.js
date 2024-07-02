import { _fetch } from "./utils/fetch.js";
import {
  getDate,
  getTime,
  compareTimes,
  convertTo12HourFormat,
  calculateTimeGap,
} from "./utils/date.js";
import currentDir from "./utils/currentDir.js";
import { loadData as ld } from "./utils/loadData.js";

const today = document.querySelector(".today");
const searchInput = document.querySelector(".search");
const success = document.querySelector(".success");
const confirm = document.querySelector(".confirm");
const contentContainer = document.querySelector(".time-out-list-container");
const player = document.querySelector(".success lottie-player");
const overlay = document.querySelector(".overlay");
const arb = document.querySelector("#arb");

let attendanceData = [];
today.textContent = getDate();

confirm.addEventListener("click", (e) => e.stopPropagation());
function createAttendanceItem(data) {
  const item = document.createElement("div");
  item.className = "attendance-item";

  const name = document.createElement("p");
  name.className = "name";
  name.textContent = `${data.first_name} ${data.last_name}`;
  item.appendChild(name);

  const course = document.createElement("p");
  course.className = "course";
  course.textContent = `${data.course} - ${data.year}`;
  item.appendChild(course);

  const timeIn = document.createElement("p");
  timeIn.className = "time-in";
  timeIn.textContent = convertTo12HourFormat(data.time_in);
  item.appendChild(timeIn);

  const button = document.createElement("button");
  button.className = "btn-confirm";
  button.textContent = "Time Out";
  button.addEventListener("click", (e) => {
    confirm.style.display = "flex";
    contentContainer.style.display = "none";
    document.querySelector(".summary.time-in").textContent =
      convertTo12HourFormat(data.time_in);
    if (compareTimes("12:00:00", getTime()) == "ahead") {
      document.querySelector(".summary.time-out").textContent =
        convertTo12HourFormat(data.time_out || getTime());
    } else {
      document.querySelector(".summary.time-out").style.display = "none";
      document.querySelector(".alter-time").style.display = "block";
      document.querySelector(".alter-time input").value = data.time_out;
      arb.value = data.time_out;

      document
        .querySelector(".alter-time input")
        .addEventListener("input", (e) => {
          arb.value = e.target.value;
          const { hours, minutes } = calculateTimeGap(
            data.time_in,
            document.querySelector(".alter-time input").value
          );
          document.querySelector(
            ".summary.hours"
          ).textContent = `${hours} Hours and ${minutes} minutes`;
        });
    }

    document.querySelector(".summary.date").textContent = data.date;
    const { hours, minutes } = calculateTimeGap(
      data.time_in,
      data.time_out || getTime()
    );
    document.querySelector(
      ".summary.hours"
    ).textContent = `${hours} Hours and ${minutes} minutes`;

    const confirmActionContainer = document.querySelector(".time-out-action");
    confirmActionContainer.innerHTML = "";

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.setAttribute("class", "time-out-cancel");

    const confirm_btn = document.createElement("button");
    confirm_btn.textContent = "Confirm";
    confirm_btn.setAttribute("class", "time-out-confirm");

    confirm_btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      handleTimeOut(data, document.querySelector("#arb").value);
    });
    cancel.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      arb.value = "";
      confirmActionContainer.innerHTML = "";
      confirm.style.display = "none";
      overlay.style.display = "none";
    });
    confirmActionContainer.appendChild(cancel);
    confirmActionContainer.appendChild(confirm_btn);
  });
  item.appendChild(button);
  return item;
}

function appendAttendanceItems(dataArray) {
  const parent = document.querySelector(".attendance-list");
  parent.innerHTML = "";
  dataArray.forEach((data) => {
    if (data.date === getDate() && data.status == "PENDING") {
      parent.appendChild(createAttendanceItem(data));
    }
  });
}

export function loadData() {
  ld().then((res) => {
    attendanceData = res;
    appendAttendanceItems(attendanceData);
  });
}

function searchAttendanceItems(query) {
  const filteredData = attendanceData.filter((item) => {
    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
    return fullName.includes(query.toLowerCase());
  });
  appendAttendanceItems(filteredData);
}

function handleTimeOut(datarg, arb) {
  const data = {
    id: datarg.id,
    timeOut: arb || datarg.time_out || getTime(),
  };
  _fetch("POST", `${currentDir}/php/attendance/time-out.php`, data)
    .then((response) => {
      playAnim();
      console.log(
        `Time out for record with ID: ${datarg.id} recorded successfully.`
      );
    })
    .catch((error) => {
      console.error("Error recording time out:", error);
    });
  document.querySelector("#arb").value = "";
}

function playAnim() {
  player.play();
  confirm.style.display = "none";
  contentContainer.style.display = "none";
  success.style.display = "flex";
  document.querySelector(".message").textContent = "Time-out Successful";
  setTimeout(() => {
    player.pause();
  }, 3950);

  setTimeout(() => {
    overlay.style.display = "none";
    success.style.display = "none";
    player.stop();
  }, 5000);
}

searchInput.addEventListener("input", (e) =>
  searchAttendanceItems(e.target.value)
);

window.addEventListener("DOMContentLoaded", loadData);
