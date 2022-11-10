import './style.css';
import Swal from 'sweetalert2';

const searchButton = document.getElementById('btn-search');
const textInput = document.getElementById('text-input');
const ul = document.querySelector('.coins');
let coinsTitle = document.querySelector('.coins-title')
const API = 'https://api.exchangerate.host/latest?base=';

function fetchAPI(coin) {
  return fetch(`${API}${coin}`)
    .then((response) => response.json())
    .then((data) => data.rates);
}
function renderCoins(coins) {
  ul.innerHTML = '';
  
  const coinsArray = Object.entries(coins);
  coinsArray.forEach((coinn) => {

    const [coinName, value] = coinn;
    const li = document.createElement('li');
    li.textContent = `${coinName} - ${value}`;
    ul.appendChild(li);
  });
}
searchButton.addEventListener('click', () => {
    const coin = textInput.value;
    coinsTitle.innerHTML = `Valores referentes a 1 ${coin.toUpperCase()}`
    if(!coin) {
        return Swal.fire({
            icon: 'error',
            title: 'Opsss',
            text: 'Você precisa digitar uma moeda',
        });
    }

  fetchAPI(coin)
  .then(renderCoins);
});
