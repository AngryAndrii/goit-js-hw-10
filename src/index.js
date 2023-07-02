'use strict';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
// 'live_vpvUjSl35zCQrr2xVBQkxMWUrItKUIxcePkJ0efHivlt5bmWOjY1RonXbknluLML';

const selectBreedElem = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');

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
});

selectBreedElem.addEventListener('change', function (event) {
  fetchCatByBreed(event.target.value).then(data => {
    console.log(data);
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
   /></div>
      <div class="full-name">${name}</div>
      <div class="temperament">
        ${temperament}
      </div>`;
  catInfoContainer.innerHTML = card;
};
