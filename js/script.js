// Global Variables
let foodNames = [];
let prices = [];
let amount = [];
let emptyBasket = document.getElementById("empty-basket");
let basketContent = document.getElementById("basket-content");
let basketSum = document.getElementById("basket-sum");
let sumText = document.getElementById("sum-text");

function init() {
  checkEmptyBasket();
}

function checkEmptyBasket() {
  if (foodNames.length == 0) {
    emptyBasket.classList.remove("d-none");
    basketSum.classList.add("d-none");
  }
  if (foodNames.length > 0) {
    emptyBasket.classList.add("d-none");
    basketSum.classList.remove("d-none");
  }
}

function loadBasket() {
  checkEmptyBasket();
  basketContent.innerHTML = "";
  for (let i = 0; i < foodNames.length; i++) {
    basketContent.innerHTML += /*html*/ `
    <div class="basket-item">
        <div class="basket-left">
            <div class="amount" id="amount${i}">${amount[i]}</div>
            <div class="title" id="title${i}">${foodNames[i]}</div>
        </div>
        <div class="basket-right">
            <div class="price" id="price${i}">${prices[i]} €</div>
            <div class="items-btn">
                <span onclick="removeItem(${i});">-</span>
                <span onclick="addAmount(${i});">+</span>
            </div>
        </div>
    </div>
    `;
  }
  addSumToDOM();
}

function addItem(foodName, price) {
  let arrayIndex = checkIfExists(foodName);
  if (arrayIndex >= 0) {
    addAmount(arrayIndex);
  }
  if (arrayIndex < 0) {
    foodNames.push(foodName);
    prices.push(price);
    amount.push(1);
  }
  checkEmptyBasket();
  loadBasket();
}

function removeItem(index) {
  if (amount[index] == 1) {
    foodNames.splice(index, 1);
    prices.splice(index, 1);
    amount.splice(index, 1);
  } else {
    prices[index] = (prices[index] / amount[index]) * (amount[index] - 1);
    amount[index]--;
  }

  loadBasket();
}

function addAmount(index) {
  let alreadyAdded = checkIfAlreadyAdded(index);
  if (alreadyAdded >= 0) {
    prices[alreadyAdded] =
      (prices[alreadyAdded] / amount[alreadyAdded]) *
      (amount[alreadyAdded] + 1);
    amount[alreadyAdded]++;
    loadBasket();
  }
}

function checkIfAlreadyAdded(index) {
  let foodName = document.getElementById(`title${index}`).innerHTML;
  let arrayIndex = foodNames.indexOf(foodName);
  return arrayIndex;
}

function checkIfExists(foodName) {
  let arrayIndex = foodNames.indexOf(foodName);
  if (arrayIndex > 0) {
    return arrayIndex;
  }
  return arrayIndex;
}

function calculateSum(arr) {
  const sum = arr.reduce((partialSum, a) => partialSum + a, 0);
  return sum;
}

function convertToGermanFloat(float) {
  float = float.toFixed(2).replace(".", ",");
  return float;
}

function addSumToDOM() {
  let sum = convertToGermanFloat(calculateSum(prices));
  sumText.innerText = "";
  sumText.innerText = `${sum} €`;
}
