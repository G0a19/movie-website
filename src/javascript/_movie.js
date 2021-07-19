"use strict";

// import { * } from "core-js/core/object";
import fetch from "node-fetch";
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
      `http://www.omdbapi.com/?apikey=f69f0628&i=${movie}`
    );
    const successAfter = await success.json();
    moviesDetails.push(successAfter);
  });

  console.log(moviesDetails);
  setTimeout(() => {
    createHTML(moviesDetails);
  }, 500);
};

const createID = async function (movies) {
  movies.Search.forEach((movie) => moviesID.push(movie.imdbID));
  //   console.log(moviesID);
  createDetails(moviesID);
};

const findMovie = async function (movie) {
  conMovies.innerHTML = "";
  conMovies.insertAdjacentHTML("afterbegin", loadHTML);
  moviesDetails = [];
  moviesID = [];
  try {
    const success = await fetch(
      `http://www.omdbapi.com/?apikey=f69f0628&s=${movie}`
    );
    const successAfter = await success.json();
    if (successAfter.Response === "False") {
      throw new Error(successAfter.Error);
    } else {
      console.log(successAfter);
      createID(successAfter);
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
