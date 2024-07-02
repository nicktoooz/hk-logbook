export function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  return `${year}-${month}-${day}`;
}

export function getTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

export function compareTimes(time1, time2) {
  const time1Parts = time1.split(":");
  const time2Parts = time2.split(":");

  const date1 = new Date();
  date1.setHours(
    parseInt(time1Parts[0]),
    parseInt(time1Parts[1]),
    parseInt(time1Parts[2]),
    0
  );

  const date2 = new Date();
  date2.setHours(
    parseInt(time2Parts[0]),
    parseInt(time2Parts[1]),
    parseInt(time2Parts[2]),
    0
  );

  if (date1 > date2) {
    return "ahead";
  } else if (date1 < date2) {
    return "late";
  } else {
    return "same";
  }
}

export function convertTo12HourFormat(time24 = "00:00:00") {
  const [hours, minutes] = time24.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function calculateTimeGap(timeIn, timeOut) {
  const timeInDate = parseTimeToDate(timeIn);
  const timeOutDate = parseTimeToDate(timeOut);

  const diff = timeOutDate - timeInDate;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
}

function parseTimeToDate(timeStr) {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours);
  minutes = parseInt(minutes);

  // Adjust for AM/PM
  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date;
}
