const basketItems = [];

// ADD EVENTS
window.addEventListener("load", function () {
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let closeCart = document.querySelector("#close-cart");
  
    cartIcon.addEventListener("click", function () {
      cart.classList.add("active");
    }) );
    

