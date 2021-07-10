const checkBox = document.querySelector(".nav__checkbox");
const links = document.querySelectorAll(".nav__li");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    setTimeout(() => {
      e.preventDefault();
      checkBox.checked = false;
    }, 100);
  });
});
