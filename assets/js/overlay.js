import { loadData } from '../../js/loadData.js';

const overlay = document.querySelector('.overlay');
const input_overlay = document.querySelector('.input-form');
const time_out_overlay = document.querySelector('.time-out-list-container');
const time_in = document.querySelector('.actions .time-in');
const time_out = document.querySelector('.actions .time-out');
const form = document.querySelector('.input-form form');
const confirm = document.querySelector('.confirm');
const success = document.querySelector('.success');

time_in.addEventListener('click', (e) => {
  e.preventDefault();
  form.reset();
  overlay.style.display = 'flex';
  input_overlay.style.display = 'grid';
});
time_out.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.style.display = 'flex';
  time_out_overlay.style.display = 'grid';
  loadData();
});

input_overlay.addEventListener('click', (e) => {
  e.stopPropagation();
});
time_out_overlay.addEventListener('click', (e) => {
  e.stopPropagation();
});

overlay.addEventListener('click', (e) => {
  document.querySelector('.search').value = '';
  confirm.style.display = 'none';
  e.target.style.display = 'none';
  input_overlay.style.display = 'none';
  time_out_overlay.style.display = 'none';
  success.style.display = 'none';
});
