const basketItems = []; // ARRAY OF OBJECTS

// ADD EVENTS
window.addEventListener("load", function () {
  let cartIcon = document.querySelector("#cart-icon");
  let cart = document.querySelector(".cart");
  let closeCart = document.querySelector("#close-cart");

  cartIcon.addEventListener("click", function () {
    cart.classList.add("active");
  });

  closeCart.addEventListener("click", function () {
    cart.classList.remove("active");
  });
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    removeCartButtons[i].addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", changeQuantity);
  }

  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    addCart[i].addEventListener("click", addToCart);
  }

  document.querySelector(".btn-buy").addEventListener("click", buyFunction);
});

// FIND THE PRODUCT FROM BASKET OBJECT
function findProduct(productId) {
  let product = basketItems.find((product) => product.productId === productId);
  const index = basketItems.indexOf(product);
  return index;
}

// REMOVE THE PRODUCT FROM BASKET OBJECT
function removeCartItem() {
  let productId = this.parentElement.id;
  let productIndex = findProduct(productId);
  if (productIndex > -1) {
    basketItems.splice(productIndex, 1);
  }
  updateCart();
}

// CHANGE QUANTITY FOR THE PRODUCT IN BASKET OBJECT
function changeQuantity() {
  if (isNaN(this.value)) {
    this.value = 1;
  }
  let productId = this.parentElement.parentElement.id;
  let productIndex = findProduct(productId);
  if (productIndex > -1) {
    basketItems[productIndex].quantity = parseInt(this.value);
  }
  updateTotal();
}

// ADD BUTTON CLICKED, GET ATTRIBUTES FROM CLICKED PRODUCT
function addToCart() {
  let shopProducts = this.parentElement;
  let title = shopProducts.querySelector(".product-title").innerText;
  let price = shopProducts.querySelector(".price").innerText;
  let productImg = shopProducts.querySelector(".product-img").src;
  let productId = shopProducts.id;
  addProductToCart(title, price, productImg, productId);
}

// ADD THE PRODUCT TO BASKET OBJECT
function addProductToCart(title, price, productImg, productId) {
  for (let i = 0; i < basketItems.length; i++) {
    if (productId === basketItems[i].productId) {
      alert("Product is already in the cart!");
      return;
    }
  }

  let cartItem = {
    productId: productId,
    title: title,
    price: price,
    productImg: productImg,
    quantity: 1,
    added: false,
  };

  basketItems.push(cartItem);
  updateCart();
}

// BUY BUTTON CLICKED, REMOVE ALL ITEMS IN THE BASKET OBJECT
function buyFunction() {
  if(basketItems.length >0){
    alert("Thanks for your order!");
    basketItems.splice(0, basketItems.length);
    updateCart();
  }
}

// UPDATE HTML BY USING BASKET OBJECT
function updateCart() {
  let cartItems = document.querySelector(".cart-content");
  let cartProducts = cartItems.querySelectorAll(".cart-box");
  for (let i = 0; i < basketItems.length; i++) {
    if (basketItems[i].added === false) {
      let cartShopBox = document.createElement("div");
      cartShopBox.classList.add("cart-box");
      cartShopBox.setAttribute("id", basketItems[i].productId);
      let cartBoxContent = `<img src="${basketItems[i].productImg}" alt="" class="cart-img" />
                            <div class="detail-box">
                                <div class="cart-product-title">${basketItems[i].title}</div>
                                <div class="cart-price">${basketItems[i].price}</div>
                                <input type="number" min="1" value="${basketItems[i].quantity}" class="cart-quantity" />
                            </div>
                            <i class="bx bxs-trash-alt cart-remove"></i>`;
      cartShopBox.innerHTML = cartBoxContent;
      cartItems.append(cartShopBox);
      basketItems[i].added = true;
      cartShopBox
        .querySelector(".cart-remove")
        .addEventListener("click", removeCartItem);
      cartShopBox
        .querySelector(".cart-quantity")
        .addEventListener("change", changeQuantity);
    }
  }

  for (let i = 0; i < cartProducts.length; i++) {
    let productId = cartProducts[i].id;
    let productIndex = findProduct(productId);
    if (productIndex === -1) {
      document.getElementById(productId).remove();
    }
  }

  updateTotal();
}

// UPDATE THE TOTAL PRICE BY USING BASKET OBJECT
function updateTotal() {
  document.getElementById("red-dot").innerText = basketItems.length.toString();
  let total = 0;
  for (let i = 0; i < basketItems.length; i++) {
    let price = parseFloat(basketItems[i].price.replace("£", ""));
    let quantity = basketItems[i].quantity;
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;
  document.querySelector(".total-price").innerText = "£" + total;
}
