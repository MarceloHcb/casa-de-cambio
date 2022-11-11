import './style.css';
import Swal from 'sweetalert2';

const searchButton = document.getElementById('btn-search');
const textInput = document.getElementById('text-input');
const ul = document.querySelector('.coins');
const coinsTitle = document.querySelector('.coins-title');
const API = 'https://api.exchangerate.host/latest?base=';

function fetchAPI(coin) {
  return fetch(`${API}${coin}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.base !== coin.toUpperCase()) {
        throw new Error('Moeda não existente!');
      }
      return data.rates;
    });
}
function renderCoins(coins) {
  ul.innerHTML = '';

  const coinsArray = Object.entries(coins);
  coinsArray.forEach((coinn) => {
    const [coinName, value] = coinn;
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.textContent = `${coinName} - `;
    span.textContent = `${value}`;
    ul.appendChild(li);
    li.appendChild(span);
  });
}
function handleSearch() {
  const coin = textInput.value.toUpperCase();
  coinsTitle.innerHTML = `Valores referentes a 1 ${coin.toUpperCase()}`;
  if (!coin) {
    return Swal.fire({
      icon: 'error',
      title: 'Opsss...',
      text: 'Você precisa digitar uma moeda',
    });
  }

  fetchAPI(coin)
    .then(renderCoins)
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Opsss...',
        text: error.message,
      });
    });
}
searchButton.addEventListener('click', handleSearch);
