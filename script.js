function init() {
  renderCards();
}

function renderCards() {
    const CARD_REF = document.getElementById("cards");
    let html = "";

    for (let i = 0; i < dishes.length; i++) {
        html += getDishTemplate(dishes, i);
    }

    CARD_REF.innerHTML = html;
}
