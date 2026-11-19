const DELIVERY_FEE = 4.99;
const DIALOG_REF = document.getElementById("finished_order_dialog");
let dishes;

function init() {
    dishes = dishesArray;
    renderMenu();
    loadBasket();
    updateBasket();
}

function renderNav() {
  
}

function renderMenu() {
  let html = "";
  for (let i = 0; i < categories.length; i++) {
    let cardsHtml = "";
    for (let j = 0; j < dishes.length; j++) {
      if (dishes[j].category === categories[i].id) {
        cardsHtml += getDishTemplate(dishes, j);
      }
    }
    html += getCategoryTemplate(categories[i], cardsHtml);
  }
  document.getElementById("menu").innerHTML = html;
}

// Saved as { "Dish name": amount } so reordering dishes in db.js can't mix up amounts
function saveBasket() {
    const AMOUNTS = {};
    for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].amount > 0) {
            AMOUNTS[dishes[i].name] = dishes[i].amount;
        }
    }
    try {
        localStorage.setItem("basket", JSON.stringify(AMOUNTS));
    } catch (error) {
        // storage full or blocked (e.g. private mode): the basket just won't persist
    }
}

function loadBasket() {
    let saved = {};
    try {
        saved = JSON.parse(localStorage.getItem("basket")) || {};
    } catch (error) {
        localStorage.removeItem("basket"); // corrupt data: start with an empty basket
    }

    for (let i = 0; i < dishes.length; i++) {
        const AMOUNT = Number(saved[dishes[i].name]);
        // ignore anything that isn't a positive whole number
        dishes[i].amount = Number.isInteger(AMOUNT) && AMOUNT > 0 ? AMOUNT : 0;
    }
}

function formatPrice(price) {
    return price.toFixed(2).replace(".", ",");
}

function updateBasket() {
    const BASKET_REF = document.getElementById("basket");
    let itemsHtml = "";
    let subtotal = 0;

    for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].amount > 0) {
            itemsHtml += getBasketTemplate(dishes, i);
            subtotal += dishes[i].price * dishes[i].amount;
        }
    }

    if (itemsHtml === "") {
        BASKET_REF.innerHTML = getEmptyBasketTemplate();
    } else {
        BASKET_REF.innerHTML = getFilledBasketTemplate(
            itemsHtml,
            subtotal,
            DELIVERY_FEE,
        );
    }
}

function addToBasket(index) {
    dishes[index].amount++;
    saveBasket();
    updateBasket();
}

function removeAll(index) {
    dishes[index].amount = 0;
    saveBasket();
    updateBasket();
}

function removeOne(index) {
    if (dishes[index].amount > 0) {
        dishes[index].amount--;
    }
    saveBasket();
    updateBasket();
}

function resetBasket() {
  for (let i = 0; i < dishes.length; i++) {
    dishes[i].amount = 0;
  }
  saveBasket();
  updateBasket();
}

function buy() {
  openDialog();
  resetBasket();
  document.getElementById("basket").classList.remove("open");
}

function openDialog() {
    DIALOG_REF.showModal();
}

function closeDialog() {
    DIALOG_REF.close();
}

function closeOnBackdrop(event) {
  if (event.target === DIALOG_REF) {
    closeDialog();
  }
}

function toggleBasket() {
  document.getElementById("basket").classList.toggle("open");
}