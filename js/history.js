import { loadData } from "./utils/loadData.js";
import { convertTo12HourFormat } from "./utils/date.js";

let attendanceData = [];
const tableBody = document.querySelector("tbody");
const searchInput = document.querySelector(".search");
const courseSelect = document.querySelector(".select-course");
const yearSelect = document.querySelector(".select-year");
const dateSelect = document.querySelector(".select-date");

function createTableRow(data) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = `${data.first_name} ${data.last_name}`;
  row.appendChild(nameCell);

  const courseCell = document.createElement("td");
  courseCell.textContent = data.course;
  row.appendChild(courseCell);

  const yearCell = document.createElement("td");
  yearCell.textContent = data.year;
  row.appendChild(yearCell);

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

function populateDateDropdown(dates) {
  dates.forEach((date) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    dateSelect.appendChild(option);
  });
}

function getUniqueDates(dataArray) {
  const dates = new Set();
  dataArray.forEach((data) => dates.add(data.date));
  return Array.from(dates);
}

function filterData() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCourse = courseSelect.value;
  const selectedYear = yearSelect.value;
  const selectedDate = dateSelect.value;

  const filteredData = attendanceData.filter((data) => {
    const fullName = `${data.first_name} ${data.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchText);
    const matchesCourse = selectedCourse
      ? data.course === selectedCourse
      : true;
    const matchesYear = selectedYear ? data.year === selectedYear : true;
    const matchesDate = selectedDate ? data.date === selectedDate : true;

    return matchesSearch && matchesCourse && matchesYear && matchesDate;
  });

  populateTable(filteredData);
}

searchInput.addEventListener("input", filterData);
courseSelect.addEventListener("change", filterData);
yearSelect.addEventListener("change", filterData);
dateSelect.addEventListener("change", filterData);

loadData()
  .then((res) => {
    attendanceData = res;
    populateTable(attendanceData);

    const uniqueDates = getUniqueDates(attendanceData);
    populateDateDropdown(uniqueDates);
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });
