export function fetchCountries(name) {
  const basicURL = 'https://restcountries.com/v3.1/name/';
  const filters = '?fields=name,capital,population,flags,languages';

  return fetch(`${basicURL}${name}${filters}`).then(response => {
    if (!response.ok) {
      throw new Error('Problem-404');
    }
    // Response handling
    return response.json();
  });
}
