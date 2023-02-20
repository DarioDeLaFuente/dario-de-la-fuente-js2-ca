import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/common/displayMassage.js";

export const fetchdata = async () => {
  const productsUrl = baseUrl + "articles";

  try {
    const apiResponse = await fetch(productsUrl);
    const json = await apiResponse.json();

    return json;
  } catch (error) {
    displayMessage("error", error, ".products");
  }
};
