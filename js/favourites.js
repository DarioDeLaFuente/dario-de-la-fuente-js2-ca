import { fetchdata } from "./utils/fetchdata.js";
import displayMessage from "./components/common/displayMassage.js";

let itemsArray = [];

try {
  itemsArray = JSON.parse(localStorage.getItem("itemsArray")) || [];
} catch (error) {
  displayMessage("error", error, ".products");
}

clearButton();
updateFavoritesList(itemsArray);

function updateFavoritesList(itemsArray) {
  const listContainer = document.querySelector(".list-container");
  if (Array.isArray(itemsArray) && itemsArray.length > 0) {
    listContainer.innerHTML = "";

    itemsArray.forEach((itemId) => {
      fetchdata().then((itemObj) => {
        let item = itemObj.find((obj) => obj.id == itemId);
        if (item) {
          listContainer.innerHTML += `
        <div class="col-sm-6 col-lg-4 mb-4">
                <div class="card">
            <a href="detail.html?id=${item.id}">
                        <div class="card-body">
                          <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">
                            ${item.summary}
                          </p>
                        <p class="card-text"><small class="text-muted">${item.updated_at}</small></p>
                    <p class="card-text"><small class="text-muted">product id:${item.id}</small></p>
                </div>
            </a>
        </div>`;
        }
      });
    });
  } else {
    listContainer.innerHTML = "<p>No items found in local storage.</p>";
  }
}

function clearButton() {
  const clearBtn = document.querySelector("#clear");
  clearBtn.addEventListener("click", clearFavouritesStorage);
  function clearFavouritesStorage() {
    localStorage.clear();
    updateFavoritesList();
  }
}
