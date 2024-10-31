let apiKey = "d2929029d4610deaa4c34a07";
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const resetBtn = document.getElementById("reset");
const amount = document.getElementById("amount");


resetBtn.addEventListener('click', () => resetPage());

//Create dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

//Repeat same thing for the other dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

//Setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

let convertCurrency = () => {
  //Create References
  
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  //If amount input field is not empty
  if (amount.value.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount.value / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount.value} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
};

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);


function resetPage(){
  // window.location.reload();
  console.log("resetting")
  amount.value = "";
  result.innerHTML = "";
}

