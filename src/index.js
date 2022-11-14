import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
// import fetchCountries from "./fetchCountries";
const DEBOUNCE_DELAY = 300;
const refs = {
  innerText: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  infoCoutry: document.querySelector('.country-info'),
};

refs.innerText.addEventListener(
  'input',
  debounce(searchCoutry, DEBOUNCE_DELAY)
);

function searchCoutry(event) {
  event.preventDefault();
  const inputValue = refs.innerText.value.trim();
  console.log(inputValue);
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(responce => responce.json())
    .then(data => console.log('name', name));
}
fetchCountries('sw');
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });
