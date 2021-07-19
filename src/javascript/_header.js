const header = document.querySelector(".movie");
const appContain = document.querySelector(".app-con");
const svgHeader = document.querySelector(".movie__info-svg");

svgHeader.addEventListener("click", function (e) {
  header.classList.add("header-up");
  setTimeout(() => {
    header.style.display = "none";
  }, 1300);
});
