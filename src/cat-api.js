'use strict';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '350px',
  position: 'center-top',
});

const urlForBreeds = 'https://api.thecatapi.com/v1/breeds';
const urlForOneBreed = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

const options = {
  headers: {
    'x-api-key':
      'live_vpvUjSl35zCQrr2xVBQkxMWUrItKUIxcePkJ0efHivlt5bmWOjY1RonXbknluLML',
  },
};

function fetchBreeds() {
  return fetch(urlForBreeds, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    })
    .then(data => {
      console.log(data);
      return data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    })
    .catch(err => {
      Notiflix.Notify.failure('Failure, please try later');
      console.log('Failure', err);
    });
}

//------------------------------------------------------------------------------------------

function fetchCatByBreed(breedId) {
  return fetch(`${urlForOneBreed}${breedId}`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .catch(err => {
      Notiflix.Notify.failure('Failure, please try later');
      console.log('Failure', err);
    });
}

//---------------------------------------------------------------------------------------------

export { fetchBreeds, fetchCatByBreed };
