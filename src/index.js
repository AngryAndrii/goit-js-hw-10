'use strict';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
// 'live_vpvUjSl35zCQrr2xVBQkxMWUrItKUIxcePkJ0efHivlt5bmWOjY1RonXbknluLML';

Notiflix.Notify.init({
  width: '350px',
  position: 'center-top',
});

const selectBreedElem = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

loaderElement.classList.remove('is-hidden');

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
  new SlimSelect({
    select: selectBreedElem,
  });
  loaderElement.classList.add('is-hidden');
  selectBreedElem.classList.remove('is-hidden');
});

selectBreedElem.addEventListener('change', function (event) {
  catInfoContainer.classList.add('is-hidden');
  loaderElement.classList.remove('is-hidden');
  fetchCatByBreed(event.target.value).then(data => {
    console.log(data);
    if (data.length == 0) {
      Notiflix.Notify.failure('data undefined, please try later');
      return;
    }
    let dataObj = {
      url: data[0].url,
      name: data[0].breeds[0].name,
      temperament: data[0].breeds[0].temperament,
    };
    makeElem(dataObj);
  });
});

const makeElem = ({ url, name, temperament }) => {
  let card = `<div class="cat-photo"><img
     src="${url}"
     alt=""
     width="450px"
   /></div><div class="description-container">
      <div class="full-name">${name}</div>
      <div class="temperament">
        ${temperament}
      </div></div>`;
  catInfoContainer.innerHTML = card;
  loaderElement.classList.add('is-hidden');
  catInfoContainer.classList.remove('is-hidden');
};
