function getDishTemplate(array, index) {
  html = `
    <div class="card">
        <img
            src="${array[index].image}"
            alt="${array[index].name}"
        />
        <div class="details">
            <div class="details-header">
                <h3>${array[index].name}</h3>
                <p>${array[index].price.toFixed(2).replace(".", ",")}€</p>
            </div>

            <p>${array[index].description}</p>
            <button class="button-to-basket">
                Add to basket
            </button>
        </div>
    </div>
  `
  return html;
}