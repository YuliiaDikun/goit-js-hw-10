function fetchCountryByName(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.warning('Oops, there is no country with that name');
    }
    return response.json();
  });
}
export default { fetchCountryByName };
