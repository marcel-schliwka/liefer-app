// Global Variables
let foodNames = [];
let prices = [];
let amount = [];
let emptyBasket = document.getElementById("empty-basket");
let basketContent = document.getElementById("basket-content");
let basketSum = document.getElementById("basket-sum");
let sumText = document.getElementById("sum-text");
let buyButtonPrice = document.getElementById("buy-button-price");
let basketMobileBtnPrice = document.getElementById("basket-mobile-btn-price");
let mainLeft = document.getElementById("main-left");
let mainRight = document.getElementById("main-right");
let orderCompletedWrapper = document.getElementById("order-completed-wrapper");
let basketMobileBtn = document.getElementById("basket-mobile-btn");
let mainWrapper = document.querySelector("main");
let footer = document.querySelector("footer");

window.addEventListener("resize", function () {
  checkScreenWidth();
});

function init() {
  checkEmptyBasket();
  checkScreenWidth();
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
  buyButtonPrice.innerText = "";
  buyButtonPrice.innerText = `(${sum} €)`;
  basketMobileBtnPrice.innerText = "";
  basketMobileBtnPrice.innerText = `(${sum} €)`;
}

function orderCompleted() {
  orderCompletedWrapper.classList.remove("d-none");
  mainRight.classList.add("d-none");
  mainLeft.classList.add("d-none");
}

function showBasketMobile() {
  basketMobileBtn.innerText = "Warenkorb schließen";
  basketMobileBtn.setAttribute("onclick", "hideMobileBasket();");
  mainLeft.classList.add("d-none");
  mainRight.style.display = "flex";
  mainRight.style.width = "90%";
  mainWrapper.style.justifyContent = "center";
  footer.classList.add("d-none");
}

function hideMobileBasket() {
  basketMobileBtn.innerText = "Warenkorb";
  basketMobileBtn.setAttribute("onclick", "showBasketMobile();");
  mainLeft.classList.remove("d-none");
  mainRight.style.display = "";
  mainRight.style.width = "30%";
  mainWrapper.style.justifyContent = "";
  footer.classList.remove("d-none");
}

function checkScreenWidth() {
  let width = window.innerWidth;
  if (width < 635) {
    document
      .getElementById("pizza-container")
      .setAttribute("onclick", "addItem('Pizza en la roma (Ø 26cm)', 7.50)");
    document
      .getElementById("pasta-container")
      .setAttribute("onclick", "addItem('Pasta alla Marcel', 9.00)");
    document
      .getElementById("salad-container")
      .setAttribute("onclick", "addItem('Türkischer Salat', 10.75)");
    document
      .getElementById("vine-container")
      .setAttribute("onclick", "addItem('Weinblätter (8 Stück)', 5.00)");
    document
      .getElementById("mai-thai-container")
      .setAttribute("onclick", "addItem('Mai Thai Box', 10.75)");
  }
  if (width > 635) {
    document.getElementById("pizza-container").removeAttribute("onclick");
    document.getElementById("pasta-container").removeAttribute("onclick");
    document.getElementById("salad-container").removeAttribute("onclick");
    document.getElementById("vine-container").removeAttribute("onclick");
    document.getElementById("mai-thai-container").removeAttribute("onclick");
  }
}
