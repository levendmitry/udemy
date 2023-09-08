'use strict';

let numberOfFilms;



const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
    
        while (this.counts == '' || this.count == null || isNaN(this.count)) {
            this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyFilms: function() {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', ''),
                  b = prompt('На сколько оцените его?', '');
        
            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                this.movies[a] = b;
                console.log('done');
            } else {
                console.log('error');
                i--;
            }
        }
    },
    detectPersonalLevel: function() {
        if (this.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (this.count >= 10 && personalMovieDB.count < 30) {
            console.log("Вы классический зритель");
        } else if (this.count >= 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },
    showMyDB: function(hidden) {
        if (!hidden) {
            console.log(this);
        }
    },
    writeYourGenres: function() {
        for (let i = 1; i <= 3; i++) {
            this.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`);
            if(!this.genres[i - 1]) i--;
        }
        let result = "";
        this.genres.forEach((genre, key) => console.log(`Любимый жанр #${key + 1} - это ${genre}`));
    },
    toggleVisibleMyDB: function() {
        this.privat = !this.privat;
    }
};

personalMovieDB.start();