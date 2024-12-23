var addedItems = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];
var productParent = document.querySelector(".product-parent");

function content(product) {
  let content = `<!-- product item -->
          <div class="col-10 col-md-5 col-lg-4 col-xl-3 p-3">
            <div
              class="card product-item position-relative overflow-hidden p-3 shadow border-0"
              style="height:450px"
            >
              <div
                class="img z-1 d-flex justify-content-center align-items-center position-relative h-100"
              >
                <img src=${product.url} alt="" style="width: 100% ; height:200px" />
              </div>
              <div
                class="content w-auto text-capitalize z-1 position-relative p-2 d-flex flex-column justify-content-center align-items-start"
              >
                <h3 style="color: var(--dark)">${product.name}</h3>
                <p style="color: var(--med)" class="m-0"><span class="fw-bold">category :</span> ${product.category}</p>
                <p style="color: var(--med)" class="m-0"><span class="fw-bold">color :</span> ${product.color}</p>
                <p style="color: var(--med)" class="m-0"><span class="fw-bold">price :</span> $${product.price}</p>
                <p style="color: var(--med)" class="m-0"><span class="fw-bold">quantity :</span> ${product.quantity}</p>
                <button
                  class="btn card-btn text-capitalize col-12 position-relative mt-2"
                  data-id="${product.id}"
                  onclick="removeFromCart(${product.id}, this)"
                  style="background-color:var(--pop)"
                >
                  Remove From Cart
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
  addedItems.map((product) => {
    productParent.innerHTML += content(product);
  });
}

fillProducts();

function removeFromCart(id) {
  addedItems = addedItems.filter((item) => item.id !== id);
  localStorage.setItem("productsInCart", JSON.stringify(addedItems));

  const productCard = document.querySelector(`button[data-id="${id}"]`).closest('.product-item');
  if (productCard) {
    productCard.remove();
  }


  let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  delete buttonStates[id];
  localStorage.setItem("buttonStates", JSON.stringify(buttonStates));

}
