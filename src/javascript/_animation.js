const cards = document.querySelectorAll(".features__con");
const title2 = document.querySelector(".section-about__title");
const nav = document.querySelector(".nav");
const titleHeader = document.querySelector(".header__h1");
const flexTitle = document.querySelector(".madetitle");
const headerGal = document.querySelector(".header__h4");
const main = document.querySelector(".main");
const storyCon = document.querySelectorAll(".story__about-con");

const title2H = title2.getBoundingClientRect().height;
const titleHeaderHeight = titleHeader.getBoundingClientRect().height;

let show = 0;

const showCards = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("scale");
    } else {
      entry.target.classList.add("scale");
    }
  });
};

const observer = new IntersectionObserver(showCards, {
  root: null,
  threshold: 0.2,
  rootMargin: `+${title2H}px`,
});

cards.forEach((card) => {
  card.classList.add("scale");
  observer.observe(card);
});

const navSnow = function (headers) {
  const [header] = headers;
  if (!header.isIntersecting) {
    titleHeader.classList.remove("scale");
    nav.classList.add("display");
    flexTitle.classList.add("display");
  }
  if (header.isIntersecting) {
    titleHeader.classList.add("scale");
    nav.classList.remove("display");
    flexTitle.classList.remove("display");
  }
};

const navObserver = new IntersectionObserver(navSnow, {
  root: null,
  threshold: 0.1,
});

navObserver.observe(main);

///////////////////////////////////////

const storyShow = function (storys) {
  storys.forEach((story) => {
    if (!story.isIntersecting) {
      story.target.classList.remove("show-story-left");
      story.target.classList.add("scale");
      return false;
    }
    story.target.classList.remove("scale");
    story.target.classList.add("show-story-left");
  });
};

const showStory = new IntersectionObserver(storyShow, {
  root: null,
  threshold: 0.1,
});

storyCon.forEach((story) => {
  showStory.observe(story);
});
