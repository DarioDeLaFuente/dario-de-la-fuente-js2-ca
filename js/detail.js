import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMassage.js";
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}
const productUrl = baseUrl + "articles/" + id;

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    document.title = details.title;

    const container = document.querySelector(".products");
    container.innerHTML = `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${details.title}</h5>
      <p class="card-text">
        ${details.summary}
      </p>
      <p class="card-text"><small class="text-muted">${details.author}</small></p>
    </div>`;
  } catch (error) {
    displayMessage("error", error, ".container");
  }
})();
