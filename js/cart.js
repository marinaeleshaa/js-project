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
    productParent.innerHTML =`<h3 class="text-capitalize text-center" style="color:var(--pop)">No items yet</h3>`;;
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
  getTotal()
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
  getTotal()
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

  fillProducts()
}


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// total cart

let cartParent = document.querySelector(".short-cart")

function fillShortCartContent(totalPrice){
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
                    <p style="color: var(--dark)">${totalPrice}</p>
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
                  <p style="color: var(--dark)" class="fs-5">${totalPrice}</p>
                </div>
                <button class="btn mx-3"> process to check out</button>
                <a href="index.html" class="m-auto text-capitalize mt-4" style="color: var(--med);"><i class="fa-solid fa-arrow-left me-2"></i> continue shopping </a>
              </div>`
    cartParent.innerHTML = content
  }
  
  
  function getTotal(){
    let itemsInCart = JSON.parse(localStorage.getItem("productsInCart"))
    let totalPrice=0
    if(!itemsInCart){
      return totalPrice =0
    }else{
      itemsInCart.map((item)=>{
        if (!item.quantity){
          return totalPrice += item.price
        }else{
          return totalPrice += Number(item.quantity) * Number(item.price)
        }
      })
    }
    fillShortCartContent(totalPrice)
  }
  
  getTotal()