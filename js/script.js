// // fill products

var productParent = document.querySelector(".product-parent");

let products = [
  {
    id: 1,
    name: "HP laptop",
    price: 180,
    category: "laptop",
    url: "img/products/2.png",
    color: "black"
  },

  {
    id: 2,
    name: "airpods lite",
    price: 50,
    category: "airpods",
    url: "img/products/11.png",
    color: "black"
  },
  {
    id: 3,
    name: "iphone 14 pro max",
    price: 370,
    category: "phone",
    url: "img/products/6.png",
    color: "black"
  },
  {
    id: 4,
    name: "apple laptop",
    price: 300,
    category: "laptop",
    url: "img/products/4.png",
    color: "black"
  },
  {
    id: 5,
    name: "iphone xs max",
    price: 100,
    category: "phone",
    url: "img/products/5.png",
    color: "black"
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
    color: "black"
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
    name: "note 20 ultra",
    price: 30,
    category: "airpods",
    url: "img/products/10.png",
    color: "black"
  },
  {
    id: 10,
    name: "iphone 13",
    price: 270,
    category: "phone",
    url: "img/products/8.png",
    color: "black"
  },
  {
    id: 11,
    name: "note 20 ultra",
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
            <div
              class="card product-item position-relative overflow-hidden p-3 shadow border-0"
            >
              <div
                class="img z-1 d-flex justify-content-center align-items-center position-relative h-100"
              >
                <img src=${product.url} alt="" style="width: 100% ; height:200px" />
              </div>
              <div
                class="content text-capitalize z-1 position-relative p-2 d-flex flex-column justify-content-center align-items-center"
              >
                <h3 style="color: var(--dark)">${product.name}</h3>
                <p style="color: var(--med)">price : $${product.price}</p>
                <button
                  class="btn card-btn text-capitalize col-12 position-relative"
                  data-id="${product.id}"
                  onclick="addToCart(${product.id}, this)"
                >
                  Add to Cart
                </button>

              </div>
              <div class="fav-icon position-absolute me-3 fs-1">
                <i class="fa-regular fa-heart icon"></i>
                <!-- <i class="fa-solid fa-heart"></i> -->
              </div>
            </div>
          </div>
          <!-- product item -->`;
  return content;
}

function fillProducts() {
  productParent.innerHTML = "";
  products.map((product) => {
    productParent.innerHTML += content(product);
  });
}

fillProducts();

// // ///////////////////////////////////////////////

let cartIcon = document.querySelector(".cart-icon");
let viewCart = document.querySelector(".view-cart");
var cartPopUp = document.querySelector(".cart-preview");
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
                      <div class="d-flex justify-content-between p-2">
                        <div class="d-flex justify-content-center align-items-center ">
                          <img
                            src=${product.url}
                            alt=""
                            style="height: 70px"
                            class="me-2"
                          />
                          <div>
                            <h3 style="color: var(--dark);" class="item-title">${product.name}</h3>
                            <p style="color: var(--med);">$${product.price}</p>
                          </div>
                        </div>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                          <button class="btn">+</button>
                          <input type="number" max="5" min="0" class="text-center border-0" style="width: 40px;">
                          <button class="btn delete-btn" onclick="removeFromCart(${product.id})">-</button>
                        </div>
                      </div>
          <!-- item in cart -->`;
}

// Update cart preview
function updateCart() {
  cartPopUp.innerHTML = "";
  if (addedItems.length > 0) {
    addedItems.forEach((item) => {
      cartPopUp.innerHTML += fillInCart(item);
    });
  } else {
    cartPopUp.innerHTML = `<h5 class="text-capitalize text-center" style="color:var(--pop)">No items yet</h5>`;
  }
}

// function addToCart(id, buttonElement) {
//   if (localStorage.getItem("userName")) {
//     // Find chosen product
//     let chosenItem = products.find((item) => item.id === id);

//     // Update cart preview and localStorage
//     cartPopUp.innerHTML += fillInCart(chosenItem);
//     addedItems = [...addedItems, chosenItem];
//     localStorage.setItem("productsInCart", JSON.stringify(addedItems));

//     // Update button styles
//     buttonElement.style.backgroundColor = "var(--pop)";
//     buttonElement.innerHTML = "Added Successfully";
//     buttonElement.disabled = true;
//     buttonElement.style.border = "none";
//     buttonElement.style.color = "var(--white)";

//     // Save button state
//     let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
//     buttonStates[id] = true; // Store the clicked state
//     localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
//   } else {
//     window.location = "login.html";
//   }
// }

// function applyButtonStates() {
//   const buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};

//   // Loop through all buttons with the `data-id` attribute
//   document.querySelectorAll("button[data-id]").forEach((button) => {
//     const id = button.getAttribute("data-id");

//     if (buttonStates[id]) {
//       // Apply saved state
//       button.style.backgroundColor = "var(--pop)";
//       button.innerHTML = "Added Successfully";
//       button.disabled = true;
//       button.style.border = "none";
//       button.style.color = "var(--white)";
//     }
//   });
// }

// // Call this after rendering all products
// applyButtonStates();

// Fill products

// ///////////////////////////////////////////////

// Fill in cart
// function fillInCart(product) {
//   return `<!-- item in cart -->
//                       <div class="d-flex justify-content-between p-2" data-id="${product.id}">
//                         <div class="d-flex justify-content-center align-items-center ">
//                           <img
//                             src=${product.url}
//                             alt=""
//                             style="height: 70px"
//                             class="me-2"
//                           />
//                           <div>
//                             <h3 style="color: var(--dark);" class="item-title">${product.name}</h3>
//                             <p style="color: var(--med);">$${product.price}</p>
//                           </div>
//                         </div>
//                         <div class="d-flex justify-content-center align-items-center gap-2">
//                           <button class="btn delete-btn" onclick="removeFromCart(${product.id})">Remove</button>
//                         </div>
//                       </div>
//           <!-- item in cart -->`;
// }



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
