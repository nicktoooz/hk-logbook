import { getDate, getTime } from "../../js/utils/date.js";
setInterval(() => {
  const time = getTime();
  const date = getDate();
  document.querySelector(".value.time").textContent = time;
  document.querySelector(".value.date").textContent = date;
});
