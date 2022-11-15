import './css/styles.css';
import countryCardTemp from './templates/country-card.hbs';
import countryListTemp from './templates/country-list.hbs';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
import API from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
  ulEl: document.querySelector('.country-list'),
  divInfo: document.querySelector('.country-info'),
};
refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchCountry = e.target.value.trim();
  API.fetchCountryByName(searchCountry).then(countryMarkUp).catch(onFetchError);
}

function onFetchError(error) {
  Notiflix.Notify.warning('Oops, there is no country with that name');
}
function countryMarkUp(counrtyArr) {
  refs.ulEl.innerHTML = '';
  refs.divInfo.innerHTML = '';
  if (counrtyArr.length > 10) {
    console.log('Too many matches found. Please enter a more specific name.');
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (counrtyArr.length >= 2 && counrtyArr.length < 10) {
    const markUp = counrtyArr.map(country => countryListTemp(country)).join('');
    refs.ulEl.innerHTML = markUp;
  }
  if (counrtyArr.length === 1) {
    const markUp = counrtyArr.map(country => countryCardTemp(country)).join('');
    console.log(markUp);
    refs.divInfo.innerHTML = markUp;
  }
}
