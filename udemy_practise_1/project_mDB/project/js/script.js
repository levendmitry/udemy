/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
        ]
    };
    
    const advImages = document.querySelectorAll(".promo__adv img"),
          promoBg = document.querySelector(".promo__bg"),
          genre = promoBg.querySelector(".promo__genre"),
          filmsList = document.querySelector(".promo__interactive-list"),
          addFilmInput = document.querySelector("input.adding__input"),
          addFilmButton = document.querySelector("form.add > button"),
          MoviesArr = movieDB.movies,
          sortedMoviesArr = movieDB.movies.sort();
    
    advImages.forEach(element => element.remove());
    genre.textContent = "Драма";
    promoBg.style.backgroundImage = "url('img/bg.jpg')";
    
    
    filmsList.innerHTML ="";
    for(let i = 0; i < sortedMoviesArr.length; i++) {
        filmsList.innerHTML +=  `
        <li class="promo__interactive-item">${i + 1} ${sortedMoviesArr[i]}
            <div class="delete"></div>
        </li>`;
    };
    
    function addFilm() {
        if(addFilmInput.value) {
            MoviesArr.push(addFilmInput.value);
            alert(`Dobavleno ${addFilmInput.value}`);
        }
    };
    
    addFilmButton.addEventListener("click", addFilm);
});

