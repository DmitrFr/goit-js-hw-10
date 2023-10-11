// live_ygZhRElVuVclJHiSS3DpSFotaKWPukz7orEZJ2YHjSustaeBiglebqFXeCC5MG0J

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { hello } from './cat-api';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_ygZhRElVuVclJHiSS3DpSFotaKWPukz7orEZJ2YHjSustaeBiglebqFXeCC5MG0J';

const selectEl = document.querySelector('select.breed-select');
const divEl = document.querySelector('div.cat-info ');
const loaderEl = document.querySelector('p.loader');
const errorEl = document.querySelector('p.error');
let userSelect = '';

errorEl.classList.add('is-hidden');
selectEl.classList.add('is-hidden');

fetchBreeds()
  .then(response => {
    loaderEl.classList.add('is-hidden');
    return response;
  })
  .then(createSelectMarkup)
  .catch(error => {
    errorEl.classList.remove('is-hidden');
    loaderEl.classList.add('is-hidden');
  });

function createSelectMarkup(data) {
  selectEl.classList.remove('is-hidden');
  for (const i of data.data) {
    const markup = `<option value="${i.id}">${i.name}</option>`;
    selectEl.insertAdjacentHTML('beforeend', markup);
  }
}

selectEl.addEventListener('change', onSelectChange);

function onSelectChange() {
  loaderEl.classList.remove('is-hidden');
  divEl.classList.add('is-hidden');
  fetchCatByBreed(selectEl.value)
    .then(createFunnyKittyPage)
    .catch(error => {
      errorEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');
      selectEl.classList.add('is-hidden');
    });
}

function createFunnyKittyPage(response) {
  const imageUrl = response.data[0].url;
  const catName = response.data[0].breeds[0].name;
  const catDescription = response.data[0].breeds[0].description;
  const catTemperament = response.data[0].breeds[0].temperament;
  loaderEl.classList.add('is-hidden');
  divEl.classList.remove('is-hidden');
  return (divEl.innerHTML = `
    <img src="${imageUrl}" alt="${catName}" height="400">
    <h2>${catName}</h2>
    <p>${catDescription}</p>
    <p><span>Temperament: </span>${catTemperament}</p>`);
}
