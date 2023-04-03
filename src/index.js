import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

const debounce = require('lodash.debounce');
const Notiflix = require('notiflix');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const emptyMarkup = empty => (empty.innerHTML = '');

const iHandler = e => {
  const trimInput = e.target.value.trim();

  console.log(trimInput);

  if (!trimInput) {
    emptyMarkup(countryList);
    emptyMarkup(countryInfo);
    return;
  }

  fetchCountries(trimInput)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        emptyMarkup(countryList);
        emptyMarkup(countryInfo);
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );

        return;
      }
      nextMarkup(data);
    })

    .catch(error => {
      emptyMarkup(countryList);
      emptyMarkup(countryInfo);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

const makeInfoMarkup = data => {
  return data
    .map(country => {
      return `
          <p> <img style="height:20px;width:30px" src= "${
            country.flags.svg
          }"/>        
          ${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
         
          <p><b>Languages</b>: ${Object.values(country.languages)}</p>
        `;
    })
    .join('');
};

const makeListMarkup = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<li style = "list-style: none"> <img style="height:20px;width:30px" src= "${flags.svg}"/> ${name.official}</li>`
    )
    .join('');
};

const nextMarkup = data => {
  if (data.length === 1) {
    emptyMarkup(countryList);
    const oneCountry = makeInfoMarkup(data);
    console.log(data);
    countryInfo.innerHTML = oneCountry;
  } else {
    emptyMarkup(countryInfo);
    const countriesMarkup = makeListMarkup(data);
    console.log(data);
    countryList.innerHTML = countriesMarkup;
  }
};

// Data handling
//   .catch(error => {
//    console.error('Problem', error);
// Error handling
// });
//};
//let name = input.value;
//console.log(fetchCountries('name'));

input.addEventListener('input', debounce(iHandler, DEBOUNCE_DELAY));
