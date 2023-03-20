// Global Variables
let foodNames = [];
let prices = [];
let amount = [];
let emptyBasket = document.getElementById("empty-basket");
let basketContent = document.getElementById("basket-content");

function checkBasket() {
  if (foodNames.length < 1) {
    if (emptyBasket.classList.contains("d-none")) {
      return true;
    } else {
      emptyBasket.classList.toggle("d-none");
    }
  } else {
    if (emptyBasket.classList.contains("d-none")) {
      emptyBasket.classList.toggle("d-none");
    }
  }
}
function loadBasket() {
  basketContent.innerHTML = "";

  for (let i = 0; i < foodNames.length; i++) {
    basketContent.innerHTML += `
    <div class="basket-item">
        <div class="basket-left">
            <div class="amount" id="amount${i}">1</div>
            <div class="title" id="title${i}">${foodNames[i]}</div>
        </div>
        <div class="basket-right">
            <div class="price" id="price${i}">${prices[i]} €</div>
            <div class="items-btn">
                <span>-</span>
                <span>+</span>
            </div>
        </div>
    </div>
    `;
  }
}

function addItem(foodName, price) {
  foodNames.push(foodName);
  prices.push(price);
  loadBasket();
}
