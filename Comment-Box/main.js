// CHARACTER COUNT

const commentArea = document.getElementById("comment");
const countOutput = document.getElementById("character-count");
commentArea.addEventListener("input", countCharacters);
const maxCharacters = 140;
let limitExceed = false;
function countCharacters() {
  currentCount = this.value.length;
  countOutput.innerHTML = currentCount;

  if (currentCount > 140) {
    commentArea.style.border = "1px solid red";
    countOutput.style.color = "red";
    limitExceed = true;
  } else {
    commentArea.style.border = "none";
    countOutput.style.color = "black";
    limitExceed = false;
  }
}

// FORM SUBMIT,

const commentForm = document.querySelector(".comments");
commentForm.addEventListener("submit", pushComment);

function pushComment(event) {
  event.preventDefault();

  if (limitExceed === false) {
    const nameInput = document.getElementById("firstname").value;
    const commentInput = document.getElementById("comment").value;
    const commentTemplate = `   <div class="comment-item">
    <span class="name-output">${nameInput}</span>
    <p class="comment-output">${commentInput}</p>
    </div>  `;

    const commentOutput = document.querySelector(".all-comments");
    commentOutput.innerHTML += commentTemplate;
  }
}
