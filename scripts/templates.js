/**
 * Makes the HTML card for one dish in the menu.
 * @param {Object[]} array - The dishes array
 * @param {number} index - Position of the dish in the array
 * @returns {string} The HTML of the card
 */
function getDishTemplate(array, index) {
    let html = `
    <div class="card">
        <img
            src="${array[index].image}"
            alt="${array[index].name}"
        />
        <div class="details">
            <div class="details-header">
                <h3>${array[index].name}</h3>
                <p>${formatPrice(array[index].price)}€</p>
            </div>

            <p>${array[index].description}</p>
            <button class="button-to-basket" onclick="addToBasket(${index})">
                Add to basket
            </button>
        </div>
    </div>
  `;
    return html;
}

/**
 * Makes the Delivery / Pickup switch, the active option follows the global deliveryMode.
 * @returns {string} The HTML of the switch
 */
function getDeliveryToggleTemplate() {
    return `
    <div class="delivery-toggle">
        <button class="${deliveryMode === "delivery" ? "active" : ""}" onclick="setDeliveryMode('delivery')">Delivery</button>
        <button class="${deliveryMode === "pickup" ? "active" : ""}" onclick="setDeliveryMode('pickup')">Pickup</button>
    </div>
  `;
}

/**
 * Makes the HTML for the basket when nothing is in it.
 * @returns {string} The HTML of the empty basket
 */
function getEmptyBasketTemplate() {
    let html = `
    <button class="dialog-close basket-close" onclick="toggleBasket()" aria-label="Close basket">✕</button>
    <h3>Your Basket</h3>
    ${getDeliveryToggleTemplate()}
    <p>Nothing here yet</p>
    <p>Go ahead and choose something delicious!</p>
    <img
        src="./assets/icon/shopping-cart.svg"
        alt="Shopping cart icon"
    />
  `;
    return html;
}

/**
 * Makes one line item in the basket (call it only for dishes with amount > 0).
 * @param {Object[]} array - The dishes array
 * @param {number} index - Position of the dish in the array
 * @returns {string} The HTML of the basket item
 */
function getBasketTemplate(array, index) {
    let dish = array[index];
    let html = `
    <div class="basket-item">
        <p class="basket-item-name">${dish.amount} x ${dish.name}</p>
        <div class="basket-item-row">
            <div class="amount-controls">
                <button class="amount-button" aria-label="Remove all ${dish.name}" onclick="removeAll(${index})">
                    <img src="./assets/icon/trash.svg" alt="" />
                </button>
                <button class="amount-button" aria-label="Remove one ${dish.name}" onclick="removeOne(${index})">-</button>
                <span>${dish.amount}</span>
                <button class="amount-button" aria-label="Add one ${dish.name}" onclick="addToBasket(${index})">+</button>
            </div>
            <p class="basket-item-price">${formatPrice(dish.price * dish.amount)}€</p>
        </div>
    </div>
  `;
    return html;
}

/**
 * Makes the whole filled basket: title, item list, totals and buy button.
 * @param {string} itemsHtml - The HTML of all basket items
 * @param {number} subtotal - The price of all dishes
 * @param {number} deliveryFee - The delivery fee (0 for pickup)
 * @returns {string} The HTML of the filled basket
 */
function getFilledBasketTemplate(itemsHtml, subtotal, deliveryFee) {
    let total = subtotal + deliveryFee;
    let html = `
    <button class="dialog-close basket-close" onclick="toggleBasket()" aria-label="Close basket">✕</button>
    <h3>Your Basket</h3>
    ${getDeliveryToggleTemplate()}
    <div class="basket-items">${itemsHtml}</div>
    <div class="basket-summary">
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Delivery fee</span><span>${formatPrice(deliveryFee)}</span></div>
        <div class="summary-row summary-total"><span>Total</span><span>${formatPrice(total)}€</span></div>
    </div>
    <button class="button-buy" onclick="buy()">Buy now (${formatPrice(total)}€)</button>
  `;
    return html;
}

/**
 * Makes one category section with its header and dish cards.
 * @param {Object} category - The category (id, title, icon)
 * @param {string} cardsHtml - The HTML of the dish cards in this category
 * @returns {string} The HTML of the section
 */
function getCategoryTemplate(category, cardsHtml) {
    return `
        <section class="menu-category" id="${category.id}">
            <div class="category-header">
                <div class="category-header-inner">
                    <img src="${category.icon}" alt="" />
                    <h2>${category.title}</h2>
                </div>
            </div>
            <div class="menu-cards">${cardsHtml}</div>
        </section>
    `;
}

/**
 * Makes one link for the navigation.
 * @param {Object} category - The category (id, title, icon)
 * @returns {string} The HTML of the nav link
 */
function getNavTemplate(category) {
    return `
    <a class="nav-item" href="#${category.id}">${category.title}</a>
  `;
}
