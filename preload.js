const API_ENDPOINT = "https://6037c52d54350400177235f5.mockapi.io/product";

window.addEventListener("DOMContentLoaded", () => {
  const toggleModal = (product) => {
    const modal = document.querySelector(".modal");
    const heading = document.querySelector(".product_name");
    const price = document.querySelector(".price");
    const brand = document.querySelector(".brand");
    const material = document.querySelector(".material");
    const origin = document.querySelector(".origin");
    const summary = document.querySelector(".summary");
    const close = document.querySelector(".close");
    const picture = document.querySelector(".pic");
    const image_name = product.productImage.slice(30);
    heading.textContent = product.productName;
    price.textContent = "Price : ₹" + product.productCost;
    brand.textContent = "Brand : " + product.productBrand;
    origin.textContent = "Availability : " + product.productAvailability;
    material.textContent = "Material : " + product.productMaterial;
    summary.textContent = product.productSummary;
    picture.setAttribute(
      "style",
      `background-image:url(../assets/lorem_img/${image_name}.jpg);background-size:cover;background-repeat:no-repeat;`
    );
    modal.style.display = "flex";
    close.addEventListener("click", () => {
      modal.style.display = "none";
    });
  };

  // creates 'product' card and adds it to the list of product cards
  const createCard = (product, catalogue) => {
    const card = document.createElement("div");
    card.id = product.productId;
    const image_name = product.productImage.slice(30); // gets the name of the image (lorempixel API too slow)
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
    // Adds a listener to open the respective modal on click
    card.addEventListener("click", () => {
      toggleModal(product);
    });
  };

  const getData = async () => {
    const catalogue = document.querySelector(".catalogue");
    const loader = document.querySelector(".loader");
    try {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
      // Sort products by category
      data.sort((p1, p2) => {
        return p1.productCategory.localeCompare(p2.productCategory);
      });
      loader.style.display = "none"; // turn off loading icon
      var current_category = data[0].productCategory;
      const category_header = document.createElement("h1");
      category_header.textContent = current_category;
      catalogue.appendChild(category_header);
      data.forEach((product) => {
        if (product.productCategory !== current_category) {
          const line_break = document.createElement("hr");
          catalogue.appendChild(line_break);
          current_category = product.productCategory;
          const next_header = document.createElement("h1");
          next_header.textContent = current_category;
          catalogue.appendChild(next_header);
        }
        createCard(product, catalogue);
      });
    } catch (err) {
      console.log(err);
      catalogue.textContent = "Sorry, we were not able to retrieve the items";
    }
  };
  getData();
});
