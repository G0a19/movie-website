"use strict";

// import { * } from "core-js/core/object";
import { async } from "regenerator-runtime";

// // http://www.omdbapi.com/?t=spiderman&apikey=42065ad
// f69f0628

//  const success = fetch("http://www.omdbapi.com/?apikey=f69f0628&i=tt0372784")

/////////////////////////// second try
const conMovies = document.querySelector(".main__movies");
const search = document.querySelector(".main__search-input");
const searchSvg = document.querySelector(".main__search-svg");
const loader = document.querySelector(".main__movies-loader");
const spiderman = document.getElementById("spiderman");
const ironMan = document.getElementById("iron-man");
const thor = document.getElementById("thor");

const loadHTML = ` 
<div class="main__movies-loader">
            <div class="main__movies-loader-load">
            </div> 
          </div> 
`;

let moviesDetails = [];
let moviesID = [];

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const find = function () {
  findMovie(search.value);
  search.value = "";
};

searchSvg.addEventListener("click", function (e) {
  e.preventDefault();
  find();
});

search.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    search.blur();
    find();
  }
});

const createHTML = function (movies) {
  conMovies.innerHTML = "";
  movies.forEach((movie) => {
    const html = `
          <div class="main__movies-movie">
              <img src="${movie.Poster}" alt="movie" class="main__movies-movie-img">
              <h4 class="main__movies-movie-h4 title-h4">${movie.Title}</h4>
              <p class="main__movies-movie-type">type: <span class="main__movies-movie-span">${movie.Type}</span></p>
              <p class="main__movies-movie-relese">relese date: <span class="main__movies-movie-span">${movie.Released}</span></p>
              <p class="main__movies-movie-rat">imdb rating:<span class="main__movies-movie-span">${movie.imdbRating}</span></p>
              <p class="main__movies-movie-time">run-time:<span class="main__movies-movie-span">${movie.Runtime}</span></p>
            </div>
          `;
    conMovies.insertAdjacentHTML("afterbegin", html);
  });
};

const createDetails = async function (movies) {
  movies.forEach(async function (movie, i) {
    const success = await fetch(
      `https://www.omdbapi.com/?apikey=f69f0628&i=${movie}`
    );
    const successAfter = await success.json();
    moviesDetails.push(successAfter);
    // if (i === 9) {
    createHTML(moviesDetails);
    // }
  });

  // console.log(moviesDetails);
  // setTimeout(() => {
  //   if (moviesDetails) {
  //     createHTML(moviesDetails);
  //   } else {
  //     conMovies.innerHTML = "have too much long, please try again";
  //   }
  // }, 750);
};

const createID = async function (movies) {
  movies.Search.forEach((movie) => moviesID.push(movie.imdbID));
  // console.log(moviesID);
  createDetails(moviesID);
};

const findMovie = async function (movie) {
  conMovies.innerHTML = "";
  conMovies.insertAdjacentHTML("afterbegin", loadHTML);
  moviesDetails = [];
  moviesID = [];

  try {
    const url = await fetch(
      `https://www.omdbapi.com/?apikey=f69f0628&s=${movie}`
    );

    const success = await url.json();

    if (success.Response === "False") {
      throw new Error(success.Error);
    } else {
      console.log(success);
      createID(success);
    }
  } catch (err) {
    console.error(err);
    conMovies.innerHTML = err;
  }
};

/////////////////// img click
spiderman.addEventListener("click", function () {
  findMovie("spider man");
});

ironMan.addEventListener("click", function () {
  findMovie("iron man");
});

thor.addEventListener("click", function () {
  findMovie("thor");
});
