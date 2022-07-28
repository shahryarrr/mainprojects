const todayDateHtml = document.querySelector('#todayDate')

const todayDate = new Date() .toDateString()

todayDateHtml.textContent = todayDate;
