const DELIVERY_FEE = 4.99;
const DIALOG_REF = document.getElementById("finished_order_dialog");

function init() {
    renderCards();
    updateBasket();
}

function renderCards() {
    const CARD_REF = document.getElementById("cards");
    let html = "";

    for (let i = 0; i < dishes.length; i++) {
        html += getDishTemplate(dishes, i);
    }

    CARD_REF.innerHTML = html;
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
    updateBasket();
}

function removeAll(index) {
    dishes[index].amount = 0;
    updateBasket();
}

function removeOne(index) {
    if (dishes[index].amount > 0) {
        dishes[index].amount--;
    }
    updateBasket();
}

function resetBasket() {
  for (let i = 0; i < dishes.length; i++) {
    dishes[i].amount = 0;
  }
  updateBasket();
}

function buy() {
  openDialog();
  resetBasket();
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