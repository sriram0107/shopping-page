const API_ENDPOINT = "https://6037c52d54350400177235f5.mockapi.io/product";
const GET_ID = (id) => {
  return `http://6037c52d54350400177235f5.mockapi.io/product/${id}`;
};
const mock = {
  productId: "1",
  productName: "Generic Metal Bacon",
  productCost: "562.00",
  productBrand: "Sausages",
  productCategory: "Industrial",
  productColor: "fuchsia",
  productMaterial: "Frozen",
  productImage: "http://lorempixel.com/640/480/animals",
  productAvailability: "Oman",
  productLaunchDate: "2020-12-23T15:23:32.575Z",
  productSummary:
    "overriding the hard drive won't do anything, we need to program the optical THX pixel!",
};

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  const getData = async () => {
    const catalogue = document.querySelector(".catalogue");
    try {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
      console.log(data);
      data.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";
        const heading = document.createElement("h2");
        heading.textContent = product.productName;
        const desc = document.createElement("p");
        desc.textContent = product.productSummary;
        card.setAttribute(
          "style",
          `background-image:url(${product.productImage});`
        );
        card.appendChild(heading);
        card.appendChild(desc);
        catalogue.appendChild(card);
      });
    } catch (err) {
      console.log(err);
      catalogue.textContent = "Sorry, we were not able to retrieve the items";
    }
  };
  getData();
});
