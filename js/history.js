import { loadData } from "./utils/loadData.js";
import { convertTo12HourFormat, getDate, getTime } from "./utils/date.js";


let attendanceData = [];
const tableBody = document.querySelector("tbody");
const searchInput = document.querySelector(".search");
const courseSelect = document.querySelector(".select-course");
const yearSelect = document.querySelector(".select-year");
const dateSelect = document.querySelector(".select-date");
const exportBtn = document.getElementById("export-btn");

function createTableRow(data) {
  const row = document.createElement("tr");

  const idCell = document.createElement("td");
  idCell.textContent = `${data.student_number}`;
  row.appendChild(idCell);

  const nameCell = document.createElement("td");
  nameCell.textContent = `${data.first_name} ${data.last_name}`;
  row.appendChild(nameCell);

  const courseCell = document.createElement("td");
  courseCell.textContent = data.course;
  row.appendChild(courseCell);

  const yearCell = document.createElement("td");
  yearCell.textContent = data.year;
  row.appendChild(yearCell);

  const teacherCell = document.createElement("td");
  teacherCell.textContent = data.teacher;
  row.appendChild(teacherCell);

  const areaCell = document.createElement("td");
  areaCell.textContent = data.area;
  row.appendChild(areaCell);

  const timeInCell = document.createElement("td");
  timeInCell.textContent = convertTo12HourFormat(data.time_in);
  row.appendChild(timeInCell);

  const timeOutCell = document.createElement("td");
  timeOutCell.textContent = data.time_out
    ? convertTo12HourFormat(data.time_out)
    : "N/A";
  row.appendChild(timeOutCell);

  const dateCell = document.createElement("td");
  dateCell.textContent = data.date;
  row.appendChild(dateCell);

  return row;
}

function populateTable(dataArray) {
  tableBody.innerHTML = "";
  dataArray.forEach((data) => {
    const row = createTableRow(data);
    tableBody.appendChild(row);
  });
}

function populateDateDropdown(data) {
  const dateSet = new Set();
  data.forEach((item) =>
    dateSet.add(new Date(item.date).toISOString().slice(0, 10))
  );

  dateSet.forEach((date) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    dateSelect.appendChild(option);
  });
}

function exportToExcel() {
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  const data = rows.map((row) => {
    return Array.from(row.querySelectorAll("td")).map((cell) =>
      cell.textContent.trim()
    );
  });

  const headers = [
    'Student ID',
    "Full Name",
    "Course",
    "Year",
    "Teacher",
    "Area",
    "Time In",
    "Time Out",
    "Date",
  ];
  data.unshift(headers);

  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = ws["!cols"] || [];
  ws["!cols"][0] = { wch: 20 };
  ws["!cols"][1] = { wch: 30 };
  ws["!cols"][4] = { wch: 15 };
  ws["!cols"][5] = { wch: 10 };
  ws["!cols"][8] = { wch: 10 };

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Attendance");
  XLSX.writeFile(wb, `HK_Attendance_${getDate()}${getTime()}.xlsx`);
}

function filterData() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCourse = courseSelect.value;
  const selectedYear = yearSelect.value;
  const selectedDate = dateSelect.value;

  const filteredData = attendanceData.filter((data) => {
    const fullName = `${data.first_name} ${data.last_name}`.toLowerCase();
    const normalizedDataDate = new Date(data.date).toISOString().slice(0, 10);

    return (
      fullName.includes(searchText) &&
      (selectedCourse ? data.course === selectedCourse : true) &&
      (selectedYear ? data.year === selectedYear : true) &&
      (selectedDate ? normalizedDataDate === selectedDate : true)
    );
  });

  populateTable(filteredData);
}

searchInput.addEventListener("input", filterData);
courseSelect.addEventListener("change", filterData);
yearSelect.addEventListener("change", filterData);
dateSelect.addEventListener("change", filterData);
exportBtn.addEventListener("click", exportToExcel);

loadData()
  .then((res) => {
    attendanceData = res;
    populateTable(attendanceData);
    populateDateDropdown(attendanceData);
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });
