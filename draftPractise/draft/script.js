'use strict';

// Array methods

const names = ["Ivan", "Dmitrii", "Alexey", "Gena"];

const shortNames = names.filter(function(name) {
    return name.length < 5;
});

console.log(shortNames);





