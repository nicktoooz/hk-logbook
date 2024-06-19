import currentDir from "./currentDir.js";
import { _fetch } from "./fetch.js";

export function loadData() {
  return _fetch("GET", `${currentDir}/php/attendance/fetch.php`).then((res) => {
    const attendanceData = res.data.reverse();
    return attendanceData;
  });
}
