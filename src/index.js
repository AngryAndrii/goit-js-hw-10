'use strict';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_vpvUjSl35zCQrr2xVBQkxMWUrItKUIxcePkJ0efHivlt5bmWOjY1RonXbknluLML';

const selectBreedElem = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');

const photoDiv = document.querySelector('.cat-photo');
const nameDiv = document.querySelector('.full-name');
const tempDiv = document.querySelector('.temperament');

fetchBreeds().then(data => {
  selectBreedElem.insertAdjacentHTML(
    'beforeend',
    `<option value="null" selected>please select the breed</option>`
  );
  data.forEach(el => {
    selectBreedElem.insertAdjacentHTML(
      'beforeend',
      `<option value="${el.value}">${el.label}</option>`
    );
  });
});

selectBreedElem.addEventListener('change', function (event) {
  fetchCatByBreed(event.target.value).then(data => {
    console.log(data);
    photoDiv.innerHTML = '';
    photoDiv.insertAdjacentHTML(
      'beforeend',
      `<img
        src="${data[0].url}"
        alt=""
        width="450px"
      />`
    );
    nameDiv.innerHTML = '';
    nameDiv.insertAdjacentHTML(
      'beforeend',
      `<p class="ppp">${data[0].breeds[0].name}</p>`
    );
    tempDiv.innerHTML = '';
    tempDiv.insertAdjacentHTML(
      'beforeend',
      `<p class="ppp">${data[0].breeds[0].temperament}</p>`
    );
  });
});
