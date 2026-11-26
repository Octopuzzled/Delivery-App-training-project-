let deliveryMode = "delivery";
const DELIVERY_FEE = 4.99;
const DIALOG_REF = document.getElementById("finished_order_dialog");
let dishes;

/**
 * Starts the app: gets the dishes, shows menu + nav and loads the basket.
 */
function init() {
    dishes = dishesArray;
    renderMenu();
    renderNav();
    loadBasket();
    updateBasket();
}

/**
 * Puts a nav link for every category into the navigation.
 */
function renderNav() {
    let html = "";
    const NAV_REF = document.getElementById("navigation");
    for (let i = 0; i < categories.length; i++) {
        html += getNavTemplate(categories[i]);
    }
    NAV_REF.innerHTML = html;
}

/**
 * Shows all categories with their dish cards in the menu.
 * A dish goes into a category if the category id matches.
 */
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

/**
 * Saves the basket in the localStorage.
 * Saved as { "Dish name": amount } so reordering dishes in db.js can't mix up amounts
 */
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

/**
 * Loads the saved amounts from the localStorage and sets them on the dishes.
 * If something is wrong with the data the amount is just 0.
 */
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

/**
 * Makes a price look nice with 2 decimals and a comma.
 * @param {number} price - The price as a number, e.g. 11.9
 * @returns {string} The formatted price, e.g. "11,90"
 */
function formatPrice(price) {
    return price.toFixed(2).replace(".", ",");
}

/**
 * Builds the HTML for all dishes that are in the basket.
 * @returns {string} The HTML of the basket items (empty string if nothing is in there)
 */
function getBasketItemsHtml() {
    let itemsHtml = "";
    for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].amount > 0) {
            itemsHtml += getBasketTemplate(dishes, i);
        }
    }
    return itemsHtml;
}

/**
 * Adds up price * amount of all dishes (without delivery fee).
 * @returns {number} The subtotal
 */
function getSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < dishes.length; i++) {
        subtotal += dishes[i].price * dishes[i].amount;
    }
    return subtotal;
}

/**
 * Gives back the delivery fee. Pickup is free.
 * @returns {number} The fee for delivery, otherwise 0
 */
function getDeliveryFee() {
    return deliveryMode === "delivery" ? DELIVERY_FEE : 0;
}

/**
 * Renders the basket again (empty or filled) and updates the badge.
 */
function updateBasket() {
    const BASKET_REF = document.getElementById("basket");
    const ITEMS_HTML = getBasketItemsHtml();
    if (ITEMS_HTML === "") {
        BASKET_REF.innerHTML = getEmptyBasketTemplate();
    } else {
        BASKET_REF.innerHTML = getFilledBasketTemplate(
            ITEMS_HTML,
            getSubtotal(),
            getDeliveryFee(),
        );
    }
    updateBasketBadge();
}

/**
 * Adds one more of a dish to the basket.
 * @param {number} index - Position of the dish in the dishes array
 */
function addToBasket(index) {
    dishes[index].amount++;
    saveBasket();
    updateBasket();
}

/**
 * Takes a dish completely out of the basket.
 * @param {number} index - Position of the dish in the dishes array
 */
function removeAll(index) {
    dishes[index].amount = 0;
    saveBasket();
    updateBasket();
}

/**
 * Removes one of a dish from the basket (never goes below 0).
 * @param {number} index - Position of the dish in the dishes array
 */
function removeOne(index) {
    if (dishes[index].amount > 0) {
        dishes[index].amount--;
    }
    saveBasket();
    updateBasket();
}

/**
 * Sets all amounts back to 0 so the basket is empty.
 */
function resetBasket() {
    for (let i = 0; i < dishes.length; i++) {
        dishes[i].amount = 0;
    }
    saveBasket();
    updateBasket();
}

/**
 * Finishes the order: shows the dialog, empties the basket and closes it.
 */
function buy() {
    openDialog();
    resetBasket();
    document.getElementById("basket").classList.remove("open");
    document.body.classList.remove("basket-open");
}

/**
 * Opens the "order finished" dialog.
 */
function openDialog() {
    DIALOG_REF.showModal();
}

/**
 * Closes the "order finished" dialog.
 */
function closeDialog() {
    DIALOG_REF.close();
}

/**
 * Closes the dialog when you click next to it (on the backdrop).
 * @param {MouseEvent} event - The click event
 */
function closeOnBackdrop(event) {
    if (event.target === DIALOG_REF) {
        closeDialog();
    }
}

/**
 * Opens or closes the basket (for mobile) and locks the page scroll while open.
 */
function toggleBasket() {
    const isOpen = document
        .getElementById("basket")
        .classList.toggle("open");
    document.body.classList.toggle("basket-open", isOpen); // locks page scroll on mobile
}

/**
 * Shows how many items are in the basket on the basket icon.
 * The badge is hidden if the basket is empty.
 */
function updateBasketBadge() {
    const BASKET_COUNT_REF = document.getElementById("basket-count");
    let amount = 0;
    for (let i = 0; i < dishes.length; i++) {
        amount += dishes[i].amount;
    }
    BASKET_COUNT_REF.textContent = amount;
    BASKET_COUNT_REF.hidden = amount === 0;
}

/**
 * Switches between delivery and pickup and updates the basket.
 * @param {string} mode - Either "delivery" or "pickup"
 */
function setDeliveryMode(mode) {
    deliveryMode = mode;
    updateBasket();
}