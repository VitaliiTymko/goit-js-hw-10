import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
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
  fetchCountries(inputValue).then(renderСountryList).catch(console.log);
}

// function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   )
//     .then(responce => responce.json())
//     .then(data => console.log('name', name));
// };

function clear (){
  refs.listCountry.innerHTML = '';
  refs.infoCoutry.innerHTML = '';
}

function renderСountryList(backendResponse) {
  console.log(backendResponse);
  clear();
  if (backendResponse.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (backendResponse.length === 1) {
    refs.infoCoutry.innerHTML = renderCountryInfo(backendResponse[0]);
  } else {
    const renderListCountry = backendResponse
      .map(country => renderCountriesList(country))
      .join('');
      refs.listCountry.insertAdjacentHTML('beforeend', renderListCountry);
  }
};

function renderCountriesList({ flags, name }) {
  return `<li class="country-listInfo">
          <img class="country-flag" src="${flags.svg}" width="50" height="50"/>
          <h2 class="country-listName">${name.official}</h2>
          </li>`;
}

function renderCountryInfo({ name, flags, capital, population, languages }) {
  return `<li class="country-firstInfo">
          <div class="country-infoList">

  <img class="country-flagInfo" src="${flags.svg}" width="300" height="300"/>
  <h2 class="country-listName">${name.official}</h2>

  <p><b> capital:</b> ${capital}</p>
  <p><b> population:</b> ${population}</p>
  <p><b> languages:</b> ${Object.values(languages)}</p>
  </div>
  </li>`;
}

// fetchCountries('sw');

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

// responseAPI