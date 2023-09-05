const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

const apiURL = 'https://api.coingecko.com/api/v3/coins/markets';

function fetchCryptoData(searchTerm = '') {
  fetch(`${apiURL}?vs_currency=usd`)
    .then(response => response.json())
    .then(data => {
      const filteredResults = data.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
      displayResults(filteredResults);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function displayResults(results) {
  resultsDiv.innerHTML = '';
  results.forEach(coin => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');

    const nameElement = document.createElement('h2');
    nameElement.textContent = coin.name;

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${coin.current_price}`;

    resultElement.appendChild(nameElement);
    resultElement.appendChild(priceElement);
    resultsDiv.appendChild(resultElement);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetchCryptoData();
});

searchInput.addEventListener('input', function () {
  fetchCryptoData(searchInput.value);
});
