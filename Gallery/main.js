const descButtons = document.querySelectorAll(
  ".gallery-item .text-container button"
);
for (let i = 0; i < descButtons.length; i++) {
  descButtons[i].addEventListener("click", showDesc);
}

function showDesc() {
  this.style.display = "none";
  this.previousElementSibling.style.display = "block";
}
