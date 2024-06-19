import { getDate, getTime } from "../../js/utils/date.js";
setInterval(() => {
  const time = getTime();
  const date = getDate();
  document.querySelector(".time").textContent = time;
  document.querySelector(".date").textContent = date;
});
