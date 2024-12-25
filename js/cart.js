// Get added items from localStorage
var addedItems = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];
var productParent = document.querySelector(".product-parent");

// This function generates the HTML for each product in the cart
function content(product) {
  return `
    <!-- product item -->
    <div class="col-12 mb-3 item" data-id="${product.id}">
      <div
        class="card p-3 shadow border-0 d-flex flex-column flex-md-row w-100 justify-content-center align-items-center"
        style="background-color: var(--white)"
      >
        <div class="text-capitalize d-flex p-2">
          <div class="me-2">
            <img
              src="${product.url}"
              alt=""
              style="height: 100px; width: 100%"
            />
          </div>
          <div>
            <h3 style="color: var(--dark)">${product.name}</h3>
            <p style="color: var(--med)" class="m-0">
              <span class="fw-bold">Price:</span> $${product.price}
            </p>
            <p style="color: var(--med)" class="m-0">
              <span class="fw-bold">Quantity:</span>
              <span class="quantity-display">${product.quantity || 1}</span>
            </p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-evenly ms-md-auto">
          <div class="d-flex justify-content-center align-items-center gap-2">
            <button class="btn increment-btn" data-id="${product.id}">+</button>
            <input
              type="number"
              max="5"
              min="0"
              value="${product.quantity || 1}"
              class="text-center border-0 quantity-input"
              style="width: 40px"
              readonly
            />
            <button class="btn decrement-btn" data-id="${
              product.id
            }" style="background-color: var(--pop);">-</button>
          </div>
        </div>
      </div>
    </div>
    <!-- product item -->
  `;
}

function fillProducts() {
  productParent.innerHTML = "";
  addedItems.map((product) => {
    productParent.innerHTML += content(product);
  });

  if (addedItems.length == 0) {
    productParent.innerHTML = `<h3 class="text-capitalize text-center" style="color:var(--pop)">No items yet</h3>`;
  }
}

fillProducts();

document
  .querySelectorAll(".increment-btn")
  .forEach((btn) => btn.addEventListener("click", handleIncrement));
document
  .querySelectorAll(".decrement-btn")
  .forEach((btn) => btn.addEventListener("click", handleDecrement));

function handleIncrement(e) {
  const cartItem = e.target.closest(".item");
  const id = parseInt(cartItem.dataset.id, 10);
  const quantityInput = cartItem.querySelector(".quantity-input");
  let quantity = parseInt(quantityInput.value, 10);

  if (quantity < 5) {
    quantity += 1;
    quantityInput.value = quantity;

    // Update the quantity in the local storage
    const product = addedItems.find((item) => item.id === id);
    if (product) {
      product.quantity = quantity;
    }
    localStorage.setItem("productsInCart", JSON.stringify(addedItems));

    // Update quantity display
    const quantityDisplay = cartItem.querySelector(".quantity-display");
    if (quantityDisplay) {
      quantityDisplay.textContent = quantity;
    }
  }
  getTotal();
}

function handleDecrement(e) {
  const cartItem = e.target.closest(".item");
  const id = parseInt(cartItem.dataset.id, 10);
  const quantityInput = cartItem.querySelector(".quantity-input");
  let quantity = parseInt(quantityInput.value, 10);

  if (quantity > 0) {
    quantity -= 1;
    quantityInput.value = quantity;

    // Update the quantity in the local storage
    const product = addedItems.find((item) => item.id === id);
    if (product) {
      product.quantity = quantity;
    }
    localStorage.setItem("productsInCart", JSON.stringify(addedItems));

    // Update quantity display
    const quantityDisplay = cartItem.querySelector(".quantity-display");
    if (quantityDisplay) {
      quantityDisplay.textContent = quantity;
    }
  }

  if (quantity === 0) {
    removeFromCart(id);
  }
  getTotal();
  applyButtonStates();
}

// Remove from cart
function removeFromCart(id) {
  // Remove the product from the addedItems array
  addedItems = addedItems.filter((item) => item.id !== id);
  localStorage.setItem("productsInCart", JSON.stringify(addedItems));

  // Select the card and remove it from the DOM
  var removedCard = document
    .querySelector(`div[data-id="${id}"]`)
    .closest(".item");
  if (removedCard) {
    removedCard.remove();
  }

  // Update the button states in localStorage
  let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  delete buttonStates[id];
  localStorage.setItem("buttonStates", JSON.stringify(buttonStates));

  fillProducts();
}

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// total cart

let cartParent = document.querySelector(".short-cart");

function fillShortCartContent(totalPrice) {
  let content = `<div
                class="shadow p-4 rounded d-flex flex-column "
                style="background-color: var(--white)"
              >
                <h3 class="text-capitalize" style="color: var(--dark)">
                  cart totals
                </h3>
                <hr
                  style="
                    background-color: var(--med);
                    width: 100%;
                    height: 2px;
                    border: none;
                  "
                />
                <div class="d-flex flex-column p-2 text-capitalize">
                  <div class="d-flex justify-content-between">
                    <p style="color: var(--med)">shipping</p>
                    <p style="color: var(--dark)">free</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p style="color: var(--med)">tax</p>
                    <p style="color: var(--dark)">$0</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p style="color: var(--med)">subtotal</p>
                    <p style="color: var(--dark)">$${totalPrice}</p>
                  </div>
                </div>
                <hr
                  style="
                    background-color: var(--dark);
                    width: 100%;
                    height: 2px;
                    border: none;
                    margin-top: 0px;
                  "
                />
                <div class="d-flex justify-content-between px-3">
                  <p style="color: var(--dark)" class="fs-3 text-capitalize">total</p>
                  <p style="color: var(--dark)" class="fs-5">$${totalPrice}</p>
                </div>
                <button class="btn mx-3"> process to check out</button>
                <a href="index.html" class="m-auto text-capitalize mt-4" style="color: var(--med);"><i class="fa-solid fa-arrow-left me-2"></i> continue shopping </a>
              </div>`;
  cartParent.innerHTML = content;
}

function getTotal() {
  let itemsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  let totalPrice = 0;
  if (!itemsInCart) {
    return (totalPrice = 0);
  } else {
    itemsInCart.map((item) => {
      if (!item.quantity) {
        return (totalPrice += item.price);
      } else {
        return (totalPrice += Number(item.quantity) * Number(item.price));
      }
    });
  }
  fillShortCartContent(totalPrice);
}

getTotal();

// ///////////////////////////////////////////////////////////////////////////////////////////////////////

// // favorite products
let favParent = document.querySelector(".fav-parent");
let favItems = localStorage.getItem("favProduct")
  ? JSON.parse(localStorage.getItem("favProduct"))
  : [];
let products = [
  {
    id: 1,
    name: "HP laptop",
    price: 180,
    category: "laptop",
    url: "img/products/2.png",
    color: "silver"
  },

  {
    id: 2,
    name: "airpods lite",
    price: 50,
    category: "airpods",
    url: "img/products/11.png",
    color: "pink"
  },
  {
    id: 3,
    name: "iphone 14 pro max",
    price: 370,
    category: "phone",
    url: "img/products/6.png",
    color: "blue"
  },
  {
    id: 4,
    name: "apple laptop",
    price: 300,
    category: "laptop",
    url: "img/products/4.png",
    color: "silver"
  },
  {
    id: 5,
    name: "iphone xs max",
    price: 100,
    category: "phone",
    url: "img/products/5.png",
    color: "gold"
  },
  {
    id: 6,
    name: "dell laptop",
    price: 200,
    category: "laptop",
    url: "img/products/1.png",
    color: "black"
  },
  {
    id: 7,
    name: "iphone 13 pro max",
    price: 290,
    category: "phone",
    url: "img/products/7.png",
    color: "white"
  },

  {
    id: 8,
    name: "note 20 ultra",
    price: 250,
    category: "phone",
    url: "img/products/9.png",
    color: "black"
  },
  {
    id: 9,
    name: "samsung buds",
    price: 30,
    category: "airpods",
    url: "img/products/10.png",
    color: "white"
  },
  {
    id: 10,
    name: "iphone 13",
    price: 270,
    category: "phone",
    url: "img/products/8.png",
    color: "blue"
  },
  {
    id: 11,
    name: "mi buds lite",
    price: 40,
    category: "airpods",
    url: "img/products/12.png",
    color: "black"
  },
  {
    id: 12,
    name: "acer laptop",
    price: 250,
    category: "laptop",
    url: "img/products/3.png",
    color: "black"
  }
];

function favContent(product) {
  let content = `  <!-- item -->
              <li class="col-11 col-md-5 col-lg-4 col-xl-3">
                <div class="p-3">
                  <div
                    class="card product-item position-relative overflow-hidden p-3 shadow border-0"
                    style="height:430px"
                  >
                    <div
                      class="img z-1 d-flex justify-content-center align-items-center position-relative h-100"
                    >
                      <img
                        src="${product.url}"
                        alt=""
                        style="width: 100%; height: 200px"
                      />
                    </div>
                    <div
                      class="content w-auto text-capitalize z-1 position-relative p-2 d-flex flex-column justify-content-center align-items-start"
                    >
                      <h3 style="color: var(--dark)">${product.name}</h3>
                      <p style="color: var(--med)" class="m-0">
                        <span class="fw-bold">category :</span>
                        ${product.category}
                      </p>
                      <p style="color: var(--med)" class="m-0">
                        <span class="fw-bold">color :</span> ${product.color}
                      </p>
                      <p style="color: var(--med)" class="m-0">
                        <span class="fw-bold">price :</span> $${product.price}
                      </p>
                      <div class="d-flex justify-content-between w-100 gap-2">
                        <button
                        class="btn card-btn text-capitalize col-8  position-relative mt-2 p-2 text-nowrap "
                        data-add-id="${product.id}"
                        onClick="addToCart(${product.id}, this)"
                      >
                        Add to Cart
                      </button>
                        <button
                        class=" remove-btn btn card-btn text-capitalize col-4 position-relative mt-2 p-2 text-nowrap"
                        data-id="${product.id}"
                        onClick="removeFromFav(${product.id}, this)"
                      >
                        remove
                      </button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </li>
              <!-- item -->`;
  return content;
}

function fillFavItem() {
  favParent.innerHTML = "";
  favItems.map((item) => {
    favParent.innerHTML += favContent(item);
  });
}
fillFavItem();

// Remove from favorites
function removeFromFav(id, button) {
  // Find the parent `<li>` element of the button and remove it
  const itemElement = button.closest("li");
  if (itemElement) {
    itemElement.remove(); // Remove the item from the DOM
  }

  // Update the favorites list in localStorage
  let favItems = JSON.parse(localStorage.getItem("favProduct")) || [];
  favItems = favItems.filter((item) => item.id !== id); // Remove item from the array
  localStorage.setItem("favProduct", JSON.stringify(favItems));

  // Update the state in localStorage for the "favBtn"
  let favBtn = JSON.parse(localStorage.getItem("favBtn")) || {};
  favBtn[id] = false; // Set the state for this ID to false
  localStorage.setItem("favBtn", JSON.stringify(favBtn));
}

// Add to cart
// Add to cart
function addToCart(id, buttonElement) {
  let chosenItem = products.find((item) => item.id === id);

  if (!addedItems.some((item) => item.id === id)) {
    addedItems = [...addedItems, chosenItem];
    localStorage.setItem("productsInCart", JSON.stringify(addedItems));

    // Update the button style and save the state
    buttonElement.style.backgroundColor = "var(--pop)";
    buttonElement.style.color = "var(--white)";
    buttonElement.innerHTML = "Added Successfully";
    buttonElement.disabled = true;

    let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
    buttonStates[id] = true; // Save the state for this button ID
    localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
  }
  fillProducts();
}

// Apply button states
function applyButtonStates() {
  const buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};

  // Only target "Add to Cart" buttons with class "card-btn" and a valid data-id
  document.querySelectorAll(".card-btn[data-add-id]").forEach((button) => {
    const id = button.getAttribute("data-add-id");

    // Apply saved styles if the button state exists
    if (buttonStates[id]) {
      button.style.backgroundColor = "var(--pop)";
      button.style.color = "var(--white)";
      button.innerHTML = "Added Successfully";
      button.disabled = true;
    } else {
      // Reset styles for buttons not marked as added
      button.style.backgroundColor = "";
      button.style.color = "";
      button.innerHTML = "Add to Cart";
      button.disabled = false;
    }
  });
}

applyButtonStates();
