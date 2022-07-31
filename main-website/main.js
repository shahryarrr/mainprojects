const header = document.querySelector("header");
window.onscroll = function () {
  const top = window.scrollY;
  if (top >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

//CAROUSEL
const nextBtn = document.querySelector(".control.right i");
const prevBtn = document.querySelector(".control.left i");
const circleControls = document.querySelectorAll(".circles span");
const mainCard = document.querySelector(".main-card");

const cardsNumber = document.querySelectorAll(".cards").length; // 4 cards container, 4 x 3 = 12 photos
let currentCard = 0;

// NEXT PREV CONTROLS
nextBtn.addEventListener("click", moveNext);

prevBtn.addEventListener("click", movePrev);

//AUTOPLAY

let autoPlay = setInterval(() => {
  moveNext();
}, 5000);

function moveNext() {
  let currentMargin = parseInt(mainCard.style.marginLeft);
  let newMargin;
  if (!currentMargin) {
    mainCard.style.marginLeft = "-100%";
    currentCard++;
  } else {
    if (currentMargin === (cardsNumber - 1) * -100) {
      mainCard.style.marginLeft = 0;
      currentCard = 0;
    } else {
      newMargin = currentMargin - 100;
      mainCard.style.marginLeft = `${newMargin}%`;
      currentCard++;
    }
  }
  removeAllActives();
  circleControls[currentCard].classList.add("active");
}

function movePrev() {
  let currentMargin = parseInt(mainCard.style.marginLeft);
  let newMargin;
  if (!currentMargin) {
    currentCard = cardsNumber - 1;
    mainCard.style.marginLeft = `${currentCard * -100}%`;
  } else {
    newMargin = currentMargin + 100;
    mainCard.style.marginLeft = `${newMargin}%`;
    currentCard--;
  }
  removeAllActives();
  circleControls[currentCard].classList.add("active");
}

// CIRCLE CONTROLS
for (let i = 0; i < circleControls.length; i++) {
  circleControls[i].addEventListener("click", circleControl);
}

function circleControl() {
  removeAllActives();
  let count = this.getAttribute("data-count");
  currentCard = parseInt(count) - 1;
  console.log(currentCard);
  circleControls[currentCard].classList.add("active");
  let newMargin = currentCard * -100;
  mainCard.style.marginLeft = `${newMargin}%`;
}

function removeAllActives() {
  for (let i = 0; i < circleControls.length; i++) {
    circleControls[i].classList.remove("active");
  }
}

//COOKIE POP UP

function cookie(name) {
  let c = document.cookie
    .split("; ")
    .find((cookie) => cookie && cookie.startsWith(name + "="));
  return c ? c.split("=")[1] : false;
}

document
  .querySelector(".cookie-popup button")
  .addEventListener("click", function () {
    document
      .querySelector(".cookie-popup")
      .classList.add("cookie-popup--accepted");
    document.cookie = `cookie-accepted=true`;
  });

if (cookie("cookie-accepted") !== "true") {
  document
    .querySelector(".cookie-popup")
    .classList.add("cookie-popup--not-accepted");
}
