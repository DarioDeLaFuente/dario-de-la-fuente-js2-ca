import { fetchdata } from "./fetchdata.js";

export const saveToLocalStorage = (itemsArray) => {
  localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
};

export const updateDom = async (itemsArray) => {
  let itemsList = document.querySelector(".items-list");

  itemsList.innerHTML = "";

  const itemsdata = await fetchdata();

  const itemsCount = itemsArray.length;

  itemsArray.forEach(function (itemId) {
    let item = itemsdata.filter((obj) => {
      return obj.id == itemId;
    });

    item = item[0];
    itemsList.innerHTML = `
                <p>Favourites items add: ${itemsCount}</p>
                <a href="/favourites.html">View favourites</a>`;
  });
};
