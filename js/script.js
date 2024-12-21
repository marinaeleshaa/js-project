// fill products

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
    name: "note 20 ultra",
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
                  onClick="addToCart(${product.id})"
                >
                  add to cart
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

// ///////////////////////////////////////////////

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
                          <button class="btn delete-btn">-</button>
                        </div>
                      </div>
                      <!-- item in cart -->`;
}
if (addedItems) {
  addedItems.map((item) => {
    cartPopUp.innerHTML += fillInCart(item);
  });
  // badge.innerHTML = addedItems.length
} else {
  cartPopUp.innerHTML = "no items yet";
}
function addToCart(id) {
  if (localStorage.getItem("userName")) {
    let chosenItem = products.find((item) => item.id === id);
    cartPopUp.innerHTML += fillInCart(chosenItem);
    addedItems = [...addedItems, chosenItem];
    localStorage.setItem("productsInCart", JSON.stringify(addedItems));
  } else {
    window.location = "login.html";
  }
}

