const checkBox = document.querySelector(".nav__checkbox");
const links = document.querySelectorAll(".nav__li");

const cardFront = document.querySelector(".features__con-front");
const cardBack = document.querySelector(".features__con-back");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    setTimeout(() => {
      e.preventDefault();
      checkBox.checked = false;
    }, 100);
  });
});
