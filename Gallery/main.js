const descButtons = document.querySelectorAll(".project-title i");
for (let i = 0; i < descButtons.length; i++) {
  descButtons[i].addEventListener("click", showDesc);
}

function showDesc() {
  const projectDesc =
    this.parentElement.parentElement.querySelector(".project-desc");
  projectDesc.classList.toggle("open");
}
