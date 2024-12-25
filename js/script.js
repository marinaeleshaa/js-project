// // fill products

var productParent = document.querySelector(".product-parent");

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

function content(product) {
  let content = `<!-- product item -->
          <div class="col-10 col-md-5 col-lg-4 col-xl-3 p-3">
            <div class="card product-item position-relative overflow-hidden p-3 shadow border-0">
              <div class="img z-1 d-flex justify-content-center align-items-center position-relative h-100">
                <img src=${product.url} alt="" style="width: 100%; height:200px" />
              </div>
              <div class="content w-auto text-capitalize z-1 position-relative p-2 d-flex flex-column justify-content-center align-items-start">
                <h3 style="color: var(--dark)">${product.name}</h3>
                <p style="color: var(--med)" class="m-0"><span class="fw-bold">category :</span> ${product.category}</p>
                <p style="color: var(--med)" class="m-0"><span class="fw-bold">color :</span> ${product.color}</p>
                <p style="color: var(--med)" class="m-0"><span class="fw-bold">price :</span> $${product.price}</p>
                <button class="btn card-btn text-capitalize col-12 position-relative mt-2" data-id="${product.id}" onclick="addToCart(${product.id}, this)">
                  Add to Cart
                </button>
              </div>
              <div class="fav-icon position-absolute me-3 fs-1">
                <i class="fa-heart icon" data-id="${product.id}" onclick="addToFav(${product.id}, this)"></i>
              </div>
            </div>
          </div>
          <!-- product item -->`;
  return content;
}

// ///////////////////////////////////////////////////////////////////////////////////
// // fill Products
function fillProducts() {
  productParent.innerHTML = "";
  products.map((product) => {
    productParent.innerHTML += content(product);
  });
}

fillProducts();

// ///////////////////////////////////////////////////////////////////////////////////////

// // favorite
let favItems = localStorage.getItem("favProduct")
  ? JSON.parse(localStorage.getItem("favProduct"))
  : [];

// Add product to favorites or remove it
function addToFav(id, button) {
  let chosenItem = products.find((item) => item.id === id);

  // Retrieve the stored favorite button states
  let favBtn = JSON.parse(localStorage.getItem("favBtn")) || {};

  if (!button.classList.contains("favorite")) {
    // Add the "favorite" class
    button.classList.add("favorite");
    button.classList.add("fa-solid");

    // Update the state in localStorage (set to true for this product ID)
    favBtn[id] = true;
    localStorage.setItem("favBtn", JSON.stringify(favBtn));

    // Add the chosen item to the favorites list
    let favItems = JSON.parse(localStorage.getItem("favProduct")) || [];
    favItems.push(chosenItem);
    localStorage.setItem("favProduct", JSON.stringify(favItems));
  } else {
    // Remove the "favorite" class
    button.classList.remove("favorite");

    // Update the state in localStorage (set to false for this product ID)
    favBtn[id] = false;
    button.classList.add("fa-solid");
    localStorage.setItem("favBtn", JSON.stringify(favBtn));

    // Remove the chosen item from the favorites list
    let favItems = JSON.parse(localStorage.getItem("favProduct")) || [];
    favItems = favItems.filter((item) => item.id !== id); // Remove item from the array
    localStorage.setItem("favProduct", JSON.stringify(favItems));
  }
}

// Apply the favorite state from localStorage to the button
function updateFavBtn(button, id) {
  let favBtn = JSON.parse(localStorage.getItem("favBtn")) || {};

  if (favBtn[id]) {
    button.classList.add("favorite"); // Apply the "favorite" class if the product is in favorites
    button.classList.add("fa-solid");
  } else {
    button.classList.remove("favorite"); // Ensure the class is removed if it's not a favorite
    button.classList.add("fa-solid");
  }
}

// Initialize button states when the page loads
window.addEventListener("DOMContentLoaded", function () {
  const favButtons = document.querySelectorAll(".icon"); // Select all buttons

  // Loop through all buttons and apply their stored state
  favButtons.forEach((button) => {
    const id = parseInt(button.dataset.id, 10); // Assume button has a data-id attribute for the product id
    updateFavBtn(button, id); // Apply the correct state to each button
  });
});


// // //////////////////////////////////////////////////////////////////////////////////////////////

// cart

let cartIcon = document.querySelector(".cart-icon");
let viewCart = document.querySelector(".view-cart");
var cartPopUp = document.querySelector(".cart-preview");
let badge = document.querySelector(".badge");
var addedItems = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

cartIcon.addEventListener("click", () => {
  if (viewCart.style.opacity == 0) {
    viewCart.style.opacity = 1;
    viewCart.style.pointerEvents = "auto";
    viewCart.style.top = "250%";
  } else {
    viewCart.style.opacity = 0;
    viewCart.style.top = "-250%";
    viewCart.style.pointerEvents = "none";
  }
});

function fillInCart(product) {
  return `<!-- item in cart -->
    <div class="d-flex justify-content-between p-2 cart-item" data-id="${
      product.id
    }">
      <div class="d-flex justify-content-center align-items-center">
        <img src="${product.url}" alt="" style="height: 70px" class="me-2" />
        <div>
          <h3 style="color: var(--dark);" class="item-title">${
            product.name
          }</h3>
          <p style="color: var(--med);">$${product.price}</p>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-2">
        <button class="btn increment-btn">+</button>
        <input type="number" max="5" min="0" value="${
          product.quantity || 1
        }" class="text-center border-0 quantity-input" style="width: 40px;">
        <button class="btn decrement-btn" style="background-color: var(--pop);">-</button>
      </div>
    </div>
  <!-- item in cart -->`;
}
// Update cart preview

function updateCart() {
  cartPopUp.innerHTML = "";
  badge.innerHTML = addedItems.length;
  if (addedItems.length > 0) {
    addedItems.forEach((item) => {
      cartPopUp.innerHTML += fillInCart(item);
    });

    // Attach event listeners to increment/decrement buttons
    document
      .querySelectorAll(".increment-btn")
      .forEach((btn) => btn.addEventListener("click", handleIncrement));
    document
      .querySelectorAll(".decrement-btn")
      .forEach((btn) => btn.addEventListener("click", handleDecrement));
  } else {
    cartPopUp.innerHTML = `<h5 class="text-capitalize text-center" style="color:var(--pop)">No items yet</h5>`;
  }
}

function handleIncrement(e) {
  const cartItem = e.target.closest(".cart-item");
  const id = parseInt(cartItem.dataset.id, 10);
  const quantityInput = cartItem.querySelector(".quantity-input");
  let quantity = parseInt(quantityInput.value, 10);

  if (quantity < 5) {
    quantity += 1;
    quantityInput.value = quantity;

    // Update local storage
    const product = addedItems.find((item) => item.id === id);
    if (product) product.quantity = quantity;
    localStorage.setItem("productsInCart", JSON.stringify(addedItems));
  }
}

function handleDecrement(e) {
  const cartItem = e.target.closest(".cart-item");
  const id = parseInt(cartItem.dataset.id, 10);
  const quantityInput = cartItem.querySelector(".quantity-input");
  let quantity = parseInt(quantityInput.value, 10);

  if (quantity > 0) {
    quantity -= 1;
    quantityInput.value = quantity;

    // Update local storage
    const product = addedItems.find((item) => item.id === id);
    if (product) product.quantity = quantity;
    localStorage.setItem("productsInCart", JSON.stringify(addedItems));
  }

  if (quantity === 0) {
    removeFromCart(id);
  }
}

// Add to cart
function addToCart(id, buttonElement) {
  if (localStorage.getItem("userName")) {
    let chosenItem = products.find((item) => item.id === id);

    if (!addedItems.some((item) => item.id === id)) {
      addedItems = [...addedItems, chosenItem];
      localStorage.setItem("productsInCart", JSON.stringify(addedItems));
      updateCart();

      buttonElement.style.backgroundColor = "var(--pop)";
      buttonElement.style.color = "var(--white)";
      buttonElement.innerHTML = "Added Successfully";
      buttonElement.disabled = true;

      let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
      buttonStates[id] = true;
      localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
    }
  } else {
    window.location = "login.html";
  }
}

// Remove from cart
function removeFromCart(id) {
  addedItems = addedItems.filter((item) => item.id !== id);
  localStorage.setItem("productsInCart", JSON.stringify(addedItems));
  updateCart();

  let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  delete buttonStates[id];
  localStorage.setItem("buttonStates", JSON.stringify(buttonStates));

  let button = document.querySelector(`button[data-id="${id}"]`);
  if (button) {
    button.style.backgroundColor = "";
    button.innerHTML = "Add to Cart";
    button.disabled = false;
  }
}

// Apply button states
function applyButtonStates() {
  const buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};

  document.querySelectorAll("button[data-id]").forEach((button) => {
    const id = button.getAttribute("data-id");

    if (buttonStates[id]) {
      button.style.backgroundColor = "var(--pop)";
      button.style.color = "var(--white)";
      button.innerHTML = "Added Successfully";
      button.disabled = true;
    } else {
      button.style.backgroundColor = "";
      button.innerHTML = "Add to Cart";
      button.disabled = false;
    }
  });
}

// Initial calls
updateCart();
applyButtonStates();

// /////////////////////////////////////////////////////////////////////////////////////////////////////

// search

const searchInput = document.querySelector('input[type="search"]');
const filterSelect = document.querySelector(".select-box");

searchInput.addEventListener("input", handleSearch);
filterSelect.addEventListener("change", handleSearch);

function handleSearch() {
  const query = searchInput.value.toLowerCase();
  const filterBy = filterSelect.value; // category, color, or empty string for name

  // Filter logic
  const filteredProducts = products.filter((product) => {
    if (!filterBy || filterBy === "name") {
      return product.name.toLowerCase().includes(query);
    } else if (filterBy === "category") {
      return product.category.toLowerCase().includes(query);
    } else if (filterBy === "color") {
      return product.color.toLowerCase().includes(query);
    }
    return false;
  });

  // Update the product display
  updateProductDisplay(filteredProducts);
}

function updateProductDisplay(filteredProducts) {
  productParent.innerHTML = ""; // Clear existing products
  filteredProducts.forEach((product) => {
    productParent.innerHTML += content(product);
  });
}
