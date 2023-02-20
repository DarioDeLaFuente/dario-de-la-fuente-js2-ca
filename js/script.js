import { baseUrl } from "./settings/api.js";
import { fetchdata } from "./utils/fetchdata.js";
import { saveToLocalStorage, updateDom } from "./utils/storage.js";
import { initFilter } from "./search.js";
import displayMessage from "./components/common/displayMassage.js";

let itemsArray = [];

try {
  itemsArray = JSON.parse(localStorage.getItem("itemsArray")) || [];
} catch (error) {
  displayMessage("error", error, ".products");
}

(async function () {
  const productsContainer = document.querySelector(".products");
  try {
    const json = await fetchdata();

    if (Array.isArray(json)) {
      productsContainer.innerHTML = "";
      json.forEach(function (product) {
        productsContainer.innerHTML += `
          <div class="col-sm-6 col-lg-4 mb-4">
                  <div class="card">
                  <a href="detail.html?id=${product.id}">
                        <div class="card-body">
                          <h5 class="card-title">${product.title}</h5>
                          <p class="card-text">
                            ${product.summary}
                          </p>
                          <p class="card-text"><small class="text-muted">${product.updated_at}</small></p>
                          <p class="card-text"><small class="text-muted">product id:${product.id}</small></p>
                        </div>
                    </a>
                        <button type="button" class="btn btn-primary add-to-local-storage" data-id="${product.id}">add to favourites</button>
                      </div>`;
      });
      initFilter(json);
    }
  } catch (error) {
    displayMessage("error", error, ".products");
  }

  productsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-local-storage")) {
      const productId = event.target.getAttribute("data-id");
      if (itemsArray.includes(productId)) {
        itemsArray = itemsArray.filter((item) => item !== productId);
      } else {
        itemsArray.push(productId);
      }
      saveToLocalStorage(itemsArray);
      updateDom(itemsArray);
    }
  });
})();
