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
    const loader = document.querySelector(".loader");
    try {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
      loader.style.display = "none";
      var pics = [];
      console.log(pics);
      data.forEach((product) => {
        const card = document.createElement("div");
        const image_name = product.productImage.slice(30); // gets the name of the image
        console.log(image_name);
        const bg = document.createElement("div");
        bg.setAttribute(
          "style",
          `background-image:url(../assets/lorem_img/${image_name}.jpg); background-size:cover;background-repeat:no-repeat;`
        );
        card.className = "card";
        const card_details = document.createElement("div");
        card_details.className = "card_details";
        const heading = document.createElement("h4");
        heading.textContent = product.productName;
        const cost = document.createElement("h5");
        cost.textContent = "₹" + product.productCost;
        const desc = document.createElement("p");
        desc.textContent = product.productSummary;
        card.appendChild(bg);
        card_details.appendChild(heading);
        card_details.appendChild(cost);
        card_details.appendChild(desc);
        card.appendChild(card_details);
        catalogue.appendChild(card);
      });
    } catch (err) {
      console.log(err);
      catalogue.textContent = "Sorry, we were not able to retrieve the items";
    }
  };
  getData();
});
