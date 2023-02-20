export function initFilter(products) {
  const input = document.querySelector(".product-filter");
  const productsContainer = document.querySelector(".products");

  input.addEventListener("keyup", function (event) {
    const filterValue = event.target.value.trim();

    const filteredProducts = products.filter(function (product) {
      return product.id.toString().indexOf(filterValue) !== -1;
    });
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = "<p>No items/product id found.</p>";
    } else {
      productsContainer.innerHTML = "";

      filteredProducts.forEach(function (product) {
        productsContainer.innerHTML += `
          <div class="col-sm-6 col-lg-4 mb-4">
            <div class="card">
              <a href="detail.html?id=${product.id}">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.summary}</p>
                  <p class="card-text"><small class="text-muted">${product.updated_at}</small></p>
                  <p class="card-text"><small class="text-muted">product id:${product.id}</small></p>
                </div>
              </a>
              <button type="button" class="btn btn-primary add-to-local-storage" data-id="${product.id}">add to favourites</button>
            </div>
          </div>`;
      });
    }
  });
}
